import React from "react";
import { StyleSheet, Text, View } from "react-native";

export interface SpeechBubbleProps {
  backgroundColor: string;
  color: string;
  text: string;
  alignRight?: boolean;
}

export default function SpeechBubble({
  text,
  backgroundColor,
  color,
  alignRight = true,
}: SpeechBubbleProps) {
  return (
    <View
      style={[
        {
          alignItems: alignRight ? "flex-end" : "flex-start",
        },
        style.container,
      ]}
    >
      <View
        style={[
          {
            backgroundColor,
          },
          style.card,
        ]}
      >
        <Text style={[{ color }]}>{text}</Text>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "column",
    marginBottom: 10,
  },
  card: {
    borderRadius: 10,
    maxWidth: 400,
    padding: 10,
  },
});
