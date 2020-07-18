const { expect } = require("chai")
const formatOptions = require("../src/formatOptions")
const EventEmitter = require("../src/eventEmitter")
const { event } = require("../src/index")

describe("format options tests", () => {
  it("format options normally", () => {
    const formattedOptions = formatOptions(
      {
        event: null,
        useGlobalEvent: false,
        prefix: null,
        routes: ["create", "update", "delete"],
        divider: "/",
        hooks: ["after", "afterResponse"]
      },
      event
    )

    expect(formattedOptions.targetEventEmitter instanceof EventEmitter).to.be.equal(true)
    expect(formattedOptions.prefix).to.be.equal(null)
    expect(formattedOptions.divider).to.be.equal("/")
    expect(formattedOptions.hooks).to.have.lengthOf(2)
    expect(formattedOptions.routes).to.have.lengthOf(3)
  })

  it("return prefix as true if useGlobalEvent was true", () => {
    const formattedOptions = formatOptions(
      {
        event: null,
        useGlobalEvent: true,
        prefix: null,
        routes: ["create", "update", "delete"],
        divider: "/",
        hooks: ["after", "afterResponse"]
      },
      event
    )

    expect(formattedOptions.prefix).to.be.equal(true)
  })
})
