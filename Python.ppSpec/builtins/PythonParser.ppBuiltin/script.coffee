class PythonParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "class":        { pattern: "class" },
		    "function":     { pattern: "def" }
		}

		pp.utils.parseSymbolTable(dictionary);
