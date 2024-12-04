import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {mockUsers} from '../../mocks/users';
import {LoginStyle} from './LoginStyles';

type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Home: {username: string};
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'Login'>;

const LoginScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({
    username: '',
    password: '',
    general: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      username: '',
      password: '',
      general: '',
    };

    if (!username.trim()) {
      newErrors.username = 'Username is required';
      isValid = false;
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateForm()) {
      const user = mockUsers.find(
        user => user.username === username && user.password === password,
      );

      if (user) {
        setErrors({username: '', password: '', general: ''});
        navigation.navigate('Home', {username});
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Invalid username or password',
        }));
      }
    }
  };

  return (
    <SafeAreaView style={LoginStyle.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={LoginStyle.loginContainer}>
        <Image
          source={require('../../assets/login/welcome_back.png')}
          style={LoginStyle.logo}
          resizeMode="contain"
        />
        <Text style={LoginStyle.title}>Welcome Back!</Text>
        <Text style={LoginStyle.subtitle}>Log in to your existent account</Text>

        <View style={LoginStyle.inputContainer}>
          <TextInput
            style={[
              LoginStyle.input,
              errors.username ? LoginStyle.inputError : null,
            ]}
            placeholder="Username"
            placeholderTextColor="#888"
            value={username}
            onChangeText={text => {
              setUsername(text);
              setErrors(prev => ({...prev, username: '', general: ''}));
            }}
            autoCapitalize="none"
          />
          {errors.username ? (
            <Text style={LoginStyle.errorText}>{errors.username}</Text>
          ) : null}
        </View>

        <View style={LoginStyle.inputContainer}>
          <TextInput
            style={[
              LoginStyle.input,
              errors.password ? LoginStyle.inputError : null,
            ]}
            placeholder="Password"
            placeholderTextColor="#888"
            value={password}
            onChangeText={text => {
              setPassword(text);
              setErrors(prev => ({...prev, password: '', general: ''}));
            }}
            secureTextEntry={true}
          />
          {errors.password ? (
            <Text style={LoginStyle.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        {errors.general ? (
          <Text style={LoginStyle.errorText}>{errors.general}</Text>
        ) : null}

        <TouchableOpacity>
          <Text style={LoginStyle.forgotPasswordText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={LoginStyle.loginButton} onPress={handleLogin}>
          <Text style={LoginStyle.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        <Text style={LoginStyle.orText}>Or connect using</Text>

        <View style={LoginStyle.socialButtonsContainer}>
          <TouchableOpacity
            style={[LoginStyle.socialButton, LoginStyle.googleButton]}>
            <Text style={LoginStyle.googleText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[LoginStyle.socialButton, LoginStyle.facebookButton]}>
            <Text style={LoginStyle.facebookText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={LoginStyle.signupContainer}>
          <Text style={LoginStyle.signupText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={LoginStyle.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default LoginScreen;
