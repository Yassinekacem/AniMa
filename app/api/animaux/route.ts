import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch("http://localhost:9200/animaux/_search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: { match_all: {} },
        size: 100  // récupère jusqu'à 100 animaux
      })
    });

    const data = await res.json();

    // Elasticsearch renvoie les documents sous data.hits.hits
    const animaux = data.hits.hits.map((hit: any) => hit._source);

    return NextResponse.json(animaux);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Impossible de récupérer les animaux" }, { status: 500 });
  }
}
