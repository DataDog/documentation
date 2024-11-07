---
categories:
- languages
- log collection
ddtype: library
dependencies: []
description: Recueillez des métriques, des traces et des logs à partir de vos applications
  PHP.
doc_link: https://docs.datadoghq.com/integrations/php/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitor-php-performance/
  tag: Blog
  text: Surveillance PHP avec l'APM et le tracing distribué de Datadog
- link: https://www.datadoghq.com/blog/php-logging-guide/
  tag: Blog
  text: Comment recueillir, personnaliser et analyser des logs PHP
git_integration_title: php
has_logo: true
integration_id: php
integration_title: PHP
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: php
public_title: Intégration Datadog/PHP
short_description: Recueillez des métriques, des traces et des logs à partir de vos
  applications PHP.
version: '1.0'
---

## Présentation

L'intégration Datadog/PHP vous permet de recueillir et de surveiller les logs, les traces et les métriques custom de vos applications PHP.

## Configuration

### Collecte de métriques

Consultez la documentation relative à la [collecte de métriques custom PHP avec DogStatsD][1].

### Collecte de traces

Consultez la documentation relative à l'[instrumentation de votre application PHP][2] pour envoyer ses traces à Datadog.

### Collecte de logs

*Disponible à partir des versions > 6.0 de l'Agent*

Consultez la documentation relative à la [configuration de la collecte de logs PHP][3] pour transmettre vos logs à Datadog.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=php
[2]: https://docs.datadoghq.com/fr/tracing/setup/php/
[3]: https://docs.datadoghq.com/fr/logs/log_collection/php/
[4]: https://docs.datadoghq.com/fr/help/