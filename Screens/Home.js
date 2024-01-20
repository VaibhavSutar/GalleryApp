import { View, Text, FlatList, SafeAreaView, Image, StyleSheet, Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import GridImage from '../components/GridImage'

const API1 = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s'
const Home = () => {
    const [data, setData] = useState([]);
    const [numColumns, setNumColumns]= useState(2);
    useEffect(()=>
    {
        fetchData()
    },[])
    console.log("Data: ", data)
    const fetchData = async()=>
    {
        
        try{
            const cachedUrl = await AsyncStorage.getItem('cachedUrls')
            if(cachedUrl)
            {
                const newUrl = JSON.parse(cachedUrl)
                setData(newUrl)
            }
        }
        catch(error)
        {
            console.error(error);
        }


        try {
            
            const imgdata = await fetch(API1);
            
            const img = await imgdata.json();
           if(img.stat === "ok")
           {
            const newUrls = img.photos.photo.map((photo, index) => ({
                id: `${photo.id}_${index}`,
                url: photo.url_s,
              }));
                      const stringUrl = JSON.stringify(newUrls)
                      console.log("String Url: ",stringUrl)
                      if(stringUrl)
            {
                const newUrl = JSON.parse(stringUrl)
                setData(newUrl)
            }
                      await AsyncStorage.setItem('cachedUrls',stringUrl)
                
            }
            
        } catch (error) {
            
        }
    }
  return (
    <View style={styles.container}>
     <GridImage data={data} style={styles.image} containerStyle={styles.itemContainer}/>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 2,
    },
    itemContainer: {
      flex: 1,
      margin: 5,
      
      alignItems: 'center',
    },
    image: {
      width: Dimensions.get('window').width / 3  - 37, // Adjust the width based on the number of columns and margins
      height: 100,
      resizeMode: 'cover',
      borderRadius: 8,
    },
  });
export default Home