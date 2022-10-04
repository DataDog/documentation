---
aliases:
- /fr/cloud-siem/getting_started/
- /fr/security_monitoring/getting_started/
- /fr/security_platform/security_monitoring/
- /fr/security_platform/security_monitoring/getting_started
- /fr/security_platform/getting_started/
description: Découvrez les grands concepts de la solution Cloud SIEM de Datadog, activez
  la détection de menaces et explorez les règles de détection des menaces par défaut.
further_reading:
- link: /security_platform/default_rules
  tag: Documentation
  text: Explorer les règles de détection par défaut
- link: /security_platform/explorer
  tag: Documentation
  text: En savoir plus sur le Security Signals Explorer
- link: /security_platform/guide/aws-config-guide-for-cloud-siem/
  tag: Documentation
  text: Guide de configuration d'AWS pour Cloud SIEM
kind: documentation
title: Débuter avec Cloud SIEM
---

Pour commencer à utiliser la solution Cloud SIEM (gestion des informations et événements de sécurité) de Datadog, suivez ces étapes :

- [Ingérer des logs](#ingerer-des-logs)
- [Examiner les règles de détection](#examiner-les-regles-de-detection)
- [Explorer les signaux de sécurité](#explorer-les-signaux-de-securite)
- [Pour aller plus loin](#pour-aller-plus-loin)

Pour obtenir des instructions détaillées afin de commencer à détecter les menaces dans vos logs AWS CloudTrail, consultez le [Guide de configuration d'AWS pour Cloud SIEM][1].

## Ingérer des logs

Si vous disposez déjà d'une source de journalisation, suivez les [instructions dans l'application][2] pour commencer à recueillir des logs à partir de cette source.

La [documentation relative à la collecte de logs][3] de Datadog décrit en détail comment recueillir des logs à partir de nombreuses sources différentes pour les envoyer à Datadog. Dans un premier temps, tous les logs ingérés sont parsés et enrichis. Les règles de détection sont appliquées en temps réel à tous les logs traités, ceci afin d'optimiser la couverture de détection tout en éliminant les problèmes de performance ou de coût habituels liés à l'indexation de l'intégralité des données de log. [En savoir plus sur la fonctionnalité Logging without Limits™ de Datadog][4].

{{< img src="security_platform/security_monitoring/getting_started/ingest_logs_overview.png" alt="Ingérer des logs" >}}

## Examiner les règles de détection

Datadog propose des [règles de détection][5] par défaut, vous permettant ainsi de détecter immédiatement les menaces dans votre environnement. Ces règles détectent les menaces en fonction des bonnes pratiques connues. Si votre organisation nécessite une sécurité plus avancée, vous avez la possibilité d'activer d'autres règles de détection afin de détecter les menaces plus poussées. Des modèles avancés sont également proposés pour vous permettre de détecter les menaces dans vos applications personnalisées. Consultez la [documentation relative aux règles de détection][6] pour en savoir plus.

## Explorer les signaux de sécurité

Lorsqu'une menace est détectée par une règle de détection, un signal de sécurité est généré. Les signaux de sécurité peuvent être mis en corrélation et triés dans le [Security Signals Explorer][7]. Consultez la documentation relative au [Security Signals Explorer][8] pour en savoir plus.

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security_platform/guide/aws-config-guide-for-cloud-siem
[2]: https://app.datadoghq.com/security/onboarding
[3]: /fr/logs/log_collection/
[4]: https://www.datadoghq.com/blog/logging-without-limits/
[5]: /fr/security_platform/default_rules/#cat-cloud-siem
[6]: /fr/security_monitoring/detection_rules/
[7]: https://app.datadoghq.com/security
[8]: /fr/security_monitoring/explorer/