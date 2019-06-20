
let getRoutes = {}

module.exports = {
  get: (uri, handler) => {
    getRoutes[uri] = handler
  },
  isRoute: async function (req, res) {
    const uri = req.startLine[1]  

    try {
      await getRoutes[uri](req, res)
      return true
    } catch (err) {
      return false
    }
  }
}
