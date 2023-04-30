import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { EmissionStoreModel } from "./EmissionStore"

/**
 * A RootStore model.
 */
export const RootStoreModel = types.model("RootStore").props({
  emissionStore: types.optional(EmissionStoreModel, {} as any),
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}
/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
