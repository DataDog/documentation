---
aliases:
  - /fr/integrations/awsebs/
categories:
  - cloud
  - data store
  - aws
  - log collection
ddtype: crawler
description: 'Suivre l''âge des snapshot, les IOPS, les temps de lecture/écriture, etc...'
doc_link: 'https://docs.datadoghq.com/integrations/amazon_ebs/'
git_integration_title: amazon_ebs
has_logo: true
integration_title: AWS Elastic Block Store
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_ebs
public_title: Intégration Datadog-AWS Elastic Block Store
short_description: 'Suivre l''âge des snapshot, les IOPS, les temps de lecture/écriture, etc...'
version: '1.0'
---
## Aperçu

Amazon EBS fournit des volumes de stockage de bloc persistants à utiliser avec les instances Amazon EC2 dans le cloud AWS.

Activez cette intégration pour voir dans Datadog toutes vos métriques de EBS.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `EBS` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS EBS] (https://app.datadoghq.com/account/settings#integrations/amazon_ebs).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_ebs" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

**Note**: `aws.ebs.snapshot_age` n'est pas collectée par défaut avec l'intégration Datadog-EBS. [Contactez-nous](http://docs.datadoghq.com/help/) pour activer la collection de cette métrique.

### Evénements
L'intégration AWS EBS n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS EBS n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)