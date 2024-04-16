
const classes = [
    'mtk12', 'mtk6', 'mtk10', 'mtk19', 'mtk16', 'mtk7', 'mtk18', 'mtk3',
]

const shuffleColors = () => {
    const dynamicStyle = classes.map((themeClass, i) => {
        const randomIndex = Math.abs(Math.round(Math.random()*COLORS.length-1));
        const color = COLORS[randomIndex].hex

        document.querySelector(`#select-${themeClass}`).style.backgroundColor = color;
        return `.${themeClass} { color: ${color} }`;
    })

    document.querySelector('#dynamicStyle').innerHTML = dynamicStyle.join('\n');
}

const updateStyle = (themeClass, hex) => {
    document.querySelector(`#select-${themeClass}`).style.backgroundColor = hex;
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

window.onload = () => {
    console.info('loaded theme controller', COLORS);    

    shuffleColors();
}