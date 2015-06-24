class GoParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "package":	 { pattern: "package" },
		    "function":  { pattern: "func", start: "{", end: "}" }
		}

		pp.utils.parseSymbolTable(dictionary);
