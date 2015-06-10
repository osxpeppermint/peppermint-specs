

class TypescriptPreview extends $Plugin

    loadPreview:->
        @filepath = $Document.info("ts").path;
        @output = @filepath.replace(".ts",".js");

        $Terminal.exec(@bin["node"], @bin["typescript"], @filepath, (done)=>
            $Terminal.execSilent("cat", @output, 
                (interm)=>
                ,
                (result)=>
                    if result.indexOf("No such file or directory") == -1
                        $Preview.loadDocument("TypeScript ❯ Preview", result, "javascript");
            );
        );

    run:->
        @loadPreview();
        
