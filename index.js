const express = require('express');
const { exec } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;

const streamKey = "utuu-gbub-vt43-kgcj-d2f4";
const streamURL = `rtmps://a.rtmp.youtube.com/live2/${streamKey}`;


const ffmpegCommand = `ffmpeg -f lavfi -i color=c=black:s=1280x720:r=30"${streamURL}"`;

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
