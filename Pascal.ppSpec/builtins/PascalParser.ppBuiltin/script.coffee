class PascalParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "section":        { pattern: "keyword.control.pascal:program" },
            "method":         { pattern: "variable.pascal:procedure", start: "keyword.control.pascal:begin", end: "keyword.control.pascal:end" },
            "function":     { pattern: "variable.pascal:function", start: "keyword.control.pascal:begin", end: "keyword.control.pascal:end" }
        }

        pp.utils.parseSymbolTable(dictionary);
