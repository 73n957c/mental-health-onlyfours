import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Phone, Chrome as Home } from 'lucide-react-native';

export default function ResultScreen() {
  const { testType, score, maxScore } = useLocalSearchParams<{
    testType: string;
    score: string;
    maxScore: string;
  }>();
  const router = useRouter();

  const testScore = parseInt(score || '0');
  const maxTestScore = parseInt(maxScore || '27');
  const halfScore = maxTestScore / 2;

  const getResultMessage = () => {
    if (testType === 'depression'){
      if (testScore <= 4){
        return {
          title: "None–Minimal Depression",
          message: "Your responses suggest little to no depression symptoms.",
          color: "text-green-700",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          needsSupport: false,
        };
      } else if (testScore <= 9){
        return {
          title: "Mild Depression",
          message: "Mild symptoms detected. Consider self-care and monitoring. Seek help if symptoms worsen.",
          color: "text-amber-700",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          needsSupport: false,
        };
      } else if (testScore <= 14){
        return {
          title: "Moderate Depression",
          message: "Moderate symptoms detected. Talking with a counselor could be beneficial.",
          color: "text-amber-700",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          needsSupport: true,
        };
      } else if (testScore <= 19){
        return {
          title: "Moderately Severe Depression",
          message: "Symptoms indicate moderately severe depression. Professional support is highly recommended.",
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          needsSupport: true,
        };
      } else {
        return {
          title: "Severe Depression",
          message: "Your score indicates severe depression symptoms. Please seek immediate professional help.",
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          needsSupport: true,
        };
      }
    }else if (testType === 'anxiety') {
      if (testScore <= 4){
        return {
          title: "Minimal Anxiety",
          message: "Your responses suggest minimal anxiety symptoms.",
          color: "text-green-700",
          bgColor: "bg-green-50",
          borderColor: "border-green-200",
          needsSupport: false,
        };
      } else if (testScore <= 9) {
        return {
          title: "Mild Anxiety",
          message: "Mild symptoms detected. Talking with a counselor may be helpful.",
          color: "text-amber-700",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          needsSupport: true,
        };
      } else if (testScore <= 14){
        return {
          title: "Moderate Anxiety",
          message: "Symptoms indicate moderate anxiety. Professional support is recommended.",
          color: "text-amber-700",
          bgColor: "bg-amber-50",
          borderColor: "border-amber-200",
          needsSupport: true,
        };
      } else {
        return {
          title: "Severe Anxiety",
          message: "Your score indicates severe anxiety. Please seek professional help as soon as possible.",
          color: "text-red-700",
          bgColor: "bg-red-50",
          borderColor: "border-red-200",
          needsSupport: true,
        };
      }
    } 
    //fallback
    return {
      title: "Unknown Test",
      message: "Could not determine result.",
      color: "text-gray-700",
      bgColor: "bg-gray-50",
      borderColor: "border-gray-200",
      needsSupport: false,
    };
  };

  const resultInfo = getResultMessage();
  const needsSupport = resultInfo.needsSupport;

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-6 py-4 bg-white border-b border-gray-200">
        <View className="flex-row items-center">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Test Results</Text>
        </View>
      </View>

      <ScrollView className="flex-1">
        {/* Score Display */}
        <View className="mx-6 mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <Text className="text-center text-6xl font-bold text-primary-500 mb-4">
            {testScore}
          </Text>
          <Text className="text-center text-gray-600 text-lg mb-2">
            out of {maxTestScore}
          </Text>
          <Text className="text-center text-gray-500 capitalize">
            {testType} Screening Score
          </Text>
        </View>

        {/* Result Interpretation */}
        <View className={`mx-6 mt-6 p-6 ${resultInfo.bgColor} rounded-2xl border ${resultInfo.borderColor}`}>
          <Text className={`text-xl font-bold ${resultInfo.color} mb-3`}>
            {resultInfo.title}
          </Text>
          <Text className={`${resultInfo.color} leading-6`}>
            {resultInfo.message}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="mx-6 mt-6">
          {needsSupport ? (
            <>
              <TouchableOpacity
                onPress={() => router.navigate('/(tabs)/help')}
                className="bg-amber-500 active:bg-amber-600 p-4 rounded-2xl flex-row items-center justify-center mb-4"
              >
                <Phone size={20} color="white" />
                <Text className="text-white font-semibold ml-2 text-lg">Find Counseling Support</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={() => router.navigate('/(tabs)')}
                className="bg-slate-600 active:bg-slate-700 p-4 rounded-2xl flex-row items-center justify-center"
              >
                <Home size={20} color="white" />
                <Text className="text-white font-semibold ml-2 text-lg">Back to Home</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity
              onPress={() => router.navigate('/(tabs)')}
              className="bg-blue-600 active:bg-blue-700 p-4 rounded-2xl flex-row items-center justify-center"
            >
              <Home size={20} color="white" />
              <Text className="text-white font-semibold ml-2 text-lg">Back to Home</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Recommendations */}
        <View className="mx-6 mt-6 mb-8">
          <Text className="text-xl font-bold text-gray-800 mb-4">Recommendations</Text>
          
          <View className="bg-blue-50 p-6 rounded-2xl border border-blue-200">
            <Text className="text-blue-800 font-semibold mb-3">What you can do:</Text>
            <Text className="text-blue-700 leading-6">
              • Track your mood daily using the app{'\n'}
              • Practice relaxation and breathing exercises{'\n'}
              • Maintain regular sleep and exercise routines{'\n'}
              • Connect with friends and family{'\n'}
              • Consider talking to a counselor or therapist{'\n'}
              • Contact emergency services if you have thoughts of self-harm
            </Text>
          </View>
          
          <View className="bg-red-50 p-6 rounded-2xl border border-red-200 mt-4">
            <Text className="text-red-800 font-semibold mb-2">⚠️ Important:</Text>
            <Text className="text-red-700">
              This is a screening tool, not a diagnosis. If you're experiencing thoughts of self-harm or suicide, 
              please call 988 (Suicide & Crisis Lifeline) or go to your nearest emergency room immediately.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}