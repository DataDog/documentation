---
title: Log Configuration
kind: Documentation
description: "Traiter, enrichir, contrôler et gérer vos logs depuis la page Logs\_Configuration"
aliases:
  - /fr/logs/processing
further_reading:
  - link: https://www.datadoghq.com/blog/logging-without-limits/
    tag: Blog
    text: En savoir plus sur Logging without Limits*
  - link: /logs/guide/
    tag: Guide
    text: Guides supplémentaires sur la journalisation avec Datadog
---
## Présentation

La solution Logging without Limits* de Datadog dissocie l'ingestion des logs de leur indexation. Elle vous permet de choisir les logs que vous souhaitez indexer et conserver, ou archiver, et de gérer les paramètres et contrôles de façon globale depuis la [section de configuration des logs][1].

{{< img src="logs/log_configuration_overview.gif" alt="La section de configuration des logs dans l'application Datadog">}}

## Options de configuration

- Contrôlez le traitement de vos logs avec des [pipelines][2] et des [processeurs][3].
- Définissez [des attributs et des alias][4] pour unifier votre environnement de logs.
- [Générez des métriques à partir des logs ingérés][5] afin de synthétiser à moindre coût les données des logs d'un flux entier ingéré.
- Contrôlez de façon extrêmement précise votre budget de gestion des logs grâce aux [index de logs][6].
- Transférez vos logs ingérés vers votre propre compartiment de stockage dans le cloud pour conserver une [archive][7], afin d'anticiper de futurs dépannages ou audits.
- [Réintégrez une archive][8] afin d'analyser ou d'étudier des événements de log anciens ou exclus de l'indexation.
- Restreignez l'[accès aux données des logs][9] grâce à des requêtes de restriction.

## Log Explorer

Une fois votre configuration terminée, commencez à examiner et à étudier vos logs dans le [Log Explorer][10].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /fr/logs/log_configuration/pipelines
[3]: /fr/logs/log_configuration/processors
[4]: /fr/logs/log_configuration/attributes_naming_convention/
[5]: /fr/logs/log_configuration/logs_to_metrics/
[6]: /fr/logs/log_configuration/indexes
[7]: /fr/logs/log_configuration/archives/
[8]: /fr/logs/log_configuration/rehydrating
[9]: /fr/logs/guide/logs-rbac/
[10]: /fr/logs/explorer/