
class ApplescriptRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["AppleScript"], "");


