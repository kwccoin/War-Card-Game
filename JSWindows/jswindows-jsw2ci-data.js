/* jswindows/project/jsw2ci-data.js */

/* Table of Contents
  25 I. Library Data
  27     A. jsw2.wobj_list - DOM Element List
  30     B. jsw2.SKINbasics -
  47     C. jsw2.SKIN -
 114     D. CONSTANTS
 127     E. Translatables
 129         1. jsw2.TEXTS -
 149 II. Class-Specific Default Data
 154     A. Borders:
 162     B. Button:
 191     C. Minbox:
 200     D. Panel:
 203     E. Rect:
 212     F. Window:
 230     G. Wobj:
 243 III. Object-Specific Default Data
 245     A. jsw2.DEFAULTS.SCREEN -
*/

'use strict';

/**I Library Data */

/** DOM Element List */
jsw2.wobj_list = {};

/** */
jsw2.SKINbasics = {
	// Never repeat a value in SKIN. Put it here, with a name.
	font_size:					11,
	height:						16,

	opaque_bright:				'white',
	opaque_dark:				'#8080c0',
	opaque_light:				'#c0c0ff',

	transparent:				jsw2.rgba(255, 255, 255, 0),

	translucent_chosen:			jsw2.rgba(150, 240, 250, 0.75),
	translucent_dark:			jsw2.rgba(110, 120, 200, 0.50),
	translucent_light:			jsw2.rgba(150, 240, 250, 0.25)
};

/** */
jsw2.SKIN = {
	// Designer works here.

	// Borders object, Wobj defaults
	border_color:				jsw2.SKINbasics.opaque_light,
	border_color_hover:			jsw2.SKINbasics.opaque_bright,
	border_color_selected:		jsw2.SKINbasics.translucent_chosen,
	border_radii:				 0,
	border_style:				'solid',
	border_width:				 2,

	button_background_color:	jsw2.SKINbasics.opaque_light,
	button_border_color:		jsw2.SKINbasics.opaque_dark,
	button_border_style:		'outset',
	button_border_width:		 2,
	button_border_radii:		 0,
	button_height:				jsw2.SKINbasics.height,
	button_spacer_h:			 1,
	button_width:				13,

	button_close_border_color:			'#ffa080',
	button_close_border_color_hover:	'red',

	cursor:						'default',
	cursor_hover:				'pointer',

	maskable_mask_color:		'rgba(0,0,0, 0.40)',

	minbox_border_width:		 1,
	minbox_borders:				[1, 'solid', 'gray', 0],
	minbox_width:				200,

	panel_background_color:		jsw2.SKINbasics.transparent,

	rect_background_color:		jsw2.SKINbasics.translucent_light,
	rect_border_color:			'orange', // jsw2.SKINbasics.translucent_dark,
	rect_border_style:			'ridge',
	rect_border_width:			 5,
	rect_border_radii:			 0,

	screen_background_color:	jsw2.SKINbasics.transparent,
	screen_border_color:		'gold',
	screen_border_radii:		 0,
	screen_border_style:		'groove',
	screen_border_width:		10,
	screen_font_family:			'Arial, Helvetica, sans-serif',
	screen_font_size:			jsw2.SKINbasics.font_size, // in points
	screen_overflow:			'visible',

	window_background_color:		jsw2.SKINbasics.translucent_light,
	window_border_color:			jsw2.SKINbasics.translucent_dark,
	window_border_radii:			[20, 0, 20, 50],
	window_border_style:			'solid',
	window_border_width:		 	 8,
	window_button_close_left:		 2,
	window_button_close_top:		 2,

	window_title_background:		jsw2.SKINbasics.opaque_bright,
	window_title_cursor:			'move',
	window_title_font_size:			jsw2.SKINbasics.font_size - 2,
	window_title_height:			jsw2.SKINbasics.height,
	window_title_hspace:			 4,
	window_title_padding_bottom:	 0

}; // end SKIN{}

/**A CONSTANTS */

jsw2.CONSTANTS = {
	DPS:	35,			// drags per second
	MPD:	10000,		// 30, // millis per drag (approximate)

	FPS:	25,			// frames per second (40 millis per frame)
	MPF:	1000 / 25,

	MODAL_DELAY: 100,	// time between attempts to launch modal dialog
	QM:		400,		// Quick Morph (millis to maximize / minimize windows)
} // end: CONSTANTS

/**A Translatables */

/** */
jsw2.TEXTS = {
	alert_title:		'Alert Message',

	button_click_msg:	'Button has no click handler.',
	button_close_title: 'Close the window.',
	button_size_title: {
		min:			'Minimize window.',
		0:				'Display window, smallest size.',
		1:				'Display window, normal size.',
		2:				'Display window, large size.',
		max:			'Maximize window.'
	},
	button_untitled:	'Untitled button.',

	window_drag:		'Move window by dragging (slowly).',
	window_untitled:	'Untitled Window'

} // end: TEXT{}

/**I Class-Specific Default Data */

jsw2.DEFAULTS = {
	// SKIN never gets into App. DEFAULT uses SKIN. App uses DEFAULT.

	/** */
	Borders: {
		color: jsw2.SKIN.border_color,
		style: jsw2.SKIN.border_style,
		width: jsw2.SKIN.border_width,
		radii: jsw2.SKIN.border_radii
	},

	/** */
	Button: {
		background_color:	jsw2.SKIN.button_background_color,
		border_color:		jsw2.SKIN.button_border_color,
		border_style:		jsw2.SKIN.button_border_style,
		border_width:		jsw2.SKIN.button_border_width,
		border_radii:		jsw2.SKIN.button_border_radii,
		height:				jsw2.SKIN.button_height,
		spacer_h:			jsw2.SKIN.button_spacer_h,
		width:				jsw2.SKIN.button_width
	},

	Button_close: {
		background_color:	jsw2.SKIN.button_background_color,
		border_color:		jsw2.SKIN.button_close_border_color,
		border_color_hover:	jsw2.SKIN.button_close_border_color_hover
	},

	Closable: {
		button_height:		jsw2.SKIN.button_height,
		button_left:		'1 -' + jsw2.SKIN.window_button_close_left,
		button_top:			'0 +' + jsw2.SKIN.window_button_close_top,
		button_width:		jsw2.SKIN.button_width
	},

	Maskable: {
		mask_color:			jsw2.SKIN.maskable_mask_color
	},

	/** */
	Minbox: {
		border_width:		jsw2.SKIN.minbox_border_width,
		borders:			jsw2.SKIN.minbox_borders,
		height:				jsw2.SKIN.button_height,
		min_height:			 2,
		width:				jsw2.SKIN.minbox_width
	},

	/** */
	Panel: { background_color: jsw2.SKIN.panel_background_color },

	/** */
	Rect: {
		background_color:	jsw2.SKIN.rect_background_color,
		border_color:		jsw2.SKIN.rect_border_color,
		border_radii:		jsw2.SKIN.rect_border_radii,
		border_style:		jsw2.SKIN.rect_border_style,
		border_width:		jsw2.SKIN.rect_border_width
	},

	/** */
	Window: {
		background_color:		jsw2.SKIN.window_background_color,
		border_color:			jsw2.SKIN.window_border_color,
		border_radii: 			jsw2.SKIN.window_border_radii,
		border_style:			jsw2.SKIN.window_border_style,
		border_width:			jsw2.SKIN.window_border_width,

		title_background:		jsw2.SKIN.window_title_background,
		title_cursor:			jsw2.SKIN.window_title_cursor,
		title_font_size:		jsw2.SKIN.window_title_font_size,
		title_height:			jsw2.SKIN.window_title_height,
		title_hover_bg:			'white',
		title_hspace:			jsw2.SKIN.window_title_hspace,
		title_padding_bottom:	jsw2.SKIN.window_title_padding_bottom,
		title_top:				'0 +' + jsw2.SKIN.window_button_close_top
	},

	/** */
	Wobj: {
		border_color:			jsw2.SKIN.border_color,
		border_color_hover: 	jsw2.SKIN.border_color_hover,
		border_color_chosen:	jsw2.SKIN.border_color_chosen,
		border_style:			jsw2.SKIN.border_style,
		border_width:			jsw2.SKIN.border_width,
		cursor:					jsw2.SKIN.cursor,
		cursor_hover:			jsw2.SKIN.cursor_hover
	}

} // end: DEFAULTS{}

/**I Object-Specific Default Data */

/** */
jsw2.DEFAULTS.SCREEN = {
	background_color:		jsw2.SKIN.screen_background_color,
	border_color:			jsw2.SKIN.screen_border_color,
	border_radii:			jsw2.SKIN.screen_border_radii,
	border_style:			jsw2.SKIN.screen_border_style,
	border_width:			jsw2.SKIN.screen_border_width,
	font_family:			jsw2.SKIN.screen_font_family,
	font_size:				jsw2.SKIN.screen_font_size,
	overflow:				jsw2.SKIN.screen_overflow
}

// alert( 'jsw2ci-data.js loaded' );

/* end of jsw2ci-data.js */