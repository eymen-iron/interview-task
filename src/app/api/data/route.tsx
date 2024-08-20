import { NextResponse } from 'next/server';


interface QueryParams {
  [key: string]: string | number | boolean | undefined;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const params: QueryParams = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });
  const data = await fetch(`https://rickandmortyapi.com/api/character?${new URLSearchParams(params).toString()}`);
  const response = await data.json();
  
  return NextResponse.json({ results: response.results });
}

