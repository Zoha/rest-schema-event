const request = require("supertest")
const express = require("express")
const app = express()
const Model = require("./model")
const restSchema = require("rest-schema")
const { expect } = require("chai")
const eventPlugin = require("../src/index")
const event = require("../src/eventEmitter").createEventEmitter()

restSchema.use(eventPlugin({ event: event }))

const schema = restSchema.schema(
  Model,
  {
    field1: String
  },
  {}
)

describe("schema usage of rest schema event plugin", () => {
  beforeEach(() => {
    app.use("/test-schema", schema.resource())
  })
  it("schema event - create", async () => {
    let created = false
    event.on("create", () => {
      created = true
    })
    await request(app)
      .post("/test-schema")
      .expect(200)
      .expect(async res => {
        const result = JSON.parse(res.text)
        expect(result).to.be.an("object")
        expect(created).to.be.equal(true)
      })
  })

  it("schema event - update", async () => {
    let updated = false
    event.on("update", () => {
      updated = true
    })

    const resource = await Model.create({
      field1: "something"
    })
    await request(app)
      .put("/test-schema/" + resource._id)
      .expect(200)
      .expect(async res => {
        const result = JSON.parse(res.text)
        expect(result).to.be.an("object")
        expect(updated).to.be.equal(true)
      })
  })

  it("schema event - delete", async () => {
    let deleted = false
    event.on("delete", () => {
      deleted = true
    })

    const resource = await Model.create({
      field1: "something"
    })
    await request(app)
      .delete("/test-schema/" + resource._id)
      .expect(200)
      .expect(res => {
        const result = JSON.parse(res.text)
        expect(result).to.be.an("object")

        expect(deleted).to.be.equal(true)
      })
  })
})
