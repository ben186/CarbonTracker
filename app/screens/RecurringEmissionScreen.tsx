import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, Text, TextStyle, TouchableOpacity, View, ViewStyle } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { Emission, useStores } from "app/models"
import { Ionicons } from "@expo/vector-icons"
import { EMISSIONS } from "app/constants"
import { colors } from "app/theme"

interface RecurringEmissionScreenProps extends HomeNavigatorScreenProps<"RecurringEmission"> {}

export const RecurringEmissionScreen: FC<RecurringEmissionScreenProps> = observer(function RecurringEmissionScreen({ navigation }) {
  const { emissionStore } = useStores()

  const renderItem = ({item}: {item: Emission}) => (
    <TouchableOpacity onPress={() => navigation.navigate("AddEmission", { id: item.id })} style={$item}>
      <Ionicons style={$iconStyle} name={EMISSIONS.find(c => c.category === item.emissionType).icon} size={32} />
      <View style={$label}>
        <View>
          <Text style={$text}>{item.emissionType.toUpperCase()}</Text>
          <Text>{(item.emission * EMISSIONS.find(c => c.category === item.emissionType).factor).toLocaleString() + " kg CO2e"}</Text>
          <Text style={$nextEmissionText}>Due: {new Date(item.recurrence.nextOccurence).toLocaleDateString()}</Text>
        </View>
        <Text style={$recurringLabel}>{item.recurrence.frequency.charAt(0).toUpperCase() + item.recurrence.frequency.slice(1)}</Text>
      </View>
    </TouchableOpacity>
  )
  
  return (
    <View style={$root}>
      {emissionStore.recurringEmissionLength === 0 && <Text style={$empty}>No recurring emissions 🍃</Text>}
      <FlatList 
        style={$list}
        data={emissionStore.listRecurrenceChronogically}
        renderItem={renderItem}
      />
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  paddingHorizontal: "2%"
}

const $empty: TextStyle = {
  height: "100%",
  width: "100%",
  textAlign: "center",
  textAlignVertical: "center",
  fontSize: 18
}

const $list: ViewStyle = {
  flex: 1,
  alignSelf: "stretch",
  paddingTop: "1%"
}

const $iconStyle: ViewStyle = {
  marginRight: "2%",
  alignSelf: "center"
}

const $item: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  alignSelf: "center",
  padding: 10,
  backgroundColor: colors.palette.neutral100,
  marginVertical: "1%",
  width: "100%",
  minHeight: 35,
  elevation: 4
}

const $text: TextStyle = {
  fontWeight: "bold",
}

const $nextEmissionText: TextStyle = {
  color: colors.textDim
}

const $label: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between"
}

const $recurringLabel: TextStyle = {
  backgroundColor: colors.tint,
  color: colors.palette.primary100,
  fontWeight: "500",
  height: 30,
  width: 70,
  borderRadius: 3,
  textAlign: "center",
  textAlignVertical: "center",
  alignSelf: "center",
  paddingHorizontal: "1%"
}