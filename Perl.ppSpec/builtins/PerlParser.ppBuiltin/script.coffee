class PerlParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "function":     { pattern: "sub", start: "{", end: "}" },
		    "property":    	{ pattern: "my" },
		    "package":    	{ pattern: "package" }
		}

		pp.utils.parseSymbolTable(dictionary);
