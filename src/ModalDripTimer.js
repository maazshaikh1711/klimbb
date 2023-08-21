import { useState } from 'react';
import { 
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    TextInput,
  } from 'react-native';

const ModalDripTimer = ({toggleDripTimerModal, setDripTimer, visible}) => {

    let [dripTime, setDripTime] = useState(0);

    const handleAccept = () => {
        // You can perform actions with the entered drip time here
        console.log('Accepted drip time::::::::::::', parseInt(dripTime, 10), typeof parseInt(dripTime, 10));
        if(parseInt(dripTime,10) == 0){
            setDripTimer(1*10000);
        }else{
            setDripTimer(parseInt(dripTime, 10)*1000);
        }
    };
    
    const handleInputChange = (text) => {
        console.log("..............", text, typeof text);
        // Ensure the input only contains numbers
        if (/^\d+$/.test(text) || text === '') {
            
            setDripTime(text);
        }
    };
    
      const handleInputSubmit = () => {
        handleAccept();
      };

    return(
        <Modal
            animationIn={"slideInUp"}          
            animationInTiming={500}
            animationOut={"slideOutDown"}
            animationOutTiming={500}
            hideModalContentWhileAnimating={true}
            isVisible={visible}
            onBackButtonPress={() => {
                toggleDripTimerModal(!visible)
            }}
            hasBackdrop={true}
            onBackdropPress={()=>{
                setVerifyResultPopupVisible(!visible);
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalBox}>
                    <Text style={styles.heading}>Enter drip time in seconds</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter number"
                            keyboardType="numeric"
                            value={dripTime.toString()}
                            onChangeText={handleInputChange}
                            onSubmitEditing={handleInputSubmit}
                        />
                    <TouchableOpacity style={styles.button} onPress={handleAccept}>
                    <Text style={styles.buttonText}>Accept</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalBox: {
      backgroundColor: '#242424',
      borderRadius: 10,
      padding: 20,
      alignItems: 'center',
    },
    heading: {
      color: 'white',
      fontSize: 18,
      marginBottom: 10,
    },
    input: {
      width: 150,
      height: 40,
      backgroundColor: 'white',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginBottom: 15,
    },
    button: {
      backgroundColor: '#BB86FC',
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
});

export default ModalDripTimer;