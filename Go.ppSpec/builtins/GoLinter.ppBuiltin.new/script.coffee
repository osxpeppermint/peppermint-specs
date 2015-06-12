
class GoLinter extends $Builtin

    init:->
        @startRun(1000);

    run:->
        doc = $Document.temp($Editor.content(),"go","GoLinter");

        $Terminal.execBg("go","build", doc.path,
            (intermediate)=>,    
            (result)=>
                lines = result.split("\n");

                p = lines[1].split(":");
                row = parseInt(p[1])-1;
                text = lines[1].replace("#{p[0]}:#{p[1]}:","").trim();

                errors = [{ 
                    column: 0, 
                    row: row, 
                    text: text,
                    type: "error" 
                }];

                $Editor.annotate(errors);
        );

    halt:->
        $Editor.annotate();