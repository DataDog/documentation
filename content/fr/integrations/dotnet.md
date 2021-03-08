---
categories:
  - languages
  - log collection
ddtype: library
dependencies: []
description: Envoyez des métriques custom à partir de vos applications .NET grâce aux bibliothèques client de Datadog.
doc_link: 'https://docs.datadoghq.com/integrations/dotnet/'
draft: false
further_reading: []
git_integration_title: dotnet
has_logo: true
integration_title: .NET
is_public: true
kind: integration
manifest_version: '1.0'
name: dotnet
public_title: Intégration Datadog/.NET
short_description: Envoyez des métriques custom à partir de vos applications .NET grâce aux bibliothèques client de Datadog.
version: '1.0'
---
## Présentation

L'intégration .NET vous permet de recueillir et de surveiller les logs, les traces et les métriques custom de vos applications .NET.

## Configuration

### Collecte de métriques

Consultez la documentation relative à la [collecte de métriques custom .NET avec DogStatsD][1].

### Collecte de traces

Consultez la documentation relative à l'[instrumentation de votre application .NET][2] pour envoyer ses traces à Datadog.

### Collecte de logs

_Disponible à partir des versions > 6.0 de l'Agent_

Consultez la documentation relative à la [configuration de la collecte de logs .NET][3] pour transmettre vos logs à Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "dotnet" >}}


### Événements

L'intégration .NET n'inclut aucun événement.

### Checks de service

L'intégration .NET n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][4].

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/fr/developers/dogstatsd/?tab=net
[2]: https://docs.datadoghq.com/fr/tracing/setup/dotnet/
[3]: https://docs.datadoghq.com/fr/logs/log_collection/csharp/
[4]: https://docs.datadoghq.com/fr/help/