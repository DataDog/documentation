---
app_id: amazon-kafka
app_uuid: e6dc171a-911d-4440-a409-7951eaadf69f
assets:
  dashboards:
    Amazon MSK Overview: assets/dashboards/overview.json
  integration:
    configuration:
      spec: assets/configuration/spec.yaml
    events:
      creates_events: false
    metrics:
      check: aws.msk.go.threads
      metadata_path: metadata.csv
      prefix: aws.msk.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: Amazon Kafka
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- aws
- messaging
- processing
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/amazon_msk/README.md
display_on_public_website: true
draft: false
git_integration_title: amazon_kafka
integration_id: amazon-kafka
integration_title: Amazon MSK (Agent)
integration_version: 3.2.3
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: amazon_kafka
public_title: Amazon MSK (Agent)
short_description: Surveillez les performances et la santé de vos clusters Amazon MSK.
supported_os:
- linux
- macos
- windows
tile:
  changelog: CHANGELOG.md
  classifier_tags:
  - Supported OS::Linux
  - Supported OS::macOS
  - Supported OS::Windows
  - Category::AWS
  - Category::Messaging
  - Category::Processing
  configuration: README.md#Setup
  description: Surveillez les performances et la santé de vos clusters Amazon MSK.
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: Amazon MSK (Agent)
---



## Présentation

Amazon Managed Streaming for Apache Kafka (MSK) est un service entièrement géré qui vous permet de créer et d'exécuter facilement des applications qui utilisent Apache Kafka pour traiter les données en streaming.

Vous pouvez recueillir des métriques à partir de cette intégration de deux façons : avec l'[Agent Datadog](#configuration) ou avec un [crawler][1] qui récupère les métriques à partir de CloudWatch. 

## Configuration

Le check de l'Agent permet de surveiller Amazon Managed Streaming for Apache Kafka ([Amazon MSK][2]) avec l'Agent Datadog.

Suivez les instructions ci-dessous pour installer et configurer ce check lorsque l'Agent est exécuté sur un host. Consultez la [documentation relative aux modèles d'intégration Autodiscovery][3] pour découvrir comment appliquer ces instructions à des environnements conteneurisés.

### Configurer l'Agent Datadog pour l'APM

1. [Créez une machine client][4] si ce n'est pas déjà fait.
2. Assurez-vous que la machine client [dispose][5] de la stratégie d'autorisation [arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess][6] ou que des [identifiants][7] équivalents sont disponibles.
3. Activez la [surveillance ouverte avec Prometheus][8] côté MSK pour activer JmxExporter et NodeExporter.
4. Installez l'[Agent Datadog][9] sur la machine client que vous venez de créer.

### Configuration

1. Modifiez le fichier `amazon_msk.d/conf.yaml` dans le dossier `conf.d/` à la racine du répertoire de configuration de votre Agent pour commencer à recueillir vos données de performance Amazon MSK.

   Incluez des [tags][10] personnalisés qui sont ajoutés à toutes les métriques et tous les checks de service fournis par cette intégration.

   ```
   tags:
     - <KEY_1>:<VALUE_1>
     - <KEY_2>:<VALUE_2>
   ```

   Consultez le [fichier d'exemple amazon_msk.d/conf.yaml][11] pour découvrir toutes les options de configuration disponibles.

   **Remarque** : il s'agit de l'exemple de check OpenMetrics par défaut. Si vous avez déjà implémenté cette intégration, consultez l'[exemple pour l'ancienne version][12].

2. [Redémarrez l'Agent][13].

### Validation

[Lancez la sous-commande status de l'Agent][14] et cherchez `amazon_msk` dans la section Checks.

## Données collectées

### Métriques
{{< get-metrics-from-git "amazon_kafka" >}}


### Events

Le check Amazon MSK n'inclut aucun événement.

### Service Checks

Consultez le fichier [service_checks.json][16] pour parcourir la liste des checks de service fournis par cette intégration.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][17].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

- [Surveiller Amazon Managed Streaming for Apache Kafka avec Datadog][18]

[1]: https://docs.datadoghq.com/fr/integrations/amazon_msk
[2]: https://aws.amazon.com/msk
[3]: https://docs.datadoghq.com/fr/agent/kubernetes/integrations/
[4]: https://docs.aws.amazon.com/msk/latest/developerguide/create-client-machine.html
[5]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#attach-iam-role
[6]: https://console.aws.amazon.com/iam/home?#/policies/arn:aws:iam::aws:policy/AmazonMSKReadOnlyAccess
[7]: https://boto3.amazonaws.com/v1/documentation/api/latest/guide/configuration.html#configuring-credentials
[8]: https://docs.aws.amazon.com/msk/latest/developerguide/open-monitoring.html
[9]: https://docs.datadoghq.com/fr/agent/
[10]: https://docs.datadoghq.com/fr/getting_started/tagging/
[11]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[12]: https://github.com/DataDog/integrations-core/blob/7.31.x/amazon_msk/datadog_checks/amazon_msk/data/conf.yaml.example
[13]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[14]: https://docs.datadoghq.com/fr/agent/guide/agent-commands/#agent-status-and-information
[15]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/metadata.csv
[16]: https://github.com/DataDog/integrations-core/blob/master/amazon_msk/assets/service_checks.json
[17]: https://docs.datadoghq.com/fr/help/
[18]: https://www.datadoghq.com/blog/monitor-amazon-msk/