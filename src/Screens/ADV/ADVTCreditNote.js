import React ,{useState, useEffect, useLayoutEffect}from "react";
import {Text, View, TouchableOpacity, ScrollView, ActivityIndicator} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker
import styles from '../../Styles/Styles';

const API_BASE_URL = __DEV__ ? "http://192.168.10.71:8081" : "https://react-expo-javabackend.onrender.com";

const ADVTCreditNote = ({route, navigation}) => {
    const[date, setDate] = useState(null);
    const[loading, setLoading] = useState(false);
    const[showDatePicker, setShowDatePicker] = useState(false);
    const[data, setData] = useState([]);

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

    const fetchCreditDetails = async() => {
        try{
            setLoading(false);
            const response = await fetch(`${API_BASE_URL}/advt/credit/${date.toISOString().split('T')[0]}`);
            const responseData = await response.json();
            if(Array.isArray(responseData)){
                setData(responseData);
            }
            else if (!isNaN(responseData)) {
                // If API returned a single number
                setData([{ data: responseData }]);
            }
            else
            {
                setData([]);
            }
        }
        catch(error){
            console.log("No Data Available");
        }
        finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        if(date){
            fetchCreditDetails();
        }
    },[date]);

    const handleBackPress = () => {
        setDate(null);  
        setShowDatePicker(false);// Reset the selected date
        navigation.goBack();  // Navigate explicitly to the Select Date screen
    };

    if(!date){
        return(
            <View style={styles.containerCenter}>
                <Text style={styles.header}>Please Select a Date</Text>
                <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.buttonText}>Select a Date</Text>
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
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
    }

    if(data.length === 0)(
        <View style={styles.containerCenter}>
        <Ionicons name="sad" size={28} color="red"></Ionicons>
        <Text style={styles.header}>No Credit Amount found on</Text>
        <Text style={styles.header}>{formatDate(date)}</Text>
    </View>
    );

    return(
        <View style={styles.containerCenter}>
            <View style={styles.dateContainer}>
                <Text style={styles.header}>Total Collection Amount on</Text>
                <Text style={styles.header}>{formatDate(date)}</Text>
            </View>
            <ScrollView>
                {data.map((item,index) => (
                    <View key={index} style={styles.supplyCard}>
                        <Text style={styles.supplyText}>Credit Amount: {parseFloat(item.data).toFixed(2)}</Text>
                        <View style={styles.divider} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};
export default ADVTCreditNote;

