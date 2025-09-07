import { MoodEntry, StorageUtils } from "@/components/MoodProvider";
import { Plus, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  Text,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const moodEmojis = [
  { emoji: "😊", mood: "happy", color: "#10b981" },
  { emoji: "😌", mood: "calm", color: "#06b6d4" },
  { emoji: "😐", mood: "neutral", color: "#6b7280" },
  { emoji: "😰", mood: "stressed", color: "#f59e0b" },
  { emoji: "😢", mood: "sad", color: "#ef4444" },
  { emoji: "😟", mood: "anxious", color: "#8b5cf6" },
];

type CustomMarkedDates = {
  [date: string]: {
    customStyles: {
      container: ViewStyle;
      text: TextStyle;
    };
  };
};

export default function MoodScreen() {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string>("");
  const [moodNote, setMoodNote] = useState("");
  const [markedDates, setMarkedDates] = useState<CustomMarkedDates>({});

  useEffect(() => {
    loadMoodEntries();
  }, []);

  const loadMoodEntries = async () => {
    const entries = await StorageUtils.getMoodEntries();
    // Sort by timestamp so last one per date wins
    const sorted = [...entries].sort((a, b) => a.timestamp - b.timestamp);

    // Build markedDates
    const marked: CustomMarkedDates = {};
    entries.forEach((entry) => {
      const moodData = moodEmojis.find((m) => m.mood === entry.mood);
      marked[entry.date] = {
        customStyles: {
          container: {
            backgroundColor: "#f9fafb",
            borderRadius: 15,
          },
          text: {
            textAlign: "center",
            fontSize: 22,
            text: moodData?.emoji ?? "🙂",
          } as any,
        },
      };
    });
    setMoodEntries(entries);
    setMarkedDates(marked);
  };

  const saveMoodEntry = async () => {
    if (!selectedMood) {
      Alert.alert("Please select a mood");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    const moodData = moodEmojis.find((m) => m.mood === selectedMood);

    const entry: MoodEntry = {
      id: Date.now().toString(),
      date: today,
      emoji: moodData?.emoji || "😐",
      mood: selectedMood,
      note: moodNote,
      timestamp: Date.now(),
    };

    await StorageUtils.saveMoodEntry(entry);

    setMoodNote("");
    setSelectedMood("");
    setShowModal(false);
    loadMoodEntries();
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-800">Mood Tracker</Text>
        <Text className="text-gray-600 mt-1">Track your daily emotions</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Calendar */}
        <View className="mx-6 mt-6 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <Calendar
            markingType="custom"
            markedDates={markedDates}
            style={{ height: 410 }}
            theme={{
              backgroundColor: "#ffffff",
              calendarBackground: "#ffffff",
              textSectionTitleColor: "#374151",
              selectedDayBackgroundColor: "#14b8a6",
              selectedDayTextColor: "#ffffff",
              todayTextColor: "#14b8a6",
              dayTextColor: "#374151",
              textDisabledColor: "#d1d5db",
              monthTextColor: "#374151",
              arrowColor: "#14b8a6",
              textDayFontWeight: "500",
              textMonthFontWeight: "700",
              textDayHeaderFontWeight: "600",
              textMonthFontSize: 20,
            }}
            dayComponent={({ date, state, marking }) => {
              const emoji = (marking as any)?.customStyles?.text?.text;
              return (
                <View
                  style={{
                    width: 50,
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {date && (
                    <Text
                      style={{
                        fontSize: 14,
                        color: state === "disabled" ? "#d1d5db" : "#374151",
                      }}
                    >
                      {date.day}
                    </Text>
                  )}
                  {emoji && (
                    <Text style={{ fontSize: 18, marginTop: 2 }}>{emoji}</Text>
                  )}
                </View>
              );
            }}
          />
        </View>

        {/* Recent Entries */}
        <View className="mx-6 mt-6 mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Recent Entries
          </Text>
          {moodEntries
            .slice(-5)
            .reverse()
            .map((entry) => (
              <View
                key={entry.id}
                className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-3"
              >
                <View className="flex-row items-center justify-between mb-2">
                  <View className="flex-row items-center">
                    <Text className="text-2xl mr-3">{entry.emoji}</Text>
                    <View>
                      <Text className="font-semibold text-gray-800 capitalize">
                        {entry.mood}
                      </Text>
                      <Text className="text-sm text-gray-500">
                        {new Date(entry.timestamp).toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
                {entry.note && (
                  <Text className="text-gray-600 mt-2 italic">
                    "{entry.note}"
                  </Text>
                )}
              </View>
            ))}
        </View>
      </ScrollView>

      {/* Floating Action Button */}
      <TouchableOpacity
        onPress={() => setShowModal(true)}
        className="absolute bottom-6 right-6 w-16 h-16 bg-green-700 rounded-full items-center justify-center shadow-lg"
      >
        <Plus size={28} color="white" />
      </TouchableOpacity>

      {/* Mood Entry Modal */}
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        className="justify-end m-0"
      >
        <View className="bg-white rounded-3xl p-6">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-xl font-bold text-gray-800">
              How are you feeling today?
            </Text>
            <TouchableOpacity onPress={() => setShowModal(false)}>
              <X size={24} color="#6b7280" />
            </TouchableOpacity>
          </View>

          {/* Mood Selection */}
          <View className="flex-row flex-wrap justify-between mb-6">
            {moodEmojis.map((mood) => {
              const isSelected = selectedMood === mood.mood;
              return (
                <TouchableOpacity
                  key={mood.mood}
                  onPress={() => setSelectedMood(mood.mood)}
                  className={`w-[30%] p-4 rounded-2xl border-2 items-center mb-3 ${
                    isSelected
                      ? "border-green-600 bg-green-50"
                      : "border-gray-200 bg-gray-50"
                  }`}
                >
                  <Text className="text-3xl mb-2">{mood.emoji}</Text>
                  <Text
                    className={`font-medium capitalize ${
                      isSelected ? "text-green-700" : "text-gray-700"
                    }`}
                  >
                    {mood.mood}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Note Input */}
          <TextInput
            value={moodNote}
            onChangeText={setMoodNote}
            placeholder="Add a note about your day (optional)"
            multiline
            numberOfLines={3}
            className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 text-gray-800"
            style={{ textAlignVertical: "top" }}
          />

          {/* Save Button */}
          <TouchableOpacity
            onPress={saveMoodEntry}
            className="bg-primary-500 p-4 rounded-xl items-center"
          >
            <Text className="text-gray-800 font-semibold text-lg">
              Save Entry
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
