class XmlParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        pp.utils.parseXMLSymbolTable();

