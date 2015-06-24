class ClojureParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "function":     { pattern: "support.function:defn" }
		}

		pp.utils.parseSymbolTable(dictionary);
