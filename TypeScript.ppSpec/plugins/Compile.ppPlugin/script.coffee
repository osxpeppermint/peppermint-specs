

class TypescriptCompile extends $Plugin

    run:->
        @filepath = $Document.info("ts").path;
        @output = @filepath.replace(".ts",".js");

        $Terminal.exec(@bin["node"], @bin["typescript"], @filepath, (done)=>
            $Terminal.execSilent("cat", @output,                 
                (interm)=>
                ,
                (result)=>
                    if result.indexOf("No such file or directory") == -1
                        core.document_write_("#{ $Document.info().path }.js", result );
            );
        );
    