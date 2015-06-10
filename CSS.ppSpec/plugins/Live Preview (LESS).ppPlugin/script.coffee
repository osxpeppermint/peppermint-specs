
class CssLivePreviewLess extends $Plugin

    loadPreview:->
        try
            lessParser = new css2less($Document.info().content, {});
            lessParser.processLess();

            $Preview.loadDocument("CSS ❯ Live Preview (LESS)", lessParser.less, "less");
        catch e
            # Don't do anything

    init:->
        @include("css2less");

    run:->
        @loadPreview();
        @on.documentChanged(()=>
            @loadPreview();
        );        
        