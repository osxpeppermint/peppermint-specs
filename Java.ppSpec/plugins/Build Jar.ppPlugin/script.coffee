
class JavaBuild extends $Plugin
    
    run:->
        doc = $Document.info();
        
        $Terminal.exec("javac", doc.path,
            (result)=>
                if !$Fs.fileExists("#{ doc.folder }/META-INF")
                    $Fs.createFolder("#{ doc.folder }/META-INF");
                    
                className = doc.filename.replace(".#{ doc.extension }", "");
                    
                $Document.write("#{ doc.folder }/META-INF/MANIFEST.FM", "Main-Class: #{ className }\n");
                
                $Terminal.exec("jar", "cfm", "#{ doc.folder }/#{ className }.jar", "#{ doc.folder }/META-INF/MANIFEST.FM", "-C", "#{ doc.folder }", "#{ className }.class",
                    (result)=>
                        $Terminal.echo("JAR file created.");
                );
        );

