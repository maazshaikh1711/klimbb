import AsyncStorage from '@react-native-async-storage/async-storage';

export const setData = async (value, keyName='klimbClubNews') => {
    try {
        await AsyncStorage.setItem(keyName, value);
    } catch (e) {
        // saving error
        console.log("Error while setting value to offline database")
    }
};

export const getData = async (keyName='klimbClubNews') => {
    try {
      const jsonValue = await AsyncStorage.getItem(keyName);
      console.log("Fetched Data...")
      // console.log("Fetched data: ", jsonValue != null ? JSON.parse(jsonValue) : null)
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log("Error while reading value from offline database")
    }
};

export const resetOfflineData = async (keyName='klimbClubNews') => {
  console.log("Resetting offline data.")
  await AsyncStorage.removeItem(keyName);
}