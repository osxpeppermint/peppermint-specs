class OpenflRun extends $Plugin
    
    run:->
        projectFolder = $Workspace.info().currentProject;
        $Dialog.radio("Select platform: ", ["neko", "html5", "flash"],
        (input)=>
            $Terminal.exec("openfl", "test", projectFolder, input, 
                (result)=>
                    $Terminal.echo(result);
            );
        );
