
class HtmlLivePreview extends $Plugin

    run:->
        $Preview.load("Html ❯ Live Preview", $Document.info().content, $Document.info().folder);
        @on.documentChanged(()=>
            $Preview.load("Html ❯ Live Preview", $Document.info().content, $Document.info().folder);
        );
