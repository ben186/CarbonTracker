import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { Emission, EmissionModel } from "./Emission"
import * as Crypto from "expo-crypto"

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
    getById(id: string): Emission {
      const index = store.emissions.findIndex(em => em.id === id)
      return store.emissions[index]
    },
    get listByDay(): { title: string, data: Emission[] }[] {
      let emissionData = []

      if (store.emissions.length !== 0) {
        const groupedDates = {}
        const sortedEmission = store.emissions.slice().sort((a, b) => b.timestamp - a.timestamp)

        sortedEmission.forEach(emission => {
          // Ignore recurring emission
          if (emission.recurrence) return

          const day = new Date(emission.timestamp).toISOString().slice(0, 10)
          if (groupedDates[day]) {
            groupedDates[day].push(emission)
          }
          else {
            groupedDates[day] = [emission]
          }
        })

        emissionData = Object.entries(groupedDates).map(([title, data]) => ({
          title,
          data
        }))
      }

      return emissionData
    }
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((store) => ({
    addEmission(emission: Emission) {
      store.emissions.push(emission)
    },
    updateEmission(emission: Emission) {
      const index = store.emissions.findIndex(em => em.id === emission.id)
      store.emissions.splice(index, 1)
      store.emissions.push(emission)
    },
    deleteEmission(id: string) {
      const index = store.emissions.findIndex(em => em.id === id)
      store.emissions.splice(index, 1)
    },
    checkAndUpdateRecurringEmission() {
      const today = new Date()

      store.emissions.forEach(emission => {
        // Keep adding recurring emissions
        while (emission.recurrence && today.valueOf() >= emission.recurrence.nextOccurence) {
          const recurringEmission = EmissionModel.create({
            ...emission,
            id: Crypto.randomUUID(),
            timestamp: emission.recurrence.nextOccurence,
            recurrence: undefined
          })

          store.emissions.push(recurringEmission)

          emission.updateRecurrenceDate()
        }
      })
    }
  }))

export interface EmissionStore extends Instance<typeof EmissionStoreModel> {}
export interface EmissionStoreSnapshotOut extends SnapshotOut<typeof EmissionStoreModel> {}
export interface EmissionStoreSnapshotIn extends SnapshotIn<typeof EmissionStoreModel> {}
export const createEmissionStoreDefaultModel = () => types.optional(EmissionStoreModel, {})
