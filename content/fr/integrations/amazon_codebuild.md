---
aliases:
  - /fr/integrations/awscodebuild/
categories:
  - cloud
  - aws
ddtype: crawler
dependencies: []
description: Surveillez vos déploiements en temps réel et mesurez leur durée.
doc_link: 'https://docs.datadoghq.com/integrations/amazon_codebuild/'
git_integration_title: amazon_codebuild
has_logo: true
integration_title: "Amazon\_CodeBuild"
is_public: true
kind: integration
manifest_version: 1
name: amazon_codebuild
public_title: "Intégration Datadog/Amazon\_CodeBuild"
short_description: Surveillez vos déploiements en temps réel et mesurez leur durée.
version: 1
---
## Présentation

AWS CodeBuild est un service d’intégration entièrement géré qui compile votre code source, exécute des tests et produit des packages logiciels prêts à être déployés.

Installez l'intégration Datadog/AWS CodeBuild pour :

* Suivre vos builds par projet
* Recueillir les métriques associées à vos builds
* Corréler les builds avec le reste de vos métriques Datadog

## Implémentation
### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `CloudBuild` est cochée dans la section concernant la collecte des métriques.

2. Installez l'[intégration Datadog/AWS Codebuild][3].

## Données collectées
### Métriques
{{< get-metrics-from-git "amazon_codebuild" >}}


### Événements
L'intégration AWS CodeBuild n'inclut aucun événement.

### Checks de service
L'intégration AWS_CodeBuild n'inclut aucun check de service.

## Dépannage
Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-codebuild
[4]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_codebuild/amazon_codebuild_metadata.csv
[5]: https://docs.datadoghq.com/fr/help/


{{< get-dependencies >}}