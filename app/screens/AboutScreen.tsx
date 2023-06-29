import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, ViewStyle } from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"

interface AboutScreenProp extends AppBottomTabScreenProps<"About"> {}

const ABOUT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

export const AboutScreen: FC<AboutScreenProp> = observer(function AboutScreen() {
  return (
    <SafeAreaView style={$root} mode="margin">
      <Text style={$about}>{ABOUT}</Text>
    </SafeAreaView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: "2%"
}

const $about: TextStyle = {
  fontSize: 16,
  textAlign: "justify"
}
