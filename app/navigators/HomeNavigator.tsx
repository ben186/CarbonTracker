import React from "react"
import { createStackNavigator, StackScreenProps } from "@react-navigation/stack"
import { AddEmissionScreen, HomeScreen } from "app/screens"

export type HomeNavigatorParamList = {
  Home: undefined,
  AddEmission: undefined
}

export type HomeNavigatorScreenProps<T extends keyof HomeNavigatorParamList> = StackScreenProps<
  HomeNavigatorParamList,
  T
>

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: true }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="AddEmission" component={AddEmissionScreen} options={{headerTitle: "Add Emission"}} />
    </Stack.Navigator>
  )
}
