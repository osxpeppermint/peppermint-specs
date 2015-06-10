//************************************************************
//  Contrast plugin for Image
//  Peppermint
//
//  Coded by Dr.Kameleon
//
//  Copyright (c) 2011-2014 InSili.co.
//  All rights reserved.
//************************************************************

image_contrast =
{

	init: function()
	{
		core.slider_min_max_val_change_callback_("Contrast level",0,10,0,"image_contrast.valueChanged('%g');","image_contrast.valueEntered('%g');");
	},

	valueChanged: function(val)
	{
		$("#imageviewer img").css("-webkit-filter","contrast(" + val + ")");
	},

	valueEntered: function(val)
	{
		$("#imageviewer img").css("-webkit-filter","contrast(" + val + ")");
	},

	halt: function()
	{

	}
}
