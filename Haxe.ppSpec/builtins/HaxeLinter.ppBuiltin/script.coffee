
class HaxeLinter extends $Builtin

    init:->
        @startRun(1000);

    run:->
        doc = $Document.temp($Editor.content(),"hx","HaxeLinter");

        $Terminal.execBg("haxe","--cwd", doc.folder, doc.filename, "--no-output",
            (intermediate)=>,    
            (result)=>
                lines = result.split("\n");

                errors = [];
                for line in lines
                    if line.trim()
                        p = line.replace(doc.filename,"").split(":");

                        errors.push({ 
                            column: 0, 
                            row: parseInt(p[1])-1, 
                            text: p[3].trim(), 
                            type: "error" 
                        });
                        
                $Editor.annotate(errors);
        );

    halt:->
        $Editor.annotate();