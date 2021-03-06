/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	(function () {

		var Menu = __webpack_require__(1);
		var EnableOrDenyLocation = __webpack_require__(7);

		var Grid = React.createClass({
			displayName: 'Grid',

			render: function render() {
				return React.createElement(
					'div',
					{ className: '' },
					React.createElement(Menu, null),
					React.createElement(EnableOrDenyLocation, null)
				);
			}
		});

		React.render(React.createElement(Grid, null), document.getElementById('wrapper'));
	})();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ChangeLocationLink = __webpack_require__(2);
	var CategoryFilter = __webpack_require__(5);
	var MoreRestaurantsFilter = __webpack_require__(6);

	var Menu = React.createClass({
		displayName: 'Menu',

		showDropdown: function showDropdown() {
			$('.dropdown').dropdown({
				transition: 'drop'
			});
		},

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'div',
					{ className: 'ui red inverted menu' },
					React.createElement(
						'div',
						{ className: 'header item' },
						'Mealette'
					),
					React.createElement(
						'div',
						{ className: 'right menu' },
						React.createElement(
							'div',
							{ onClick: this.showDropdown, className: 'ui dropdown' },
							React.createElement(
								'div',
								{ className: 'item header' },
								React.createElement('i', { className: 'sidebar icon' })
							),
							React.createElement(
								'div',
								{ className: 'ui menu menu-dropdown' },
								React.createElement(
									'div',
									{ className: 'item' },
									React.createElement(MoreRestaurantsFilter, null)
								),
								React.createElement(
									'div',
									{ className: 'item' },
									React.createElement(
										ChangeLocationLink,
										null,
										'Change Location'
									)
								),
								React.createElement(
									'div',
									{ className: '' },
									React.createElement(CategoryFilter, null)
								)
							)
						)
					)
				)
			);
		}

	});

	module.exports = Menu;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objectAssign = __webpack_require__(3);
	var ActionLink = __webpack_require__(4);

	module.exports = React.createClass({
	  displayName: 'exports',

	  changeLocation: function changeLocation() {
	    FilterOptions.remove();
	  },

	  render: function render() {
	    var props = objectAssign({}, this.props);
	    props.onClick = this.changeLocation;
	    return React.createElement(ActionLink, props, this.props.children);
	  }

	});

/***/ },
/* 3 */
/***/ function(module, exports) {

	'use strict';
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function ToObject(val) {
		if (val == null) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function ownEnumerableKeys(obj) {
		var keys = Object.getOwnPropertyNames(obj);

		if (Object.getOwnPropertySymbols) {
			keys = keys.concat(Object.getOwnPropertySymbols(obj));
		}

		return keys.filter(function (key) {
			return propIsEnumerable.call(obj, key);
		});
	}

	module.exports = Object.assign || function (target, source) {
		var from;
		var keys;
		var to = ToObject(target);

		for (var s = 1; s < arguments.length; s++) {
			from = arguments[s];
			keys = ownEnumerableKeys(Object(from));

			for (var i = 0; i < keys.length; i++) {
				to[keys[i]] = from[keys[i]];
			}
		}

		return to;
	};


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var objectAssign = __webpack_require__(3);

	module.exports = React.createClass({
	  displayName: 'exports',

	  propTypes: {
	    onClick: React.PropTypes.func.isRequired
	  },

	  onClick: function onClick(event) {
	    event.preventDefault();
	    if (this.props.onClick) this.props.onClick(event);
	  },

	  render: function render() {
	    var props = objectAssign({}, this.props);
	    if ('string' != typeof props.href) props.href = '';
	    props.onClick = this.onClick;
	    return React.createElement('a', props);
	  }

	});

/***/ },
/* 5 */
/***/ function(module, exports) {

	"use strict";

	var CategoryFilter = React.createClass({
	  displayName: "CategoryFilter",

	  handleReturn: function handleReturn(event) {
	    if (event.keyCode == 13) {
	      this.filterCategory();
	    }
	  },

	  filterCategory: function filterCategory(event) {
	    var input = this.refs.category.getDOMNode();
	    var category = input.value;
	    input.value = "";

	    var currentLocation = FilterOptions.position;

	    FilterOptions.set(currentLocation, category);
	  },

	  render: function render() {
	    return React.createElement(
	      "form",
	      { className: "ui form", onKeyDown: this.handleReturn },
	      React.createElement(
	        "div",
	        { className: "ui icon search input" },
	        React.createElement("input", { type: "text", ref: "category", placeholder: "Category" }),
	        React.createElement("i", { className: "search link icon", onClick: this.filterCategory })
	      )
	    );
	  }
	});

	module.exports = CategoryFilter;

/***/ },
/* 6 */
/***/ function(module, exports) {

	'use strict';

	var MoreRestaurantsFilter = React.createClass({
	  displayName: 'MoreRestaurantsFilter',

	  repopulateRestaurants: function repopulateRestaurants(event) {
	    event.preventDefault();

	    if (FilterOptions.repopulate === 0) {
	      var repopulate = FilterOptions.repopulate + 1;
	    } else {
	      var repopulate = FilterOptions.repopulate - 1;
	    }

	    var currentLocation = FilterOptions.position;
	    var currentCategory = FilterOptions.category;

	    FilterOptions.set(currentLocation, currentCategory, repopulate);
	  },

	  render: function render() {
	    return React.createElement(
	      'a',
	      { className: 'repopulate', onClick: this.repopulateRestaurants },
	      'More Restaurants'
	    );
	  }
	});

	module.exports = MoreRestaurantsFilter;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var MainCarousel = __webpack_require__(8);
	var ChangeLocationFilter = __webpack_require__(15);
	var FilterOptions = __webpack_require__(16);

	var EnableOrDenyLocation = React.createClass({
	  displayName: 'EnableOrDenyLocation',

	  getInitialState: function getInitialState() {
	    return {
	      restaurant_objects: null,
	      user_location: null,
	      category: null,
	      repopulate: null,
	      error: null,
	      pageLoad: true
	    };
	  },

	  componentDidMount: function componentDidMount() {
	    FilterOptions.on('change', this.setGeoposition);
	    FilterOptions.requestLocation();
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    FilterOptions.off('change', this.setGeoposition);
	  },

	  setGeoposition: function setGeoposition(user_location, category, repopulate) {
	    this.setState({
	      restaurant_objects: null,
	      user_location: user_location,
	      category: category,
	      repopulate: repopulate,
	      pageLoad: false
	    });
	    this.loadRestaurants(user_location, category, repopulate);
	  },

	  unableToGetGeoposition: function unableToGetGeoposition(positionError) {
	    this.setState({ user_location: false });
	  },

	  loadRestaurants: function loadRestaurants(user_location, category, repopulate) {
	    if (!user_location) return;

	    var component = this;
	    var data = {};

	    if (user_location.address) {
	      data.address = user_location.address;
	      data.category = category;
	      data.repopulate = repopulate;
	    }
	    if (user_location.coords) {
	      data.lat = user_location.coords.latitude;
	      data.lon = user_location.coords.longitude;
	      data.category = category;
	      data.repopulate = repopulate;
	    }

	    var request = $.ajax({
	      url: 'https://mealette-backend.herokuapp.com/api',
	      method: 'get',
	      data: data,
	      dataType: 'JSON'
	    });

	    request.done(function (response) {
	      component.setState({ restaurant_objects: response });
	      $('.image img').each(function () {
	        if (this.src === '') {
	          this.src = 'https://mealette-backend.herokuapp.com/placeholder-image.png';
	        } else {
	          this.src = this.src.replace(/ms\.jpg$/, 'ls.jpg');
	        }
	      });
	    });

	    request.fail(function (errors) {
	      component.setState({ restaurant_objects: null, error: errors });
	    });
	  },

	  render: function render() {
	    var content;

	    if (this.state.errors) {
	      content = React.createElement(
	        'div',
	        null,
	        'Error: ',
	        this.state.errors
	      );
	    } else if (this.state.pageLoad) {
	      content = React.createElement(
	        'div',
	        { className: 'ui active dimmer' },
	        React.createElement(
	          'div',
	          { className: 'ui large text loader' },
	          React.createElement(
	            'h1',
	            { className: 'home-header' },
	            'Mealette'
	          )
	        )
	      );
	    } else if (this.state.user_location) {
	      if (this.state.restaurant_objects) {
	        content = React.createElement(MainCarousel, { cardData: this.state.restaurant_objects });
	      } else {
	        content = React.createElement(
	          'div',
	          { className: 'ui active dimmer' },
	          React.createElement(
	            'div',
	            { className: 'ui large text loader' },
	            React.createElement(
	              'h3',
	              null,
	              'Cooking Up Something Good'
	            )
	          )
	        );
	      }
	    } else {
	      content = React.createElement(ChangeLocationFilter, null);
	    }

	    return React.createElement(
	      'div',
	      null,
	      content
	    );
	  }
	});

	module.exports = EnableOrDenyLocation;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Carousel = __webpack_require__(9);
	var Ease = __webpack_require__(14);

	var MainCarousel = React.createClass({
	    displayName: 'MainCarousel',

	    getInitialState: function getInitialState() {
	        return {
	            cards: this.props.cardData,
	            width: 400,
	            layout: 'prism',
	            ease: 'bounceOut',
	            duration: 400
	        };
	    },

	    componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
	        this.setState({ cards: nextProps.cardData });
	    },

	    componentWillMount: function componentWillMount() {
	        this.onSides = (function (event) {
	            this.setState({ cards: cards.slice(0, event.target.value) });
	        }).bind(this);
	        this.onLayout = (function (event) {
	            this.setState({ layout: event.target.value });
	        }).bind(this);
	        this.onDuration = (function (event) {
	            this.setState({ duration: parseInt(event.target.value) });
	        }).bind(this);
	        this.onEase = (function (event) {
	            this.setState({ ease: event.target.value });
	        }).bind(this);
	    },

	    render: function render() {
	        var easeList = Object.keys(Ease).map(function (d) {
	            return React.createElement(
	                'option',
	                { key: d, value: d },
	                d
	            );
	        });
	        return React.createElement(
	            'div',
	            null,
	            React.createElement(Carousel, { width: this.state.width,
	                cards: this.state.cards,
	                ease: this.state.ease,
	                duration: this.state.duration,
	                layout: this.state.layout })
	        );
	    }
	});

	module.exports = MainCarousel;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var React = __webpack_require__(10);

	var Util = __webpack_require__(11);
	var Layout = __webpack_require__(12);
	var Depot = __webpack_require__(13);

	var Carousel = React.createClass({displayName: "Carousel",
	    getInitialState: function () {
	        return {
	            cards: this.props.cards,
	            figures: Layout[this.props.layout].figures(this.props.width, this.props.cards, 0),
	            rotationY: 0
	        };
	    },
	    componentWillMount: function () {
	        this.depot = Depot(this.getInitialState(), this.props, this.setState.bind(this));
	        this.onRotate = this.depot.onRotate.bind(this);
	    },
	    componentWillReceiveProps: function (nextProps) {
	        this.depot.onNextProps(nextProps);
	    },
	    render: function () {
	        var angle = (2 * Math.PI) / this.state.figures.length;
	        var translateZ = -Layout[this.props.layout].distance(this.props.width,
	            this.state.figures.length);
	        var figures = this.state.figures.map(function (d, i) {
	            return (React.createElement("figure", {key: i, style: Util.figureStyle(d)}, 
	               React.createElement("div", {className: "ui card"}, 
	                 React.createElement("div", {className: "image"}, 
	                   React.createElement("img", {src: d.card.hash.image_url})
	                 ), 
	                 React.createElement("div", {className: "content"}, 
	                   React.createElement("a", {className: "header", href: d.card.hash.url, target: "_new"}, d.card.hash.name)
	                 ), 
	                 React.createElement("div", {className: "extra content"}, 
	                   React.createElement("span", null, 
	                    React.createElement("i", {className: "red star icon"}), d.card.hash.rating
	                   ), 
	                   React.createElement("span", {className: "card-category"}, d.card.hash.categories[0][0]), 
	                   React.createElement("span", {className: "right floated"}, 
	                     React.createElement("a", {href: "https://maps.google.com/maps?q="+d.card.hash.location.display_address[0] + " " + d.card.hash.location.display_address[1], target: "_blank"}, React.createElement("i", {className: "red map icon"}), d.card.hash.location.display_address[0])
	                   )
	                 )
	               )
	               ));
	        });
	        return (
	          React.createElement("div", null, 
	            React.createElement("section", {className: "react-3d-carousel"}, 
	            React.createElement("div", {className: "carousel", 
	            style: {transform: "translateZ("+translateZ+"px)"}}, 
	            figures
	            ), 
	            React.createElement("div", {className: "prev", onClick: Util.partial(this.onRotate,+angle)}), 
	            React.createElement("div", {className: "next", onClick: Util.partial(this.onRotate,-angle)})
	            ), 
	            React.createElement("div", {className: "spin-button"}, 
	              React.createElement("button", {className: "massive ui red button", onClick: Util.partial(this.onRotate,-((Math.floor(Math.random() * (39 - 19 + 1)) + 19)*angle))}, 
	                React.createElement("i", {className: "refresh icon spinning-button"})
	              )
	            )
	          )
	        );
	    }
	});
	module.exports = Carousel;


/***/ },
/* 10 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var _exports = module.exports = {};

	_exports.figureStyle = function figureStyle(d) {
	    var translateX = Object.hasOwnProperty.call(d, 'translateX') ? d.translateX : 0;
	    return {
	        transform: 'rotateY(' + d.rotateY + 'rad) ' + ' translateX(' + translateX + 'px)' + ' translateZ(' + d.translateZ + 'px)',
	        opacity: d.opacity
	    };
	};

	_exports.partial = function partial(func) {
	    var args = Array.prototype.slice.call(arguments, 1);
	    return function () {
	        return func.apply(this, args.concat(Array.prototype.slice.call(arguments, 0)));
	    };
	};

	_exports.range = function range(from, to) {
	    var res = [];
	    for (var i = from; i < to; ++i) {
	        res.push(i);
	    }
	    return res;
	};

	_exports.uniq = function uniq(a) {
	    var prims = { 'boolean': {}, 'number': {}, 'string': {} },
	        objs = [];
	    return a.filter(function (item) {
	        var type = typeof item;
	        if (type in prims) return prims[type].hasOwnProperty(item) ? false : prims[type][item] = true;else return objs.indexOf(item) >= 0 ? false : objs.push(item);
	    });
	};

	/**
	 * Merge defaults with user options
	 * @private
	 * @param {Object} defaults Default settings
	 * @param {Object} options User options
	 * @returns {Object} Merged values of defaults and options
	 */
	_exports.merge = function merge(defaults, options) {
	    var extended = {};
	    var prop;
	    for (prop in defaults) {
	        if (Object.prototype.hasOwnProperty.call(defaults, prop)) {
	            extended[prop] = defaults[prop];
	        }
	    }
	    for (prop in options) {
	        if (Object.prototype.hasOwnProperty.call(options, prop)) {
	            extended[prop] = options[prop];
	        }
	    }
	    return extended;
	};

	_exports.pluck = function pluck(key, entries) {
	    return entries.map(function (entry) {
	        return entry[key];
	    });
	};

	_exports.mapObj = function mapObj(fn, obj) {
	    var res = {};
	    for (var key in obj) {
	        if (obj.hasOwnProperty(key)) {
	            res[key] = fn(obj[key]);
	        }
	    }
	    return res;
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Util = __webpack_require__(11);

	var _exports = module.exports = {};

	_exports.prism = {
	    distance: function apothem(width, sides) {
	        return Math.ceil(width / (2 * Math.tan(Math.PI / sides)));
	    },
	    figures: function figures(width, cards, initial) {
	        var sides = cards.length;
	        var angle = 2 * Math.PI / sides;
	        var acceptable = Math.round(initial / angle) * angle;
	        return Util.range(0, sides).map(function (d) {
	            return {
	                rotateY: d * angle + acceptable,
	                translateX: 0,
	                translateZ: _exports.prism.distance(width, sides),
	                opacity: 1,
	                present: true,
	                key: d,
	                card: cards[d]
	            };
	        });
	    }
	};
	_exports.classic = {
	    distance: function distance(width, sides) {
	        return Math.round(width * Math.log(sides));
	    },
	    figures: function figures(width, cards, initial) {
	        var sides = cards.length;
	        var angle = 2 * Math.PI / sides;
	        var distance = _exports.classic.distance(width, sides);
	        var acceptable = Math.round(initial / angle) * angle;
	        return Util.range(0, sides).map(function (d) {
	            var angleR = d * angle + acceptable;
	            return {
	                rotateY: 0,
	                translateX: distance * Math.sin(angleR),
	                translateZ: distance * Math.cos(angleR),
	                opacity: 1,
	                present: true,
	                key: d,
	                card: cards[d]
	            };
	        });
	    }
	};


/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Ease = __webpack_require__(14);
	var Layout = __webpack_require__(12);
	var Util = __webpack_require__(11);

	module.exports = function depot(initialState, initialProps, callback) {
	    var res = {};
	    var state = initialState;
	    var props = initialProps;
	    var requestID;

	    res.onNextProps = function onNextProps(nextProps) {
	        if (props.layout != nextProps.layout || props.cards != nextProps.cards) {
	            props = nextProps;
	            var to = Layout[props.layout].figures(props.width, props.cards, state.rotationY);
	            var bounds = transitionFigures(state.figures, to, Ease[props.ease], props.duration);
	            var stepper = transit(bounds, to, props.duration);
	            playAnimation(state, to, stepper, callback);
	        }
	        props = nextProps;
	    };
	    res.onRotate = function (angle) {
	        var to = Layout[props.layout].figures(props.width, props.cards, state.rotationY + angle);
	        state.rotationY += angle;
	        var bounds = transitionFigures(state.figures, to, Ease[props.ease], props.duration);
	        var stepper = transit(bounds, to, props.duration);
	        if (requestID) {
	            cancelAnimationFrame(requestID);
	        }
	        playAnimation(state, to, stepper, callback);
	    };
	    function playAnimation(state, to, stepper, callback) {
	        if (requestID) window.cancelAnimationFrame(requestID);
	        function animate(timestamp) {
	            requestID = requestAnimationFrame(animate);
	            state.figures = stepper(timestamp);
	            callback(state);
	            if (state.figures == to) {
	                cancelAnimationFrame(requestID);
	            }
	        }
	        requestAnimationFrame(animate);
	    }
	    return res;
	};

	function transitionFigures(from, to, ease) {
	    var keys = Util.uniq(Util.pluck('key', from.concat(to)));
	    var fromTo = [];
	    keys.forEach(function (key) {
	        fromTo.push(transfigure(startFrame(from[key], to[key]), endFrame(from[key], to[key]), ease));
	    });
	    return fromTo;
	}

	function transit(entries, to, duration) {
	    var start, end;
	    var withChange = addChange(entries);
	    var time = 0;
	    return function step(timestamp) {
	        if (!start) {
	            start = timestamp;
	            end = timestamp + duration;
	        }
	        if (timestamp >= end) {
	            return to;
	        }
	        time = timestamp - start;
	        return tally(time, withChange, duration);
	    };
	}

	function transfigure(from, to, ease) {
	    var keys = Util.uniq(Object.keys(from || {}).concat(Object.keys(to || {})));
	    var res = {};
	    keys.forEach(function (key) {
	        res[key] = {
	            from: from[key],
	            to: to[key]
	        };
	        res[key].ease = isNaN(res[key].from) ? secondArg : ease;
	    });
	    return res;
	}

	function addChange(entries) {
	    var len = entries.length;
	    var res = new Array(len);
	    for (var i = 0; i < len; ++i) {
	        res[i] = addObjChange(entries[i]);
	    }
	    return res;
	}

	function addObjChange(entry) {
	    var res = Object.create(null);
	    for (var key in entry) {
	        res[key] = Util.merge(entry[key], { change: entry[key].to - entry[key].from });
	    }
	    return res;
	}

	function tally(time, entries, duration) {
	    var len = entries.length;
	    var res = new Array(len);
	    var entry;
	    for (var i = 0; i < len; ++i) {
	        entry = entries[i];
	        var obj = Object.create(null);
	        for (var key in entry) {
	            obj[key] = entry[key].ease ? entry[key].ease(time, entry[key].from, entry[key].change, duration) : entry[key].from;
	        }
	        res[i] = obj;
	    }
	    return res;
	}

	var secondArg = function secondArg(x, y) {
	    return y;
	};

	var present = function present(entries) {
	    return entries.filter(function (entry) {
	        return entry.present;
	    });
	};

	function startFrame(now, then) {
	    return now || Util.merge(then, { present: true, opacity: 0 });
	}

	function endFrame(now, then) {
	    return now && !then ? Util.merge(now, { present: false, opacity: 0 }) // leaves
	    : Util.merge(then, { present: true, opacity: 1 });
	}


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	(function () {

	    'use strict';


	    function bounceOut(time, begin, change, duration) {
	        if ((time /= duration) < 1 / 2.75) {
	            return change * (7.5625 * time * time) + begin;
	        } else if (time < 2 / 2.75) {
	            return change * (7.5625 * (time -= 1.5 / 2.75) * time + 0.75) + begin;
	        } else if (time < 2.5 / 2.75) {
	            return change * (7.5625 * (time -= 2.25 / 2.75) * time + 0.9375) + begin;
	        } else {
	            return change * (7.5625 * (time -= 2.625 / 2.75) * time + 0.984375) + begin;
	        }
	    }


	    function bounceIn(time, begin, change, duration) {
	        return change - bounceOut(duration - time, 0, change, duration) + begin;
	    }


	    function bounceInOut(time, begin, change, duration) {
	        if (time < duration / 2) {
	            return bounceIn(time * 2, 0, change, duration) * 0.5 + begin;
	        } else {
	            return bounceOut(time * 2 - duration, 0, change, duration) * 0.5 + change * 0.5 + begin;
	        }
	    };

	    function circIn(time, begin, change, duration) {
	        return -change * (Math.sqrt(1 - (time = time / duration) * time) - 1) + begin;
	    };

	    function circOut(time, begin, change, duration) {
	        return change * Math.sqrt(1 - (time = time / duration - 1) * time) + begin;
	    };

	    function circInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return -change / 2 * (Math.sqrt(1 - time * time) - 1) + begin;
	        } else {
	            return change / 2 * (Math.sqrt(1 - (time -= 2) * time) + 1) + begin;
	        }
	    };

	    function cubicIn(time, begin, change, duration) {
	        return change * (time /= duration) * time * time + begin;
	    };

	    function cubicOut(time, begin, change, duration) {
	        return change * ((time = time / duration - 1) * time * time + 1) + begin;
	    };

	    function cubicInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time * time + begin;
	        } else {
	            return change / 2 * ((time -= 2) * time * time + 2) + begin;
	        }
	    };

	    function expoIn(time, begin, change, duration) {
	        if (time === 0) {
	            return begin;
	        }
	        return change * Math.pow(2, 10 * (time / duration - 1)) + begin;
	    };

	    function expoOut(time, begin, change, duration) {
	        if (time === duration) {
	            return begin + change;
	        }
	        return change * (-Math.pow(2, -10 * time / duration) + 1) + begin;
	    };

	    function expoInOut(time, begin, change, duration) {
	        if (time === 0) {
	            return begin;
	        } else if (time === duration) {
	            return begin + change;
	        } else if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * Math.pow(2, 10 * (time - 1)) + begin;
	        } else {
	            return change / 2 * (-Math.pow(2, -10 * (time - 1)) + 2) + begin;
	        }
	    };

	    function linear(time, begin, change, duration) {
	        return change * time / duration + begin;
	    };

	    function quadIn(time, begin, change, duration) {
	        return change * (time = time / duration) * time + begin;
	    };

	    function quadOut(time, begin, change, duration) {
	        return -change * (time = time / duration) * (time - 2) + begin;
	    };

	    function quadInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time + begin;
	        } else {
	            return -change / 2 * ((time -= 1) * (time - 2) - 1) + begin;
	        }
	    };

	    function quartIn(time, begin, change, duration) {
	        return change * (time = time / duration) * time * time * time + begin;
	    };

	    function quartOut(time, begin, change, duration) {
	        return -change * ((time = time / duration - 1) * time * time * time - 1) + begin;
	    };

	    function quartInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time * time * time + begin;
	        } else {
	            return -change / 2 * ((time -= 2) * time * time * time - 2) + begin;
	        }
	    };

	    function quintIn(time, begin, change, duration) {
	        return change * (time = time / duration) * time * time * time * time + begin;
	    };

	    function quintOut(time, begin, change, duration) {
	        return change * ((time = time / duration - 1) * time * time * time * time + 1) + begin;
	    };

	    function quintInOut(time, begin, change, duration) {
	        if ((time = time / (duration / 2)) < 1) {
	            return change / 2 * time * time * time * time * time + begin;
	        } else {
	            return change / 2 * ((time -= 2) * time * time * time * time + 2) + begin;
	        }
	    };

	    function sineIn(time, begin, change, duration) {
	        return -change * Math.cos(time / duration * (Math.PI / 2)) + change + begin;
	    };

	    function sineOut(time, begin, change, duration) {
	        return change * Math.sin(time / duration * (Math.PI / 2)) + begin;
	    };

	    function sineInOut(time, begin, change, duration) {
	        return -change / 2 * (Math.cos(Math.PI * time / duration) - 1) + begin;
	    };

	    var Ease = {
	        bounceOut: bounceOut,
	        bounceIn: bounceIn,
	        bounceInOut: bounceInOut,
	        circIn: circIn,
	        circOut: circOut,
	        circInOut: circInOut,
	        cubicIn: cubicIn,
	        cubicOut: cubicOut,
	        cubicInOut: cubicInOut,
	        expoIn: expoIn,
	        expoOut: expoOut,
	        expoInOut: expoInOut,
	        linear: linear,
	        quadIn: quadIn,
	        quadOut: quadOut,
	        quadInOut: quadInOut,
	        quartIn: quartIn,
	        quartOut: quartOut,
	        quartInOut: quartInOut,
	        quintIn: quintIn,
	        quintOut: quintOut,
	        quintInOut: quintInOut,
	        sineIn: sineIn,
	        sineOut: sineOut,
	        sineInOut: sineInOut
	    }
	    if (true) {
	        module.exports = Ease;
	    } else if (typeof define === 'function' && define.amd) {
	        define(function () {
	            return Ease;
	        });
	    } else {
	        this.Ease = Ease;
	    }

	}.call(this));

/***/ },
/* 15 */
/***/ function(module, exports) {

	"use strict";

	var ChangeLocationFilter = React.createClass({
	  displayName: "ChangeLocationFilter",

	  changeLocation: function changeLocation(event) {
	    event.preventDefault();
	    var input = this.refs.address.getDOMNode();
	    var address = input.value;
	    input.value = "";

	    FilterOptions.set({ address: address });
	  },

	  render: function render() {
	    return React.createElement(
	      "div",
	      { className: "change-location" },
	      React.createElement(
	        "form",
	        { className: "ui form change-location", onSubmit: this.changeLocation },
	        React.createElement(
	          "div",
	          { className: "ui icon input" },
	          React.createElement("input", { type: "text", ref: "address", placeholder: "Enter your location" }),
	          React.createElement("i", { className: "search link icon", onClick: this.changeLocation })
	        )
	      )
	    );
	  }
	});

	module.exports = ChangeLocationFilter;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var EventEmitter = __webpack_require__(17);

	FilterOptions = EventEmitter({
	  position: null,
	  category: null,
	  repopulate: null,

	  set: function(position, category, repopulate){
	    FilterOptions.position = position;
	    FilterOptions.category = category;
	    FilterOptions.repopulate = repopulate || 0;
	    FilterOptions.emit('change', position, category, repopulate);
	    return this;
	  },

	  requestLocation: function(){
	    if (FilterOptions.position) return Promise.resolve(FilterOptions.position);
	    return new Promise(function(resolve, reject){
	      navigator.geolocation.getCurrentPosition(
	        function(position){
	          FilterOptions.set(position);
	          resolve(position);
	        },
	        function(positionError){
	          FilterOptions.set(null);
	          reject(positionError);
	        }
	      );
	    });
	    return this;
	  },

	  remove: function(){
	    return FilterOptions.set(null);
	  }
	});


	module.exports = FilterOptions


/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var d        = __webpack_require__(18)
	  , callable = __webpack_require__(31)

	  , apply = Function.prototype.apply, call = Function.prototype.call
	  , create = Object.create, defineProperty = Object.defineProperty
	  , defineProperties = Object.defineProperties
	  , hasOwnProperty = Object.prototype.hasOwnProperty
	  , descriptor = { configurable: true, enumerable: false, writable: true }

	  , on, once, off, emit, methods, descriptors, base;

	on = function (type, listener) {
		var data;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) {
			data = descriptor.value = create(null);
			defineProperty(this, '__ee__', descriptor);
			descriptor.value = null;
		} else {
			data = this.__ee__;
		}
		if (!data[type]) data[type] = listener;
		else if (typeof data[type] === 'object') data[type].push(listener);
		else data[type] = [data[type], listener];

		return this;
	};

	once = function (type, listener) {
		var once, self;

		callable(listener);
		self = this;
		on.call(this, type, once = function () {
			off.call(self, type, once);
			apply.call(listener, this, arguments);
		});

		once.__eeOnceListener__ = listener;
		return this;
	};

	off = function (type, listener) {
		var data, listeners, candidate, i;

		callable(listener);

		if (!hasOwnProperty.call(this, '__ee__')) return this;
		data = this.__ee__;
		if (!data[type]) return this;
		listeners = data[type];

		if (typeof listeners === 'object') {
			for (i = 0; (candidate = listeners[i]); ++i) {
				if ((candidate === listener) ||
						(candidate.__eeOnceListener__ === listener)) {
					if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
					else listeners.splice(i, 1);
				}
			}
		} else {
			if ((listeners === listener) ||
					(listeners.__eeOnceListener__ === listener)) {
				delete data[type];
			}
		}

		return this;
	};

	emit = function (type) {
		var i, l, listener, listeners, args;

		if (!hasOwnProperty.call(this, '__ee__')) return;
		listeners = this.__ee__[type];
		if (!listeners) return;

		if (typeof listeners === 'object') {
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

			listeners = listeners.slice();
			for (i = 0; (listener = listeners[i]); ++i) {
				apply.call(listener, this, args);
			}
		} else {
			switch (arguments.length) {
			case 1:
				call.call(listeners, this);
				break;
			case 2:
				call.call(listeners, this, arguments[1]);
				break;
			case 3:
				call.call(listeners, this, arguments[1], arguments[2]);
				break;
			default:
				l = arguments.length;
				args = new Array(l - 1);
				for (i = 1; i < l; ++i) {
					args[i - 1] = arguments[i];
				}
				apply.call(listeners, this, args);
			}
		}
	};

	methods = {
		on: on,
		once: once,
		off: off,
		emit: emit
	};

	descriptors = {
		on: d(on),
		once: d(once),
		off: d(off),
		emit: d(emit)
	};

	base = defineProperties({}, descriptors);

	module.exports = exports = function (o) {
		return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
	};
	exports.methods = methods;


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var assign        = __webpack_require__(19)
	  , normalizeOpts = __webpack_require__(26)
	  , isCallable    = __webpack_require__(27)
	  , contains      = __webpack_require__(28)

	  , d;

	d = module.exports = function (dscr, value/*, options*/) {
		var c, e, w, options, desc;
		if ((arguments.length < 2) || (typeof dscr !== 'string')) {
			options = value;
			value = dscr;
			dscr = null;
		} else {
			options = arguments[2];
		}
		if (dscr == null) {
			c = w = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
			w = contains.call(dscr, 'w');
		}

		desc = { value: value, configurable: c, enumerable: e, writable: w };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};

	d.gs = function (dscr, get, set/*, options*/) {
		var c, e, options, desc;
		if (typeof dscr !== 'string') {
			options = set;
			set = get;
			get = dscr;
			dscr = null;
		} else {
			options = arguments[3];
		}
		if (get == null) {
			get = undefined;
		} else if (!isCallable(get)) {
			options = get;
			get = set = undefined;
		} else if (set == null) {
			set = undefined;
		} else if (!isCallable(set)) {
			options = set;
			set = undefined;
		}
		if (dscr == null) {
			c = true;
			e = false;
		} else {
			c = contains.call(dscr, 'c');
			e = contains.call(dscr, 'e');
		}

		desc = { get: get, set: set, configurable: c, enumerable: e };
		return !options ? desc : assign(normalizeOpts(options), desc);
	};


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(20)()
		? Object.assign
		: __webpack_require__(21);


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var assign = Object.assign, obj;
		if (typeof assign !== 'function') return false;
		obj = { foo: 'raz' };
		assign(obj, { bar: 'dwa' }, { trzy: 'trzy' });
		return (obj.foo + obj.bar + obj.trzy) === 'razdwatrzy';
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keys  = __webpack_require__(22)
	  , value = __webpack_require__(25)

	  , max = Math.max;

	module.exports = function (dest, src/*, …srcn*/) {
		var error, i, l = max(arguments.length, 2), assign;
		dest = Object(value(dest));
		assign = function (key) {
			try { dest[key] = src[key]; } catch (e) {
				if (!error) error = e;
			}
		};
		for (i = 1; i < l; ++i) {
			src = arguments[i];
			keys(src).forEach(assign);
		}
		if (error !== undefined) throw error;
		return dest;
	};


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(23)()
		? Object.keys
		: __webpack_require__(24);


/***/ },
/* 23 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		try {
			Object.keys('primitive');
			return true;
		} catch (e) { return false; }
	};


/***/ },
/* 24 */
/***/ function(module, exports) {

	'use strict';

	var keys = Object.keys;

	module.exports = function (object) {
		return keys(object == null ? object : Object(object));
	};


/***/ },
/* 25 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (value) {
		if (value == null) throw new TypeError("Cannot use null or undefined");
		return value;
	};


/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';

	var forEach = Array.prototype.forEach, create = Object.create;

	var process = function (src, obj) {
		var key;
		for (key in src) obj[key] = src[key];
	};

	module.exports = function (options/*, …options*/) {
		var result = create(null);
		forEach.call(arguments, function (options) {
			if (options == null) return;
			process(Object(options), result);
		});
		return result;
	};


/***/ },
/* 27 */
/***/ function(module, exports) {

	// Deprecated

	'use strict';

	module.exports = function (obj) { return typeof obj === 'function'; };


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(29)()
		? String.prototype.contains
		: __webpack_require__(30);


/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	var str = 'razdwatrzy';

	module.exports = function () {
		if (typeof str.contains !== 'function') return false;
		return ((str.contains('dwa') === true) && (str.contains('foo') === false));
	};


/***/ },
/* 30 */
/***/ function(module, exports) {

	'use strict';

	var indexOf = String.prototype.indexOf;

	module.exports = function (searchString/*, position*/) {
		return indexOf.call(this, searchString, arguments[1]) > -1;
	};


/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function (fn) {
		if (typeof fn !== 'function') throw new TypeError(fn + " is not a function");
		return fn;
	};


/***/ }
/******/ ]);