
class ScalaRun extends $Plugin
    
    run:->
    	content = $Document.info().content;
    	content = "#!/bin/sh\nexec \"scala\" \"$0\" \"$@\"\n!#\n#{content}";
    	$Terminal.exec("bash", $Document.temp(content).path);
    	###
        outputFile = $Document.info().path.replace( ".#{ $Document.info().extension }", "");
        $Terminal.exec("scalac", $Document.info().path, "-d", $Document.info().folder,
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Scala code, Scala and the Java compiler must be installed");
                else
                    $Terminal.exec("scala", outputFile);
                                    
        );
		###