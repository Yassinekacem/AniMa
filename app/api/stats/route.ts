import { NextResponse } from "next/server";
import axios from "axios";

const ES_HOST = "http://localhost:9200";
const ES_INDEX = "animaux";

export async function GET() {
  try {
    const esQuery = {
      size: 0, // no documents, only aggregations
      aggs: {
        species: {
          terms: { field: "espece.keyword", size: 5 }
        },
        sexe: {
          terms: { field: "sexe.keyword", size: 5 }
        },
        cities: {
          terms: { field: "city.keyword", size: 10 }
        },
        races_chien: {
          filter: { term: { espece: "chien" } },
          aggs: {
            races: {
              terms: { field: "race.keyword", size: 20 }
            }
          }
        },
        races_chat: {
          filter: { term: { espece: "chat" } },
          aggs: {
            races: {
              terms: { field: "race.keyword", size: 20 }
            }
          }
        },
        vaccinated: {
          terms: { field: "vacciné", size: 2 }
        },
        trained: {
          terms: { field: "dressé", size: 2 }
        }
      }
    };

    const response = await axios.post(
      `${ES_HOST}/${ES_INDEX}/_search`,
      esQuery,
      { headers: { "Content-Type": "application/json" } }
    );

    const aggs = response.data.aggregations;

    return NextResponse.json({
      species: aggs.species.buckets,
      sexe: aggs.sexe.buckets,
      cities: aggs.cities.buckets,
      races_chien: aggs.races_chien.races.buckets,
      races_chat: aggs.races_chat.races.buckets,
      vaccinated: aggs.vaccinated.buckets,
      trained: aggs.trained.buckets
    });

  } catch (error: any) {
    console.error("ES Stats Error", error.response?.data || error);
    return NextResponse.json(
      { error: "Failed to load statistics" },
      { status: 500 }
    );
  }
}
