import { Instance, SnapshotIn, SnapshotOut, types } from "mobx-state-tree"
import { withSetPropAction } from "./helpers/withSetPropAction"
import { addDays, addMonths, addWeeks } from "date-fns";

/**
 * Model description here for TypeScript hints.
 */
export const EmissionModel = types
  .model("Emission")
  .props({
    id: types.identifier,
    timestamp: types.integer,
    emissionType: types.string,
    emission: types.number,
    recurrence: types.maybe(
      types.model({
        frequency: types.enumeration("Frequency", ["daily", "weekly", "monthly"]),
        nextOccurence: types.integer
      })
    )
  })
  .actions(withSetPropAction)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    updateRecurrenceDate() {
      if (self.recurrence) {
        let nextDate = new Date(self.recurrence.nextOccurence)

        switch (self.recurrence.frequency) {
          case "daily":
            nextDate = addDays(nextDate, 1)
            break
          case "weekly":
            nextDate = addWeeks(nextDate, 1)
            break
          case "monthly":
            nextDate = addMonths(nextDate, 1)
            break
        }

        self.recurrence.nextOccurence = nextDate.valueOf()
      }
    }
  }))

export interface Emission extends Instance<typeof EmissionModel> {}
export interface EmissionSnapshotOut extends SnapshotOut<typeof EmissionModel> {}
export interface EmissionSnapshotIn extends SnapshotIn<typeof EmissionModel> {}
export const createEmissionDefaultModel = () => types.optional(EmissionModel, {})
