import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, View, ViewStyle } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { Text, Button } from "app/components"
import { colors } from "app/theme"

interface HomeScreenProps extends HomeNavigatorScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {
  return (
    <View style={$root}>
      <Text style={$text}>No emissions recorded yet</Text>
      <Button style={$addEmission} onPress={() => navigation.navigate("AddEmission")}>Add Emission</Button>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.background,
  borderColor: colors.border,
  borderWidth: 2
}

const $text: TextStyle = {
  alignSelf: "center"
}

// TODO: Don't hardcode padding
const $addEmission: TextStyle = {
  position: "absolute",
  bottom: 0,
  paddingLeft: 130,
  paddingRight: 130,
  marginBottom: "1%"
}
