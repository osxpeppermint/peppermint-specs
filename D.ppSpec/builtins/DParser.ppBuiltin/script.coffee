class DParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        tokens  = pp.editor.tokenize(["text"]);
        root    = { type: "root", value: 0, position: 0, symbols: [] };
        
        t=0;
        while t<tokens.length

            if tokens[t].t == "keyword.type" and t+1<tokens.length
                if tokens[t+1].t == "identifier" and t+2<tokens.length
                    if tokens[t+2].t == "paren.lparen"
                        root.symbols.push({
                            type: "function",
                            value: tokens[t+1].v.trim(),
                            position: tokens[t+1].p,
                            symbols: []
                        });

            if tokens[t].t == "keyword.storage" and tokens[t].v == "class" and t+1<tokens.length
                if tokens[t+1].t == "entity.name.type"
                    root.symbols.push({
                        type: "class",
                        value: tokens[t+1].v.trim(),
                        position: tokens[t+1].p,
                        symbols: []
                    });

            t+=1;
        
        core.setElemSymbolTable_(JSON.stringify(root));
