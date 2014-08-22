var sword = require('sword');
var _ = require('lodash');

var config = {};
config.lang = 'en';
config.dev = false;

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
          if (c === s.chapter) {
            if (!s.verse) {
              _(haystack).forEach(function(h) {
                result.push(h);
              });     
            } else {
              _(haystack).forEach(function(h) {
                h.verse >= s.verse && result.push(h);
              });
            }
            
          } else if (c === e.chapter) {
            if (!e.verse) {
              _(haystack).forEach(function(h) {
                result.push(h);
              });     
            } else {
              _(haystack).forEach(function(h) {
                h.verse <= e.verse && result.push(h);
              });
            }

          } else {
            _(haystack).forEach(function(h) {
              result.push(h);
            });                 

          }
        });
        
      } else {
        //The range given is inside a single chapter
        _.range(s.verse, (e.verse + 1)).forEach(function(v){ 
          result.push(_.find(source, { 'book': s.book, 'chapter': s.chapter, 'verse': v })) 
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
}


