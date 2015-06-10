
class LatexPreview extends $Plugin

    run:->
        content = $Document.info().content;
        template = @import("index.html");
        template = template.replace("%CONTENT%", content);

        $Preview.load("LaTeX ❯ Preview", template, "#{ @path }/latex");

        