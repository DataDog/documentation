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
  - 'https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md'
description: Surveillez des métriques clés d'Amazon Managed Streaming for Apache Kafka (MSK).
display_name: "Amazon\_Kafka"
doc_link: 'https://docs.datadoghq.com/integrations/amazon_msk/'
draft: false
git_integration_title: amazon_msk
guid: a572ad85-f431-4ed1-a1f3-cba9e1d4712f
has_logo: true
integration_id: amazon-kafka
integration_title: "Amazon\_MSK (Agent)"
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: aws.msk.
metric_to_check: aws.msk.go.threads
name: amazon_msk
public_title: "Amazon\_MSK (Agent)"
short_description: "Surveillez les performances et la santé de vos clusters Amazon\_MSK."
support: core
supported_os:
  - linux
  - mac_os
  - windows
version: '1.0'
---
## Présentation

Ce check permet de surveiller Amazon Managed Streaming for Apache Kafka ([Amazon MSK][1]) avec l'Agent Datadog.

## Configuration

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][2] pour découvrir comment appliquer ces instructions à un environnement conteneurisé.

### Installation

1. [Créez une machine client][3] si ce n'est pas déjà fait.
2. Assurez-vous que la machine client [dispose][4] de la stratégie d'autorisation [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][5] ou que des [identifiants][6] équivalents sont disponibles.
3. Activez la [surveillance ouverte avec Prometheus][7] côté MSK pour activer JmxExporter et NodeExporter.
4. Installez l'[Agent Datadog][8].

### Configuration


1. Modifiez le fichier `amazon_msk.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Amazon MSK. Consultez le [fichier d'exemple amazon_msk.d/conf.yaml][9] pour découvrir toutes les options de configuration disponibles.

    **Remarque** : si vous réutilisez le fichier d'exemple, remplacez son nom `conf.yaml.example` par `conf.yaml`.

2. [Redémarrez l'Agent][10].

### Validation

[Lancez la sous-commande status de l'Agent][11] et cherchez `amazon_msk` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_msk" >}}


### Checks de service

**aws.msk.can_connect** :<br>
Renvoie `CRITICAL` si l'Agent ne parvient pas à détecter les nœuds du cluster MSK. Si ce n'est pas le cas, renvoie `OK`.

**aws.msk.prometheus.health** :<br>
Renvoie `CRITICAL` si le check ne parvient pas à se connecter à l'endpoint de métriques. Si ce n'est pas le cas, renvoie `OK`.

Lorsque vous définissez `use_openmetrics` sur `true` pour mettre en œuvre l'Agent v7+ :

**aws.msk.openmetrics.health** :<br>
Renvoie `CRITICAL` si l'Agent n'est pas capable de se connecter à l'endpoint OpenMetrics. Si ce n'est pas le cas, renvoie `OK`.

### Événements

Le check Amazon MSK n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][13].

[1]: https://aws.amazon.com/msk
[2]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[3]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[4]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[5]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[6]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[7]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[8]: https://docs.datadoghq.com/fr/agent/
[9]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[10]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[11]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[12]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[13]: https://docs.datadoghq.com/fr/help/