import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  useColorScheme,
  View,
  FlatList,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

//local imports
import DetailCard from './src/cards/DetailCard';
import TileCard from './src/cards/TileCard';

//third party imports
const lodash = require('lodash');
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const App = () =>{
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const [tileCard, setTileCard] = useState([
    { id: 1, title: 'Title 1', description: 'Description 1', showDelete: true },
    { id: 2, title: 'Title 2', description: 'Description 2', showDelete: true },
    { id: 3, title: 'Title 3', description: 'Description 3', showDelete: true },
    { id: 4, title: 'Title 4', description: 'Description 4', showDelete: true },
    { id: 5, title: 'Title 5', description: 'Description 5', showDelete: true },
  ]);

  const handleCardPress = (card) => {
    setSelectedCard(card);
    console.log("card pressed : ", card.title)
  };

  const handleCardSwipe = (card) => {
    console.log("card swiped : ", card.title)
    // lodash.remove(tileCard, obj => obj.id === card.id)
    const updatedTileCard = tileCard.map((item) => {
      if (item.id === card.id) {
        return { ...item, showDelete: false };
      }
      return item;
    });
    setTileCard(updatedTileCard);
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Text>Hiiiiiiiiii</Text>
        <FlatList
          data={tileCard}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TileCard
              key={item.id}
              id={item.id}
              title={item.title}
              description={item.description}
              showDelete={item.showDelete}
              onSwipe={() => handleCardSwipe(item)}
              onPress={() => handleCardPress(item)}
            />
          )}
        />
        {selectedCard && (
          <DetailCard
            title={selectedCard.title}
            longDescription={selectedCard.description}
          />
        )}
      </View>
    </GestureHandlerRootView>
  );    
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: '10px 5px 10px 5px',
  }
});

export default App;