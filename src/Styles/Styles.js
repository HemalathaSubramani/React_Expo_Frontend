import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    containerCenter: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'lightgrey', // Soft blue background
      alignItems: 'center',
      position: 'relative',
      padding: 20,
    },
    imageContainer: {
      position:'absolute',
    },
    errorMessage:{
      fontSize:16,
      color:'red',
    },
    quadrantContainer: {
      flexDirection: 'row', // Use row layout to arrange images side by side
      flexWrap: 'wrap', // Allow the images to wrap into two rows
      justifyContent: 'space-between', // Distribute space evenly between images
      alignItems: 'center', // Center items vertically
      width: '90%', // Make the container take up the full width of the screen
      height: '50%', // Make it take up 80% of the height of the screen (adjustable)
    },
    tableHeader: {
      flexDirection: 'row',
      backgroundColor: '#007bff', // Blue background for header
      paddingVertical: 12,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    header:{
      fontSize: 25,
      marginBottom: 15,
    },
    input: {
      width: '90%',
      borderWidth: 1,
      borderColor: '#ccc', // Light border color
      borderRadius: 8,
      paddingVertical: 12,
      paddingHorizontal: 15,
      fontSize: 16,
      backgroundColor: '#fff',
      marginBottom: 15,
      shadowColor: '#000', // Subtle shadow to give depth
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3, // Shadow on Android
    },
    passwordContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '90%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
      marginBottom: 15,
      paddingHorizontal: 15,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3,
    },
    passwordInput: {
      flex: 1,
      paddingVertical: 12,
      paddingHorizontal: 2,
      fontSize: 16,
      color: '#333',
    },
    button: {
      backgroundColor: '#007bff', // Blue button for consistency
      padding: 15,
      borderRadius: 8,
      alignItems: 'center',
      width: '90%',
      marginTop: 15,
      shadowColor: '#007bff', // Subtle shadow around the button
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 5, // Shadow on Android
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    error: {
      color: 'red',
      marginBottom: 15,
      fontSize: 14,
    },
    pickerContainer: {
      width: '90%',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#fff',
      marginBottom: 15,
      paddingHorizontal: 15,
      paddingVertical: 12,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowRadius: 5,
      elevation: 3,
    },
    picker: {
      height: 50,
      color: '#333',
    },
    supplyCard: {
      backgroundColor: '#ffffff',
      borderRadius: 12,
      padding: 20,
      marginBottom: 15,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    iconTextContainer: {
      flexDirection: 'row', // Aligns children (icon and text) horizontally
      alignItems: 'center', // Vertically centers the icon and text
      marginBottom: 22, // Adds space below the icon and text
    },
    supplyText: {
      fontSize: 18,
      color: '#34495e', // Darker grey for text
      marginBottom: 12,
      fontFamily: 'Arial', // Use system font for better performance
      lineHeight: 22, // Line height for better spacing
    },
    logout: {
      flexDirection: 'row',
      paddingVertical: 6,
      backgroundColor: '#f44336', // Modern red
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
      elevation: 5,
    },
    tableHeader: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      paddingBottom: 8,
      marginTop: 16,
      backgroundColor: '#007bff',
      paddingHorizontal: 10,
    },
    tableHeaderText: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
      color: 'white',
    },
    tableRow: {
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    tableCell: {
      flex: 1,
      fontSize: 15,
    },    
    totalRow: {
      flexDirection: 'row',
      marginTop: 10,
      paddingTop: 10,
      borderTopWidth: 1,
      borderTopColor: '#000',
    },
    totalLabel: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
    },
    totalValue: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: 16,
    }
  });
  export default styles;