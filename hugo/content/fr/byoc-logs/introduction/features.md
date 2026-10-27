---
aliases:
- /fr/cloudprem/introduction/features/
description: Découvrez quelles fonctionnalités de Datadog Log Explorer sont prises
  en charge dans BYOC Logs
title: Fonctionnalités prises en charge
---
## Présentation {#overview}

Datadog BYOC (Bring Your Own Cloud) Logs apporte les principales fonctionnalités de Log Explorer à votre environnement auto-hébergé. Cette page présente les fonctionnalités disponibles, note les différences éventuelles avec la plateforme SaaS et vous aide à planifier vos workflows de logs.

## Fonctionnalités prises en charge {#supported-features}

### Recherche et visualisation {#search-and-visualization}

- Recherche plein texte sur n'importe quel attribut de log
- Visualisations Liste, Série temporelle, Top list, Tableau, Treemap, Graphique en secteurs et Nuage de points
- Regroupement dans Fields et Patterns (sauf décalage temporel mensuel)
- Regroupement et tri, y compris avec comptage des valeurs uniques
- Requêtes de regroupement à plat
- Filtrage et exploration basés sur des facettes
- Téléchargement au format CSV
- Pagination
- Notebooks (Preview)

### Dashboards et monitors {#dashboards-and-monitors}

- Dashboards avec des données de BYOC Logs
- Monitors de logs sur les index de BYOC Logs

### Gestion des index {#index-management}

- Index multiples avec des périodes de rétention et des règles de routage indépendantes

### Contrôle d'accès {#access-control}

- RBAC via [Log Restriction Queries][1]

### Corrélation {#correlation}

- Corrélation entre un log dans BYOC Logs et des métriques envoyées au SaaS Datadog
- Corrélation entre un log dans BYOC Logs et des traces envoyées au SaaS Datadog
- Corrélation entre un log dans BYOC Logs et des processus envoyés au SaaS Datadog

### Traitement {#processing}

- Pipelines de traitement configurables via Observability Pipelines
- Connexion Observability Pipeline

### Fonctionnalités IA {#ai-features}

- Bits Investigation (Preview)
- MCP Server (Preview)

## Fonctionnalités non prises en charge {#unsupported-features}

BYOC Logs ne prend pas en charge les fonctionnalités suivantes :

- SIEM
- Watchdog
- Recherche fédérée
- LiveTail
- Vue du contexte des logs

### Fonctionnalités de requête non prises en charge {#unsupported-query-capabilities}

- Requête CIDR
- Regroupement par transactions
- Fonctionnalités de requête avancées :
  - Champs calculés
  - Extraction Grok (parsing au moment de la requête)

[1]: /fr/api/latest/logs-restriction-queries/