class FortranParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "section" : { pattern: "storage.modifier.fortran.modern:program" },
            "function" : { pattern: "storage.modifier.fortran.modern:function" }
        }
        

        pp.utils.parseSymbolTable(dictionary,[]);
