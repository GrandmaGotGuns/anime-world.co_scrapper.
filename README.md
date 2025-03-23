## Requirements 
- Node
- Puppeteer


## How To Run [Windows] 
if you are using Linux, you can figure this out. 

1. Install Node on Windows
2. Install Pupeteer from Node
3. Launch edge from in debug mode
   - /location of edge installation/msedge.exe --remote-debugging-port 9222
4. run Index.js with cmd>node index.js


## Edit the Script for what you want
### The Goal is to get the direct links for the content.

Go the Anime-world.co website and get the link. for eg : https://anime-world.co/episode/shinchan-6x18/

here the Season is 6 and the first episode is 1 and the last is 52 [This is important] Check the website for first and last episode Number. 

## In the Script 
```
...
  // Base URL for generating initial links
  const baseUrl = 'https://anime-world.co/episode/shinchan-';
  const start = 1; // Starting episode number FILL THIS 
  const end = 47;  // Ending episode number FILL THIS
  //put season in the line below for eg Shinchan Season 8  so there is 8 after {baseURL}
  const links = Array.from({ length: end - start + 1 }, (_, i) => `${baseUrl}6x${start + i}`); HERE 6 IS THE SEASON. 
...

```

## After you run the script
You'll get a bunch of links, in this case 52, copy them to for eg JDownloader and start download, 
Also if you don't have an plan, mega doesn't allow more than 3 gigs of download, so use a VPN, if JDownloader says somwthing about Limit.
