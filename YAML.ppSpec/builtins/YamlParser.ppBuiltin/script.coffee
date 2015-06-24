class YamlParser extends $Builtin

    init:->
        @startRun(2000);
        @include("yaml.min.js");

    run:->
        
        try
            result = window.yaml.compose($Editor.content());
            
            root = { type: "root", value: 0, position: 0, symbols: [] };

            if result.tag == "tag:yaml.org,2002:map"
                for item in result.value
                    val = item[0];

                    if val.tag == "tag:yaml.org,2002:str"
                        root.symbols.push({ type: "attribute", value: val.value, position: val.start_mark.line+1, symbols: []});
                        
            core.setElemSymbolTable_(JSON.stringify(root));
            
        catch error
            ## Do nothing
        
    halt:->
        
