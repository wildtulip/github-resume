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

const DetailsScreen = ({ route }) => {
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
    <TouchableOpacity style={styles.repositoryItem}>
      <Text style={styles.repositoryName}>{item.name}</Text>
      <Text style={styles.repositoryDescription}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {userData?.notFound ? (
        <Text>User not found</Text>
      ) : (
        <View>
          {userData && (
            <View style={styles.userInfo}>
              <Text style={styles.infoLabel}>First Name:</Text>
              <Text style={styles.infoValue}>{userData.name || "None"}</Text>
              <Text style={styles.infoLabel}>Last Name:</Text>
              <Text style={styles.infoValue}>{userData.name || "None"}</Text>
              <Text style={styles.infoLabel}>Public Repositories:</Text>
              <Text style={styles.infoValue}>
                {userData.public_repos || "None"}
              </Text>
              <Text style={styles.infoLabel}>Joined Since:</Text>
              <Text style={styles.infoValue}>
                {userData.created_at
                  ? new Date(userData.created_at).toDateString()
                  : "None"}
              </Text>
            </View>
          )}
          <Text style={styles.recentRepositoriesTitle}>
            Recent repositories
          </Text>
          {repositories.length > 0 ? (
            <FlatList
              data={repositories}
              renderItem={renderRepositoryItem}
              keyExtractor={(item) => item.id.toString()}
            />
          ) : (
            <Text>No repositories found</Text>
          )}

          <Text style={styles.recentRepositoriesTitle}>
            Language percentage:
          </Text>
          {Object.entries(languagesData).map(([language, bytes]) => (
            <Text key={language} style={styles.languageUsage}>
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
    backgroundColor: "#F6F8FA",
    padding: 20,
  },
  userInfo: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: "#586069",
  },
  infoValue: {
    fontSize: 16,
    color: "#24292E",
  },
  repositoryItem: {
    backgroundColor: "#ffffff",
    padding: 16,
    marginBottom: 16,
    borderRadius: 6,
    borderColor: "#E1E4E8",
    borderWidth: 1,
  },
  repositoryName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 6,
    color: "#0366D6",
  },
  repositoryDescription: {
    fontSize: 14,
    color: "#586069",
  },
  recentRepositoriesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
    color: "#24292E",
  },
  languageUsage: {
    fontSize: 14,
    color: "#586069",
  },
});

export default DetailsScreen;
