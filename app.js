//basic express server
let express = require('express')
const axios = require('axios')
let app = express()

app.get('/generate/:obj', async function (req, res) {
  let params = req.params.obj || {}
  let url = ' https://quickchart.io/chart'
  let config = {
    method: 'get',
    responseType: 'arraybuffer',
    url: url,
    params,
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

app.listen(3000, function () {
  console.log('Server Started!')
})
