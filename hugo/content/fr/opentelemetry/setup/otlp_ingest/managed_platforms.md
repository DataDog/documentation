---
aliases:
- /fr/opentelemetry/setup/agentless/managed_platforms
description: Envoyez des traces, des métriques et des logs depuis des plateformes
  gérées comme Cloudflare, Vercel et Heroku directement vers Datadog via des endpoints
  OTLP dédiés.
further_reading:
- link: /opentelemetry/compatibility/
  tag: Documentation
  text: Compatibilité OpenTelemetry dans Datadog
- link: /opentelemetry/setup/otlp_ingest/
  tag: Documentation
  text: Endpoint d'ingestion OTLP Datadog
title: Ingestion OTLP pour les plateformes gérées
---
## Présentation {#overview}

Datadog fournit des endpoints d'ingestion OTLP dédiés pour les plateformes gérées, vous permettant d'envoyer des traces, des métriques et des logs directement vers Datadog avec une configuration minimale. Chaque plateforme prise en charge possède son propre sous-domaine OTLP (par exemple, `cloudflare.integrations.otlp.datadoghq.com`). Ces endpoints dédiés permettent à Datadog d'identifier la source du trafic et d'appliquer un traitement et une attribution spécifiques à la plateforme. L'endpoint OTLP générique suppose qu'un host est présent, ce qui peut entraîner un comportement inattendu pour le trafic des plateformes gérées.

Utilisez cette option lorsque vous exécutez des charges de travail sur une plateforme gérée où l'installation d'un [Datadog Agent][1] ou d'un [OpenTelemetry Collector][2] n'est pas réalisable. Si votre plateforme ne figure pas dans le tableau ci-dessous et que vous utilisez des services de calcul serverless AWS, Azure ou GCP, consultez [Serverless][5].

<div class="alert alert-danger">Les métadonnées de host envoyées aux endpoints de plateforme gérée ne remplissent pas la <a href="/infrastructure/list/">liste des hosts d'infrastructure</a>.</div>

Chaque endpoint prend en charge les chemins de signal suivants :

| Signal  | Chemin          |
|---------|---------------|
| Traces  | `/v1/traces`  |
| Métriques | `/v1/metrics` |
| Logs    | `/v1/logs`    |

Pour une configuration spécifique aux signaux (traduction de métriques, traitement de logs), consultez les pages des endpoints [Logs][6] et [Metrics][7].

## Configuration {#configuration}

Pour envoyer des données OTLP vers Datadog via un endpoint de plateforme gérée, configurez votre exportateur OpenTelemetry avec les variables d'environnement suivantes. Remplacez `{platform}` par le sous-domaine de votre plateforme issu du tableau des [plateformes prises en charge](#supported-platforms).

```shell
export OTEL_EXPORTER_OTLP_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}"
export OTEL_EXPORTER_OTLP_HEADERS="dd-api-key=${DD_API_KEY}"
```

Pour envoyer uniquement des traces :

```shell
export OTEL_EXPORTER_OTLP_TRACES_PROTOCOL="http/protobuf"
export OTEL_EXPORTER_OTLP_TRACES_ENDPOINT="https://{platform}.integrations.otlp.{{< region-param key="dd_site" >}}/v1/traces"
export OTEL_EXPORTER_OTLP_TRACES_HEADERS="dd-api-key=${DD_API_KEY}"
```

<div class="alert alert-info">Les endpoints de plateforme gérés n'utilisent pas le <code>dd-otlp-source</code> en-tête. Si vous migrez depuis l'endpoint OTLP générique, supprimez cet en-tête de votre configuration.</div>

## Plateformes prises en charge {#supported-platforms}

Tous les endpoints suivent le modèle `https://{subdomain}.integrations.otlp.{{< region-param key="dd_site" >}}/`.

| Plateforme | Sous-domaine | Guide de configuration |
|---|---|---|
| AWX | `awx` | — |
| Claude | `claude` | — |
| Cloudflare | `cloudflare` | [Observabilité de Cloudflare Workers][11] |
| Cribl | `cribl` | — |
| GitHub Actions | `github-actions` | — |
| Grafbase | `grafbase` | [Observabilité de Grafbase][12] |
| Heroku | `heroku` | [Télémétrie Heroku][13] |
| IBM | `ibm` | — |
| LangSmith | `langsmith` | — |
| LiveCloudKit | `livekit` | — |
| Modal | `modal` | [Modal OpenTelemetry][14] |
| MuleSoft | `mulesoft` | [MuleSoft Telemetry Exporter][15] |
| Netlify | `netlify` | — |
| OpenTofu | `opentofu` | — |
| Retool | `retool` | [Retool performance monitoring][16] |
| RWX | `rwx` | [RWX OpenTelemetry][17] |
| Salesforce | `sfdc` | — |
| Shopify | `shopify` | — |
| Solace | `solace` | — |
| Spacelift | `spacelift` | — |
| Supabase | `supabase` | — |
| Svix | `svix` | — |
| Trigger.dev | `triggerdev` | — |
| Vercel | `vercel` | [Vercel Marketplace][18] |

Pour activer l'exportation OTLP depuis une plateforme gérée non listée ci-dessus, contactez votre Customer Success Manager.

## Limitations {#limitations}

### Aucun enrichissement de métadonnées {#no-metadata-enrichment}

Sans Collector ou Agent, la télémétrie n'est pas enrichie avec les métadonnées du host. Les fonctionnalités qui dépendent de ces métadonnées (par exemple, la [liste des hosts d'infrastructure][8]) sont indisponibles. Consultez la [liste de compatibilité OpenTelemetry][4] pour obtenir la liste complète des fonctionnalités concernées.

### Normalisation limitée {#limited-normalization}

Certains traitements de signal qu'un collecteur ou un Agent effectue automatiquement ne se produisent pas avec l'ingestion directe. Par exemple, la conversion de métriques cumulatives en delta nécessite un composant avec état. Si votre plateforme exporte des métriques cumulatives, configurez votre SDK ou votre pipeline pour exporter une temporalité delta.

### Métriques de trace {#trace-metrics}

Les [métriques de trace][3] sont calculées par défaut pour les endpoints de plateforme gérés. Les plateformes gérées peuvent échantillonner le trafic avant l'exportation, ce qui peut affecter la précision des métriques de trace.

### Échantillonnage {#sampling}

Les contrôles d'échantillonnage disponibles dans le Collecteur (échantillonnage basé sur le suivi, échantillonnage probabiliste) ne sont pas disponibles avec l'ingestion directe. Les plateformes gérées peuvent appliquer leur propre échantillonnage avant l'exportation.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/opentelemetry/otlp_ingest_in_the_agent/
[2]: /fr/opentelemetry/setup/collector_exporter/
[3]: /fr/tracing/metrics/
[4]: /fr/opentelemetry/compatibility/
[5]: /fr/opentelemetry/setup/otlp_ingest/serverless/
[6]: /fr/opentelemetry/setup/otlp_ingest/logs/
[7]: /fr/opentelemetry/setup/otlp_ingest/metrics/
[8]: /fr/infrastructure/list/
[11]: https://developers.cloudflare.com/workers/observability/exporting-opentelemetry-data/
[12]: https://grafbase.com/docs/gateway/observability
[13]: https://devcenter.heroku.com/articles/heroku-telemetry
[14]: https://modal.com/docs/guide/otel-integration
[15]: https://docs.mulesoft.com/monitoring/telemetry-exporter
[16]: https://docs.retool.com/apps/guides/observability/performance-monitoring
[17]: https://www.rwx.com/docs/observability/datadog
[18]: https://vercel.com/marketplace/datadog