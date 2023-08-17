import React, { useState } from 'react';
import { View, StyleSheet, Text, useColorScheme } from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import DetailCard from './src/cards/DetailCard';
import TileCard from './src/cards/TileCard';

const App = () => {

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const [tileCard, setTileCard] = useState([
    { id: 1, title: 'Title 1', description: 'Description 1' },
    { id: 2, title: 'Title 2', description: 'Description 2' },
    { id: 3, title: 'Title 3', description: 'Description 3'},
    { id: 4, title: 'Title 4', description: 'Description 4'},
    { id: 5, title: 'Title 5', description: 'Description 5'},
  ]);

  const handleCardPress = (card) => {
    setSelectedCard(card);
    console.log("card pressed : ", card.title)
  };

  return (
    <View style={styles.container}>
      {tileCard.map((item) => (
        <TileCard
          key={item.id}
          title={item.title}
          shortDescription={item.description}
          onPress={() => handleCardPress(item)}
        />
      ))}

        {selectedCard && (
          <DetailCard
            title={selectedCard.title}
            longDescription={selectedCard.description}
          />
        )}
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