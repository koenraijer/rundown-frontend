import { writable } from 'svelte/store';

const isBrowser = typeof window !== 'undefined';

export function persist(key, value) {
  const storedValue = isBrowser ? localStorage.getItem(key) : null;
  const data = writable(storedValue ? JSON.parse(storedValue) : value);

  console.log(`[persist] Key: ${key}, Stored Value: ${storedValue}, Initial Value: ${value}`);

  if (isBrowser) {
    data.subscribe(($data) => {
      console.log(`[persist] Key: ${key}, Updating Value: ${JSON.stringify($data)}`);
      localStorage.setItem(key, JSON.stringify($data));
    });
  }

  return data;
}
