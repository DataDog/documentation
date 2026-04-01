---
algolia:
  tags:
  - logs
aliases:
- /fr/guides/logs/
- /fr/en/logs
- /fr/logs/logging_without_limits
cascade:
  algolia:
    rank: 70
description: Configurez votre Agent Datadog pour collecter les journaux de votre hôte,
  de vos conteneurs et de vos services.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Release Notes
  text: Découvrez les dernières versions de la gestion des journaux Datadog (connexion
    à l'application requise)
- link: /logs/log_collection/
  tag: Documentation
  text: Commencez à collecter vos journaux
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Learning Center
  text: Présentation de Log Management
- link: https://dtdg.co/fe
  tag: Foundation Enablement
  text: Participer à une session interactive pour optimiser votre gestion des logs
- link: https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/
  tag: Blog
  text: Accélérez les enquêtes sur les incidents avec la détection d'anomalies dans
    les journaux
- link: https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/
  tag: Blog
  text: Surveillez vos appareils IoT à grande échelle avec la gestion des journaux
    Datadog
- link: https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/
  tag: Blog
  text: Surveillez vos journaux de pare-feu avec Datadog
- link: https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/
  tag: Blog
  text: Utilisez des requêtes en notation CIDR pour filtrer vos journaux de trafic
    réseau
- link: https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/
  tag: Blog
  text: Surveiller 1Password avec la solution Cloud SIEM de Datadog
- link: https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/
  tag: Blog
  text: Filtrez et corrélez les journaux dynamiquement en utilisant des sous-requêtes
- link: https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/
  tag: Blog
  text: Surveiller les logs de DNS pour analyser le réseau et la sécurité
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Architecture Center
  text: Un guide sur les stratégies d'indexation de la gestion des journaux avec Datadog
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Recherchez vos journaux historiques plus efficacement avec la recherche d'archives
    Datadog
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Détectez les noms humains dans les journaux avec l'apprentissage automatique
    dans le scanner de données sensibles
title: Log Management
---
{{< learning-center-callout header="Participez à une session de webinaire de formation" hide_image="true" btn_title="Sign Up" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  Participez à une session de formation d'introduction ou intermédiaire pour apprendre comment la gestion des journaux Datadog unifie les journaux, les métriques et les traces dans une vue unique, vous offrant un contexte riche pour analyser les données des journaux.
{{< /learning-center-callout >}}

## Aperçu

Enregistrer les parties importantes des opérations de votre système est crucial pour maintenir la santé de l'infrastructure. L'infrastructure moderne a la capacité de générer des milliers d'événements de journal par minute. Dans cette situation, vous devez choisir quels journaux envoyer à une solution de gestion des journaux et quels journaux archiver. Cependant, filtrer vos journaux avant de les envoyer peut entraîner des lacunes dans la couverture ou la suppression accidentelle de données précieuses.

La gestion des journaux Datadog, également appelée journaux Datadog ou journalisation, supprime ces limitations en découplant l'ingestion des journaux de l'indexation. Cela vous permet de collecter, traiter, archiver, explorer et surveiller tous vos journaux de manière rentable, sans limitations, également connu sous le nom de Journalisation sans limites\*.

La journalisation sans limites\* permet une expérience de dépannage simplifiée dans le [Log Explorer][1], ce qui vous permet, à vous et à vos équipes, d'évaluer et de résoudre rapidement vos problèmes d'infrastructure. Elle fournit une archivage intuitif pour soutenir vos équipes de sécurité et informatiques lors des audits et évaluations. La journalisation sans limites* alimente également [Datadog Cloud SIEM][2], qui détecte les menaces de sécurité dans votre environnement, sans nécessiter d'indexer les journaux.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Collecter

Pour commencer à utiliser Log Management, vous devez d'abord [ingérer des logs][4] depuis vos hosts, conteneurs, fournisseurs cloud et autres sources.

## Configuration

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configurez vos journaux en un seul endroit" >}}

Une fois vos logs ingérés, vous pouvez les traiter et les enrichir avec des pipelines et des processeurs, contrôler précisément votre budget de gestion des logs avec des index, générer des métriques à partir des logs générés, ou encore gérer vos logs dans des archives optimisées pour le stockage grâce aux [paramètres de configuration des logs][5].

## Connect

{{< img src="/logs/connect.png" alt="Corrélez les journaux avec des métriques ou des traces" style="width:80%;">}}

Tirez profit des trois piliers de l'observabilité en associant vos logs à vos métriques et traces :

- [Connectez vos journaux et traces][6] pour obtenir une visibilité sur vos applications.
- [Corrélez vos logs à vos métriques][7] pour contextualiser un problème et le mapper dans l'ensemble de votre service.

## Utilisation

Commencez à explorer vos logs ingérés dans le [Log Explorer][1].

**Conseil** : Pour ouvrir le Log Explorer depuis la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `logs`.

{{< img src="/logs/explore.png" alt="Explorez vos journaux ingérés" style="width:80%;">}}

- [Recherche][8] : Recherchez dans tous vos journaux.
- [Live Tailing][9] : visualisez en temps réel vos logs ingérés dans l'ensemble de vos environnements.
- [Analyse][10] : analysez vos logs indexés.
- [Patterns][11] : identifiez des patterns de log en rassemblant vos logs indexés au sein d'un cluster.
- [Vues enregistrées][12] : servez-vous des vues enregistrées pour configurer automatiquement votre vue Log Explorer.


{{< learning-center-callout header="Essayez l'introduction à la gestion des journaux dans le Learning Center" btn_title="Enroll Now" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  Apprenez sans frais sur une véritable capacité de calcul cloud et un compte d'essai Datadog. Inscrivez-vous aujourd'hui pour en savoir plus sur la collecte de journaux, les requêtes, l'analyse, les métriques, la surveillance, le traitement, le stockage et le contrôle d'accès.
{{< /learning-center-callout >}}

## Lectures complémentaires

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*La journalisation sans limites est une marque déposée de Datadog, Inc.

[1]: /fr/logs/explorer/
[2]: /fr/security/cloud_siem/
[4]: /fr/logs/log_collection/
[5]: /fr/logs/log_configuration/
[6]: /fr/tracing/other_telemetry/connect_logs_and_traces/
[7]: /fr/logs/guide/correlate-logs-with-metrics/
[8]: /fr/logs/explorer/search_syntax/
[9]: /fr/logs/live_tail/
[10]: /fr/logs/explorer/analytics/
[11]: /fr/logs/explorer/patterns/
[12]: /fr/logs/explorer/saved_views/