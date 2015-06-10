class HaskellRun extends $Plugin
    
    run:->
        outputFile = $Document.info().path.replace(".#{ $Document.info().extension }","");
        $Terminal.execPattern(@env["Haskell"], outputFile,
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Haskell code, the Glasgow Haskell compiler must be installed");
                else
                    $Terminal.exec(outputFile);
                                    
        );
