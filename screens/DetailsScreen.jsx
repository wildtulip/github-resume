// screens/DetailsScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  getUserData,
  getUserRepositories,
  getRepositoryLanguages,
} from "../services/api";

const DetailsScreen = ({ route, navigation }) => {
  const { username } = route.params;
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [languagesData, setLanguagesData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getUserData(username);
        setUserData(userData);

        const repositories = await getUserRepositories(username);
        setRepositories(repositories);

        const languagesData = await fetchLanguages(repositories);
        setLanguagesData(languagesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [username]);

  const fetchLanguages = async (repositories) => {
    const languagesData = {};

    for (const repo of repositories) {
      const repoLanguages = await getRepositoryLanguages(repo.languages_url);
      Object.entries(repoLanguages).forEach(([language, bytes]) => {
        if (languagesData[language]) {
          languagesData[language] += bytes;
        } else {
          languagesData[language] = bytes;
        }
      });
    }

    return languagesData;
  };

  const calculateLanguagePercentage = (languageBytes) => {
    const totalBytes = Object.values(languagesData).reduce(
      (total, bytes) => total + bytes,
      0
    );
    return ((languageBytes / totalBytes) * 100).toFixed(2);
  };

  const renderRepositoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => {
        /* Navigate to repository details screen if needed */
      }}
      style={styles.repositoryItem}
    >
      <Text style={styles.repositoryName}>{item.name}</Text>
      <Text>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {userData?.notFound ? (
        <Text>User not found</Text>
      ) : (
        <View>
          {repositories.length > 0 ? (
            <FlatList
              data={repositories}
              renderItem={renderRepositoryItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text>No repositories found</Text>
          )}

          <Text>Languages Usage:</Text>
          {Object.entries(languagesData).map(([language, bytes]) => (
            <Text key={language}>
              {language}: {calculateLanguagePercentage(bytes)}%
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  repositoryItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  repositoryName: {
    fontWeight: "bold",
  },
});

export default DetailsScreen;
