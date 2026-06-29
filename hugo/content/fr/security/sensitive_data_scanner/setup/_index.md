---
aliases:
- /fr/sensitive_data_scanner/setup
disable_toc: false
further_reading:
- link: /security/sensitive_data_scanner/scanning_rules/
  tag: Documentation
  text: En savoir plus sur les règles de numérisation
title: Implémentation
---
## Aperçu {#overview}

Configurez le Sensitive Data Scanner pour analyser vos :

- Données de télémétrie, afin que vous puissiez identifier les données sensibles dans vos journaux, les spans APM, les événements RUM et les événements d'Event Management. Voir [Set Up for Telemetry Data][1] pour les instructions.
- Données Agent Observability, afin que vous puissiez identifier les données sensibles dans les traces LLM, les prompts et les completions. Accédez à la [Agent Observability Settings page][3] pour configurer la numérisation.
- Données de stockage dans le cloud, afin que vous puissiez identifier les données sensibles dans vos buckets Amazon S3. Voir [Set Up for Cloud Storage][2] pour les instructions.
- Dépôts de code, afin que vous puissiez détecter les secrets exposés dans le code source. Voir [Secret Scanning][4] pour les instructions.

## Lectures complémentaires {#further-reading}

{{< partial name="whats-next/whats-next.html" >}}

[1]: /fr/security/sensitive_data_scanner/setup/telemetry_data/
[2]: /fr/security/sensitive_data_scanner/setup/cloud_storage/
[3]: https://app.datadoghq.com/sensitive-data-scanner/configuration/llm-spans
[4]: /fr/security/code_security/secret_scanning/