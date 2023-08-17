import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TileCard = ({ title, shortDescription, onPress }) => {

  return (
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{shortDescription}</Text>
      </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
  },
});

export default TileCard;
