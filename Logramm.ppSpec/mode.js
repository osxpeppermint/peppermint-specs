ace.define("ace/mode/logramm_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var LogrammHighlightRules = function() {

    this.$rules = { start: 
       [{
                token : "comment",
                regex : "//",
                next : "singleLineComment"
            },
         {
                token : "comment", // multi line comment
                regex : "\\/\\*",
                next : "comment"
            }, 
        { token: 'punctuation.definition.string.begin.c',
           regex: '"',
           push: 
            [ { token: 'punctuation.definition.string.end.c',
                regex: '"',
                next: 'pop' },
              { include: '#string_escaped_char' },
              { include: '#string_placeholder' },
              { defaultToken: 'string.quoted.double.c' } ] },
         { token: 'constant.language.c',
           regex: '[a-zA-Z]+\\s*\\([^)]*\\)\\s*(?==>)' },
         { token: 'constant.language.c',
           regex: '[a-zA-Z]+\\s*\\([^)]*\\)\\s*(?=<=>)' },
         { token: 'constant.language.c',
           regex: '[a-zA-Z\\s~]+\\s*(?=::)' },
         { token: 'entity.name.function.preprocessor.c',
           regex: '=>|<=>|::|:|!(?!=)|function|module|rule' },
         { token: 'variable.parameter.preprocessor.c',
           regex: '\\b(?:loop|import|\\>\\>|in|exec|out|break|return|else)\\b|@|\\$>|<\\-|<<|>>|%%|==>|!!' },
         { token: 'storage.type.c',
           regex: '\\b(?:true|yes|false|no|and|or)\\b' },
         { token: 'string.quoted.double.c',
           regex: '\\b0x[0-9A-Fa-f]+\\b|\\b0b[01]+\\b|\\b[0-9]+\\.[0-9]+\\b|\\b[0-9]+\\b' },
         { token: 'keyword.control.c',
           regex: '(?:\\+|\\-|\\*|\\\\|%)(?!=)' },
         { token: 'comment.block.c', regex: '\\bcomment\\b' },
         { token: 'invalid.illegal.placeholder.c',
           regex: '\\billegal\\b' },
         { todo: { match: '', name: 'invalid.deprecated.operator.python' } },
         { todo: { match: '', name: 'support.function.magic.python' } },
         { token: 
            [ 'comment.block.c',
              'meta.toc-list.banner.block.c',
              'comment.block.c' ],
           regex: '^(/\\* =)(\\s*.*?)(\\s*= \\*/$)' },
         { token: 'punctuation.definition.comment.c',
           regex: '/\\*',
           push: 
            [ { token: 'punctuation.definition.comment.c',
                regex: '\\*/',
                next: 'pop' },
              { defaultToken: 'comment.block.c' } ] },
         { token: 'invalid.illegal.stray-comment-end.c',
           regex: '\\*/.*$' },
         { token: 
            [ 'comment.line.banner.c++',
              'meta.toc-list.banner.line.c',
              'comment.line.banner.c++' ],
           regex: '^(// =)(\\s*.*?)(\\s*=\\s*$)' }
            ],
            "comment" : [
            {
                token : "comment", // closing comment
                regex : ".*?\\*\\/",
                next : "start"
            }, {
                token : "comment", // comment spanning whole line
                regex : ".+"
            }
        ],
        "singleLineComment" : [
            {
                token : "comment",
                regex : /\\$/,
                next : "singleLineComment"
            }, {
                token : "comment",
                regex : /$/,
                next : "start"
            }, {
                defaultToken: "comment"
            }
        ] }
    
    this.normalizeRules();
};

LogrammHighlightRules.metaData = { fileTypes: [ 'lgm', 'lgl' ],
      keyEquivalent: '^~L',
      name: 'Logramm',
      scopeName: 'source.logramm' }


oop.inherits(LogrammHighlightRules, TextHighlightRules);

exports.LogrammHighlightRules = LogrammHighlightRules;
});

ace.define("ace/mode/folding/cstyle",["require","exports","module","ace/lib/oop","ace/range","ace/mode/folding/fold_mode"], function(require, exports, module) {
"use strict";

var oop = require("../../lib/oop");
var Range = require("../../range").Range;
var BaseFoldMode = require("./fold_mode").FoldMode;

var FoldMode = exports.FoldMode = function(commentRegex) {
    if (commentRegex) {
        this.foldingStartMarker = new RegExp(
            this.foldingStartMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.start)
        );
        this.foldingStopMarker = new RegExp(
            this.foldingStopMarker.source.replace(/\|[^|]*?$/, "|" + commentRegex.end)
        );
    }
};
oop.inherits(FoldMode, BaseFoldMode);

(function() {

    this.foldingStartMarker = /(\{|\[)[^\}\]]*$|^\s*(\/\*)/;
    this.foldingStopMarker = /^[^\[\{]*(\}|\])|^[\s\*]*(\*\/)/;

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        var match = line.match(this.foldingStartMarker);
        if (match) {
            var i = match.index;

            if (match[1])
                return this.openingBracketBlock(session, match[1], row, i);
                
            var range = session.getCommentFoldRange(row, i + match[0].length, 1);
            
            if (range && !range.isMultiLine()) {
                if (forceMultiline) {
                    range = this.getSectionRange(session, row);
                } else if (foldStyle != "all")
                    range = null;
            }
            
            return range;
        }

        if (foldStyle === "markbegin")
            return;

        var match = line.match(this.foldingStopMarker);
        if (match) {
            var i = match.index + match[0].length;

            if (match[1])
                return this.closingBracketBlock(session, match[1], row, i);

            return session.getCommentFoldRange(row, i, -1);
        }
    };
    
    this.getSectionRange = function(session, row) {
        var line = session.getLine(row);
        var startIndent = line.search(/\S/);
        var startRow = row;
        var startColumn = line.length;
        row = row + 1;
        var endRow = row;
        var maxRow = session.getLength();
        while (++row < maxRow) {
            line = session.getLine(row);
            var indent = line.search(/\S/);
            if (indent === -1)
                continue;
            if  (startIndent > indent)
                break;
            var subRange = this.getFoldWidgetRange(session, "all", row);
            
            if (subRange) {
                if (subRange.start.row <= startRow) {
                    break;
                } else if (subRange.isMultiLine()) {
                    row = subRange.end.row;
                } else if (startIndent == indent) {
                    break;
                }
            }
            endRow = row;
        }
        
        return new Range(startRow, startColumn, endRow, session.getLine(endRow).length);
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/logramm",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/logramm_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var LogrammHighlightRules = require("./logramm_highlight_rules").LogrammHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = LogrammHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/logramm"
}).call(Mode.prototype);

exports.Mode = Mode;
});
