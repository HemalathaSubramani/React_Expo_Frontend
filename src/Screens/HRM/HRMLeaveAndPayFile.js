import React,{ useState, useEffect ,useLayoutEffect } from 'react';
import { TouchableOpacity, View, Text} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../Styles/Styles';
const API_BASE_URL = "https://react-expo-javabackend.onrender.com";
const HRMLeaveAndPayFile = ({navigation}) => {
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