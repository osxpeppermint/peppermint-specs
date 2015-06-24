class LuaParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"function":  { pattern: "function" }
		}

		pp.utils.parseSymbolTable(dictionary);
