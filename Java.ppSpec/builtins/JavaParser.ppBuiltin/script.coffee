class JavaParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "package":     { pattern: "package" },
            "interface": { pattern: "interface", start: "lparen:{", end: "rparen:}" },
            "class":     { pattern: "class", start: "lparen:{", end: "rparen:}" }
        }

        pp.utils.parseSymbolTable(dictionary);
