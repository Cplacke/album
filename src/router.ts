import { getProducts } from './product.ts';
import { spotify } from '../service/spotfiy.ts';
import { getColorPalletHtml } from '../service/colors.ts';

import { getHeaders } from './util.ts'

export const router = async (req: Request) => {

    const url = new URL(req.url);
    let body: string | ReadableStream<Uint8Array> = 'Route Not Found';
    let statusCode: number = 404;
    
    // homepage
    if (url.pathname === '/') {
        url.pathname = '/index.html';
        const page = await Deno.readTextFile(`.${url.pathname}`);
        // hydrate the dom with values
        body = page.replace('{products}', await getProducts(
            url.searchParams.get('search') || 'Black Sabbath'
        ));
        statusCode = 200;
    } else

    // serve asset files 
    if (url.pathname.includes('assets')) {
        const file = await Deno.open(`.${url.pathname}`, { read: true });
        body = file.readable;
        statusCode = 200;
    } else 

    // colorizer page for cover
    if (url.pathname.includes('colorize')) {
        const albumId = /\/colorize\/(.*)/.exec(url.pathname)
        if (!albumId || !albumId[1]) {
            body = '/colorize/${ALBUM_ID}, ALBUM_ID is requried';
            statusCode = 400;
        } else {
            url.pathname += '.html';
            const album = await spotify.getAlbumById({ id: albumId[1] });
            body = await getColorPalletHtml(album.images[0].url);
            statusCode = 200;
        }
    }

    return new Response( body,
        { 
            status: statusCode, 
            headers: getHeaders(url) 
        }
    );

}