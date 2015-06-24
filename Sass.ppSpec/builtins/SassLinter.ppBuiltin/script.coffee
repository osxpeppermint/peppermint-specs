
class SassLinter extends $Builtin

    init:->
        @startRun(1000);
        console.log("SassLinter:: init");
        @include("sassjs/sass.sync.js");

    run:->
        ###
        try
            window.yaml.load($Editor.content());
            $Editor.annotate();
        catch error
            errors = [{
                row: error.problem_mark.line-1,
                column: 0,
                text: error.problem,
                type: "error"
            }];
            
            $Editor.annotate(errors);
        ###
        
    halt:->
        $Editor.annotate();