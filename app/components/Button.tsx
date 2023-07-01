import { colors } from "app/theme"
import React from "react"
import {
  Pressable,
  PressableProps,
  PressableStateCallbackType,
  StyleProp,
  Text,
  TextStyle,
  ViewStyle,
} from "react-native"

export interface ButtonAccessoryProps {
  style: StyleProp<any>
  pressableState: PressableStateCallbackType
}

export interface ButtonProps extends PressableProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  /**
   * An optional style override for the button text.
   */
  textStyle?: StyleProp<TextStyle>
  /**
   * Children component
   */
  children?: React.ReactNode
}

export function Button(props: ButtonProps) {
  const {
    style: $styleOverride,
    textStyle: $textStyleOverride,
    children,
    disabled,
    ...rest
  } = props

  const $viewStyle = ({ pressed }) => {
    return [
      $baseStyle, $styleOverride, pressed ? $basePressedStyle : {}, disabled && $baseDisabledStyle
    ]
  }

  return (
    <Pressable disabled={disabled} style={$viewStyle} accessibilityRole="button" {...rest}>
      <Text style={[$baseTextStyle, $textStyleOverride, disabled && $baseDisabledTextStyle]}>
        {children}
      </Text>
    </Pressable>
  )
}

const $baseStyle: ViewStyle = {
  width: "100%",
  backgroundColor: colors.palette.neutral100,
  justifyContent: "center",
  paddingVertical: 15,
  borderWidth: 1,
  borderColor: colors.border
}

const $baseDisabledStyle: ViewStyle = {
  backgroundColor: colors.border
}

const $basePressedStyle: ViewStyle = {
  backgroundColor: colors.border
}

const $baseTextStyle: TextStyle = {
  fontSize: 16,
  fontWeight: "bold",
  alignSelf: "center"
}

const $baseDisabledTextStyle: TextStyle = {
  color: colors.textDim
}