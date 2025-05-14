import React, { useState, useEffect ,useLayoutEffect} from "react";
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import styles from '../../Styles/Styles';

const API_BASE_URL = __DEV__ ? "http://192.168.10.71:8081" : "https://react-expo-javabackend.onrender.com";

const FACBalanceDetails = ({ route, navigation }) => {
    const [date, setDate] = useState(null);  // Initialize date to null
    const [loading, setLoading] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [data, setData] = useState([]);

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
        navigation.navigate('FACDayBookReport');  // Navigate explicitly to the Select Date screen
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
                <Text style={styles.header}>Total Pay Amount for</Text>
                <Text style={styles.header}>{formatDate(date)}</Text>

                <View style={styles.tableHeader}>
                    <Text style={styles.tableHeaderText}>Bank</Text>
                    <Text style={styles.tableHeaderText}>Debit Amount</Text>
                    <Text style={styles.tableHeaderText}>Credit Amount</Text>
                </View>

                <ScrollView style={{width: '100%'}}>
                    {data.map((item, index) => {
                        const balance = parseFloat(item.balance).toFixed(2);
                        const isDebit = balance >=0;
                        const debitAmount = isDebit ? balance : 0.00;
                        const creditAmount = !isDebit ? Math.abs(balance).toFixed(2) : 0.00;
                        return(
                        <View key={index} style={styles.tableRow}>
                            <View style={styles.tableCellWithBorder}>
                                <Text style={styles.tableCell}>{item.mldgname}</Text>
                            </View>
                            <View style={styles.tableCellWithBorder}>
                                <Text style={styles.tableCell}>{debitAmount}</Text>
                            </View>
                            <View style={styles.tableCellWithBorder}>
                                <Text style={styles.tableCell}>{creditAmount}</Text>
                            </View>
                        </View>
                    )
                })}
                </ScrollView>
            
        </View>
    );
};

export default FACBalanceDetails;
