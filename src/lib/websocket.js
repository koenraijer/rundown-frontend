import { persist } from '$lib/customStore';
import { io } from 'socket.io-client';
import { derived } from 'svelte/store';

export const spotifyData = persist('spotifyData', {});
export const userName = persist('userName', '');

export const isAuthenticated = derived(spotifyData, ($spotifyData) => {
  return Object.keys($spotifyData).length > 0;
});

export function connect() {
  const socket = io('http://127.0.0.1:5000');

  socket.on('connect', () => {
    console.log('Socket.IO connection opened');
  });

  socket.on('spotify_data', (data) => {
    console.log('Socket.IO message received');
    // Update the state when data is received
    spotifyData.update(() => data);
    userName.update(() => data.user_id);
  });

  socket.on('disconnect', () => {
    console.log('Socket.IO connection closed');
  });

  socket.on('error', (error) => {
    console.error('Socket.IO error:', error);
  });

  return socket;
}
