
class PythonLinter extends $Builtin

    init:->
        @startRun(1000);

    run:->
        doc = $Document.temp($Editor.content(),"py","PythonLinter");

        $Terminal.execBg("python", "-m", "py_compile", doc.path,
            (intermediate)=>,    
            (result)=>
                lines = result.split("\n");

                if lines.length<1
                    $Editor.annotate();
                else
                    #for line in lines
                        #$Terminal.echo("==> #{ line }");

                    row = parseInt(lines[0].split(" line ")[1].trim())-1;
                    text = lines[lines.length-2].trim();
                    
                    errors = [];
                    errors.push({
                        column: 0,
                        row: row,
                        text: text,
                        type: "error"
                    });
                        
                    $Editor.annotate(errors);
        );

    halt:->
        $Editor.annotate();