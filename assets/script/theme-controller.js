
const classes = [
    'mtk12', 'mtk6', 'mtk10', 'mtk19', 'mtk16', 'mtk7', 'mtk18', 'mtk3',
]

const shuffleColors = () => {
    const dynamicStyle = classes.map((themeClass, i) => {
        const randomIndex = Math.abs(Math.round(Math.random()*COLORS.length-1));
        const color = COLORS[randomIndex].hex;

        document.querySelector(`#select-${themeClass}`).style.backgroundColor = color;
        document.querySelector(`#select-${themeClass}`).style.color = COLORS[randomIndex].isDark ? '#fff' : '#000';
        return `.${themeClass} { color: ${color} }`;
    })

    document.querySelector('#dynamicStyle').innerHTML = dynamicStyle.join('\n');
}

const updateStyle = (themeClass, hex) => {
    const selectedColor = COLORS.find((c) => (c.hex === hex))
    document.querySelector(`#select-${themeClass}`).style.backgroundColor = hex;
    document.querySelector(`#select-${themeClass}`).style.color = selectedColor.isDark ? '#fff' : '#000';

    const currentStyle = document.querySelector('#dynamicStyle').innerHTML;
    if (!currentStyle.includes(`.${themeClass} {`)){
        return;
    }
    const newStyle = currentStyle.replace(
        RegExp(`\.${themeClass} (\{.*?\})`),
        `.${themeClass} { color: ${hex} }`
    ); 
    document.querySelector('#dynamicStyle').innerHTML = newStyle;
} 

const exportTheme = () => {
    const baseThemeSetting = {
        "editor.tokenColorCustomizations": {
            "comments": document.querySelector(`#select-______comments`).style.backgroundColor,
            "strings": document.querySelector(`#select-mtk12`).style.backgroundColor,
            "types": document.querySelector(`#select-______types`).style.backgroundColor,
            "keywords": document.querySelector(`#select-mtk6`).style.backgroundColor,
            "variables": document.querySelector(`#select-mtk10`).style.backgroundColor,
            "functions": document.querySelector(`#select-mtk16`).style.backgroundColor,
            "numbers": document.querySelector(`#select-mtk7`).style.backgroundColor,
            "textMateRules": [
                {
                    "name": "keyword.operator",
                    "scope": [
                        "keyword.operator",
                    ],
                    "settings": {
                        "foreground": document.querySelector(`#select-mtk3`).style.backgroundColor
                    }
                },{
                    "name": "keyword.control",
                    "scope": [
                        "keyword.control",
                    ],
                    "settings": {
                        "foreground": document.querySelector(`#select-mtk18`).style.backgroundColor
                    }
                }
            ]
        }
    };

    console.info('THEME', baseThemeSetting);
}

window.onload = () => {
    console.info('loaded theme controller', COLORS);    

    shuffleColors();
}