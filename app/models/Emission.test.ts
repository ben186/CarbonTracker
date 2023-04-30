import { EmissionModel } from "./Emission"

test("can be created", () => {
  const instance = EmissionModel.create({})

  expect(instance).toBeTruthy()
})
