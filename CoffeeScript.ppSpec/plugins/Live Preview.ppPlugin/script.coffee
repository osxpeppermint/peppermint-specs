

class CoffeescriptLivePreview extends $Plugin

    loadPreview:->
        try
            $Preview.loadDocument("CoffeeScript ❯ Live Preview", pp.utils.coffee($Document.info().content), "JavaScript");
        catch error
            # Don't do anything

    run:->
        @loadPreview();
        @on.documentChanged(()=>
            @loadPreview();
        );
