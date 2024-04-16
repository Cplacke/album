
import { getAlbumsByArtist } from '../service/spotfiy.ts'

export const getProducts = async (search: string) => {

    const artist = await getAlbumsByArtist(search)
    let html = ''

    artist.albums.forEach((album) => {
        // console.info(album.id);
        html += `
        <div class="product">
            <img src="${album.images[0].url}" alt="Cover Art">
            <div class="product-info">
                <h2>${album.name}</h2>
                <p>
                    ${artist.name} 
                    <span> - ${album.releaseDate}</span>
                </p>
                <p>$19.99</p>
                <a id="${album.id}" href="/colorize/${album.id}" class="button">
                    <span>View</span>
                </a>
            </div>
        </div>
        `
    })

    return html;
}
