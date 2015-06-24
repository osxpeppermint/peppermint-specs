
class YamlToJson extends $Plugin

    init:->
        @include("yaml.min.js");
        @include("json.beautify.js");
    
    run:->
        try
            result = window.yaml.load($Editor.content());
            if $Editor.selection()==""
                $Editor.content( js_beautify( JSON.stringify( yaml.load( $Editor.content() ) ), { 'indent_size':1, 'indent_char':"\t"} ) );
            else
                $Editor.selection( js_beautify( JSON.stringify( yaml.load( $Editor.selection() ) ), { 'indent_size':1, 'indent_char':"\t"} ) );
            
        catch error
            # Do nothing