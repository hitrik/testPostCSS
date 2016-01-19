import { postCss } from "postcss";
import { colorsOnly } from 'postcss-colors-only';

class ColorStyle {
    constructor() {
        this.remainOnlyColors();
    }

    getDOMNodesStyles() {
        let all = [...document.getElementsByTagName("*")];
        let result = [];
        all.forEach((item) => {
            let styleItem = item.nodeName.toLowerCase() + " " + window.getComputedStyle(item);
            result.push(styleItem);
        });
        return result;
    }
    remainOnlyColors() {
        let styles = this.getDOMNodesStyles();
        let colors = [];

        styles.forEach((item) => {
            let style = postcss()
                .use(colorsOnly())
                .process(item)
                .css;
            colors.push(style);
        });
        console.log(colors);
    }
}

const colorStyle = new ColorStyle({});
