---
aliases:
  - /fr/integrations/awspolly/
categories:
  - cloud
  - aws
ddtype: crawler
description: Suivre les métriques AWS Polly
doc_link: 'https://docs.datadoghq.com/integrations/amazon_polly/'
git_integration_title: amazon_polly
has_logo: true
integration_title: AWS Polly
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_polly
public_title: Intégration Datadog-AWS Polly
short_description: Suivre les métriques AWS Polly
version: '1.0'
---
## Aperçu

Amazon Polly est un service qui transforme du texte en discours.

Activez cette intégration pour voir dans Datadog toutes vos métriques de Polly.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier][1].

### Configuration

1. Dans la [vignette d'intégration AWS] [2], assurez-vous que `Polly` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS Polly][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_polly" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Polly n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Polly n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][4].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][5]

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_polly
[4]: http://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/
