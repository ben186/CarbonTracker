import { Ionicons } from "@expo/vector-icons";

export type EMISSION = {
    category: string, 
    factor: number, 
    unit: string, 
    icon: keyof typeof Ionicons.glyphMap
}

export const EMISSIONS: EMISSION[]
    = [
        { category: "car", factor: 2, unit: "km", icon: "car-sport-outline" },
        { category: "electricity", factor: 3, unit: "kW", icon: "bulb-outline" },
        { category: "food", factor: 2, unit: "kg", icon: "pizza-outline" },
        { category: "custom", factor: 1, unit: "kg", icon: "leaf-outline" }
    ]