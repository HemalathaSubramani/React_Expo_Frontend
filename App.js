import React, { useState, useEffect ,useRef} from 'react';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Alert,
  Modal,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import HRMLeaveAndPayFile from './src/Screens/HRM/HRMLeaveAndPayFile'
import HRMLeaveCreation from './src/Screens/HRM/HRMLeaveCreation';
import HRMTPayFile from './src/Screens/HRM/HRMTPayFile';
import FACDayBookAndBalance from './src/Screens/FAC/FACDayBookAndBalance';
import FACDayBookReport from './src/Screens/FAC/FACDayBookReport';
import FACBalanceDetails from './src/Screens/FAC/FACBalanceDetails'
import { Picker } from '@react-native-picker/picker'; // Import Picker
import styles from './src/Styles/Styles';

const API_BASE_URL = __DEV__
  ? "http://192.168.10.71:8081"
  : "https://71a7-2401-4900-1f2b-19c5-4004-f812-e177-db7a.ngrok-free.app";


const Stack = createStackNavigator();

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const usernameInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  useEffect(() => {
    usernameInputRef.current.focus();
  },[])

  const handleLogin = async () => {
    Keyboard.dismiss();
    setLoading(true);
    setErrorMessage('');

    const requestData = {
      mautUsername: username.trim(),
      mautPassword: password.trim(),
      // mrolid: role.trim(),
    };
    try {
      const response = await fetch(`${API_BASE_URL}/user/login`, {
        method: 'POST',
        headers: {
           'Content-Type': 'application/json', 
             'Accept': 'application/json'
          },
        
        body: JSON.stringify(requestData),
        redirect: 'manual', 
      });
      console.log('Method:', response.method); 
      if (!response.ok) {
        const errorText = await response.text();
        setErrorMessage(errorText || 'Login failed, please check your credentials.');
        return;
      }
  
      const responseText = await response.text();
      if (responseText.trim().toLowerCase() === 'login successful') {
        // Navigate if login is successful
        navigation.navigate('Home',{username : username.trim()});
      } else {
        // Handle case where the server doesn't return the expected success message
        setErrorMessage('Login failed, please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error); // Log full error
      setErrorMessage(`Network error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.containerCenter}>
        <Text style={styles.header}>MediaErp</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            ref={usernameInputRef}
            style={styles.passwordInput}
            placeholder="Username"
            value={username}
            onChangeText={(text) => setUsername(text.toUpperCase())}
            onSubmitEditing={() => passwordInputRef.current.focus()}
          />
          <TouchableOpacity>
            <Ionicons name="person" size={24} color="gray"></Ionicons>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            ref={passwordInputRef}
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Ionicons name={showPassword ? 'eye' : 'eye-off'} size={24} color="gray" />
          </TouchableOpacity>
        </View>
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        {errorMessage ? (
           <Text style={styles.errorMessage}>{errorMessage}</Text>
      ) : null}
      </View>
    </TouchableWithoutFeedback>
)};

const HomeScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    if (username.trim() !== '') {
      fetchRolesByUserName(username);
    }
  }, [username]);

  const fetchRolesByUserName = async (username) => {
    try {
      const encodedUsername = encodeURIComponent(username);
      const responseUrl = await fetch(`${API_BASE_URL}/user/role/${encodedUsername}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await responseUrl.json();
      if (data) {
        setRoles(data);
      }
    } catch (error) {
      console.log('Error fetching roles:', error);
    }
  };

  const hasRole = (...rolesToCheck) => {
    return rolesToCheck.some(role => roles.includes(role));
  };

  const showAlert = (rolesToCheck) => {
    const rolesString = rolesToCheck.join(', '); // Convert array to string
    Alert.alert(
      "Role Not Assigned",
      `You do not have access to this role`,
      [{ text: "OK" }],
      { cancelable: false }
    );
  };

  return (
    <View style={styles.containerCenter}>
      <View style={styles.quadrantContainer}>
        {/* Top-left image */}
        <TouchableOpacity 
          style={[styles.imageContainer, { top: 20, left: 20 }]}
          onPress={() => {
            const rolesToCheck = ["18", "19", "3"];
            if (!hasRole(...rolesToCheck)) {
              showAlert(rolesToCheck); // Pass array to showAlert
            } else {
              navigation.navigate('CollectionSupplySelection');
            }
          }}
          // disabled={!hasRole("18", "19", "3")}
        >
          <Image source={require('./assets/circulation_up.jpg')} style={styles.image} />
        </TouchableOpacity>

        {/* Top-right image */}
        <TouchableOpacity 
          style={[styles.imageContainer, { top: 20, right: 20 }]}
          onPress={() => {
            const rolesToCheck = ["13", "14", "21", "3"];
            if (!hasRole(...rolesToCheck)) {
              showAlert(rolesToCheck); // Pass array to showAlert
            } else {
              navigation.navigate('CollectionSupplySelection');
            }
          }}
          // disabled={!hasRole("13", "14", "21", "3")}
        >
          <Image source={require('./assets/ad_up.jpg')} style={styles.image} />
        </TouchableOpacity>

        {/* Bottom-left image */}
        <TouchableOpacity 
          style={[styles.imageContainer, { bottom: 20, left: 20 }]}
          onPress={() => {
            const rolesToCheck = ["1", "2", "3", "4", "5"];
            if (!hasRole(...rolesToCheck)) {
              showAlert(rolesToCheck); // Pass array to showAlert
            } else {
              navigation.navigate('HRMLeaveAndPayFile');
            }
          }}
          // disabled={!hasRole("1", "2", "3", "4", "5")}
        >
          <Image source={require('./assets/hr_up.jpg')} style={styles.image} />
        </TouchableOpacity>

        {/* Bottom-right image */}
        <TouchableOpacity 
          style={[styles.imageContainer, { bottom: 20, right: 20 }]}
          onPress={() => {
            const rolesToCheck = ["9", "22", "25"];
            if (!hasRole(...rolesToCheck)) {
              showAlert(rolesToCheck); // Pass array to showAlert
            } else {
              navigation.navigate('FACDayBookAndBalance');
            }
          }}
          // disabled={!hasRole("9", "22", "25")}
        >
          <Image source={require('./assets/accounts_up.jpg')} style={styles.image} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const CollectionSupplySelection = ({ navigation }) => {
  return (
    <View style={styles.containerCenter}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CollectionSupply', { type: 'Collection' })}>
        <Text style={styles.buttonText}>Collection</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CollectionSupply', { type: 'Supply' })}>
        <Text style={styles.buttonText}>Supply</Text>
      </TouchableOpacity>
    </View>
  );
};

const CollectionSupplyScreen = ({ route, navigation }) => {
  const { type } = route.params;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    // Navigate based on the type (Collection or Supply)
    if (type === 'Supply') {
      navigation.navigate('SupplyDetailsScreen', { date: date.toISOString().split('T')[0] });
    } else if (type === 'Collection') {
      navigation.navigate('ResultsScreen', { date: date.toISOString().split('T')[0], type });
    }
  };

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.header}>{type}</Text>
      <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
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
};

const ResultsScreen = ({ route }) => {
  const { date, type } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = type === 'Supply' ? `${API_BASE_URL}/supply/copies?date=${date}` : `${API_BASE_URL}/receipts/by-date?date=${date}`;
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
      })
      .catch((error) => console.error('Error fetching data:', error))
      .finally(() => setLoading(false));
  }, [date, type]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="sad" size={26} color="red"></Ionicons>
        <Text style={styles.header}>No records found for</Text>
        <Text style={styles.header}>{formatDate(date)}</Text>
      </View>
    );
  }
  return (
    <View style={styles.containerCenter}>
      <Text style={styles.header}>Collection Amount In</Text>
      <Text style={styles.header}>{formatDate(date)}</Text>
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={styles.supplyCard}>
          <Text style={styles.supplyText}>Total Amount: {parseFloat(item.trecAmount).toFixed(2)}</Text>
          <Text style={styles.supplyText}>Pay Mode: {item.commPaymode}</Text>
          <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

var formatDate = (dateString) => {
  var date = new Date(dateString);
  var options = { year: 'numeric', month: 'short', day: 'numeric' };
  return date.toLocaleDateString('en-GB', options).replace(/ /g, ' - ');
};

const SupplyDetailsScreen = ({ route }) => {
  const { date } = route.params;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSupplyDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/supply/copies?date=${date}`);
        const responseData = await response.json();
        setData(responseData);
      } catch (error) {
        console.error('Error fetching supply details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSupplyDetails();
  }, [date]);

  if (loading) {
    return <ActivityIndicator size="large" color="#007bff" style={styles.loading} />;
  }

  if (data.length === 0) {
    return (
      <View style={styles.containerCenter}>
        <Ionicons name="sad" size={28} color="red"></Ionicons>
        <Text style={styles.header}>No supply details found for</Text>
        <Text style={styles.header}>{formatDate(date)}</Text>
      </View>
    );
  }

  return (
    <View style={styles.containerCenter}>
      <Text style={styles.header}>Supply Details for</Text>
      <Text style={styles.header}>{formatDate(date)}</Text>
      <ScrollView>
        {data.map((item, index) => (
          <View key={index} style={styles.supplyCard}>
            <Text style={styles.supplyText}>Total Copies: {item.tporcopiestotal}</Text>
            <Text style={styles.supplyText}>Total Posters: {item.tporpostertotal}</Text>
            <View style={styles.divider} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CollectionSupplySelection" component={CollectionSupplySelection} />
        <Stack.Screen name="CollectionSupply" component={CollectionSupplyScreen} />
        <Stack.Screen name="ResultsScreen" component={ResultsScreen} />
        <Stack.Screen name="SupplyDetailsScreen" component={SupplyDetailsScreen} />
        <Stack.Screen name="HRMLeaveAndPayFile" component={HRMLeaveAndPayFile}/>
        <Stack.Screen name="HRMLeaveCreation" component={HRMLeaveCreation}/>
        <Stack.Screen name="HRMTPayFile" component={HRMTPayFile}/>
        <Stack.Screen name="FACDayBookAndBalance" component={FACDayBookAndBalance}/>
        <Stack.Screen name='FACDayBookReport' component={FACDayBookReport}/>
        <Stack.Screen name='FACBalanceDetails' component={FACBalanceDetails}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}