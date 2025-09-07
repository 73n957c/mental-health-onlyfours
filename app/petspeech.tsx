import SpeechBubble, { SpeechBubbleProps } from "@/components/SpeechBubble";
import { Send } from "lucide-react-native";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const selfSpeechBubbleProps: SpeechBubbleProps = {
  backgroundColor: "#8B5CF6",
  color: "#FFFFFF",
  text: "...",
};

const petSpeechBubbleProps: SpeechBubbleProps = {
  backgroundColor: "#FFFFFF",
  color: "#1F2937",
  text: "...",
  alignRight: false,
};

export default function PetSpeech() {
  const [speechHistory, setSpeechHistory] = useState<SpeechBubbleProps[]>([
    {
      ...petSpeechBubbleProps,
      text: "Meow! Any issue my friend?",
    },
  ]);
  const [userInput, setUserInput] = useState("");

  return (
    <View style={style.mainContainer}>
      <View style={style.historyContainer}>
        <ScrollView showsHorizontalScrollIndicator={false}>
          {speechHistory.map((speech) => (
            <SpeechBubble {...speech} />
          ))}
        </ScrollView>
      </View>
      <View style={style.separator}></View>
      <View style={style.inputFieldContainer}>
        <TextInput
          value={userInput}
          onChangeText={(text) => setUserInput(text)}
          multiline
          style={style.inputFieldTextInput}
        ></TextInput>
        <TouchableOpacity
          onPress={() => {
            const sanitisedUserInput = userInput.trim();
            if (sanitisedUserInput.length === 0) return;
            setSpeechHistory((prev) => [
              ...prev,
              {
                ...selfSpeechBubbleProps,
                text: sanitisedUserInput,
              },
            ]);
            setUserInput("");
          }}
          style={style.inputFieldButton}
        >
          <Send />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  mainContainer: {
    padding: 10,
    maxWidth: 800,
    width: "100%",
    marginHorizontal: "auto",
    flexDirection: "column",
    height: "100%",
  },
  historyContainer: {
    flex: 9,
    padding: 20,
  },
  separator: {
    backgroundColor: "#c1cbd5ff",
    height: 1,
    width: "100%",
  },
  inputFieldContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignContent: "center",
    gap: 10,
  },
  inputFieldTextInput: {
    flex: 1,
    padding: 5,
    backgroundColor: "#FFFFFF",
    borderRadius: 5,
    borderColor: "#6B7280",
    borderWidth: 1,
  },
  inputFieldButton: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});
