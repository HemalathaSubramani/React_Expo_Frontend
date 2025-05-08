import React,{ useLayoutEffect } from "react"
import {View, Text, TouchableOpacity} from "react-native"
import styles from '../../Styles/Styles';
import { Ionicons } from "@expo/vector-icons"

const API_BASE_URL="http://192.168.10.71:8081";
const ADVTSection = ({navigation}) => {
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
                <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('ADVTCollection')}>
                    <Text style={styles.buttonText}>Collection</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() =>navigation.navigate('ADVTCreditNote')}>
                    <Text style={styles.buttonText}>Credit Note</Text>
                </TouchableOpacity>
            </View>
      );
    
}
export default ADVTSection;