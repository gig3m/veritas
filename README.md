Veritas.js
=======


Simple Bible passage tool.  Takes a keyword string and outputs the text with styling options.  

Why
===
The greatest of all motivations drove me to this package:  I wanted it myself.  The output herein is usable but highly opinionated.  I wanted this tool for manuscript study which is based around a text-only approach.  Literal text-only as in no chapter or verse numbers, no editor added paragraphs or headings.  With that in mind I set off to create this tool so I could have raw output to drop in any editor, rich or otherwise.

Along the way I came across some interesting tools and fancied the default output up a bit.  Without any command line arguments Veritas will produce something like this:

![output example](https://copy.com/IZHIxU1Cgg8IKvoq)

It does not (currently) print any title or heading seeing as you just typed it in your command line.

Options
=====

Options currently (or soon to be) implemented:

```
-t			Specificy a translation to use (See below)
-m			Manuscript output style (no verse numbers)
-d			Debug mode (prints out interpreted keywords and options)
```

Translations
============

Veritas comes with the KJV because it is in the public domain.  The KJV is not my translation of choice so in building this tool I had the full intention of supporting any version that would work within the scope of the keyword interpretation.

The translation option takes a string that will be applied as a filename.  This file should be located in the data directory and contain an array of objects as is demonstrated below.

```json
[{"book":59,"chapter":1,"verse":23,"text":"For if anyone is a hearer of the word and not a doer, he is like a man who looks intently at his natural face in a mirror."},{"book":59,"chapter":1,"verse":24,"text":"For he looks at himself and goes away and at once forgets what he was like."},{"book":59,"chapter":1,"verse":25,"text":"But the one who looks into the perfect law, the law of liberty, and perseveres, being no hearer who forgets but a doer who acts, he will be blessed in his doing."}]
```

Acknowledgements
================

This project is build on top of the excellent [Sword](https://github.com/knownasilya/sword) parser.  Without it this project may never have reached any sort of usuable stage.