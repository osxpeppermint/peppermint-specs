class ForthParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "function":	 { match: "entity.name.function.forth" }
		}

		pp.utils.parseSymbolTable(dictionary);
