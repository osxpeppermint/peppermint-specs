
class HtmlPreview extends $Plugin

	run:->
		$Preview.load("Html ❯ Preview", $Document.info().content, $Document.info().folder);
