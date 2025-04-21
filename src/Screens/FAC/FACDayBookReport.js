import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import styles from '../../Styles/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from '@react-navigation/native'; // Import the useFocusEffect hook

const API_BASE_URL = "http://192.168.10.71:8081";

const FACDayBookReport = ({ route, navigation }) => {
  const [selectedDate, setSelectedDate] = useState(null);  // Start with null until a date is selected
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);  // To control DatePicker visibility

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
  };

  const handleDateSelect = (event, selectedDate) => {
    if (event.type === 'set' && selectedDate) {
      setSelectedDate(selectedDate); // Update selected date state
      setShowDatePicker(false); // Hide the date picker after selection
    } else {
      setShowDatePicker(false); // Hide the date picker if canceled
    }
  };

  const handleBackPress = () => {
    setSelectedDate(null);  // Reset the selected date
    navigation.navigate('SelectDateScreen');  // Navigate explicitly to the Select Date screen
  };
  const fetchDayBookDetails = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/FAC/journal/${selectedDate.toISOString().split('T')[0]}`);
      const responseData = await response.json();
      if(Array.isArray(responseData)){
        setData(responseData);
      }
      else{
        setData([]);
      }
      
    } catch (error) {
      console.log('Error fetching Day Book Details ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchDayBookDetails();
    }
  }, [selectedDate]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
  }

  if (!selectedDate) {
    return (
      <View style={styles.containerCenter}>
        <Text style={styles.header}>Please select a date</Text>
        <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.buttonText}>Select Date</Text>
        </TouchableOpacity>

        {/* Date Picker */}
        {showDatePicker && (
          <DateTimePicker
            value={new Date()} // Initial value to the current date
            mode="date"
            display="default"
            onChange={handleDateSelect}
          />
        )}
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="sad" size={28} color="red" />
        <Text style={styles.header}>No DayBook details found for</Text>
        <Text style={styles.header}>{formatDate(selectedDate)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.header}>Day Book Details for</Text>
      <Text style={styles.header}>{formatDate(selectedDate)}</Text>

      {/* DateTimePicker Component */}
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate || new Date()}  // If selectedDate is null, use current date
          mode="date"
          display="default"
          onChange={handleDateSelect}
        />
      )}

      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={styles.supplyCard}>
            <Text style={styles.supplyText}>Debit Amount: {parseFloat(item.tjoddbamt).toFixed(2)}</Text>
            <Text style={styles.supplyText}>Credit Amount: {parseFloat(item.tjodcramt).toFixed(2)}</Text>
            <Text style={styles.supplyText}>Ledger Type: {item.mldgcbg}</Text>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default FACDayBookReport;
