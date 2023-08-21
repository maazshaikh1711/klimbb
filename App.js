import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  StatusBar,
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
import Header from './src/Header';
import TileCard from './src/cards/TileCard';
import DetailCard from './src/cards/DetailCard';
import { setData, getData, resetOfflineData } from './src/offlineDataStorage';
import ModalDripTimer from './src/ModalDripTimer';

//third party imports
const lodash = require('lodash');
import debounce from 'lodash/debounce';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
// import Config from 'react-native-config'


const refreshTileCard = [
  { id: 1, title: 'Title 1', description: 'Description 1', showDelete: true, pinned: false },
  { id: 2, title: 'Title 2', description: 'Description 2', showDelete: true, pinned: false },
  { id: 3, title: 'Title 3', description: 'Description 3', showDelete: true, pinned: false },
  { id: 4, title: 'Title 4', description: 'Description 4', showDelete: true, pinned: false },
  { id: 5, title: 'Title 5', description: 'Description 5', showDelete: true, pinned: false },
]

const noOfCardsToDisplay = 5;

const App = () =>{

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  
  const [selectedCard, setSelectedCard] = useState(false);
  const [fetchDataInterval, setFetchDataInterval] = useState(null);
  const [dripTimerModal, setDripTimerModal] = useState(false);
  const [dripTime, setDripTime] = useState(10000);
  const [tileCard, setTileCard] = useState([]);
    // { id: 1, title: 'Title 1', description: 'Description 1', showDelete: true, pinned: false },
    // { id: 2, title: 'Title 2', description: 'Description 2', showDelete: true, pinned: false },
    // { id: 3, title: 'Title 3', description: 'Description 3', showDelete: true, pinned: false },
    // { id: 4, title: 'Title 4', description: 'Description 4', showDelete: true, pinned: false },
    // { id: 5, title: 'Title 5', description: 'Description 5', showDelete: true, pinned: false },
    // ... more tiles
  
  const [pinnedTileCard, setPinnedTileCard] = useState([]);

  useEffect(()=>{
    // console.log("Card list modified: ", tileCard)
  }, [tileCard])

  useEffect(()=>{
    const initializeData = async () => {
      await startFetchDataInterval(); // Start the interval and await its completion
    };
  
    initializeData();
  }, [])

  const startFetchDataInterval = async (drip=10000) => {
    clearInterval(fetchDataInterval); // Clear existing interval
    await fetchData(); // Fetch data immediately

    // Set up a new interval to call fetchData every X milliseconds
    const intervalId = setInterval(async() => {
      await fetchData();
    }, drip);
    setFetchDataInterval(intervalId);

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(fetchDataInterval);
    };

  };

  const fetchData = async () => {
    console.log("Trying to fetch data..................")
    const offlineData = await getData('klimbClubNews');

    if ( offlineData === null) {
      console.log("No news present in offline db, fetching news API 1")
      await fetchTopNews();
    }
    else{
      console.log("============================================================")
      console.log("News is present/fetched in offline db, setting top 10 news")

      // cut upto 10 (could be less than 10, if fetched list is about to finish) objects to display
      let newNews = null;
      let newTenNews = null;
      if (offlineData === null){
        newNews = await getData('klimbClubNews');
        newTenNews = newNews.slice(0,noOfCardsToDisplay);
      }
      else{
        newTenNews = offlineData.slice(0,noOfCardsToDisplay);
      }
      console.log("Setting new news tiles as:", newTenNews);
      setTileCard(newTenNews);
      // console.log("===============================>", newTenNews)

      // if that array length is >10, re-assign the remaining array to that key
      if (offlineData?.length > noOfCardsToDisplay){
        // re-assign the remaining array to that key
        setData(JSON.stringify(offlineData.slice(noOfCardsToDisplay)))
      }
      else{
        // call fetchTopNews(), to get new top 100 news
        fetchTopNews();
      }
    }
  };

  const fetchTopNews = async () => {
    try {
      const newsJsonObject = await FetchNews("https://newsapi.org/v2/top-headlines?country=in&apiKey=");      //later move URL to .env file
      
      if(newsJsonObject?.status){
        if (newsJsonObject.status == "ok"){
          if(newsJsonObject.articles.length>0){

            const topFetchedNewsToStore = 
              newsJsonObject.articles.slice(0, 100).map((obj, index)=>({
                "id": index+1,
                "showDelete": true, 
                "pinned": false,
                ...obj

              })
            )
            console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")

            console.log("Setting new news tiles as:", topFetchedNewsToStore.slice(0,noOfCardsToDisplay));
            setTileCard(topFetchedNewsToStore.slice(0,noOfCardsToDisplay));

            console.log("Storing new news in offline db", topFetchedNewsToStore.slice(noOfCardsToDisplay))
            await setData(JSON.stringify(topFetchedNewsToStore.slice(noOfCardsToDisplay)), 'klimbClubNews');

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
    console.log("Card pressed : ", card)
  };

  const toggleModal = () => {
    setSelectedCard(false);
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
    
        // console.log("After swiping a card: ", updatedTileCard);
        
        // Use the debounced function to update the state
        debounceSetTileCard(updatedTileCard);
      });
      
      setSelectedCard(null); // Clear the selected card
      // console.log("New data list after filtering and adjusting id : ", updatedTileCard)
  };

  const handlePinToTop = (card) => {

    setPinnedTileCard((prevTileCard) => {
      const updatedTileCard = prevTileCard.filter((item) => item.id !== card.id);
      if (card.pinned === true){
        return [card, ...updatedTileCard];
      } else {
        return updatedTileCard;
      }
    })

    setTileCard((prevTileCard) => {
      const updatedTileCard = prevTileCard.filter((item) => item.id !== card.id);

      if(card.pinned === true) {
        return updatedTileCard     // when pinned, card is shifted to top
      } else {
        return [...updatedTileCard, card]     // when unpinned, card is shifted to bottom
      } ;
    });
  };

  const toggleDripTimerModal = () => {
    setDripTimerModal(!dripTimerModal)
  }

  const setDripTimer = (value) => {
    setDripTime(value);
    startFetchDataInterval(value)
    toggleDripTimerModal();
  }

  //try to display by combining both tiles
  // const combinedTileData = [...pinnedTileCard, ...tileCard];
  // const sortedTileData = combinedTileData.sort((a, b) => {
  //   // You can adjust the sorting logic here
  //   if (a?.pinned && !b?.pinned) return -1; // Pinned tiles come first
  //   if (!a?.pinned && b?.pinned) return 1;
  //   return a.id - b.id; // Otherwise, sort by ID
  // });

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar
        animated={true}
        backgroundColor="#666666"
        // hidden={hidden}
      />
      <Header AppName={'KC NEWS'} onRefreshPress={()=>fetchData()} onDripTimerPress={()=>toggleDripTimerModal()}/>
      <ScrollView style={styles.container}>
        
        {/* Display Pinned News Tiles */}
        <View>
          <FlatList
            data={pinnedTileCard}
            keyExtractor={(item) => item.id.toString()}
            style={{ flexGrow: 1 }}
            renderItem={({ item, index }) => (
              <TileCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                photoUrl={item.urlToImage}
                pinned={item.pinned}
                showDelete={item.showDelete}
                onSwipe={() => handleCardSwipe(item)}
                onCardPress={() => handleCardPress(item)}
                onPinPress={handlePinToTop}
                index={index}
              />
            )}
          />
        </View>

        {/* Display Unpinned News Tiles */}
        <View>
          <FlatList
            data={tileCard}
            keyExtractor={(item) => item.id.toString()}
            style={{ flexGrow: 1 }}
            renderItem={({ item, index }) => (
              <TileCard
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                photoUrl={item.urlToImage}
                pinned={item.pinned}
                showDelete={item.showDelete}
                onSwipe={() => handleCardSwipe(item)}
                onCardPress={() => handleCardPress(item)}
                onPinPress={handlePinToTop}
                index={index}
              />
            )}
          />
        </View>

        {
            selectedCard 
            &&
            <DetailCard
              title={selectedCard.title}
              description={selectedCard.description}
              photoUrl={selectedCard.photoUrl}
              visible={selectedCard?true:false}
              onClose={toggleModal}
            />
        }

        {
          dripTimerModal
          &&
          <ModalDripTimer 
            toggleDripTimerModal={toggleDripTimerModal} 
            setDripTimer={setDripTimer}
            visible={dripTimerModal}
          />
        }

        {/* <TouchableOpacity style={{justifyContent: "center", alignItems: "center", backgroundColor: "orange", borderWidth: 1, height: 50}} onPress={()=>getData('klimbClubNews')}>
          <Text style={{color: "white", fontWeight:"bold"}}>CONSOLE LOCAL NEWS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{justifyContent: "center", alignItems: "center", backgroundColor: "red", borderWidth: 1, height: 50}} onPress={()=>{
          resetOfflineData();
          setTileCard(false);
          }}>
          <Text style={{color: "white", fontWeight:"bold"}}>RESET LOCAL NEWS</Text>
        </TouchableOpacity> */}
      </ScrollView>
    </GestureHandlerRootView>
  );    
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    margin: '10px 5px 10px 5px',
    backgroundColor:"#242424",
  }
});

export default App;
