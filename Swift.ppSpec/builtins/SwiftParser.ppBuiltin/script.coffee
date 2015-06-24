class SwiftParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"class":	 { pattern: "storage.type:class", start: "{", end: "}" },
			"function":	 { pattern: "storage.type:func", start: "{", end: "}" },
			"struct":	 { pattern: "storage.type:struct", start: "{", end: "}" },
			"protocol":	 { pattern: "storage.type:protocol", start: "{", end: "}" }
		}
		

		pp.utils.parseSymbolTable(dictionary);
