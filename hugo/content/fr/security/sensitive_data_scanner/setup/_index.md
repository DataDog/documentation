---
aliases:
- /fr/sensitive_data_scanner/setup
description: Configurez le Sensitive Data Scanner pour détecter et masquer les données
  sensibles dans les données de Telemetry, les traces d'Agent Observability, le stockage
  cloud Amazon S3 et les dépôts de code.
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/
  tag: Documentation
  text: Sensitive Data Scanner
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentation
  text: En savoir plus sur les règles d'analyse
- link: /security/sensitive_data_scanner/guide/investigate_sensitive_data_findings/
  tag: Documentation
  text: Examinez les résultats concernant les données sensibles.
- link: /security/sensitive_data_scanner/guide/create-monitors-for-sensitive-data/
  tag: Documentation
  text: Créez des moniteurs pour les données sensibles
title: Configuration du Sensitive Data Scanner
---
## Vue d'ensemble {#overview}

Configurez le Sensitive Data Scanner pour chaque source de données que vous souhaitez analyser. Chaque source utilise son propre processus de configuration ; configurez uniquement les sources pertinentes pour vos besoins.

- **Données de Telemetry:** Analysez vos logs, les spans APM, les événements RUM et les événements issus d'Event Management. Consultez [Données de Telemetry][1] pour obtenir les instructions de configuration. Pour analyser les logs avant qu'ils ne quittent votre réseau, utilisez le [processeur Sensitive Data Scanner pour Observability Pipelines][5].
- **Données d'Agent Observability:** Analysez les traces LLM, les prompts et les complétions. Configurez l'analyse depuis la [Agent Observability Settings page][3].
- **Données de stockage cloud:** Analysez vos buckets Amazon S3. Consultez [Cloud Storage][2] pour obtenir les instructions de configuration.
- **Dépôts de code:** Détectez les secrets exposés dans votre code source. Consultez [Secret Scanning][4] pour obtenir les instructions de configuration.
- **Évaluations AI Guard:** Analysez les conversations évaluées par AI Guard pour détecter les données sensibles telles que les identifiants et les PII. Configurez les règles d'analyse depuis l'[onglet AI Guard][6] de la page de configuration du Sensitive Data Scanner.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /fr/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /fr/security/code_security/secret_scanning/
[5]: /fr/observability_pipelines/processors/sensitive_data_scanner
[6]: https://app.datadoghq.com/sensitive-data-scanner/configuration/ai-guard