import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Icon } from '@ui-kitten/components';
import HomeScreen from './HomeScreen';
import NearbyScreen from './NearbyScreen';
import HistoryScreen from './HistoryScreen';
import ProfileScreen from './ProfileScreen';

const { Navigator, Screen } = createBottomTabNavigator();

const HomeIcon = (props: any) => (
    <Icon {...props} name='home' />
);

const MapIcon = (props: any) => (
    <Icon {...props} name='map' />
);

const HistoryIcon = (props: any) => (
    <Icon {...props} name='archive' />
);

const ProfileIcon = (props: any) => (
    <Icon {...props} name='person' />
);

const BottomTabBar = (props: any) => (
    <BottomNavigation
        selectedIndex={props.state.index}
        onSelect={index => props.navigation.navigate(props.state.routeNames[index])}>
        <BottomNavigationTab title='HOME' icon={HomeIcon} />
        <BottomNavigationTab title='NEARBY' icon={MapIcon} />
        <BottomNavigationTab title='HISTORY' icon={HistoryIcon} />
        <BottomNavigationTab title='PROFILE' icon={ProfileIcon} />
    </BottomNavigation>
);

export default function HomeStack() {
    return (
        <Navigator tabBar={props => <BottomTabBar {...props} />}>
            <Screen name="HOME" component={HomeScreen} />
            <Screen name="NEARBY" component={NearbyScreen} />
            <Screen name="HISTORY" component={HistoryScreen} />
            <Screen name="PROFILE" component={ProfileScreen} />
        </Navigator>
    );
}