//basic express server
let express = require('express')
const axios = require('axios')
let app = express()

app.get('/generate', async function (req, res) {
  let query = req.query || ''
  console.log(query)
  let url = ' https://quickchart.io/chart'
  let config = {
    method: 'get',
    responseType: 'arraybuffer',
    url: url,
    params: {
      c: query.c || '',
      bkg: query.bkg || 'white',
    },
  }
  axios(config)
    .then(function (response) {
      let base64 = Buffer.from(response.data, 'binary').toString('base64')
      return res.json({
        base64,
      })
    })
    .catch(function (error) {
      return res.json({
        error,
      })
    })
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(5000, function () {
  console.log('Server Started!')
})
