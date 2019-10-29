---
aliases:
  - /fr/integrations/awspolly/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'AWS\_Polly."
doc_link: 'https://docs.datadoghq.com/integrations/amazon_polly/'
git_integration_title: amazon_polly
has_logo: true
integration_title: "Amazon\_Polly"
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_polly
public_title: "Intégration Datadog/Amazon\_Polly"
short_description: "Surveillez des métriques clés d'AWS\_Polly."
version: '1.0'
---
## Présentation

Amazon Polly est un service qui transforme le texte en paroles réalistes.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Polly.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Configuration

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `Polly` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS Polly][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_polly" >}}


Chacune des métriques récupérées à partir d'AWS se verra assigner les mêmes tags que ceux qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le hostname et les groupes de sécurité.

### Événements
L'intégration AWS Polly n'inclut aucun événement.

### Checks de service
L'intégration AWS Polly n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_polly
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_polly/amazon_polly_metadata.csv
[5]: https://docs.datadoghq.com/fr/help


{{< get-dependencies >}}