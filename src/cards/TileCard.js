import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const TileCard = ({ id, title, description, pinned, onSwipe, onCardPress, onPinPress, showDelete, photoUrl}) => {
  console.log(`Rendering TileCard with ID: ${id}, title: ${title}, phtotURL: ${photoUrl}, showDelete: ${showDelete}, pinned: ${pinned}` );
  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      if (!pinned) {
        translateX.value = ctx.startX + event.translationX;
      }
    },
    onEnd: (event) => {
      if (!pinned) {
        if (event.translationX <= -100) {
          translateX.value = withSpring(-400); // Swipe fully left
          runOnJS(onSwipe)(id);
        } else {
          translateX.value = withSpring(0); // Reset position for pinned cards
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
        {showDelete && <Text style={styles.deleteText}>DELETE</Text>}
      </View>

      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View
          style={[
            styles.cardContainer,
            { transform: [{ translateX }] },
          ]}
        >
          <TouchableWithoutFeedback onPress={()=>onCardPress({ id, title, description, photoUrl, showDelete})}>
            <View style={[styles.cardContent, showDelete && styles.showDeleteBackground]}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{title}</Text>
              </View>

              {/* Circle button */}
              <View style={styles.circleButtonContainer} pointerEvents="box-none">
                <TouchableWithoutFeedback
                  style={styles.circleButton}
                  onPress={() => {
                    onPinPress({ id, title, description, showDelete, pinned: !pinned})
                  }}
                >
                  {
                    pinned ?
                      <View style={{...styles.circle, backgroundColor: "red"}}>     
                        {/* replace with pinned filled "pin" icon */}
                        <Text>Unpin</Text>
                      </View>
                    :
                      <View style={{...styles.circle, backgroundColor: "green"}}>
                        {/* replace with unpinned outlined "pin" icon */}
                        <Text>Pin</Text>
                      </View>
                  }
                </TouchableWithoutFeedback>
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
    flex: 1,
    margin: 5,
  },
  cardContainer: {
    backgroundColor: 'transparent',
  },
  cardContent:{
    flexDirection: 'row', // Arrange content horizontally
    justifyContent: 'space-between', // Align content to the ends (left and right)
    alignItems: 'center', // Vertically center-align content
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  titleContainer: {
    flex: 0.85, // 85 % width
  },
  deleteContainer: {
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
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  circleButtonContainer: {
    flex: 0.15, // 15% width
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  circleButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    // backgroundColor: "black",
  },
  circle: {
    width: 40, // Adjust the size of the circle button
    height: 40, // Adjust the size of the circle button
    // backgroundColor: 'grey',
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
  },
});

export default TileCard;