import React, { FC, useMemo } from "react"
import { observer } from "mobx-react-lite"
import { Text, TextStyle, View, ViewStyle, TouchableOpacity, SectionList, Pressable } from "react-native"
import { HomeNavigatorScreenProps, AppBottomTabParamList } from "app/navigators"
import { colors } from "app/theme"
import { Emission, EmissionModel, useStores } from "app/models"
import { Ionicons } from "@expo/vector-icons"
import * as Crypto from "expo-crypto"
import { EMISSIONS } from "app/constants"
import { SafeAreaView } from "react-native-safe-area-context"
import { MotiPressable } from "moti/interactions"
import { NavigationProp, useNavigation } from "@react-navigation/native"

function getRandomDate(from: Date, to: Date) {
  const fromTime = from.getTime()
  const toTime = to.getTime()
  return new Date(fromTime + Math.random() * (toTime - fromTime))
}

interface HomeScreenProps extends HomeNavigatorScreenProps<"Home"> {}

export const HomeScreen: FC<HomeScreenProps> = observer(function HomeScreen({ navigation }) {

  const appBottomTabNavigator = useNavigation<NavigationProp<AppBottomTabParamList>>()

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
    <Text style={$headerText}>{section.title.slice(-5)}</Text>
  )

  return (
    <SafeAreaView style={$root} mode="margin">
      <Text style={$header}>HOME</Text>
      <Pressable onPress={() => appBottomTabNavigator.navigate("StatsNavigator")} style={$totalEmissionContainer}>
        <Text style={$labelText}>Your total emission:</Text>
        <Text style={$numberText}>{emissionStore.totalEmission}</Text>
        <Text style={$unitText}>kg CO2e</Text>
        <Text style={$detailText}>{"Press to see breakdown >"}</Text>
      </Pressable>
      {emissionStore.nonRecurringEmissionLength === 0 && <Text style={$empty}>No emissions added yet</Text>}
      <SectionList
        style={$list}
        sections={emissionStore.listNonRecurrenceByDay}
        renderItem={renderItem}
        renderSectionHeader={renderHeader}
      />
      <MotiPressable 
        style={$recurringEmission} 
        onPress={() => navigation.navigate("RecurringEmission")}
        animate={
          useMemo(() => ({ pressed }) => {  
            "worklet"

            return {
              scale: pressed ? 0.9 : 1
            }
          }, [])
        }
        transition={{
          type: "spring",
          damping: 5
        }}
      >
        <Ionicons style={$recurringEmissionIcon} name="timer-outline" color={"white"} size={36} />
      </MotiPressable>
      <MotiPressable 
        style={$addEmission} 
        onPress={() => navigation.navigate("EmissionSelection")}
        animate={
          useMemo(() => ({ pressed }) => {  
            "worklet"

            return {
              scale: pressed ? 0.9 : 1
            }
          }, [])
        }
        transition={{
          type: "spring",
          damping: 5
        }}
      >
        <Ionicons style={$addIcon} name="add" color={"white"} size={36} />
      </MotiPressable>
    </SafeAreaView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  backgroundColor: colors.background,
  paddingHorizontal: "2%",
  width: "100%"
}

const $header: TextStyle = {
  fontSize: 25,
  fontWeight: "bold",
  lineHeight: 28,
  letterSpacing: -1.05,
  paddingVertical: "2%"
}

const $totalEmissionContainer: ViewStyle = {
  marginTop: "1%",
  paddingHorizontal: "2%",
  borderRadius: 3,
  backgroundColor: colors.palette.primary700
}

const $labelText: TextStyle = {
  fontSize: 20,
  color: colors.palette.primary200
}

const $numberText: TextStyle = {
  fontSize: 40,
  fontWeight: "500",
  alignSelf: "center",
  color: colors.palette.primary100
}

const $unitText: TextStyle = {
  fontSize: 20,
  fontWeight: "500",
  alignSelf: "center",
  color: colors.palette.primary200
}

const $detailText: TextStyle = {
  fontSize: 10,
  fontStyle: "italic",
  fontWeight: "bold",
  alignSelf: "flex-end",
  color: colors.palette.primary100,
  paddingBottom: "1%"
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
  alignSelf: "stretch"
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
  backgroundColor: colors.tint,
  borderRadius: 50,
  bottom: 80,
  right: 15
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
  backgroundColor: colors.tint,
  borderRadius: 50,
  bottom: 15,
  right: 15
}
