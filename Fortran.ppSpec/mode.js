ace.define("ace/mode/fortran_modern_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var FortranModernHighlightRules = function() {

    this.$rules = { start: 
       [ { include: 'source.fortran' },
         { todo: 
            { token: 
               [ 'meta.function.interface.operator.fortran.modern',
                 'storage.type.function.fortran',
                 'meta.function.interface.operator.fortran.modern',
                 'storage.type.fortran',
                 'meta.function.interface.operator.fortran.modern',
                 'keyword.operator.fortran',
                 'meta.function.interface.operator.fortran.modern' ],
              regex: '^(\\s*)(interface)(\\s+)(operator|assignment)(\\()(\\.[a-zA-Z0-9_]+\\.|[\\+\\-\\=\\/\\*]+)(\\))',
              caseInsensitive: true,
              push: 
               [ { token: 
                    [ 'keyword.other.fortran',
                      'meta.function.interface.operator.fortran.modern',
                      'storage.type.function.fortran' ],
                   regex: '(end)(\\s*)((?:interface)?)',
                   caseInsensitive: true,
                   next: 'pop' },
                 { include: '$self' },
                 { defaultToken: 'meta.function.interface.operator.fortran.modern' } ] },
           comment: 'Interface declaration of operator/assignments' },
         { todo: 
            { token: 
               [ 'meta.function.interface.fortran.modern',
                 'storage.type.function.fortran',
                 'meta.function.interface.fortran.modern',
                 'entity.name.function.fortran' ],
              regex: '^(\\s*)(interface)(\\s+)([A-Za-z_][A-Za-z0-9_]*)',
              caseInsensitive: true,
              push: 
               [ { token: 
                    [ 'keyword.other.fortran',
                      'meta.function.interface.fortran.modern',
                      'storage.type.function.fortran' ],
                   regex: '(end)(\\s*)((?:interface)?)',
                   caseInsensitive: true,
                   next: 'pop' },
                 { include: '$self' },
                 { defaultToken: 'meta.function.interface.fortran.modern' } ] },
           comment: 'Interface declaration of function/subroutines' },
         { todo: 
            { token: 
               [ 'meta.type-definition.fortran.modern',
                 'storage.type.fortran.modern',
                 'meta.type-definition.fortran.modern',
                 'entity.name.type.fortran.modern' ],
              regex: '^(\\s*)(type)(\\s+)([a-zA-Z_][a-zA-Z0-9_]*)',
              caseInsensitive: true,
              push: 
               [ { token: 
                    [ 'keyword.other.fortran',
                      'meta.type-definition.fortran.modern',
                      'storage.type.fortran.modern',
                      'entity.name.type.end.fortran.modern' ],
                   regex: '(end)(\\s*)(?:(type))?((?:\\s+[A-Za-z_][A-Za-z0-9_]*)?)',
                   caseInsensitive: true,
                   next: 'pop' },
                 { include: '$self' },
                 { defaultToken: 'meta.type-definition.fortran.modern' } ] },
           comment: 'Type definition' },
         { token: 'punctuation.definition.comment.fortran',
           regex: '!-',
           push: 
            [ { token: 'comment.line.exclamation.mark.fortran.modern',
                regex: '$',
                next: 'pop' },
              { token: 'text', regex: '\\\\\\s*$' },
              { defaultToken: 'comment.line.exclamation.mark.fortran.modern' } ] },
         { token: 'punctuation.definition.comment.fortran',
           regex: '!',
           push: 
            [ { token: 'comment.line.exclamation.fortran.modern',
                regex: '$',
                next: 'pop' },
              { token: 'text', regex: '\\\\\\s*$' },
              { defaultToken: 'comment.line.exclamation.fortran.modern' } ] },
         { token: 'keyword.control.fortran.modern',
           regex: '\\b(?:select\\s+case|case(?:\\s+default)?|end\\s+select|use|(?:end\\s+)?forall)\\b',
           caseInsensitive: true,
           comment: 'statements controling the flow of the program' },
         { token: 'keyword.control.io.fortran.modern',
           regex: '\\b(?:access|action|advance|append|apostrophe|asis|blank|delete|delim|direct|end|eor|err|exist|file|fmt|form|formatted|iolength|iostat|keep|name|named|nextrec|new|nml|no|null|number|old|opened|pad|position|quote|read|readwrite|rec|recl|replace|scratch|sequential|size|status|undefined|unformatted|unit|unknown|write|yes|zero|namelist)(?=\\()',
           caseInsensitive: true,
           comment: 'input/output instrinsics' },
         { token: 'keyword.operator.logical.fortran.modern',
           regex: '\\b(?:\\=\\=|\\/\\=|\\>\\=|\\>|\\<|\\<\\=)\\b',
           comment: 'logical operators in symbolic format' },
         { token: 'keyword.operator.fortran.modern',
           regex: '\\%|\\=\\>',
           comment: 'operators' },
         { token: 'keyword.other.instrinsic.numeric.fortran.modern',
           regex: '\\b(?:ceiling|floor|modulo)(?=\\()',
           caseInsensitive: true,
           comment: 'numeric instrinsics' },
         { token: 'keyword.other.instrinsic.array.fortran.modern',
           regex: '\\b(?:allocate|allocated|deallocate)(?=\\()',
           caseInsensitive: true,
           comment: 'matrix/vector/array instrinsics' },
         { token: 'keyword.other.instrinsic.pointer.fortran.modern',
           regex: '\\bassociated(?=\\()',
           caseInsensitive: true,
           comment: 'pointer instrinsics' },
         { token: 'keyword.other.programming-units.fortran.modern',
           regex: '\\b(?:end\\s*)?(?:interface|procedure|module|contains)\\b',
           caseInsensitive: true,
           comment: 'programming units' },
         { token: 'storage.type.fortran.modern',
           regex: '\\btype(?=\\s*\\()\\b(?=.*::)',
           caseInsensitive: true,
           push: 
            [ { token: 'meta.specification.fortran.modern',
                regex: '(?=!)|$',
                next: 'pop' },
              { include: '$base' },
              { defaultToken: 'meta.specification.fortran.modern' } ],
           comment: 'Line of type specification' },
         { token: 'storage.type.fortran.modern',
           regex: '\\btype(?=\\s*\\()\\b',
           caseInsensitive: true },
         { token: 'storage.modifier.fortran.modern',
           regex: '\\b(?:optional|recursive|pointer|allocatable|target|private|public|program|integer|real|function|character|type|subroutine|end)\\b',
           caseInsensitive: true } ] }
    
    this.normalizeRules();
};

FortranModernHighlightRules.metaData = { comment: 'Specificities of Fortran >= 90',
      fileTypes: [ 'f90', 'F90', 'f95', 'F95', 'f03', 'F03', 'f08', 'F08' ],
      firstLineMatch: '(?i)-[*]- mode: f90 -[*]-',
      keyEquivalent: '^~F',
      name: 'Fortran - Modern',
      scopeName: 'source.fortran.modern' }


oop.inherits(FortranModernHighlightRules, TextHighlightRules);

exports.FortranModernHighlightRules = FortranModernHighlightRules;
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

ace.define("ace/mode/fortran_modern",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/fortran_modern_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var FortranModernHighlightRules = require("./fortran_modern_highlight_rules").FortranModernHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = FortranModernHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/fortran_modern"
}).call(Mode.prototype);

exports.Mode = Mode;
});
