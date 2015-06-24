class JavascriptParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "function":     { pattern: "storage.type:function", start: "{", end: "}" }
		}

		pp.utils.parseSymbolTable(dictionary);
