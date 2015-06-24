class CsharpParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "namespace" : { pattern: "namespace" },
            "interface" : { pattern: "interface" },
            "class": { pattern: "class" }
        }
        

        pp.utils.parseSymbolTable(dictionary);
