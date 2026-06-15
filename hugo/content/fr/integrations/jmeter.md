---
app_id: jmeter
app_uuid: be62a333-998e-4fea-b0e4-dd4a45b859b4
assets:
  dashboards:
    JMeter Overview: assets/dashboards/JMeterOverview.json
  integration:
    configuration: {}
    events:
      creates_events: false
    metrics:
      check: jmeter.responses_count
      metadata_path: metadata.csv
      prefix: jmeter.
    service_checks:
      metadata_path: assets/service_checks.json
    source_type_name: JMeter
  logs:
    source: jmeter
author:
  homepage: https://www.datadoghq.com
  name: Datadog
  sales_email: info@datadoghq.com
  support_email: help@datadoghq.com
categories:
- log collection
- testing
dependencies:
- https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md
display_on_public_website: true
draft: false
git_integration_title: jmeter
integration_id: jmeter
integration_title: JMeter
integration_version: ''
is_public: true
custom_kind: integration
manifest_version: 2.0.0
name: jmeter
public_title: JMeter
short_description: Plug-in Datadog pour Apache JMeter
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
  - Category::Log Collection
  - Category::Testing
  configuration: README.md#Setup
  description: Plug-in Datadog pour Apache JMeter
  media: []
  overview: README.md#Overview
  support: README.md#Support
  title: JMeter
---



## Présentation

Le service d'écoute backend Datadog pour Apache JMeter est un plug-in JMeter open source qui permet d'envoyer des résultats de test à la plateforme Datadog. Il fournit des rapports en temps réel sur des métriques de test relatives à la latence, au nombre d'octets envoyés et reçus, etc. Vous pouvez également envoyer à Datadog des résultats de test complets en tant qu'entrées de log.

## Configuration

### Installation

Ce plug-in doit être installé manuellement. Vous trouverez la dernière version, ainsi que des instructions d'installation détaillées, sur cette [page du référentiel][1].

### Configuration

Le plug-in présente les options de configuration suivantes :

| Name       | Obligatoire | Valeur par défaut | description|
|------------|:--------:|---------------|------------|
|apiKey | true | S.O. | Votre clé d'API Datadog.|
|datadogUrl | false | https://api.datadoghq.com/api/ | Vous pouvez configurer un autre endpoint, par exemple https://api.datadoghq.eu/api/, si votre instance Datadog se trouve dans l'UE.|
|logIntakeUrl | false | https://http-intake.logs.datadoghq.com/v1/input/ | Vous pouvez configurer un autre endpoint, par exemple https://http-intake.logs.datadoghq.eu/v1/input/, si votre instance Datadog se trouve dans l'UE.|
|metricsMaxBatchSize|false|200|Les métriques sont envoyées toutes les 10 secondes par lots d'une taille correspondant à `metricsMaxBatchSize`.|
|logsBatchSize|false|500|Les logs sont envoyés par lots d'une taille correspondant à `logsBatchSize` dès que celle-ci est atteinte.|
|sendResultsAsLogs|false|false|Par défaut, seules les métriques sont transmises à Datadog. Pour envoyer des résultats de test individuels en tant qu'événements de log, définissez ce champ sur `true`.|
|includeSubresults|false|false|Un sous-résultat est généré, par exemple, lorsqu'une requête HTTP individuelle doit suivre des redirections. Par défaut, les sous-résultats sont ignorés.|
|samplersRegex|false|.*|Une expression régulière facultative permettant de filtrer les services d'échantillonnage à surveiller.|

## Données collectées

### Métriques
{{< get-metrics-from-git "jmeter" >}}


### Checks de service

JMeter n'inclut aucun check de service.

### Événements

JMeter n'inclut aucun événement.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][3].

## Pour aller plus loin

Documentation, liens et articles supplémentaires utiles :

  - [Surveiller des résultats de test JMeter avec Datadog][4]

[1]: https://github.com/DataDog/jmeter-datadog-backend-listener/releases
[2]: https://github.com/DataDog/integrations-core/blob/master/jmeter/metadata.csv
[3]: https://docs.datadoghq.com/fr/help/
[4]: https://www.datadoghq.com/blog/monitor-jmeter-test-results-datadog/