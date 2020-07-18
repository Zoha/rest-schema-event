const eventEmitter = require("./eventEmitter")
const Event = require("events")

module.exports = (options, globalEventEmitter) => {
  let { event, useGlobalEvent, prefix, routes, divider, hooks } = options

  if (!!event && !(event instanceof Event)) {
    throw new Error("passed event is not a valid event instance")
  }
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
