const restSchema = require("rest-schema")
const formatOptions = require("./formatOptions")
const { createEventEmitter } = require("./eventEmitter")
const pluralize = require("pluralize")

const globalEventEmitter = createEventEmitter()

const plugin = options => {
  let { targetEventEmitter, prefix, routes, divider, hooks } = formatOptions(
    options,
    globalEventEmitter
  )

  return target => {
    // determine target for add hooks on it (global or schema)
    target = target || restSchema
    if (target.set) target = target.set

    if (target) {
      target.event = targetEventEmitter

      // for each route set the  hooks
      // to define targetEventEmitter on context and target (global or schema)
      // and set a custom hook for after to emit the event by this format schemaName.route
      routes.forEach(route => {
        target.addHook(route, "before", context => {
          context.event = context.event || targetEventEmitter
        })

        // define hook handler (emitting event)
        const hookHandler = context => {
          let stringPrefix = prefix || ""
          if (typeof prefix === "boolean") {
            stringPrefix = pluralize(context.schema.name).toLowerCase() + divider
          }
          targetEventEmitter.emit(
            stringPrefix + route,
            context.resource || context.collection,
            context
          )
        }

        hooks.forEach(hook => {
          target.addHook(route, hook, hookHandler)
        })
      })
    }
  }
}

module.exports = ({
  event = null,
  useGlobalEvent = true,
  prefix = null,
  routes = ["create", "update", "delete"],
  divider = ".",
  hooks = ["after"]
} = {}) => plugin({ event, useGlobalEvent, prefix, routes, divider, hooks })
module.exports.event = globalEventEmitter
module.exports.eventEmitter = globalEventEmitter
