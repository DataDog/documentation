---
aliases:
- /fr/logs/processing
description: Traiter, enrichir, contrôler et gérer vos logs depuis la page Logs Configuration
further_reading:
- link: https://learn.datadoghq.com/courses/debugging-log-pipelines
  tag: Centre d'apprentissage
  text: Débogage des pipelines de logs
- link: /data_security/pci_compliance/
  tag: Documentation
  text: Conformité PCI DSS
- link: https://www.datadoghq.com/blog/logging-without-limits/
  tag: Blog
  text: En savoir plus sur Logging without Limits*
- link: https://www.datadoghq.com/blog/log-pipeline-scanner-datadog/
  tag: Blog
  text: Explorer le traitement de vos logs grâce au scanner de pipeline de logs Datadog
- link: /logs/guide/
  tag: Guide
  text: Guides supplémentaires sur la journalisation avec Datadog
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Guide des stratégies d'indexation de Log Management avec Datadog
title: Configuration des logs
---
## Présentation {#overview}

Datadog Logging without Limits* dissocie l'ingestion et l'indexation des logs. Choisissez les logs à indexer et à conserver, ou à archiver, et gérez les paramètres et les contrôles de manière centralisée depuis la page de configuration des logs, accessible via [{{< ui >}}Logs{{< /ui >}} > {{< ui >}}Pipelines{{< /ui >}}][1].

Vous pouvez également gérer les pipelines, les index et les archives de logs via un agent IA connecté au Datadog MCP Server. Activez la suite d'outils `logs-configuration` pour afficher, créer, mettre à jour, supprimer et réorganiser ces ressources. Consultez [Configurer le Datadog MCP Server][13] pour connecter votre agent. Pour connaître les outils disponibles et obtenir des exemples de prompts, consultez [Outils Logs Configuration][14].

## Options de configuration {#configuration-options}

- Contrôlez la manière dont vos logs sont traités avec les [pipelines][3] et les [processors][4].
- Définissez des [attributs et des alias][5] pour unifier votre environnement de logs.
- [Générez des métriques à partir des logs ingérés][6] pour synthétiser à moindre coût les données de logs issues de l'ensemble d'un flux ingéré.
- Mettez en place un contrôle précis de votre budget de gestion des logs grâce aux [index de logs][7].
- Transférez les logs ingérés vers votre propre bucket de stockage cloud pour les conserver en tant qu'[archive][8] à des fins de dépannage ultérieur ou d'audits de conformité.
- [Recherchez dans une archive][12] avec Archive Search pour interroger les logs en temps réel directement depuis le stockage. Utilisez le mode **Search & Rehydration** lorsque vous avez besoin d'un accès complet à la plateforme ou d'une rétention plus longue.
- Restreignez [l'accès aux données de logs][10] à l'aide de requêtes de restriction.

## Log Explorer {#log-explorer}

Une fois votre configuration terminée, commencez à examiner et à étudier vos logs dans le [Log Explorer][11].

## Pour aller plus loin {#further-reading}

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
[10]: /fr/logs/guide/logs-rbac/
[11]: /fr/logs/explorer/
[12]: /fr/logs/explorer/archive_search/
[13]: /fr/mcp_server/setup/
[14]: /fr/mcp_server/tools/#logs-configuration