const USER_STORAGE_KEY = "memory_egg_user";

const defaultUser = {
  user_id: 1,
  email: "demo@nacimiento.app",
  nickname: "Wanderer",
  will_balance: 0,
  created_at: new Date().toISOString(),
};

function loadUserFromStorage() {
  const savedUser = localStorage.getItem(USER_STORAGE_KEY);

  if (!savedUser) {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }

  const parsedUser = JSON.parse(savedUser);

  if (!parsedUser || typeof parsedUser !== "object") {
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(defaultUser));
    return defaultUser;
  }

  return parsedUser;
}

function saveUserToStorage(user) {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
}


/* Exported API logic to be replaced by backend */

export async function getCurrentUser() {
  return loadUserFromStorage();
}

export async function addWill(amount) {
  const user = loadUserFromStorage();

  const updatedUser = {
    ...user,
    will_balance: user.will_balance + amount,
  };

  saveUserToStorage(updatedUser);

  return updatedUser;
}

export async function spendWill(amount) {
  const user = loadUserFromStorage();

  if (user.will_balance < amount) {
    throw new Error("Not enough Will.");
  }

  const updatedUser = {
    ...user,
    will_balance: user.will_balance - amount,
  };

  saveUserToStorage(updatedUser);

  return updatedUser;
}