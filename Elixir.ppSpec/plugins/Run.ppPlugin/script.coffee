
class ElixirRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Elixir"], "",
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Elixir code, the Elixir interpreter must be installed");
        );  


