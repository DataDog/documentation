---
title: Envoy
kind: documentation
further_reading:
  - link: /tracing/visualization/
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
  - /fr/tracing/envoy/
---
L'APM Datadog est inclus dans Envoy v1.9.0 et les versions ultérieures.

## Activer l'APM Datadog

**Remarque** : l'exemple de configuration ci-dessous s'applique à Envoy v1.14.
D'autres exemples de configuration pour des versions plus anciennes sont disponibles [ici][1]

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
    load_assignment:
      cluster_name: datadog_agent
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_value: 8126
```

Il est possible que vous soyez contraint de modifier la valeur du paramètre `address` si Envoy s'exécute dans un conteneur ou un environnement orchestré.

La configuration de tracing d'Envoy doit utiliser l'extension de l'APM Datadog.

```yaml
tracing:
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # comparé au nom du cluster
      service_name: envoy-example        # nom de service défini par l'utilisateur
```

La valeur `collector_cluster` doit correspondre au nom fourni pour le cluster de l'Agent Datadog.
Le `service_name` peut être remplacé par une valeur plus adaptée à votre utilisation d'Envoy.

Enfin, les sections `http_connection_manager` doivent inclure un bloc de configuration supplémentaire pour activer le tracing.

```yaml
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          tracing: {}
```

Une fois cette configuration terminée, les requêtes HTTP vers Envoy démarrent et propagent les traces Datadog, qui apparaissent alors dans l'interface de l'APM.

## Exemple de configuration Envoy (pour Envoy v1.14)

Un exemple de configuration est fourni ici pour montrer le placement des éléments requis pour activer le tracing avec l'APM Datadog.

```yaml
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    traffic_direction: OUTBOUND
    filter_chains:
    - filters:
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          generate_request_id: true
          tracing: {}
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
                  prefix: "/"
                route:
                  cluster: service1
          http_filters:
          # Les traces des requêtes de check de santé ne doivent pas être échantillonnées.
          - name: envoy.filters.http.health_check
            typed_config:
              "@type": type.googleapis.com/envoy.config.filter.http.health_check.v2.HealthCheck
              pass_through_mode: false
              headers:
                - exact_match: /healthcheck
                  name: :path
          - name: envoy.filters.http.router
            typed_config: {}
          use_remote_address: true
  clusters:
  - name: service1
    connect_timeout: 0.250s
    type: strict_dns
    lb_policy: round_robin
    http2_protocol_options: {}
    load_assignment:
      cluster_name: service1
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: service1
                port_value: 80
  # Configurer ce cluster avec l'adresse de l'Agent Datadog
  # pour l'envoi des traces.
  - name: datadog_agent
    connect_timeout: 1s
    type: strict_dns
    lb_policy: round_robin
    load_assignment:
      cluster_name: datadog_agent
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: localhost
                port_value: 8126

tracing:
  # Utiliser le traceur Datadog
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # comparé au nom du cluster
      service_name: envoy-example        # nom de service défini par l'utilisateur

admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

## Exclure des métriques

Si vous utilisez la configuration `dog_statsd` d'Envoy pour envoyer les métriques, vous pouvez _exclure_ l'activité du cluster `datadog_agent` avec ce bloc de configuration supplémentaire :

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## Variables d'environnement

Les [variables d'environnement][2] dépendent de la version du traceur C++ intégré à Envoy.

**Remarque** : les variables `DD_AGENT_HOST`, `DD_TRACE_AGENT_PORT` et `DD_TRACE_AGENT_URL` ne s'appliquent pas à Envoy, l'adresse de l'Agent Datadog étant configurée à l'aide des paramètres `cluster`.

| Version d'Envoy | Version du traceur C++ |
|---------------|--------------------|
| v1.14 | v1.1.3 |
| v1.13 | v1.1.1 |
| v1.12 | v1.1.1 |
| v1.11 | v0.4.2 |
| v1.10 | v0.4.2 |
| v1.9 | v0.3.6 |

## Pour aller plus loin

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /fr/tracing/setup/cpp/#environment-variables