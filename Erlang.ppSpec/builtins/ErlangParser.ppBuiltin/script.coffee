class ErlangParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "function":  { match: "entity.name.function.definition.erlang" }
        }

        pp.utils.parseSymbolTable(dictionary);
