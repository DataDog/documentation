---
assets:
  dashboards: {}
  monitors: {}
  service_checks: /assets/service_checks.json
categories:
  - aws
  - cloud
  - gestion des coûts
creates_events: false
ddtype: check
dependencies:
  - 'https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/README.md'
display_name: "AWS\_Pricing"
git_integration_title: aws_pricing
guid: fce760ae-979a-4c35-aa4e-5a05c24e2ce3
integration_id: aws-pricing
integration_title: "AWS\_Pricing"
is_public: true
kind: Twislock
maintainer: tsein@brightcove.com
manifest_version: 1.0.0
metric_prefix: aws_pricing.
metric_to_check: ''
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

L'icône réalisée par [Eucalyp](https://www.flaticon.com/authors/eucalyp) de [www.flaticon.com](https://www.flaticon.com/) a été autorisée par [CC 3.0 BY](http://creativecommons.org/licenses/by/3.0/)

## Implémentation

### Installation

Le check AWS Pricing n'est pas inclus avec le paquet de l'[Agent Datadog][2] : vous devez donc l'installer à l'aide des [instructions relatives à l'installation de l'intégration officielle de la communauté][7].

### Configuration

1. Modifiez le fichier `aws_pricing.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performances AWS pricing. Consultez le [fichier d'exemple aws_pricing.d/conf.yaml][2] pour découvrir toutes les options de configuration disponibles.

2. [Redémarrez l'Agent][3].

### Validation

[Lancez la sous-commande du statut de l'Agent][4] et cherchez `aws_pricing` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "aws_pricing" >}}


### Checks de service

`aws_pricing.status` :

Renvoie `CRITICAL` si le check rencontre une erreur au cours de l'utilisation du tarif client Boto3 pour la collecte de métriques.

Renvoie `WARNING` si le code tarifaire a été défini dans `aws_pricing.d/conf.yaml` et n'a pu être trouvé à l'aide du tarif client Boto3.

Renvoie `OK` lorsqu'aucune erreur n'a été détectée et que toutes les données relatives au code tarifaire associé à tous les services de votre choix ont été recueillies.

### Événements

AWS Pricing n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][5].

[1]: https://aws.amazon.com/pricing/
[2]: https://github.com/DataDog/integrations-core/blob/master/aws_pricing/datadog_checks/aws_pricing/data/conf.yaml.example
[3]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#restart-the-agent
[4]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-information
[5]: https://docs.datadoghq.com/fr/help
[6]: https://github.com/DataDog/integrations-extras/blob/master/aws_pricing/metadata.csv
[7]: https://docs.datadoghq.com/fr/agent/guide/community-integrations-installation-with-docker-agent/


{{< get-dependencies >}}