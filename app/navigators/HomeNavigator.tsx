import React from "react"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import { AddEmissionScreen, EmissionSelectionScreen, HomeScreen, RecurringEmissionScreen } from "app/screens"

export type HomeNavigatorParamList = {
  Home: undefined,
  EmissionSelection: undefined,
  AddEmission: { id?: string, category?: string } | undefined,
  RecurringEmission: undefined
}

export type HomeNavigatorScreenProps<T extends keyof HomeNavigatorParamList> = StackScreenProps<
  HomeNavigatorParamList,
  T
>

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="EmissionSelection" component={EmissionSelectionScreen} options={{headerTitle: "Select Your Emission"}} />
      <Stack.Screen name="AddEmission" component={AddEmissionScreen} options={{headerTitle: "Add Emission"}} />
      <Stack.Screen name="RecurringEmission" component={RecurringEmissionScreen} options={{headerTitle: "Recurring Emission"}} />
    </Stack.Navigator>
  )
}
