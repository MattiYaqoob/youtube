const express = require('express');
const { spawn } = require('child_process');

const app = express();
const port = process.env.PORT || 3000;


const streamKey = "utuu-gbub-vt43-kgcj-d2f4";
const streamURL = `rtmps://a.rtmp.youtube.com/live2/${streamKey}`;

function startStream() {
  const ffmpegArgs = [
    '-re', 
    '-f', 'lavfi',
    '-i', 'color=c=black:s=1280x720:r=30',   
    '-f', 'lavfi',
    '-i', 'anullsrc=r=44100:cl=mono',        
    '-c:v', 'libx264',
    '-preset', 'veryfast',
    '-b:v', '2500k',
    '-c:a', 'aac',
    '-b:a', '128k',
    '-ar', '44100',
    '-f', 'flv',
    streamURL
  ];

  const ffmpeg = spawn('ffmpeg', ffmpegArgs);

  ffmpeg.stderr.on('data', (data) => {
    console.log(`FFmpeg: ${data}`);
  });

  ffmpeg.on('close', (code) => {
    console.log(`❌ FFmpeg exited with code ${code}. Auto restart the server..`);
    setTimeout(startStream, 5000); 
  });
}

startStream();

app.get('/', (req, res) => {
  res.send('<h1>✅ Server works & streaming continuously to YouTube</h1>');
});

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
