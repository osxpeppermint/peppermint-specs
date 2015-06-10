
class ClojureRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Clojure"], "", 
            (result)=>
                if result.indexOf("No such file or directory") > -1
                    $Dialog.alert("Compiler not found","To execute Clojure code, the Java compiler must be installed");
        );  


