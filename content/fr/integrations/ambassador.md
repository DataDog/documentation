---
assets:
  dashboards: {}
  metrics_metadata: metadata.csv
  monitors: {}
  service_checks: assets/service_checks.json
categories:
- Cloud
- orchestration
- containers
creates_events: false
ddtype: check
dependencies:
- https://github.com/DataDog/integrations-extras/blob/master/ambassador/README.md
display_name: Ambassador
draft: false
git_integration_title: ambassador
guid: 71936a65-1a8c-4f6e-a18e-f71d4236182b
integration_id: ambassador
integration_title: Ambassador API Gateway
integration_version: ''
is_public: true
custom_kind: integration
maintainer: hello@datawire.io
manifest_version: 1.0.0
metric_prefix: envoy.
metric_to_check: envoy.listener.downstream_cx_total
name: ambassador
public_title: Intégration Datadog/Ambassador API Gateway
short_description: Ambassador est une solution open source de passerelle API intégrée
  nativement à Kubernetes et conçue sur le proxy Envoy.
support: contrib
supported_os:
- linux
- mac_os
- windows
---



## Présentation

Recueillez des métriques d'[Ambassador][1] en temps réel pour :

- Visualiser les performances de vos microservices

- Comprendre l'impact des nouvelles versions de vos services lorsque vous utilisez Ambassador pour réaliser un déploiement Canary

![snapshot][2]

## Configuration

Activez DogStatsD via le DaemonSet de votre Agent et définissez la variable d'environnement suivante sur votre pod Ambassador :

```
name: STATSD_HOST
valueFrom:
  fieldRef:    
    fieldPath: status.hostIP
```

Avec cette configuration, les métriques StatsD sont envoyées à l'IP du host, qui redirige le trafic vers le port 8125 de l'Agent.

Consultez la section [Statistiques Envoy avec StatsD][3] (en anglais) pour en savoir plus.

Vous pouvez également envoyer des données de tracing depuis Ambassador vers l'APM Datadog. Consultez la section [Tracing distribué avec Datadog][4] (en anglais) pour en savoir plus.

## Données collectées

### Métriques
{{< get-metrics-from-git "ambassador" >}}


### Événements

Le check Ambassador n'inclut aucun événement.

### Checks de service

Le check Ambassador n'inclut aucun check de service.

## Dépannage

Besoin d'aide ? Contactez [l'assistance Datadog][6].

[1]: https://www.getambassador.io
[2]: https://raw.githubusercontent.com/DataDog/integrations-extras/master/ambassador/images/upstream-req-time.png
[3]: https://www.getambassador.io/docs/edge-stack/latest/topics/running/statistics/envoy-statsd/
[4]: https://www.getambassador.io/docs/latest/howtos/tracing-datadog/
[5]: https://github.com/DataDog/integrations-extras/blob/master/ambassador/metadata.csv
[6]: https://docs.datadoghq.com/fr/help/