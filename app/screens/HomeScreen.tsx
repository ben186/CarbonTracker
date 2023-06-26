import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle, TouchableOpacity, Pressable, SectionList } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { colors } from "app/theme"
import { Emission, EmissionModel, useStores } from "app/models"
import { Ionicons } from "@expo/vector-icons"
import * as Crypto from "expo-crypto"
import { EMISSIONS } from "app/constants"

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime()
  const toTime = to.getTime()
  return new Date(fromTime + Math.random() * (toTime - fromTime))
}

interface HomeScreenProps extends HomeNavigatorScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {

  const { emissionStore } = useStores()

  // emissionStore.setProp("emissions", [])

  // Add random emissions
  // if (emissionStore.emissions.length < 10) {
  //   for (let i = 0; i < 100; i++) {
  //     emissionStore.addEmission(EmissionModel.create({
  //       id: Crypto.randomUUID(),
  //       timestamp: getRandomDate(new Date('2023-5-01T01:57:45.271Z'), new Date()).valueOf(),
  //       emissionType: EMISSIONS.map(x => x.category)[Math.floor(Math.random() * 4)],
  //       emission: Math.floor(Math.random() * (2000 - 2 + 1) + 2)
  //     }))
  //   }
  // } 
  
  const renderItem = ({item}: {item: Emission}) => (
    <TouchableOpacity onPress={() => navigation.navigate("AddEmission", { id: item.id })} style={$item}>
      <Ionicons style={$iconStyle} name={EMISSIONS.find(c => c.category === item.emissionType).icon} size={32} />
      <View style={$label}>
        <Text style={$text}>{item.emissionType.toUpperCase()}</Text>
        <Text>{(item.emission * EMISSIONS.find(c => c.category === item.emissionType).factor).toLocaleString() + " gCO2e"}</Text>
      </View>
    </TouchableOpacity>
  )

  const renderHeader = ({section}: { section: { title: string }}) => (
    <Text style={$headerText}>{section.title}</Text>
  )

  return (
    <View style={$root}>
      {emissionStore.nonRecurringEmissionLength === 0 && <Text style={$empty}>No emissions recorded 🍃</Text>}
      <SectionList
        style={$list}
        sections={emissionStore.listByDay}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
      />
      <Pressable style={$recurringEmission} onPress={() => navigation.navigate("RecurringEmission")}>
        <Ionicons style={$recurringEmissionIcon} name="timer-outline" color={"white"} size={36} />
      </Pressable>
      <Pressable style={$addEmission} onPress={() => navigation.navigate("EmissionSelection")}>
        <Ionicons style={$addIcon} name="add" color={"white"} size={36} />
      </Pressable>
    </View>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: colors.background,
  paddingHorizontal: "2%"
}

const $empty: TextStyle = {
  height: "100%",
  width: "100%",
  textAlign: "center",
  textAlignVertical: "center",
  fontSize: 18
}

const $headerText: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  alignSelf: "center"
}

const $list: ViewStyle = {
  flex: 1,
  alignSelf: "stretch",
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

const $label: ViewStyle = {
  flex: 1,
  justifyContent: "space-between"
}

const $recurringEmissionIcon: ViewStyle = {
  alignSelf: "center"
}

const $recurringEmission: ViewStyle = {
  position: "absolute",
  height: 55,
  width: 55,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "blue",
  borderRadius: 50,
  bottom: 85,
  right: 20
}

const $addIcon: ViewStyle = {
  alignSelf: "center"
}

const $addEmission: ViewStyle = {
  position: "absolute",
  height: 55,
  width: 55,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "blue",
  borderRadius: 50,
  bottom: 20,
  right: 20
}
