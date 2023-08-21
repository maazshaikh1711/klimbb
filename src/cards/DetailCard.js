import React from 'react';
import { Modal, TouchableOpacity, Image, Text, View, ScrollView, StyleSheet } from 'react-native';

const DetailCard = ({ title, description, photoUrl, visible, onClose }) => {

  console.log(`Detail Card Rendering: title: ${title}, description: ${description}, phtotURL: ${photoUrl}, visible: ${visible}` );

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <View style={styles.backButtonDesign}>
            <Text style={{fontSize: 16, color:"#BB86FC"}}>{'< Back'}</Text>
          </View>
        </TouchableOpacity>
    
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Photo */}
            <View style={styles.photoContainer}>
              {
                photoUrl?
                  <Image 
                    source={{ uri: photoUrl }} 
                    style={styles.photo} 
                    resizeMode='cover'
                  />
                :
                  <Image 
                    source={require('../assets/defaultImage.jpg')} 
                    style={styles.photo} 
                    resizeMode='cover'
                  />
              }
              {/* <Text style={{color: "#BB86FC"}}>PHOTO</Text> */}
            </View>

            <View style={styles.newsContainer}>
              {/* Title */}
              <View style={styles.titleContainer}>
                <Text style={styles.titleText}>
                  {title}
                </Text>
              </View>
              {/* Description */}
              <View style={styles.descriptionContainer}>
                <Text style={styles.descriptionText}>
                  {description}
                </Text>
              </View>
            </View>
        </ScrollView>

      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backButtonDesign: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#666666',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5
  },
  scrollContainer: {
    flexGrow: 1,
    // backgroundColor: "green",
  },
  modalContent: {
    flex: 1,
    // flexDirection: 'row',
  },
  photoContainer: {
    flex: 1,
    backgroundColor: "#242424",
    justifyContent: "center",
    alignItems: "center",
  },
  photo: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newsContainer: {
    flex: 1,
    padding: 15,
    backgroundColor:"#666666",
  },
  titleContainer:{
    // backgroundColor: "blue",
    marginBottom: 25,
  },
  titleText:{
    fontSize: 20,
    fontWeight: "bold",
    color:"white"
  },
  descriptionContainer:{
    flex: 1,
    // backgroundColor: "green",
  },
  descriptionText: {
    fontSize: 16,
    color:"lightgrey"
  },
});

export default DetailCard;
