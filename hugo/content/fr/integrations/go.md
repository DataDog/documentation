---
categories:
- languages
- tracing
dependencies: []
description: Envoyez des métriques runtime à partir de vos applications Go grâce aux
  bibliothèques client de Datadog.
doc_link: https://docs.datadoghq.com/integrations/go/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/go-logging/
  tag: Blog
  text: Comment recueillir, standardiser et centraliser des logs Golang
git_integration_title: go
has_logo: true
integration_id: go
integration_title: Go
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: go
public_title: Intégration Datadog/Go
short_description: Envoyez des métriques runtime à partir de vos applications Go grâce
  aux bibliothèques client de Datadog.
version: '1.0'
---

## Présentation

L'intégration Go vous permet de recueillir et de surveiller les logs, les traces et les métriques custom de vos applications Go.

## Implémentation

### Collecte de métriques

Consultez la documentation relative à la [collecte de métriques custom Go avec DogStatsD][1].

### Collecte de traces

Consultez la documentation relative à l'[instrumentation de votre application Go][2] pour envoyer vos traces à Datadog.

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez la documentation relative à la [configuration de la collecte de logs Go][3] pour transmettre vos logs à Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "go" >}}


### Événements

L'intégration Go n'inclut aucun événement.

### Checks de service

L'intégration Go n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=go
[2]: https://docs.datadoghq.com/fr/tracing/setup/go/
[3]: https://docs.datadoghq.com/fr/logs/log_collection/go/
[4]: https://docs.datadoghq.com/fr/help/