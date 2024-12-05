---
aliases:
- /fr/guides/logs/
- /fr/en/logs
- /fr/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: Configurez votre Agent Datadog pour rassembler les logs de votre host,
  de vos conteneurs et de vos services.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Notes de version
  text: Découvrir les dernières versions de la solution Log Management Datadog (connexion
    à l'application requise)
- link: /logs/log_collection/
  tag: Documentation
  text: Commencer à recueillir vos logs
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Centre d'apprentissage
  text: Présentation de Log Management
- link: https://dtdg.co/fe
  tag: Validation des bases
  text: Participer à une session interactive pour optimiser votre gestion des logs
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: Des enquêtes plus rapides sur les incidents avec la détection des anomalies
    des logs
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Surveiller vos appareils IoT de façon évolutive avec la solution Log Management
    de Datadog
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Surveiller vos logs de pare-feu avec Datadog
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utiliser la syntaxe CIDR pour filtrer vos logs de trafic réseau
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Surveiller 1Password avec la solution Cloud SIEM de Datadog
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: Filter and correlate logs dynamically using Subqueries
title: Log Management
---

## Présentation

Pour assurer l'intégrité de votre infrastructure, il est essentiel d'enregistrer des logs à propos des principales opérations de votre système. Les infrastructures modernes peuvent générer des milliers d'événements de log par minute. Vous devez donc déterminer les types de logs à envoyer à la solution de gestion de logs choisie, ainsi que les types de logs à archiver. En revanche, en filtrant vos logs, il se peut que vous effectuiez un traitement non exhaustif ou ignoriez certaines données importantes.

La solution Log Management de Datadog (également appelée « logs Datadog » ou « journalisation Datadog ») met fin à ces problèmes en séparant le processus d'ingestion des logs du processus d'indexation. Vous pouvez ainsi recueillir, traiter, explorer et surveiller tous vos logs de façon rentable et sans aucune limite, grâce à Logging without Limits\*.

La solution Logging without Limits\* simplifie vos processus de dépannage dans le [Log Explorer][1]. Vos équipes et vous-même pouvez accéder rapidement aux problèmes concernant votre infrastructure et les corriger au plus vite. Les fonctionnalités intuitives d'archivage facilitent le travail d'audit et d'évaluation des équipes IT et de sécurité. Logging without Limits\* alimente également la solution [Cloud SIEM Datadog][2], qui détecte les menaces de sécurité dans votre environnement sans nécessiter l'indexation de vos logs.

**Remarque** : consultez la section [Conformité PCI DSS][3] pour des informations sur la mise en place d'une organisation Datadog conforme à la norme PCI.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Recueillir les logs

Pour commencer à utiliser Log Management, vous devez d'abord [ingérer des logs][4] depuis vos hosts, conteneurs, fournisseurs cloud et autres sources.

## Configurer un monitor

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configurer vos logs depuis un seul endroit" >}}

Une fois vos logs ingérés, vous pouvez les traiter et les enrichir avec des pipelines et des processeurs, contrôler précisément votre budget de gestion des logs avec des index, générer des métriques à partir des logs générés, ou encore gérer vos logs dans des archives optimisées pour le stockage grâce aux [paramètres de configuration des logs][5].

## Associer les logs

{{< img src="/logs/connect.png" alt="Corréler les logs aux métriques ou traces" style="width:80%;">}}

Tirez profit des trois piliers de l'observabilité en associant vos logs à vos métriques et traces :

- [Associez vos logs à vos traces][6] pour gagner en visibilité sur vos applications.
- [Corrélez vos logs à vos métriques][7] pour contextualiser un problème et le mapper dans l'ensemble de votre service.

## Explorer les logs

Commencez à explorer vos logs ingérés dans le [Log Explorer][1].

{{< img src="/logs/explore.png" alt="Explorer vos logs ingérés" style="width:80%;">}}

- [Recherche][8] : effectuez des recherches dans l'ensemble de vos logs.
- [Live Tailing][9] : visualisez en temps réel vos logs ingérés dans l'ensemble de vos environnements.
- [Analyse][10] : analysez vos logs indexés.
- [Patterns][11] : identifiez des patterns de log en rassemblant vos logs indexés au sein d'un cluster.
- [Vues enregistrées][12] : servez-vous des vues enregistrées pour configurer automatiquement votre vue Log Explorer.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}


\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /fr/logs/explorer/
[2]: /fr/security/cloud_siem/
[3]: /fr/data_security/pci_compliance/
[4]: /fr/logs/log_collection/
[5]: /fr/logs/log_configuration/
[6]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[7]: /fr/logs/guide/correlate-logs-with-metrics/
[8]: /fr/logs/explorer/search_syntax/
[9]: /fr/logs/live_tail/
[10]: /fr/logs/explorer/analytics/
[11]: /fr/logs/explorer/patterns/
[12]: /fr/logs/explorer/saved_views/