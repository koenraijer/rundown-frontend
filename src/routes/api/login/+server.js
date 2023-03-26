import {json } from '@sveltejs/kit'
const secret_key = import.meta.env.VITE_SECRET_KEY;
const development_backend_url = import.meta.env.VITE_DEVELOPMENT_BACKEND_URL;
const production_backend_url = import.meta.env.VITE_PRODUCTION_BACKEND_URL;

export async function POST() {
    try {
        // To Flask/login        
        const response = await fetch(`${production_backend_url}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'secret_key': secret_key
            },
        })

        return json({
            status: response.status,
            body: await response.json()
        })
    } catch (error) {
        throw new Error(error)
    }
  }