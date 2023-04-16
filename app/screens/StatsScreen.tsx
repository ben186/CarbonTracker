import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { StatsNavigatorScreenProps } from "app/navigators"
import { Text, Screen } from "app/components"

interface StatsScreenProps extends StatsNavigatorScreenProps<"Stats"> {}

export const StatsScreen: FC<StatsScreenProps> = observer(function StatsScreen() {
  return (
    <Screen style={$root} preset="fixed">
      <Text>Stats</Text>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}
