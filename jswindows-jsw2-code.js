/* jswindows/project/jsw2-code.js */

/* Table of Contents
  77 I. Namespace (jsw) Object
  80 II. Library Functions
  81     A. DOM-Related
  83         1. jsw2.delete_delem()
  92         2. jsw2.fixup_mouse_event() Make all browsers the same.
 114         3. jsw2.listen_for() Add an event listener.
 126         4. jsw2.listen_on() Add a solo listener.
 133         5. jsw2.remove_kids() Erase innerHTML.
 141         6. jsw2.rgba() Use RGBA, if supported.
 165         7. jsw2.stop_listening_for() Remove a listener.
 177         8. jsw2.stop_listening_on() Remove solo listener.
 184     B. Utility
 186         1. jsw2.a2s() Array to String
 198         2. jsw2.draw_border() Draw a rectangle's border.
 214         3. jsw2.draw_rect() Draw a rectangle.
 230         4. jsw2.extends()
 234         5. jsw2.find_index()
 240         6. jsw2.o2s() QD object to string.
 250         7. jsw2.remove_array_element()
 262         8. jsw2.shallow_copy()
 280         9. jsw2.sum() Union
 292         10. jsw2.sum2me() Union with Self
 298         11. jsw2.window_size() Guesses the browser window's size.
 318     C. JavaScript
 320         1. jsw2.alert()
 350 III. Utility Classes
 352     A. Borders
 354         1. jsw2.Borders()
 385         2. jsw2.Borders.prototype.get_styles()
 450         3. jsw2.Borders.prototype.get_width_bottom()
 456         4. jsw2.Borders.prototype.get_width_horizontal()
 463         5. jsw2.Borders.prototype.get_width_left()
 469         6. jsw2.Borders.prototype.get_width_max()
 484         7. jsw2.Borders.prototype.get_width_right()
 490         8. jsw2.Borders.prototype.get_width_top()
 496         9. jsw2.Borders.prototype.get_width_vertical()
 503         10. jsw2.Borders.prototype.get_inside_radii()
 533         11. jsw2.Borders.prototype.toString()
 541     B. Choices
 543         1. jsw2.Choices()
 555         2. Prototype
 558             a) add:
 565             b) add_and_choose:
 572             c) choose:
 579             d) choose_last:
 585             e) chosen:
 593             f) del:
 615             g) find:
 625             h) show_choices:
 639             i) toString:
 649     C. Pos_size
 651         1. jsw2.Pos_size()
 682         2. jsw2.Pos_size.parse_ps() Parse a position specification.
 702         3. jsw2.Pos_size.resize()
 714         4. jsw2.Pos_size.prototype.compute()
 730         5. jsw2.Pos_size.prototype.get_padding_horizontal()
 743         6. jsw2.Pos_size.prototype.get_padding_vertical()
 756         7. jsw2.Pos_size.prototype.get_styles()
 798         8. jsw2.Pos_size.prototype.position()
 807         9. jsw2.Pos_size.prototype.position_left()
 829         10. jsw2.Pos_size.prototype.position_top()
 850         11. jsw2.Pos_size.prototype.resize()
 860         12. jsw2.Pos_size.prototype.size()
 869         13. jsw2.Pos_size.prototype.size_height()
 889         14. jsw2.Pos_size.prototype.size_width()
 909         15. jsw2.Pos_size.prototype.toString()
 926     D. Queue
 928         1. jsw2.Queue()
 937         2. jsw2.Queue.prototype.push()
 946         3. jsw2.Queue.prototype.pop()
 957         4. jsw2.Queue.prototype.toString()
*/

/**I Namespace (jsw) Object */
var jsw2 = {};

/**I Library Functions */
	/**A DOM-Related */

/** */
jsw2.delete_delem = function (delem) {

	while (delem.firstChild) { jsw2.delete_delem(delem.firstChild); }
	delem.parentNode.removeChild(delem);
	delem = null; // Some MSIE needs this.

} // end: delete_delem()

/** Make all browsers the same.

My code from 2009. Still valid?
Doc: fe-e/engineers/javascript/mr-lib/xbrowser-functions.html*/
jsw2.fixup_mouse_event = function ( event ) {

    event = event || window.event;

    var e = { event: event,
        target: event.target ? event.target : event.srcElement,
		type: event.type,
        which: event.which ? event.which :
            event.button === 1 ? 1 :
            event.button === 2 ? 3 :
            event.button === 4 ? 2 : 1,
        x: event.x ? event.x : event.clientX,
        y: event.y ? event.y : event.clientY
    };
    return e;

} // end: fixup_mouse_event()

/** Add an event listener. */
jsw2.listen_for = function (wobj, event_name, func) {
	var delem = wobj.delem;

	if (delem.addEventListener !== undefined) {
			delem.addEventListener(event_name, func, false); }
	else if (delem.attachEvent !== undefined) {
		delem.attachEvent('on' + event_name, func); } // IE before 9
	else { delem['on' + event_name] = func; } // old school!

} // end: listen_for()

/** Add a solo listener. */
jsw2.listen_on = function (wobj, event_name, func) {
	var delem = wobj.delem;

	delem['on' + event_name] = func;
}

/** Erase innerHTML. */
jsw2.remove_kids = function (delem) {

	while ( delem.hasChildNodes() ) {
		var kid = delem.removeChild(delem.firstChild);
	}
};

/** Use RGBA, if supported.
Technique from Lea Verou (but don't call me "arguments.callee") http://lea.verou.me/2009/03/check-whether-the-browser-supports-rgba-and-other-css3-values/ */
jsw2.rgba = function (red, green, blue, alpha) {

	if (jsw2.rgba.ok === undefined) { jsw2.rgba.ok = is_ok(); }

	if (jsw2.rgba.ok) { return 'rgba(' +
			red + ',' + green + ',' + blue + ',' + alpha + ')'; }
	else { return 'rgb(' + red + ',' + green + ',' + blue + ')'; }

	function is_ok() {
		var test_div = document.createElement('div'),
			is_ok;
		try {
			test_div.style.backgroundColor = 'rgba(0,0,0, 0.0)';
			is_ok = true;
		}
		catch (e) { is_ok = false; }
		test_div = null;
		return is_ok;
	}

} // end rgba();

/** Remove a listener. */
jsw2.stop_listening_for = function (wobj, type, func) {
	var delem = wobj.delem;

	if (delem.removeEventListener !== undefined) {
			delem.removeEventListener( type, func, false ); }
	else if (delem.detachEvent) {
			delem.detachEvent(type, func); } // IE before 9
	else { delem['on' + type] = undefined; } // old school!

} // end: stop_listening_for()

/** Remove solo listener. */
jsw2.stop_listening_on = function (wobj, type, func) {
	var delem = wobj.delem;

	delem['on' + type] = undefined;
}

	/**A Utility */

/** Array to String */
jsw2.a2s = function (arr) {
	var ret = [];

	for (var i in arr) {
		if ( arr[i] instanceof Array ) { ret.push(  jsw2.a2s( arr[i] )  ); }
		else { ret.push( arr[i] ); }
	}
	return 'Array[' + ret.join(',') + ']';

} // end: a2s()

/** Draw a rectangle's border. */
jsw2.draw_border = function (canvas, left,top, width,height, bwidth, color)  {

	var d = document.createElement('div');
		d.style.left = left + 'px';
		d.style.top  = top  + 'px';
		d.style.width = width + 'px';
		d.style.height = height + 'px';
		d.style.border = bwidth + 'px solid ' + color;
		d.style.position = 'absolute';
	canvas.appendChild(d);

	return d;

} // end: draw_border()

/** Draw a rectangle. */
jsw2.draw_rect = function (canvas, left,top, width,height, color) {

	var d = document.createElement('div');
		d.style.left = left + 'px';
		d.style.top  = top  + 'px';
		d.style.width = width + 'px';
		d.style.height = height + 'px';
		d.style.backgroundColor = color;
		d.style.position = 'absolute';
	canvas.appendChild(d);

	return d;

} // end: draw_rect();

/** */
jsw2.extends = function (extend, base) {
		extend.prototype = jsw2.sum(extend.prototype, base.prototype); }

/** */
jsw2.find_index = function (arr, element) {
	for (var i in arr) {  if ( arr[i] === element ) { return i; }  }
	return -1;
}

/** QD object to string. */
jsw2.o2s = function (obj) {
	var ret = [];
	for (var pname in obj) {
		var prop = obj[pname];
		if (typeof prop !== 'function') { ret.push(pname + ': ' + prop); }
	}
	return 'object{' + ret.join(',') + '}';
}

/** */
jsw2.remove_array_element = function(arr, element) {

	var index = jsw2.find_index(arr, element);
	if (index === -1) { return; }

	ret = [];
	for (var i in arr) { if (i !== index) {  ret.push( arr[i] ); }  }
	arr = ret;

} // end: remove_array_element()

/** */
jsw2.shallow_copy = function (obj) {
	var ret;

	if (obj instanceof Array) { ret = []; }
	else if (obj instanceof Function) { ret = obj; }
	else { ret = {}; }

	for (var name in obj) { ret[name] = obj[name]; }

	return ret;
} // end: shallow_copy()

/** Union
	New properties add to old or replace props in old. */
jsw2.sum = function (old_object, new_props_object) {
	var ret = {};

	for (var prop in old_object) {
			ret[prop] = old_object[prop]; }
	for (prop in new_props_object) { ret[prop] = new_props_object[prop]; }

	return ret;
} // end: sum()

/** Union with Self */
jsw2.sum2me = function (remaining_object, new_props_object) {
	for (var prop in new_props_object) {
			remaining_object[prop] = new_props_object[prop]; }
} // end: sum2me()

/** Guesses the browser window's size.
from MRlib, doc: fe-e/engineers/javascript/mr-lib/xbrowser-functions.html*/
jsw2.window_size = function () {

    var w, h;
    if (window.innerWidth) {
        w = innerWidth;
        h = innerHeight;
    } else if (document.documentElement.clientWidth !== 0) {
        w = document.documentElement.clientWidth;
        h = document.documentElement.clientHeight;
    } else {
        w = document.body.clientWidth;
        h = document.body.clientHeight;
    }

    return {width: w, height: h};

}  // end of window_size()

/**A JavaScript */

/** */
jsw2.alert = function (wind, message) {

	// Kludge! We need a FontMetrics object.
	var fudge = 40; // borders + padding + a bit
	var font_size = jsw2.DEFAULTS.SCREEN.font_size,
		msg_length = Math.ceil( font_size * (message.length / 1.5) ),
		alert_width = Math.ceil( Math.min(msg_length + fudge,
				jsw2.SCREEN.pos_size.width * 0.7) ),
		rows = Math.ceil( msg_length / (alert_width - fudge) ) + 3,
				// 3? trial & error
		alert_height = Math.ceil(rows * font_size * 1.3) + fudge;

	if (wind.Maskable === undefined) { wind.implement('Maskable'); }
	wind.Maskable.mask();

	var box = new jsw2.Window_M( wind, wind.name + '_alert',
			[ '0.5','0.5', alert_width,alert_height, [5, 15, 5, 5] ],
					// pos_size w/padding
			[8, undefined, undefined, 5], // borders
			{backgroundColor: 'white', display: 'inline-block'}, // styles
			{innerHTML: message}, jsw2.TEXTS.alert_title ); // other, title

	box.onclose = function () { // Too simple! Why does this work?
		wind.Maskable.unmask();
		return true; // delete button and button's window
	}

} // end: alert()

/**I Utility Classes */

/**A Borders */

/** */
jsw2.Borders = function (arg0, style, color, radii) {
	var new_borders = this;

	if (arg0 instanceof jsw2.Borders) { // shallow copy a Borders
		return new jsw2.Borders(
				arg0.width, arg0.style, arg0.color, arg0.radii);
	}

	var width;
	if ( (arg0 instanceof Array) && (arg0.length > 2) ) {
		width = arg0[0];
		style = arg0[1];
		color = arg0[2];
		radii = arg0[3];
	} else { width = arg0; }

	new_borders.width = (width !== undefined) ? width :
			jsw2.DEFAULTS.border_width;
	new_borders.style = (style !== undefined) ? style :
			jsw2.DEFAULTS.border_style;
	new_borders.color = (color !== undefined) ? color :
			jsw2.DEFAULTS.border_color;
	new_borders.radii = (radii !== undefined) ? radii :
			jsw2.DEFAULTS.border_radii;

	new_borders.original_color = new_borders.color;
	new_borders.original_radii = new_borders.radii;

} // end: Borders()

/** */
jsw2.Borders.prototype.get_styles = function () {
	var borders = this,
		styles = {};

	if (borders.color !== undefined) {
		if (borders.color instanceof Array) {
			styles['borderLeftColor'] = borders.color[0];
			styles['borderTopColor'] = borders.color[1];
			styles['borderRightColor'] = borders.color[2];
			styles['borderBottomColor'] = borders.color[3];
		} else { styles['borderColor'] = borders.color; }
	} else { styles['borderColor'] = jsw2.DEFAULTS.Borders.color; }

	if (borders.style !== undefined) {
		if (borders.style instanceof Array) {
			styles['borderLeftStyle'] = borders.style[0];
			styles['borderTopStyle'] = borders.style[1];
			styles['borderRightStyle'] = borders.style[2];
			styles['borderBottomStyle'] = borders.style[3];
		} else { styles['borderStyle'] = borders.style; }
	} else { styles['borderStyle'] = jsw2.DEFAULTS.Borders.style; }

	if (borders.width !== undefined) {
		if (borders.width instanceof Array) {
			styles['borderLeftWidth'] = borders.width[0] + 'px';
			styles['borderTopWidth'] = borders.width[1] + 'px';
			styles['borderRightWidth'] = borders.width[2] + 'px';
			styles['borderBottomWidth'] = borders.width[3] + 'px';
		} else { styles['borderWidth'] = borders.width + 'px'; }
	} else { styles['borderWidth'] = jsw2.DEFAULTS.Borders.width + 'px'; }

	var corners = ['TopLeft', 'TopRight', 'BottomRight', 'BottomLeft'];
	for (var i in corners) { styles[ 'border' + corners[i] + 'Radius' ] = ''; }

	if (borders.radii !== undefined) {
		if (typeof borders.radii === 'number') {
			styles['borderRadius'] = borders.radii + 'px';
		} else { // array
			if (borders.radii.length === 2) {
				styles['borderRadius'] = arr2rad(borders.radii, true);
			} else { // four separate corner elements
				for(var i in borders.radii) {
					styles[ 'border' + corners[i] + 'Radius' ] =
							e2rad( borders.radii[i] );
				}
			}
		}
	} else { styles['borderRadius'] = jsw2.DEFAULTS.Borders.radii + 'px'; }

	return styles;

	function arr2rad(arr2, slash) {
		return arr2[0] + 'px ' +
			( (slash===true) ? '/ ' : '' ) +
			arr2[1] + 'px';
	}

	function e2rad(e) {
		if (typeof e === 'number') { return e + 'px'; }
		return arr2rad(e);
	}

} // end: Borders.get_styles()

/** */
jsw2.Borders.prototype.get_width_bottom = function() {
	if (this.width instanceof Array) { return this.width[3]; }
	return this.width;
}

/** */
jsw2.Borders.prototype.get_width_horizontal = function() {
	if (this.width instanceof Array) {
			return this.width[0] + this.width[2]; }
	return 2 * this.width;
}

/** */
jsw2.Borders.prototype.get_width_left = function() {
	if (this.width instanceof Array) { return this.width[0]; }
	return this.width;
}

/** */
jsw2.Borders.prototype.get_width_max = function() {

	if (this.width instanceof Array) {
		var max = 0;
		for (var i in this.width) {
			if (this.width[i] > max) {
					max = this.width[i]; }
		}
		return max;
	}
	return this.width;

} //end: Borders.get_width_max()

/** */
jsw2.Borders.prototype.get_width_right = function() {
	if (this.width instanceof Array) { return this.width[2]; }
	return this.width;
}

/** */
jsw2.Borders.prototype.get_width_top = function() {
	if (this.width instanceof Array) { return this.width[1]; }
	return this.width;
}

/** */
jsw2.Borders.prototype.get_width_vertical = function () {
	if (this.width instanceof Array) {
		return this.width[1] + this.width[3]; }
	return 2 * this.width;
}

/** */
jsw2.Borders.prototype.get_inside_radii = function (corner) {
	var borders = this,
		bmax = borders.get_width_max(),
		brad = borders.radii;

	// corner: 0-left-top, 1-right-top, 2-right-btm, 3-left-btm

	// number or [width,height] specified?
	var radius = get_radius(brad);
	if (radius !== undefined) { return radius; }

	// four corners specified
	brad = brad[corner];
	return get_radius(brad);

	function get_radius(brad) {
		if (brad === undefined) { return 0; }
		if (typeof brad === 'number') { return adjust(brad); }
		if (brad.length === 2) {
				return [  adjust( brad[0] ), adjust( brad[1] )  ];
		}
	}

	function adjust(container_rad) {
		return Math.max( (container_rad - bmax), 0 );
	}

} // end: Borders.get_inside_radii()

/** */
jsw2.Borders.prototype.toString = function (separator) {
	var o = this.get_styles();
	var a = [];
	for ( var name in o ) { a.push( name + ':' + o[name] ); }
	return 'Borders{' + a.join(separator) + '}';
}

/**A Choices */

/** */
jsw2.Choices = function (arr, index) {
	var choices = this;

	choices.array = (arr !== undefined) ? arr : [];
	choices.index = (index !== undefined) ? index : choices.array.length - 1;

	// Add link, each choice item to Choices object.
	for (var i in choices.array) { choices.array[i]['choices'] = choices; }

} // end: Choices()

	/**1 Prototype */

jsw2.Choices.prototype = {
		/** */
	add: function (item_to_add) {
		var choices = this;

		// need this??? item_to_add.parents_choices_object = choices;
		choices.array.push(item_to_add);
	},
		/** */
	add_and_choose: function (item_to_add) {
		var choices = this;

		choices.add(item_to_add);
		choices.choose_last();
	},
		/** */
	choose: function (choice) {
		var choices = this;

		choices.index = choices.find(choice);
		choice.choose();
	},
		/** */
	choose_last: function () {
		var choices = this;

		choices.index = choices.array.length - 1;
	},
		/** */
	chosen: function () {
		var choices = this;

		if (choices.index === -1) { return undefined; }

		return choices.array[choices.index];
	},
		/** */
	del: function (choice) { // Note: 'delete' is a reserved word
		var choices = this;

		var where = choices.find( choice ); // -1 === not found
		if (where === -1) { return; }

		// create a 'ghost'-free array
		var arr = [];
		for (var i in choices.array) {
			i = +i; // use a number
			if (i < where) { // before deletion
				arr[i] = choices.array[i];
			} else if (i > where) { // after deletion
				arr.push( choices.array[i] );
			}
		}
		choices.array = arr;

		// ensure that chosen is not past end
		choices.index = Math.min(choices.index, choices.array.length - 1);
	},
		/** */
	find: function (choice) {
		var choices = this;

		for (var i in choices.array) {
			if ( choices.array[i] ===  choice ) { return +i; } // a number
		}
		return -1;
	},
	number: function () { return this.array.length; },
		/** */
	show_choices: function () {
		var choices = this;

		for (var i in choices.array) {
			i = +i;
			if (i === choices.index) { choices.array[i].choose(); }
			else { choices.array[i].choose(false); }
		}
	},
	unchoose: function () {
		var choices = this;
		choices.array[choices.index].choose(false);
	},
		/** */
	toString: function () {
		return 'Choices{' +
			this.array.length + ' choices' +
			',chosen=' + this.index +
		'}';
	}

} // end: Choices.prototype{}

/**A Pos_size */

/** */
jsw2.Pos_size = function (arg0, left,top, width,height, padding) {
	var new_pos_size = this;

	if (arg0 instanceof jsw2.Pos_size) { // copy existing Pos_size
		var old_ps = arg0;

		new_pos_size.wobj = old_ps.wobj;
		new_pos_size.specs = {
			width:		old_ps.specs.width,
			height:		old_ps.specs.height,
			left:		old_ps.specs.left,
			top:		old_ps.specs.top,
			padding:	old_ps.specs.padding
		};
		return;
	}

// Called with wobj plus 5 args.
	new_pos_size.wobj	= arg0;

	new_pos_size.specs = {
		width:		width,
		height:		height,
		left:		left,
		top:		top,
		padding:	padding
	};

} // end: Pos_size()

/** Parse a position specification. */
jsw2.Pos_size.parse_ps = function (spec) {

	/* 	BOS, opt whitespace
		( digits opt(.opt digits) ) | (.digits) )
		opt whitespace
		opt ((+|-)digits)
		opt whitespace
		opt (B|b|C|c)
		opt chars, EOS */
	var re = /^\s*((\d+(\.\d*)?)|(\.\d+))\s*((\+|\-)\d+)?\s*(B|b|C|c)?.*$/;
	spec.replace(',', '.').match( re );
	return {
			ratio: +RegExp.$1,
			offset: +RegExp.$5,
			type: (RegExp.$7 === 'C') || (RegExp.$7 === 'c') ? 'C' : 'B'
	};

} // end: Pos_size.parse_ps()

/** */
jsw2.Pos_size.resize = function (spec, factor) {

	if (spec === undefined) { return undefined; }
	if (typeof spec === 'number') { return spec * factor; }

	// it's a string spec
	var parts = jsw2.Pos_size.parse_ps(spec);
	return ( (+parts.ratio) * factor ) + ' ' + parts.offset + ' ' + parts.type;

} // end: Pos_size.resize()

/** */
jsw2.Pos_size.prototype.compute = function () {
	var pos_size = this;

	pos_size.size(); // this must come before position
	pos_size.position();

	pos_size.content_width  =
			pos_size.width  - pos_size.wobj.borders.get_width_horizontal() -
					pos_size.get_padding_horizontal();
	pos_size.content_height =
			pos_size.height - pos_size.wobj.borders.get_width_vertical() -
					pos_size.get_padding_vertical();

} // end: Pos_size.compute()

/** */
jsw2.Pos_size.prototype.get_padding_horizontal = function () {
	var pos_size = this;

	if (pos_size.specs.padding === undefined) { return 0; }
	if (typeof pos_size.specs.padding === 'number') {
			return 2 * pos_size.specs.padding; }

	// array: [left, top, right, bottom]
	return pos_size.specs.padding[0] + pos_size.specs.padding[2];

} // end: Pos_size.get_padding_horizontal();

/** */
jsw2.Pos_size.prototype.get_padding_vertical = function () {
	var pos_size = this;

	if (pos_size.specs.padding === undefined) { return 0; }
	if (typeof pos_size.specs.padding === 'number') {
			return 2 * pos_size.specs.padding; }

	// array: [left, top, right, bottom]
	return pos_size.specs.padding[1] + pos_size.specs.padding[3];

} // end: Pos_size.get_padding_vertical();

/** */
jsw2.Pos_size.prototype.get_styles = function () {
	var pos_size = this,
		wobj = pos_size.wobj,
		borders = wobj.borders;

	ret = {};
	ret.left = (pos_size.left !== undefined) ? pos_size.left + 'px' : '';
	ret.top  = (pos_size.top  !== undefined) ? pos_size.top  + 'px' : '';

	if (pos_size.width !== undefined) {
		var wid = pos_size.width - borders.get_width_horizontal() -
				pos_size.get_padding_horizontal();
			wid = Math.max(wid, 0); // style.width cannot be negative
			wid += 'px';
	} else { wid = ''; }
	ret.width = wid;

	if (pos_size.height !== undefined) {
		var hgt = pos_size.height - borders.get_width_vertical() -
				pos_size.get_padding_vertical();
			hgt = Math.max(hgt, 0); // style.height cannot be negative
			hgt += 'px';
	} else { hgt = ''; }
	ret.height = hgt;

	if (pos_size.specs.padding !== undefined) {

		if (typeof pos_size.specs.padding === 'number') {
			ret.padding = pos_size.specs.padding + 'px';
		} else {
			ret.paddingLeft		= pos_size.specs.padding[0] + 'px';
			ret.paddingTop		= pos_size.specs.padding[1] + 'px';
			ret.paddingRight	= pos_size.specs.padding[2] + 'px';
			ret.paddingBottom	= pos_size.specs.padding[3] + 'px';
		}

	} // end if padding !== undefined

	return ret;
} // end: Pos_size.get_styles()

/** */
jsw2.Pos_size.prototype.position = function () {
	var pos_size = this;

	pos_size.position_left(pos_size.specs.left);
	pos_size.position_top(pos_size.specs.top);

} // end: Pos_size.position()

/** */
jsw2.Pos_size.prototype.position_left = function (left) {
	var pos_size = this,
		wobj = pos_size.wobj;

	pos_size.left = left;
	if (typeof left !== 'string') { return; } // exit if number or undefined

	var specs = jsw2.Pos_size.parse_ps(left);

	var container_width = (specs.type === 'B') ?
			wobj.container.pos_size.width :
			wobj.container.pos_size.content_width;
	var space_left = container_width - pos_size.width;
	var ratio_left = Math.round(specs.ratio * space_left);
	var border_left = (specs.type === 'B') ?
			wobj.container.borders.get_width_left() : 0;

	pos_size.left = ratio_left - border_left + specs.offset;

} // end: Pos_size.position_left()

/** */
jsw2.Pos_size.prototype.position_top = function (top) {
	var pos_size = this,
		wobj = pos_size.wobj;

	pos_size.top = top;
	if (typeof top !== 'string') { return; } // exit if number or undefined

	var specs = jsw2.Pos_size.parse_ps(top);

	var container_height = (specs.type === 'B') ?
			wobj.container.pos_size.height :
			wobj.container.pos_size.content_height;
	var space_top = container_height - pos_size.height;
	var ratio_top = Math.round(specs.ratio * space_top);
	var border_top = (specs.type === 'B') ?
			wobj.container.borders.get_width_top() : 0;
	pos_size.top = ratio_top - border_top + specs.offset;

} // end: Pos_size.position_top()

/** */
jsw2.Pos_size.prototype.resize = function (width,height) {
	var pos_size = this;

	pos_size.specs.width = width;
	pos_size.specs.height = height;
	pos_size.compute();

} // end: Pos_size.resize()

/** */
jsw2.Pos_size.prototype.size = function () {
	var pos_size = this;

	pos_size.size_width(pos_size.specs.width);
	pos_size.size_height(pos_size.specs.height);

} // end: Pos_size.size()

/** */
jsw2.Pos_size.prototype.size_height = function (height) {
	var pos_size = this
		wobj = pos_size.wobj;

	pos_size.height = height;
	if ( typeof height !== 'string' ) { return; } // done if number

	var specs = jsw2.Pos_size.parse_ps(height);
	var height = (specs.type === 'B') ?
			wobj.container.pos_size.height :
			wobj.container.pos_size.content_height;
		height *= specs.ratio;
		height = Math.round(height);
		height += specs.offset;

	pos_size.height = height;

} // end: Pos_size.size_height()

/** */
jsw2.Pos_size.prototype.size_width = function (width) {
	var pos_size = this
		wobj = pos_size.wobj;

	pos_size.width = width;
	if ( typeof width !== 'string' ) { return; } // done if number

	var specs = jsw2.Pos_size.parse_ps(width);
	var width = (specs.type === 'B') ?
			wobj.container.pos_size.width :
			wobj.container.pos_size.content_width;
		width *= specs.ratio;
		width = Math.round(width);
		width += specs.offset;

	pos_size.width = width;

} // end: Pos_size.size_width()

/** */
jsw2.Pos_size.prototype.toString = function () {

	return 'Pos_size{' +
		'wobj.name=' + this.wobj.name +
		', ' + no_u(this.left)		+ '(' + this.specs.left		+ ')' +
		','  + no_u(this.top)		+ '(' + this.specs.top		+ ')' +
		', ' + no_u(this.width)		+ '(' + this.specs.width	+ ')' +
		','  + no_u(this.height)	+ '(' + this.specs.height	+ ')' +
		','  + a_or_n(this.specs.padding) +
	'}';

	function no_u(x) { return (x !== undefined) ? a_or_n(x) : ''; }
	function a_or_n(x) { return (x instanceof Array) ? jsw2.a2s(x) : x; }

} // end: Pos_size.toString()

/**A Queue */

/** */
jsw2.Queue = function () {
	var queue = this;

	queue.length = 0;
	queue.queue = [];

} // end: Queue()

/** */
jsw2.Queue.prototype.push = function (item) {
	var queue = this;

	queue.queue.push(item);
	queue.length += 1;

} // end: Queue.push()

/** */
jsw2.Queue.prototype.pop = function () {
	var queue = this;

	if (queue.length === 0) { return undefined; }

	queue.length -= 1;
	return queue.queue.shift();

} // end: Queue.pop()

/** */
jsw2.Queue.prototype.toString = function () {
	return 'Queue{' +
		'length=' + this.length +
		',queue=' + jsw2.a2s(this.queue) +
	'}';
}
// end: Queue.toString()

// alert( 'jsw2ci-code.js loaded' );

/* end of jsw2ci-code.js */