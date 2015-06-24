class StylusParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"function":	 { match: "entity.name.function.stylus" }
		}
		

		pp.utils.parseSymbolTable(dictionary);
