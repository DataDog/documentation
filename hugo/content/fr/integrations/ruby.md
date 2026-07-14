---
categories:
- languages
- log collection
ddtype: library
dependencies: []
description: Envoyez des métriques custom à partir de vos applications Ruby grâce
  aux bibliothèques client de Datadog.
doc_link: https://docs.datadoghq.com/integrations/ruby/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rails-with-datadog/
  tag: Blog
  text: Surveillance des applications Rails avec Datadog
- link: https://www.datadoghq.com/blog/managing-rails-logs-with-datadog/
  tag: Blog
  text: Collecte et surveillance des logs Rails avec Datadog
- link: https://www.datadoghq.com/blog/managing-rails-application-logs/
  tag: Blog
  text: Comment recueillir, personnaliser et gérer les logs d'applications Rails
git_integration_title: ruby
has_logo: true
integration_id: ruby
integration_title: Ruby
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: ruby
public_title: Intégration Datadog/Ruby
short_description: Envoyez des métriques custom à partir de vos applications Ruby
  grâce aux bibliothèques client de Datadog.
version: '1.0'
---

## Présentation

L'intégration Ruby vous permet de recueillir et de surveiller les logs, les traces et les métriques custom de vos applications Ruby.

## Configuration

### Collecte de métriques

Consultez la documentation relative à la [collecte de métriques custom Ruby avec DogStatsD][1].

### Collecte de traces

Consultez la documentation relative à l'[instrumentation de votre application Ruby][2] pour envoyer ses traces à Datadog.

### Collecte de logs

*Disponible à partir des versions > 6.0 de l'Agent*

Consultez la documentation relative à la [configuration de la collecte de logs Ruby][3] pour transmettre vos logs à Datadog.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=ruby
[2]: https://docs.datadoghq.com/fr/tracing/setup/ruby/
[3]: https://docs.datadoghq.com/fr/logs/log_collection/ruby/
[4]: https://docs.datadoghq.com/fr/help/