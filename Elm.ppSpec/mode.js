ace.define("ace/mode/elm_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

var ElmHighlightRules = function() {

    this.$rules = {
        start: [{
            token: [
                "punctuation.definition.entity.elm",
                "keyword.operator.function.infix.elm",
                "punctuation.definition.entity.elm"
            ],
            regex: /(`)([a-zA-Z_']*?)(`)/
        }, {
            token: "constant.language.unit.elm",
            regex: /\(\)/
        }, {
            token: "constant.language.empty-list.elm",
            regex: /\[\]/
        }, {
            token: [
                "keyword.other.elm",
                "meta.declaration.module.elm"
            ],
            regex: /^\b(module)(\s+)/,
            push: [{
                token: "keyword.other.elm",
                regex: /\bwhere\b/,
                next: "pop"
            }, {
                include: "#module_name"
            }, {
                include: "#module_exports"
            }, {
                token: "invalid",
                regex: /[a-z]+/
            }, {
                defaultToken: "meta.declaration.module.elm"
            }]
        }, {
            token: [
                "keyword.other.elm",
                "meta.import.elm",
                "invalid",
                "meta.import.elm"
            ],
            regex: /^\b(import)(\s+)(?:(open)(\s+))?/,
            push: [{
                token: "meta.import.elm",
                regex: /$|;/,
                next: "pop"
            }, {
                token: "keyword.import.elm",
                regex: /as/
            }, {
                token: "keyword.import.elm",
                regex: /\(\.\.\)/
            }, {
                include: "#module_name"
            }, {
                include: "#module_exports"
            }, {
                defaultToken: "meta.import.elm"
            }]
        }, {
            token: [
                "keyword.other.elm",
                "support.function.prelude.elm",
                "keyword.other.elm"
            ],
            regex: /(\[)(glsl)(\|)/,
            push: [{
                token: "keyword.other.elm",
                regex: /\|\]/,
                next: "pop"
            }, {
                include: "source.glsl"
            }, {
                defaultToken: "entity.glsl.elm"
            }]
        }, {
            token: "keyword.other.elm",
            regex: /\b(?:type alias|type|case|of|let|in|as)\s+/
        }, {
            token: "keyword.control.elm",
            regex: /\b(?:if|then|else)\s+/
        }, {
            token: "constant.numeric.float.elm",
            regex: /\b(?:[0-9]+\.[0-9]+(?:[eE][+-]?[0-9]+)?|[0-9]+[eE][+-]?[0-9]+)\b/,
            comment: "Floats are always decimal"
        }, {
            token: "constant.numeric.elm",
            regex: /\b[0-9]+\b/
        }, {
            token: "punctuation.definition.string.begin.elm",
            regex: /"""/,
            push: [{
                token: "punctuation.definition.string.end.elm",
                regex: /"""/,
                next: "pop"
            }, {
                token: "constant.character.escape.elm",
                regex: /\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\'\&])/
            }, {
                token: "constant.character.escape.control.elm",
                regex: /\^[A-Z@\[\]\\\^_]/
            }, {
                defaultToken: "string.quoted.double.elm"
            }]
        }, {
            token: "punctuation.definition.string.begin.elm",
            regex: /"/,
            push: [{
                token: "punctuation.definition.string.end.elm",
                regex: /"/,
                next: "pop"
            }, {
                token: "constant.character.escape.elm",
                regex: /\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\"'\&])/
            }, {
                token: "constant.character.escape.control.elm",
                regex: /\^[A-Z@\[\]\\\^_]/
            }, {
                defaultToken: "string.quoted.double.elm"
            }]
        }, {
            token: [
                "punctuation.definition.string.begin.elm",
                "string.quoted.single.elm",
                "constant.character.escape.elm",
                "punctuation.definition.string.end.elm",
                "string.quoted.single.elm"
            ],
            regex: /(')(?:([\ -\[\]-~])|(\\(?:NUL|SOH|STX|ETX|EOT|ENQ|ACK|BEL|BS|HT|LF|VT|FF|CR|SO|SI|DLE|DC1|DC2|DC3|DC4|NAK|SYN|ETB|CAN|EM|SUB|ESC|FS|GS|RS|US|SP|DEL|[abfnrtv\\\"'\&]))|(\^[A-Z@\[\]\\\^_]))(')/
        }, {
            token: [
                "keyword.other.port.elm",
                "entity.name.function.elm",
                "meta.function.type-declaration.elm",
                "keyword.other.colon.elm",
                "invalid"
            ],
            regex: /^((?:port\s+)?)([a-z_][a-zA-Z0-9_']*|\([|!%$+\-.,=<\/>]+\))(\s*)(:)((?:[:]+)?)/,
            push: [{
                token: "meta.function.type-declaration.elm",
                regex: /$/,
                next: "pop"
            }, {
                include: "#type_signature"
            }, {
                defaultToken: "meta.function.type-declaration.elm"
            }]
        }, {
            token: "keyword.other.port.elm",
            regex: /\bport\s+/
        }, {
            token: "constant.other.elm",
            regex: /\b[A-Z]\w*\b/
        }, {
            include: "#comments"
        }, {
            token: "entity.name.function.elm",
            regex: /^[a-z][A-Za-z0-9_']*\s+/
        }, {
            include: "#infix_op"
        }, {
            token: "keyword.operator.elm",
            regex: /[|!%$?~+:\-.=<\/>&\\*^]+/
        }, {
            token: "punctuation.separator.comma.elm",
            regex: /,/
        }],
        "#block_comment": [{
            token: "punctuation.definition.comment.elm",
            regex: /\{-(?!#)/,
            push: [{
                include: "#block_comment"
            }, {
                token: "punctuation.definition.comment.elm",
                regex: /-\}/,
                next: "pop"
            }, {
                defaultToken: "comment.block.elm"
            }]
        }],
        "#comments": [{
            token: [
                "punctuation.definition.comment.elm",
                "comment.line.double-dash.elm"
            ],
            regex: /(--)(.*$)/
        }, {
            include: "#block_comment"
        }],
        "#infix_op": [{
            token: "entity.name.function.infix.elm",
            regex: /\([|!%$+:\-.=<\/>]+\)|\(,+\)/
        }],
        "#module_exports": [{
            token: "meta.declaration.exports.elm",
            regex: /\(/,
            push: [{
                token: "meta.declaration.exports.elm",
                regex: /\)/,
                next: "pop"
            }, {
                token: "entity.name.function.elm",
                regex: /\b[a-z][a-zA-Z_'0-9]*/
            }, {
                token: "storage.type.elm",
                regex: /\b[A-Z][A-Za-z_'0-9]*/
            }, {
                token: "punctuation.separator.comma.elm",
                regex: /,/
            }, {
                include: "#infix_op"
            }, {
                token: "meta.other.unknown.elm",
                regex: /\(.*?\)/,
                comment: "So named because I don't know what to call this."
            }, {
                defaultToken: "meta.declaration.exports.elm"
            }]
        }],
        "#module_name": [{
            token: "support.other.module.elm",
            regex: /[A-Z][A-Za-z._']*/
        }],
        "#type_signature": [{
            token: [
                "meta.class-constraint.elm",
                "entity.other.inherited-class.elm",
                "meta.class-constraint.elm",
                "variable.other.generic-type.elm",
                "meta.class-constraint.elm",
                "keyword.other.big-arrow.elm"
            ],
            regex: /(\(\s*)([A-Z][A-Za-z]*)(\s+)([a-z][A-Za-z_']*)(\)\s*)(=>)/
        }, {
            token: "keyword.other.arrow.elm",
            regex: /->/
        }, {
            token: "keyword.other.big-arrow.elm",
            regex: /=>/
        }, {
            token: "variable.other.generic-type.elm",
            regex: /\b[a-z][a-zA-Z0-9_']*\b/
        }, {
            token: "storage.type.elm",
            regex: /\b[A-Z][a-zA-Z0-9_']*\b/
        }, {
            token: "support.constant.unit.elm",
            regex: /\(\)/
        }, {
            include: "#comments"
        }]
    }
    
    this.normalizeRules();
};

ElmHighlightRules.metaData = {
    fileTypes: ["elm"],
    name: "Elm",
    scopeName: "source.elm"
}


oop.inherits(ElmHighlightRules, TextHighlightRules);

exports.ElmHighlightRules = ElmHighlightRules;
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

ace.define("ace/mode/elm",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/elm_highlight_rules","ace/mode/folding/cstyle"], function(require, exports, module) {
"use strict";

var oop = require("../lib/oop");
var TextMode = require("./text").Mode;
var ElmHighlightRules = require("./elm_highlight_rules").ElmHighlightRules;
var FoldMode = require("./folding/cstyle").FoldMode;

var Mode = function() {
    this.HighlightRules = ElmHighlightRules;
    this.foldingRules = new FoldMode();
};
oop.inherits(Mode, TextMode);

(function() {
    this.$id = "ace/mode/elm"
}).call(Mode.prototype);

exports.Mode = Mode;
});
