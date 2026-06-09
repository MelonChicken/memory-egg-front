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

function getAuthHeaders() {
  const token = getAuthToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export function logoutUser() {
  localStorage.removeItem(TOKEN_STORAGE_KEY);
  localStorage.removeItem(USER_STORAGE_KEY);
  localStorage.removeItem(EGG_STORAGE_KEY);
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

function normalizeCurrentUserResponse(data) {
  // Backend currently returns:
  // { user: { user: {...}, egg: {...}, active_background: ..., ... } }
  // But this also supports simpler future shapes.
  const sessionData = data?.user?.user ? data.user : data;

  return {
    user: sessionData?.user || data?.user || null,
    egg: sessionData?.egg || data?.egg || null,
    active_background:
      sessionData?.active_background || data?.active_background || null,
    active_music: sessionData?.active_music || data?.active_music || null,
    active_cosmetic:
      sessionData?.active_cosmetic || data?.active_cosmetic || null,
  };
}

function saveCurrentSessionToStorage(session) {
  if (session.user) {
    saveUserToStorage(session.user);
  }

  if (session.egg) {
    saveEggToStorage(session.egg);
  }

  if (session.active_background) {
    localStorage.setItem(
      "memory_egg_active_background",
      JSON.stringify(session.active_background)
    );
  }

  if (session.active_music) {
    localStorage.setItem(
      "memory_egg_active_music",
      JSON.stringify(session.active_music)
    );
  }

  if (session.active_cosmetic) {
    localStorage.setItem(
      "memory_egg_active_cosmetic",
      JSON.stringify(session.active_cosmetic)
    );
  }
}

export async function getCurrentUser() {
  const token = getAuthToken();

  if (!token) {
    return loadUserFromStorage();
  }

  try {
    const response = await fetch(`${API_BASE_URL}/auth/me`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      if (response.status === 401 || response.status === 403 || response.status === 404) {
        logoutUser();
        return null;
      }

      throw new Error(data?.error || data?.message || "Failed to load user.");
    }

    const session = normalizeCurrentUserResponse(data);

    saveCurrentSessionToStorage(session);

    return session.user;
  } catch (error) {
    console.warn("Failed to refresh current user:", error);
    return loadUserFromStorage();
  }
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