import React, {useEffect} from 'react';
import {View, Image, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SplashStyle} from './SplashStyle';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Splash'>;

const SplashScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={SplashStyle.container}>
      <StatusBar backgroundColor="#FF640D" barStyle="light-content" />
      <Image
        source={require('../../assets/landing/landing.png')}
        style={SplashStyle.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;
