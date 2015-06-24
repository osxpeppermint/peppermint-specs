class PHPParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "class":        { pattern: "class", start: "{", end: "}" },
		    "function":     { pattern: "function", start: "{", end: "}" },
		    "interface":    { pattern: "interface", start: "{", end: "}" },
		    "namespace":    { pattern: "namespace" }
		}

		pp.utils.parseSymbolTable(dictionary);
