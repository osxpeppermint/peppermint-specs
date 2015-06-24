class AdaParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "package":      { pattern: "package", start: "{", end: "}" },
            "method":       { pattern: "procedure", start: "keyword:begin", end: "keyword:end" },
            "function":     { pattern: "function", start: "keyword:begin", end: "keyword:end" }
        }

        pp.utils.parseSymbolTable(dictionary);
