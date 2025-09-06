import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, CircleCheck as CheckCircle } from 'lucide-react-native';

const depressionQuestions = [
  {
    id: 1,
    question: "Over the past two weeks, how often have you felt down, depressed, or hopeless?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 2,
    question: "Little interest or pleasure in doing things?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 3,
    question: "Trouble falling or staying asleep, or sleeping too much?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 4,
    question: "Feeling tired or having little energy?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 5,
    question: "Poor appetite or overeating?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  }
];

const anxietyQuestions = [
  {
    id: 1,
    question: "Over the past two weeks, how often have you felt nervous, anxious, or on edge?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 2,
    question: "Not being able to stop or control worrying?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 3,
    question: "Worrying too much about different things?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 4,
    question: "Trouble relaxing?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  },
  {
    id: 5,
    question: "Being so restless that it's hard to sit still?",
    options: [
      { text: "Not at all", score: 0 },
      { text: "Several days", score: 1 },
      { text: "More than half the days", score: 2 },
      { text: "Nearly every day", score: 3 }
    ]
  }
];

export default function TestScreen() {
  const { testType } = useLocalSearchParams<{ testType: "depression" | "anxiety" }>();
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const questions = testType === 'depression' ? depressionQuestions : anxietyQuestions;
  const testTitle = testType === 'depression' ? 'Depression Screening' : 'Anxiety Screening';

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = score;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate total score and navigate to results
      const totalScore = newAnswers.reduce((sum, score) => sum + score, 0);
      router.push({
        pathname: '/tests/result',
        params: { testType, score: totalScore.toString(), maxScore: questions.length * 3 + "" }
      });
    }
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={goBack} className="mr-4">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-xl font-bold text-gray-800">{testTitle}</Text>
            <Text className="text-gray-600">Question {currentQuestion + 1} of {questions.length}</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Progress Bar */}
        <View className="mx-6 mt-6 mb-6">
          <View className="bg-gray-200 rounded-full h-2">
            <View 
              className="bg-blue-500 h-2 rounded-full"
              style={{ width: `${((currentQuestion) / questions.length) * 100}%` }}
            />
          </View>
        </View>

        {/* Question */}
        <View className="mx-6 mb-8">
          <View className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6">
            <Text className="text-lg font-semibold text-gray-800 leading-7">
              {questions[currentQuestion].question}
            </Text>
          </View>

          {/* Answer Options */}
          <View className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleAnswer(option.score)}
                className={`p-4 rounded-xl border-2 flex-row items-center ${
                  answers[currentQuestion] === option.score 
                    ? 'border-primary-500 bg-primary-50' 
                    : 'border-gray-200 bg-white'
                }`}
              >
                <View className={`w-6 h-6 rounded-full border-2 mr-4 items-center justify-center ${
                  answers[currentQuestion] === option.score
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-gray-300'
                }`}>
                  {answers[currentQuestion] === option.score && (
                    <CheckCircle size={16} color="white" />
                  )}
                </View>
                <Text className={`flex-1 font-medium ${
                  answers[currentQuestion] === option.score
                    ? 'text-primary-700'
                    : 'text-gray-700'
                }`}>
                  {option.text}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Disclaimer */}
        <View className="mx-6 mb-8">
          <View className="bg-blue-50 p-4 rounded-xl border border-blue-200">
            <Text className="text-blue-800 text-sm">
              <Text className="font-semibold">Disclaimer:</Text> This screening tool is not a diagnosis. 
              If you have concerns about your mental health, please consult with a healthcare professional.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}