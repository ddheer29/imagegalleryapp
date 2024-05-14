import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native';
import HomePage from '../Pages/HomePage';
import PhotoScreen from '../Pages/Photo';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import About from '../Pages/About';
import Profile from '../Pages/Profile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchScreen from '../Pages/Search';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AppNavigation = () => {
    const TabNavigator = () => {
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        let iconName;
                        if (route.name === "Home") {
                            iconName = "home";
                        } else if (route.name === "Profile") {
                            iconName = "account-circle";
                        } else if (route.name === "About") {
                            iconName = "information";
                        } else if (route.name === "Search") {
                            iconName = "magnify";
                        }

                        const customizeSize = 28;
                        return (
                            <MaterialCommunityIcons
                                name={iconName}
                                size={customizeSize}
                                color={focused ? "green" : "gray"}
                            />
                        )
                    },
                    tabBarActiveTintColor: "green",
                    tabBarInactiveTintColor: "gray",
                    tabBarLabelStyle: {
                        fontSize: 12,
                    },
                })}
            >
                <Tab.Screen name="Home" component={HomePage} />
                <Tab.Screen name="Profile" component={Profile} />
                <Tab.Screen name="About" component={About} />
                <Tab.Screen name="Search" component={SearchScreen} />
            </Tab.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='HomeScreen'>
                <Stack.Screen
                    name='HomeScreen'
                    component={TabNavigator}
                    options={{
                        headerTitle: 'Image Gallery',
                    }}
                />
                <Stack.Screen
                    name='PhotoScreen'
                    component={PhotoScreen}
                    options={{
                        title: 'Photo',
                    }}
                />
                <Stack.Screen
                    name='About'
                    component={About}
                />
                <Stack.Screen
                    name='Profile'
                    component={Profile}
                />
                <Stack.Screen
                    name='Search'
                    component={SearchScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation