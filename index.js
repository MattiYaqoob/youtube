const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Route بسيط يرجع JSON
app.get('/api/hello', (req, res) => {
  res.json({ message: 'مرحبا من الـ Backend على Render 🚀' });
});

// Route للصفحة الرئيسية
app.get('/', (req, res) => {
  res.send('<h1>✅ السيرفر يعمل بنجاح!</h1>');
});

// تشغيل السيرفر
app.listen(port, () => {
  console.log(`✅ Server running on port ${port}`);
});
