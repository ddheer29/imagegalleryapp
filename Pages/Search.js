import React, { useState } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, TextInput, Text, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';


const API_KEY='6f102c62f41998d151e5a1b48713cf13'
export default function SearchScreen() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([]);
    const [searchText, setSearchText] = useState("");

    const API_BASE_URL = "https://api.flickr.com/services/rest/";

    const handleSearch = async (query) => {
        if (query && query.length > 2) {
            setLoading(true);
            setResults([]);
            setSearchText(query);
            try {
                const res = await axios.get(`${API_BASE_URL}?method=flickr.photos.search&api_key=${API_KEY}&format=json&nojsoncallback=1&extras=url_s&text=${searchText}`)
                console.log("search", res.data.photos?.photo)
                setLoading(false);
                if (res.data && res.data.photos?.photo) {
                    setResults(res.data.photos?.photo);
                }
            } catch (error) {
                console.log("Error searching news: ", error);
            }
        }
    }
    const handlePhotoPress = (selectedImage) => {
        navigation.navigate('PhotoScreen', { image: selectedImage });
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <TextInput
                    onChangeText={handleSearch}
                    placeholder='Search for your news'
                    placeholderTextColor={'gray'}
                    style={styles.searchInput}
                />
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <XMarkIcon size={25} color={'green'} strokeWidth={3} />
                </TouchableOpacity>
            </View>

            <View style={styles.text1Container}>
                <Text style={styles.test1}>{results.length} News for {searchText}</Text>
            </View>
            <ScrollView
                contentContainerStyle={{
                    paddingBottom: hp(5),
                }}
            >
                <View style={styles.imagesContainer}>
                    {results?.map((image, index) => (
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
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    searchContainer: {
        marginHorizontal: 16,
        marginBottom: 12,
        marginTop: 28,
        flexDirection: 'row',
        padding: 8,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
    },
    text1Container: {
        marginHorizontal: 16,
        marginBottom: 16,
    },
    test1: {
        fontSize: 20,
    },
    searchInput: {
        fontWeight: '500',
        color: 'black',
        letterSpacing: 1,
        padding: 3,
        paddingTop: 1,
        width: '90%',
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
