class ActionscriptParser extends $Builtin

    init:->
        @startRun(2000);

    run:->
        dictionary =
        {
            "package":        { pattern: "package", start: "{", end: "}" },
            "class":        { pattern: "storage.type.class.actionscript.2:class", start: "text:{", end: "text:}" },
            "function":     { pattern: "storage.type.function.actionscript.2:function", start: "text:{", end: "text:}" },
            "variable":        { pattern: "keyword.control.actionscript.2:var" }
        }

        pp.utils.parseSymbolTable(dictionary,["meta.class.actionscript.2","meta.function.actionscript.2"]);
