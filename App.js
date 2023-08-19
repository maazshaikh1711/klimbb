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

import { config } from 'dotenv';
// Load environment variables from .env file
// config();
//const apiKey = process.env.NEW_API_kEY;

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

  useEffect(()=>{
    console.log("Fetching news")
    fetchTopNews()
  }, [])

  const fetchTopNews = async () => {
    try {
      const newsJsonObject = await FetchNews("https://newsapi.org/v2/top-headlines?country=in&apiKey=");      //later move URL to .env file

      if(newsJsonObject?.status){
        if (newsJsonObject.status == "ok"){
          if(newsJsonObject.articles.length>0){
            const topFetchedNews = 
              newsJsonObject.articles.slice(0, 5).map((obj, index)=>({
                "id": index+1,
                "showDelete": true, 
                "pinned": false,
                ...obj

              })
            )
            console.log("Setting new news in a list",topFetchedNews)
            setTileCard(topFetchedNews)
          }
        }
        else{
          console.log("Something went wrong in accessing the articles, (returned object from api, but it's status is not 'ok') ");
        }
      }
      else{
        console.log("Something went wrong in accessing articles, (returned object from api does not have status field) ");
      }
    }
    catch(e){
      console.log("Error: Something went wrong in accessing news: ", e.message);
    }
  }

  const FetchNews =  async(newsLink) => {
    try{
        const NEWS_API_KEY = '54c4f5a2d447483b9a390b1ac9b436b6';   //later move it to .env file
        const response = await fetch(newsLink+NEWS_API_KEY);
        const news = await response.json();
        return news;
    }
    catch{ (err) =>
        console.error(`Some error occured: ${err.message}`);
    }
  }

  const handleCardPress = (card) => {
    setSelectedCard(card);
    console.log("Card list modified: ", card.title)
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
    setTileCard((prevTileCard) => {
      const updatedTileCard = prevTileCard.filter((item) => item.id !== card.id);
      if(card.pinned === true) {
        return [card, ...updatedTileCard]     // when pinned, card is shifted to top
      } else {
        return [...updatedTileCard, card]     // when unpinned, card is shifted to bottom
      } ;
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
                onPinPress={handlePinToTop} 
                index={index}
              />
            )}
          />
        :
          <View style={{alignItems:"center", justifyContent: "center"}}>
            {/* <Text style={{color:"black"}}>You are all caught up!</Text> */}
            {/* Call API to fetch new top 100 headlines */}
          </View>
        }
        {selectedCard && (
          <DetailCard
            title={selectedCard.title}
            longDescription={selectedCard.description}
          />
        )}
        <TouchableOpacity style={{justifyContent: "center", alignItems: "center", backgroundColor: "green", borderWidth: 1, height: 75}} onPress={()=>fetchTopNews()}>
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