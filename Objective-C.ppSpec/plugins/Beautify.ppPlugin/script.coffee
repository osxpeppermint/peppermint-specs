
class ObjectivecBeautify extends $Plugin

    init:->

    run:->
        if $Editor.selection()==""
            content = true;
            input = $Document.temp( $Editor.content() ).path;
        else
            content = false;
            input = $Document.temp( $Editor.selection() ).path;

        config = "#{ @bin['uncrustify'].replace('uncrustify/uncrustify','uncrustify').replace(' ','\x20') }/default.cfg";
        $Terminal.execSilent(@bin["uncrustify"], "-c", config, "-l", "OC", "-q", "-f", input,
            (intermediate)=>
            ,
            (result)=>
                if content
                    $Editor.content(result);
                else
                    $Editor.selection(result);
        );


