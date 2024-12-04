import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {HomeStyle} from './HomeStyles';
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
    <View style={HomeStyle.card}>
      <Image source={{uri: item.image}} style={HomeStyle.recipeImage} />
      <View style={HomeStyle.ratingContainer}>
        <View style={HomeStyle.ratingLabel}>
          <Text style={HomeStyle.ratingText}>★ {item.rating.toFixed(1)}</Text>
        </View>
      </View>
      <View style={HomeStyle.cardContent}>
        <Text style={HomeStyle.recipeName}>{item.name}</Text>
        <Text style={HomeStyle.recipeInstructions} numberOfLines={2}>
          {item.instructions[0]}
        </Text>
        <Text style={HomeStyle.recipeInstructions} numberOfLines={1}>
          {item.instructions[1]}
        </Text>
      </View>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={HomeStyle.centerContainer}>
        <ActivityIndicator size="large" color="#FF6B00" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={HomeStyle.centerContainer}>
        <Text style={HomeStyle.errorText}>{error}</Text>
        <TouchableOpacity
          style={HomeStyle.refreshButton}
          onPress={fetchRecipes}>
          <Text style={HomeStyle.refreshButtonText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={HomeStyle.container}>
      <View style={HomeStyle.header}>
        <Text style={HomeStyle.greeting}>Hello, {username}.</Text>
        <Text style={HomeStyle.subGreeting}>What do you want to eat?</Text>
      </View>

      <FlatList
        data={recipes}
        renderItem={renderRecipeCard}
        keyExtractor={item => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={HomeStyle.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default HomeScreen;
