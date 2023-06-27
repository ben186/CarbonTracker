import React from "react"
import { StackScreenProps, createStackNavigator } from "@react-navigation/stack"
import { StatsScreen } from "app/screens"

export type StatsNavigatorParamList = {
  Stats: undefined
}

export type StatsNavigatorScreenProps<T extends keyof StatsNavigatorParamList> = StackScreenProps<
  StatsNavigatorParamList,
  T
>

const Stack = createStackNavigator<StatsNavigatorParamList>()
export const StatsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}>
      <Stack.Screen name="Stats" component={StatsScreen} />
    </Stack.Navigator>
  )
}
