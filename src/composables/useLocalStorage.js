export const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};
  
export const loadData = (key) => {
    const storedData = localStorage.getItem(key);
    return storedData ? JSON.parse(storedData) : null;
};