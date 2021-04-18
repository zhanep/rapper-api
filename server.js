const express = require('express')
const app = express()
const PORT = 8000
const cors = require('cors')

app.use(cors())

let rappers ={
'21 savage': {
    'age': 28,
    'birthName': 'Shéyaa Bin Abraham-Joseph',
    'birthLocation': 'London, England'
},
'chance the rapper':{
    'age': 27,
    'birthName': 'Chancelor Jonathon Bennett',
    'birthLocation': 'Chicago, Illinois'
},
'unknown':{
    'age': 28,
    'birthName': 'unknown',
    'birthLocation': 'unknown'

},
}



app.get('/', (request, response) => {
    response.sendFile__dirname + './index.html'
})

api.get('/api/rappers/:rappersName', (request, response) => {
const rapName = request.params.rapperName.toLowerCase()
console.log(rapName)
if(rappers[rapName]){
response.json(rappers[rapName])
}else {
    response.json(rappers['unknown'])
}

})


app.listen(process.env.PORT || PORT, () =>{
    console.log(`sever runni 