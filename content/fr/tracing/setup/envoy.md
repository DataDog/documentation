---
title: Envoy
kind: documentation
further_reading:
  - link: tracing/visualization/
    tag: Utiliser l'UI de l'APM
    text: 'Explorer vos services, ressources et traces'
  - link: 'https://www.envoyproxy.io/'
    tag: Documentation
    text: Site Web Envoy
  - link: 'https://www.envoyproxy.io/docs/envoy/latest/'
    tag: Documentation
    text: Documentation Envoy
  - link: 'https://github.com/DataDog/dd-opentracing-cpp'
    tag: Code source
    text: Client Datadog OpenTracing C++
aliases:
  - /fr/tracing/proxies/envoy
---
L'APM Datadog est désormais pris en charge dans Envoy.
Il est disponible dans le conteneur docker `envoyproxy/envoy:latest` et inclus dans la [version 1.9.0][1].

## Activer l'APM Datadog

Trois paramètres sont requis pour activer l'APM Datadog dans Envoy :

- un cluster pour envoyer les traces à l'Agent Datadog
- la configuration `tracing` pour activer l'extension de l'APM Datadog
- la configuration `http_connection_manager` pour activer le tracing

Un cluster destiné à l'envoi des traces à l'Agent Datadog doit être ajouté.

```yaml
  clusters:
  ... existing cluster configs ...
  - name: datadog_agent
    connect_timeout: 1s
    type: strict_dns
    lb_policy: round_robin
    hosts:
    - socket_address:
        address: localhost
        port_value: 8126
```

Il est possible que la valeur `address` doive être changée si Envoy est exécuté dans un conteneur ou un environnement orchestré.

La configuration de tracing de Envoy doit utiliser l'extension de l'APM Datadog.

```yaml
tracing:
  http:
    name: envoy.tracers.datadog
    config:
      collector_cluster: datadog_agent
      service_name: envoy
```

La valeur `collector_cluster` doit correspondre au nom fourni pour le cluster de l'Agent Datadog.
Le `service_name` peut être remplacé par une valeur plus adaptée à votre utilisation de Envoy.

Enfin, les sections `http_connection_manager` doivent inclure un bloc de configuration supplémentaire pour activer le tracing.

```yaml
      - name: envoy.http_connection_manager
        config:
          tracing:
            operation_name: egress
```

Une fois cette configuration terminée, les requêtes HTTP vers Envoy démarrent et propagent les traces Datadog, qui apparaissent alors dans l'interface de l'APM.

## Exemple de configuration Envoy

Un exemple de configuration est fourni ici pour montrer le placement des éléments requis pour activer le tracing avec l'APM Datadog.

```yaml
# Active l'extension de tracing datadog
tracing:
  http:
    name: envoy.tracers.datadog
    config:
      collector_cluster: datadog_agent
      service_name: envoy

static_resources:
  clusters:
  - name: service1
    connect_timeout: 0.25s
    type: strict_dns
    lb_policy: round_robin
    http2_protocol_options: {}
    hosts:
    - socket_address:
        address: service1
        port_value: 80
  - name: service2
    connect_timeout: 0.25s
    type: strict_dns
    lb_policy: round_robin
    http2_protocol_options: {}
    hosts:
    - socket_address:
        address: service2
        port_value: 80
  # Le cluster pour communiquer avec l'Agent Datadog
  - name: datadog_agent
    connect_timeout: 1s
    type: strict_dns
    lb_policy: round_robin
    hosts:
    - socket_address:
        address: localhost
        port_value: 8126
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        config:
          # Active le tracing pour cet écouteur
          tracing:
            operation_name: egress
          codec_type: auto
          stat_prefix: ingress_http
          route_config:
            name: local_route
            virtual_hosts:
            - name: backend
              domains:
              - "*"
              routes:
              - match:
                  prefix: "/service/1"
                route:
                  cluster: service1
              - match:
                  prefix: "/service/2"
                route:
                  cluster: service2
          http_filters:
          - name: envoy.router
            config: {}
admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

**Remarque** : si vous utilisez la configuration `dog_statsd` de Envoy pour envoyer les métriques, vous pouvez _exclure_ l'activité du cluster `datadog_agent` avec ce bloc de configuration supplémentaire :

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/envoyproxy/envoy/releases/tag/v1.9.0