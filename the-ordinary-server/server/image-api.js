import fetch from 'node-fetch';
import cheerio from 'cheerio';

async function scrapeImagesFromGoogle(query) {
    const response = await
    fetch(`https://www.google.com/search?client=ms-android-transsion&q=${encodeURIComponent(query)}&tbm=isch`);
    const html = await response.text();
    const $ = cheerio.load(html);
    const imageUrls = [];

    $('img').each((index, element) => {
      const imageUrl = $(element).attr('src');
      if (imageUrl) {
        imageUrls.push(imageUrl);
      }
    });

    return imageUrls;
}

export default scrapeImagesFromGoogle;
