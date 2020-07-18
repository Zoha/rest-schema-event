const request = require("supertest")
const express = require("express")
const app = express()
const Model = require("./model")
const restSchema = require("rest-schema")
const { expect } = require("chai")
const eventPlugin = require("../src/index")
const globalEvent = eventPlugin.event

restSchema.use(eventPlugin())

const schema = restSchema.schema(
  Model,
  {
    field1: String
  },
  {}
)

describe("global usage of rest schema event plugin", () => {
  beforeEach(() => {
    app.use("/tests", schema.resource())
  })
  it("global event - create", async () => {
    let created = false
    globalEvent.on("models.create", () => {
      created = true
    })
    await request(app)
      .post("/tests")
      .expect(200)
      .expect(async res => {
        const result = JSON.parse(res.text)
        expect(result).to.be.an("object")
        expect(created).to.be.equal(true)
      })
  })

  it("global event - update", async () => {
    let updated = false
    globalEvent.on("models.update", () => {
      updated = true
    })

    const resource = await Model.create({
      field1: "something"
    })
    await request(app)
      .put("/tests/" + resource._id)
      .expect(200)
      .expect(async res => {
        const result = JSON.parse(res.text)
        expect(result).to.be.an("object")
        expect(updated).to.be.equal(true)
      })
  })

  it("global event - delete", async () => {
    let deleted = false
    globalEvent.on("models.delete", () => {
      deleted = true
    })

    const resource = await Model.create({
      field1: "something"
    })
    await request(app)
      .delete("/tests/" + resource._id)
      .expect(200)
      .expect(res => {
        const result = JSON.parse(res.text)
        expect(result).to.be.an("object")

        expect(deleted).to.be.equal(true)
      })
  })
})
