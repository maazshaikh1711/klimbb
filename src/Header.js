import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Header = ({AppName, onRefreshPress}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.appName}>{AppName}</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={onRefreshPress}>
          <Text style={styles.buttonText}>Refresh</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Button 2</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    padding: 10,
    marginBottom: 30,
    backgroundColor: '#666666',
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white"
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingHorizontal: 5,
    paddingVertical: 5,
    // backgroundColor: '#3498db',
    // borderRadius: 5,
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 15
  },
});

export default Header;