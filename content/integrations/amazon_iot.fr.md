---
aliases:
  - /fr/integrations/awsiot/
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
description: Suivre les métriques Amazon Internet of Things.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_iot/'
git_integration_title: amazon_iot
has_logo: true
integration_title: AWS Internet of Things
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_iot
public_title: Intégration Datadog-AWS Internet of Things
short_description: Suivre les métriques Amazon Internet of Things.
version: '1.0'
---
## Aperçu

AWS IoT est une plateforme cloud gérée qui permt aux périphériques connectés d'interagir facilement et en toute sécurité avec des applications cloud et d'autres périphériques.

Activez cette intégration pour voir dans Datadog toutes vos métriques de IOT.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `IoT` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS IoT](https://app.datadoghq.com/account/settings#integrations/amazon_iot).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_iot" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS IoT n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS IoT n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)