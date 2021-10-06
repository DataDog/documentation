---
assets:
  dashboards:
    JMeter Overview: assets/dashboards/JMeterOverview.json
  logs:
    source: jmeter
  metrics_metadata: metadata.csv
  monitors: {}
  saved_views: {}
  service_checks: assets/service_checks.json
categories:
  - log collection
  - testing
creates_events: false
ddtype: check
dependencies:
  - https://github.com/DataDog/integrations-core/blob/master/jmeter/README.md
display_name: JMeter
draft: false
git_integration_title: jmeter
guid: 73e25799-9bc1-413b-a5f3-989a7c5bd554
integration_id: jmeter
integration_title: JMeter
is_public: true
kind: integration
maintainer: help@datadoghq.com
manifest_version: 1.0.0
metric_prefix: jmeter.
metric_to_check: jmeter.responses_count
name: jmeter
public_title: JMeter
short_description: "Plug-in Datadog pour Apache\_JMeter"
support: core
supported_os:
  - linux
  - mac_os
  - windows
---
## Présentation

Le service d'écoute backend Datadog pour Apache JMeter est un plug-in JMeter open source qui permet d'envoyer des résultats de test à la plate-forme Datadog. Il fournit des rapports en temps réel sur des métriques de test relatives à la latence, au nombre d'octets envoyés et reçus, etc. Vous pouvez également envoyer à Datadog des résultats de test complets en tant qu'entrées de log.

## Configuration

### Installation

Ce plug-in doit être installé manuellement. Vous trouverez la dernière version, ainsi que des instructions d'installation détaillées, sur cette [page du référentiel][1].

### Configuration

Le plug-in présente les options de configuration suivantes :

| Nom       | Obligatoire | Valeur par défaut | description|
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