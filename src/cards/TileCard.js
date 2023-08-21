//To display news tiles (pinned and unpinned news tiles)
import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, TouchableNativeFeedback } from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const TileCard = ({ id, title, description, pinned, onSwipe, onCardPress, onPinPress, showDelete, photoUrl, url}) => {
  console.log(`Rendering TileCard with ID: ${id}, title: ${title}, phototURL: ${photoUrl}, showDelete: ${showDelete}, url: ${url}, pinned: ${pinned}` );
  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      if (!pinned) {
        //only allow to swipe left
        if (event.translationX < 0) {
          // Only update translateX for leftward swipes
          translateX.value = ctx.startX + event.translationX;
        }
      }
    },
    onEnd: (event) => {
      if (!pinned) {
        if (event.translationX <= -100) {
          translateX.value = withSpring(-400); // Swipe fully left
          runOnJS(onSwipe)(id);
        } else {
          translateX.value = withSpring(0); // Reset position
        }
      } else {
        translateX.value = withSpring(0); // Reset position for pinned cards
      }
    },
  });

  return (
    <View style={styles.container}>
      {/* Red background with "DELETE" text */}
      <View style={styles.deleteContainer}>
        
        {/* To show delete backgound */}
        {showDelete && 
          <Icon name="delete" size={30} color="white" />
        }
      </View>

        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View
            style={[
              styles.cardContainer,
              { transform: [{ translateX }] },
            ]}
          >
            <TouchableWithoutFeedback onPress={()=>onCardPress({ id, title, description, photoUrl, url, showDelete})}>
              <View style={[styles.cardContent, showDelete && styles.showDeleteBackground]}>
                
                {/* News Title */}
                <View style={styles.titleContainer}>
                  <Text style={styles.title}>{title}</Text>
                </View>

                {/* Pin/Unpin Button */}
                <View style={styles.circleButtonContainer} pointerEvents="box-none">
                  <TouchableNativeFeedback
                    onPress={() => {
                      onPinPress({ id, title, description, showDelete, pinned: !pinned})
                    }}
                  >
                    <View style={styles.circleButton}>
                      {
                        pinned ?
                          // Pinned icon
                          <View style={{...styles.circle}}>     
                            <Icon name="pin" size={30} color="#BB86FC" />
                          </View>
                        :
                          // Unpinned icon
                          <View style={{...styles.circle}}>
                            <Icon name="pin-outline" size={30} color="white" />
                          </View>
                      }
                    </View>
                  </TouchableNativeFeedback>
                </View>
              </View>    
            </TouchableWithoutFeedback>
          </Animated.View>
        </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
    margin: 5,
    flex: 1
  },
  cardContainer: {
    backgroundColor: 'transparent',
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#666666',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  deleteContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'darkred',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  titleContainer: {
    flex: 0.85, // 85 % width
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  circleButtonContainer: {
    flex: 0.15, // 15% width
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  circleButton: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circle: {
    width: 40, // Adjust the size of the pin button
    height: 40, // Adjust the size of the pin button
    borderRadius: 20, // Make it a circle
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
  }
});

export default TileCard;
