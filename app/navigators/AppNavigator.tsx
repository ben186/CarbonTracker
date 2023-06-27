/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import {
  NavigationContainer,
  useFocusEffect
} from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import React, { useCallback } from "react"
import { Ionicons } from "@expo/vector-icons"
import Config from "../config"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"
import { createBottomTabNavigator, BottomTabScreenProps } from "@react-navigation/bottom-tabs"
import { HomeNavigator } from "./HomeNavigator"
import { StatsNavigator } from "./StatsNavigator"
import { setStatusBarBackgroundColor, setStatusBarStyle, setStatusBarTranslucent } from "expo-status-bar"
import { AboutScreen } from "app/screens"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppBottomTabParamList = {
  HomeNavigator: undefined,
  StatsNavigator: undefined,
  About: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppBottomTabScreenProps<T extends keyof AppBottomTabParamList> = BottomTabScreenProps<
  AppBottomTabParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Tab = createBottomTabNavigator<AppBottomTabParamList>()

const AppBottomTab = observer(function AppBottomTab() {

  // Force light mode for now
  useFocusEffect(
    useCallback(() => {
      setStatusBarStyle("dark")
      setStatusBarBackgroundColor("white", true)
      setStatusBarTranslucent(true)
    }, [])
  )

  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false, tabBarActiveTintColor: "blue" }}>
      <Tab.Screen 
        name="HomeNavigator" 
        component={HomeNavigator}
        options={{
          tabBarIcon: ({ focused, color, size}) => (
            focused ?
            <Ionicons name="home" color={color} size={size} /> :
            <Ionicons name="home-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="StatsNavigator" 
        component={StatsNavigator}
        options={{
          tabBarIcon: ({ focused, color, size}) => (
            focused ?
            <Ionicons name="stats-chart" color={color} size={size} /> :
            <Ionicons name="stats-chart-outline" color={color} size={size} />
          )
        }}
      />
      <Tab.Screen 
        name="About" 
        component={AboutScreen}
        options={{
          tabBarIcon: ({ focused, color, size}) => (
            focused ?
            <Ionicons name="settings" color={color} size={size} /> :
            <Ionicons name="settings-outline" color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
})

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <>
      <NavigationContainer
        ref={navigationRef}
        {...props}
      >
        <AppBottomTab />
      </NavigationContainer>
    </>
  )
})
