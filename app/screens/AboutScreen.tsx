import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, ViewStyle } from "react-native"
import { AppBottomTabScreenProps } from "app/navigators"
import { SafeAreaView } from "react-native-safe-area-context"
import { ScrollView } from "react-native-gesture-handler"

interface AboutScreenProp extends AppBottomTabScreenProps<"About"> {}

const ABOUT = "With the power of personal Carbon Tracker, you can effortlessly monitor and analyze various aspects of your carbon emissions. Our app provides you with detailed insights into key areas such as food, electricity, transport, and even allows you to track custom emissions specific to your lifestyle.\n\nWe believe that every individual can contribute to a more sustainable future, and the first step is awareness. By using our app, you'll gain a deeper understanding of your carbon footprint and how your daily choices impact the environment. Through data visualization and personalized reports, you'll be able to track your progress over time, set goals, and make informed decisions to reduce your carbon footprint.\n\nOur app offers a seamless user experience, with an intuitive interface designed to make carbon footprint tracking a breeze. You can easily log your activities, input relevant data, and visualize your carbon emissions in real-time. The app also provides tips and suggestions for eco-friendly alternatives, empowering you to make greener choices in your everyday life.\n\nWe prioritize the privacy and security of our users' data. Rest assured that your information is encrypted and stored securely, ensuring that your personal carbon footprint data remains confidential.\n\nJoin us on this journey towards a more sustainable future. Download the Carbon Footprint Mobile Application today and take the first step towards making a positive impact on our planet. Together, we can create a greener and healthier world for generations to come.\n\nThank you for choosing the Carbon Footprint Mobile Application. 😄"

export const AboutScreen: FC<AboutScreenProp> = observer(function AboutScreen() {
  return (
    <SafeAreaView style={$root} mode="margin">
      <ScrollView>
        <Text style={$header}>ABOUT</Text>
        <Text style={$about}>{ABOUT}</Text>
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

const $about: TextStyle = {
  fontSize: 18,
  lineHeight: 27,
  textAlign: "justify"
}
