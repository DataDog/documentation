---
aliases:
  - /fr/integrations/awscloudsearch/
categories:
  - cloud
  - processing
  - search
  - aws
ddtype: crawler
description: >-
  Suivez l'utilisation de vos index, le nombre de requêtes réussies et plus
  encore.
doc_link: 'https://docs.datadoghq.com/integrations/awscloudsearch/'
git_integration_title: amazon_cloudsearch
has_logo: true
integration_title: AWS CloudSearch
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_cloudsearch
public_title: Intégration Datadog-AWS CloudSearch
short_description: >-
  Suivez l'utilisation de vos index, le nombre de requêtes réussies et plus
  encore.
version: '1.0'
---
## Aperçu

Amazon CloudSearch est un service managé du cloud AWS qui rend facile et rentable l'implémentation d'une solution scalable de recherche.

Activez cette intégration pour voir dans Datadog toutes vos métriques CloudSearch.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier][1].

### Configuration

1. Dans la [vignette d'intégration AWS] [2], assurez-vous que `CloudSearch` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS CloudSearch] [3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_cloudsearch" >}}

Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Cloudsearch n'inclut aucun événement pour le moment.

### Checks de Service
L'intégration AWS Cloudsearch n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog][4].

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog][5]

[1]: https://docs.datadoghq.com/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon_cloudsearch
[4]: http://docs.datadoghq.com/help/
[5]: https://www.datadoghq.com/blog/
