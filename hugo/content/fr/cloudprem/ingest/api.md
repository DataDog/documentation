---
aliases:
- /fr/cloudprem/ingest_logs/rest_api/
description: Découvrir comment intégrer CloudPrem à l'aide d'appels API directs
further_reading:
- link: /cloudprem/ingest_logs/datadog_agent/
  tag: Documentation
  text: Intégration avec l'Agent Datadog
- link: /cloudprem/ingest_logs/observability_pipelines/
  tag: Documentation
  text: Intégration avec Observability Pipelines
title: Envoyer des logs à CloudPrem avec l'API REST
---

{{< callout url="https://www.datadoghq.com/product-preview/cloudprem/" btn_hidden="false" header="CloudPrem est en bêta" >}}
  Participez à la bêta de CloudPrem pour profiter de nouvelles fonctionnalités autohébergées de gestion des logs.
{{< /callout >}}

## Présentation

Vous pouvez envoyer des logs à CloudPrem à l'aide d'appels REST API directs. Cette méthode est utile pour les intégrations personnalisées ou les scripts ne pouvant pas utiliser un Agent Datadog ou Observability Pipelines.

## API Logs Datadog

**Endpoint** : `POST /api/v2/logs`<br>
**Content-Type** : `application/json`<br>
**Authentication** : Datadog Clé API

``Shell
curl -X POST "http://<RELEASE_NAME>-indexer.<NAMESPACE_NAME>.svc.cluster.local:7280/api/v2/logs" \N- H "Content-Type : application/json" \N- H "Content-Type : application/json" \N- H
  -H "Content-Type : application/json" \N -H "DD-API-ID" \N -H "DD-API-ID" \N
  -H "DD-API-KEY : your-datadog-api-key" \N -H "DD-API-KEY : your-datadog-api-key" \N
  -d '[
    {
      "message" : "User login successful",
      "level" : "info",
      "timestamp" : "2024-01-15T10:30:00Z",
      "service" : "auth-service",
      "host" : "web-01",
      "tags" : ["authentication", "success"]
    }
  ]'
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}