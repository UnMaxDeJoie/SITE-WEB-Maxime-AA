'use server';

import { login } from '@/lib/auth';
import { redirect } from 'next/navigation';

export async function loginAction(prevState: any, formData: FormData) {
    try {
        await login(formData);
    } catch (error: any) {
        return { error: 'Email ou mot de passe incorrect' };
    }
    redirect('/dashboard');
}
