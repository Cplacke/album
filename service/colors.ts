import getColors from 'npm:get-image-colors';
import { SimplifiedAlbum } from "https://github.com/hum/spotify/raw/main/mod.ts";
import { closest, isDark } from 'npm:color-2-name@1.3.0';
import { themeEditor } from '../src/theme/theme.ts'
import copy from 'npm:copy-to-clipboard';

export const getColorPalletHtml = async (album: SimplifiedAlbum) => {
    const imgUrl = album.images[0].url;
    const colors: any[] = await getColors(imgUrl, { count: 16 });
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
                                isDark: isDark(c.hex()),
                            }))
                        )
                    };
                    const copy = ${copy};
                </script>
                <script src="/assets/script/theme-controller.js"></script>
            </head>
            <header class="mb-4">
                <h1>Visual Studio Records</h1>
            </header>
            <body class="pb-5">
                <img src="${imgUrl}" style="display: block; margin: 0 auto 25px auto; height: 200px">
                <h3 class="text-center mb-4">${album.name} - ${album.artists[0].name}</h3>
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

                <div class="modal fade" id="themeModal" tabindex="-1" role="dialog" aria-labelledby="themeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" role="document">
                        <div class="modal-content bg-dark">
                            <div class="modal-header border-secondary">
                                <h3 class="modal-title text-center" id="themeModalLabel">Here is your Theme Configuration!</h3>
                            </div>
                            <div class="modal-body">
                                <h4> 
                                    Just paste the following code snippet into your 
                                    <code>'/.vscode/settings.json'</code> file in your 
                                    VS Code editor and Happy Hacking!
                                </h4>
                                <textarea id="themeTextArea" rows=30 class="w-100 text-mono"></textarea>
                            </div>
                            <div class="modal-footer border-0">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal"
                                    onclick="navigator.clipboard.writeText(
                                        document.querySelector('#themeTextArea').value
                                    )"
                                >Copy to Clipboard</button>
                            </div>
                        </div>
                    </div>
                </div>
            </body>
        </html>
    `
    return html;
}
