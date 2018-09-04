# Readability API

## Installation

```bash
npm install
node app.js
```

## `[GET] /readability`

### Request

Supply a single URL that you want to parse as a parameter called `src` e.g.:

`/readability?src=https://github.com/`

### Response

The response object will contain the following properties:

- `article`: parsed article object
  - `title`: article title
  - `content`: HTML string of processed article content
  - `length`: length of an article, in characters
  - `excerpt`: article description, or short excerpt from the content
  - `byline`: author metadata
  - `dir`: content direction
- `embeddable`: a boolean to show if the webpage is embeddable in an iframe
- `html`: html text
