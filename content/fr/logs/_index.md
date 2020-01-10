---
title: Log Management
kind: Documentation
description: 'Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
disable_toc: true
aliases:
  - /fr/guides/logs/
  - /fr/logs/logging_without_limits
further_reading:
  - link: /logs/guide
    tag: Guide
    text: Articles supplémentaires utiles sur le processing et la collecte de logs.
  - link: 'https://learn.datadoghq.com'
    tag: Centre d'apprentissage
    text: Présentation des logs dans Datadog
---
{{< vimeo 293195142 >}}

Votre infrastructure peut parfois générer un volume d'événements de log trop important, ou avec des fluctuations importantes. Dans ce cas, vous devrez peut-être déterminer les types de logs à envoyer à une solution de gestion de logs, et les types de logs à archiver. En revanche, en filtrant vos logs, il se peut que vous effectuiez un traitement non exhaustif ou ignoriez certaines données importantes.

La solution Log Management de Datadog met fin à ces problèmes en séparant le processus d'ingestion des logs du processus d'indexation, vous permettant ainsi de recueillir, de traiter et d'archiver tous vos logs de façon rentable. Cette fonctionnalité s'intitule Logging without Limits*.

{{< whatsnext desc="Grâce à Logging without Limits*, vous bénéficiez des fonctionnalités suivantes :">}}
  {{< nextlink href="/logs/log_collection">}}<u>Collecte de logs et d'intégrations</u> : ingérez tous vos logs depuis vos hosts, conteneurs et fournisseurs de cloud.{{< /nextlink >}}
  {{< nextlink href="/logs/processing">}}<u>Traitement</u> : traitez et enrichissez tous vos logs avec des pipelines et des processeurs. {{< /nextlink >}}
  {{< nextlink href="/logs/live_tail">}}<u>Live Tail</u> : visualisez vos logs ingérés en temps réel sur l'ensemble de vos environnements.{{< /nextlink >}}
  {{< nextlink href="/logs/logs_to_metrics">}}<u>Création de métriques</u> : générez des métriques à partir des logs ingérés.{{< /nextlink >}}
  {{< nextlink href="/logs/archives">}}<u>Archives</u> : archivez tous les logs enrichis dans des compartiments S3.{{< /nextlink >}}
  {{< nextlink href="/logs/indexes">}}<u>Index</u> : déterminez de façon dynamique les éléments à inclure et à exclure de vos index afin de maîtriser vos coûts.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Une fois vos logs ingérés, plongez au cœur de leurs données grâce à la vue Log Explorer :">}}
  {{< nextlink href="/logs/explorer/">}}<u>Log Explorer</u> : découvrez la vue Log Explorer et apprenez à ajouter des facettes et des mesures.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer">}}<u>Recherche</u> : effectuez des recherches sur l'ensemble de vos logs indexés.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/analytics">}}<u>Analyse</u> : effectuez des analyses de logs sur vos logs indexés.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/patterns">}}<u>Patterns</u> : identifiez des patterns de logs en regroupant vos logs dans un cluster.{{< /nextlink >}}

  {{< nextlink href="/logs/explorer/saved_views/">}}<u>Vues enregistrées</u> : utilisez des vues enregistrées pour configurer automatiquement votre Log Explorer.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Enfin, exploitez les concepts clés de la surveillance à l'aide de métriques et de traces :">}}
  {{< nextlink href="/tracing/connect_logs_and_traces/?tab=java">}}<u>Association de logs à des traces</u> : affichez la trace associée au log observé.{{< /nextlink >}}
  {{< nextlink href="/graphing/dashboards/timeboard/#correlation-between-logs-and-metrics">}}<u>Association de logs à des métriques</u> : affichez la métrique associée au log observé.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.