class CoffeescriptParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "class":     { pattern: "class" },
            "method":    { match: "entity.name.function" }
        }

        pp.utils.parseSymbolTable(dictionary);
