---
categories:
  - languages
  - log collection
ddtype: library
dependencies: []
description: 'Recueillez des métriques, des traces et des logs à partir de vos applications Python.'
doc_link: 'https://docs.datadoghq.com/integrations/python/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/tracing-async-python-code/'
    tag: Blog
    text: Tracer du code Python asynchrone avec l'APM Datadog
  - link: 'https://www.datadoghq.com/blog/python-logging-best-practices/'
    tag: Blog
    text: 'Comment recueillir, personnaliser et centraliser des logs Python'
git_integration_title: python
has_logo: true
integration_title: Python
is_public: true
kind: integration
manifest_version: '1.0'
name: python
public_title: Intégration Datadog/Python
short_description: 'Recueillez des métriques, des traces et des logs à partir de vos applications Python.'
version: '1.0'
---
## Présentation

L'intégration Python vous permet de recueillir et de surveiller les logs, les traces et les métriques custom de vos applications Python.

## Configuration

### Collecte de métriques

Consultez la documentation relative à la [collecte de métriques custom Python avec DogStatsD][1].

### Collecte de traces

Consultez la documentation relative à l'[instrumentation de votre application Python][2] pour envoyer ses traces à Datadog.

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez la documentation relative à la [configuration de la collecte de logs Python][3] pour transmettre vos logs à Datadog.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=python
[2]: https://docs.datadoghq.com/fr/tracing/setup/python/
[3]: https://docs.datadoghq.com/fr/logs/log_collection/python/
[4]: https://docs.datadoghq.com/fr/help/