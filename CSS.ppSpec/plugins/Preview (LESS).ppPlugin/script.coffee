
class CssPreviewLess extends $Plugin

    init:->
        @include("css2less");

    run:->
        try
            lessParser = new css2less($Document.info().content, {});
            lessParser.processLess();

            $Preview.loadDocument("CSS ❯ Preview (LESS)", lessParser.less, "less");
        catch e
            # Don't do anything

        