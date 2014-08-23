var _ = require('lodash');
'use strict'

var count = 0;

function filterChapter(start, end, haystack) {
	needles = [];
	// whole chapter
	if (!start && !end) {
		_(haystack).forEach(function(h) {
			needles.push(h);
		});
	// beginning chapter		
	} else if (start && !end) {
		_(haystack).forEach(function(h) {
			if (start <= h.verse) { needles.push(h); }
		});
	// ending chapter
	} else if (!start && end) {
		_(haystack).forEach(function(h) {
			if (end >= h.verse) { needles.push(h); }
		});
	// all inclusive chapter
	} else {
		_(haystack).forEach(function(h) {
			if ((start <= h.verse) && (end >= h.verse)) { needles.push(h); }
		});
	
	}

	return needles;

}

module.exports = function (arr, source) {
		var result = [];

		_(arr).forEach(function(set) {
		//shorthand for start and end
		var s = set.start;
		var e = set.end;
		// A range was given for this set
		if (set.end) {
			// detect whether the range spans chapters
			// // {"start":{"book":1,"chapter":1,"verse":1},"end":{"chapter":2,"verse":1}}
			if (_.has(set.end, 'chapter')) {
				// The range given spans chapter boundaries
				_.range(s.chapter, (e.chapter + 1)).forEach(function(c){
					var haystack = _.filter(source, { 'book': s.book, 'chapter': c });
					// reset start and end for every iteration
					var startVerse = null;
					var endVerse = null;
					// beginning chapter so honor s.verse
					if (c === s.chapter) {
						startVerse = s.verse;	
					//end chapter so honor e.verse			
					} else if (c === e.chapter) {
						endVerse = e.verse;
					}
					res = filterChapter(startVerse, endVerse, haystack);
					result = result.concat(res);
				});
			
			// if set set.end has a chapter, else
			} else {
				// just verse range, same chapter
				// {"start":{"book":1,"chapter":1,"verse":1},"end":{"verse":2}}
				var haystack = _.filter(source, { 'book': s.book, 'chapter': s.chapter });
				result = filterChapter(s.verse, e.verse, haystack);

			}
		// if set.end, else
		} else {
			// Can still be a range if start has no verse
			// {start:{"book":1,"chapter":1}}
			if (!s.verse) {
				var haystack = _.filter(source, { 'book': s.book, 'chapter': s.chapter });
				result = filterChapter(null, null, haystack);  
			// Book Chapter Verse
			// {start:{"book":1,"chapter":1,"verse":1}}   
			} else {
				result.push(_.find(source, s));
			}

		}

	});
	return result;
};


