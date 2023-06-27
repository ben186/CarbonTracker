import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { Text } from "app/components"
import { SafeAreaView } from "react-native-safe-area-context"

interface AboutScreenProp extends AppBottomTabScreenProps<"About"> {}

export const AboutScreen: FC<AboutScreenProp> = observer(function AboutScreen() {
  return (
    <SafeAreaView style={$root} mode="margin">
      <Text>About</Text>
    </SafeAreaView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}
