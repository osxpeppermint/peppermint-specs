class DRun extends $Plugin
    
    run:->
        outputFile = $Document.info().path.replace( ".#{ $Document.info().extension }", "");
        $Terminal.execPattern(@env["D"], outputFile,
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute D code, the DMD compiler must be installed");
                else
                    $Terminal.exec(outputFile);
                                    
        );

