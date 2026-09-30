---
aliases:
- /fr/serverless/gcp
- /fr/serverless/google_cloud
- /fr/serverless/google
further_reading:
- link: /integrations/google-cloud-run/
  tag: Documentation
  text: Intégration de Google Cloud Run
- link: /serverless/guide/disable_serverless
  tag: Documentation
  text: Désactiver Serverless Monitoring
- link: /opentelemetry/setup/otlp_ingest/serverless/?tab=gcp#cloud-run-and-cloud-run-functions
  tag: Documentation
  text: Envoyer les traces Cloud Run vers Datadog avec OTLP
- link: https://www.datadoghq.com/blog/collect-traces-logs-from-cloud-run-with-datadog/
  tag: Blog
  text: Recueillir des traces, logs et métriques custom à partir de services Cloud Run
title: Google Cloud Run
---
Google Cloud Run est une plateforme de calcul entièrement gérée qui vous permet d'exécuter des conteneurs sans état et des fonctions serverless avec une mise à l'échelle automatique, un équilibrage de charge intégré et une facturation à l'usage.

Datadog fournit une surveillance et une collecte de logs pour Cloud Run via l'[intégration Google Cloud][1].

Datadog propose également une solution pour instrumenter vos applications Cloud Run avec un agent Serverless afin d'activer le traçage, des métriques améliorées, des métriques personnalisées et la collecte directe de logs. Les [métriques améliorées][2] se distinguent par les espaces de noms `gcp.run.container.enhanced.*` et `gcp.run.job.enhanced.*`.

Pour l'instrumentation, sélectionnez votre charge de travail ci-dessous pour obtenir des instructions.

## Choisissez votre charge de travail {#choose-your-workload}

{{< card-grid card_width="350px" >}}
  {{< image-card href="/serverless/google_cloud_run/containers" title="Containers" >}}
  {{< image-card href="/serverless/google_cloud_run/jobs" title="Tâches" subtitle="(Aperçu)" >}}
  {{< image-card href="/serverless/google_cloud_run/functions" title="Fonctions" >}}
  {{< image-card href="/serverless/google_cloud_run/functions_1st_gen" title="Fonctions" subtitle="(1re génération)" >}}
{{< /card-grid >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]:/fr/integrations/google_cloud_platform/
[2]:/fr/integrations/google-cloud-run/#metrics