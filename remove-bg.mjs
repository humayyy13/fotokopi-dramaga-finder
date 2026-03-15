import { Jimp, intToRGBA, rgbaToInt } from 'jimp';

async function removeBackground() {
  try {
    const imagePath = 'src/assets/hero-illustration.png';
    console.log(`Reading image from ${imagePath}`);
    const image = await Jimp.read(imagePath);
    
    // Convert to RGBA just in case
    // image.rgba(true); // not needed or might not exist in v1
    
    const width = image.bitmap.width;
    const height = image.bitmap.height;
    
    // Get background color from top-left pixel
    const bgPixel = image.getPixelColor(0, 0);
    const bgRgba = intToRGBA(bgPixel);
    
    console.log(`Background color detected as: rgba(${bgRgba.r}, ${bgRgba.g}, ${bgRgba.b}, ${bgRgba.a})`);
    
    const tolerance = 25; // Adjusted tolerance

    const getRgba = (x, y) => intToRGBA(image.getPixelColor(x, y));
    const isBgColor = (c1, c2) => {
        return Math.abs(c1.r - c2.r) <= tolerance &&
               Math.abs(c1.g - c2.g) <= tolerance &&
               Math.abs(c1.b - c2.b) <= tolerance;
    };

    // We'll use a simple BFS queue for flood fill
    // Queue stores [x, y]
    const queue = [];
    const visited = new Uint8Array(width * height);
    
    // Add border pixels to start
    for (let x = 0; x < width; x++) {
        queue.push({x, y: 0});
        queue.push({x, y: height - 1});
    }
    for (let y = 0; y < height; y++) {
        queue.push({x: 0, y});
        queue.push({x: width - 1, y});
    }

    // Process queue
    let i = 0;
    while (i < queue.length) {
        const {x, y} = queue[i++];
        if (x < 0 || x >= width || y < 0 || y >= height) continue;
        
        const idx = y * width + x;
        if (visited[idx]) continue;
        visited[idx] = 1;
        
        const color = getRgba(x, y);
        
        if (color.a > 0 && isBgColor(color, bgRgba)) {
            // make transparent
            image.setPixelColor(rgbaToInt(0, 0, 0, 0), x, y);
            
            // add neighbors
            queue.push({x: x - 1, y});
            queue.push({x: x + 1, y});
            queue.push({x, y: y - 1});
            queue.push({x, y: y + 1});
        }
    }

    const outputPath = 'src/assets/hero-illustration-transparent.png';
    await image.write(outputPath);
    console.log(`Image background removed using flood fill and saved to ${outputPath}`);

  } catch (error) {
    console.error("Error removing background:", error);
  }
}

removeBackground();
