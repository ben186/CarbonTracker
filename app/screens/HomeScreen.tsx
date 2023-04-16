import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { Text, Screen } from "app/components"

interface HomeScreenProps extends HomeNavigatorScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen() {
  return (
    <Screen style={$root} preset="fixed">
      <Text>Home</Text>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}
