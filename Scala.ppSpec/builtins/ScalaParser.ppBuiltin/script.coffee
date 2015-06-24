class ScalaParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"package":	 { pattern: "package" },
			"object":    { pattern: "object", start: "{", end: "}" },
			"class":	 { pattern: "class", start: "{", end: "}" },
			"function":	 { pattern: "def", start: "{", end: "}" }
		}

		pp.utils.parseSymbolTable(dictionary);
