const postcss = require("postcss");
const colorsOnly = require('postcss-colors-only');
const safe = require('postcss-safe-parser');
const ccoff = require('postcss-camelcaseoff');

export class ColorStyle {
    constructor() {
        this.remainOnlyColors();
    }

    getDOMNodesStyles() {
        let all = [...document.getElementsByTagName("*")];
        let result = [];
        all.forEach((item) => {
            let styleItem = `${item.nodeName.toLowerCase()} ${JSON.stringify(window.getComputedStyle(item))}`
                .replace(/\"/g, "")
                .replace(/\d+\:(.*?)\,/gi,"")
                .replace(/[a-z](,)\b/g, ";")
                .replace(/all:;/g, "")
                .replace(/\}/, ";\}");
                result.push(styleItem);
        });
        return result;
    }
    remainOnlyColors() {
        let styles = this.getDOMNodesStyles();
        let promises = [];

        styles.forEach((item, i) => {

            if(/(head|script|html|link|meta|title)/gmi.test(item)) return;
            console.log();
            promises.push(postcss()
                .use(ccoff())
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
