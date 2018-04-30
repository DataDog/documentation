---
aliases:
  - /fr/integrations/awsstoragegateway/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques clés AWS Storage Gateway.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_storage_gateway/'
git_integration_title: amazon_storage_gateway
has_logo: true
integration_title: AWS Storage Gateway
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_storage_gateway
public_title: Intégration Datadog-AWS Storage Gateway
short_description: Suivre les métriques clés AWS Storage Gateway.
version: '1.0'
---
## Aperçu

AWS Storage Gateway offre une intégration transparente et sécurisée entre l'environnement informatique d'une organisation et l'infrastructure de stockage de AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques de Storage Gateway.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `StorageGateway` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS Storage Gateway] (https://app.datadoghq.com/account/settings#integrations/amazon_storage_gateway).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_storage_gateway" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Storage Gateway n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Storage Gateway n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)