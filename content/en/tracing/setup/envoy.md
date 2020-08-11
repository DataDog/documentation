---
title: Envoy
kind: documentation
further_reading:
- link: "/tracing/visualization/"
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
aliases:
- /tracing/proxies/envoy
- /tracing/envoy/
---

Datadog APM is included in Envoy v1.9.0 and newer.

## Enabling Datadog APM

**Note**: The example configuration below is for Envoy v1.14.
Example configurations for older versions can be found [here][1]

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

The `address` value may need to be changed if Envoy is running in a container or orchestrated environment.

Envoy's tracing configuration needs to use the Datadog APM extension.

```yaml
tracing:
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # matched against the named cluster
      service_name: envoy-example        # user-defined service name
```

The `collector_cluster` value must match the name provided for the Datadog Agent cluster.
The `service_name` can be changed to a meaningful value for your usage of Envoy.

Finally, the `http_connection_manager` sections need to include additional configuration to enable tracing.

```yaml
      - name: envoy.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.config.filter.network.http_connection_manager.v2.HttpConnectionManager
          tracing: {}
```

After completing this configuration, HTTP requests to Envoy will initiate and propagate Datadog traces, and will appear in the APM UI.

## Example Envoy Configuration (for Envoy v1.14)

An example configuration is provided here to demonstrate the placement of items required to enable tracing using Datadog APM.

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
          # Traces for healthcheck requests should not be sampled.
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
  # Configure this cluster with the address of the datadog agent
  # for sending traces.
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
  # Use the datadog tracer
  http:
    name: envoy.tracers.datadog
    typed_config:
      "@type": type.googleapis.com/envoy.config.trace.v2.DatadogConfig
      collector_cluster: datadog_agent   # matched against the named cluster
      service_name: envoy-example        # user-defined service name

admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
```

## Excluding Metrics

If you are using Envoy's `dog_statsd` configuration to report metrics, you can _exclude_ activity from the `datadog_agent` cluster with this additional configuration.

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## Environment Variables

The available [environment variables][2] depend on the version of the C++ tracer embedded in Envoy.

**Note**: The variables `DD_AGENT_HOST`, `DD_TRACE_AGENT_PORT` and `DD_TRACE_AGENT_URL` do not apply to Envoy, as the address of the Datadog Agent is configured using the `cluster` settings.

| Envoy Version | C++ Tracer Version |
|---------------|--------------------|
| v1.14 | v1.1.3 |
| v1.13 | v1.1.1 |
| v1.12 | v1.1.1 |
| v1.11 | v0.4.2 |
| v1.10 | v0.4.2 |
| v1.9 | v0.3.6 |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /tracing/setup/cpp/#environment-variables
