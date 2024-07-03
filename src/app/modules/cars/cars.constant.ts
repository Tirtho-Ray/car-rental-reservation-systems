export const Features = ["AC", "Bluetooth", "Long Range Battery"] as const;
export type TCarFeatures = typeof Features[number];
