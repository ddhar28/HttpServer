# HttpServer
A basic Http server using Node JS 

## Installation

Directly run on node

```bash
node server.js
```

## Usage

set routes

```
route.get('/sayHello', (req, res) => {
  res.send('Hello')
})
```