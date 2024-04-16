import { Client } from "https://github.com/hum/spotify/raw/main/mod.ts";
import * as base64 from "https://deno.land/std@0.207.0/encoding/base64.ts";

const authorize = async () => {
    const client_id = '9358e5fe51154cae8eca5bb68f4c2c82';
    const client_secret = 'a43fdffc816e4e77ae8207a8f446bb9b';

    const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Authorization': 'Basic ' + (base64.encodeBase64(`${client_id}:${client_secret}`)),
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials'
        }),
    };

    const response = await fetch(authOptions.url, {
        body: authOptions.body.toString(),
        headers: authOptions.headers,
        method: 'POST',
    })

    console.info('Spotfiy Auth', response.status, response.statusText);
    const token = await response.json()
    return token.access_token;
};

let TOKEN = await authorize();
export let spotify = new Client({ accessToken: `Bearer ${TOKEN}` });

Deno.cron("Spotfiy Auth Refresh", { minute: { every: (3600/60)-1 } }, async () => {
    TOKEN = await authorize();
    spotify = new Client({ accessToken: `Bearer ${TOKEN}` });
});


export const getAlbumsByArtist = async (artist: string) => {
    const _artist = await spotify.getArtist(artist);
    const _albums = await _artist.getAlbums({ market: 'US', limit: 50 });

    const albums = _albums
        .sort((a, b) => (a.releaseDate.localeCompare(b.releaseDate)))
        .map((a) => ({
                id: a.id,
                name: a.name,
                images: a.images,
                releaseDate: a.releaseDate,
        }))

    return {
        name: _artist.name,
        images: _artist.images,
        popularity: _artist.popularity,
        albums
    }
};

// console.info(
//     await getAlbumsByArtist('AlexSucks')
// );