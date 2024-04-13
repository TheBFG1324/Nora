import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as"
import { Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import { FarmCreated } from "../generated/schema"
import { FarmCreated as FarmCreatedEvent } from "../generated/DataFarm/DataFarm"
import { handleFarmCreated } from "../src/data-farm"
import { createFarmCreatedEvent } from "./data-farm-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let farmId = Bytes.fromI32(1234567890)
    let description = "Example string value"
    let farmType = 123
    let bountyType = 123
    let payout = BigInt.fromI32(234)
    let maxPayout = BigInt.fromI32(234)
    let payloadHash = Bytes.fromI32(1234567890)
    let payoutPeriod = BigInt.fromI32(234)
    let timestamp = BigInt.fromI32(234)
    let newFarmCreatedEvent = createFarmCreatedEvent(
      farmId,
      description,
      farmType,
      bountyType,
      payout,
      maxPayout,
      payloadHash,
      payoutPeriod,
      timestamp
    )
    handleFarmCreated(newFarmCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("FarmCreated created and stored", () => {
    assert.entityCount("FarmCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "farmId",
      "1234567890"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "description",
      "Example string value"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "farmType",
      "123"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "bountyType",
      "123"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "payout",
      "234"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "maxPayout",
      "234"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "payloadHash",
      "1234567890"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "payoutPeriod",
      "234"
    )
    assert.fieldEquals(
      "FarmCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "timestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
