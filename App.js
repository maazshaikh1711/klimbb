import React, { useEffect, useState } from 'react';
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
import debounce from 'lodash/debounce';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';

const refreshTileCard = [
  { id: 1, title: 'Title 1', description: 'Description 1', showDelete: true, pinned: false },
  { id: 2, title: 'Title 2', description: 'Description 2', showDelete: true, pinned: false },
  { id: 3, title: 'Title 3', description: 'Description 3', showDelete: true, pinned: false },
  { id: 4, title: 'Title 4', description: 'Description 4', showDelete: true, pinned: false },
  { id: 5, title: 'Title 5', description: 'Description 5', showDelete: true, pinned: false },
]

const App = () =>{
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const [selectedCard, setSelectedCard] = useState(null);

  const [tileCard, setTileCard] = useState([
    { id: 1, title: 'Title 1', description: 'Description 1', showDelete: true, pinned: false },
    { id: 2, title: 'Title 2', description: 'Description 2', showDelete: true, pinned: false },
    { id: 3, title: 'Title 3', description: 'Description 3', showDelete: true, pinned: false },
    { id: 4, title: 'Title 4', description: 'Description 4', showDelete: true, pinned: false },
    { id: 5, title: 'Title 5', description: 'Description 5', showDelete: true, pinned: false },
  ]);

  useEffect(()=>{
  }, [tileCard])

  const handleCardPress = (card) => {
    setSelectedCard(card);
    console.log("card pressed : ", card.title)
  };

  const handleCardSwipe = (swipedCard) => {
    console.log("card swiped : ", swipedCard.title)    

    const debounceSetTileCard = debounce((updatedTileCard) => {
      setTileCard(updatedTileCard);
    }, 100); // Debounce for 100 milliseconds

      setTileCard((prevTileCard) => {
        const updatedTileCard = prevTileCard
          .filter((item) => item.id !== swipedCard.id)
          .map((item) => {
            if (item.id > swipedCard.id) {
              return { ...item, id: item.id - 1 };
            }
            return item;
          });

        console.log("After swiping a card: ", updatedTileCard);

        // Use the debounced function to update the state
        debounceSetTileCard(updatedTileCard);
      });

      setSelectedCard(null); // Clear the selected card
      // console.log("New data list after filtering and adjusting id : ", updatedTileCard)
  };

  const handlePinToTop = (card) => {
    console.log("HIIIIIIIIII", card)
    setTileCard((prevTileCard) => {
      const updatedTileCard = prevTileCard.filter((item) => item.id !== card.id);
      return [card, ...updatedTileCard];
    });
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        {tileCard?.length > 0 ?
          <FlatList
            data={tileCard}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <TileCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                pinned={item.pinned}
                showDelete={item.showDelete}
                onSwipe={() => handleCardSwipe(item)}
                onCardPress={() => handleCardPress(item)}
                onPinPress={()=> handlePinToTop(item)} 
                index={index}
              />
            )}
          />
        :
          <View style={{alignItems:"center", justifyContent: "center"}}>
              {/* <Text style={{color:"black"}}>You are all caught up!</Text> */}
          </View>
        }
        {selectedCard && (
          <DetailCard
            title={selectedCard.title}
            longDescription={selectedCard.description}
          />
        )}
        <TouchableOpacity style={{justifyContent: "center", alignItems: "center", backgroundColor: "green", borderWidth: 1, height: 75}} onPress={()=>setTileCard(refreshTileCard)}>
          <Text style={{color: "white", fontWeight:"bold"}}>REFRESH</Text>
        </TouchableOpacity>
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