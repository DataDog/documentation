---
title: Log Management
kind: Documentation
description: 'Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
disable_sidebar: true
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

La solution Log Management de Datadog met fin à ces problèmes en séparant le processus d'ingestion des logs du processus d'indexation. Vous pouvez ainsi recueillir, traiter, archiver, explorer et surveiller tous vos logs de façon rentable, sans la moindre limite. Cette fonctionnalité s'intitule Logging without Limits*. C'est sur celle-ci que repose la fonction [Security Monitoring][1] de Datadog. En effet, elle vous permet de détecter les menaces de sécurité de votre environnement sans avoir à indexer vos logs.

{{< whatsnext desc="Grâce à Logging without Limits*, vous bénéficiez des fonctionnalités suivantes :">}}
  {{< nextlink href="/logs/log_collection">}}Collecte de logs et intégrations : ingérez tous vos logs depuis vos hosts, conteneurs et fournisseurs de cloud.{{< /nextlink >}}
  {{< nextlink href="/logs/processing">}}Traitement : traitez et enrichissez tous vos logs avec des pipelines et des processeurs. {{< /nextlink >}}
  {{< nextlink href="/logs/live_tail">}}Live Tail : visualisez vos logs ingérés en temps réel sur l'ensemble de vos environnements.{{< /nextlink >}}
  {{< nextlink href="/logs/logs_to_metrics">}}Création de métriques : générez des métriques à partir des logs ingérés.{{< /nextlink >}}
  {{< nextlink href="/logs/archives">}}Archives : archivez tous les logs enrichis dans des compartiments S3.{{< /nextlink >}}
  {{< nextlink href="/logs/indexes">}}Index : déterminez de façon dynamique les éléments à inclure et à exclure de vos index afin de maîtriser vos coûts.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Une fois vos logs indexés, plongez au cœur de leurs données grâce à la vue Log Explorer :">}}
  {{< nextlink href="/logs/explorer/">}}Log Explorer : découvrez la vue Log Explorer et apprenez à ajouter des facettes et des mesures.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer">}}Recherche : effectuez des recherches sur l'ensemble de vos logs indexés.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/analytics">}}Analyse : effectuez des analyses de logs sur vos logs indexés.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/patterns">}}Patterns : identifiez des patterns de logs en regroupant vos logs indexés dans un cluster.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer/saved_views/">}}Vues enregistrées : utilisez des vues enregistrées pour configurer automatiquement votre Log Explorer.{{< /nextlink >}}
{{< /whatsnext >}}
{{< whatsnext desc="Enfin, exploitez les concepts clés de la surveillance à l'aide de métriques et de traces :">}}
  {{< nextlink href="/tracing/connect_logs_and_traces/">}}Association de logs et de traces : affichez la trace associée au log observé.{{< /nextlink >}}
  {{< nextlink href="/dashboards/timeboards/#graph-menu">}}Corrélation de logs avec des métriques : affichez la métrique associée au log observé.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/security_monitoring
