
const themeElements = [
    { type: 'Strings', color: '', class: 'mtk12' },
    { type: 'Types', color: '', class: '______types' }, // NEED TO FIND CLASS AND ADD TO DEMO
    { type: 'Keywords', color: '', class: 'mtk6' },
    { type: 'Variables', color: '', class: 'mtk10' },
    { type: 'Declerations', color: '', class: 'mtk19' },
    { type: 'Functions', color: '', class: 'mtk16' },
    { type: 'Numbers', color: '', class: 'mtk7' },
    { type: 'if/else/return', color: '', class: 'mtk18' },
    { type: 'Comments', color: '', class: '______comments' }, // NEED TO FIND CLASS AND ADD TO DEMO
    { type: 'Properties', color: '', class: '______properties' }, // NEED TO FIND CLASS AND ADD TO DEMO
    { type: 'Operators', color: '', class: 'mtk3' },
    // { type: 'Readonly Variables', class: '', color: '' },
    // { type: 'Namespace', class: '', color: '' },
    // { type: 'Classes', class: '', color: '' },
    // { type: 'Interfaces', class: '', color: '' },
    // { type: 'Parameters', class: '', color: '' },
];

const shuffleColors = () => {
    const dynamicStyle = themeElements.map((ele, i) => {
        const randomIndex = Math.abs(Math.round(Math.random() * COLORS.length - 1));
        const color = COLORS[randomIndex].hex;

        document.querySelector(`#select-${ele.class}`).style.backgroundColor = color;
        document.querySelector(`#select-${ele.class}`).style.color = COLORS[randomIndex].isDark ? '#fff' : '#000';
        return `.${ele.class} { color: ${color} }`;
    })

    document.querySelector('#dynamicStyle').innerHTML = dynamicStyle.join('\n');
}

const updateStyle = (themeClass, hex) => {
    const selectedColor = COLORS.find((c) => (c.hex === hex))
    document.querySelector(`#select-${themeClass}`).style.backgroundColor = hex;
    document.querySelector(`#select-${themeClass}`).style.color = selectedColor.isDark ? '#fff' : '#000';

    const currentStyle = document.querySelector('#dynamicStyle').innerHTML;
    if (!currentStyle.includes(`.${themeClass} {`)) {
        return;
    }
    const newStyle = currentStyle.replace(
        RegExp(`\.${themeClass} (\{.*?\})`),
        `.${themeClass} { color: ${hex} }`
    );
    document.querySelector('#dynamicStyle').innerHTML = newStyle;
}

const rgbToHex = (rgb) => {
    const componentToHex = (c) => {
        const hex = Number(c).toString(16)
        return hex.length == 1 ? "0" + hex : hex;
    }
    const values = /rgb\((\d+), ?(\d+), ?(\d+)\)/.exec(rgb)
    return "#" + componentToHex(values[1]) + componentToHex(values[2]) + componentToHex(values[3]);
}

const getThemeClassColor = (type) => {
    const match = themeElements.find((e) => (e.type == type));
    if (!match) {
        console.error(type, 'Not Found!');
        return
    }
    return rgbToHex(document.querySelector(`#select-${match.class}`).style.backgroundColor);
}

const exportTheme = () => {
    const selections = {
        'Strings': getThemeClassColor('Strings'),
        'Types': getThemeClassColor('Types'),
        'Keywords': getThemeClassColor('Keywords'),
        'Variables': getThemeClassColor('Variables'),
        'Declerations': getThemeClassColor('Declerations'),
        'Functions': getThemeClassColor('Functions'),
        'Numbers': getThemeClassColor('Numbers'),
        'if/else/return': getThemeClassColor('if/else/return'),
        'Comments': getThemeClassColor('Comments'),
        'Properties': getThemeClassColor('Properties'),
        'Operators': getThemeClassColor('Operators'),
    }

    const baseThemeSetting = {
        "editor.tokenColorCustomizations": {
            "comments": selections.Comments,
            "strings": selections.Strings,
            "types": selections.Types,
            "keywords": selections.Keywords,
            "functions": selections.Functions,
            "numbers": selections.Numbers,
            "textMateRules": [
                {
                    "name": "keyword.operators",
                    "scope": [
                        "keyword.operator",
                        "storage.type.function.arrow.ts",
                        "storage.type.function.arrow.js",
                        "storage.modifier.async.ts",
                        "storage.modifier.async.js",
                        "meta.arrow.ts",
                        "meta.arrow.js",
                        "meta.embedded.line.ts",
                        "meta.embedded.line.js",
                        "keyword.operator.new.ts",
                        "keyword.operator.new.js",
                        "entity.other.attribute-name.pseudo-class.css",
                        "entity.other.attribute-name.pseudo-element.css",
                        "punctuation.definition.template-expression.begin.ts",
                        "punctuation.definition.template-expression.begin.js",
                        "punctuation.definition.template-expression.end.ts",
                        "punctuation.definition.template-expression.end.js",
                        "support.variable",
                        "keyword.other.unit",
                    ],
                    "settings": {
                        "foreground": selections.Operators
                    }
                },
                {
                    "name": "meta.css",
                    "scope": [
                        "support.type.property-name.media.css"
                    ],
                    "settings": {
                        "foreground": selections.Types,
                    }
                },
                {
                    "name": "meta.definition.variable",
                    "scope": [
                        "meta.definition.variable.ts",
                        "meta.definition.variable.js",
                        "variable.other.constant.ts",
                        "variable.other.constant.js",
                        "variable.other.constant.object.ts",
                        "variable.other.constant.object.js",
                        "variable.other.constant.property.ts",
                        "variable.other.constant.property.js",
                        "variable.other.readwrite.alias.ts",
                        "variable.other.readwrite.alias.js",
                        "variable.other.object.property.ts",
                        "variable.other.object.property.js",
                        "support.constant.font-name.css",
                        "constant.other.color.rgb-value.hex.css",
                        "support.constant.property-value.css",
                        "string.quoted.single.css",
                        "string.quoted.double.css",
                        "support.constant.color.w3c-extended-color-name.css",
                        "variable.argument.css",
                        "support.type.vendored.property-name.css",
                    ],
                    "settings": {
                        "foreground": selections.Declerations,
                    }
                },
                {
                    "name": "variable.other.object",
                    "scope": [
                        "variable.other.object.ts",
                        "variable.other.object.js",
                        "variable.other.property.ts",
                        "variable.other.property.js",
                        "variable.other.readwrite.ts",
                        "variable.other.readwrite.js",
                        "support.variable.property.ts",
                        "support.variable.property.js",
                        "variable.parameter",
                        "entity.other.attribute-name",
                        "support.type.property-name.css",
                        "support.type.property-name.json.comments"
                    ],
                    "settings": {
                        "foreground": selections.Variables,
                    }
                },
                {
                    "name": "keyword.control",
                    "scope": [
                        "keyword.control",
                        "meta.selector.css",
                        "entity.other.attribute-name.class.css",
                        "entity.name.tag.css",
                        "entity.name.tag.html",
                    ],
                    "settings": {
                        "foreground": selections["if/else/return"]
                    }
                }
            ]
        },
        "editor.semanticTokenColorCustomizations": {
            "enabled": true,
            "rules": {
                "namespace": selections.Types,
                "variable.declaration": selections.Declerations,
                "function": selections.Functions,
            }
        }
    };

    console.info('THEME', baseThemeSetting);
    const jsonContent = JSON.stringify(baseThemeSetting, null, 2);

    document.querySelector('#themeModal .modal-body textarea').style.color =
        getThemeClassColor('Strings');
    document.querySelector('#themeModal .modal-body textarea').value =
        jsonContent.slice(1, jsonContent.length - 1);
}

window.onload = () => {
    console.info('loaded theme controller', COLORS);

    shuffleColors();
}