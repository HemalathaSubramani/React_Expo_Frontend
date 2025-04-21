import React,{ useState, useEffect } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../../Styles/Styles';
const API_BASE_URL = "http://192.168.10.71:8081";
const HRMLeaveAndPayFile = ({navigation}) => {
    return(
            <View style={styles.containerCenter}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HRMLeaveCreation')}>
                    <Text style={styles.buttonText}>Leave Counts</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HRMTPayFile')}>
                    <Text style={styles.buttonText}>Monthly Pay</Text>
                </TouchableOpacity>
            </View>
    );
};

export default HRMLeaveAndPayFile;