---
aliases:
- /fr/sensitive_data_scanner/setup
description: Configurez le Sensitive Data Scanner pour détecter et masquer les données
  sensibles dans les données de télémétrie, les traces d'observabilité des agents,
  le stockage cloud Amazon S3 et les dépôts de code.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Scanner de données sensibles
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentation
  text: En savoir plus sur les règles d'analyse
- link: /security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
  tag: Documentation
  text: Étudiez les résultats concernant les données sensibles
- link: /security/sensitive_data_scanner/guide/create-monitors-for-sensitive-data/
  tag: Documentation
  text: Créez des Monitors pour les données sensibles
title: Configuration du Sensitive Data Scanner
---
## Présentation {#overview}

Configurez le Sensitive Data Scanner pour chaque source de données que vous souhaitez analyser. Chaque source utilise son propre processus de configuration ; vous n'avez donc qu'à configurer les sources pertinentes pour vos besoins.

- **Données de télémétrie :** Analysez vos logs, spans APM, événements RUM et événements issus d'Event Management. Consultez [Données de télémétrie][1] pour obtenir les instructions de configuration. Pour analyser les logs avant qu'ils ne quittent votre réseau, utilisez le [processeur Sensitive Data Scanner pour Observability Pipelines][5].
- **Données d'observabilité des agents :** Analysez les traces, les prompts et les complétions LLM. Configurez l'analyse depuis la [page des paramètres d'observabilité des agents][3].
- **Données de stockage cloud :** Analysez vos buckets Amazon S3 et vos instances RDS. Consultez [Stockage cloud][2] pour obtenir les instructions de configuration.
- **Dépôts de code :** Détectez les secrets exposés dans votre code source. Consultez [Secret Scanning][4] pour obtenir les instructions de configuration.
- **Évaluations AI Guard :** Analysez les conversations évaluées par AI Guard pour détecter les données sensibles telles que les identifiants et les PII. Configurez les règles d'analyse depuis l'[onglet AI Guard][6] de la page de configuration du Sensitive Data Scanner.

## Pour aller plus loin {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /fr/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /fr/security/code_security/secret_scanning/
[5]: /fr/observability_pipelines/processors/sensitive_data_scanner
[6]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard