class ObjectivecParser extends $Builtin

	init:->
		@startRun(2000);

	run:->
		dictionary =
		{
			"protocol":	 { pattern: "punctuation.definition.storage.type.objc:protocol" },
			"interface": { pattern: "punctuation.definition.storage.type.objc:interface" },
			"class":	 { pattern: "storage.type.objc:@implementation" }
		}

		pp.utils.parseSymbolTable(dictionary);
