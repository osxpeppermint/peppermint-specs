
class ErlangRunWithArgs extends $Plugin
    
    run:->
        $Dialog.input("Command line arguments:", (input)=>
            args = [ "escript", $Document.info().path ].concat( input.split(" ") );
            args = args.concat((result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Erlang code, the Erlang interpreter must be installed");
            );
            
            $Terminal.exec.apply($Terminal, args);
        );