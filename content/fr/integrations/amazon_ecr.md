---
categories:
- cloud
- aws
dependencies: []
description: Surveillez des métriques clés d'Amazon ECR.
doc_link: https://docs.datadoghq.com/integrations/amazon_ecr/
draft: false
git_integration_title: amazon_ecr
has_logo: true
integration_id: ''
integration_title: Amazon ECR
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ecr
public_title: Intégration Datadog/Amazon ECR
short_description: Surveillez des métriques clés d'Amazon ECR.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
## Présentation

Amazon Elastic Container Registry (Amazon ECR) est un registre de conteneurs Docker entièrement géré qui permet aux développeurs de stocker, gérer et déployer des images de conteneurs Docker en toute facilité.

Activez cette intégration pour visualiser toutes vos métriques ECR dans Datadog.

## Formule et utilisation

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `ECR` est cochée
   dans la section concernant la collecte de métriques.
2. Installez l'[intégration Datadog/ECR][3].

## Real User Monitoring

### Analyse d'entonnoirs
{{< get-metrics-from-git "amazon_ecr" >}}


### Aide

L'intégration ECR n'inclut aucun événement.

### Aide

L'intégration ECR n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/integrations/amazon-web-services
[3]: https://app.datadoghq.com/integrations/amazon-ecr
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ecr/amazon_ecr_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/