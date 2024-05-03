import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const API = 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&per_page=20&page=1&api_key=6f102c62f41998d151e5a1b48713cf13&format=json&nojsoncallback=1&extras=url_s';

export default function HomePage() {
    const navigation = useNavigation();
    const [images, setImages] = useState([]);

    useEffect(() => {
        loadCachedImages();
    }, []);

    const fetchImages = async () => {
        try {
            const res = await fetch(API);
            const data = await res.json();
            const fetchedImages = data.photos?.photo;
            if (fetchedImages && fetchedImages.length > 0) {
                setImages(fetchedImages);
                await AsyncStorage.setItem('cachedImages', JSON.stringify(fetchedImages));
            } else {
                console.error('No images fetched from API');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };



    const loadCachedImages = async () => {
        try {
            const cachedImages = await AsyncStorage.getItem('cachedImages');
            if (cachedImages !== null) {
                setImages(JSON.parse(cachedImages));
            } else {
                fetchImages();
            }
        } catch (error) {
            console.error('Error loading cached images:', error);
        }
    };

    const handleRefresh = () => {
        fetchImages();
    };

    const handlePhotoPress = (selectedImage) => {
        navigation.navigate('PhotoScreen', { image: selectedImage });
    };

    return (
        <ScrollView>
            <View style={styles.refreshBtn}>
                <Button title="Refresh" onPress={handleRefresh} />
            </View>
            <View style={styles.imagesContainer}>
                {images?.map(image => (
                    <TouchableOpacity
                        key={image.id}
                        onPress={() => handlePhotoPress(image)}
                    >
                        <Image
                            source={{ uri: image.url_s }}
                            style={styles.imageStyle}
                        />
                    </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    refreshBtn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
    },
    imageStyle: {
        width: 190,
        height: 190,
        margin: 5,
    },
    imagesContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
})
