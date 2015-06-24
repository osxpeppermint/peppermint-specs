
class LessLinter extends $Builtin

    init:->
        @startRun(1000);

    run:->
        window.less.Parser().parse($Editor.content(), (error,result)->
            errors = [];
            if error?
                errors = [{
                    column: error.column,
                    row: error.line-1,
                    text: error.message,
                    type: "error"
                }];
            $Editor.annotate(errors);
        );

    halt:->
        $Editor.annotate();