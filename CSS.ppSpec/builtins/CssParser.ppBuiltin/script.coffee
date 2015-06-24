class CssParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
		    "macro":     { match: "keyword" },
		    "class":	 { match: "variable" },
		    "tag":		 { match: "constant" }
		}

		pp.utils.parseSymbolTable(dictionary);
