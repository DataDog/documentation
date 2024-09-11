---
aliases:
- /fr/logs/processing
description: Traiter, enrichir, contrôler et gérer vos logs depuis la page Logs Configuration
further_reading:
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Configurer une organisation Datadog conforme à la norme PCI
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: En savoir plus sur Logging without Limits*
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: Blog
  text: Explorer le traitement de vos logs grâce au scanner de pipeline de logs Datadog
- link: /logs/guide/
  tag: Guide
  text: Guides supplémentaires sur la journalisation avec Datadog
title: Configuration des logs
---

## Présentation

La solution Logging without Limits* de Datadog dissocie l'ingestion des logs de leur indexation. Elle vous permet de choisir les logs que vous souhaitez indexer et conserver, ou archiver, et de gérer les paramètres et contrôles de façon globale depuis la page de configuration des logs, accessible depuis [**Logs > Configuration**][1].

**Remarque** : consultez la section [Conformité PCI DSS][2] pour obtenir des informations sur la mise en place d'une organisation Datadog conforme à la norme PCI.

{{< img src="logs/log_configuration_overview1.mp4" alt="La section de configuration des logs dans l'application Datadog" video=true >}}

## Options de configuration

- Contrôlez le traitement de vos logs avec des [pipelines][3] et des [processeurs][4].
- Définissez [des attributs et des alias][5] pour unifier votre environnement de logs.
- [Générez des métriques à partir des logs ingérés][6] afin de synthétiser à moindre coût les données des logs d'un flux entier ingéré.
- Contrôlez de façon extrêmement précise votre budget de gestion des logs grâce aux [index de logs][7].
- Transférez vos logs ingérés vers votre propre compartiment de stockage dans le cloud pour conserver une [archive][8], afin d'anticiper de futurs dépannages ou audits.
- [Réintégrez une archive][9] afin d'analyser ou d'étudier des événements de log anciens ou exclus de l'indexation.
- Restreignez l'[accès aux données des logs][10] grâce à des requêtes de restriction.

## LogxmExplorer

Une fois votre configuration terminée, commencez à examiner et à étudier vos logs dans le [Log Explorer][11].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

<br>
*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: https://app.datadoghq.com/logs/pipelines
[2]: /fr/data_security/pci_compliance/
[3]: /fr/logs/log_configuration/pipelines
[4]: /fr/logs/log_configuration/processors
[5]: /fr/logs/log_configuration/attributes_naming_convention/
[6]: /fr/logs/log_configuration/logs_to_metrics/
[7]: /fr/logs/log_configuration/indexes
[8]: /fr/logs/log_configuration/archives/
[9]: /fr/logs/log_configuration/rehydrating
[10]: /fr/logs/guide/logs-rbac/
[11]: /fr/logs/explorer/