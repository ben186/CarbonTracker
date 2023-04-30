import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Emission, EmissionModel } from "./Emission"

/**
 * Model description here for TypeScript hints.
 */
export const EmissionStoreModel = types
  .model("EmissionStore")
  .props({
    emissions: types.array(EmissionModel)
  })
  .actions(withSetPropAction)
  .views((store) => ({
    getById(id: string) {
      const index = store.emissions.findIndex(em => em.id === id)
      return store.emissions[index]
    },
    get listByDate() {
      return store.emissions.slice().sort((a, b) => b.timestamp - a.timestamp)
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    addEmission(emission: Emission) {
      store.emissions.push(emission)
    },
    setEmission(emission: Emission) {
      const index = store.emissions.findIndex(em => em.id === emission.id)
      store.emissions.splice(index, 1)
      store.emissions.push(emission)
    },
    removeEmission(id: string) {
      const index = store.emissions.findIndex(em => em.id === id)
      store.emissions.splice(index, 1)
    }
  }))

export interface EmissionStore extends Instance<typeof EmissionStoreModel> {}
export interface EmissionStoreSnapshotOut extends SnapshotOut<typeof EmissionStoreModel> {}
export interface EmissionStoreSnapshotIn extends SnapshotIn<typeof EmissionStoreModel> {}
export const createEmissionStoreDefaultModel = () => types.optional(EmissionStoreModel, {})
