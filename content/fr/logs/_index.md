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

{{< learning-center-callout header="Participez à une session de webinaire de formation" hide_image="true" btn_title="Inscrivez-vous" btn_url="https://www.datadoghq.com/technical-enablement/sessions/?tags.topics-0=Logs">}} Participez à une session de formation d'introduction ou intermédiaire pour apprendre comment la gestion des journaux Datadog unifie les journaux, les métriques et les traces dans une vue unique, vous offrant un contexte riche pour analyser les données de journaux. {{< /learning-center-callout >}}

## Présentation

Enregistrer les parties importantes des opérations de votre système est crucial pour maintenir la santé de l'infrastructure. L'infrastructure moderne a la capacité de générer des milliers d'événements de journal par minute. Dans cette situation, vous devez choisir quels journaux envoyer à une solution de gestion des journaux et quels journaux archiver. Filtrer vos journaux avant de les envoyer peut cependant entraîner des lacunes dans la couverture ou la suppression accidentelle de données précieuses.

La gestion des journaux Datadog, également appelée journaux Datadog ou journalisation, supprime ces limitations en découplant l'ingestion des journaux de l'indexation. Cela vous permet de collecter, traiter, archiver, explorer et surveiller tous vos journaux de manière rentable, également connu sous le nom de Journalisation sans limites\*.

La Journalisation sans limites* permet une expérience de dépannage rationalisée dans le [Explorateur de journaux][1], ce qui vous permet, à vous et à vos équipes, d'évaluer et de résoudre rapidement vos problèmes d'infrastructure. Elle fournit un archivage intuitif pour soutenir vos équipes de sécurité et informatiques lors des audits et évaluations. La Journalisation sans limites* alimente également [Datadog Cloud SIEM][2], qui détecte les menaces de sécurité dans votre environnement, sans nécessiter d'indexer les journaux.

{{< vimeo url="https://player.vimeo.com/progressive_redirect/playback/293195142/rendition/1080p/file.mp4?loc=external&signature=8a45230b500688315ef9c8991ce462f20ed1660f3edff3d2904832e681bd6000" poster="/images/poster/logs.png" >}}

</br>

## Recueillir les logs

Pour commencer à utiliser Log Management, vous devez d'abord \[ingérer des logs]\[4] depuis vos hosts, conteneurs, fournisseurs cloud et autres sources.

## Configuration

...

Une fois vos logs ingérés, vous pouvez les traiter et les enrichir avec des pipelines et des processeurs, contrôler précisément votre budget de gestion des logs avec des index, générer des métriques à partir des logs générés, ou encore gérer vos logs dans des archives optimisées pour le stockage grâce aux \[paramètres de configuration des logs]\[5].

## Connect

...

Tirez profit des trois piliers de l'observabilité en associant vos logs à vos métriques et traces :

- \[Associez vos logs à vos traces]\[6] pour gagner en visibilité sur vos applications.
- \[Corrélez vos logs à vos métriques]\[7] pour contextualiser un problème et le mapper dans l'ensemble de votre service.

## Utilisation

Commencez à explorer vos logs ingérés dans le \[Log Explorer]\[1].

**Astuce** : Pour ouvrir l'Explorateur de journaux à partir de la recherche globale de Datadog, appuyez sur <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> et recherchez `logs`.

...

- \*\*Rechercher** Effectuez des recherches dans l'ensemble de vos logs.
- Live Tail Voyez vos journaux ingérés en temps réel dans tous vos environnements.
- Analytics Effectuez des analyses de journaux sur vos journaux indexés.
- Patterns Repérez les modèles de journaux en regroupant vos journaux indexés.
- Vues enregistrées Utilisez les vues enregistrées pour configurer automatiquement votre vue Log Explorer.


{{< learning-center-callout header="Essayez l'introduction à la gestion des journaux dans le centre d'apprentissage" btn_title="Inscrivez-vous maintenant" btn_url="https://learn.datadoghq.com/courses/intro-to-log-management">}} Apprenez sans frais sur une capacité de calcul cloud réelle et un compte d'essai Datadog. Inscrivez-vous aujourd'hui pour en savoir plus sur la collecte de journaux, les requêtes, l'analytique, les métriques, la surveillance, le traitement, le stockage et le contrôle d'accès. {{< /learning-center-callout >}}

## Pour aller plus loin

...
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
