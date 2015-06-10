
class CssCompileLess extends $Plugin

    init:->
        @include("css2less");

    run:->
        try
            lessParser = new css2less($Document.info().content, {});
            lessParser.processLess();

            core.document_write_("#{ $Document.info().path }.less", lessParser.less );
        catch e
            @displayError(e);
        

    displayError: (error)->
        errorMessage = "";
        if error
            if error.name
                errorMessage += error.name + ": ";
            if error.message
                errorMessage += error.message;
        if errorMessage==""
            errorMessage = "Unknown error";

        $Terminal.echo("CSS:: error: #{errorMessage}");
        