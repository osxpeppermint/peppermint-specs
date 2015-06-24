class TclParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"function":	 { pattern: "proc", start: "{", end: "}" },
		}
		

		pp.utils.parseSymbolTable(dictionary);
