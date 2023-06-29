import React, { FC, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ScrollView, Text, TextStyle, View, ViewStyle } from "react-native"
import { StatsNavigatorScreenProps } from "app/navigators"
import * as echarts from "echarts/core"
import SkiaChart, { SVGRenderer } from "@wuba/react-native-echarts/skiaChart"
import { BarChart, PieChart } from "echarts/charts"
import type { EChartsOption } from "echarts"
import type { ECharts } from "echarts/core"
import { GridComponent } from "echarts/components"
import { useStores } from "app/models"
import { getDay } from "date-fns"
import { EMISSIONS } from "app/constants"
import { colors } from "app/theme"
import { SafeAreaView } from "react-native-safe-area-context"

echarts.use([SVGRenderer, BarChart, PieChart, GridComponent])

interface StatsScreenProps extends StatsNavigatorScreenProps<"Stats"> {}

export const StatsScreen: FC<StatsScreenProps> = observer(function StatsScreen() {
  const barRef = useRef<HTMLElement | null>(null)
  const barOption: EChartsOption = {
    grid: {
      left: "center",
      containLabel: false
    },
    xAxis: {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    },
    yAxis: {
      type: "value",
      show: false
    },
    series: [
      {
        data: [0, 0, 0, 0, 0, 0, 0],
        type: "bar"
      }
    ]
  }

  const pieRef = useRef<HTMLElement | null>(null)
  const pieOption: EChartsOption = {
    series: [
      {
        type: "pie",
        data: [
          {
            value: 0,
            name: "Car"
          },
          {
            value: 0,
            name: "Electricity"
          },
          {
            value: 0,
            name: "Food"
          },
          {
            value: 0,
            name: "Custom"
          }
        ]
      }
    ]
  }

  const { emissionStore } = useStores()

  emissionStore.emissions.forEach(emission => {
    if (emission.recurrence) return

    // Originally starts with Sunday and shifted to Monday as starting day of the week
    const day = (getDay(new Date(emission.timestamp)) + 1) % 7

    // TODO: Try to simplify this operation by calculating ahead of time?
    const totalEmission = emission.emission * EMISSIONS.find(e => e.category === emission.emissionType).factor

    barOption.series[0].data[day] += totalEmission
    pieOption.series[0].data.find(x => x.name.toLowerCase() === emission.emissionType).value += totalEmission
  })

  useEffect(() => {
    let chart: ECharts | undefined
    if (barRef.current) {
      chart = echarts.init(barRef.current, "light", {
        renderer: "svg",
        width: 800,
        height: 350,
      })
      chart.setOption(barOption)  
    }

    return () => chart?.dispose()
  }, [barOption])

  useEffect(() => {
    let chart: ECharts | undefined
    if (pieRef.current) {
      chart = echarts.init(pieRef.current, "light", {
        renderer: "svg",
        width: 400,
        height: 200
      })
      chart.setOption(pieOption)
    }

    return () => chart?.dispose()
  }, [pieOption])

  const renderChart = () => (
    <ScrollView>
      <View style={$chart}>
        <Text style={$label}>Top Emission Days</Text>
        <SkiaChart ref={barRef} />
      </View>
      <View style={$chart}>
        <Text style={$label}>Top Emission Types</Text>
        <SkiaChart ref={pieRef} />
      </View>
      {/* Have to add empty component for elevation to work for some reason */ }
      <Text></Text>
    </ScrollView>
  )
  
  return (
    <SafeAreaView style={$root} mode="margin">
      {
        emissionStore.nonRecurringEmissionLength === 0 ? 
          <Text style={$empty}>No emissions recorded 🍃</Text> :
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

const $label: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  alignContent: "center",
  alignSelf: "center"
}

const $chart: ViewStyle = {
  alignSelf: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "1.5%",
  backgroundColor: colors.palette.neutral100,
  elevation: 4
}