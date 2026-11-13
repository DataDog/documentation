---
further_reading:
- link: /opentelemetry/
  tag: Documentation
  text: OpenTelemetry dans Datadog
- link: https://www.datadoghq.com/architecture/enhancing-observability-in-aws-lambda-with-otel/
  tag: Architecture Center
  text: Amélioration de l'observabilité des applications dans AWS Lambda avec Datadog
    et OpenTelemetry
title: Serverless et OpenTelemetry
---
[OpenTelemetry][1] est un framework d'observabilité open source qui fournit aux équipes informatiques des protocoles et des outils normalisés pour recueillir et acheminer des données de télémétrie.

Si votre code est instrumenté de manière personnalisée avec l'[API OpenTelemetry][2], ou si vous souhaitez écrire du code d'instrumentation personnalisé agnostique vis-à-vis du fournisseur, vous pouvez le configurer pour générer des spans et des traces de style Datadog. Vous pouvez ensuite traiter ces spans et ces traces avec le SDK Datadog pour votre langage, et envoyer les données à Datadog.

### AWS Lambda {#aws-lambda}

Voir [AWS Lambda et OpenTelemetry][4].

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://opentelemetry.io/
[2]: https://opentelemetry.io/docs/reference/specification/trace/api
[3]: /fr/tracing/trace_collection/otel_instrumentation/
[4]: /fr/serverless/aws_lambda/opentelemetry