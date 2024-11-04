import express from 'express'
import engine from 'ejs-mate'
//initializacions
const port = process.env.PORT ?? 3000
const app  = express()



//settings

app.engine ('ejs', engine);
app.set('view engine', 'ejs');
app.set('views', './src/views')

//routes
app.get('/', (req, res) => {
    res.render('index')
})

//start server 
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    })