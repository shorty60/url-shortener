const md5 = require('md5')
const Base62Str = require('base62str').default
const base62 = Base62Str.createInstance()

function shortenIdGenerator(urlInput, digits) {
  // 使用md5 hash，因為hash function只要input相同，output就會相同
  const hashedURL = md5(urlInput)
  // md5會產生binary output，用base62 encoded，變成0-9a-zA-Z組成的字串
  const idGenerated = base62.encodeStr(hashedURL).slice(0, digits)
  return idGenerated
}
// 使用hash function可確保input url相同時，output絕對相同

module.exports = shortenIdGenerator
