class LispParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"function":  { pattern: "storage.type.function-type.lisp:defun" }
		}

		pp.utils.parseSymbolTable(dictionary);
