/* jswindows/project/jsw2ci-capabilities.js */

/* Table of Contents
  44 I. Capabilities
  46     A. Button_sizable
  48         1. jsw2.Button_sizable()
 139         2. jsw2.Button_sizable.click_max_func()
 211         3. jsw2.Button_sizable.Button()
             Button_sizable.Button extends Button.
 239         4. jsw2.Button_sizable.Button.prototype.choose() The Choices
                                                                    interface.
 248         5. jsw2.Button_sizable.Button.prototype.punch()
 259         6. jsw2.Button_sizable.Button.prototype.unpunch()
 270         7. jsw2.Button_sizable.Button.prototype.toString()
 277         8. jsw2.Button_sizable.Panel()
             Button_sizable.Panel extends Panel.
 304         9. jsw2.Button_sizable.Panel.prototype.choose()
 313         10. jsw2.Button_sizable.click_funcs -
 322         11. jsw2.Button_sizable.draw_funcs -
 359     B. Closable
 361         1. jsw2.Closable()
 375     C. Maskable
 384         1. jsw2.Maskable()
 392         2. jsw2.Maskable.prototype.mask()
 412         3. jsw2.Maskable.prototype.unmask()
 423         4. jsw2.Maskable.prototype.toString()
 428     D. Movable
 430         1. jsw2.Movable()
 445         2. Movable Inner Functions
 447             a) hover()
 456             b) hover_end()
 464             c) mousedown()
 475             d) mousemove()
 485             e) mouseout()
 496             f) mouseover()
 504             g) mouseup()
 513             h) move()
 535             i) mover()
 554             j) mover() inner functions
 556                 (2) start_drag()
 567                 (4) stop_drag()
*/

/**I Capabilities */

/**A Button_sizable */

/** */
jsw2.Button_sizable = function (window, button_names) {
	var new_button_sizable = this;

	var spacer = jsw2.DEFAULTS.Button.spacer_h,
		width = jsw2.DEFAULTS.Button.width,
		bwidth = width + spacer;

	var panel = new jsw2.Button_sizable.Panel(window, button_names);
	var def_name = choose_default_button();

	new_button_sizable.button_names = button_names,
	new_button_sizable.panel = panel

	for (var i in button_names) {

		var button_name = button_names[i],
			left = (button_names.length - i - 1) * bwidth + spacer,
			button = new jsw2.Button_sizable.Button(
					new_button_sizable.panel, left, button_name);

		if (button_name === def_name) {
				panel.buttons.add_and_choose(button); }
		else {
			panel.buttons.add(button);
			button.enable();
		}
		button.short_name = button_name;
		button.window_borders = jsw2.shallow_copy(window.borders);
		if (button_name === 'min') button.window_borders.width = 1;

		if ( (button_name === 'min') || (button_name === 'max') ) {
				continue; }

		if (button_name < def_name) {
			button.window_pos_size = size_smaller(window.pos_size);
		} else if (button_name > def_name) {
			button.window_pos_size = size_larger(window.pos_size);
		} else { button.window_pos_size = new jsw2.Pos_size(window.pos_size); }

	} // end: for (i in button_names)

	panel.buttons.show_choices(); // display, punched appropriately

	new_button_sizable.new_pos = function (window) {
		for (var i in window.Button_sizable.panel.buttons.array) {
			var button = window.Button_sizable.panel.buttons.array[i];
			if ( (button.short_name !== 'min') &&
					(button.short_name !== 'max') ) {

				button.window_pos_size.specs.left = window.pos_size.left;
				button.window_pos_size.specs.top  = window.pos_size.top;
			}
		} // end (for i in panel buttons)
	} // end: new_pos()

	function choose_default_button() {
		// choose default for 'return to launch size'
		if ( value_in('1', button_names) ) { return '1'; }
		if ( value_in('0', button_names) ) { return '0'; }
		if ( value_in('2'. button_names) ) { return '2'; }
		return undefined;

		function value_in(val, list) {
			for (var i in list) { if (list[i] === val) { return true; } }
			return false;
		}
	}

	function size_larger(def_size) {
		var factor = 1.4; // about double when applied to width and height

		// 'Pos_size.resize' is NOT 'Pos_size.prototype.resize'.
		var wid = jsw2.Pos_size.resize(def_size.specs.width,  factor);
		var hgt = jsw2.Pos_size.resize(def_size.specs.height, factor);
		return new jsw2.Pos_size(def_size.window,
				def_size.specs.left,def_size.specs.top, wid,hgt);
	}

	function size_smaller(def_size) {
		var factor = 0.7; // about half when applied to width and height

		// 'Pos_size.resize' is NOT 'Pos_size.prototype.resize'.
		var wid = jsw2.Pos_size.resize(def_size.specs.width,  factor);
		var hgt = jsw2.Pos_size.resize(def_size.specs.height, factor);
		return new jsw2.Pos_size(def_size.window,
				def_size.specs.left,def_size.specs.top, wid,hgt);
	}

} // end Button_sizable();

/** */
jsw2.Button_sizable.click_max_func = function () {
	var delem			= this,
		button			= jsw2.wobj_list[delem.id],
		panel			= button.container,
		window			= panel.container;

	if ( window.state_is('minimized') ) {
		var minbox = window.container,
			container = minbox.container;

		window.minimize(false, container);
	}

	window.pos_size = new jsw2.Pos_size( window, 0,0, '1 C','1 C' );
	window.borders = jsw2.shallow_copy(button.window_borders);
	window.fit_inside( window.container );

	window.draw();
	panel.choose(button);

} // end: Button_sizable.click_max_func()

jsw2.Button_sizable.click_min_func = function () {
	var delem			= this,
		button			= jsw2.wobj_list[delem.id],
		panel			= button.container,
		window			= panel.container,
		container		= window.container;

	if (window.is_minbox) {
		panel.choose(button);
		window.minimize(); // Minbox.prototype.minize();
		return;
	}

	if (container.minbox === undefined) { container.add_minbox(); }
	window.borders = jsw2.shallow_copy(button.window_borders);
	container.remove_child(window);
	container.minbox.add_window(window);
	panel.choose(button);
	container.draw();

} // end: Button_sizable.click_min_func()

jsw2.Button_sizable.click_resize_func = function () {
	var delem			= this,
		button			= jsw2.wobj_list[ delem.id ],
		panel			= button.container,
		window			= panel.container,
		window_pos_size	= button.window_pos_size;

	if (window.is_minbox) {
		panel.choose(button);
		window.restore(); // Minbox.prototype.restore();
		return;
	}

	if ( window.state_is('minimized') ) {
		var minbox = window.container,
			container = minbox.container;

		window.minimize(false, container);
	}
	window.pos_size.specs = new jsw2.shallow_copy(window_pos_size.specs);
	window.borders = jsw2.shallow_copy(button.window_borders);

	window.draw();
	panel.choose(button);

} // end: Button_sizable.click_resize_func()

/** */
jsw2.Button_sizable.Button = function (button_panel, left, name) {
	var sbtn = this;

	sbtn.short_name = name;
	sbtn.full_name = button_panel.name + '_' + name + '_button';

	var bwidth = jsw2.DEFAULTS.Button.width + jsw2.DEFAULTS.Button.spacer_h;
	var pos_size = ['1 -' + left,0]; // location in panel
	var borders = [
			jsw2.DEFAULTS.Button.border_width,
			jsw2.DEFAULTS.Button.border_style,
			jsw2.DEFAULTS.Button.border_color,
			jsw2.DEFAULTS.Button.border_radii
		];
	var label_func = jsw2.Button_sizable.draw_funcs[name];
	var click_func = jsw2.Button_sizable.click_funcs[name];
	jsw2.Button.init(sbtn, button_panel, sbtn.full_name,
			pos_size, borders, {}, {}, {},  // ... styles, other, hover_styles,
			label_func, click_func);

	sbtn.delem.title = jsw2.TEXTS.button_size_title[name];

} // end: Size_button()

/** Button_sizable.Button extends Button. */
jsw2.extends(jsw2.Button_sizable.Button, jsw2.Button);

/** The Choices interface. */
jsw2.Button_sizable.Button.prototype.choose = function (chosen) {
	var button = this;

	// punch if 'chosen' is true or undefined
	if (chosen === false) { button.unpunch(); }
	else { button.punch(); }
}

/** */
jsw2.Button_sizable.Button.prototype.punch = function () {
    var button = this;

    button.borders.style = 'inset';
    button.draw();
    button.label_func('gray');
    button.disable();

}

/** */
jsw2.Button_sizable.Button.prototype.unpunch = function () {
	var button = this;

	button.borders.style = 'outset';
	button.draw();
	button.label_func('white');
	button.enable();

} // end: Button_sizable.Button.unpunch()

/** */
jsw2.Button_sizable.Button.prototype.toString = function () {
	return 'Button_sizable.Button{' +
			jsw2.Button.prototype.toString.call(this) +
			', short_name=' + this.short_name + '}';
}

/** */
jsw2.Button_sizable.Panel = function (window, button_names) {
	var new_button_panel = this;

	new_button_panel.window = window;
	new_button_panel.button_names = button_names;

	var name = window.name + '_size_button_panel';

	// Button panel has a spacer on the right of each button.
	var bwidth =
			jsw2.DEFAULTS.Button.width + jsw2.DEFAULTS.Button.spacer_h;
	var width = button_names.length * bwidth;
	var height = jsw2.DEFAULTS.Button.height;
	var left = '1 -' + (bwidth + jsw2.DEFAULTS.Button.spacer_h);
			// border right, left of close button
	var ps = [ left,jsw2.DEFAULTS.Closable.button_top,
			width,height ];
	jsw2.Panel.init(new_button_panel, window, name, ps);

	new_button_panel.buttons = new jsw2.Choices();

} // end: Button_panel()

/** Button_sizable.Panel extends Panel. */
jsw2.extends(jsw2.Button_sizable.Panel, jsw2.Panel);

/** */
jsw2.Button_sizable.Panel.prototype.choose = function (button) {
	var panel = this; // the size buttons panel

	panel.buttons.unchoose();
	panel.buttons.choose(button);

} // end: Button_sizable.Panel.choose()

/** */
jsw2.Button_sizable.click_funcs = {
	min:	jsw2.Button_sizable.click_min_func,
	0:		jsw2.Button_sizable.click_resize_func,
	1:		jsw2.Button_sizable.click_resize_func,
	2:		jsw2.Button_sizable.click_resize_func,
	max:	jsw2.Button_sizable.click_max_func
} // end: Button_sizable.click_funcs{}

/** */
jsw2.Button_sizable.draw_funcs = {
	min: function (color) {
			var button = this;
			if (color === undefined) { color = 'white'; }
			jsw2.remove_kids(button.delem);
			jsw2.draw_rect( button.delem, 0,10, 9,2, color );
		},
	0: function (color) {
			var button = this;
			if (color === undefined) { color = 'white'; }
			jsw2.remove_kids(button.delem);
			jsw2.draw_rect( button.delem, 0,6, 4,2, color );
			jsw2.draw_rect( button.delem, 2,8, 2,4, color );
		},
	1: function (color) {
			var button = this;
			if (color === undefined) { color = 'white'; }
			jsw2.remove_kids(button.delem);
			jsw2.draw_rect( button.delem, 0,4, 5,2, color );
			jsw2.draw_rect( button.delem, 3,5, 2,7, color );
		},
	2: function (color) {
			var button = this;
			if (color === undefined) { color = 'white'; }
			jsw2.remove_kids(button.delem);
			jsw2.draw_rect( button.delem, 0,2, 6,2, color );
			jsw2.draw_rect( button.delem, 4,4, 2,8, color );
		},
	max: function (color) {
			var button = this;
			if (color === undefined) { color = 'white'; }
			jsw2.remove_kids(button.delem);
			jsw2.draw_border( button.delem, 0,0, 5,8, 2, color );
		}
} // end: Button_sizable.draw_funcs{}

/**A Closable */

/** */
jsw2.Closable = function (window, args) {
	var new_closable = this;

	new_closable.button = new jsw2.Button_close(
			window, window.name + '_closable_button',
			[jsw2.DEFAULTS.Closable.button_left,
			 jsw2.DEFAULTS.Closable.button_top,
			 jsw2.DEFAULTS.Closable.button_width,
			 jsw2.DEFAULTS.Closable.button_height]
	);

} // end: Closable()

/**A Maskable */

/* A Maskable window is one that knows how to draw a "mask" over itself.
This is a somewhat dark screen drawn that a) suggests that the things
underneath are temporarily unavailable and b) traps mouse events so that the
things underneath cannot be clicked or selected.

A window is typically masked during the display of a "modal" message. */

/** */
jsw2.Maskable = function (wind) {
	var new_maskable = this;

	new_maskable.wind = wind;

} // end: jsw2.Maskable()

/** */
jsw2.Maskable.prototype.mask = function () {
	var maskable = this,
		wind = maskable.wind;

		maskable.modal_mask =
				new jsw2.Rect( wind, wind.name + 'modal_mask',
				[0,0, '1 C','1 C'], 0,
				{backgroundColor: jsw2.DEFAULTS.Maskable.mask_color} );
		maskable.modal_mask.fit_inside(wind);
		maskable.modal_mask.draw();

		maskable.modal_mask_top =
				new jsw2.Rect( wind, wind.name + 'modal_mask_top',
				['0',jsw2.DEFAULTS.Window.title_top,
				 '1',jsw2.DEFAULTS.Button.height], 0,
				{backgroundColor: jsw2.DEFAULTS.Maskable.mask_color} );

} // end: Maskable.mask()

/** */
jsw2.Maskable.prototype.unmask = function () {
	var maskable = this,
		wind = maskable.wind;

	maskable.modal_mask.del();
	maskable.modal_mask_top.del();
	// wind.draw();

} // end: Maskable.unmask()

/** */
jsw2.Maskable.prototype.toString = function () {
	return 'Maskable{}';
}

/**A Movable */

/** */
jsw2.Movable = function (wind) {
	var new_movable = this;

	new_movable.dragging = false

	jsw2.listen_on(	wind.Titled.title_panel, 'mousedown',	mousedown	);
	jsw2.listen_on(	wind.Titled.title_panel, 'mousemove',	mousemove	);
	jsw2.listen_on(	wind.Titled.title_panel, 'mouseout',	mouseout	);
	jsw2.listen_on(	wind.Titled.title_panel, 'mouseover',	mouseover	);
	jsw2.listen_on(	wind.Titled.title_panel, 'mouseup',		mouseup		);

	/**1 Movable Inner Functions */

	/** */
	function hover(wobj) {
		// wobj.custom_styles for future paints, delem.style for right now
		wobj.custom_styles.cursor =
				jsw2.DEFAULTS.Window.title_cursor;
		wobj.delem.style.cursor =
				jsw2.DEFAULTS.Window.title_cursor;
		wobj.custom_styles.backgroundColor =
				jsw2.DEFAULTS.Window.title_hover_bg;
		wobj.delem.style.backgroundColor =
				jsw2.DEFAULTS.Window.title_hover_bg;
	}

	/** */
	function hover_end(wobj) {
		// wobj.styles for future paints, delem.style for right now
		wobj.custom_styles.cursor = 'default';
		wobj.delem.style.cursor = 'default';
		wobj.custom_styles.backgroundColor =
				jsw2.DEFAULTS.Window.title_background;
		wobj.delem.style.backgroundColor =
				jsw2.DEFAULTS.Window.title_background;
	}

	/** */
	function mousedown(event) {
		var delem=this,
			title = jsw2.wobj_list[delem.id],
			wind = title.container;

		event = jsw2.fixup_mouse_event(event);
		mover(wind, event);

	} // end: mousedown()

	/** */
	function mousemove(event) {
		var delem = this,
			title = jsw2.wobj_list[delem.id],
			wind = title.container;

		if (wind.Movable.dragging) {
				mover( wind, jsw2.fixup_mouse_event(event) ); }
	} // end: mousemove()

	/** */
	function mouseout(event) {
		var delem = this,
			title = jsw2.wobj_list[delem.id],
			wind = title.container;

		if (wind.Movable.dragging) {
				mover( wind, jsw2.fixup_mouse_event(event) ); }
		hover_end(title);
	} // end: mouseout()

	/** */
	function mouseover() {
		var delem = this;
			wobj = jsw2.wobj_list[delem.id];

		hover(wobj);
	} // end: mouseover()

	/** */
	function mouseup(event) {
		var delem=this,
			title = jsw2.wobj_list[delem.id],
			wind = title.container;

		mover( wind, jsw2.fixup_mouse_event(event) );
	} // end: mouseup()

	/** */
	function move(wind, event) {
		if (wind.Movable.dont_move) { return; }

		wind.Movable.dont_move = true;

		var dx = wind.Movable.x - event.x,
			dy = wind.Movable.y - event.y;
			wind.pos_size.specs.left = wind.pos_size.left - dx;
			wind.pos_size.specs.top = wind.pos_size.top - dy;
			wind.draw();

			wind.Movable.x = event.x;
			wind.Movable.y = event.y;

			wind.Movable.dont_move = false;

	} // end: move()

	/** */
	function mover(wind, event) {

		var actions = {
			mousedown: function(wind, event) {
					start_drag(wind, event); },

			mousemove: function(wind, event) {
					move(wind, event); },

			mouseout: function(wind, event) {
					stop_drag(wind, event) },

			mouseup: function(wind, event) {
					stop_drag(wind, event) }
		} // end: actions

		actions[event.type](wind, event); // execute an action

		/**a mover() inner functions */

		/** */
		function start_drag(wind, event) {

			if (wind.Movable.dragging === true) {
					stop_drag(wind, event); }

			wind.Movable.dragging = true;
			wind.Movable.x = event.x;
			wind.Movable.y = event.y;
		}

		/** */
		function stop_drag(wind, event) {
			wind.Movable.dragging = false;
			if (wind.Button_sizable) {
					wind.Button_sizable.new_pos(wind); }
		}

	} // end: mover()

} // end: Movable

jsw2.Titled = function (wind, title) {
	var new_title = this;

	if (title === undefined) {
		new_title.title = jsw2.TEXTS.window_untitled;
		new_title.title_tooltip = jsw2.TEXTS.window_drag;
	} else if (typeof title === 'string') {
		new_title.title = title;
		new_title.title_tooltip = jsw2.TEXTS.window_drag;
	} else {
		new_title.title = title[0];
		new_title.title_tooltip = title[1];
	}

	new_title.title_panel = new jsw2.Wobj(
			wind, wind.name + '_title', 'span',
			['0 C',jsw2.DEFAULTS.Window.title_top,
				0,jsw2.DEFAULTS.Window.title_height], 2,
			{backgroundColor: jsw2.DEFAULTS.Window.title_background,
			 fontSize: jsw2.DEFAULTS.Window.title_font_size + 'pt',
			 lineHeight: (jsw2.DEFAULTS.Window.title_height - 4) + 'px',
			 overflow: 'hidden',
			 paddingBottom: jsw2.DEFAULTS.Window.title_padding_bottom + 'px',
			 paddingLeft: (jsw2.DEFAULTS.Window.title_hspace / 2) + 'px',
			 paddingRight: (jsw2.DEFAULTS.Window.title_hspace / 2) + 'px',
			 userSelect: 'none', mozUserSelect: 'none',
			 webkitUserSelect: 'none',
			 width: ''},
			{innerHTML: new_title.title} );
	wind.append_child(new_title.title_panel);

	new_title.title_panel.pos_size.specs.width =
			new_title.title_panel.delem.offsetWidth;
	new_title.title_panel.borders = new jsw2.Borders(
			jsw2.DEFAULTS.Wobj.border_width,
			jsw2.DEFAULTS.Wobj.border_style,
			jsw2.DEFAULTS.Wobj.border_color,
			[wind.borders.get_inside_radii(0), 0, 0, 0]
	);

	new_title.title_panel.delem.title = new_title.title_tooltip;

	// over-length title could hide the close button
	wind.Closable.button.move_to_top();

} // end: Titled();

// alert('jsw2ci-capabilities.js loaded');

/* end of jsw2ci-capabilities.js */