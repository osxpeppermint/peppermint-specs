
class SchemeRun extends $Plugin
    
    run:->
        $Terminal.execPattern(@env["Scheme"], "",
            (result)=>
                $Terminal.write( $Document.info().content );
                
        );


