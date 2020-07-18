const EventEmitter = require("events")

class RestSchemaEventEmitter extends EventEmitter {}

module.exports = RestSchemaEventEmitter

module.exports.createEventEmitter = () => {
  const eventEmitter = new RestSchemaEventEmitter()
  eventEmitter.setMaxListeners(0)
  return eventEmitter
}
