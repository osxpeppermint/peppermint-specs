
class ErlangRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Erlang"], "",
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Erlang code, the Erlang interpreter must be installed");
        );  


