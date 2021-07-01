export function saveState<T>(key: string, state: T) {
  const stateAsString = JSON.stringify(state);
  localStorage.setItem(key, stateAsString);
}
