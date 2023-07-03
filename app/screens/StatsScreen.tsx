import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, Text, TextStyle, View, ViewStyle } from "react-native"
import { StatsNavigatorScreenProps } from "app/navigators"
import * as echarts from "echarts/core"
import SkiaChart, { SVGRenderer } from "@wuba/react-native-echarts/skiaChart"
import { BarChart, PieChart } from "echarts/charts"
import type { EChartsOption } from "echarts"
import type { ECharts } from "echarts/core"
import { GridComponent, LegendComponent } from "echarts/components"
import { useStores } from "app/models"
import { getDay } from "date-fns"
import { EMISSIONS } from "app/constants"
import { colors } from "app/theme"
import { SafeAreaView } from "react-native-safe-area-context"
import { Ionicons } from "@expo/vector-icons"

echarts.use([SVGRenderer, BarChart, PieChart, GridComponent, LegendComponent])

interface StatsScreenProps extends StatsNavigatorScreenProps<"Stats"> {}

const DAY = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

export const StatsScreen: FC<StatsScreenProps> = observer(function StatsScreen() {
  const barRef = useRef<HTMLElement | null>(null)
  // Be careful that we must use .fill().map() to avoid array of references when compared to use .fill() only
  const barData: Array<Array<number>> = new Array(EMISSIONS.length).fill(0).map(_ => new Array(DAY.length).fill(0))
  const barOption: EChartsOption = {
    color: ["#56b83d", "#2E8A7B", "#DB8448", "#D24656"],
    grid: {
      left: "center",
      containLabel: true
    },
    legend: {
      orient: "horizontal"
    },
    xAxis: {
      type: "category",
      data: DAY,
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: (value) => value === 0 ? "0" : (value / 1000).toString()
      },
      name: "kg CO2e",
      show: true
    },
    series: new Array(EMISSIONS.length).fill({})
  }

  const pieRef = useRef<HTMLElement | null>(null)
  const pieData : Map<string, number> = new Map() // !!! Don't access with pieData[category], it is a Map
  const pieOption: EChartsOption = {
    color: ["#56b83d", "#2E8A7B", "#DB8448", "#D24656"],
    series: [
      {
        type: "pie",
        data: []
      }
    ]
  }

  const { emissionStore } = useStores()

  // Extract chart data
  emissionStore.emissions.forEach(emission => {
    if (emission.recurrence) return

    // TODO: Try to simplify this operation by calculating ahead of time (Optional)
    const totalEmission = emission.emission * EMISSIONS.find(e => e.category === emission.emissionType).factor

    // Originally starts with Sunday and shifted to Monday as starting day of the week
    const day = (getDay(new Date(emission.timestamp)) + 1) % 7
    const emissionIndex = EMISSIONS.findIndex(x => x.category === emission.emissionType)
    barData[emissionIndex][day] += totalEmission

    pieData.set(
      emission.emissionType, 
      (pieData.has(emission.emissionType) ? pieData.get(emission.emissionType) : 0) + totalEmission
    )
  })

  // Assign chart data
  Object.keys(barData).forEach(key => {
    const category: string = EMISSIONS[key].category

    barOption.series[key] = {
      name: category.charAt(0).toUpperCase() + category.slice(1),
      data: barData[key],
      type: "bar",
      stack: "stack"
    }
  })

  for (const [key, emission] of pieData) {
    const category = key.charAt(0).toUpperCase() + key.slice(1)

    pieOption.series[0].data.push({ name: category, value: emission})
  }

  useEffect(() => {
    let chart: ECharts | undefined
    if (barRef.current && emissionStore.nonRecurringEmissionLength !== 0) {
      chart = echarts.init(barRef.current, "light", {
        renderer: "svg",
        width: 800,
        height: 380,
      })
      chart.setOption(barOption)  
    }

    return () => chart?.dispose()
  }, [barOption])

  useEffect(() => {
    let chart: ECharts | undefined
    if (pieRef.current && emissionStore.nonRecurringEmissionLength !== 0) {
      chart = echarts.init(pieRef.current, "light", {
        renderer: "svg",
        width: 400,
        height: 200
      })
      chart.setOption(pieOption)
    }

    return () => chart?.dispose()
  }, [pieOption])

  const renderPercentageItem = ([category, emission]: [string, number]) => {
    const emissionInfo = EMISSIONS.find(x => x.category === category)

    return (
      <View key={emissionInfo.category} style={$category}>
        <Ionicons style={$icon} name={emissionInfo.icon} size={32} />
        <View style={$emissionPercentageLabelContainer}>
          <Text style={$emissionPercentageLabel}>{emissionInfo.category.charAt(0).toUpperCase() + emissionInfo.category.slice(1)}</Text>
          <Text style={$percentageLabel}>{(emission / emissionStore.totalEmission * 100).toFixed(0) + "%"}</Text>
        </View>
      </View>
    )
  }

  const renderChart = () => (
    <ScrollView>
      <View style={$chartContainer}>
        <Text style={$label}>Category Overview</Text>
        <View style={$chart}>
          <SkiaChart ref={pieRef} />
        </View>
      </View>
      <View style={$chartContainer}>
        <Text style={$label}>Emission Percentage</Text>
        { [...pieData].sort((a, b) => b[1] - a[1]).map(data => renderPercentageItem(data)) } 
      </View>
      <View style={$chartContainer}>
        <Text style={$label}>Emission Overview</Text>
        <View style={[$chart, $barChart]}>
          <SkiaChart ref={barRef} />
        </View>
      </View>
      {/* Have to add empty component for elevation to work for some reason */ }
      <Text></Text>
    </ScrollView>
  )
  
  return (
    <SafeAreaView style={$root} mode="margin">
      <Text style={$header}>STATISTICS</Text>
      {
        emissionStore.nonRecurringEmissionLength === 0 ? 
          <Text style={$empty}>No data available</Text> :
          renderChart()
      }
    </SafeAreaView>
  )
})

const $root: ViewStyle = {
  flex: 1,
  paddingHorizontal: "2%",
  backgroundColor: colors.background
}

const $empty: TextStyle = {
  height: "100%",
  width: "100%",
  textAlign: "center",
  textAlignVertical: "center",
  fontSize: 18
}

const $header: TextStyle = {
  fontSize: 25,
  fontWeight: "bold",
  lineHeight: 28,
  letterSpacing: -1.05,
  paddingVertical: "2%"
}

const $icon: ViewStyle = {
  marginHorizontal: 20
}

const $category: ViewStyle = {
  flexDirection: "row",
  paddingVertical: "1.5%",
  marginRight: "2%"
}

const $emissionPercentageLabelContainer: ViewStyle = {
  flex: 1,
  flexDirection: "row",
  justifyContent: "space-between"
}

const $emissionPercentageLabel: TextStyle = {
  fontSize: 15,
  fontWeight: "500",
  textAlignVertical: "center"
}

const $percentageLabel: TextStyle = {
  backgroundColor: colors.tint,
  color: colors.palette.primary100,
  fontWeight: "500",
  height: 30,
  width: 55,
  borderRadius: 3,
  textAlign: "center",
  textAlignVertical: "center",
  alignSelf: "center",
  paddingHorizontal: "1%"
}

const $chartContainer: ViewStyle = {
  alignSelf: "center",
  width: "100%",
  marginTop: "2%",
  backgroundColor: colors.palette.neutral100,
  elevation: 4
}

const $label: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "left",
  lineHeight: 35,
  marginHorizontal: "2%"
}

const $chart: ViewStyle = {
  alignSelf: "center"
}

const $barChart: ViewStyle = {
  marginBottom: -45
}