
class GoRun extends $Plugin
    
    run:->
        path = $Document.info("go").path;

        $Terminal.execPattern(@env["Go"], "", 
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Go code, the Go compiler must be installed");
        );  


