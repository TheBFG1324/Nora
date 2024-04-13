import {
  FarmCreated as FarmCreatedEvent,
  Paused as PausedEvent,
  ResponseAdded as ResponseAddedEvent,
  RewardsSent as RewardsSentEvent,
  Unpaused as UnpausedEvent
} from "../generated/DataFarm/DataFarm"
import {
  FarmCreated,
  Paused,
  ResponseAdded,
  RewardsSent,
  Unpaused
} from "../generated/schema"

export function handleFarmCreated(event: FarmCreatedEvent): void {
  let entity = new FarmCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.farmId = event.params.farmId
  entity.description = event.params.description
  entity.farmType = event.params.farmType
  entity.bountyType = event.params.bountyType
  entity.payout = event.params.payout
  entity.maxPayout = event.params.maxPayout
  entity.payloadHash = event.params.payloadHash
  entity.payoutPeriod = event.params.payoutPeriod
  entity.timestamp = event.params.timestamp

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.by = event.params.by

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleResponseAdded(event: ResponseAddedEvent): void {
  let entity = new ResponseAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.farmId = event.params.farmId
  entity.payload = event.params.payload
  entity.responder = event.params.responder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleRewardsSent(event: RewardsSentEvent): void {
  let entity = new RewardsSent(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.farmId = event.params.farmId
  entity.numberOfResponders = event.params.numberOfResponders
  entity.payoutPerResponder = event.params.payoutPerResponder

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.by = event.params.by

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
