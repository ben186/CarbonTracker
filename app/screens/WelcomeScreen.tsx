import { AppBottomTabScreenProps } from "app/navigators"
import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import { View } from "react-native"

interface WelcomeScreenProps extends AppBottomTabScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {
  return (
    <View ></View>
  )
})
