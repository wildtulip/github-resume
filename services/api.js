// services/api.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    Authorization:
      "Bearer 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",
  },
});

export const getUserData = async (username) => {
  try {
    const response = await instance.get(`/users/${username}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserRepositories = async (username) => {
  try {
    const response = await instance.get(`/users/${username}/repos`);
    return response.data.slice(0, 3);
  } catch (error) {
    throw error;
  }
};

export const getRepositoryLanguages = async (url) => {
  try {
    const response = await instance.get(url);
    return response.data;
  } catch (error) {
    throw error;
  }
};
