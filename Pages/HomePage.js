import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, Button, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { API_KEY } from '@env';

const API_BASE_URL = 'https://api.flickr.com/services/rest/';

export default function HomePage() {
    const navigation = useNavigation();
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading]  = useState(false);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        fetchImages();
    }, [page, searchText]);

    const fetchImages = async () => {
        setIsLoading(true);
        let apiUrl = `${API_BASE_URL}?method=flickr.photos.getRecent&per_page=20&page=${page}&api_key=${API_KEY}&format=json&nojsoncallback=1&extras=url_s`;
        if (searchText) {
            apiUrl = `${API_BASE_URL}?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1&extras=url_s&text=${searchText}`;
        }
        try {
            const res = await fetch(apiUrl);
            const data = await res.json();
            const fetchedImages = data.photos?.photo;
            if (fetchedImages && fetchedImages.length > 0) {
                if (page === 1) {
                    setImages(fetchedImages);
                    await AsyncStorage.setItem('cachedImages', JSON.stringify(fetchedImages));
                } else {
                    setImages(prevImages => [...prevImages, ...fetchedImages]);
                }
            } else {
                console.error('No images fetched from API');
            }
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePhotoPress = (selectedImage) => {
        navigation.navigate('PhotoScreen', { image: selectedImage });
    };

    const handleSearch = () => {
        setPage(1);
    };

    const renderLoader = () => {
        return isLoading ? <ActivityIndicator style={styles.loader} size="large" color="#0000ff" /> : null;
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search..."
                    onChangeText={setSearchText}
                    value={searchText}
                />
                <Button title="Search" onPress={handleSearch} />
            </View>
            <ScrollView>
                <View style={styles.imagesContainer}>
                    {images?.map((image, index) => (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePhotoPress(image)}
                        >
                            <Image
                                source={{ uri: image.url_s }}
                                style={styles.imageStyle}
                            />
                        </TouchableOpacity>
                    ))}
                </View>
                {renderLoader()}
            </ScrollView>
            <View>
                {isLoading && <ActivityIndicator style={styles.loader} size="large" color="#0000ff" />}
            </View>
            <Button title="Load More" onPress={handleLoadMore} disabled={isLoading} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
    },
    searchInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        marginRight: 10,
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
        justifyContent: 'center',
    },
    loader: {
        margin: 5,
    },
});
