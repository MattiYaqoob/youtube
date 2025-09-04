const express = require('express');
const { exec } = require('child_process');
const app = express();
const port = process.env.PORT || 3000;


const streamKey = "jfw6-tfhq-gdmy-7buf-ebtj";
const streamURL = `rtmp://a.rtmp.youtube.com/live2/${streamKey}`;


const ffmpegPath = `"C:\\Users\\matis\\Downloads\\ffmpeg-8.0-essentials_build\\bin\\ffmpeg.exe"`;


exec(`${ffmpegPath} -f lavfi -i color=c=black:s=1280x720:r=30 -f flv "${streamURL}"`, (err, stdout, stderr) => {
  if (err) console.error("❌ Not working ffmpeg:", err);
  console.log(stdout, stderr);
});

app.get('/', (req, res) => {
  res.send('<h1>✅ Server works on YouTube</h1>');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
