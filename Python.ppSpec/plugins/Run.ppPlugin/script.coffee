
class PythonRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Python"], "");


