---
aliases:
- /fr/bits_ai/bits_ai_sre/chat_bits_ai_sre/
title: Discussion avec Bits Investigation
---
Dans le cadre d'une investigation, vous pouvez discuter avec Bits pour recueillir des informations supplémentaires sur l'investigation, la télémétrie associée, et plus encore.

{{< img src="bits_ai/bits_ai_sre_chat_example.png" alt="Exemple de discussion où un utilisateur interroge Bits AI au sujet d'incidents en cours liés, et où Bits AI répond avec une liste d'incidents liés et une explication de ce qui les relie." style="width:100%;" >}}

## Sources de données {#data-sources}

Le chatbot Bits Investigation a accès à :
- **Détails de l'investigation** : Détails sur l'alerte du monitor, les requêtes exploratoires exécutées, les hypothèses et leurs évaluations, ainsi que la conclusion sur la cause racine
- **Télémétrie** : Détails sur les métriques, les logs, les traces, les événements, les monitors, les événements RUM, les dashboards, les notebooks et les hosts
- **Incidents** : Détails sur les incidents et leur statut, leur gravité, et plus encore
- **Services** : Détails sur les services in Catalog, leurs dépendances, leurs propriétaires, et plus encore
- **Documentation Datadog** : Informations documentées sur les produits Datadog
- **Documentation Confluence** : Documentation ou runbooks pertinents issus de votre documentation Confluence (si l'[intégration Confluence est configurée pour permettre l'exploration du compte][1])

## Exemples de questions {#example-questions}

| Fonctionnalité                                  | Exemple de prompt                                                    | Source de données                       |
|------------------------------------------------|-------------------------------------------------------------------|-----------------------------------|
| Demander des précisions sur les détails de l'investigation | `Why do you think there's database query slowness?`               | Bits Investigation details |
| Demander des approfondissements sur les conclusions de l'investigation | `Tell me more about the increased 500s on <web-store>.`           | Bits Investigation details |
| Apprendre à améliorer le fonctionnement de Bits | `How can I make the investigation more effective next time?`      | Bits Investigation details |
| Rechercher des informations sur un service | `Are there any ongoing incidents for <web-store>?`                | Catalog and Incidents |
| Trouver les changements récents pour un service | `Were there any recent changes on <web-store>?`                   | Change Tracking |
| Interroger les métriques de requête, d'erreur et de durée APM | `What's the current error rate for <web-store>?`                  | APM                               |
| Interroger et analyser les données de profilage | `What performance bottlenecks do you see for <web-store>?`        | Continuous Profiler |
| Se renseigner sur les produits Datadog                     | `Does Bits Investigation connect to Datadog Work Management?`     | Documentation Datadog             |
| Créer un Notebook                              | `Can you create a notebook with a summary of this investigation?` | Notebooks                         |

[1]: bits_ai/bits_investigation/configure#confluence