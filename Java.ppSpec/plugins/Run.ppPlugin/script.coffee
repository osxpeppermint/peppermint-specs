
class JavaRun extends $Plugin
    
    run:->
        outputFile = $Document.info().path.replace( "#{$Document.info().folder}", "").replace(".#{$Document.info().extension}","");
        $Terminal.execPattern(@env["Java"], outputFile,
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Java code, the Java compiler must be installed");
                else
                    $Terminal.exec("java", "-classpath", $Document.info().folder, outputFile);
                                    
        );
