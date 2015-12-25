$ = (function(document, fn, s_addEventListener, s_querySelectorAll, $, Bala) {
	$ = function(s, context) {
		return new Bala(s, context);
	};

	Bala = function(s, context) {
		fn.push.apply(this, !s // if arg is falsy
			? fn // then pass []
			: s[s_addEventListener] // else if arg is node or window,
				? [s] // then pass [s]
				: "" + s === s // else if arg is a string
					? /</.test(s) // if the string contains "<" (if HTML code is passed)
						// then parse it and return node.children
						? ((context = document.createElement(context || 'q')).innerHTML = s, context.children)
						: context // else if context is truly
							? ((context = $(context)[0]) // if context element is found
								? context[s_querySelectorAll](s) // then select element from context
								: fn) // else pass [] (context isn't found)
							: document[s_querySelectorAll](s) // else select elements globally
					: /f/.test(typeof s) // else if function is passed
						? document.readyState[0] == 'c' // if DOM is ready
							? s() // then run given function
							: document[s_addEventListener]('DOMContentLoaded', s) // else wait for DOM ready
						: s); // else guessing that s variable is array-like object
	};

	$.fn = Bala.prototype = fn;

	$.one = function(s, context) {
		return $(s, context)[0] || null;
	};

	return $;
})(document, [], 'addEventListener', 'querySelectorAll');
