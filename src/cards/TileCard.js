import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const TileCard = ({ id, title, description, pinned, onSwipe, onCardPress, onPinPress, showDelete}) => {
  console.log(`Rendering TileCard with ID: ${id}, title: ${title}, showDelete: ${showDelete}` );
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
      {/* <TouchableWithoutFeedback onPress={()=>onCardPress({ id, title, description, showDelete})}> */}
        {showDelete && (
          <View style={styles.background}>
            <Text style={styles.deleteText}>DELETE</Text>
          </View>
        )}
      {/* </TouchableWithoutFeedback> */}

      <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View
            style={[
              styles.cardContainer,
              { transform: [{ translateX }] },
            ]}
          >
            <View>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>

            {/* Circle button */}
            <TouchableOpacity
              style={styles.circleButton}
              onPress={() => {
                onPinPress({ id, title, description, showDelete, pinned: !pinned})
              }}
            >
              <View style={{...styles.circle, backgroundColor: pinned ? "red" : "green"}} />
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Transparent background to allow the red background to show
    marginBottom: 10,
    margin: 5,
    flex: 1
  },
  cardContainer: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    paddingHorizontal: 10,
    // margin: 5,
    borderRadius: 5,
    flex: 1,
    flexDirection: 'row', // Arrange content horizontally
    justifyContent: 'space-between', // Align content to the ends (left and right)
    alignItems: 'center', // Vertically center-align content
  },
  title: {
    fontSize: 16,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
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