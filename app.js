//basic express server
var express = require('express')
const axios = require('axios')
var app = express()

app.get('/generate/:obj', async function (req, res) {
  var obj = req.params.obj || {}
  var url = ' https://quickchart.io/chart'
  var config = {
    method: 'get',
    responseType: 'arraybuffer',
    url: url,
    params: {
      c: obj,
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

app.listen(3000, function () {
  console.log('Server Started!')
})
