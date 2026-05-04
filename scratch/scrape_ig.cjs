const https = require('https');

https.get('https://www.picuki.com/profile/nn__clicks', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    // Basic regex to find image URLs and captions
    const items = [];
    const itemRegex = /<li class="box-photos">([\s\S]*?)<\/li>/g;
    const imgRegex = /<img.*?src="(https:\/\/.*?)".*?alt="(.*?)"/i;
    
    let match;
    while ((match = itemRegex.exec(data)) !== null && items.length < 6) {
      const itemHtml = match[1];
      const imgMatch = imgRegex.exec(itemHtml);
      if (imgMatch) {
        items.push({
          url: imgMatch[1],
          caption: imgMatch[2].trim()
        });
      }
    }
    
    console.log(JSON.stringify(items, null, 2));
  });
}).on('error', (err) => {
  console.log("Error: " + err.message);
});
