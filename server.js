
const express=require('express');
const axios=require('axios');
const cheerio=require('cheerio');
const cors=require('cors');
const app=express();
app.use(cors());
app.use(express.static('public'));

app.get('/api/search', async (req,res)=>{
 try{
  const q=req.query.q||'';
  const {data}=await axios.get(`https://mangaword.cx/?s=${encodeURIComponent(q)}&post_type=wp-manga`,{
    headers:{'User-Agent':'Mozilla/5.0'}
  });
  const $=cheerio.load(data);
  let out=[];
  $('div.page-item-detail, div.c-tabs-item__content').each((i,el)=>{
    out.push({
      title:$(el).find('h3 a,.post-title a').first().text().trim(),
      url:$(el).find('a').first().attr('href'),
      cover:$(el).find('img').attr('src')||$(el).find('img').attr('data-src')
    });
  });
  res.json(out);
 }catch(e){res.status(500).json({error:e.message});}
});

app.listen(process.env.PORT||3000);
