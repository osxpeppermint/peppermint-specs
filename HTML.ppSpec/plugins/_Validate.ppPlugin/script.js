html_validate =
{
	init: function()
	{
		var htmlPath = pp.getFullPath();

		if (htmlPath=="")
		{
			htmlPath = core.getTempFile_withExtension_(pp.getContent(),"html");
		}

		pp.execRuby(
			__fullPath + "/validator.rb",
			htmlPath,
			"html_validate.validated(%@);"
		);
	},

	validated: function(results)
	{
		result = eval(results);
		result = result[0];
		core.loadUtilityWithHtml_(result);
	},

	halt: function()
	{

	}
}