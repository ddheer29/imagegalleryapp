import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Profile = () => {
    return (
        <View style={styles.container}>
            <View style={styles.imgcontainer}>
                <Image
                    style={styles.imgStyle}
                    source={require('../assets/profile/profile.jpg')}
                />
            </View>
            <View style={styles.detailsContainer}>
                <View>
                    <Text style={styles.text1}>Divyang Dheer</Text>
                    <Text style={styles.text2}>React-Native Developer</Text>
                </View>
            </View>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    imgStyle: {
        height: 200,
        width: 200,
        borderRadius: 100,
    },
    container: {
        flex: 1,
        alignItems: 'center',
    },
    imgcontainer: {
        marginTop: 50,
    },
    detailsContainer: {
        marginTop: 50,
    },
    text1: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    text2: {
        color: 'gray',
        fontSize: 20,
        fontWeight: '400',
        marginTop: 2,
    },
})