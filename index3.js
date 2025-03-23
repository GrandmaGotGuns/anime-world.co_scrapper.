const puppeteer = require('puppeteer');
const { exec } = require('child_process');

(async () => {
  const browserURL = 'http://127.0.0.1:9222'; // Connect to existing browser instance
  const browser = await puppeteer.connect({ browserURL });

  // Base URL for generating initial links
  const baseUrl = 'https://anime-world.co/episode/shinchan-';
  const start = 1; // Starting episode number
  const end = 47;  // Ending episode number
  //put season in the line below for eg Shinchan Season 8  so there is 8 after {baseURL}
  const links = Array.from({ length: end - start + 1 }, (_, i) => `${baseUrl}8x${start + i}`);

  for (const link of links) {
    // Open a new tab for each link
    const page = await browser.newPage();
    try {
      // Step 1: Navigate to the link
      await page.goto(link);

      // Step 2: Click the button to reveal the download link
      await page.waitForSelector('.aa-mdl.tertiary-bg.mar.on[data-mdl="mdl-download"]', { visible: true });
      await page.evaluate((selector) => {
        document.querySelector(selector).scrollIntoView();
      }, '.aa-mdl.tertiary-bg.mar.on[data-mdl="mdl-download"]');
      await page.click('.aa-mdl.tertiary-bg.mar.on[data-mdl="mdl-download"]');

      // Step 3: Wait for the newly revealed link to appear
      await page.waitForSelector('a[rel="nofollow"][target="_blank"]', { visible: true });

      // Step 4: Extract the href link
      const hrefLink = await page.evaluate(() => {
        const element = document.querySelector('a[rel="nofollow"][target="_blank"]');
        return element ? element.href : null;
      });

      if (hrefLink) {
        // Step 5: Get the final redirected URL
        await page.goto(hrefLink);
        const finalUrl = page.url();
        console.log(`${finalUrl}`);

        // Step 6: Run the `gg.exe` file with the final link as a parameter
       } else {
        console.error('Download link not found after clicking!');
      }
    } catch (error) {
      console.error(`An error occurred on page ${link}:`, error.message);
    } finally {
      await page.close(); // Close the tab after interactions
    }
  }
  // Copy the link from CMD prompt and paste them in notepad. 

  await browser.disconnect(); // Disconnect from the browser
})();
