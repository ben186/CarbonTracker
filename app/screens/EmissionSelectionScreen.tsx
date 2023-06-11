import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, ViewStyle, View, Pressable, TextStyle } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { Ionicons } from "@expo/vector-icons"
import { colors } from "app/theme"
import { EMISSIONS } from "app/constants"

interface EmissionSelectionScreenProps extends HomeNavigatorScreenProps<"EmissionSelection"> {}

export const EmissionSelectionScreen: FC<EmissionSelectionScreenProps> = observer(function EmissionSelectionScreen({navigation}) {

  return (
    <View style={$root}>
      <View style={$list}>
          {EMISSIONS.map(c => (
            <Pressable 
              onPress={() => navigation.navigate("AddEmission", { category: c.category.toLocaleLowerCase() })}
              style={$category}
              key={c.category}
            >
              <Ionicons style={$icon} name={c.icon as keyof typeof Ionicons.glyphMap} size={32} />
              <Text style={$label}>{c.category.charAt(0).toUpperCase() + c.category.slice(1)}</Text>
            </Pressable>
          ))}
        </View>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1
}

const $list: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  flexWrap: "wrap",
  alignContent: "center"
}

const $icon: ViewStyle = {
  marginHorizontal: 20
}

const $label: TextStyle = {
  fontSize: 18, 
  fontWeight: "bold"
}

const $category: ViewStyle = {
  marginTop: 20,
  height: "10%",
  width: "95%",
  flexDirection: "row",
  backgroundColor: "#ffffff",
  alignItems: "center",
  borderBottomWidth: 1,
  borderColor: colors.border,
  zIndex: 1
}