import { Ionicons } from "@expo/vector-icons";

export type EMISSION = {
    category: string, 
    factor: number, 
    unit: string, 
    icon: keyof typeof Ionicons.glyphMap
}

export const EMISSIONS: EMISSION[]
    = [
        { category: "car", factor: 0.147, unit: "km", icon: "car-sport-outline" },
        { category: "electricity", factor: 0.662, unit: "kW", icon: "bulb-outline" },
        { category: "meal", factor: 1.405, unit: "kg", icon: "fast-food-outline" },
        { category: "custom", factor: 1, unit: "kg", icon: "leaf-outline" }
    ]