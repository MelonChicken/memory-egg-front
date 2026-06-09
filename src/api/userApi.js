const USER_STORAGE_KEY = "memory_egg_user";
const TOKEN_STORAGE_KEY = "memory_egg_token";
const EGG_STORAGE_KEY = "memory_egg_egg";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

function loadUserFromStorage() {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!savedUser) {
    return null;
  }

  const parsedUser = JSON.parse(savedUser);

  if (!parsedUser || typeof parsedUser !== "object") {
    localStorage.removeItem(USER_STORAGE_KEY);
    return null;
  }

  return parsedUser;
}

function saveUserToStorage(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}

function saveEggToStorage(egg) {
  if (egg) {
    localStorage.setItem(EGG_STORAGE_KEY, JSON.stringify(egg));
  }
}

function saveAuthSession(data) {
  localStorage.setItem(TOKEN_STORAGE_KEY, data.token);
  saveUserToStorage(data.user);
  saveEggToStorage(data.egg);

  return data.user;
}

export function getAuthToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY);
}

export function isAuthenticated() {
  return Boolean(getAuthToken());
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
}

export async function registerUser({ nickname, email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nickname,
      email,
      password,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Failed to register.");
  }

  return saveAuthSession(data);
}

export async function loginUser({ email, password }) {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.error || data?.message || "Failed to log in.");
  }

  return saveAuthSession(data);
}

export async function getCurrentUser() {
  return loadUserFromStorage();
}

export async function addWill(amount) {
  const user = loadUserFromStorage();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const updatedUser = {
    ...user,
    will_balance: Number(user.will_balance || 0) + Number(amount),
  };

  saveUserToStorage(updatedUser);

  return updatedUser;
}

export async function spendWill(amount) {
  const user = loadUserFromStorage();

  if (!user) {
    throw new Error("User is not logged in.");
  }

  const numericAmount = Number(amount);

  if (Number(user.will_balance || 0) < numericAmount) {
    throw new Error("Not enough Will.");
  }

  const updatedUser = {
    ...user,
    will_balance: Number(user.will_balance || 0) - numericAmount,
  };

  saveUserToStorage(updatedUser);

  return updatedUser;
}