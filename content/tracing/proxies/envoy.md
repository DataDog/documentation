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
  text: Datadog OpenTracing C++ Client
---

Support for Datadog APM has been included in Envoy.
It is available in the `envoyproxy/envoy:latest` docker container, and is included in the upcoming 1.9.0 release.

## Enabling Datadog APM

Three settings are required to enable Datadog APM in Envoy.

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
The address value may need to be changed if envoy is running in a container or orchestrated environment.

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
	  generate_request_id: true
          tracing:
            operation_name: egress
```

After completing this configuration, HTTP requests to Envoy will initiate and propagate Datadog traces, and will appear in the APM UI.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
