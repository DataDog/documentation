---
description: Corrélez les spans entre les traces et les opérations à l'aide des liens
  de span OpenTelemetry pour les workflows complexes des systèmes distribués.
further_reading:
- link: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
  tag: Documentation
  text: Liens de span OpenTelemetry
- link: /tracing/trace_collection/otel_instrumentation/
  tag: Documentation
  text: Instrumentation personnalisée avec l'API OpenTelemetry
- link: /tracing/trace_collection/custom_instrumentation/
  tag: Documentation
  text: Instrumentation personnalisée avec les bibliothèques Datadog
- link: https://www.datadoghq.com/blog/monitor-azure-functions-hosting-plans/
  tag: Blog
  text: Surveillez les Azure Functions sur tous les plans d'hébergement avec Datadog
title: Liens de spans
---
{{< img src="tracing/span_links/span_links_tab_2.png" alt="Onglet Liens de span" style="width:90%;">}}

## Présentation {#overview}

Les liens de span sont un [concept OpenTelemetry][5] et une partie de l'[API de traçage OpenTelemetry][2]. Datadog prend en charge les liens de span pour :

- Les applications instrumentées avec les [SDK OpenTelemetry][6].
- Les applications instrumentées avec les [SDK Datadog][9].

Les liens de span corrèlent un ou plusieurs spans ensemble qui sont liés causalement, mais n'ont pas de relation parent-enfant typique. Ces liens peuvent corréler des spans au sein de la même trace ou entre différentes traces.

Les liens de span aident à tracer les opérations dans les systèmes distribués, où les workflows s'écartent souvent des modèles d'exécution linéaires. Ils sont utiles pour tracer le flux des opérations dans les systèmes qui exécutent des requêtes par lots ou traitent des événements de manière asynchrone.

Datadog prend en charge les liens de span vers l'avant et vers l'arrière, permettant aux utilisateurs de visualiser et de naviguer dans les relations de span entre les traces dans les deux sens.

- Liens vers l'avant : Un span peut être lié à un autre span qui se produit plus tard dans le temps, qu'il appartienne à la même trace ou à une trace différente. Cela vous permet de naviguer des opérations antérieures vers les suivantes entre les traces.
- Liens vers l'arrière : De même, un span peut être lié à un span qui s'est produit plus tôt dans le temps, soit au sein de la même trace, soit entre différentes traces. Cela vous permet de remonter des opérations ultérieures vers les précédentes.

## Cas d'utilisation courants {#common-use-cases}

Les liens de span sont particulièrement applicables dans les scénarios de fan-in, où plusieurs opérations convergent vers un seul span. Le span unique renvoie à plusieurs opérations convergentes.

Exemple :

- **Scatter-Gather et Map-Reduce** : Ici, les liens de span tracent et corrèlent plusieurs processus parallèles qui convergent vers un processus combiné unique. Ils connectent les résultats de ces processus parallèles à leur résultat collectif.

- **Agrégation de messages** : Dans des systèmes comme Kafka Streams, les liens de span connectent chaque message d'un groupe de messages à leur résultat agrégé, montrant comment les messages individuels contribuent à la sortie finale.

- **Messagerie transactionnelle** : Dans les scénarios où plusieurs messages font partie d'une transaction unique, comme dans les files d'attente de messages, les liens de span tracent la relation entre chaque message et le processus transactionnel global.

- **Event Sourcing** : Les liens de span dans l'event sourcing suivent la manière dont plusieurs messages de changement contribuent à l'état actuel d'une entité.

## Création de liens de span {#creating-span-links}

Si votre application est instrumentée avec :

- Le SDK OpenTelemetry, suivez la documentation d'instrumentation manuelle OpenTelemetry pour votre langage. Par exemple, [Créer des spans avec des liens pour Java][3].
- Le SDK Datadog, suivez les exemples [Ajout de liens de span][1].

## Support minimal {#minimum-support}

**Remarque*** : Cette section documente le support minimal pour la génération de liens de span avec les bibliothèques clientes Datadog APM (avec l'API OpenTelemetry). Les liens de span générés par le SDK OpenTelemetry sont envoyés à Datadog via [l'ingestion OTLP][8].

L'Agent v7.52.0 ou supérieur est requis pour générer des liens de span en utilisant les [SDK Datadog][7]. Le support des liens de span a été introduit dans les versions suivantes :

| Langage | Version minimale du SDK |
|-----------|---------------------------------|
| C++/Proxy | Pas encore supporté |
| Go | 1.61.0 |
| Java | 1.26.0 |
| .NET      | 2.53.0                          |
| Node      | 5.3.0                           |
| PHP       | 0.97.0                          |
| Python    | 2.5.0                           |
| Ruby      | 2.0.0                           |

## Affichage des liens de span {#viewing-span-links}

Vous pouvez afficher les liens de span depuis le [Trace Explorer][4] dans Datadog.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/tracing/trace_collection/custom_instrumentation/php/#adding-span-links
[2]: https://opentelemetry.io/docs/specs/otel/trace/api/#link
[3]: https://opentelemetry.io/docs/instrumentation/java/manual/#create-spans-with-links
[4]: /fr/tracing/trace_explorer/trace_view/?tab=spanlinks#more-information
[5]: https://opentelemetry.io/docs/concepts/signals/traces/#span-links
[6]: https://opentelemetry.io/docs/specs/otel/trace/sdk/
[7]: https://docs.datadoghq.com/fr/tracing/trace_collection/automatic_instrumentation/dd_libraries/
[8]: https://docs.datadoghq.com/fr/opentelemetry/interoperability/otlp_ingest_in_the_agent
[9]: /fr/tracing/trace_collection/custom_instrumentation/?tab=datadogapi