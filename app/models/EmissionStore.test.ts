import { EmissionStoreModel } from "./EmissionStore"

test("can be created", () => {
  const instance = EmissionStoreModel.create({})

  expect(instance).toBeTruthy()
})
