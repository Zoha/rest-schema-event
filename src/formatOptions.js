const eventEmitter = require("./eventEmitter")

module.exports = (options, globalEventEmitter) => {
  let { event, useGlobalEvent, prefix, routes, divider, hooks } = options
  // determine target event emitter
  const targetEventEmitter = event
    ? event
    : useGlobalEvent
    ? globalEventEmitter
    : eventEmitter.createEventEmitter()

  // determine prefix
  if (prefix === null && !!useGlobalEvent && !event) {
    prefix = true
  }

  return {
    targetEventEmitter,
    event,
    useGlobalEvent,
    prefix,
    routes,
    divider,
    hooks
  }
}
