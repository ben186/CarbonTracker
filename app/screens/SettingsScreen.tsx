import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { SettingsNavigatorScreenProps } from "app/navigators"
import { Text, Screen } from "app/components"

interface SettingsScreenProp extends SettingsNavigatorScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProp> = observer(function SettingsScreen() {
  return (
    <Screen style={$root} preset="fixed">
      <Text>Settings</Text>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}
