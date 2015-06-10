class ElmBuild extends $Plugin

	run:->
		withoutExt = $Document.info().path.replace(".#{ $Document.info().extension }", "");
		outputFile = withoutExt + ".js";
		$Terminal.exec("elm-make",$Document.info().path,"--yes","--output", outputFile, 
			(result)=>
				if result.indexOf("No such file or directory") > -1
					$Dialog.alert("Compiler not found","");
		);
