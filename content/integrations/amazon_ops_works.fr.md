---
aliases:
  - /fr/integrations/awsopsworks/
categories:
  - cloud
  - provisioning
  - aws
  - log collection
ddtype: crawler
description: Suivez l'utilisation des ressources AWS OpsWorks.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ops_works/'
git_integration_title: amazon_ops_works
has_logo: true
integration_title: AWS OpsWorks
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ops_works
public_title: "Intégration Datadog-AWS OpsWorks\_"
short_description: Suivez l'utilisation des ressources AWS OpsWorks.
version: '1.0'
---
## Aperçu

AWS OpsWorks est un service de gestion d'applications qui facilite le déploiement et l'exploitation d'applications de toutes formes et tailles.

Activez cette intégration pour voir dans Datadog toutes vos métriques de OpsWorks.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).
### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `OpsWorks` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS OpsWork] (https://app.datadoghq.com/account/settings#integrations/amazon_ops_works).


## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ops_works" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS Ops Works n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS Ops Works n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)