import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {mockUsers} from '../mocks/users';

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
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
        navigation.navigate('Home');
      } else {
        setErrors(prev => ({
          ...prev,
          general: 'Invalid username or password',
        }));
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.loginContainer}>
        <Image
          source={require('../assets/login/welcome_back.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.title}>Welcome Back!</Text>
        <Text style={styles.subtitle}>Log in to your existent account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.username ? styles.inputError : null]}
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
            <Text style={styles.errorText}>{errors.username}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, errors.password ? styles.inputError : null]}
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
            <Text style={styles.errorText}>{errors.password}</Text>
          ) : null}
        </View>

        {errors.general ? (
          <Text style={styles.errorText}>{errors.general}</Text>
        ) : null}

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forget Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>

        <Text style={styles.orText}>Or connect using</Text>

        <View style={styles.socialButtonsContainer}>
          <TouchableOpacity style={[styles.socialButton, styles.googleButton]}>
            <Text style={styles.googleText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.socialButton, styles.facebookButton]}>
            <Text style={styles.facebookText}>Facebook</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  loginContainer: {
    flex: 1,
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  inputContainer: {
    marginBottom: 15,
  },
  passwordContainer: {
    position: 'relative',
  },
  forgotPasswordText: {
    color: '#FF640D',
    textAlign: 'right',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  loginButton: {
    backgroundColor: '#FF6B00',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginButtonText: {
    color: '#F6F6F7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  orText: {
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  socialButton: {
    flex: 0.48,
    padding: 12,
    borderRadius: 25,
    alignItems: 'center',
  },
  googleButton: {
    backgroundColor: '#FF6B00',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  facebookButton: {
    backgroundColor: '#FF6B00',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  googleText: {
    color: '#F6F6F7',
    fontWeight: 'bold',
  },
  facebookText: {
    color: '#F6F6F7',
    fontWeight: 'bold',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
    marginBottom: 5,
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
});

export default LoginScreen;
