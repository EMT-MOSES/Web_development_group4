const USERS_STORAGE_KEY = 'users';

function loadStoredUsers() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    return JSON.parse(window.localStorage.getItem(USERS_STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

async function loadDefaultUsers() {
  const response = await fetch('/users.json');
  const data = await response.json();

  return Array.isArray(data.users) ? data.users : [];
}

export async function getAllUsers() {
  const [defaultUsers, storedUsers] = await Promise.all([
    loadDefaultUsers(),
    Promise.resolve(loadStoredUsers()),
  ]);

  return [...defaultUsers, ...storedUsers];
}

export { loadStoredUsers, loadDefaultUsers, USERS_STORAGE_KEY };
