---
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: OpenTelemetry dans Datadog
title: Surveillance sans serveur et OpenTelemetry
---

[OpenTelemetry][1] est un framework d'observabilité open source qui fournit aux équipes informatiques des protocoles et des outils normalisés pour recueillir et acheminer des données de télémétrie.

Si votre code fait l'objet d'une instrumentation personnalisée avec l'[API OpenTelemetry][2], ou si vous souhaitez écrire du code d'instrumentation personnalisée indépendant de tout fournisseur, vous pouvez le configurer de manière à générer des spans et traces utilisables par Datadog. Il est alors possible de traiter ces spans et traces pour votre langage via la bibliothèque de tracing Datadog et de transmettre les données à Datadog.

### AWS Lambda

La bibliothèque de tracing Datadog, qui est incluse dans l'extension Lambda Datadog lors de l'installation, accepte les spans et traces générées par le code instrumenté par OpenTelemetry, traite les données de télémétrie et les transmet à Datadog.

Vous pouvez par exemple utiliser cette approche si votre code a déjà été instrumenté avec l'API OpenTelemetry, ou si vous souhaitez effectuer une instrumentation avec du code indépendant de tout fournisseur à l'aide de l'API OpenTelemetry tout en exploitant les bibliothèques de tracing Datadog.

Pour instrumenter AWS Lambda avec l'API OpenTelemetry, définissez la variable d'environnement `DD_TRACE_OTEL_ENABLED` sur `true`. Consultez la section [Instrumentation personnalisée avec l'API OpenTelemetry][3] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /fr/tracing/trace_collection/otel_instrumentation/