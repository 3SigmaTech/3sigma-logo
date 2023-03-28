#! /usr/bin/env node
// -*- js -*-

import * as fs from 'fs';
import glob from 'glob';
import sass from 'node-sass';

const BUILD_TREE = {
    manStyles: {
        content: './src/man/styles.scss',
        find: '<style id="3sigma-logo-man-style"></style>',
        replace: '<style id="3sigma-logo-man-style">$x</style>',
    },
    manDefs: {
        content: './src/man/defs.xml',
        find: '<defs id="3sigma-logo-man-defs"></defs>',
        replace: '$x',
    },
    src: './src/**/*.src',
    dest: function (srcflnm) {
        if (srcflnm[0] != '.') {
            if (srcflnm[0] == '/') {
                srcflnm = '.' + srcflnm;
            } else {
                srcflnm = './' + srcflnm;
            }
        }
        return srcflnm.replace(/\/?src\//g, "/").replace(/\.src/g, ".svg");
    }
};

(function () {
    glob(BUILD_TREE.src).then((files) => {
        for (const flnm of files) {
            let src = fs.readFileSync(flnm, 'utf8');
            src = replaceStyle(src, BUILD_TREE.manStyles);
            src = replaceDefs(src, BUILD_TREE.manDefs);

            fs.writeFile(BUILD_TREE.dest(flnm), src, 'utf8', function (err) {
                if (err) return console.log(err);
            });
        }
    });
})();

let file_cache = {};
function getFile(flnm, postprocess) {
    if (!file_cache[flnm]) {
        file_cache[flnm] = postprocess(flnm, fs.readFileSync(flnm, 'utf8'));
    }
    return file_cache[flnm];
}

function postprocessStyleFile(flnm, fileContents) {
    let style = sass.renderSync({
        //data: fileContents.replace(/\n/g,' '),
        // causes double fs read but low cost
        file: flnm,
        indentedSyntax: true,
        outputStyle: "expanded"
    });

    style = "\n" + style.css.toString() + "\n";
    style = style.replace(/\n/g, "\n        ");
    return style;
}

function replaceStyle(src, styles) {
    let content = getFile(styles.content, postprocessStyleFile);

    let replace = styles.replace.replace(/\$x/g, content);
    replace = replace.replace("    </style>", "</style>");

    return src.replace(styles.find, replace);
}


function postprocessDefsFile(flnm, fileContents) {
    return fileContents.replace(/\n/g, "\n    ");
}

function replaceDefs(src, defs) {
    let content = getFile(defs.content, postprocessDefsFile);

    let replace = defs.replace.replace(/\$x/g, content);
    //replace = replace.replace("    </style>", "</style>");

    return src.replace(defs.find, replace);
}
