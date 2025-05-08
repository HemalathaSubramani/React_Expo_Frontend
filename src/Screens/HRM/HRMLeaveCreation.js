import React, { useState, useEffect , useLayoutEffect} from 'react';
import { View, Text, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using expo
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from '../../Styles/Styles';

const API_BASE_URL = "https://react-expo-javabackend.onrender.com";

const HRMLeaveCreation = ({ route ,navigation}) => {
    const [data, setData] = useState([]);
    const [selectedDate, setSelectedDate] = useState(null); // Initially, no date is selected
    const [loading, setLoading] = useState(true);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [leaveDays, setLeaveDays] = useState(null);

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
            const fetchLeaveDaysCount = async () => {
                try {
                    setLoading(true);
                    const response = await fetch(`${API_BASE_URL}/leave/by-date/${selectedDate.toISOString().split('T')[0]}`);
                    
                    // Check if response is ok (i.e. status 200)
                    if (!response.ok) {
                        throw new Error('Error: Response not OK');
                    }
        
                    const responseData = await response.json();
        
                    // Handle if responseData is a number directly
                    if (typeof responseData === 'number') {
                        setLeaveDays(responseData);  // If response is a number, set it directly
                    }
                    // Handle if responseData is an object and contains 'leaveDays'
                    // else if (responseData && typeof responseData.leaveDays === 'number') {
                    //     setLeaveDays(responseData.leaveDays);  // Set leaveDays if it exists as a number in the response
                    // }
                    else {
                        setLeaveDays('Error: No data available');
                    }
                } catch (error) {
                    setLeaveDays('Error: Unable to fetch data');
                } finally {
                    setLoading(false);
                }
            };
        
            fetchLeaveDaysCount();        
        }
    }, [selectedDate]);

    const handleBackPress = () => {
        setSelectedDate(null);  // Reset the selected date
        navigation.navigate('SelectDateScreen');  // Navigate explicitly to the Select Date screen
    };
    
    if (!selectedDate) {
        // Show only date picker if no date is selected
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

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
    }

    return (
        <View style={styles.containerCenter}>
            {/* Date Section */}
            <View style={styles.dateContainer}>
                <Text style={styles.header}>Leave Details for</Text>
                <Text style={styles.header}>{formatDate(selectedDate)}</Text>
            </View>

            <ScrollView style={styles.scrollView}>
                {leaveDays ? (
                    <View style={styles.supplyCard}>
                        <Text style={styles.supplyText}>Total leave: {leaveDays} {leaveDays > 0 ? "Member" : "Members"}</Text>
                    </View>
                ) : (
                    <View style={styles.containerCenter}>
                        <Ionicons name='sad' size={24} color="red"></Ionicons>
                        <Text style={styles.header}>No data available</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
};

export default HRMLeaveCreation;
