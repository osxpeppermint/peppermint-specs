class TypescriptParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"module":	 { pattern: "module", start: "{", end: "}" },
			"class":     { pattern: "class", start: "{", end: "}" },
			"function":	 { match: "entity.name.function.ts", start: "{", end: "}" }
		}
		

		pp.utils.parseSymbolTable(dictionary);
