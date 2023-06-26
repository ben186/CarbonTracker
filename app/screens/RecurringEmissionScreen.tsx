import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { useStores } from "app/models"

interface RecurringEmissionScreenProps extends HomeNavigatorScreenProps<"RecurringEmission"> {}

export const RecurringEmissionScreen: FC<RecurringEmissionScreenProps> = observer(function RecurringEmissionScreen() {
  const { emissionStore } = useStores()
  
  return (
    <View style={$root}>
      {emissionStore.recurringEmissionLength === 0 && <Text style={$empty}>No recurring emissions 🍃</Text>}
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center"
}

const $empty: TextStyle = {
  height: "100%",
  width: "100%",
  textAlign: "center",
  textAlignVertical: "center",
  fontSize: 18
}
