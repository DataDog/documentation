---
aliases:
  - /fr/integrations/awses/
categories:
  - cloud
  - search
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques clés d'Amazon Elasticsearch.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_es/'
git_integration_title: amazon_es
has_logo: true
integration_title: AWS ES
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_es
public_title: Intégration Datadog-AWS ES
short_description: Suivre les métriques clés d'Amazon Elasticsearch.
version: '1.0'
---
## Aperçu

Amazon Elasticsearch Service est un service géré du cloud AWS qui rend facile et rentable l'implémentation d'une solution extensible de recherche.

Activez cette intégration pour visualiser dans Datadog les tags personnalisé et les métriques pour vos grappes ES.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `ES` est coché dans la partie "metric collection".

2. Ajoutez ces permissions à votre [Police IAM Datadog](https://docs.datadoghq.com/integrations/amazon_web_services/#installation) afin de collecter vos métriques Amazon ES:

    * `es:ListTags`: Ajoute des tags de domaine ES personnalisés aux métriques ES
    * `es:ListDomainNames`: Ajoute des tags de domaine ES personnalisées aux métriques ES
    * `es:DescribeElasticsearchDomains` : Ajoutez des tags de domaine ES personnalisé aux métriques ES

    Pour plus d'information sur les polices ES, consultez [la documentation AWS dédiée](https://docs.aws.amazon.com/IAM/latest/UserGuide/list_es.html).

3. Installez l'intégration [Datadog - AWS ES] (https://app.datadoghq.com/account/settings#integrations/amazon_es).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_es" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS ES n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS ES n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)