---
title: Envoy
kind: Documentation
further_reading:
- link: "tracing/visualization/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
- link: "https://www.envoyproxy.io/"
  tag: "Documentation"
  text: "Envoy website"
- link: "https://www.envoyproxy.io/docs/envoy/latest/"
  tag: "Documentation"
  text: "Envoy documentation"
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Source Code"
  text: "Datadog OpenTracing C++ Client"
---

Support for Datadog APM has been included in Envoy.
It is available in the `envoyproxy/envoy:latest` docker container, and is included in the upcoming 1.9.0 release.

## Enabling Datadog APM

Three settings are required to enable Datadog APM in Envoy:

- a cluster for submitting traces to the Datadog Agent
- `tracing` configuration to enable the Datadog APM extension
- `http_connection_manager` configuration to activate tracing

A cluster for submitting traces to the Datadog Agent needs to be added.

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

The `address` value may need to be changed if Envoy is running in a container or orchestrated environment.

Envoy's tracing configuration needs to use the Datadog APM extension.

```yaml
tracing:
  http:
    name: envoy.tracers.datadog
    config:
      collector_cluster: datadog_agent
      service_name: envoy
```

The `collector_cluster` value must match the name provided for the Datadog Agent cluster.
The `service_name` can be changed to a meaningful value for your usage of Envoy.

Finally, the `http_connection_manager` sections need to include additional configuration to enable tracing.

```yaml
      - name: envoy.http_connection_manager
        config:
          tracing:
            operation_name: egress
```

After completing this configuration, HTTP requests to Envoy will initiate and propagate Datadog traces, and will appear in the APM UI.

## Example Envoy Configuration

An example configuration is provided here to demonstrate the placement of items required to enable tracing using Datadog APM.

```yaml
# Enables the datadog tracing extension
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
  # The cluster to communicate with the Datadog Agent
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
          # Enable tracing for this listener
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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
