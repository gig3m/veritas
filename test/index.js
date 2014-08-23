var test = require('tape');
var sword = require('sword');
var veritas = require('../src/veritas');
var source = require('../data/kjv.json');

// Mocks
// single verse
var genc1v1 = require('./mock/gen-c1v1.json');
// single chapter
var genc1 = require('./mock/gen-c1.json');
// verse range inside chapter
var genc1v1c1v2 = require('./mock/gen-c1v1-c1v2.json');
// verse range spans chapters
var genc1v1c2v1 = require('./mock/gen-c1v1-c2v1.json');
// range spans chapters, no verses
var genc1c2 = require('./mock/gen-c1-c2.json');

var verse = sword('Gen 1:1');

test('sword returns expected values', function(t) {
	t.deepEqual(
		sword('Gen 1:1'), 
		[{"start":{"book":1,"chapter":1,"verse":1}}]
	);
	t.end();
});
test('veritas returns a single verse', function (t) {
	t.deepEqual(veritas([{"start":{"book":1,"chapter":1,"verse":1}}], source), genc1v1);
	t.end();
});
test('veritas returns a single chapter', function (t) {
	t.deepEqual(veritas([{"start":{"book":1,"chapter":1}}], source), genc1);
	t.end();
});
test('veritas returns a range inside a chapter', function (t) {
	t.deepEqual(veritas([{"start":{"book":1,"chapter":1,"verse":1},"end":{"verse":2}}], source), genc1v1c1v2);
	t.end();
});
test('veritas returns a range spanning chapters with verses', function (t) {
	t.deepEqual(veritas([{"start":{"book":1,"chapter":1,"verse":1},"end":{"chapter":2,"verse":1}}], source), genc1v1c2v1);
	t.end();
});
test('veritas returns a range spanning chapters with no verses', function (t) {
	t.deepEqual(veritas([{"start":{"book":1,"chapter":1},"end":{"chapter":2}}], source), genc1c2);
	t.end();
});
// test('veritas errors no book', function (t) {
// 	t.deepEqual(veritas([{"start":{"book":1}}], source), '');
// 	t.end();
// });
// test('veritas errors a single book', function (t) {
// 	t.deepEqual(veritas([{"start":{"book":1}}], source), '');
// 	t.end();
// });