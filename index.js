const express = require('express');
const { exec } = require('child_process');
const ffmpegPath = require('ffmpeg-static'); 

const app = express();
const port = process.env.PORT || 3000;

const streamKey = "utuu-gbub-vt43-kgcj-d2f4";
const streamURL = `rtmps://a.rtmp.youtube.com/live2/${streamKey}`;

const ffmpegCommand = `${ffmpegPath} -f lavfi -i testsrc=size=1280x720:rate=30 -f lavfi -i sine=frequency=1000 -c:v libx264 -preset veryfast -b:v 2500k -c:a aac -b:a 128k -ar 44100 -f flv "${streamURL}"`;

exec(ffmpegCommand, (err, stdout, stderr) => {
  if (err) {
    console.error("❌ FFmpeg error:", err);
    return;
  }
  console.log(stdout, stderr);
});

app.get('/', (req, res) => {
  res.send('<h1>✅ Server works and streaming to YouTube</h1>');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
