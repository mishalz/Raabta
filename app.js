const express= require('express')

const app = express()

//Basic home route
app.get('/',(req,res)=>res.send('Welcome to Raabta!'))

app.listen(3000,()=>{
    console.log('Server is up.')
})