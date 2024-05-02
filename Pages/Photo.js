import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

export default function PhotoScreen({ route }) {
    const { image } = route.params;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: image.url_s }}
                style={styles.imageStyle}
            />
            <Text style={styles.title}>{image.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        marginTop: 60
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        margin: 10,
    },
    imageStyle: {
        width: 300,
        height: 300,
        borderRadius: 5
    }
})
