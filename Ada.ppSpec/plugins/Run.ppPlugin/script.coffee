class AdaRun extends $Plugin
    
    run:->
        outputFile = $Document.info().path.replace( ".#{ $Document.info().extension }", "");
        $Terminal.execPattern(@env["Ada"], outputFile,
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Ada code, the GNAT compiler must be installed");
                else
                    $Terminal.exec(outputFile);
                                    
        );

