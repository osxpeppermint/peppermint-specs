
class PerlRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Perl"], "");


