
class HamlLivePreview extends $Plugin

    init:->
        @include("haml");

    loadPreview:->
        try
            result = haml.compileHaml({ source: $Document.info().content })();
            $Preview.loadDocument("Haml ❯ Live Preview", result, "html");
            
        catch e
            # Don't do anything

    run:->
        @loadPreview();
        @on.documentChanged(()=>
            @loadPreview();
        );
