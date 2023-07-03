import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, ViewStyle, View, TouchableOpacity, TextStyle } from "react-native"
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
            <TouchableOpacity 
              onPress={() => navigation.navigate("AddEmission", { category: c.category.toLocaleLowerCase() })}
              style={$categoryContainer}
              key={c.category}
            >
              <View style={$category}>
                <Ionicons style={$icon} name={c.icon} size={32} />
                <Text style={$label}>{c.category.charAt(0).toUpperCase() + c.category.slice(1)}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: "2%"
}

const $list: ViewStyle = {
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "space-around"
}

const $icon: ViewStyle = {
  marginHorizontal: 20
}

const $label: TextStyle = {
  fontSize: 18, 
  fontWeight: "bold",
  textAlignVertical: "center"
}

const $categoryContainer: ViewStyle = {
  justifyContent: "center",
  backgroundColor: colors.palette.neutral100,
  marginTop: 20,
  elevation: 4,
  height: 70
}

const $category: ViewStyle = {
  flexDirection: "row"
}