---
title: APM et tracing distribué
kind: documentation
description: Instrumenter votre code pour améliorer ses performances
further_reading:
  - link: /tracing/connect_logs_and_traces/
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: /tracing/adding_metadata_to_spans
    tag: Documentation
    text: Ajouter des Metadata aux Spans
  - link: /tracing/runtime_metrics
    tag: Documentation
    text: Métriques de runtime
  - link: 'https://learn.datadoghq.com/enrol/index.php?id=17'
    tag: Centre d'apprentissage
    text: Présentation de la surveillance des performances des applications
aliases:
  - /fr/tracing/faq/terminology
  - /fr/tracing/guide/terminology
  - /fr/tracing/guide/distributed_tracing/
disable_toc: true
---
{{< wistia 2kgmb9wbsr >}}
</br>
## En quoi consiste l'APM Datadog ?

 La surveillance des performances d'application (APM ou tracing) vous fournit des informations précises sur les performances de votre application, grâce aux dashboards générés automatiquement qui surveillent des métriques clés, comme le volume et la latence des requêtes, ou encore aux traces détaillées portant sur des requêtes individuelles. Ces données viennent compléter vos logs et la surveillance de votre infrastructure. Lorsqu'une requête est envoyée à une application, Datadog peut surveiller les [traces][1] au sein d'un système distribué, et vous montrer des données systématiques sur ce qu'il advient de cette requête.

## Présentation

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
    {{< nextlink href="/tracing/send_traces/" >}}<u>Activer la collecte de trace</u> : Installez et configurez la dernière version de l'Agent Datadog pour pouvoir envoyer des traces. Découvrez la liste de tous les paramètres disponibles pour l'APM, ainsi que la méthode de configuration de l'APM dans des environnements conteneurisés comme Docker ou Kubernetes.{{< /nextlink >}}
    {{< nextlink href="/tracing/setup/" >}}<u>Instrumenter votre application</u> : Ajoutez une bibliothèque de tracing à votre application.{{< /nextlink >}}
    {{< nextlink href="/tracing/" >}}<u>Enrichir vos traces</u> : Enrichissez vos traces en injectant automatiquement un ID de trace dans vos logs, en ajoutant des métadonnées à vos spans, et en recueillant des métriques d'exécution associées à vos traces.{{< /nextlink >}}
    {{< nextlink href="/tracing/visualization/" >}}<u>Utiliser l'UI de l'APM</u> : Visualisez les données de votre APM avec des dashboards prêts à l'emploi, et surveillez les métriques clés. {{< /nextlink >}}
    {{< nextlink href="/tracing/app_analytics/" >}}<u>App Analytics</u> : Visualisez vos données d'APM avec des dashboards prêts à l'emploi, et surveillez les métriques clés.{{< /nextlink >}}
    {{< nextlink href="/tracing/guide/" >}}<u>Guides</u> : Accédez à des articles d'aide supplémentaires à propos de l'APM et du tracing distribué.{{< /nextlink >}}
    {{< nextlink href="/tracing/troubleshooting/?tab=java" >}}<u>Dépannage</u> : Résolvez les problèmes de tracing courants.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}




[1]: /fr/tracing/visualization/#trace