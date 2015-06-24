class AssemblyParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "section":      { pattern: "support.function.directive.assembly:section" },
            "function":     { match: "entity.name.function.assembly" }
        }

        pp.utils.parseSymbolTable(dictionary,[]);
