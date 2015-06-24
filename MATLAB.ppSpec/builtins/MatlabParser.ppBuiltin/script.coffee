class MatlabParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"class":	 { pattern: "classdef" },
			"function":  { pattern: "function" }
		}

		pp.utils.parseSymbolTable(dictionary);
