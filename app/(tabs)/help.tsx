import React from 'react';
import { Linking, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// --- Mock Data ---
const emergencySupport = {
  crisisHotline: '988',
  emergency: '911',
};

const universityServices = [
  {
    title: 'University Counseling Center',
    description: 'Professional counselors available for individual sessions',
    contact: {
      phone: '(555) 123-4567',
      email: 'counseling@university.edu',
      hours: 'Monday-Friday, 9AM-5PM',
    },
    action: 'Book Appointment',
  },
  {
    title: 'Student Mental Health Services',
    description: 'Specialized support for academic stress and anxiety',
    contact: {
      phone: '(555) 234-5678',
      email: 'mentalhealth@university.edu',
      hours: 'Monday-Friday, 8AM-6PM',
    },
    action: 'Book Appointment',
  },
  {
    title: 'Peer Support Groups',
    description: 'Connect with other students in group therapy sessions',
    contact: {
      phone: '(555) 345-6789',
      email: 'peergroup@university.edu',
      hours: 'Tuesdays & Thursdays, 7PM-8PM',
    },
    action: 'Book Appointment',
  },
];

const additionalResources = [
  'Online therapy platforms (BetterHelp, Talkspace)',
  'Campus meditation groups',
  'Academic stress workshops',
  'Self-care and mindfulness apps',
];

// Main App component
const App = () => {
  const makePhoneCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  const sendEmail = (emailAddress: string) => {
    Linking.openURL(`mailto:${emailAddress}`);
  };

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.headerIcon}>
            {`\u{1F399}\uFE0F`}
          </Text>
          <Text style={styles.headerTitle}>Counseling Support</Text>
          <Text style={styles.headerSubtitle}>Professional help is always available</Text>
        </View>

        {/* Emergency Support Card */}
        <View style={[styles.card, styles.emergencyCard]}>
          <View style={styles.emergencyTitleContainer}>
            <Text style={styles.emergencyIcon}>
              {`\u26A0\uFE0F`}
            </Text>
            <Text style={styles.emergencyTitle}>Emergency Support</Text>
          </View>
          <Text style={styles.emergencyText}>
            If you're having thoughts of self-harm or suicide, please reach out immediately.
          </Text>
          <View style={styles.emergencyButtonsContainer}>
            <TouchableOpacity onPress={() => makePhoneCall(emergencySupport.crisisHotline)} style={[styles.emergencyButton, { backgroundColor: '#c75151' }]}>
              <Text style={styles.emergencyButtonText}>Crisis Hotline: {emergencySupport.crisisHotline}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => makePhoneCall(emergencySupport.emergency)} style={[styles.emergencyButton, { backgroundColor: '#c75151' }]}>
              <Text style={styles.emergencyButtonText}>Emergency: {emergencySupport.emergency}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* University Services Section */}
        <Text style={styles.sectionTitle}>University Services</Text>
        {universityServices.map((service, index) => (
          <View key={index} style={[styles.card, styles.serviceCard]}>
            <Text style={styles.cardTitle}>{service.title}</Text>
            <Text style={styles.cardDescription}>{service.description}</Text>
            <View style={styles.contactDetails}>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>{`\u260E\uFE0E`}</Text>
                <Text style={styles.contactInfo} onPress={() => makePhoneCall(service.contact.phone)}>
                  {service.contact.phone}
                </Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>{`\u2709\uFE0E`}</Text>
                <Text style={styles.contactInfo} onPress={() => sendEmail(service.contact.email)}>
                  {service.contact.email}
                </Text>
              </View>
              <View style={styles.contactRow}>
                <Text style={styles.icon}>{`\u23F1\uFE0E`}</Text>
                <Text style={styles.contactInfo}>
                  {service.contact.hours}
                </Text>
              </View>
            </View>
            <TouchableOpacity style={styles.bookButton} onPress={() => {/* Book appointment logic */}}>
              <Text style={styles.bookButtonText}>{service.action}</Text>
            </TouchableOpacity>
          </View>
        ))}

        {/* Additional Resources Section */}
        <Text style={styles.sectionTitle}>Additional Resources</Text>
        <View style={[styles.card, styles.resourcesCard]}>
          {additionalResources.map((resource, index) => (
            <Text key={index} style={styles.resourceText}>{`\u2022 ${resource}`}</Text>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  container: {
    padding: 20,
    backgroundColor: '#f0f2f5',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  headerIcon: {
    fontSize: 50,
    color: '#8e44ad',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#777',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  emergencyCard: {
    backgroundColor: '#fbe9e7', // Light pink background
  },
  emergencyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  emergencyIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  emergencyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c75151',
  },
  emergencyText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 15,
  },
  emergencyButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emergencyButton: {
    flex: 1,
    padding: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  emergencyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 15,
  },
  serviceCard: {
    backgroundColor: '#f2e7f8', // Light purple background
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4a235a',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6c5b7b',
    marginBottom: 10,
  },
  contactDetails: {
    marginTop: 10,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    fontSize: 16,
    marginRight: 10,
    color: '#4a235a',
  },
  contactInfo: {
    fontSize: 14,
    color: '#4a235a',
    textDecorationLine: 'underline',
  },
  bookButton: {
    backgroundColor: '#c491d9', // Purple button
    padding: 12,
    borderRadius: 10,
    marginTop: 15,
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resourcesCard: {
    backgroundColor: '#e7f2f8', // Light blue background
  },
  resourceText: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
});

export default App;
