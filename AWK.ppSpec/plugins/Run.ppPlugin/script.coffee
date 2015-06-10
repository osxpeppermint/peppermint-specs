class AwkRun extends $Plugin

	run:->
		$Terminal.exec("awk", "-f", $Document.info().path,
			(result)=>
				if result.indexOf("No such file or directory") > -1
					$Dialog.alert("Compiler not found","");
		);
