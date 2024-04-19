import { closest, isLight } from 'npm:color-2-name';

// .mtk2                ???
// .mtk4                ???
// .mtk5                ???
// .mtk8                ???
// .mtk9                ???
// .mtk11               ???
// .mtk13               ???
// .mtk14               ???
// .mtk15               ???
// .mtk17               ???
// .mtk20               ???
// .mtk21               ???

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
]

export const themeEditor = (colors: any[]) => {
    return `
        <div class="mb-2">
            <div class="d-flex w-75 mx-auto">
                <button class="btn btn-secondary d-block my-2 w-100 me-2" onclick="shuffleColors()">
                    Randomize Colors
                </button>
                <button class="btn btn-secondary d-block w-50 my-2" onclick="exportTheme()" data-toggle="modal" data-target="#themeModal">
                    Export Theme
                </button>
            </div>
            ${
                themeElements.map((ele, i) => (`
                    <div class="dropdown">
                        <button id="select-${ele.class}" 
                            style="background-color: ${colors[i].hex()}; border: none;"
                            class="btn btn-secondary dropdown-toggle d-block my-2 w-75 mx-auto" 
                            type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"
                        >
                            ${ele.type}
                        </button>
                        <div class="dropdown-menu w-75 p-0" aria-labelledby="select-${ele.type}">
                            ${
                                colors.map((color) => (
                                    `<a value="${color.hex()}" href="#" class="dropdown-item" 
                                        onclick="updateStyle('${ele.class}', '${color.hex()}')"
                                        style="background-color: ${color.hex()}; color: ${isLight(color.hex()) ? '#000' : '#fff'};">
                                        ${closest(color.hex()).name}
                                    </a>`
                                )).join('')
                            }
                        </div>
                    </div>
                `)).join('')
            }
        </div>
    `
}