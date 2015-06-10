
class PrologRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Prolog"], "",
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Prolog code, the SWI-Prolog compiler must be installed");
        );


