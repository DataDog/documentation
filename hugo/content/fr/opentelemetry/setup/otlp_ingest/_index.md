---
aliases:
- /fr/opentelemetry/setup/intake_endpoint/
- /fr/opentelemetry/setup/agentless/
further_reading:
- link: /opentelemetry/setup
  tag: Documentation
  text: Envoyer des données à Datadog
- link: https://www.datadoghq.com/blog/native-otel-with-datadog/
  tag: Blog
  text: Utilisez l'observabilité native OpenTelemetry avec Datadog, de l'ingestion
    à l'investigation.
title: Endpoint d'ingestion OTLP Datadog
---
## Présentation {#overview}

Pour les charges de travail en production, Datadog recommande d'envoyer les données OpenTelemetry via un [Datadog Agent][1] ou un [OpenTelemetry Collector][2]. Ces composants assurent l'enrichissement des métadonnées, le traitement des signaux et l'échantillonnage centralisé. La configuration recommandée du Collector exporte la télémétrie vers Datadog via OTLP.

Utilisez les endpoints d'ingestion OTLP directs sur cette page lorsqu'il n'est pas possible de déployer un Collector ou un Agent. Les exemples incluent les fonctions serverless, les plateformes gérées qui exportent la télémétrie pour vous, et les environnements soumis à des contraintes de ressources strictes.

{{< img src="/opentelemetry/setup/direct-ingest.png" alt="Diagramme : le SDK OpenTelemetry envoie les données directement à Datadog via l'endpoint d'ingestion." style="width:100%;" >}}

Votre configuration dépend de la provenance de votre télémétrie. Vérifiez d'abord la liste des [Plateformes gérées][6] ; si votre plateforme dispose d'un endpoint dédié, utilisez-le. Sinon, utilisez les pages dédiées au serverless ou aux signaux spécifiques.

| Si vos données de télémétrie proviennent de... | Commencez ici |
|---|---|
| Une plateforme gérée (Cloudflare, Vercel, Heroku, Netlify, Modal et [autres][6]) | [Plateformes gérées][6] |
| Un environnement serverless envoyant des traces (Lambda, ECS Fargate, Azure Functions, Cloud Run, GKE Autopilot) | [Serverless][7] |
| Votre propre application, host ou conteneur | [Logs][3], [Metrics][4] ou [Traces][8] |

Voir aussi : [Instrumenting for Agent Observability][5].

## Limites d'ingestion {#intake-limits}

Datadog impose une taille de charge utile maximale par requête sur chaque endpoint d'ingestion OTLP. Les requêtes qui dépassent cette limite sont rejetées avec une réponse `HTTP 413 Request Entity Too Large`. Si vous recevez une erreur 413, réduisez la taille du lot d'exportation ou effectuez des vidages plus fréquents afin que chaque requête reste sous la limite.

| Signal | Chemin de l'endpoint | Taille maximale de la charge utile |
|---------|-----------------|-------------------------|
| Métriques | `/v1/metrics`   | 512 KiB (compressé)    |
| Logs    | `/v1/logs`      | 5.1 MiB (non compressé)  |
| Traces  | `/v1/traces`    | 15 MiB (non compressé)   |

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/otlp_ingest_in_the_agent/
[2]: /fr/opentelemetry/setup/collector_exporter/
[3]: /fr/opentelemetry/setup/otlp_ingest/logs/
[4]: /fr/opentelemetry/setup/otlp_ingest/metrics/
[5]: /fr/llm_observability/instrument/otel_instrumentation/?tab=python#setup
[6]: /fr/opentelemetry/setup/otlp_ingest/managed_platforms/
[7]: /fr/opentelemetry/setup/otlp_ingest/serverless/
[8]: /fr/opentelemetry/setup/otlp_ingest/traces/