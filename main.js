const postcss = require("postcss");
const colorsOnly = require('postcss-colors-only');
const safe   = require('postcss-safe-parser');

class ColorStyle {
    constructor() {
        this.remainOnlyColors();
    }

    getDOMNodesStyles() {
        let all = [...document.getElementsByTagName("*")];
        let result = [];
        all.forEach((item, i) => {
            let styleItem = `${item.nodeName.toLowerCase()} ${JSON.stringify(window.getComputedStyle(item))}`
                    .replace(/,/g, ";")
                    .replace(/\"/g, "")
                    .replace(/all:;/g, "")
                    .replace(/\d+\:(.*?)\;/gi,"");
            result.push(styleItem);
        });
        console.log(result);
        return result;
    }
    remainOnlyColors() {
        let styles = this.getDOMNodesStyles();
        let promises = [];

        styles.forEach((item, i) => {
            if(/(head|script|html|link|meta|title)/gmi.test(item)) return;
            promises.push(postcss()
                .use(colorsOnly())
                .process(`${item}`, {parser: safe})
                .then(function(res) {
                    return res.css;
                }));
        });

        Promise.all(promises).then((result) => {
            console.log(result);
        });
    }
}
const colorStyle = new ColorStyle({});
