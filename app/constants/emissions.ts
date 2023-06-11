import { Ionicons } from "@expo/vector-icons";

export const EMISSIONS: 
    { 
        category: string, 
        factor: number, 
        unit: string, 
        icon: keyof typeof Ionicons.glyphMap
    }[] 
    = [
        { category: "car", factor: 24, unit: "km", icon: "car-sport-outline" },
        { category: "electricity", factor: 11, unit: "kW", icon: "bulb-outline" },
        { category: "food", factor: 55, unit: "g", icon: "pizza-outline" },
        { category: "custom", factor: 1, unit: "g", icon: "leaf-outline" }
    ]