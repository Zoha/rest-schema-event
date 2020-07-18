# requirement

- rest-schema `^1.0.3`

# features

- add events for rest schema as global or specific schema model
- create event for all available routes on schema
- simple and light

# installation

add it to your project with npm

`npm install rest-schema-event`

or with yarn

`yarn add rest-schema-event`

# usage

first register plugin on schema as schema plugin or global plugin

global:

```JAVASCRIPT
// global
const restSchema = require('rest-schema')
const restSchemaEvent = require('rest-schema-event')
const event = restSchemaEvent.event

restSchema.use(restSchemaEvent())

// using
// modelName is name of your model
event.on("modelName.create" , (response , restSchemaContext) => {
    console.log('modelName created')
})
```

or specific schema model

```JAVASCRIPT
// specific schema model
const restSchema = require('rest-schema')
const myModel = require('./myModel')
const restSchemaEvent = require('rest-schema-event')

const schema = restSchema.schema(myModel , {
    // my fields
})
schema.use(restSchemaEvent())

// using
// we do not need model name here ( can be customized in options )
event.on("create" , (response , restSchemaContext) => {
    console.log('created')
})
```

NOTE: remember that if you register rest-schema-event plugin globally all events will be emitted with a prefix (by default `modelName.`) but you can change this behavior in options

# options

object of options that is optional

### event

- optional
- type : [nodejs event](https://nodejs.org/api/events.html)
- default : null

custom event emitter. by default if you register plugin globally, plugin will use a global event that is access able as `require('rest-schema-event').event`

### useGlobalEvent

- optional
- type: boolean
- default: `true`

if you do not send any event and set this to false, plugin creates a custom event emitter foreach use()

### prefix

- optional
- type: boolean|string
- default: null

if set an string every event will emitted with that prefix.
by default if you dont set it (define null) and register plugin globally this will be setted true automaticly if useGlobalEvent was true
if this was a true boolean plugin will prefix it with a modelname and devider
for example if your model name was `users` this will prefix `users` + divider to every event

### divider

- optional
- type: string
- default: `.`
  divider between prefix and event name

### routes

- optional
- type: string[]
- default: ['create' , 'update', 'delete']
  list of routes that plugin will effect on those

### hooks

- optional
- type: string[]
- default: ['after']
  list of hooks by defualt is just after

# license

MIT license
