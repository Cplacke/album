import { baseThemeSetting } from './base-theme.ts'
import { closest, isLight } from 'npm:color-2-name';

// .mtk1  = dots and semis
// .mtk2                ???
// .mtk3  = Operators
// .mtk4                ???
// .mtk5                ???
// .mtk6  = keywords
// .mtk7  = Numbers
// .mtk8                ???
// .mtk9                ???
// .mtk10 = Variable
// .mtk11               ???
// .mtk12 = Strings
// .mtk13               ???
// .mtk14               ???
// .mtk15               ???
// .mtk16 = method
// .mtk17               ???
// .mtk18 = if/else/return
// .mtk19 = declerations
// .mtk20               ???
// .mtk21               ???

const themeElements = [
    { type: 'Comments', class: '', color: '' },
    { type: 'Strings', class: '', color: '' },
    { type: 'Types', class: '', color: '' },
    { type: 'Keywords', class: '', color: '' },
    { type: 'Variables', class: '', color: '' },
    { type: 'Readonly Variables', class: '', color: '' },
    { type: 'Functions', class: '', color: '' },
    { type: 'Numbers', class: '', color: '' },
    { type: 'Namespace', class: '', color: '' },
    { type: 'Classes', class: '', color: '' },
    { type: 'Interfaces', class: '', color: '' },
    { type: 'Parameters', class: '', color: '' },
    { type: 'Properties', class: '', color: '' },
]


export const themeEditor = (colors: any[]) => {
    return `
        <div class="mb-2">
            ${
                themeElements.map((ele) => (`
                    <div class="dropdown d-inline">
                        <button id="select-${ele.type}" class="btn btn-secondary dropdown-toggle m-1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            ${ele.type}
                        </button>
                        <div class="dropdown-menu" aria-labelledby="select-${ele.type}">
                            ${
                                colors.map((color) => (
                                    `<a value="${color.hex()}" href="#" class="dropdown-item" style="background-color: ${color.hex()}; color: ${isLight(color.hex()) ? '#000' : '#fff'};">
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