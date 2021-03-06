
class ElixirRunWithArgs extends $Plugin
    
    run:->
        $Dialog.input("Command line arguments:", (input)=>
            args = [ "elixir", $Document.info().path ].concat( input.split(" ") );
            args = args.concat((result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Elixir code, the Elixir interpreter must be installed");
            );
            
            $Terminal.exec.apply($Terminal, args);
        );