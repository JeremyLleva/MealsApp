/** @format */
import React from 'react'
import { Platform, text } from 'react-native'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import CategoriesScreen from '../screens/CategoriesScreen'
import CategoryMealsScreen from '../screens/CategoryMealsScreen'
import MealDetailScreen from '../screens/MealDetailScreen'
import FiltersScreen from '../screens/FiltersScreen'
import Colors from '../constants/Colors'
import FavoritesScreen from '../screens/FavoritesScreen'
import { Ionicons } from '@expo/vector-icons'

const defaultStackNavOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
    },
    headerTitleStyle: {
        fontFamily: 'open-sans-bold',
    },
    headerBackTitleStyle: {
        fontFamily: 'open-sans',
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
    headerTitle: 'A Screen',
}
const MealsNavigator = createStackNavigator(
    {
        Categories: {
            screen: CategoriesScreen,
        },
        CategoryMeals: {
            screen: CategoryMealsScreen,
        },
        MealDetail: MealDetailScreen,
    },
    {
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions,
    }
)

const FavNavigator = createStackNavigator(
    {
        Favorites: FavoritesScreen,
        MealDetail: MealDetailScreen,
    },
    {
        defaultNavigationOptions: defaultStackNavOptions,
    }
)
const MealsFavTabNavigator = createBottomTabNavigator(
    {
        Meals: {
            screen: MealsNavigator,
            navigationOptions: {
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name='ios-restaurant'
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    )
                },
            },
        },
        Favorites: {
            screen: FavNavigator,
            navigationOptions: {
                tabBarLabel: 'Favorites!',
                tabBarIcon: (tabInfo) => {
                    return (
                        <Ionicons
                            name='ios-star'
                            size={25}
                            color={tabInfo.tintColor}
                        />
                    )
                },
            },
        },
    },
    {
        tabBarOptions: {
            labelStyle: {
                fontFamily: 'open-sans-bold',
            },
            activeTintColor: Colors.accentColor,
        },
    }
)
const FiltersNavigator = createStackNavigator(
    {
        Filters: FiltersScreen,
    },
    {
        navigationOptions: {
            drawerLabel: 'Filters',
        },
        // initialRouteName: 'Categories',
        defaultNavigationOptions: defaultStackNavOptions,
    }
)

const MainNavigator = createDrawerNavigator(
    {
        MealsFav: {
            screen: MealsFavTabNavigator,
            navigationOptions: {
                drawerLabel: 'Meals',
            },
        },
        Filters: FiltersNavigator,
    },
    {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold',
            },
        },
    }
)

export default createAppContainer(MainNavigator)
