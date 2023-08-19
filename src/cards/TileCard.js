import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { PanGestureHandler, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';

const TileCard = ({ id, title, description, onSwipe, onPress, showDelete }) => {
  console.log(`Rendering TileCard with ID: ${id}, title: ${title}, showDelete: ${showDelete}` );
  const translateX = useSharedValue(0);

  const handleGesture = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (event.translationX <= -100) {
        translateX.value = withSpring(-400); // Swipe fully left
        runOnJS(onSwipe)(id);
      } else {
        translateX.value = withSpring(0); // Reset position
      }
    },
  });

  return (
    <View style={styles.container}>
      {/* Red background with "DELETE" text */}
      <TouchableOpacity onPress={()=>onPress({ id, title, description})}>
        {showDelete && (
          <View style={styles.background}>
            <Text style={styles.deleteText}>DELETE</Text>
          </View>
        )}

        <PanGestureHandler onGestureEvent={handleGesture}>
          <Animated.View
            style={[
              styles.cardContainer,
              { transform: [{ translateX }] },
            ]}
          >
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.description}>{description}</Text>
          </Animated.View>
        </PanGestureHandler>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent', // Transparent background to allow the red background to show
    marginBottom: 10,
    margin: 5,
  },
  cardContainer: {
    backgroundColor: 'lightgray',
    paddingVertical: 10,
    // margin: 5,
    borderRadius: 5,
  },
  title: {
    fontSize: 16,
  },
  description: {
    fontSize: 12,
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