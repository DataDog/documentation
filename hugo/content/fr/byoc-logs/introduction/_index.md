---
aliases:
- /fr/cloudprem/introduction/
description: Découvrez l'architecture, les composants et les fonctionnalités prises
  en charge par BYOC Logs
title: Introduction à BYOC Logs
---
## Présentation {#overview}

BYOC (Bring Your Own Cloud) Logs est la solution de gestion de logs de Datadog qui s'exécute dans votre propre infrastructure. Elle indexe et stocke les logs dans votre stockage d'objets, exécute des requêtes de recherche et d'analyse, et se connecte à l'interface utilisateur Datadog pour une expérience entièrement intégrée. BYOC Logs est conçu pour les organisations ayant des exigences spécifiques :
- Exigences en matière de résidence des données, de confidentialité et de réglementation :
- Exigences en matière de volume élevé :

Voici une vue d'ensemble du fonctionnement de BYOC Logs :

{{< img src="/cloudprem/overview_diagram_byoc.png" alt="Vue d'ensemble de l'architecture de BYOC Logs montrant comment les logs circulent des sources vers la plateforme Datadog via BYOC Logs :" style="width:100%;" >}}

Le diagramme illustre l'architecture hybride de BYOC Logs, en soulignant comment les données sont traitées et stockées au sein de votre infrastructure :

*   **Ingestion** : Les logs sont collectés depuis les Datadog Agents et d'autres sources à l'aide de protocoles standard.
*   **Votre infrastructure** : La plateforme BYOC Logs s'exécute entièrement au sein de votre infrastructure. Elle traite et stocke les logs dans votre propre stockage d'objets (Amazon S3, Google Cloud Storage ou Azure Blob Storage).
*   **Datadog SaaS** : La plateforme Datadog est le plan de contrôle de BYOC Logs. Elle héberge l'interface utilisateur Datadog et communique avec BYOC Logs via une connexion sécurisée pour envoyer des requêtes de logs et recevoir des résultats.

{{< whatsnext desc="Explorez l'architecture et les capacités de BYOC Logs :">}}
  {{< nextlink href="/byoc-logs/introduction/architecture/" >}}Architecture - Comprenez comment les composants de BYOC Logs fonctionnent ensemble{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/network/" >}}Réseau - Comprenez comment BYOC Logs communique avec Datadog{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/introduction/features/" >}}Fonctionnalités prises en charge - Découvrez quelles fonctionnalités de l'explorateur de logs sont disponibles dans BYOC Logs{{< /nextlink >}}
{{< /whatsnext >}}

## Démarrez {#get-started}

{{< whatsnext desc="Prêt à déployer BYOC Logs ? Suivez ces guides :">}}
  {{< nextlink href="/byoc-logs/quickstart/" >}}Démarrage rapide - Exécutez BYOC Logs localement en 5 minutes{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/install/" >}}Installation - Déployez BYOC Logs sur AWS, GCP ou Azure{{< /nextlink >}}
  {{< nextlink href="/byoc-logs/ingest/agent/" >}}Ingestion de logs - Configurez le Datadog Agent pour envoyer des logs à BYOC Logs{{< /nextlink >}}
{{< /whatsnext >}}