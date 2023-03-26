import {json } from '@sveltejs/kit'
const secret_key = import.meta.env.VITE_SECRET_KEY;

export async function POST() {
    try {
        // To Flask/login        
        const response = await fetch('http://127.0.0.1:5000/login',{
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