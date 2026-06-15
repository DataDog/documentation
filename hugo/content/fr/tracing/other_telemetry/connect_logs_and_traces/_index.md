---
algolia:
  tags:
  - logs and traces
aliases:
- /fr/tracing/advanced/connect_logs_and_traces/
- /fr/tracing/connect_logs_and_traces/
description: Associez vos logs à vos traces pour les mettre en corrélation dans Datadog.
title: Corréler vos logs et vos traces
type: multi-code-lang
---
{{< img src="tracing/connect_logs_and_traces/logs-trace-correlation.png" alt="Journaux dans Traces" style="width:100%;">}}

La corrélation entre Datadog APM et Datadog Log Management est améliorée par l'injection d'IDs de trace, d'IDs de span, `env`, `service` et `version` en tant qu'attributs dans vos journaux. Avec ces champs, vous pouvez trouver les journaux exacts associés à un service et une version spécifiques, ou tous les journaux corrélés à une [trace][1] observée.

Il est recommandé de configurer le traceur de votre application avec `DD_ENV`, `DD_SERVICE` et `DD_VERSION`. Cela fournira la meilleure expérience pour ajouter `env`, `service` et `version`. Consultez la documentation sur [l'étiquetage de service unifié][2] pour plus de détails.

Avant de corréler les traces avec les journaux, assurez-vous que vos journaux sont soit envoyés au format JSON, soit [analysés par le processeur de journaux de niveau de langage approprié][3]. Vos journaux de niveau de langage _doivent_ être transformés en attributs Datadog afin que la corrélation entre traces et journaux fonctionne.

**Remarque** : Les traces et les journaux sont échantillonnés indépendamment. Même après que la corrélation soit configurée, un journal peut contenir un ID de trace qui fait référence à une trace qui n'a pas été ingérée ou qui n'a pas été conservée en raison de [l'échantillonnage de traces][4]. Cela n'indique pas une erreur de configuration. Pour plus d'informations, consultez [Le journal a un ID de trace mais la trace associée est manquante][5].

Pour en savoir plus sur l'association automatique ou manuelle de vos logs à vos traces, sélectionnez votre langage ci-dessous :

{{< card-grid card_width="170px">}}
  {{< image-card href="java/" src="integrations_logos/java.png" alt="Java" >}}
  {{< image-card href="python/" src="integrations_logos/python.png" alt="Python" >}}
  {{< image-card href="go/" src="integrations_logos/go-metro.png" alt="go" >}}
  {{< image-card href="ruby/" src="integrations_logos/ruby.png" alt="Ruby" >}}
  {{< image-card href="nodejs/" src="integrations_logos/nodejs.png" alt="Node.js" >}}
  {{< image-card href="dotnet/" src="integrations_logos/dotnet_text.png" alt=".Net" >}}
  {{< image-card href="php/" src="integrations_logos/php.png" alt="PHP" >}}
  {{< image-card href="opentelemetry/" src="integrations_logos/otel.png" alt="OpenTelemetry" >}}
{{< /card-grid >}}

[1]: /fr/tracing/glossary/#trace
[2]: /fr/getting_started/tagging/unified_service_tagging
[3]: /fr/agent/logs/#enabling-log-collection-from-integrations
[4]: /fr/tracing/trace_pipeline/ingestion_controls/
[5]: /fr/logs/troubleshooting/#log-has-a-trace-id-but-the-associated-trace-is-missing