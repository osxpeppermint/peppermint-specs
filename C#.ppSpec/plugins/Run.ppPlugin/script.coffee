class CsRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["C#"], "",
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute C# code, the Mono compiler must be installed");
                else
                    output = $Document.info().path.replace( ".#{$Document.info().extension}", "") + ".exe";
                    $Terminal.exec("mono", output);
                                    
        );
