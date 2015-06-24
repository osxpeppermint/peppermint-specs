

class YamlPreview extends $Plugin
    init:->
        @include("yaml.min.js");
        @include("json.beautify.js");
        
    run:->
        try
            $Preview.loadDocument("YAML ❯ Preview", js_beautify( JSON.stringify( yaml.load( $Editor.content() ) ), { 'indent_size':1, 'indent_char':"\t"} ), "JSON");
        catch error
            # Do nothing
            
            
        
