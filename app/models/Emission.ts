import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"

/**
 * Model description here for TypeScript hints.
 */
export const EmissionModel = types
  .model("Emission")
  .props({
    id: types.identifier,
    timestamp: types.integer,
    emissionType: types.string,
    emission: types.number
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars

export interface Emission extends Instance<typeof EmissionModel> {}
export interface EmissionSnapshotOut extends SnapshotOut<typeof EmissionModel> {}
export interface EmissionSnapshotIn extends SnapshotIn<typeof EmissionModel> {}
export const createEmissionDefaultModel = () => types.optional(EmissionModel, {})
