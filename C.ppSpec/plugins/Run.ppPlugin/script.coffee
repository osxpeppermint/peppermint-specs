class CRun extends $Plugin
    
    run:->
        outputFile = $Document.info("c").folder + "a.out";
        $Terminal.execPattern( @env["C"], outputFile,
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute C code, the Clang compiler must be installed");
                else
                    $Terminal.exec(outputFile);
                                    
        );

