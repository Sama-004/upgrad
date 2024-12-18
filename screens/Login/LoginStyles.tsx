import {StyleSheet} from 'react-native';

export const LoginStyle = StyleSheet.create({
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

export default LoginStyle;
