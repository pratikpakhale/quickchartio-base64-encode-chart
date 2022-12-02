//basic express server
let express = require('express')
const axios = require('axios')
let app = express()

app.use(express.json())

app.get('/generate', async function (req, res) {
  let query = req.query || ''
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

app.post('/generate', async function (req, res) {
  let query = req.body || ''
  let url =
    ' https://quickchart.io/chart?' +
    new URLSearchParams({
      bkg: query.bkg || 'white',
      c: JSON.stringify(query.c) || '',
    }).toString()
  let config = {
    method: 'get',
    responseType: 'arraybuffer',
    url: url,
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
