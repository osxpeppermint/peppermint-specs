class HaxeOpenFLParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "class":        { pattern: "class", start: "{", end: "}" },
		    "function":     { pattern: "function", start: "{", end: "}" },
		    "interface":    { pattern: "interface", start: "{", end: "}" },
		    "variable":     { pattern: "var" },
		    "package":      { pattern: "package" }
		}

		pp.utils.parseSymbolTable(dictionary);
