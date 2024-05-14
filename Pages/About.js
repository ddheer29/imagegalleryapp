import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const About = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text1}>React Native - Task 3</Text>
            <Text style={styles.text2}>
                Building on the skills demonstrated in Task 2, your next task is to implement both Bottom Tab Navigation and Drawer Navigation in a React Native application. This application should be structured to include four main pages, each displaying the appropriate heading.
                The navigation should work seamlessly, providing a smooth user experience. The code should be clean, efficient, and adhere to best practices. It’s essential to test the application thoroughly to ensure that there are no bugs or issues. The navigation should work smoothly on all devices and screen sizes.
                Remember, the key to this task, like the previous one, is to enhance user experience through effective navigation.
            </Text>
        </View>
    )
}

export default About

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 30
    },
    text1: {
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
    },
    text2: {
        color: 'gray',
        fontSize: 15,
        fontWeight: '600',
        marginTop: 10,
    },
})