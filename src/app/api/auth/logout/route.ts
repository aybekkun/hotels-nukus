import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  cookies().set({
    name: 'auth-token',
    value: '',
    expires: new Date(0),
    path: '/',
  });
  
  return NextResponse.json({ message: 'Выход выполнен успешно' });
}
