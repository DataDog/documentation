---
aliases:
  - /fr/integrations/awskms/
categories:
  - cloud
  - security
  - aws
  - log collection
ddtype: crawler
description: Suivre l'expiration de la clé Amazon KMS.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_kms/'
git_integration_title: amazon_kms
has_logo: true
integration_title: AWS Key Management Service
is_public: true
kind: integration
manifest_version: '1.0'
name: amazon_kms
public_title: Intégration Datadog-AWS Key Management Service
short_description: Suivre l'expiration de la clé Amazon KMS.
version: '1.0'
---
## Aperçu

AWS Key Management Service (KMS) est un service géré qui facilite la création et le contrôle des clés de chiffrement utilisées pour chiffrer vos données.

Activez cette intégration pour voir dans Datadog toutes vos métriques de KMS.

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez [l'Intégration Amazon Web Services en premier](https://docs.datadoghq.com/integrations/amazon_web_services/).

### Configuration

1. Dans la [vignette d'intégration AWS] (https://app.datadoghq.com/account/settings#integrations/amazon_web_services), assurez-vous que `KMS` est coché dans la partie "metric collection".

2. Installez l'intégration [Datadog - AWS KMS] (https://app.datadoghq.com/account/settings#integrations/amazon_kms).

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_kms" >}}


Chacune des métriques récupérées à partir d'AWS se verra attribuer les mêmes tags qui apparaissent dans la console AWS, y compris, mais sans s'y limiter, le nom de l'host, les groupes de sécurité et plus encore.

### Evénements
L'intégration AWS KMS n'inclut aucun événements pour le moment.

### Checks de Service
L'intégration AWS KMS n'inclut aucun check de service pour le moment.

## Troubleshooting
Besoin d'aide? Contactez  [l'équipe support de Datadog](http://docs.datadoghq.com/help/).

## En apprendre plus
Apprenez en plus sur l'infrastructure monitoring et toutes les intégrations Datadog sur [notre blog](https://www.datadoghq.com/blog/)