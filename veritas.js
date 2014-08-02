#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var sword = require('sword');
var _ = require('lodash');

var config = {};
config.lang = 'en';
config.dev = true;

var source = require('./data/' + config.lang + '/esvflat.json');

program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-t, --translation [abbr]', 'Specify which Bible source to use')
    .option('-m, --manuscript', 'Manuscript style output (nothing but the text)')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {

	var query = '';
	program.args.forEach(function(a) {
		query = query.concat(a + ' ');
	});
	var result = [];

	_(sword(query)).forEach(function(set) {
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
				result = _.find(source, s);
			}

		}
	});

	if (config.dev) {
		console.log(chalk.red.bold('Translation: ') + program.translation); 
	    console.log(chalk.red.bold('String: ') + query);   	
	    console.log(chalk.red.bold('Verse(s) Interpreted: ') + JSON.stringify(sword(query)));   		
	    //console.log(chalk.red.bold('Returned Value: ') + JSON.stringify(result));  
	}

	//Heading needs meta data to display, Book names mostly
	//onsole.log(chalk.bgCyan.red.bold(query));
	_(result).forEach(function(r){
		process.stdout.write(chalk.red(' [') + chalk.yellow.bold(r.chapter + ':' + r.verse) + chalk.red('] ') + r.text);
	})


    process.exit(0);
}