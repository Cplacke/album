import getColors from 'npm:get-image-colors';
import { closest } from 'npm:color-2-name';
import { themeEditor } from '../src/theme/theme.ts'


export const getColorPalletHtml = async (imgUrl: string) => {
    const colors: any[] = await getColors(imgUrl, { count: 12 });
    const themeCount = Array.from({ length: 21 }, (_, index) => index);
    const html = `
        <!DOCTYPE html>
        <html style="overflow: scroll">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="stylesheet" href="/assets/style/bootstrap.css">
                <link rel="stylesheet" href="/assets/style/main.css">
                <link rel="stylesheet" href="/assets/style/fonts.css">
                <link rel="stylesheet" href="/assets/style/vs-code.css">
                <link rel="stylesheet" href="/assets/style/vs-code-theme.css">
                <style id="dynamicStyle"></style>
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
                <script> 
                    const COLORS = ${
                        JSON.stringify(
                            colors.map((c) => ({
                                hex: c.hex(),
                                name: closest(c.hex()).name,
                            }))
                        )
                    };
                </script>
                <script src="/assets/script/theme-controller.js"></script>
            </head>
            <header class="mb-4">
                <h1>Visual Studio Records</h1>
            </header>
            <body class="pb-5">
                <img src="${imgUrl}" style="display: block; margin: 0 auto 25px auto; height: 200px">
                <div style="display: flex; flex: flex-wrap; align-items: center;">
                    <div style="width: 50%">
                        ${ themeEditor(colors) }
                    </div>
                    <div style="width: 50%;">
                        ${
                            await Deno.readTextFile('./assets/code.html')
                        }
                    </div>
                </div>
            </body>
        </html>
    `
    return html;
}

export const test = async () => {
    const url = 'https://static.spin.com/files/2003/07/BlackSabbath-1578347766.jpg';
    const html = await getColorPalletHtml(url);
    const encoder = new TextEncoder();
    await Deno.writeFile('./sample.html', encoder.encode(html));
    console.info('./sample.html test file written');
}