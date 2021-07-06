---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
  - aws
  - cloud
  - gestion des coûts
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/README.md'
display_name: "AWS\_Pricing"
draft: false
git_integration_title: aws_pricing
guid: fce760ae-979a-4c35-aa4e-5a05c24e2ce3
integration_id: aws-pricing
integration_title: "AWS\_Pricing"
is_public: true
kind: Twislock
maintainer: tsein@brightcove.com
manifest_version: 1.0.0
metric_prefix: aws.pricing.
metric_to_check: aws.pricing.amazonecs
name: aws_pricing
public_title: "Intégration Datadog/AWS\_Pricing"
short_description: "Recueillez des informations relatives aux services d'AWS\_Pricing par code tarifaire."
support: contrib
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Ce check envoie les informations relatives au tarif [publiées par AWS][1] afin de simplifier l'évaluation des coûts liés à l'utilisation des ressources dans Datadog.

## Configuration

### Installation

Le check AWS Pricing n'est pas inclus avec le package de l'[Agent Datadog][2] : vous devez donc l'installer en suivant les [instructions d'installation d'une intégration développée par la communauté][3].

### Configuration

1. Modifiez le fichier `aws_pricing.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performances AWS pricing. Consultez le [fichier d'exemple aws_pricing.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][4].

### Validation

[Lancez la sous-commande status de l'Agent][5] et cherchez `aws_pricing` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aws_pricing" >}}


### Checks de service

`aws_pricing.status` :

Renvoie `CRITICAL` si le check rencontre une erreur durant l'utilisation du client de tarification Boto3 pour la collecte de métriques.

Renvoie `WARNING` si un code tarif défini dans `aws_pricing.d/conf.yaml` n'a pas pu être trouvé à l'aide du client de tarification Boto3.

Renvoie `OK` lorsqu'aucune erreur n'a été détectée et que toutes les données de tarification du service de votre choix ont été recueillies.

### Événements

AWS Pricing n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://aws.amazon.com/pricing/
[2]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[5]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-information
[6]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/metadata.csv
[7]: https://docs.datadoghq.com/fr/help/