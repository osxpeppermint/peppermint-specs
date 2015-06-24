class PrologParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"function":  { match: "entity.name.function.rule.prolog" },
			"constant":	 { match: "entity.name.function.fact.prolog" }
		}

		pp.utils.parseSymbolTable(dictionary);
