const ex = require('express');
const mor = require('morgan');
const hel = require('helmet');
const { LoremIpsum  } = require('lorem-ipsum')

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4
    },
    wordsPerSentence: {
      max: 16,
      min: 4
    }
  }, 'html','<br/>');



const app = ex();
app.use(mor("dev"))
app.use(hel())
app.use(ex.json())
app.use(ex.urlencoded({extended: true}))

app.get('/',(req,res)=>{
    res.json({message: 'sucesso'})
})
app.get('/paragrafos/:count?',(req,res)=>{
    const { count } = req.params
    const para =lorem.generateParagraphs(count ? parseInt(count): 1)
    res.json({para})
})
app.get('/words/:count?',(req,res)=>{
    const { count } = req.params
    const words =lorem.generateWords(count ? parseInt(count): 1)
    res.json({words})
})
app.get('/sentences/:count?',(req,res)=>{
    const { count } = req.params
    const sentences =lorem.generateSentences(count ? parseInt(count): 1)
    res.json({sentences})
})



const port = 5000;
app.listen(port,()=>{
    console.log("on na porta: "+port)
})