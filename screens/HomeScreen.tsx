import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

type Recipe = {
  id: number;
  name: string;
  instructions: string[];
  image: string;
  difficulty: string;
  cuisine: string;
  rating: number;
};

const HomeScreen = () => {
  const route = useRoute();
  const {username} = route.params as {username: string};
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const fetchRecipes = async () => {
    try {
      setError(null);
      const response = await fetch('https://dummyjson.com/recipes');
      const data = await response.json();
      setRecipes(data.recipes);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchRecipes();
  };

  const renderRecipeCard = ({item}: {item: Recipe}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.recipeImage} />
      <View style={styles.ratingContainer}>
        <View style={styles.ratingLabel}>
          <Text style={styles.ratingText}>★ {item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={styles.cardContent}>
        <Text style={styles.recipeName}>{item.name}</Text>
        <Text style={styles.recipeInstructions} numberOfLines={2}>
          {item.instructions[0]}
        </Text>
        <Text style={styles.recipeInstructions} numberOfLines={1}>
          {item.instructions[1]}
        </Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.refreshButton} onPress={fetchRecipes}>
          <Text style={styles.refreshButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hello, {username}.</Text>
        <Text style={styles.subGreeting}>What do you want to eat?</Text>
      </View>

      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subGreeting: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  listContainer: {
    padding: 15,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  recipeImage: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  cardContent: {
    padding: 15,
  },
  recipeName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  recipeDetails: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  recipeInstructions: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: '#FF6B00',
    padding: 12,
    borderRadius: 8,
  },
  refreshButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ratingContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  ratingLabel: {
    backgroundColor: '#FF6B00',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default HomeScreen;
