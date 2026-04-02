---
title: Instrumenting Envoy
code_lang: envoy
type: multi-code-lang
code_lang_weight: 20
further_reading:
- link: "/tracing/glossary/"
  tag: "Documentation"
  text: "Explore your services, resources and traces"
- link: "https://www.envoyproxy.io/"
  tag: "External Site"
  text: "Envoy website"
- link: "https://www.envoyproxy.io/docs/envoy/latest/api-v3/config/trace/v3/datadog.proto"
  text: "Datadog Tracer Configuration for Envoy"
- link: "https://www.envoyproxy.io/docs/envoy/latest/"
  tag: "External Site"
  text: "Envoy documentation"
aliases:
- /tracing/proxies/envoy
- /tracing/envoy/
- /tracing/setup/envoy/
- /tracing/setup_overview/envoy/
- /tracing/setup_overview/proxy_setup/
---

Datadog APM is included in Envoy v1.9.0 and newer.

## Enabling Datadog APM

**Note**: The example configuration below is for Envoy v1.19.

The following settings are required to enable Datadog APM in Envoy:

- a cluster for submitting traces to the Datadog Agent
- `http_connection_manager` configuration to activate tracing

1. Add a cluster for submitting traces to the Datadog Agent:

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

   Change the `address` value if Envoy is running in a container or orchestrated environment.

2. Include the following additional configuration in the `http_connection_manager` sections to enable tracing:

{{< highlight yaml "hl_lines=9-15" >}}
    - name: envoy.filters.network.http_connection_manager
      typed_config:
        "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
        generate_request_id: true
        request_id_extension:
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
            use_request_id_for_trace_sampling: false
        tracing:
          provider:
            name: envoy.tracers.datadog
            typed_config:
              "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
              collector_cluster: datadog_agent
              service_name: envoy-v1.19
{{< /highlight >}}

   The `collector_cluster` value must match the name provided for the Datadog Agent cluster. The `service_name` can be changed to a meaningful value for your usage of Envoy.

With this configuration, HTTP requests to Envoy initiate and propagate Datadog traces, and appear in the APM UI.

## Example Envoy v1.19 configuration

The following example configuration demonstrates the placement of items required to enable tracing using Datadog APM.

{{< highlight yaml "hl_lines=18-24 66-78" >}}
static_resources:
  listeners:
  - address:
      socket_address:
        address: 0.0.0.0
        port_value: 80
    traffic_direction: OUTBOUND
    filter_chains:
    - filters:
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          generate_request_id: true
          request_id_extension:
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
              use_request_id_for_trace_sampling: false
          tracing:
            provider:
              name: envoy.tracers.datadog
              typed_config:
                "@type": type.googleapis.com/envoy.config.trace.v3.DatadogConfig
                collector_cluster: datadog_agent   # matched against the named cluster
                service_name: envoy-v1.19          # user-defined service name
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
          # Traces for healthcheck requests should not be sampled.
          http_filters:
          - name: envoy.filters.http.health_check
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.filters.http.health_check.v3.HealthCheck
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
    load_assignment:
      cluster_name: service1
      endpoints:
      - lb_endpoints:
        - endpoint:
            address:
              socket_address:
                address: service1
                port_value: 80
  # Configure this cluster with the address of the datadog Agent
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

admin:
  access_log_path: "/dev/null"
  address:
    socket_address:
      address: 0.0.0.0
      port_value: 8001
{{< /highlight >}}

## Excluding metrics

If you are using Envoy's `dog_statsd` configuration to report metrics, you can _exclude_ activity from the `datadog_agent` cluster with this additional configuration.

```yaml
stats_config:
  stats_matcher:
    exclusion_list:
      patterns:
      - prefix: "cluster.datadog_agent."
```

## Envoy Sampling

To control the volume of Envoy traces that are sent to Datadog, specify a sampling rate by setting the parameter `DD_TRACE_SAMPLING_RULES` to a value between `0.0` (0%) and `1.0` (100%). If no value is specified, 100% of traces starting from Envoy are sent.

To use the [Datadog Agent calculated sampling rates][1] (10 traces per second per Agent) and ignore the default sampling rule set to 100%, set the parameter `DD_TRACE_SAMPLING_RULES` to an empty array:

```
DD_TRACE_SAMPLING_RULES=[]
```

You can also define an explicit sampling rate between `0.0` (0%) and `1.0` (100%) by service. For example, to set the sample rate to 10% for service `envoy-proxy`:

```
DD_TRACE_SAMPLING_RULES=[{"service": "envoy-proxy","sample_rate": 0.1}]
```


To configure your sampling rate with `DD_TRACE_SAMPLING_RULES`, use one of the following methods , depending on how you run Envoy:

- **By shell script**: Set the environment variable immediately before executing `envoy` in the script:

  ```
  #!/bin/sh
  export DD_TRACE_SAMPLING_RULES=[]
  envoy -c envoy-config.yaml
  ```

- **In a Docker Compose setup**: Set the environment variable in the `environment` section of the service definition:

  ```
  services:
    envoy:
      image: envoyproxy/envoy:v1.19-latest
      entrypoint: []
      command:
          - envoy
          - -c
          - /etc/envoy/envoy.yaml
      volumes:
          - './envoy.yaml:/etc/envoy/envoy.yaml:ro'
      environment:
          - DD_TRACE_SAMPLING_RULES=[]
  ```

- **As a container inside a Kubernetes pod**: specify the environment variable in the `env` section of the corresponding `containers` entry of the pod's spec:

  ```
  apiVersion: v1
  kind: Pod
  metadata:
    name: envoy
  spec:
    containers:
    - name: envoy
      image: envoyproxy/envoy:v1.20-latest
      env:
      - name: DD_TRACE_SAMPLING_RULES
        value: "[]"
  ```

## Environment variables

<div class="alert alert-danger">
  <strong>Note:</strong> The variables <code>DD_AGENT_HOST</code>, <code>DD_TRACE_AGENT_PORT</code> and <code>DD_TRACE_AGENT_URL</code> do not apply to Envoy, as the address of the Datadog Agent is configured using the <code>cluster</code> settings.
</div>

The available [environment variables][2] depend on the version of the C++ tracer embedded in Envoy.
The version of the C++ tracer can be found in the logs, indicated by the line starting with "DATADOG TRACER CONFIGURATION".

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[2]: /tracing/setup/cpp/#environment-variables
