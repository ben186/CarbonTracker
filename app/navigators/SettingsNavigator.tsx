import React from "react"
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"
import { SettingsScreen } from "app/screens"

export type SettingsNavigatorParamList = {
  Settings: undefined
}

export type SettingsNavigatorScreenProps<T extends keyof SettingsNavigatorParamList> = StackScreenProps<
  SettingsNavigatorParamList,
  T
>

const Stack = createStackNavigator<SettingsNavigatorParamList>()
export const SettingsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingsScreen} />
    </Stack.Navigator>
  )
}
