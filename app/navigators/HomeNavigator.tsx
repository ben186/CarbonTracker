import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import {
  WelcomeScreen
} from "app/screens"

export type HomeNavigatorParamList = {
  Demo: undefined
}

const Stack = createStackNavigator<HomeNavigatorParamList>()
export const HomeNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false, }}>
      <Stack.Screen name="Demo" component={WelcomeScreen} />
    </Stack.Navigator>
  )
}
