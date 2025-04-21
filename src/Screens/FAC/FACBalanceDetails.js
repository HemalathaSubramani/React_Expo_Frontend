import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import styles from '../../Styles/Styles';

const API_BASE_URL = "http://192.168.10.71:8081";

const FACBalanceDetails = ({ route, navigation }) => {
    const [date, setDate] = useState(null);  // Initialize date to null
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [data, setData] = useState([]);

    const formatDate = (date) => {
        // Ensure that the date passed is a valid Date object
        if (date instanceof Date && !isNaN(date)) {
            return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
        }
        return '';  // Return an empty string if invalid date
    };

    const handleDateSelect = (date) => {
        setDate(date); // Set the selected date
    };

    useEffect(() => {
        if (date) {
            const fetchDayDetails = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${API_BASE_URL}/fac/bal/${date.toISOString().split('T')[0]}`);
                    const responseData = await response.json();
                    // console.log(">>>"+JSON.stringify(responseData,null,2))
                    if(Array.isArray(responseData)){
                        setData(responseData); // Assuming the response contains an array of data
                    }
                    else{
                        setData([]);
                    }
                    
                } catch (error) {
                    console.log('Error: No Data available');
                } finally {
                    setLoading(false);
                }
            }
            fetchDayDetails();
        }
    }, [date]);  // Update the dependency to `date` instead of `setDate`

    const handleBackPress = () => {
        setDate(null);  // Reset the selected date
        navigation.navigate('FACDayBookDetails');  // Navigate explicitly to the Select Date screen
    };

    if (!date) {
        return (
            <View style={styles.containerCenter}>
                <Text style={styles.header}>Please select a date</Text>
                <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.buttonText}>Select Date</Text>
                </TouchableOpacity>

                {/* Date Picker */}
                {showDatePicker && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (event.type === 'set' && selectedDate) {
                                handleDateSelect(selectedDate); // Handle the date selection and navigation
                            }
                        }}
                    />
                )}
            </View>
        );
    }

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
    }

    if(data.length === 0){
        return(
            <View style={styles.containerCenter}>
                <Ionicons name="sad" size={28} color="red" />
                <Text style={styles.header}>No Book Balance found for</Text>
                <Text style={styles.header}>{formatDate(date)}</Text>
            </View>
        );
    }

    return (
        <View style={styles.containerCenter}>
            <View style={styles.dateContainer}>
                <Text style={styles.header}>Total Pay Amount for</Text>
                <Text style={styles.header}>{formatDate(date)}</Text>
            </View>
            <ScrollView>
                {data.map((item, index) => (
                    <View key={index} style={styles.supplyCard}>
                        <Text style={styles.supplyText}>Debit Amount: {item.mldgname}</Text>
                        <Text style={styles.supplyText}>Credit Amount: {parseFloat(item.balance).toFixed(2)}</Text>
                        <View style={styles.divider} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export default FACBalanceDetails;
