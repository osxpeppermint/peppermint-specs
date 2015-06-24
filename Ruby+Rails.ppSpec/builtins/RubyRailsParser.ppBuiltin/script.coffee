class RubyRailsParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "class":        { pattern: "class" },
            "property":     { pattern: "support.function:attr_accessor" },
            "function":     { pattern: "def" },
            "module":       { pattern: "module" }
        }

        pp.utils.parseSymbolTable(dictionary);
