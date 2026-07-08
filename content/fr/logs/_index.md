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
description: Configurez votre agent Datadog pour collecter les journaux de votre hôte,
  de vos conteneurs et de vos services.
disable_sidebar: true
further_reading:
- link: https://app.datadoghq.com/release-notes?category=Log%20Management
  tag: Notes de version
  text: Découvrez les dernières versions de la gestion des journaux Datadog (connexion
    à l'application requise)
- link: /logs/log_collection/
  tag: Documentation
  text: Commencez à collecter vos journaux
- link: https://learn.datadoghq.com/courses/intro-to-log-management
  tag: Centre d'apprentissage
  text: Présentation de Log Management
- link: https://dtdg.co/fe
  tag: Validation des bases
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
- link: https://www.datadoghq.com/blog/archive-search/
  tag: Blog
  text: Recherchez vos journaux historiques plus efficacement avec Datadog Archive
    Search
- link: https://www.datadoghq.com/blog/human-name-detection
  tag: Blog
  text: Détectez les noms humains dans les journaux avec ML dans Sensitive Data Scanner
- link: https://www.datadoghq.com/blog/monitoring-load-balancer-logs
  tag: Blog
  text: Surveillez les journaux de votre application et de votre équilibreur de charge
    réseau
- link: https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/
  tag: Centre d'architecture
  text: Un guide des stratégies d’indexation de Datadog Log Management
title: Log Management
---
{{< learning-center-callout header="Participez à une session de webinaire de formation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}}
  Participez à une session de formation d'introduction ou intermédiaire pour apprendre comment Datadog Log Management unifie les journaux, les métriques et les traces dans une vue unique, vous offrant un contexte riche pour analyser les données des journaux.
{{< /learning-center-callout >}}

## Aperçu {#overview}

Enregistrer les parties importantes des opérations de votre système est crucial pour maintenir la santé de l'infrastructure. L'infrastructure moderne a la capacité de générer des milliers d'événements de journaux par minute. Dans cette situation, vous devez choisir quels journaux envoyer à une solution de gestion des journaux et quels journaux archiver. Filtrer vos journaux avant de les envoyer peut cependant entraîner des lacunes dans la couverture ou la suppression accidentelle de données précieuses.

Datadog Log Management, également appelé Datadog logs ou logging, supprime ces limitations en découplant l'ingestion des journaux de l'indexation. Cela vous permet de collecter, traiter, archiver, explorer et surveiller tous vos journaux de manière rentable, également connu sous le nom de Logging without Limits\*.

Logging without Limits\* permet une expérience de dépannage simplifiée dans le [Log Explorer][1], ce qui vous permet, à vous et à vos équipes, d'évaluer et de résoudre rapidement vos problèmes d'infrastructure. Il fournit un archivage intuitif pour soutenir vos équipes de sécurité et d'informatique lors des audits et des évaluations. Logging without Limits* alimente également [Datadog Cloud SIEM][2], qui détecte les menaces de sécurité dans votre environnement, sans nécessiter d'indexer les journaux.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Collecter {#collect}

Pour commencer à utiliser Log Management, vous devez d'abord [ingérer des logs][4] depuis vos hosts, conteneurs, fournisseurs cloud et autres sources.

## Configurer {#configure}

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configurez tous vos journaux en un seul endroit" >}}

Une fois vos logs ingérés, vous pouvez les traiter et les enrichir avec des pipelines et des processeurs, contrôler précisément votre budget de gestion des logs avec des index, générer des métriques à partir des logs générés, ou encore gérer vos logs dans des archives optimisées pour le stockage grâce aux [paramètres de configuration des logs][5].

## Connect {#connect}

{{< img src="/logs/connect.png" alt="Corréler les journaux avec des métriques ou des traces" style="width:80%;">}}

Tirez profit des trois piliers de l'observabilité en associant vos logs à vos métriques et traces :

- [Connect your logs and traces][6] pour obtenir une visibilité sur vos applications.
- [Correlate your logs and metrics][7] pour obtenir le contexte d'un problème et le cartographier à travers votre service.

## Explorer {#explore}

Commencez à explorer vos logs ingérés dans le [Log Explorer][1].

**Astuce** : Pour ouvrir le Log Explorer depuis la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `logs`.

{{< img src="/logs/explore.png" alt="Explorez vos journaux ingérés" style="width:80%;">}}

- [Search][8] : Recherchez dans tous vos journaux.
- [Live Tail][9] : Voyez vos journaux ingérés en temps réel dans tous vos environnements.
- [Analytics][10] : Effectuez des analyses de journaux sur vos journaux indexés.
- [Patterns][11] : Repérez les modèles de journaux en regroupant vos journaux indexés.
- [Saved Views][12] : Utilisez les vues enregistrées pour configurer automatiquement votre Log Explorer.


{{< learning-center-callout header="Essayez l'Introduction à la gestion des journaux dans le Centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}}
  Apprenez sans frais sur une véritable capacité de calcul cloud et un compte d'essai Datadog. Inscrivez-vous aujourd'hui pour en savoir plus sur la collecte de journaux, les requêtes, l'analyse, les métriques, la surveillance, le traitement, le stockage et le contrôle d'accès.
{{< /learning-center-callout >}}

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits est une marque déposée de Datadog, Inc.

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