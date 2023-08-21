import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/news.png')} // Replace with your splash image
        style={styles.splashImage}
        resizeMode="cover"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Set the background color of your splash screen
  },
  splashImage: {
    // width: '100%', // Adjust image width as needed
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height + 20,

  },
});

export default SplashScreen;
