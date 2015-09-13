var brandmark = null;

function fetch_mark(callback) {
	$.get("../img/brandmark-grouped.svg", function(data) {
		brandmark = data.documentElement;
		if (typeof callback === 'function') {
			callback();
		}
	});
}

function generateMark() {
    console.log($('.logo-wrapper'));
		$('.logo-wrapper').each(function (i, e) {
			  var mark = make_number_mark($('blockquote').text());
        if (mark) {
			      $(this).replaceWith(mark);
        }
		});
}

function swap_color(e) {
	var e_class = $(e).attr('class');
	if (e_class == 'st0') {
		$(e).attr('class', '');
	} else {
		$(e).attr('class', 'st0');
	}
}

function make_number_mark(n) {
  if (!brandmark) {
      return;
  }
	var new_mark = brandmark.cloneNode(true);

	var groups = $(new_mark).find('g');
	var elems = $(new_mark).find('polygon, path');

	var rng = new Math.seedrandom(n);
	var swapProb = rng.quick();

	// start from orange
	elems.not('.st0, .st1').attr('class', 'st0');

	// swap with black according to swapProb
	elems.each(function(i, e) {
		if (rng.quick() < swapProb) {
			swap_color(e);
		}
	});

	groups.each(function (i, e) {
		$(e).css('fill-opacity', rng.quick());
	});

	var div = document.createElement("div");
	div.className = "logo-wrapper";
	div.innerHTML = new XMLSerializer().serializeToString(new_mark);
	return div;
}
