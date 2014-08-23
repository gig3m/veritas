var _ = require('lodash');
'use strict'

var count = 0;

function filterChapter(start, end, haystack) {
	needles = [];
	if (!start && !end) {
		_(haystack).forEach(function(h) {
			needles.push(h);
		});		
	} else if (start && !end) {
		_(haystack).forEach(function(h) {
			if (start <= h.verse) { needles.push(h); }
		});
	} else if (!start && end) {
		_(haystack).forEach(function(h) {
			if (end >= h.verse) { needles.push(h); }
		});
	} else {
		_(haystack).forEach(function(h) {
			if ((start >= h.verse) && (end <= h.verse)) { needles.push(h); }
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
		if (set.end) {
			//A range was given for this set
			//detect whether the range spans chapters
			if (_.has(set.end, 'chapter')) {
				//The range given spans chapter boundaries
				_.range(s.chapter, (e.chapter + 1)).forEach(function(c){
					var haystack = _.filter(source, { 'book': s.book, 'chapter': c });
					var startVerse = null;
					var endVerse = null;
					// on the start chapter
					if (c === s.chapter) {
						startVerse = s.verse;
						// filterChapter(s.verse, null, haystack, function(res) {
						// 	result.concat(res);
						// 	count+=1;
						// });					
					} else if (c === e.chapter) {
						endVerse = e.verse;
						// filterChapter(null, e.verse, haystack, function(res) {
						// 	result.concat(res);
						// 	count+=1;
						// });
					} else {
						// filterChapter(null, null, haystack, function(res) {
						// 	result.concat(res);
						// 	count+=1;
						// });             
					}
					res = filterChapter(startVerse, endVerse, haystack);
					result = result.concat(res);
					// console.log('result', result);
				});
				
			} else {
				//The range given is inside a single chapter
				_.range(s.verse, (e.verse + 1)).forEach(function(v){ 
					result.push(_.find(source, { 'book': s.book, 'chapter': s.chapter, 'verse': v })); 
				});
				//console.log(_.range(set.start.verse, (set.end.verse + 1)));
			}
		} else {
			//No range was given, single verse
			if (!s.verse) {
				var haystack = _.filter(source, { 'book': s.book, 'chapter': s.chapter });
				_(haystack).forEach(function(h) {
					result.push(h);
				});     
			} else {
				result.push(_.find(source, s));
			}

		}

	});
	return result;
};


