---
title: Log Management
kind: Documentation
description: 'Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.'
disable_toc: true
aliases:
  - /fr/guides/logs/
further_reading:
  - link: tracing/advanced/connect_logs_and_traces/?tab=java
    tag: Documentation
    text: Associer vos logs à vos traces
  - link: 'https://learn.datadoghq.com'
    tag: Centre d'apprentissage
    text: Présentation des logs dans Datadog
---
## Présentation

Log Management est une solution complète tout-en-un qui permet la [collecte][1], le [traitement][2], le [Live tailing][3], l'[exploration][4], la [création de graphiques][5], la [création de dashboards][6], la [configuration d'alertes][7] et la création d'archives pour tous les logs générés par [votre application][8] et votre infrastructure.

{{< whatsnext desc="Cette section aborde les sujets suivants :">}}
  {{< nextlink href="/logs/log_collection">}}<u>Collecte de logs et intégrations</u> : recueillez tous les logs de vos hosts, conteneurs et fournisseurs cloud.{{< /nextlink >}}
  {{< nextlink href="/logs/processing">}}<u>Processing</u> : traitez et enrichissez l'ensemble des logs issus de vos pipelines et de vos processeurs. {{< /nextlink >}}
  {{< nextlink href="/logs/live_tail">}}<u>Live Tail</u> : visualisez les logs recueillis en temps réel pour tous vos environnements.{{< /nextlink >}}
  {{< nextlink href="/logs/explorer">}}<u>Explorer</u> : explorez vos logs avec la recherche, les outils d'analyse et les modèles de log.{{< /nextlink >}}
  {{< nextlink href="/logs/logging_without_limits">}}<u>Collecte illimitée de logs</u> : déterminez de façon dynamique les éléments à inclure et à exclure de vos index afin de réduire vos coûts.{{< /nextlink >}}
  {{< nextlink href="/logs/archives">}}<u>Archives</u> : archivez tous vos logs enrichis dans des compartiments S3.{{< /nextlink >}}
  {{< nextlink href="/logs/guide">}}<u>Guides</u> : accédez à des articles d'aide supplémentaires à propos de la collecte et du traitement de logs.{{< /nextlink >}}
{{< /whatsnext >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/agent/logs
[2]: /fr/logs/processing
[3]: /fr/logs/live_tail
[4]: /fr/logs/explore
[5]: /fr/logs/explorer/analytics
[6]: /fr/graphing/dashboards/widgets/#timeseries
[7]: /fr/monitors/monitor_types/log
[8]: /fr/logs/log_collection/#how-to-get-the-most-of-your-application-logs
