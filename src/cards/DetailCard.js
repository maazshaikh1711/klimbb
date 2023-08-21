// To display a detail news screen (when clicked on News Title)
import React from 'react';
import { Modal, TouchableOpacity, Image, Text, View, ScrollView, StyleSheet, Share } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const DetailCard = ({ title, description, photoUrl, shareUrl, visible, onClose }) => {

  console.log(`Detail Card Rendering: title: ${title}, description: ${description}, phtotURL: ${photoUrl}, visible: ${visible}, shareUrl: ${shareUrl}` );

  const shareNews = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this link:'+shareUrl,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // Shared
          console.log('Shared via:', result.activityType);
        } else {
          // Cancelled
          console.log('Sharing cancelled');
        }
      } else if (result.action === Share.dismissedAction) {
        // Dismissed
        console.log('Sharing dismissed');
      }
    } catch (error) {
      console.error('Error sharing link:', error.message);
    }
  }

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        
        {/* For Navigating back to News title list */}
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <View style={styles.backButtonDesign}>
            <Text style={{fontSize: 20, color:"#BB86FC"}}>{'< Back'}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.shareButton} onPress={()=>shareNews()}>
          <View style={styles.backButtonDesign}>
          <Icon name="share" size={25} color="#BB86FC" />
          </View>
        </TouchableOpacity>
    
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {/* Photo */}
            <View style={styles.photoContainer}>
              {
                photoUrl?
                  // When photo is available
                  <Image 
                    source={{ uri: photoUrl }} 
                    style={styles.photo} 
                    resizeMode='cover'
                  />
                :
                  // When photo is not available
                  <Image 
                    source={require('../assets/defaultImage.jpg')} 
                    style={styles.photo} 
                    resizeMode='cover'
                  />
              }
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
  shareButton: {
    position: 'absolute',
    top: 20,
    right: 20,
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
  },
  modalContent: {
    flex: 1,
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
    marginBottom: 25,
  },
  titleText:{
    fontSize: 20,
    fontWeight: "bold",
    color:"white"
  },
  descriptionContainer:{
    flex: 1,
  },
  descriptionText: {
    fontSize: 16,
    color:"lightgrey"
  },
});

export default DetailCard;
