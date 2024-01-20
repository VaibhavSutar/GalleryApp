import { View, Text, FlatList, Image } from 'react-native'
import React from 'react'

const GridImage = ({data, style, containerStyle}) => {
  return (
    <View>
            {data &&
            (
                <FlatList 
                data={data}
                keyExtractor={(item)=> item.id}
                numColumns={4}
                renderItem={({item})=>
                (
                    <View key={item} style={containerStyle}>
                <Image source={{ uri : item.url}} style={style} onError={(error) => console.error('Error loading image:', error)}/>
            </View>
                )
            }
            />
            )
        }
        </View>
  )
}

export default GridImage