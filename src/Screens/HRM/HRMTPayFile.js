import React, { useState, useEffect, useLayoutEffect} from "react";
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import styles from '../../Styles/Styles';
import DateTimePicker from '@react-native-community/datetimepicker';

const API_BASE_URL = "https://react-expo-javabackend.onrender.com";

const HRMTPayFile = ({ route, navigation }) => {
    const [selectedDate, setSelectedDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [payamount, setPayAmount] = useState(null);
    const [showDatePicker, setShowDatePicker] = useState(false);  // Added the state for date picker visibility

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    style={[{ flexDirection: 'row', alignItems: 'center', marginRight: 16 }, styles.logout]}
                >
                    <Ionicons name="log-out-outline" size={22} color="#000" />
                    <Text style={{ color: '#000', marginLeft: 6 }}>Logout</Text>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    const formatDate = (date) => {
        return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: '2-digit' }).format(date);
    };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        if (selectedDate) {
            const fetchAmountPerMonth = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${API_BASE_URL}/pay/by-month/${selectedDate.toISOString().split('T')[0]}`);
                    const responseData = await response.json();
                    if (typeof responseData === 'number') {
                        setPayAmount(responseData);
                    } else {
                        setPayAmount('Error: No data available');
                    }
                } catch (error) {
                    setPayAmount('Error: Unable to fetch data');
                } finally {
                    setLoading(false);
                }
            };
            fetchAmountPerMonth();
        }
    }, [selectedDate]);

    const handleBackPress = () => {
        setSelectedDate(null);  // Reset the selected date
        navigation.navigate('HRMTPayFile');  // Navigate explicitly to the Select Date screen
    };

    // This block is for rendering the component when no date is selected
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
                        value={new Date()}
                        mode="date"
                        display="default"
                        onChange={(event, date) => {
                            setShowDatePicker(false);
                            if (event.type === 'set' && date) {
                                handleDateSelect(date); // Handle the date selection and navigation
                            }
                        }}
                    />
                )}
            </View>
        );
    }

    // This block is for loading state when fetching the pay amount
    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
    }

    // This block is for rendering when a date is selected and the pay amount is fetched
    return (
        <View style={styles.containerCenter}>
            <View style={styles.dateContainer}>
                <Text style={styles.header}>Total Pay Amount for</Text>
                <Text style={styles.header}>{formatDate(selectedDate)}</Text>
            </View>
            <ScrollView style={styles.ScrollView}>
                {payamount ? (
                    <View style={styles.supplyCard}>
                        <Text style={styles.supplyText}>Total PayAmount : {parseFloat(payamount).toFixed(2)}</Text>
                    </View>
                ) : (
                    <View style={styles.containerCenter}>
                        <Ionicons name='sad' size={24} color="red" />
                        <Text style={styles.supplyText}>No data available</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default HRMTPayFile;
