import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  FarmCreated,
  Paused,
  ResponseAdded,
  RewardsSent,
  Unpaused
} from "../generated/DataFarm/DataFarm"

export function createFarmCreatedEvent(
  farmId: Bytes,
  description: string,
  farmType: i32,
  bountyType: i32,
  payout: BigInt,
  maxPayout: BigInt,
  payloadHash: Bytes,
  payoutPeriod: BigInt,
  timestamp: BigInt
): FarmCreated {
  let farmCreatedEvent = changetype<FarmCreated>(newMockEvent())

  farmCreatedEvent.parameters = new Array()

  farmCreatedEvent.parameters.push(
    new ethereum.EventParam("farmId", ethereum.Value.fromFixedBytes(farmId))
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "description",
      ethereum.Value.fromString(description)
    )
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "farmType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(farmType))
    )
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "bountyType",
      ethereum.Value.fromUnsignedBigInt(BigInt.fromI32(bountyType))
    )
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam("payout", ethereum.Value.fromUnsignedBigInt(payout))
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxPayout",
      ethereum.Value.fromUnsignedBigInt(maxPayout)
    )
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "payloadHash",
      ethereum.Value.fromFixedBytes(payloadHash)
    )
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "payoutPeriod",
      ethereum.Value.fromUnsignedBigInt(payoutPeriod)
    )
  )
  farmCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "timestamp",
      ethereum.Value.fromUnsignedBigInt(timestamp)
    )
  )

  return farmCreatedEvent
}

export function createPausedEvent(by: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )

  return pausedEvent
}

export function createResponseAddedEvent(
  farmId: Bytes,
  payload: Bytes,
  responder: Address
): ResponseAdded {
  let responseAddedEvent = changetype<ResponseAdded>(newMockEvent())

  responseAddedEvent.parameters = new Array()

  responseAddedEvent.parameters.push(
    new ethereum.EventParam("farmId", ethereum.Value.fromFixedBytes(farmId))
  )
  responseAddedEvent.parameters.push(
    new ethereum.EventParam("payload", ethereum.Value.fromFixedBytes(payload))
  )
  responseAddedEvent.parameters.push(
    new ethereum.EventParam("responder", ethereum.Value.fromAddress(responder))
  )

  return responseAddedEvent
}

export function createRewardsSentEvent(
  farmId: Bytes,
  numberOfResponders: BigInt,
  payoutPerResponder: BigInt
): RewardsSent {
  let rewardsSentEvent = changetype<RewardsSent>(newMockEvent())

  rewardsSentEvent.parameters = new Array()

  rewardsSentEvent.parameters.push(
    new ethereum.EventParam("farmId", ethereum.Value.fromFixedBytes(farmId))
  )
  rewardsSentEvent.parameters.push(
    new ethereum.EventParam(
      "numberOfResponders",
      ethereum.Value.fromUnsignedBigInt(numberOfResponders)
    )
  )
  rewardsSentEvent.parameters.push(
    new ethereum.EventParam(
      "payoutPerResponder",
      ethereum.Value.fromUnsignedBigInt(payoutPerResponder)
    )
  )

  return rewardsSentEvent
}

export function createUnpausedEvent(by: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("by", ethereum.Value.fromAddress(by))
  )

  return unpausedEvent
}
