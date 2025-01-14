/* jswindows/project/jsw2-wobjs.js */

/* Table of Contents
  87 I. Basic Elements
  89     A. Wobj - Base Window Object
  91         1. Wobj Class Methods
  93             a) jsw2.Wobj()
 100             b) jsw2.Wobj.init()
 141         2. Wobj Instance Methods
 143             a) jsw2.Wobj.prototype.add_minbox()
 150             b) jsw2.Wobj.prototype.append_child()
 162             c) jsw2.Wobj.prototype.append_choice()
 175             d) jsw2.Wobj.prototype.chosen()
 187             e) jsw2.Wobj.prototype.del()
 203             f) jsw2.Wobj.prototype.draw()
 221             g) jsw2.Wobj.prototype.fit_inside()
 251             h) jsw2.Wobj.prototype.get_all_styles()
 266             i) jsw2.Wobj.prototype.implement()
 273             j) jsw2.Wobj.prototype.is_a_wobj()
 276             k) jsw2.Wobj.prototype.listen_for()
 280             l) jsw2.Wobj.prototype.listen_on()
 284             m) jsw2.Wobj.prototype.move_to_top()
 294             n) jsw2.Wobj.prototype.remove_child()
 303             o) jsw2.Wobj.prototype.re_pos_size()
 312             p) jsw2.Wobj.prototype.resize()
 320             q) jsw2.Wobj.prototype.set_state()
 328             r) jsw2.Wobj.prototype.state_is()
 336             s) jsw2.Wobj.prototype.stop_listening_for()
 340             t) jsw2.Wobj.prototype.stop_listening_on()
 344             u) jsw2.Wobj.prototype.toString()
 355     B. Rect - the Generic Rectangle
 357         1. jsw2.Rect()
 364         2. jsw2.Rect.init()
 398         3. jsw2.Rect.prototype.toString()
 402     C. Panel: Borderless Rect
 404         1. jsw2.Panel()
 409         2. jsw2.Panel.init()
 419         3. jsw2.Panel.prototype.toString()
 423 II. Widgets
 425     A. Buttons
 427         1. Button - the Generic Button
 429             a) jsw2.Button()
 436             b) jsw2.Button.init()
 499             c) Button Class Methods
 501                 (2) jsw2.Button.click() Default (to override).
 509                 (4) jsw2.Button.mouseout()
 518                 (6) jsw2.Button.mouseover()
 527             d) Button Instance Methods
 532                 (2) jsw2.Button.prototype.disable()
 544                 (4) jsw2.Button.prototype.enable()
 556                 (6) jsw2.Button.prototype.toString()
 561         2. Button_close - the Window-Closing Button
 563             a) jsw2.Button_close()
 568             b) jsw2.Button_close.init()
 626             c) jsw2.Button_close.prototype.toString()
 631     B. Minbox - for Minimized Windows
 633         1. jsw2.Minbox()
             Extends Rect.
 656         2. jsw2.Minbox.prototype.add()
 669         3. jsw2.Minbox.prototype.minimize()
 684         4. jsw2.Minbox.prototype.redraw()
 713         5. jsw2.Minbox.prototype.restore()
 730         6. jsw2.Minbox.prototype.remove_window()
 739         7. jsw2.Minbox.prototype.toString()
 744     C. Window - Rect with a Closing Button
 746         1. Window (Base Class)
 748             a) jsw2.Window()
 753             b) jsw2.Window.init()
                 Extends Rect.
 787             c) jsw2.Window.prototype.alert()
 794             d) jsw2.Window.prototype.minimize()
 861             e) jsw2.Window.prototype.toString()
 883         2. Window_M - Movable
 885             a) jsw2.Window_M()
 892             b) jsw2.Window_M.init()
 907             c) jsw2.Window_M.prototype.toString() Simple toString.
 911         3. Window_M_BS - Movable + Button Sizable
 913             a) jsw2.Window_M_BS()
 920             b) jsw2.Window_M_BS.init()
 935             c) jsw2.Window_M_BS.prototype.toString() Simple toString.
 939 III. SCREEN
 941     A. jsw2.go() Create full-screen pseudo-Wobj.
*/

'use strict';

/**I Basic Elements */

/**A Wobj - Base Window Object */

/**1 Wobj Class Methods */

/** */
jsw2.Wobj = function (container, name, type, pos_size, borders, styles, other) {

	jsw2.Wobj.init(this, container, name, type,
			pos_size, borders, styles, other);
}

/** */
jsw2.Wobj.init = function ( new_wobj,
		container, name, type, pos_size, borders, styles, other ) {

	// Note: container must be a Wobj or extender of Wobj
	// Use jsw2.SCREEN, not document.body.
	new_wobj.container	= container;
	new_wobj.name		= name;
	new_wobj.type		= type;

	if (borders === undefined) {
			new_wobj.borders	=  new jsw2.Borders(); }
	else { new_wobj.borders	= new jsw2.Borders(borders); }

	new_wobj.pos_size	= new jsw2.Pos_size( new_wobj,
			pos_size[0], pos_size[1], pos_size[2], pos_size[3], pos_size[4] );

	if (styles === undefined) { styles = {}; }
	new_wobj.custom_styles	= styles;
	if (styles.cursor === undefined) {
			styles.cursor = jsw2.DEFAULTS.Wobj.cursor; }
	new_wobj.other			= other;

	new_wobj.delem = document.createElement( type );
	new_wobj.delem.id = new_wobj.name;
	jsw2.wobj_list[name] = new_wobj;
	for (var prop in other) { new_wobj.delem[prop] = other[prop]; }

	new_wobj.states_are = {
		minimized:	false,
		selected:	true
	};

	// gets/applies styles
	new_wobj.draw();

	// container is another Wobj (or SCREEN)
	new_wobj.container.append_child( new_wobj );

} // end: Wobj.init()

/**1 Wobj Instance Methods */

/** */
jsw2.Wobj.prototype.add_minbox = function() {
	var wobj = this;

	wobj.minbox = new jsw2.Minbox(wobj);
}

/** */
jsw2.Wobj.prototype.append_child = function ( child_wobj ) {
	var parent_wobj = this;

	if (parent_wobj.children === undefined) { parent_wobj.children = []; }

	parent_wobj.children.push(child_wobj);
	parent_wobj.delem.appendChild(child_wobj.delem);
	//child_wobj.container = parent_wobj;

} // end: Wobj.append_child()

/** */
jsw2.Wobj.prototype.append_choice = function (child_wobj) {
	var parent_wobj = this;

	// if this is the first choice
	if (parent_wobj.choices === undefined) {
			parent_wobj.choices = new jsw2.Choices(); }

	parent_wobj.choices.add_and_choose( child_wobj );
	child_wobj.set_state( 'selected' );

} // end: Wobj.append_choice()

/** */
jsw2.Wobj.prototype.chosen = function ( choose ) {
	var wobj = this;
	if (choose === undefined) { choose = true; }

	wobj.borders.color = choose ?
			jsw2.DEFAULTS.Wobj.border_color_chosen :
			wobj.original_border_color;
	wobj.repaint();

} // end: Wobj.chosen()

/** */
jsw2.Wobj.prototype.del = function () {
	var wobj = this;

	if (wobj.children) {
		for (var i in wobj.children) {
			wobj.children[i].del();
		}
		delete jsw2.wobj.children;
	}
	if (wobj.choices) { delete wobj.choices; }

	jsw2.delete_delem(wobj.delem);

} // end: Wobj.del()

/** */
jsw2.Wobj.prototype.draw = function () {
	var wobj = this;

	wobj.pos_size.compute();
	wobj.get_all_styles();
	for (var name in wobj.all_styles) {
		wobj.delem.style[name] = wobj.all_styles[name];
	}

	if ( wobj.children ) {
		for (var i in wobj.children) {
			wobj.children[i].draw();
		}
	} // end: if has children, draw them

} // end: Wobj.draw();

/** */
jsw2.Wobj.prototype.fit_inside = function (container) {
	var wobj = this,
		cbord = container.borders,
		bmax = cbord.get_width_max(),
		cbrad = cbord.radii;

	if (typeof cbrad === 'number') {
		wobj.borders.radii = adjust(cbrad);
		return;
	}

	var new_rads = [];
	for (var i in cbrad) {
		var rad = cbrad[i];
		if (typeof rad === 'number') { new_rads.push( adjust(rad) ); }
		else {
			var rads = [  adjust( rad[0] ), adjust( rad[1] )  ];
			new_rads.push(rads);
		}
	}

	wobj.borders.radii = new_rads;

	function adjust(container_rad) {
		return Math.max( (container_rad - bmax), 0 );
	}

} // end: Wobj.fit_inside()

/** */
jsw2.Wobj.prototype.get_all_styles = function () {
	var wobj = this;

	var styles = wobj.borders.get_styles(); // start w/border styles
	styles = jsw2.sum( styles, wobj.pos_size.get_styles() );
			// add pos_size styles
	styles = jsw2.sum(styles, wobj.custom_styles);
	if (styles.position === undefined) { styles.position = 'absolute'; }

	wobj.all_styles = styles;

	return styles;
} // end: Wobj.get_all_styles()

/** */
jsw2.Wobj.prototype.implement = function (capability_name, args) {
	var wobj = this;

	wobj[capability_name] = new jsw2[capability_name](wobj, args);
}

/** */
jsw2.Wobj.prototype.is_a_wobj = function () { return true; }

/** */
jsw2.Wobj.prototype.listen_for = function (event_name, listen_func) {
		jsw2.listen_for(this, event_name, listen_func); }

/** */
jsw2.Wobj.prototype.listen_on = function (event_name, listen_func) {
		jsw2.listen_on(this, event_name, listen_func); }

/** */
jsw2.Wobj.prototype.move_to_top = function () { // draw last
	var wobj = this,
		container = wobj.container;

	container.delem.removeChild(wobj.delem);
	container.delem.appendChild(wobj.delem);

} // end: move_to_top()

/** */
jsw2.Wobj.prototype.remove_child = function (child) {
	var wobj = this;

	wobj.choices.del(child); // this is a NOP if not in choices object
	jsw2.remove_array_element(wobj.children, child); // removes in situ
	wobj.delem.removeChild(child.delem);
}

/** */
jsw2.Wobj.prototype.re_pos_size = function (top,left, width,height) {
	var wobj = this,
		specs = wobj.pos_size.specs;

	specs.top = top; specs.left = left;
	specs.width = width; specs.height = height;
}

/** */
jsw2.Wobj.prototype.resize = function (width,height) {
	var wobj = this;

	wobj.pos_size.specs.width = width;
	wobj.pos_size.specs.height = height;
}

/** */
jsw2.Wobj.prototype.set_state = function (state_name, value) {
	var wobj = this;

	if (value === undefined) { value = true; }
	wobj.states_are[state_name] = value;
};

/** */
jsw2.Wobj.prototype.state_is = function (state_name) {
	var wobj = this;

	if (wobj.states_are[state_name] === undefined) { return false; }
	return wobj.states_are[state_name];
}

/** */
jsw2.Wobj.prototype.stop_listening_for = function (event_name, listen_func) {
		jsw2.stop_listening_for(this, event_name, listen_func); }

/** */
jsw2.Wobj.prototype.stop_listening_on = function (event_name, listen_func) {
		jsw2.stop_listening_on(this, event_name, listen_func); }

/** */
jsw2.Wobj.prototype.toString = function (separator) {
	var ret = 'Wobj{' +
		'name='			+ this.name +
		',container='	+ this.container.name +
		',type='		+ this.type +
		',pos_size='	+ this.pos_size +
	'}';
	return ret;
}

/**A Rect - the Generic Rectangle */

/** */
jsw2.Rect = function (container, name, pos_size, borders, styles, other) {

	jsw2.Rect.init(this, container, name, pos_size, borders, styles, other);

} // end: Rect();

/** */
jsw2.Rect.init = function(
		new_rect, container, name, pos_size, borders, styles, other) {

	if (styles === undefined) { styles = {}; }
	if (styles.backgroundColor === undefined) {
			styles.backgroundColor = jsw2.DEFAULTS.Rect.background_color; }

	if (borders === undefined) {
		borders = new jsw2.Borders(
			jsw2.DEFAULTS.Rect.border_width,
			jsw2.DEFAULTS.Rect.border_style,
			jsw2.DEFAULTS.Rect.border_color,
			jsw2.DEFAULTS.Rect.border_radii
		);

	// if a number, use defaults, plugging in the number (width)
	} else if (typeof borders === 'number') {
		borders = new jsw2.Borders(
				borders,
				jsw2.DEFAULTS.Rect.border_style,
				jsw2.DEFAULTS.Rect.border_color,
				jsw2.DEFAULTS.Rect.border_radii
		);
	}

	jsw2.Wobj.init(new_rect, container, name, 'div',
			pos_size, borders, styles, other);

} // end: Rect.init()

/* 'Inherit' from Wobj. */
jsw2.extends(jsw2.Rect, jsw2.Wobj);

/** */
jsw2.Rect.prototype.toString = function () { return 'Rect{' +
	jsw2.Wobj.prototype.toString.call(this) + '}'; }

/**A Panel: Borderless Rect */

/** */
jsw2.Panel = function (container, name, pos_size, styles, other) {
	jsw2.Panel.init(this, container, name, pos_size, styles, other);
} // end: Panel()

/** */
jsw2.Panel.init = function (
		new_panel, container, name, pos_size, styles, other) {
	// add borders 0
	jsw2.Rect.init(new_panel,container, name, pos_size, 0, styles, other);
} // end: Panel.init()

/* 'Inherit' from Rect */
jsw2.extends(jsw2.Panel, jsw2.Rect);

/** */
jsw2.Panel.prototype.toString = function () {
		return 'Panel{' + jsw2.Rect.prototype.toString.call( this ) + '}'; }

/**I Widgets */

/**A Buttons */

/**1 Button - the Generic Button */

/** */
jsw2.Button = function (container, name, pos_size,
		borders, styles, other, hover_styles, label_func, click_func) {
	jsw2.Button.init(this, container, name, pos_size,
			borders, styles, other, hover_styles, label_func, click_func);
}

/** */
jsw2.Button.init = function (new_button, container, name, pos_size,
		borders, styles, other, hover_styles, label_func, click_func) {

	var BDEFS = jsw2.DEFAULTS.Button;
	if (pos_size === undefined) {
			pos_size = new jsw2.Pos_size(0,0, BDEFS.width,BDEFS.height);
	} else if ( pos_size && (pos_size.length) && (pos_size.length === 2) ) {
			pos_size[2] = BDEFS.width;
			pos_size[3] = BDEFS.height;
	}

	if ( borders === undefined ) {
			borders = new jsw2.Borders( BDEFS.border_width,
					BDEFS.border_style, BDEFS.border_color,
					BDEFS.border_radii );
	} else if (typeof borders === 'number') {
		borders = new jsw2.Borders(borders, // the argument
				BDEFS.border_style, BDEFS.border_color, BDEFS.border_radii);
	}
	borders.style = BDEFS.border_style;

	if (styles === undefined) { styles = {}; }
	if (styles.backgroundColor === undefined) {
			styles.backgroundColor = jsw2.DEFAULTS.Button.background_color; }

	jsw2.Rect.init(new_button, container, name,
			pos_size, borders, styles, other);

	if ( (new_button.delem.title === undefined) ||
			(new_button.delem.title === '') ) {
			new_button.delem.title = jsw2.TEXTS.button_untitled; }

	if (hover_styles === undefined) { hover_styles = {}; }
	if (hover_styles.borderColor === undefined) {
			hover_styles.borderColor = jsw2.DEFAULTS.Wobj.border_color_hover; }
	if (hover_styles.cursor === undefined) {
			hover_styles.cursor = jsw2.DEFAULTS.Wobj.cursor_hover; }
	var non_hover_styles = {};

	for (var name in hover_styles) {
			non_hover_styles[name] = new_button.all_styles[name]; }

	new_button.hover_styles = hover_styles;
	new_button.non_hover_styles = non_hover_styles;

	new_button.listen_on('mouseover', jsw2.Button.mouseover);
	new_button.listen_on('mouseout',  jsw2.Button.mouseout );

	new_button.label_func = label_func;
	if (label_func !== undefined) { new_button.label_func(); }

	new_button.click_func = click_func;
	if (click_func !== undefined) {
			new_button.listen_on('click', click_func); }
	else {
		new_button.listen_on( 'click', function () {
				alert(this.id + ': ' + jsw2.TEXTS.button_click_msg); }
		);
	}

} // end: Button.init()

/**a Button Class Methods */

/** Default (to override). */
jsw2.Button.click = function (event) {   // click func
	var delem = this;
	var wobj = jsw2.wobj_list[delem.id];

	alert(wobj.name + ' - ' + jsw2.TEXTS.button_click_msg);
}

/** */
jsw2.Button.mouseout = function (event) {
	var delem = this,
		wobj = jsw2.wobj_list[delem.id];

	for (var name in wobj.non_hover_styles) {
			delem.style[name] = wobj.non_hover_styles[name]; }
};

/** */
jsw2.Button.mouseover = function (event) {
	var delem = this;
	var wobj = jsw2.wobj_list[delem.id];

	for (var name in wobj.hover_styles) {
			delem.style[name] = wobj.hover_styles[name]; }
};

/**a Button Instance Methods */

/* 'Inherit' from Rect. */
jsw2.extends(jsw2.Button, jsw2.Rect);

/** */
jsw2.Button.prototype.disable = function () {
	var button = this,
		delem = button.delem;

	jsw2.Button.mouseout.call(delem); // reset to normal
	button.stop_listening_on('mouseover');
	// button.stop_listening_on('click');
	button.enabled = false;

} // end: Button.disable()

/** */
jsw2.Button.prototype.enable = function () {
	var button = this,
		delem = button.delem;

	button.listen_on('mouseover', jsw2.Button.mouseover );
	button.listen_on('mouseout',  jsw2.Button.mouseout );
	button.listen_on('click', button.click_func);
	button.enabled = true;

} // end: Button.enable()

/** */
jsw2.Button.prototype.toString = function () {
		return 'Button{' +
				jsw2.Rect.prototype.toString.call(this) + '}'; }

/**1 Button_close - the Window-Closing Button */

/** */
jsw2.Button_close = function (container, name, borders, styles, other) {
	jsw2.Button_close.init(this, container, name, borders, styles, other);
} // end: Button_close()

/** */
jsw2.Button_close.init = function ( new_button, container, name,
		pos_size, borders, styles, other ) {

	if (styles === undefined) { styles = {}; }

	if (styles.backgroundColor === undefined) {
			styles.backgroundColor =
					jsw2.DEFAULTS.Button_close.background_color; }
	if (styles.borderColor === undefined) {
			styles.borderColor = jsw2.DEFAULTS.Button_close.border_color; }

	var hover_styles = {
			borderColor:	jsw2.DEFAULTS.Button_close.border_color_hover
	};

	if (other === undefined) { other = {}; }
	if (other.title === undefined) {
			other.title = jsw2.TEXTS.button_close_title; }

	jsw2.Button.init(new_button, container, name, pos_size,
			borders, styles, other, hover_styles, label_func, close_func);

	function label_func() {
		var button_close = this;
		var delem = button_close.delem;

		var x = document.createElement('span');
			x.style.color = 'white';
			x.style.fontSize = button_close.pos_size.height - 1 + 'px';
			x.style.fontWeight = 'bold';
			x.style.left = '-1px';
			x.style.position = 'relative';
			x.style.top = '-3px';
			x.innerHTML = 'X';

		delem.appendChild(x)
	}

	function close_func(event) { // called by window close button
		var delem = this;
		var button = jsw2.wobj_list[delem.id];
		var wind = button.container;

		var temp; // undefined or the return from wind.onclose()
		if (wind.onclose) {  if ( !wind.onclose() ) { return; }  }
				// delete nothing! (if wind.onclose() returns 'false')

		if (wind.container.remove_window) {
				wind.container.remove_window(wind); }
		else { jsw2.delete_delem( wind.delem ); } // Recursive delete
		// Trusting the JS GC for the rest. Wisely?

	} // end: close_func()

} // end: Button_close.init()

/* 'Inherit' from Button */
jsw2.extends(jsw2.Button_close, jsw2.Button);

/** */
jsw2.Button_close.prototype.toString = function () {
		return 'Button_close{' +
				jsw2.Button.prototype.toString.call(this) + '}'; }

/**A Minbox - for Minimized Windows */

/** */
jsw2.Minbox = function (container) {
	var new_minbox = this;

	jsw2.Rect.init( new_minbox, container, container.name + '_minbox',
		['1 C','1 C',
		jsw2.DEFAULTS.Minbox.width,jsw2.DEFAULTS.Minbox.height],
		jsw2.DEFAULTS.Minbox.borders );

	new_minbox.implement( 'Button_sizable', ['min', '1'] );
	new_minbox.Button_sizable.panel.pos_size.specs.top =
			'0 -' + jsw2.DEFAULTS.Button.height;
	new_minbox.Button_sizable.panel.pos_size.specs.left =
			'1 -' + (jsw2.DEFAULTS.Button.spacer_h + 1) ; // ??? why '+ 1'?

	new_minbox.choices = new jsw2.Choices();
	new_minbox.is_minbox = true;

} // end: Minbox()

/** Extends Rect. */
jsw2.extends(jsw2.Minbox, jsw2.Rect);

/** */
jsw2.Minbox.prototype.add_window = function (window) {
	var minbox = this;

	window.minimize(true, minbox);
	minbox.append_child(window);
	minbox.append_choice(window);

	minbox.redraw();
	window.set_state('minimized');

} // end: Minbox.add_window();

/** */
jsw2.Minbox.prototype.minimize = function () {
	var minbox = this;

	for (var i in minbox.choices.array) {
		var win = minbox.choices.array[i];
		win.delem.style.display = 'none';
	}

	minbox.pos_size.specs.height = jsw2.DEFAULTS.Minbox.min_height;
	minbox.redraw();

	minbox.set_state('minimized');
} // end: Minbox.minimize()

/** */
jsw2.Minbox.prototype.redraw = function () {
	var minbox = this;

	if ( minbox.state_is('minimized') ) {
		minbox.minimize(); // in case a new window was just added
		return;
	}

	minbox.resize(
		jsw2.DEFAULTS.Minbox.width,
		( jsw2.DEFAULTS.Minbox.height * minbox.choices.number() ) +
				minbox.borders.get_width_vertical()
	);

	// first choice is on bottom
	var win_height = jsw2.DEFAULTS.Button.height;
	for (var i = 0; i < minbox.choices.number(); i += 1 ) {
		var child = minbox.choices.array[i];
		child.pos_size.specs.top =
				'1 -' + (win_height * i) + ' C';
	}

	var num = minbox.choices.number();
	minbox.delem.style.display = ( num > 0) ? 'block' : 'none';
	if (num > 0) { minbox.draw(); }

} // end: Minbox.redraw()

/** */
jsw2.Minbox.prototype.restore = function () {
	var minbox = this;

	for (var i in minbox.choices.array) {
		var win = minbox.choices.array[i];
		win.delem.style.display = 'block';
	}

	minbox.pos_size.specs.height =
			jsw2.DEFAULTS.Minbox.height * minbox.choices.number() +
			minbox.borders.get_width_vertical();
	minbox.draw();

	minbox.set_state('minimized', false);
} // end: Minbox.restore()

/** */
jsw2.Minbox.prototype.remove_window = function (wind) {
	var minbox = this;

	minbox.remove_child(wind);
	minbox.redraw();

} // end: Minbox.remove_window()

/** */
jsw2.Minbox.prototype.toString = function () {
	return 'Minbox{' +  jsw2.Rect.prototype.toString.call(this) + '}';
}

/**A Window - Rect with a Closing Button */

/**1 Window (Base Class) */

/** */
jsw2.Window = function (container, name, pos_size, borders, styles, other) {
	jsw2.Window.init(this, container, name, pos_size, borders, styles, other);
}

/** */
jsw2.Window.init = function (new_window,
		container, name, pos_size, borders, styles, other) {

	if (borders === undefined) { borders = new jsw2.Borders(
			jsw2.DEFAULTS.Window.border_width,
			jsw2.DEFAULTS.Window.border_style,
			jsw2.DEFAULTS.Window.border_color,
			jsw2.DEFAULTS.Window.border_radii
		);
	}
	else if (typeof borders === 'number') { borders = new jsw2.Borders(
			borders, // specified width
			jsw2.DEFAULTS.Window.border_style,
			jsw2.DEFAULTS.Window.border_color,
			jsw2.DEFAULTS.Window.border_radii
		);
	}

	if (styles === undefined) { styles = {}; }
	if (styles.backgroundColor === undefined) {
			styles.backgroundColor = jsw2.DEFAULTS.Window.background_color; }

	jsw2.Rect.init(new_window, container, name, // extends Rect
			pos_size, borders, styles, other);
	new_window.container.append_choice(new_window);
	new_window.implement('Closable');
	new_window.implement('Maskable', jsw2.DEFAULTS.Maskable.mask_color);

} // end: Window.init()

/** Extends Rect. */
jsw2.extends(jsw2.Window, jsw2.Rect);

/** */
jsw2.Window.prototype.alert = function (message) {
	var wind = this;

	jsw2.alert(wind, message);
}

/** */
jsw2.Window.prototype.minimize = function (make_min, container) {
	var wind = this;

	// 'make_min' may be true or undefined to minimize.
	if (make_min === false) { restore(wind, container); }
	else { minimize(wind, container); }

	function minimize(wind, container) {
		if ( wind.state_is('minimized') ) { return; }

		wind.restore = {
			borders: jsw2.shallow_copy(wind.borders),
			display_style: wind.delem.style.display,
			panel_top: wind.Button_sizable.panel.pos_size.specs.top
		};
		wind.container = container;
		wind.pos_size = new jsw2.Pos_size(
				wind, 0,0,
				jsw2.DEFAULTS.Minbox.width,jsw2.DEFAULTS.Minbox.height);
		wind.pos_size.compute();
		wind.borders.width = 1;
		wind.Button_sizable.panel.pos_size.specs.top =
				jsw2.DEFAULTS.Closable.button_top;

		if (wind.choices !== undefined) {
			for (var i in wind.choices.array) {
				var choice = wind.choices.array[i];
				choice.delem.style.display = 'none';
			}
		} // end: are there child winds to hide?

		if (wind.minbox) { wind.minbox.delem.style.display = 'none'; }

		wind.set_state('minimized')
	} // end: minimize()

	function restore(wind, container) {
		if ( !wind.state_is('minimized') ) { return; }

		// pos_size is restored via the size button click
		wind.borders = wind.restore.borders;
		wind.Button_sizable.panel.pos_size.specs.top =
				wind.restore.panel_top;

		var minbox = wind.container,
			container = minbox.container;
		minbox.remove_window(wind);
		wind.container = container;
		container.append_child(wind);
		container.append_choice(wind);

		if (wind.choices !== undefined) {
			for (var i in wind.choices.array) {
				var choice = wind.choices.array[i];
				choice.delem.style.display = wind.restore.display_style;
			}
		} // end: are there child winds to display?

		if ( wind.minbox && (wind.minbox.choices.number() > 0) ) {
				wind.minbox.delem.style.display = 'block'; }

		wind.set_state('minimized', false);
	} // end: restore()

} // end: Window()

/** */
jsw2.Window.prototype.toString = function () {
	var wind = this;

	return 'Window{' +
			jsw2.Rect.prototype.toString.call(this) +
			'choices=' + choice_names(wind) + '}';

	function choice_names(wind) {
		if (wind.choices === undefined) { return 'none'; }

		var ret = [];
		for (var i in wind.choices.array) {
			var win = wind.choices.array[i];
			ret.push(wind.name);
		}

		return ret.join(',');
	} // end: choice_names()

} // end: Window.toString()

/**1 Window_M - Movable */

/** */
jsw2.Window_M = function ( container, name,
		pos_size, borders, styles, other, title ) {
	jsw2.Window_M.init( this, container, name,
			pos_size, borders, styles, other, title );
}

/** */
jsw2.Window_M.init = function ( new_window, container, name,
		pos_size, borders, styles, other, title ) {

	jsw2.Window.init( new_window, container, name,
			pos_size, borders, styles, other );

	new_window.implement('Titled', title);
	new_window.implement('Movable');

}; // end: Window_M.init()

/* 'Inherit' from Window. */
jsw2.extends( jsw2.Window_M, jsw2.Window );

/** Simple toString. */
jsw2.Window_M.prototype.toString = function () {
		return 'Window_M{' + jsw2.Window.prototype.toString.call(this) + '}'; }

/**1 Window_M_BS - Movable + Button Sizable */

/** */
jsw2.Window_M_BS = function ( container, name,
		pos_size, borders, styles, other, title, button_choices ) {
	jsw2.Window_M_BS.init( this, container, name,
			pos_size, borders, styles, other, title, button_choices );
}

/** */
jsw2.Window_M_BS.init = function ( new_window, container, name,
		pos_size, borders, styles, other, title, button_choices ) {

	jsw2.Window_M.init( new_window, container, name,
			pos_size, borders, styles, other, title );

	if (button_choices === undefined) {
			button_choices = ['min', '0', '1', '2', 'max']; }
	new_window.implement( 'Button_sizable', button_choices );
};

/* 'Inherit' from Window_M. */
jsw2.extends( jsw2.Window_M_BS, jsw2.Window_M );

/** Simple toString. */
jsw2.Window_M_BS.prototype.toString = function () {
		return 'Window_M_BS{' + jsw2.Window_M.prototype.toString.call(this) + '}'; }

/**I SCREEN */

/** Create full-screen pseudo-Wobj. */
jsw2.go = function() {
	var size = jsw2.window_size();

	if (jsw2.SCREEN === undefined) { init(size); }
	jsw2.SCREEN.pos_size.specs.width = size.width;
	jsw2.SCREEN.pos_size.specs.height = size.height;
	jsw2.SCREEN.draw();

	function append_child(wobj) {
		jsw2.SCREEN.children.push(wobj);
		jsw2.SCREEN.delem.appendChild(wobj.delem);
	}

	function append_choice(wobj) {
		jsw2.SCREEN.choices.add_and_choose(wobj);
		append_child(wobj);
	}

	function draw() {
		var SCREEN = jsw2.SCREEN,
			delem = SCREEN.delem,
			style = delem.style;

		SCREEN.pos_size.compute();

		var more_styles = jsw2.sum( SCREEN.pos_size.get_styles(),
				SCREEN.borders.get_styles() );
		jsw2.sum2me( style, more_styles );

		for (var i in SCREEN.children) {
				SCREEN.children[i].draw(); }

	} // end: draw()

	function mask() {
		if (screen.modal_mask !== undefined) { return false; }

		jsw2.SCREEN.modal_mask = new jsw2.Rect( jsw2.SCREEN, 'modal_mask',
			[0,0, '1 C','1 C'], 0, {backgroundColor: 'rgba(0,0,0, 0.5)'} );

		return true;
	} // end: mask()

	function remove_child(wobj) {
		jsw2.SCREEN.choices.del(wobj);
		jsw2.remove_array_element(SCREEN.children, wobj);
		jsw2.SCREEN.delem.removeChild(wobj.delem);
	}

	function unmask() {
		if (jsw2.SCREEN.modal_mask === undefined) { return; }

		var delem = jsw2.SCREEN.modal_mask.delem;
		jsw2.SCREEN.modal_mask = undefined;
		jsw2.delete_delem(delem);
	} // end: unmask()

	function toString() {
		var screen = this;

		var ret = 'SCREEN{';
			ret += ( screen.minbox ? ('' + screen.minbox) : '' );
			var ch = [];
			for (var i in screen.choices.array) {
				var win = screen.choices.array[i];
				ch.push(win.name);
			}
			ret += ch.join(',');

		return ret + '}';
	} // end: toString()

	function init(size) {

		/* SCREEN is a pseudo-Wobj, used as a container in lieu of
		document.body (to avoid attaching properties to doc.body). */

		jsw2.SCREEN = {
			name: 'SCREEN',
			size: size,
			type: 'div'
		};

		var SCREEN = jsw2.SCREEN;

		SCREEN.delem = document.createElement( 'div' );
		SCREEN.delem.id = 'SCREEN';

		SCREEN.borders = new jsw2.Borders(
				jsw2.DEFAULTS.SCREEN.border_width,
				jsw2.DEFAULTS.SCREEN.border_style,
				jsw2.DEFAULTS.SCREEN.border_color,
				jsw2.DEFAULTS.SCREEN.border_radii
		);

		SCREEN.pos_size =
				new jsw2.Pos_size(SCREEN, 0,0, size.width,size.height);
		SCREEN.pos_size.compute();

		var s = SCREEN.delem.style;
			s.backgroundColor = jsw2.DEFAULTS.SCREEN.background_color;
			s.fontFamily	= jsw2.DEFAULTS.SCREEN.font_family;
			s.fontSize		= jsw2.DEFAULTS.SCREEN.font_size + 'pt';
			s.display		= 'block';
			s.overflow		= jsw2.DEFAULTS.SCREEN.overflow;
			s.position		= 'absolute';

		SCREEN.children = [];
		SCREEN.choices = new jsw2.Choices();

		SCREEN.add_minbox = jsw2.Wobj.prototype.add_minbox;
		SCREEN.alert = jsw2.Window.prototype.alert;
		SCREEN.append_child = append_child;
		SCREEN.append_choice = append_choice;
		SCREEN.draw = draw;
		SCREEN.implement = jsw2.Wobj.prototype.implement;
		SCREEN.mask = mask;
		SCREEN.remove_child = remove_child;
		SCREEN.unmask = unmask;
		SCREEN.toString = toString;

		document.body.appendChild( SCREEN.delem );

	} // end: init()

} // end: go()

jsw2.go();
window.onresize = jsw2.go;

// alert( 'jsw2-wobjs.js loaded' );

/* end of jsw2-wobjs.js */