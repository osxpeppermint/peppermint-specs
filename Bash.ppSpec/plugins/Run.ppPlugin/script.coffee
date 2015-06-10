
class BashRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Bash"], "");

