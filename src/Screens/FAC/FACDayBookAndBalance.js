import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles/Styles';
const API_BASE_URL = __DEV__ ? "http://192.168.10.71:8081" : "https://react-expo-javabackend.onrender.com"
const FACDayBookAndBalance = ({navigation}) =>
{
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              style={[{ flexDirection: 'row', alignItems: 'center', marginRight: 16},styles.logout]}
            >
              <Ionicons name="log-out-outline" size={22} color="#000" />
              <Text style={{ color: '#000', marginLeft: 6 }}>Logout</Text>
            </TouchableOpacity>
          ),
        });
      }, [navigation]); 
    return(
        <View style={styles.containerCenter}>
            <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('FACDayBookReport')}>
                <Text style={styles.buttonText}>DayBook</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('FACBalanceDetails')}>
                <Text style={styles.buttonText}>Trial Balance</Text>
            </TouchableOpacity>
        </View>
    );
}
export default FACDayBookAndBalance;