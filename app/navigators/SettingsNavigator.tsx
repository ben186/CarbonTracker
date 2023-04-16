import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  WelcomeScreen
} from "app/screens"

export type SettingsNavigatorParamList = {
  Demo: undefined
}

const Stack = createStackNavigator<SettingsNavigatorParamList>()
export const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="Demo" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}
