#!/usr/bin/env node

var program = require('commander');
var chalk = require('chalk');
var sword = require('sword');

var dev = true;

program
    .version('0.0.1')
    .usage('[options] <keywords>')
    .option('-t, --translation [abbr]', 'Specify which Bible source to use')
    .option('-m, --manuscript', 'Manuscript style output (nothing but the text)')
    .parse(process.argv);

if(!program.args.length) {
    program.help();
} else {

	var result = '';
	program.args.forEach(function(a) {
		result = result.concat(a + ' ');
	});
	var temp = sword(result);

	if (dev == true) {
		console.log(chalk.red.bold('Translation: ') + program.translation); 
	    console.log(chalk.red.bold('String: ') + result);   	
	    console.log(chalk.red.bold('Verse(s) Interpreted: ') + JSON.stringify(temp));   		
	}

    process.exit(0);
}