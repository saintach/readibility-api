const cors = require('cors')
const fetch = require('node-fetch')
const Readability = require('readability')
const jsdom = require('jsdom')
const { JSDOM } = jsdom
const express = require('express')

const app = express()

app.get('/', (req, res) => res.send('Hello World!'))

app.get('/readability', cors(), (req, res) => {
  const src = req.query.src;
  let headers = {};
  let embeddable = true;

  return fetch(src)
    .then(res => {
      headers = res.headers.raw();
      let iframeOptions = headers['x-frame-options']
      if (iframeOptions) {
        if (Array.isArray(iframeOptions)) {
          const deny = iframeOptions.find((x) =>
            x.toLowerCase() === 'deny' || x.toLowerCase() === 'sameorigin' || x.toLowerCase().includes('allow-from')
          )
          embeddable = !!!deny;
        }
      }
      return res.text();
    })
    .then(text => {
      if (!text) {
        console.log('No text!');
        return {
          headers: headers,
          article: {},
          html: text,
          embeddable: false
        }
      }

      const dom = new JSDOM(text);
      const article = new Readability(dom.window.document).parse();

      return {
        headers: headers,
        article: article,
        html: text,
        embeddable
      }
    })
    .then(obj => {
      return res.send(obj)
    })
    .catch(err => {
      console.error(err.stack);
      return res.send(err)
    });
})

app.listen(3001, () => console.log('Listening on port 3001!'))