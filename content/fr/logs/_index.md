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
  - link: tracing/advanced/connect_logs_and_traces/?tab=java
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: 'https://learn.datadoghq.com'
    tag: Centre d'apprentissage
    text: Présentation des logs dans Datadog
---
{{< vimeo 293195142 >}}

Votre infrastructure peut parfois générer un volume d'événements de log trop important ou ayant des fluctuations significatives. Dans cette situation, vous devrez peut-être choisir quels logs envoyer vers une solution de gestion de logs, et quels logs archiver. En revanche, le filtrage de vos logs avant leur envoi peut empêcher un traitement exhaustif des logs ou accidentellement supprimer des données précieuses.

La solution Log Management de Datadog met fin à ces problèmes en séparant le processus d'ingestion des logs du processus d'indexation, vous permettant ainsi de recueillir, de traiter et d'archiver tous vos logs de façon rentable. Cette fonctionnalité s'intitule Logging without Limits*.

{{< whatsnext desc="Avec Logging without Limits*, vous pouvez :">}}
  {{< nextlink href="/logs/log_collection">}}<u>Collecte de logs et intégrations</u> : Ingérer tous vos logs depuis vos hosts, conteneurs et fournisseurs de cloud.{{< /nextlink >}}
  {{< nextlink href="/logs/processing">}}<u>Processing</u> : Traiter et enrichir tous vos logs avec des pipelines et des processeurs. {{< /nextlink >}}
  {{< nextlink href="/logs/live_tail">}}<u>Live Tail</u> : Visualiser vos logs ingérés en temps réel sur l'ensemble de vos environnements.{{< /nextlink >}}
  {{< nextlink href="/logs/logs_to_metrics">}}<u>Générer des métriques</u> : Générer des métriques à partir de logs ingérés.{{< /nextlink >}}
  {{< nextlink href="/logs/archives">}}<u>Archives</u> : Archiver tous les logs enrichis dans des compartiments S3.{{< /nextlink >}}
  {{< nextlink href="/logs/indexes">}}<u>Index</u> : Déterminer de façon dynamique les éléments à inclure et à exclure de vos index afin de maîtriser vos coûts.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Lorsque vos logs sont indexés, vous pouvez les explorer dans Log Explorer :">}}
  {{< nextlink href="/logs/explorer/">}}<u>Log Explorer</u> : Découvrez la vue Log Explorer, comment ajouter des facettes et des mesures.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer">}}<u>Recherche</u> : Effectuez des recherches sur l'ensemble de vos logs indexés.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/analytics">}}<u>Analyse</u> : Effectuez des analyses de logs sur vos logs indexés.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/patterns">}}<u>Patterns</u> : Repérez des patterns de logs en regroupant vos logs dans un cluster.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/saved_views/">}}<u>Vues enregistrées</u> : Utilisez les vues enregistrées pour configurer automatiquement votre Log Explorer.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
*Logging without Limits est une marque déposée de Datadog, Inc.