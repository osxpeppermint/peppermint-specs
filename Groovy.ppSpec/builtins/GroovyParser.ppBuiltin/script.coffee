class GroovyParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "class":	 { pattern: "class", start: "lparen:{", end: "rparen:}" },
		    "function":  { pattern: "def", start: "lparen:{", end: "rparen:}" }
		}

		pp.utils.parseSymbolTable(dictionary);
