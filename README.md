# Plateforme d’analyse et de supervision d’une animalerie en ligne (ELK)

Plateforme permettant d’importer et analyser des fichiers de logs afin de superviser l’activité d’une animalerie en ligne.  
Elle facilite la recherche, le filtrage et la visualisation des indicateurs via des tableaux de bord intégrés dans l’application. [web:217]

## Fonctionnalités
- Authentification : Sign up / Sign in.
- Consultation des animaux : liste + recherche plein texte + filtres multi-critères (ex. ville, race, sexe, vaccination, disponibilité).
- Importation des logs : upload de fichiers et ingestion.
- Supervision : dashboards et indicateurs (dont intégration d’un dashboard Kibana dans l’application).

## Architecture (résumé)
- Ingestion/traitement des logs puis indexation pour permettre la recherche et l’analytics.
- Visualisation via dashboards et intégration des vues de supervision dans l’interface. [web:217]

## Technologies utilisées
- Next.js
- Elasticsearch
- Logstash
- Kibana
- MongoDB

## Prérequis
- Node.js + npm (ou yarn/pnpm)
- Elasticsearch + Kibana
- Logstash
- MongoDB

## Installation & exécution (exemple)
1. Cloner le projet
   ```bash
   git clone https://github.com/Yassinekacem/AniMa.git
   cd anima
