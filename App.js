import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import TileCard from './src/cards/TileCard';

const App = () => {

  const data = [
    { id: 1, title: 'Title 1', description: 'Description 1' },
    { id: 2, title: 'Title 2', description: 'Description 2' },
    { id: 3, title: 'Title 3', description: 'Description 3'},
    { id: 4, title: 'Title 4', description: 'Description 4'},
    { id: 5, title: 'Title 5', description: 'Description 5'},
  ];

  const handleCardPress = (card) => {
    console.log("card pressed : ", card.title)
  };

  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TileCard
          key={item.id}
          title={item.title}
          shortDescription={item.description}
          onPress={() => handleCardPress(item)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

export default App;