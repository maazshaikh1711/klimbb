// To display Header for News Tiles List Screen
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Header = ({AppName, onRefreshPress, onDripTimerPress}) => {
  return (
    <View style={styles.header}>
      {/* App Name Title */}
      <Text style={styles.appName}>{AppName}</Text>
      
      <View style={styles.buttonsContainer}>
        {/* Refresh button */}
        <TouchableOpacity style={styles.button} onPress={onRefreshPress}>
          <Icon name="refresh" size={30} color="#BB86FC" />
        </TouchableOpacity>

        {/* Driptimer button */}
        <TouchableOpacity style={styles.button} onPress={onDripTimerPress}>
          <Icon name="settings-suggest" size={30} color="#BB86FC" />
        </TouchableOpacity>
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
    color: "#BB86FC"
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
