import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import styles from '../../Styles/Styles';
const API_BASE_URL = "http://192.168.10.71:8081";
const FACDayBookAndBalance = ({navigation}) =>
{
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