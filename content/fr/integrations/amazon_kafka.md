---
assets:
  configuration:
    spec: assets/configuration/spec.yaml
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  logs: {}
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
- aws
- messaging
- processing
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md
display_name: Amazon Kafka
draft: false
git_integration_title: amazon_kafka
guid: a572ad85-f431-4ed1-a1f3-cba9e1d4712f
integration_id: amazon-kafka
integration_title: Amazon MSK (Agent)
integration_version: 3.1.0
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aws.msk.
metric_to_check: aws.msk.go.threads
name: amazon_kafka
public_title: Amazon MSK (Agent)
short_description: Surveillez les performances et la santé de vos clusters Amazon MSK.
support: core
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Ce check permet de surveiller Amazon Managed Streaming for Apache Kafka ([Amazon MSK][1]) avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Installation

1. [Créez une machine client][3] si ce n'est pas déjà fait.
2. Assurez-vous que la machine client [dispose][4] de la stratégie d'autorisation [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][5] ou que des [identifiants][6] équivalents sont disponibles.
3. Activez la [surveillance ouverte avec Prometheus][7] côté MSK pour activer JmxExporter et NodeExporter.
4. Installez l'[Agent Datadog][8] sur la machine client que vous venez de créer.

### Configuration


1. Modifiez le fichier `amazon_msk.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Amazon MSK. Consultez le [fichier d'exemple amazon_msk.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

   **Remarque** : il s'agit de l'exemple de check OpenMetrics par défaut. Si vous avez déjà implémenté cette intégration, consultez l'[exemple pour l'ancienne version][10].

2. [Redémarrez l'Agent][11].

### Validation

[Lancez la sous-commande status de l'Agent][12] et cherchez `amazon_msk` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_msk" >}}


### Événements

Le check Amazon MSK n'inclut aucun événement.

### Checks de service
{{< get-service-checks-from-git "amazon_msk" >}}


## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][15].

[1]: https://aws.amazon.com/msk
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[5]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[6]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[7]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[8]: https://docs.datadoghq.com/fr/agent/
[9]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[10]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[12]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[13]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[14]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[15]: https://docs.datadoghq.com/fr/help/