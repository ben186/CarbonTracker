import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, ViewStyle } from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"

interface AboutScreenProp extends AppBottomTabScreenProps<"About"> {}

const ABOUT = `We believe that every individual can contribute to a more sustainable future, and the first step is awareness. By using our app, you will gain a deeper understanding of your carbon footprint and how your daily choices impact the environment. Through data visualization and personalized reports, you will be able to track your progress over time, set goals, and make informed decisions to reduce your carbon footprint.`
const PRIVACY = `Carbon Tracker does not require any sign-up or account creation. We do not collect or store any of your personal data on our servers. Your carbon footprint tracking data is stored locally on your device, meaning it remains under your complete control at all times.`

export const AboutScreen: FC<AboutScreenProp> = observer(function AboutScreen() {
  return (
    <SafeAreaView style={$root} mode="margin">
      <Text style={$header}>ABOUT</Text>
      <ScrollView>
        <Text style={$about}>{ABOUT}</Text>
        <Text style={$subHeader}>Privacy</Text>
        <Text style={$about}>{PRIVACY}</Text>
      </ScrollView>
    </SafeAreaView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  paddingHorizontal: "2%"
}

const $header: TextStyle = {
  fontSize: 25,
  fontWeight: "bold",
  lineHeight: 28,
  letterSpacing: -1.05,
  paddingVertical: "2%"
}

const $subHeader: TextStyle = {
  fontSize: 21,
  fontWeight: "600",
  lineHeight: 25,
  letterSpacing: -0.5,
  paddingVertical: "2%"
}

const $about: TextStyle = {
  fontSize: 18,
  lineHeight: 27,
  textAlign: "justify"
}
