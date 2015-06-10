ace.define("ace/mode/python_highlight_rules", [ "require", "exports", "module", "ace/lib/oop", "ace/mode/text_highlight_rules" ], function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text_highlight_rules").TextHighlightRules, s = function() {
        var e = "and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield", t = "True|False|None|NotImplemented|Ellipsis|__debug__", n = "abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern", r = this.createKeywordMapper({
            "invalid.deprecated": "debugger",
            "support.function": n,
            "constant.language": t,
            keyword: e
        }, "identifier"), i = "(?:r|u|ur|R|U|UR|Ur|uR)?", s = "(?:(?:[1-9]\\d*)|(?:0))", o = "(?:0[oO]?[0-7]+)", u = "(?:0[xX][\\dA-Fa-f]+)", a = "(?:0[bB][01]+)", f = "(?:" + s + "|" + o + "|" + u + "|" + a + ")", l = "(?:[eE][+-]?\\d+)", c = "(?:\\.\\d+)", h = "(?:\\d+)", p = "(?:(?:" + h + "?" + c + ")|(?:" + h + "\\.))", d = "(?:(?:" + p + "|" + h + ")" + l + ")", v = "(?:" + d + "|" + p + ")", m = "\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";
        this.$rules = {
            start: [ {
                token: "comment",
                regex: "#.*$"
            }, {
                token: "string",
                regex: i + '"{3}',
                next: "qqstring3"
            }, {
                token: "string",
                regex: i + '"(?=.)',
                next: "qqstring"
            }, {
                token: "string",
                regex: i + "'{3}",
                next: "qstring3"
            }, {
                token: "string",
                regex: i + "'(?=.)",
                next: "qstring"
            }, {
                token: "constant.numeric",
                regex: "(?:" + v + "|\\d+)[jJ]\\b"
            }, {
                token: "constant.numeric",
                regex: v
            }, {
                token: "constant.numeric",
                regex: f + "[lL]\\b"
            }, {
                token: "constant.numeric",
                regex: f + "\\b"
            }, {
                token: r,
                regex: "[a-zA-Z_$][a-zA-Z0-9_$]*\\b"
            }, {
                token: "keyword.operator",
                regex: "\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="
            }, {
                token: "paren.lparen",
                regex: "[\\[\\(\\{]"
            }, {
                token: "paren.rparen",
                regex: "[\\]\\)\\}]"
            }, {
                token: "text",
                regex: "\\s+"
            } ],
            qqstring3: [ {
                token: "constant.language.escape",
                regex: m
            }, {
                token: "string",
                regex: '"{3}',
                next: "start"
            }, {
                defaultToken: "string"
            } ],
            qstring3: [ {
                token: "constant.language.escape",
                regex: m
            }, {
                token: "string",
                regex: "'{3}",
                next: "start"
            }, {
                defaultToken: "string"
            } ],
            qqstring: [ {
                token: "constant.language.escape",
                regex: m
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qqstring"
            }, {
                token: "string",
                regex: '"|$',
                next: "start"
            }, {
                defaultToken: "string"
            } ],
            qstring: [ {
                token: "constant.language.escape",
                regex: m
            }, {
                token: "string",
                regex: "\\\\$",
                next: "qstring"
            }, {
                token: "string",
                regex: "'|$",
                next: "start"
            }, {
                defaultToken: "string"
            } ]
        };
    };
    r.inherits(s, i), t.PythonHighlightRules = s;
}), ace.define("ace/mode/behaviour/cstyle", [ "require", "exports", "module", "ace/lib/oop", "ace/mode/behaviour", "ace/token_iterator", "ace/lib/lang" ], function(e, t, n) {
    "use strict";
    var r = e("../../lib/oop"), i = e("../behaviour").Behaviour, s = e("../../token_iterator").TokenIterator, o = e("../../lib/lang"), u = [ "text", "paren.rparen", "punctuation.operator" ], a = [ "text", "paren.rparen", "punctuation.operator", "comment" ], f, l = {}, c = function(e) {
        var t = -1;
        e.multiSelect && (t = e.selection.id, l.rangeCount != e.multiSelect.rangeCount && (l = {
            rangeCount: e.multiSelect.rangeCount
        }));
        if (l[t]) return f = l[t];
        f = l[t] = {
            autoInsertedBrackets: 0,
            autoInsertedRow: -1,
            autoInsertedLineEnd: "",
            maybeInsertedBrackets: 0,
            maybeInsertedRow: -1,
            maybeInsertedLineStart: "",
            maybeInsertedLineEnd: ""
        };
    }, h = function() {
        this.add("braces", "insertion", function(e, t, n, r, i) {
            var s = n.getCursorPosition(), u = r.doc.getLine(s.row);
            if (i == "{") {
                c(n);
                var a = n.getSelectionRange(), l = r.doc.getTextRange(a);
                if (l !== "" && l !== "{" && n.getWrapBehavioursEnabled()) return {
                    text: "{" + l + "}",
                    selection: !1
                };
                if (h.isSaneInsertion(n, r)) return /[\]\}\)]/.test(u[s.column]) || n.inMultiSelectMode ? (h.recordAutoInsert(n, r, "}"), 
                {
                    text: "{}",
                    selection: [ 1, 1 ]
                }) : (h.recordMaybeInsert(n, r, "{"), {
                    text: "{",
                    selection: [ 1, 1 ]
                });
            } else if (i == "}") {
                c(n);
                var p = u.substring(s.column, s.column + 1);
                if (p == "}") {
                    var d = r.$findOpeningBracket("}", {
                        column: s.column + 1,
                        row: s.row
                    });
                    if (d !== null && h.isAutoInsertedClosing(s, u, i)) return h.popAutoInsertedClosing(), 
                    {
                        text: "",
                        selection: [ 1, 1 ]
                    };
                }
            } else {
                if (i == "\n" || i == "\r\n") {
                    c(n);
                    var v = "";
                    h.isMaybeInsertedClosing(s, u) && (v = o.stringRepeat("}", f.maybeInsertedBrackets), 
                    h.clearMaybeInsertedClosing());
                    var p = u.substring(s.column, s.column + 1);
                    if (p === "}") {
                        var m = r.findMatchingBracket({
                            row: s.row,
                            column: s.column + 1
                        }, "}");
                        if (!m) return null;
                        var g = this.$getIndent(r.getLine(m.row));
                    } else {
                        if (!v) {
                            h.clearMaybeInsertedClosing();
                            return;
                        }
                        var g = this.$getIndent(u);
                    }
                    var y = g + r.getTabString();
                    return {
                        text: "\n" + y + "\n" + g + v,
                        selection: [ 1, y.length, 1, y.length ]
                    };
                }
                h.clearMaybeInsertedClosing();
            }
        }), this.add("braces", "deletion", function(e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "{") {
                c(n);
                var o = r.doc.getLine(i.start.row), u = o.substring(i.end.column, i.end.column + 1);
                if (u == "}") return i.end.column++, i;
                f.maybeInsertedBrackets--;
            }
        }), this.add("parens", "insertion", function(e, t, n, r, i) {
            if (i == "(") {
                c(n);
                var s = n.getSelectionRange(), o = r.doc.getTextRange(s);
                if (o !== "" && n.getWrapBehavioursEnabled()) return {
                    text: "(" + o + ")",
                    selection: !1
                };
                if (h.isSaneInsertion(n, r)) return h.recordAutoInsert(n, r, ")"), {
                    text: "()",
                    selection: [ 1, 1 ]
                };
            } else if (i == ")") {
                c(n);
                var u = n.getCursorPosition(), a = r.doc.getLine(u.row), f = a.substring(u.column, u.column + 1);
                if (f == ")") {
                    var l = r.$findOpeningBracket(")", {
                        column: u.column + 1,
                        row: u.row
                    });
                    if (l !== null && h.isAutoInsertedClosing(u, a, i)) return h.popAutoInsertedClosing(), 
                    {
                        text: "",
                        selection: [ 1, 1 ]
                    };
                }
            }
        }), this.add("parens", "deletion", function(e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "(") {
                c(n);
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == ")") return i.end.column++, i;
            }
        }), this.add("brackets", "insertion", function(e, t, n, r, i) {
            if (i == "[") {
                c(n);
                var s = n.getSelectionRange(), o = r.doc.getTextRange(s);
                if (o !== "" && n.getWrapBehavioursEnabled()) return {
                    text: "[" + o + "]",
                    selection: !1
                };
                if (h.isSaneInsertion(n, r)) return h.recordAutoInsert(n, r, "]"), {
                    text: "[]",
                    selection: [ 1, 1 ]
                };
            } else if (i == "]") {
                c(n);
                var u = n.getCursorPosition(), a = r.doc.getLine(u.row), f = a.substring(u.column, u.column + 1);
                if (f == "]") {
                    var l = r.$findOpeningBracket("]", {
                        column: u.column + 1,
                        row: u.row
                    });
                    if (l !== null && h.isAutoInsertedClosing(u, a, i)) return h.popAutoInsertedClosing(), 
                    {
                        text: "",
                        selection: [ 1, 1 ]
                    };
                }
            }
        }), this.add("brackets", "deletion", function(e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && s == "[") {
                c(n);
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == "]") return i.end.column++, i;
            }
        }), this.add("string_dquotes", "insertion", function(e, t, n, r, i) {
            if (i == '"' || i == "'") {
                c(n);
                var s = i, o = n.getSelectionRange(), u = r.doc.getTextRange(o);
                if (u !== "" && u !== "'" && u != '"' && n.getWrapBehavioursEnabled()) return {
                    text: s + u + s,
                    selection: !1
                };
                var a = n.getCursorPosition(), f = r.doc.getLine(a.row), l = f.substring(a.column - 1, a.column);
                if (l == "\\") return null;
                var p = r.getTokens(o.start.row), d = 0, v, m = -1;
                for (var g = 0; g < p.length; g++) {
                    v = p[g], v.type == "string" ? m = -1 : m < 0 && (m = v.value.indexOf(s));
                    if (v.value.length + d > o.start.column) break;
                    d += p[g].value.length;
                }
                if (!v || m < 0 && v.type !== "comment" && (v.type !== "string" || o.start.column !== v.value.length + d - 1 && v.value.lastIndexOf(s) === v.value.length - 1)) {
                    if (!h.isSaneInsertion(n, r)) return;
                    return {
                        text: s + s,
                        selection: [ 1, 1 ]
                    };
                }
                if (v && v.type === "string") {
                    var y = f.substring(a.column, a.column + 1);
                    if (y == s) return {
                        text: "",
                        selection: [ 1, 1 ]
                    };
                }
            }
        }), this.add("string_dquotes", "deletion", function(e, t, n, r, i) {
            var s = r.doc.getTextRange(i);
            if (!i.isMultiLine() && (s == '"' || s == "'")) {
                c(n);
                var o = r.doc.getLine(i.start.row), u = o.substring(i.start.column + 1, i.start.column + 2);
                if (u == s) return i.end.column++, i;
            }
        });
    };
    h.isSaneInsertion = function(e, t) {
        var n = e.getCursorPosition(), r = new s(t, n.row, n.column);
        if (!this.$matchTokenType(r.getCurrentToken() || "text", u)) {
            var i = new s(t, n.row, n.column + 1);
            if (!this.$matchTokenType(i.getCurrentToken() || "text", u)) return !1;
        }
        return r.stepForward(), r.getCurrentTokenRow() !== n.row || this.$matchTokenType(r.getCurrentToken() || "text", a);
    }, h.$matchTokenType = function(e, t) {
        return t.indexOf(e.type || e) > -1;
    }, h.recordAutoInsert = function(e, t, n) {
        var r = e.getCursorPosition(), i = t.doc.getLine(r.row);
        this.isAutoInsertedClosing(r, i, f.autoInsertedLineEnd[0]) || (f.autoInsertedBrackets = 0), 
        f.autoInsertedRow = r.row, f.autoInsertedLineEnd = n + i.substr(r.column), f.autoInsertedBrackets++;
    }, h.recordMaybeInsert = function(e, t, n) {
        var r = e.getCursorPosition(), i = t.doc.getLine(r.row);
        this.isMaybeInsertedClosing(r, i) || (f.maybeInsertedBrackets = 0), f.maybeInsertedRow = r.row, 
        f.maybeInsertedLineStart = i.substr(0, r.column) + n, f.maybeInsertedLineEnd = i.substr(r.column), 
        f.maybeInsertedBrackets++;
    }, h.isAutoInsertedClosing = function(e, t, n) {
        return f.autoInsertedBrackets > 0 && e.row === f.autoInsertedRow && n === f.autoInsertedLineEnd[0] && t.substr(e.column) === f.autoInsertedLineEnd;
    }, h.isMaybeInsertedClosing = function(e, t) {
        return f.maybeInsertedBrackets > 0 && e.row === f.maybeInsertedRow && t.substr(e.column) === f.maybeInsertedLineEnd && t.substr(0, e.column) == f.maybeInsertedLineStart;
    }, h.popAutoInsertedClosing = function() {
        f.autoInsertedLineEnd = f.autoInsertedLineEnd.substr(1), f.autoInsertedBrackets--;
    }, h.clearMaybeInsertedClosing = function() {
        f && (f.maybeInsertedBrackets = 0, f.maybeInsertedRow = -1);
    }, r.inherits(h, i), t.CstyleBehaviour = h;
}), ace.define("ace/mode/folding/pythonic", [ "require", "exports", "module", "ace/lib/oop", "ace/mode/folding/fold_mode" ], function(e, t, n) {
    "use strict";
    var r = e("../../lib/oop"), i = e("./fold_mode").FoldMode, s = t.FoldMode = function(e) {
        this.foldingStartMarker = new RegExp("([\\[{])(?:\\s*)$|(" + e + ")(?:\\s*)(?:#.*)?$");
    };
    r.inherits(s, i), function() {
        this.getFoldWidgetRange = function(e, t, n) {
            var r = e.getLine(n), i = r.match(this.foldingStartMarker);
            if (i) return i[1] ? this.openingBracketBlock(e, i[1], n, i.index) : i[2] ? this.indentationBlock(e, n, i.index + i[2].length) : this.indentationBlock(e, n);
        };
    }.call(s.prototype);
}), ace.define("ace/mode/python", [ "require", "exports", "module", "ace/lib/oop", "ace/mode/text", "ace/mode/python_highlight_rules", "ace/mode/folding/pythonic", "ace/range" ], function(e, t, n) {
    "use strict";
    var r = e("../lib/oop"), i = e("./text").Mode, s = e("./python_highlight_rules").PythonHighlightRules, o = e("./folding/pythonic").FoldMode, l = e("./behaviour/cstyle").CstyleBehaviour, u = e("../range").Range, a = function() {
        this.HighlightRules = s, this.$behaviour = new l(), this.foldingRules = new o("\\:");
    };
    r.inherits(a, i), function() {
        this.lineCommentStart = "#", this.getNextLineIndent = function(e, t, n) {
            var r = this.$getIndent(t), i = this.getTokenizer().getLineTokens(t, e), s = i.tokens;
            if (s.length && s[s.length - 1].type == "comment") return r;
            if (e == "start") {
                var o = t.match(/^.*[\{\(\[\:]\s*$/);
                o && (r += n);
            }
            return r;
        };
        var e = {
            pass: 1,
            "return": 1,
            raise: 1,
            "break": 1,
            "continue": 1
        };
        this.checkOutdent = function(t, n, r) {
            if (r !== "\r\n" && r !== "\r" && r !== "\n") return !1;
            var i = this.getTokenizer().getLineTokens(n.trim(), t).tokens;
            if (!i) return !1;
            do var s = i.pop(); while (s && (s.type == "comment" || s.type == "text" && s.value.match(/^\s+$/)));
            return s ? s.type == "keyword" && e[s.value] : !1;
        }, this.autoOutdent = function(e, t, n) {
            n += 1;
            var r = this.$getIndent(t.getLine(n)), i = t.getTabString();
            r.slice(-i.length) == i && t.remove(new u(n, r.length - i.length, n, r.length));
        }, this.$id = "ace/mode/python";
    }.call(a.prototype), t.Mode = a;
});