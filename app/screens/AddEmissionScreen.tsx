import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { Text } from "app/components"
import { colors } from "app/theme"

interface AddEmissionScreenProps extends HomeNavigatorScreenProps<"AddEmission"> {}

export const AddEmissionScreen: FC<AddEmissionScreenProps> = observer(function AddEmissionScreen() {
  return (
    <View style={$root}>
      <Text>Hello World</Text>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background
}
