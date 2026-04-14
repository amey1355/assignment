import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { UserDetailScreen } from './src/screens/UserDetailScreen';
import { User } from './src/types/User';

export type RootStackParamList = {
  Home: undefined;
  UserDetail: { user: User };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#4F46E5' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: '700', fontSize: 18 },
          headerBackTitleVisible: false,
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: '👥 User Directory' }}
        />
        <Stack.Screen
          name="UserDetail"
          component={UserDetailScreen}
          options={({ route }) => ({
            title: route.params.user.name.split(' ')[0],
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
