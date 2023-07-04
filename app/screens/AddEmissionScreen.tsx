import React, { FC, useEffect, useMemo, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TextStyle, Text, TextInput, Alert } from "react-native"
import { HomeNavigatorScreenProps } from "app/navigators"
import { colors } from "app/theme"
import { ScrollView } from "react-native-gesture-handler"
import { Button } from "app/components"
import { EmissionModel, useStores } from "app/models"
import * as Crypto from "expo-crypto"
import { EMISSIONS } from "app/constants"
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker"
import { Dropdown } from "react-native-element-dropdown"

interface AddEmissionScreenProps extends HomeNavigatorScreenProps<"AddEmission"> {}

export const AddEmissionScreen: FC<AddEmissionScreenProps> = observer(function AddEmissionScreen({ route, navigation }) {
  const { emissionStore } = useStores()

  let category = route.params.category
  let initialEmission = "1"
  let initialDate = new Date()
  let initialRecurrenceInterval = "none"

  // Set the values if params presents
  if (route.params.id !== undefined) {
    const initialRecord = emissionStore.getById(route.params.id)

    category = initialRecord?.emissionType
    initialEmission = initialRecord?.emission.toString()
    initialDate = new Date(initialRecord?.timestamp ?? 0)
    initialRecurrenceInterval = initialRecord?.recurrence?.frequency ?? "none"
  }

  const [emissionQuantity, setEmissionQuantity] = useState(initialEmission)
  const [date, setDate] = useState(initialDate)
  const [recurrenceInterval, setRecurrenceInterval] = useState(initialRecurrenceInterval)

  const totalEmission = useMemo(() => {
    return Number.parseFloat(emissionQuantity) * EMISSIONS.find(v => v.category === category)?.factor
  }, [emissionQuantity])

  // For validation purposes
  const [isValidInput, setIsValidInput] = useState(true)
  
  useEffect(() => {
    const parsedQuantity = Number.parseFloat(emissionQuantity)

    const isNotNaN = !isNaN(parsedQuantity)
    const validExp = /^(\d*.?\d*)$/.test(emissionQuantity)
    const isWhitespaceIncluded = emissionQuantity.includes(" ")
    const isHyphenIncluded = emissionQuantity.includes("-")
    const isDecimalIncluded = emissionQuantity.includes(".")
    const isNotNegativeOrZero = parsedQuantity > 0

    const validate = () => category === "meal" ? 
      (isNotNaN && !isWhitespaceIncluded && !isDecimalIncluded && !isHyphenIncluded && isNotNegativeOrZero) :
      (isNotNaN && !isWhitespaceIncluded && validExp && !isHyphenIncluded && isNotNegativeOrZero)

    setIsValidInput(validate())
  }, [emissionQuantity])

  const deleteEmission = (id: string) => {
    Alert.alert("Delete Emission", "Are you sure to delete this record?", [
      {
        text: "No"
      },
      {
        text: "Yes",
        onPress: () => { 
          emissionStore.deleteEmission(id)
          navigation.goBack()
        }
      },
    ])
  }

  const updateEmission = (id: string) => {
    const currentEmission = emissionStore.getById(id)

    const updatedEmission = EmissionModel.create({
      id: currentEmission.id,
      timestamp: date.valueOf(),
      emissionType: currentEmission.emissionType,
      emission: Number.parseFloat(emissionQuantity)
    })
    emissionStore.updateEmission(updatedEmission)

    navigation.goBack()
  }

  const submitEmission = () => {
    emissionStore.addEmission(EmissionModel.create({
      id: Crypto.randomUUID(),
      timestamp: date.valueOf(),
      emissionType: category,
      emission: Number.parseFloat(emissionQuantity),
      recurrence: 
        recurrenceInterval === "none" ? 
        undefined : 
        {
          frequency: recurrenceInterval as "daily" | "weekly" | "monthly",
          nextOccurence: date.valueOf()
        }
    }))

    // Immediately update to add any possible entry 
    if (recurrenceInterval !== "none") {
      emissionStore.checkAndUpdateRecurringEmission()
    }

    navigation.navigate("Home")
  }

  const renderSaveAndDeleteButtons = () => (
    <View style={$saveAndDeleteButtons}>
      <Button disabled={!isValidInput} style={$saveButton} onPress={() => updateEmission(route.params.id)}>Save</Button>
      <Button textStyle={$deleteEmissionText} style={$deleteEmission} onPress={() => deleteEmission(route.params.id)}>Delete</Button>
    </View>
  )

  const onChange = (_: any, selectedDate: Date) => {
    const currentDate = selectedDate
    setDate(currentDate)
  }

  const pickDate = () => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: "date",
      is24Hour: false
    })
  }

  return (
    <ScrollView contentContainerStyle={$root} keyboardShouldPersistTaps={"handled"} scrollEnabled={false}>
      <View>
        <View style={$inputView}>
          <Text style={$text}>Date</Text>
          <Text style={$inputText} onPress={pickDate}>{date.toISOString().slice(0, 10)}</Text>
        </View>
        <View style={$inputView}>
          <Text style={$text}>{ category ? "Emission Quantity [" + EMISSIONS.find(v => v.category === category).unit + "]" : "Emission Quantity" }</Text>
          <TextInput
            style={[$inputText, isValidInput ? {} : $invalidInputText]}
            onChangeText={setEmissionQuantity}
            value={emissionQuantity}
            placeholder="Input your emission quantity..."
            placeholderTextColor={colors.textDim}
            keyboardType="numeric"
          />
          {!isValidInput && <Text style={$error}>ⓘ Please input a valid and positive number</Text>}
        </View>
        <View style={$inputView}>
          <Text style={$text}>Recurring</Text>
          <Dropdown
            itemTextStyle={$itemText}
            selectedTextStyle={$itemText}
            style={$dropdownStyle}
            data={[
              { label: "None", value: "none" },
              { label: "Daily", value: "daily" },
              { label: "Weekly", value: "weekly" },
              { label: "Monthly", value: "monthly" }
            ]} 
            labelField="label" 
            valueField="value"
            value={recurrenceInterval}
            onChange={item => setRecurrenceInterval(item.value)}   
          />
        </View>
        <View style={$inputView}>
          <Text style={$text}>Emission Type</Text>
          <Text style={$displayText}>{category ? (category.charAt(0).toUpperCase() + category.slice(1)) : "NONE"}</Text>
        </View>
        <View style={$inputView}>
          <Text style={$text}>Emission Factor</Text>
          <Text style={$displayText}>{EMISSIONS.find(v => v.category === category)?.factor}</Text>
        </View>
        <View style={$inputView}>
          <Text style={$text}>Total Emission [kg CO2e]</Text>
          <Text style={$displayEmissionText}>🔥 {!isValidInput ? "-" : totalEmission.toLocaleString(undefined, { maximumFractionDigits: 3 })}</Text>
        </View>
      </View>
      { route.params.id && renderSaveAndDeleteButtons() }
      { !route.params.id && <Button disabled={!isValidInput} style={$recordButton} onPress={submitEmission}>Record Emission</Button>}
    </ScrollView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  flexDirection: "column",
  justifyContent: "space-between",
  paddingHorizontal: "3.5%",
  backgroundColor: colors.background
}

const $inputView: ViewStyle = {
  marginTop: "1%",
  marginBottom: "2%"
}

const $text: TextStyle = {
  fontSize: 22,
  fontWeight: "bold"
}

const $inputText: TextStyle = {
  borderBottomWidth: 1,
  borderColor: colors.textDim,
  marginTop: "2%",
  fontSize: 20,
  color: colors.textDim
}

const $invalidInputText: TextStyle = {
  borderColor: colors.error
}

const $error: TextStyle = {
  color: colors.error
}

const $dropdownStyle: ViewStyle = {
  borderBottomWidth: 1,
  borderColor: colors.textDim
}

const $itemText: TextStyle = {
  fontSize: 20,
  color: colors.textDim
}

const $displayText: TextStyle = {
  marginTop: "1.5%",
  fontSize: 20,
  color: colors.textDim
}

const $displayEmissionText: TextStyle = {
  marginTop: "1.5%",
  fontSize: 20,
  fontWeight: "bold",
  color: colors.error
}

const $saveAndDeleteButtons: ViewStyle = {
  flexDirection: "column"
}

const $saveButton: ViewStyle = {
  bottom: 0,
  width: "100%",
  marginBottom: "1%"
}

const $recordButton: ViewStyle = {
  bottom: 0,
  width: "100%",
  marginBottom: "4%"
}

const $deleteEmissionText: TextStyle = {
  color: colors.palette.primary100
}

const $deleteEmission: ViewStyle = {
  borderWidth: 0,
  bottom: 0,
  width: "100%",
  marginTop: "1%",
  marginBottom: "4%",
  backgroundColor: "red"
}