---
categories:
  - cloud
  - aws
  - log collection
ddtype: crawler
dependencies: []
description: "Surveillez des métriques clés d'Amazon\_EC2\_Spot."
doc_link: https://docs.datadoghq.com/integrations/amazon_ec2_spot/
draft: false
git_integration_title: amazon_ec2_spot
has_logo: true
integration_id: amazon-ec2-spot
integration_title: "Amazon\_EC2\_Spot"
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: '1.0'
name: amazon_ec2_spot
public_title: "Intégration Datadog/Amazon\_EC2\_Spot"
short_description: "Surveillez des métriques clés d'Amazon\_EC2\_Spot."
version: '1.0'
---
## Présentation

Les instances Amazon EC2 Spot vous permettent de tirer parti des capacités de calcul EC2 non utilisées dans le cloud AWS.

Activez cette intégration pour visualiser dans Datadog toutes vos métriques d'EC2 Spot.

## Configuration

### Installation

Si vous ne l'avez pas déjà fait, configurez d'abord [l'intégration Amazon Web Services][1].

### Collecte de métriques

1. Dans le [carré d'intégration AWS][2], assurez-vous que l'option `EC2 Spot Fleet` est cochée dans la section concernant la collecte des métriques.
2. Installez l'[intégration Datadog/Amazon EC2 Spot][3].

### Collecte de logs

Utilisez l'[Agent Datadog][4] ou un autre log shipper tel que [Rsyslog][5] pour envoyer vos logs vers Datadog.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_ec2_spot" >}}


### Événements

L'intégration Amazon EC2 Spot n'inclut aucun événement.

### Checks de service

L'intégration Amazon EC2 Spot n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][7].

[1]: https://docs.datadoghq.com/fr/integrations/amazon_web_services/
[2]: https://app.datadoghq.com/account/settings#integrations/amazon_web_services
[3]: https://app.datadoghq.com/account/settings#integrations/amazon-ec2-spot
[4]: https://docs.datadoghq.com/fr/agent/logs/
[5]: https://docs.datadoghq.com/fr/integrations/rsyslog/
[6]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_ec2_spot/amazon_ec2_spot_metadata.csv
[7]: https://docs.datadoghq.com/fr/help/