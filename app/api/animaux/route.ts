// app/api/animaux/route.ts
import { NextResponse } from "next/server";
import axios from "axios";

const ES_HOST = "http://localhost:9200";
const ES_INDEX = "animaux";

export async function GET(req: Request) {
  const url = new URL(req.url);

  // ---- FILTRES RÉCUPÉRÉS DU FRONT ----
  const espece = url.searchParams.get("espece");
  const race = url.searchParams.get("race");
  const city = url.searchParams.get("city");
  const sexe = url.searchParams.get("sexe");
  const vaccinated = url.searchParams.get("vacciné");
  const trained = url.searchParams.get("dressé");
  const age = url.searchParams.get("age");
  const search = url.searchParams.get("search");

  try {
    // Construction de la requête Elasticsearch
    const esQuery: any = {
      query: {
        bool: {
          must: [],
          filter: []
        }
      },
      sort: [
        { date_ajout: { order: "desc" } }
      ]
    };

    // ---- RECHERCHE PLEIN TEXTE AVANCÉE ----
    if (search && search.trim()) {
      const searchTerm = search.trim();
      
      esQuery.query.bool.must.push({
        bool: {
          should: [
            // Recherche sur plusieurs champs avec boosting
            {
              multi_match: {
                query: searchTerm,
                fields: [
                  "race^3",          // Boost élevé pour la race
                  "description^2",   // Boost moyen pour la description
                  "city",            // Ville
                  "espece"           // Espèce
                ],
                fuzziness: "AUTO",   // Correction orthographique automatique
                operator: "or",
                type: "best_fields", // Meilleurs champs
                tie_breaker: 0.3
              }
            },
            // Recherche de phrase exacte (entre guillemets)
            {
              match_phrase: {
                description: {
                  query: searchTerm,
                  slop: 2 // Permet quelques mots entre les termes
                }
              }
            },
            // Recherche par préfixe (commence par...)
            {
              prefix: {
                race: searchTerm.toLowerCase()
              }
            }
          ],
          minimum_should_match: 1
        }
      });

      // Tri par pertinence pour les recherches
      esQuery.sort.unshift({ _score: { order: "desc" } });
    } else {
      // Sans recherche, on prend tous les documents
      esQuery.query.bool.must.push({ match_all: {} });
    }

    // ---- FILTRES AVANCÉS (insensibles à la casse) ----
    const filters: any[] = [];

    // Filtre par espèce (exact match)
    if (espece) {
      filters.push({ term: { espece: espece.toLowerCase() } });
    }

    // Filtre par race (insensible à la casse avec wildcard)
    if (race) {
      filters.push({
        wildcard: {
          race: {
            value: `*${race.toLowerCase()}*`,
            case_insensitive: true
          }
        }
      });
    }

    // Filtre par ville (insensible à la casse avec analyse de texte)
    if (city) {
      filters.push({
        match: {
          "city.keyword": {
            query: city,
            operator: "and",
            fuzziness: "AUTO"
          }
        }
      });
    }

    // Filtre par sexe (exact match)
    if (sexe) {
      filters.push({ term: { sexe } });
    }

    // Filtres booléens
    if (vaccinated === "true") filters.push({ term: { vacciné: true } });
    if (trained === "true") filters.push({ term: { dressé: true } });
    
    // Filtre par âge (insensible à la casse)
    if (age) {
      filters.push({
        wildcard: {
          age: {
            value: `*${age.toLowerCase()}*`,
            case_insensitive: true
          }
        }
      });
    }

    // Ajouter tous les filtres
    if (filters.length > 0) {
      esQuery.query.bool.filter = filters;
    }

    // ---- SUGGESTIONS DE RECHERCHE (optionnel) ----
    if (search && search.trim()) {
      esQuery.suggest = {
        text: search.trim(),
        suggestion: {
          term: {
            field: "description",
            suggest_mode: "popular",
            size: 3
          }
        }
      };
    }

    // ---- AGGREGATIONS POUR LES FILTRES DISPONIBLES ----
    esQuery.aggs = {
      cities: {
        terms: {
          field: "city.keyword",
          size: 20,
          order: { _count: "desc" }
        }
      },
      breeds: {
        terms: {
          field: "race.keyword",
          size: 15,
          order: { _count: "desc" }
        }
      },
      species: {
        terms: {
          field: "espece.keyword",
          size: 5
        }
      },
      vaccinated_stats: {
        filter: { term: { vacciné: true } }
      },
      trained_stats: {
        filter: { term: { dressé: true } }
      }
    };

    // Exécution de la requête
    const response = await axios.post(
      `${ES_HOST}/${ES_INDEX}/_search`,
      esQuery,
      { 
        headers: { "Content-Type": "application/json" },
        timeout: 10000
      }
    );

    // Formatage des résultats
    const hits = response.data.hits.hits.map((h: any) => ({
      id: h._id,
      _score: h._score,
      ...h._source
    }));

    // Extraction des suggestions
    const suggestions = response.data.suggest?.suggestion?.[0]?.options?.map(
      (opt: any) => opt.text
    ) || [];

    // Extraction des aggregations
    const aggregations = {
      cities: response.data.aggregations?.cities?.buckets?.map((b: any) => b.key) || [],
      breeds: response.data.aggregations?.breeds?.buckets?.map((b: any) => b.key) || [],
      species: response.data.aggregations?.species?.buckets?.map((b: any) => b.key) || [],
      vaccinated_count: response.data.aggregations?.vaccinated_stats?.doc_count || 0,
      trained_count: response.data.aggregations?.trained_stats?.doc_count || 0
    };

    return NextResponse.json({
      animals: hits,
      total: response.data.hits.total?.value || 0,
      suggestions,
      aggregations,
      search_performed: !!search
    });

  } catch (error: any) {
    console.error("Elasticsearch Error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });

    return NextResponse.json(
      { 
        error: "Failed to fetch data from Elasticsearch",
        details: error.message
      },
      { status: error.response?.status || 500 }
    );
  }
}