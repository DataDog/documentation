---
title: Débuter
kind: documentation
description: 'Découvrez les grands concepts de la solution Security Monitoring de Datadog, activez la détection de menaces et explorez les règles de détection des menaces par défaut.'
---
Pour commencer à utiliser la solution Security Monitoring de Datadog, suivez ces trois étapes :

* [Ingérer des logs](#ingest-logs)
* [Examiner les règles de détection](#review-detection-rules)
* [Explorer les signaux de sécurité](#explore-security-signals)

## Ingérer des logs

La [documentation relative à la collecte de logs][1] de Datadog décrit en détail comment recueillir des logs à partir de nombreuses sources différentes pour les envoyer à Datadog. Dans un premier temps, tous les logs ingérés sont parsés et enrichis. Les règles de détection sont appliquées en temps réel à tous les logs traités, ceci afin d'optimiser la couverture de détection tout en éliminant les problèmes de performance ou de coût habituels liés à l'indexation de l'intégralité des données de log. [En savoir plus sur la fonctionnalité Logging without Limits™ de Datadog][2].

{{< img src="security_platform/security_monitoring/getting_started/ingest_logs_overview.png" alt="Ingérer des logs" >}}

## Examiner les règles de détection

Datadog propose des [règles de détection][3] par défaut, vous permettant ainsi de détecter immédiatement les menaces dans votre environnement. Ces règles détectent les menaces en fonction des bonnes pratiques connues. Si votre organisation nécessite une sécurité plus avancée, vous avez la possibilité d'activer d'autres règles afin de détecter les menaces plus poussées. Des modèles avancés sont également proposés pour vous permettre de détecter les menaces dans vos applications personnalisées. Consultez la [documentation relative aux règles de détection][4] pour en savoir plus.

## Explorer les signaux de sécurité

Lorsqu'une menace est détectée par une règle de détection, un signal de sécurité est généré. Les signaux de sécurité peuvent être mis en corrélation et triés dans le [Security Signals Explorer][5]. Consultez la documentation relative au [Security Signals Explorer][6] pour en savoir plus.

[1]: /fr/logs/log_collection/
[2]: https://www.datadoghq.com/blog/logging-without-limits/
[3]: /fr/security_monitoring/default_rules/
[4]: /fr/security_monitoring/detection_rules/
[5]: https://app.datadoghq.com/security
[6]: /fr/security_monitoring/explorer/
