---
title: Log Management
description: "\"Configurez votre Agent Datadog pour rassembler les logs de votre host, de vos conteneurs et de vos services.\""
disable_sidebar: true
aliases:
  - /guides/logs/
  - /en/logs
  - /logs/logging_without_limits
further_reading:
  - link: "https://app.datadoghq.com/release-notes?category=Log%20Management"
    tag: "Release Notes"
    text: "\"Découvrir les dernières versions de la solution Log Management Datadog (connexion à l'application requise)\""
  - link: "/logs/log_collection/"
    tag: "Documentation"
    text: "\"Commencer à recueillir vos logs\""
  - link: "https://learn.datadoghq.com/courses/intro-to-log-management"
    tag: "Learning Center"
    text: "Présentation de Log Management"
  - link: 'https://dtdg.co/fe'
    tag: 'Foundation Enablement'
    text: 'Participer à une session interactive pour optimiser votre gestion des logs'
  - link: "https://www.datadoghq.com/blog/accelerate-incident-investigations-with-log-anomaly-detection/"
    tag: "Blog"
    text: "\"Des enquêtes plus rapides sur les incidents avec la détection des anomalies des logs\""
  - link: "https://www.datadoghq.com/blog/monitor-iot-devices-at-scale-with-log-management/"
    tag: "Blog"
    text: "\"Surveiller vos appareils IoT de façon évolutive avec la solution Log Management de Datadog\""
  - link: "https://www.datadoghq.com/blog/monitoring-firewall-logs-datadog/"
    tag: "Blog"
    text: "\"Surveiller vos logs de pare-feu avec Datadog\""
  - link: "https://www.datadoghq.com/blog/cidr-queries-datadog-log-management/"
    tag: "Blog"
    text: "\"Utiliser la syntaxe CIDR pour filtrer vos logs de trafic réseau\""
  - link: "https://www.datadoghq.com/blog/monitor-1password-datadog-cloud-siem/"
    tag: "Blog"
    text: "Surveiller 1Password avec la solution Cloud SIEM de Datadog"
  - link: "https://www.datadoghq.com/blog/filter-logs-by-subqueries-with-datadog/"
    tag: "Blog"
    text: "\"Filter and correlate logs dynamically using Subqueries\""
  - link: "https://www.datadoghq.com/blog/monitor-dns-logs-for-network-and-security-datadog/"
    tag: "Blog"
    text: "Surveiller les logs de DNS pour analyser le réseau et la sécurité"
  - link: "https://www.datadoghq.com/architecture/a-guide-to-log-management-indexing-strategies-with-datadog/"
    tag: "Architecture Center"
    text: "\"Guide des stratégies d'indexation pour la gestion des logs avec Datadog\""
  - link: "https://www.datadoghq.com/blog/archive-search/"
    tag: "Blog"
    text: "\"Recherchez vos journaux historiques plus efficacement avec Datadog Archive Search\""
cascade:
    algolia:
        rank: 70
algolia:
    tags: ['logs']
---

{{< learning-center-callout header="Rejoignez une session de webinaire de formation" hide_image="true" btn_title="S'inscrire" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=LogsRejoignez une session de formation d'introduction ou de niveau intermédiaire pour découvrir comment Datadog Log Management unifie les journaux, les métriques et les traces dans une vue unique, vous offrant ainsi un contexte riche pour l'analyse des données de journalisation.

## Présentation

L'enregistrement des éléments importants du fonctionnement de votre système est crucial pour maintenir la santé de l'infrastructure. Les infrastructures modernes sont capables de générer des milliers d'événements de journalisation par minute. Dans ce cas, vous devez choisir quels journaux envoyer à une solution de gestion des journaux et quels journaux archiver. Cependant, filtrer vos journaux avant de les envoyer peut entraîner des lacunes dans la couverture ou la suppression accidentelle de données précieuses.

La gestion des journaux Datadog, également appelée journaux Datadog ou journalisation, supprime ces limitations en découplant l'ingestion des journaux de l'indexation. Cela vous permet de collecter, traiter, archiver, explorer et surveiller de manière rentable tous vos journaux sans limites, également connu sous le nom de journalisation sans limites\*.

La journalisation sans limites* permet une expérience de dépannage simplifiée dans l' [Log Explorer][1], ce qui vous permet, ainsi qu'à vos équipes, d'évaluer et de résoudre rapidement les problèmes de votre infrastructure. Il offre un archivage intuitif pour assister vos équipes de sécurité et informatiques lors des audits et des évaluations. La fonction Logging without Limits* alimente également [Datadog Cloud SIEM][2], qui détecte les menaces de sécurité dans votre environnement, sans que vous ayez besoin d'indexer les journaux.

{{< url vimeo="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Recueillir les logs

Commencez [à ingérer les journaux][4] de vos hôtes, conteneurs, fournisseurs de cloud et autres sources pour vous familiariser avec Datadog Log Management.

## Configuration

{{< img src="logs/lwl_marketecture_20231030.png" alt="Configurer vos logs depuis un seul endroit" >}}

Une fois vos logs ingérés, vous pouvez les traiter et les enrichir avec des pipelines et des processeurs, contrôler précisément votre budget de gestion des logs avec des index, générer des métriques à partir des logs générés, ou encore gérer vos logs dans des archives optimisées pour le stockage grâce aux \[paramètres de configuration des logs]\[5].

## Connect

{{< img src="/logs/connect.png" alt="Corréler les logs aux métriques ou traces" style="width:80%;">}}

Tirez profit des trois piliers de l'observabilité en associant vos logs à vos métriques et traces :

- [Connectez vos journaux et vos traces][6] pour obtenir une meilleure visibilité sur vos applications.
- [Corrélez vos journaux et vos indicateurs][7] pour mieux comprendre un problème et le cartographier à travers votre service.

## Utilisation

Commencez à explorer vos logs ingérés dans le [\[Log Explorer]\[1].][1]

**Conseil**: Pour ouvrir l'explorateur de journaux à partir de la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `logs`.

{{< img src="/logs/explore.png" alt="Explorer vos logs ingérés" style="width:80%;">}}

- \*\*Rechercher** Effectuez des recherches dans l'ensemble de vos logs.
- Live Tail Visualisez vos journaux ingérés en temps réel dans tous vos environnements.
- Analytics Effectuez une analyse des journaux indexés.
- Patterns Repérez les tendances dans les journaux en regroupant vos journaux indexés.
- Saved Views Utilisez les vues enregistrées pour configurer automatiquement votre vue Log Explorer.


{{< learning-center-callout header="Essayez l'introduction à la gestion des journaux dans le centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/intro-to-log-managementApprenez gratuitement grâce à une véritable capacité de calcul cloud et un compte d'essai Datadog. Inscrivez-vous dès aujourd'hui pour en savoir plus sur la collecte, l'interrogation, l'analyse, les indicateurs, la surveillance, le traitement, le stockage et le contrôle d'accès des journaux. {{< /learning-center-callout >}}

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}
<br>
\*Logging without Limits est une marque déposée de Datadog, Inc.

[1]: /logs/explorer/
[2]: /security/cloud_siem/
[4]: /logs/log_collection/
[5]: /logs/log_configuration/
[6]: /tracing/other_telemetry/connect_logs_and_traces/
[7]: /logs/guide/correlate-logs-with-metrics/
[8]: /logs/explorer/search_syntax/
[9]: /logs/live_tail/
[10]: /logs/explorer/analytics/
[11]: /logs/explorer/patterns/
[12]: /logs/explorer/saved_views/
