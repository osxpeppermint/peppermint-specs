class LessParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "variable":  { match: "variable", start: "{", end: "}" },
            "class":     { match: "variable.language", start: "{", end: "}" }
        }

        pp.utils.parseSymbolTable(dictionary);
