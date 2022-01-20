---
categories:
  - languages
  - log collection
ddtype: library
dependencies: []
description: Envoyez des métriques custom à partir de vos applications Go grâce aux bibliothèques client de Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/go/'
draft: false
further_reading:
  - link: 'https://www.datadoghq.com/blog/monitoring-rails-with-datadog/'
    tag: Blog
    text: Surveillance des applications Rails avec Datadog
  - link: 'https://www.datadoghq.com/blog/managing-rails-logs-with-datadog/'
    tag: Blog
    text: Collecte et surveillance des logs Rails avec Datadog
  - link: 'https://www.datadoghq.com/blog/managing-rails-application-logs/'
    tag: Blog
    text: 'Comment recueillir, personnaliser et gérer les logs d''applications Rails'
git_integration_title: go
has_logo: true
integration_id: go
integration_title: Go
is_public: true
kind: integration
manifest_version: '1.0'
name: go
public_title: Intégration Datadog/Go
short_description: Envoyez des métriques custom à partir de vos applications Go grâce aux bibliothèques client de Datadog.
version: '1.0'
---
## Présentation

L'intégration Go vous permet de recueillir et de surveiller les logs, les traces et les métriques custom de vos applications Go.

## Configuration

### Collecte de métriques

Consultez la documentation relative à la [collecte de métriques custom Go avec DogStatsD][1].

### Collecte de traces

Consultez la documentation relative à l'[instrumentation de votre application Go][2] pour envoyer ses traces à Datadog.

### Collecte de logs

*Disponible à partir des versions > 6.0 de l'Agent*

Consultez la documentation relative à la [configuration de la collecte de logs Go][3] pour transmettre vos logs à Datadog.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=go
[2]: https://docs.datadoghq.com/fr/tracing/setup/go/
[3]: https://docs.datadoghq.com/fr/logs/log_collection/go/
[4]: https://docs.datadoghq.com/fr/help/
