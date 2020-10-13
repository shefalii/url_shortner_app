const express = require('express');
const app = express();
const mongoose = require('mongoose');
const ShortUrl = require('./model/shortUrl');

mongoose.connect('mongodb+srv://shefali_17:qwerty.u1@cluster0.dcote.mongodb.net/test', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
    const urls = await ShortUrl.find();
    res.render('view', { urls: urls });
})

app.post('/shortUrlGenerator', async (req, res) => {
    await ShortUrl.create({fullUrl: req.body.fullUrl});
    res.redirect('/');
})

app.get('/:shortUrl', async (req, res) => {
  const url = await ShortUrl.findOne({shortUrl: req.params.shortUrl});
  if(url == null) return res.sendStatus(404);
  url.save();
  res.redirect(url.fullUrl);
})
app.listen(process.env.port || 3000);
