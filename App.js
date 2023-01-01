import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainNavigationStack from './app/stacks/MainNavigationStack';


export default function App() {
  //Return the bottom tab navigation panel with our chosen icons
  return (
    <NavigationContainer>
      <MainNavigationStack/>
    </NavigationContainer>
  );
}