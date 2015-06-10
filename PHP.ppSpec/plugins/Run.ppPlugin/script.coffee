
class PhpRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["PHP"], "");


