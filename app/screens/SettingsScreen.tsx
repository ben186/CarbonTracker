import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { SettingsNavigatorScreenProps } from "app/navigators"
import { Text } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"

interface SettingsScreenProp extends SettingsNavigatorScreenProps<"Settings"> {}

export const SettingsScreen: FC<SettingsScreenProp> = observer(function SettingsScreen() {
  return (
    <SafeAreaView style={$root} mode="margin">
      <Text>Settings</Text>
    </SafeAreaView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}
