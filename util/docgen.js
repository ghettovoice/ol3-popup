const ESDoc = require('esdoc');
const _ = require('lodash');
const taffy = require('taffydb').taffy;
const fs = require('fs');
const path = require('path');
const util = require('util');
const config = require('../esdoc.json');

const kinds = [
    'typedef',
    'variable',
    'class',
    'constructor',
    'member',
    'set',
    'get',
    'method'
];
const source = path.join(__dirname, './README.md');
const dest = path.join(__dirname, '../README.md');

ESDoc.generate(config, function (results) {
    const data = taffy(results.filter(res => _.includes(kinds, res.kind) &&
                                             (res.access == null || res.access === 'public') && !res.undocument));
    const values = {};

    // typedef
    values.typedef = data({ kind: ['typedef'] }).map(doc => {
        doc.description = toOneLine(doc.description);
        doc.properties = doc.properties.map(prop => {
            prop.description = toOneLine(prop.description);

            return prop;
        });

        return doc;
    });

    // classes
    values.classes = data({ kind: ['class'] }).map(doc => {
        doc.constructor = data({ kind: ['constructor'], memberof: doc.longname }).map(doc => doc)[0];
        doc.members = data({ kind: ['member', 'set', 'get'], memberof: doc.longname }).map(doc => doc);
        doc.methods = data({ kind: ['method'], memberof: doc.longname }).map(doc => doc);

        return doc;
    });

//    console.log(util.inspect(values.classes, { depth: null }));
    try {
        fs.readFile(source, (err, template) => {
            if (err) {
                throw err;
            }

            const output = _.template(template)(values);

            fs.writeFile(dest, output, (err) => {
                if (err) {
                    throw err;
                }

                console.log("Done");
            });
        });
    } catch (err) {
        console.error(err.stack);
    }
});

function toOneLine(string) {
    return string.replace(/([\r\n\t\s])/gm, ' ')
                 .replace(/(\s{2,})/g, ' ');
}
