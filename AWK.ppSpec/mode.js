ace.define("ace/mode/awk_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var AWKHighlightRules = function() {

    this.$rules = {
        start: [{
            include: "#comment"
        }, {
            include: "#procedure"
        }, {
            include: "#pattern"
        }],
        "#builtin-pattern": [{
            token: "constant.language.awk",
            regex: /\b(?:BEGINFILE|BEGIN|ENDFILE|END)\b/
        }],
        "#command": [{
            token: "keyword.other.command.awk",
            regex: /\b(?:next|print|printf)\b/
        }, {
            token: "keyword.other.command.nawk",
            regex: /\b(?:close|getline|delete|system)\b/
        }, {
            token: "keyword.other.command.bell-awk",
            regex: /\b(?:fflush|nextfile)\b/
        }],
        "#comment": [{
            token: "comment.line.number-sign.awk",
            regex: /#.*/
        }],
        "#constant": [{
            include: "#numeric-constant"
        }, {
            include: "#string-constant"
        }],
        "#escaped-char": [{
            token: "constant.character.escape.awk",
            regex: /\\(?:[\\abfnrtv\/"]|x[0-9A-Fa-f]{2}|[0-7]{3})/
        }],
        "#expression": [{
            include: "#command"
        }, {
            include: "#function"
        }, {
            include: "#constant"
        }, {
            include: "#variable"
        }, {
            include: "#regexp-in-expression"
        }, {
            include: "#operator"
        }, {
            include: "#groupings"
        }],
        "#function": [{
            token: "support.function.awk",
            regex: /\b(?:exp|int|log|sqrt|index|length|split|sprintf|substr)\b/
        }, {
            token: "support.function.nawk",
            regex: /\b(?:atan2|cos|rand|sin|srand|gsub|match|sub|tolower|toupper)\b/
        }, {
            token: "support.function.gawk",
            regex: /\b(?:gensub|strftime|systime)\b/
        }],
        "#function-definition": [{
            token: [
                "storage.type.function.awk",
                "text",
                "entity.name.function.awk",
                "punctuation.definition.parameters.begin.awk"
            ],
            regex: /\b(function)(\s+)(\w+)(\()/,
            push: [{
                token: "punctuation.definition.parameters.end.awk",
                regex: /\)/,
                next: "pop"
            }, {
                token: "variable.parameter.function.awk",
                regex: /\b\w+\b/
            }, {
                token: "punctuation.separator.parameters.awk",
                regex: /\b,\b/
            }]
        }],
        "#groupings": [{
            token: "meta.brace.round.awk",
            regex: /\(/
        }, {
            token: "meta.brace.round.awk",
            regex: /\)/
        }, {
            token: "punctuation.separator.parameters.awk",
            regex: /\,/
        }],
        "#keyword": [{
            token: "keyword.control.awk",
            regex: /\b(?:break|continue|do|while|exit|for|if|else|return)\b/
        }],
        "#numeric-constant": [{
            token: "constant.numeric.awk",
            regex: /\b[0-9]+(?:\.[0-9]+)?(?:e[+-][0-9]+)?\b/
        }],
        "#operator": [{
            token: "keyword.operator.comparison.awk",
            regex: /!?~|[=<>!]=|[<>]/
        }, {
            token: "keyword.operator.comparison.awk",
            regex: /\bin\b/
        }, {
            token: "keyword.operator.assignment.awk",
            regex: /[+\-*\/%^]=|\+\+|--|>>|=/
        }, {
            token: "keyword.operator.boolean.awk",
            regex: /\|\||&&|!/
        }, {
            token: "keyword.operator.arithmetic.awk",
            regex: /[+\-*\/%^]/
        }, {
            token: "keyword.operator.trinary.awk",
            regex: /[?:]/
        }, {
            token: "keyword.operator.index.awk",
            regex: /\[|\]/
        }],
        "#pattern": [{
            include: "#regexp-as-pattern"
        }, {
            include: "#function-definition"
        }, {
            include: "#builtin-pattern"
        }, {
            include: "#expression"
        }],
        "#procedure": [{
            token: "text",
            regex: /\{/,
            push: [{
                token: "text",
                regex: /\}/,
                next: "pop"
            }, {
                include: "#comment"
            }, {
                include: "#procedure"
            }, {
                include: "#keyword"
            }, {
                include: "#expression"
            }]
        }],
        "#regex-as-assignment": [{
            token: [
                "keyword.operator.assignment.awk",
                "text",
                "punctuation.definition.regex.begin.awk"
            ],
            regex: /([^=<>!+\-*\/%^]=)(\s*)(\/)/,
            push: [{
                token: "punctuation.definition.regex.end.awk",
                regex: /\//,
                next: "pop"
            }, {
                include: "source.regexp"
            }, {
                defaultToken: "string.regexp"
            }]
        }],
        "#regex-as-comparison": [{
            token: [
                "keyword.operator.comparison.awk",
                "text",
                "punctuation.definition.regex.begin.awk"
            ],
            regex: /(!?~)(\s*)(\/)/,
            push: [{
                token: "punctuation.definition.regex.end.awk",
                regex: /\//,
                next: "pop"
            }, {
                include: "source.regexp"
            }, {
                defaultToken: "string.regexp"
            }]
        }],
        "#regex-as-first-argument": [{
            token: [
                "meta.brace.round.awk",
                "text",
                "punctuation.definition.regex.begin.awk"
            ],
            regex: /(\()(\s*)(\/)/,
            push: [{
                token: "punctuation.definition.regex.end.awk",
                regex: /\//,
                next: "pop"
            }, {
                include: "source.regexp"
            }, {
                defaultToken: "string.regexp"
            }]
        }],
        "#regex-as-nth-argument": [{
            token: [
                "punctuation.separator.parameters.awk",
                "text",
                "punctuation.definition.regex.begin.awk"
            ],
            regex: /(,)(\s*)(\/)/,
            push: [{
                token: "punctuation.definition.regex.end.awk",
                regex: /\//,
                next: "pop"
            }, {
                include: "source.regexp"
            }, {
                defaultToken: "string.regexp"
            }]
        }],
        "#regexp-as-pattern": [{
            token: "punctuation.definition.regex.begin.awk",
            regex: /\//,
            push: [{
                token: "punctuation.definition.regex.end.awk",
                regex: /\//,
                next: "pop"
            }, {
                include: "source.regexp"
            }, {
                defaultToken: "string.regexp"
            }]
        }],
        "#regexp-in-expression": [{
            include: "#regex-as-assignment"
        }, {
            include: "#regex-as-comparison"
        }, {
            include: "#regex-as-first-argument"
        }, {
            include: "#regex-as-nth-argument"
        }],
        "#string-constant": [{
            token: "punctuation.definition.string.begin.awk",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.awk",
                regex: /"/,
                next: "pop"
            }, {
                include: "#escaped-char"
            }, {
                defaultToken: "string.quoted.double.awk"
            }]
        }],
        "#variable": [{
            token: "variable.language.awk",
            regex: /\$[0-9]+/
        }, {
            token: "variable.language.awk",
            regex: /\b(?:FILENAME|FS|NF|NR|OFMT|OFS|ORS|RS)\b/
        }, {
            token: "variable.language.nawk",
            regex: /\b(?:ARGC|ARGV|CONVFMT|ENVIRON|FNR|RLENGTH|RSTART|SUBSEP)\b/
        }, {
            token: "variable.language.gawk",
            regex: /\b(?:ARGIND|ERRNO|FIELDWIDTHS|IGNORECASE|RT)\b/
        }]
    }
    
    this.normalizeRules();
};

AWKHighlightRules.metaData = {
    fileTypes: ["awk"],
    name: "AWK",
    scopeName: "source.awk"
}


oop.inherits(AWKHighlightRules, TextHighlightRules);

exports.AWKHighlightRules = AWKHighlightRules;
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
    this.singleLineBlockCommentRe= /^\s*(\/\*).*\*\/\s*$/;
    this.tripleStarBlockCommentRe = /^\s*(\/\*\*\*).*\*\/\s*$/;
    this.startRegionRe = /^\s*(\/\*|\/\/)#?region\b/;
    this._getFoldWidgetBase = this.getFoldWidget;
    this.getFoldWidget = function(session, foldStyle, row) {
        var line = session.getLine(row);
    
        if (this.singleLineBlockCommentRe.test(line)) {
            if (!this.startRegionRe.test(line) && !this.tripleStarBlockCommentRe.test(line))
                return "";
        }
    
        var fw = this._getFoldWidgetBase(session, foldStyle, row);
    
        if (!fw && this.startRegionRe.test(line))
            return "start"; // lineCommentRegionStart
    
        return fw;
    };

    this.getFoldWidgetRange = function(session, foldStyle, row, forceMultiline) {
        var line = session.getLine(row);
        
        if (this.startRegionRe.test(line))
            return this.getCommentRegionBlock(session, line, row);
        
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
    this.getCommentRegionBlock = function(session, line, row) {
        var startColumn = line.search(/\s*$/);
        var maxRow = session.getLength();
        var startRow = row;
        
        var re = /^\s*(?:\/\*|\/\/|--)#?(end)?region\b/;
        var depth = 1;
        while (++row < maxRow) {
            line = session.getLine(row);
            var m = re.exec(line);
            if (!m) continue;
            if (m[1]) depth--;
            else depth++;

            if (!depth) break;
        }

        var endRow = row;
        if (endRow > startRow) {
            return new Range(startRow, startColumn, endRow, line.length);
        }
    };

}).call(FoldMode.prototype);

});

ace.define("ace/mode/awk",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/awk_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var AWKHighlightRules = require("./awk_highlight_rules").AWKHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = AWKHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/awk"
}).call(Mode.prototype);

exports.Mode = Mode;
});
