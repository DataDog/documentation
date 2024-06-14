---
title: Tracing a Proxy
kind: documentation
further_reading:
- link: "/tracing/glossary/"
  tag: "Use the APM UI"
  text: "Explore your services, resources and traces"
- link: "https://www.envoyproxy.io/"
  tag: "Documentation"
  text: "Envoy website"
- link: "https://www.envoyproxy.io/docs/envoy/latest/"
  tag: "Documentation"
  text: "Envoy documentation"
- link: "https://www.nginx.com/"
  tag: "Documentation"
  text: "NGINX website"
- link: "https://istio.io/"
  tag: "Documentation"
  text: "Istio website"
- link: "https://istio.io/docs/"
  tag: "Documentation"
  text: "Istio documentation"
- link: "https://docs.konghq.com/gateway/latest/"
  tag: "Documentation"
  text: "Kong website"
- link: "https://github.com/DataDog/dd-trace-cpp"
  tag: "Source Code"
  text: "Datadog C++ Client"
- link: "https://github.com/DataDog/kong-plugin-ddtrace/"
  tag: "Source Code"
  text: "Datadog APM Plugin for Kong"
- link: "https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/"
  tag: "Documentation"
  text: "OpenTelemetry for Ingress-NGINX Controller"
- link: "https://github.com/DataDog/httpd-datadog"
  tag: "Source Code"
  text: "Datadog Module for Apache HTTP Server"
aliases:
- /tracing/proxies/envoy
- /tracing/envoy/
- /tracing/proxies/nginx
- /tracing/nginx/
- /tracing/istio/
- /tracing/setup/envoy/
- /tracing/setup/nginx/
- /tracing/setup/istio/
- /tracing/proxies
- /tracing/setup_overview/envoy/
- /tracing/setup_overview/nginx/
- /tracing/setup_overview/istio/
- /tracing/setup_overview/httpd/
- /tracing/setup_overview/proxy_setup/
algolia:
  tags: ['proxies','tracing proxies','proxy']
---

You can set up tracing to include collecting trace information about proxies.

{{< tabs >}}
{{% tab "Envoy" %}}

Datadog APM is included in Envoy v1.9.0 and newer.

## Enabling Datadog APM

**Note**: The example configuration below is for Envoy v1.19.
Example configurations for other versions can be found [in the `dd-opentracing-cpp` GitHub repo][1].

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

   ```yaml
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
   ```
   The `collector_cluster` value must match the name provided for the Datadog Agent cluster. The `service_name` can be changed to a meaningful value for your usage of Envoy.

With this configuration, HTTP requests to Envoy initiate and propagate Datadog traces, and appear in the APM UI.

## Example Envoy v1.19 configuration

The following example configuration demonstrates the placement of items required to enable tracing using Datadog APM.

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
      - name: envoy.filters.network.http_connection_manager
        typed_config:
          "@type": type.googleapis.com/envoy.extensions.filters.network.http_connection_manager.v3.HttpConnectionManager
          generate_request_id: true
          request_id_extension:
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.request_id.uuid.v3.UuidRequestIdConfig
              use_request_id_for_trace_sampling: false
          tracing:
          # Use the datadog tracer
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
```

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

To use the [Datadog Agent calculated sampling rates][2] (10 traces per second per Agent) and ignore the default sampling rule set to 100%, set the parameter `DD_TRACE_SAMPLING_RULES` to an empty array:

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

The available [environment variables][3] depend on the version of the C++ tracer embedded in Envoy.

**Note**: The variables `DD_AGENT_HOST`, `DD_TRACE_AGENT_PORT` and `DD_TRACE_AGENT_URL` do not apply to Envoy, as the address of the Datadog Agent is configured using the `cluster` settings.

| Envoy Version | C++ Tracer Version |
|---------------|--------------------|
| v1.18.x - v1.26.0 | v1.2.1 |
| v1.15.x - v1.17.x | v1.1.5 |
| v1.14 | v1.1.3 |
| v1.12.x - v1.13.x | v1.1.1 |
| v1.10.x - v1.11.x | v0.4.2 |
| v1.9.x | v0.3.6 |

[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[3]: /tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "NGINX" %}}

Datadog APM supports NGINX in two configurations:
- NGINX operated as a proxy with tracing provided by the Datadog module.
- NGINX as an Ingress Controller for Kubernetes.

## NGINX with Datadog module
Datadog provides an NGINX module for distributed tracing.

### Module installation
There is one version of the Datadog NGINX module for each supported Docker
image. Install the module by downloading the appropriate file from the
[latest nginx-datadog GitHub release][1] and extracting it into NGINX's modules
directory.

For example, the module compatible with the Docker image
[nginx:1.23.2-alpine][3] is included in each release as the file
`nginx_1.23.2-alpine-amd64-ngx_http_datadog_module.so.tgz`. The module compatible with
the Docker image [amazonlinux:2.0.20230119.1][2] is included in each release as the file
`amazonlinux_2.0.20230119.1-amd64-ngx_http_datadog_module.so.tgz`.

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64)
      echo "arm64"
      ;;
    arm64)
      echo "arm64"
      ;;
    x86_64)
      echo "amd64"
      ;;
    amd64)
      echo "amd64"
      ;;
    *)
      echo ""
      ;;
  esac
}

ARCH=$(get_architecture)

if [ -z "$ARCH" ]; then
    echo 1>&2 "ERROR: Architecture $(uname -m) is not supported."
    exit 1
fi

BASE_IMAGE=nginx:1.23.2-alpine
BASE_IMAGE_WITHOUT_COLONS=$(echo "$BASE_IMAGE" | tr ':' '_')
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
tarball="$BASE_IMAGE_WITHOUT_COLONS-$ARCH-ngx_http_datadog_module.so.tgz"
wget "https://github.com/DataDog/nginx-datadog/releases/download/$RELEASE_TAG/$tarball"
tar -xzf "$tarball" -C /usr/lib/nginx/modules
rm "$tarball"
ls -l /usr/lib/nginx/modules/ngx_http_datadog_module.so
```

### NGINX configuration with Datadog module
In the topmost section of the NGINX configuration, load the Datadog module.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

The default configuration connects to a local Datadog Agent and produces traces
for all NGINX locations. Specify custom configuration using the dedicated
`datadog_*` directives described in the Datadog module's [API documentation][15].

For example, the following NGINX configuration sets the service name to
`usage-internal-nginx` and the sampling rate to 10%.

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog_service_name usage-internal-nginx;
  datadog_sample_rate 0.1;

  # servers, locations...
}
```

## Ingress-NGINX Controller for Kubernetes

### Controller v1.10.0+

<div class="alert alert-warning">
  <strong>Important Note:</strong> With the release of <b>v1.10.0</b>, the Ingress controller's OpenTracing and Datadog integration have been deprecated. As an alternative, the OpenTelemetry integration is recommended.<br><br>
  For older versions, see the <a href="#controller-v190-and-older">OpenTracing-based instructions</a>.
</div>

**1. Prepare the Datadog Agent:** Ensure that your Datadog Agent has [gRPC OTLP Ingestion enabled][18] to act as an OpenTelemetry Collector.

**2. Configure the Ingress controller:** To begin, verify that your Ingress controller's pod spec has the `HOST_IP` environment variable set. If not, add the following entry to the `env` block within the pod's specification:
```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

Next, enable OpenTelemetry instrumentation for the controller. Create or edit a ConfigMap with the following details:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otlp-collector-host: $HOST_IP
  # Defaults
  # otlp-collector-port: 4317
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
```

### Controller v1.9.0 and older
To enable Datadog tracing, create or edit a ConfigMap to set `enable-opentracing: "true"` and the `datadog-collector-host` to which traces should be sent.
The name of the ConfigMap is cited explicitly by the Ingress-NGINX Controller container's command line argument, defaulting to `--configmap=<POD_NAMESPACE>/nginx-configuration`.
If `ingress-nginx` was installed via Helm chart, the ConfigMap's name will follow the pattern `<RELEASE_NAME>-nginx-ingress-controller`.

The Ingress controller manages both the `nginx.conf` and `/etc/nginx/opentracing.json` files. Tracing is enabled for all `location` blocks.

```yaml
kind: ConfigMap
apiVersion: v1
metadata:
  name: nginx-configuration
  namespace: ingress-nginx
  labels:
    app.kubernetes.io/name: ingress-nginx
    app.kubernetes.io/part-of: ingress-nginx
data:
  enable-opentracing: "true"
  datadog-collector-host: $HOST_IP
  # Defaults
  # datadog-service-name: "nginx"
  # datadog-collector-port: "8126"
  # datadog-operation-name-override: "nginx.handle"
  # datadog-sample-rate: "1.0"
```

Additionally, ensure that your controller's pod spec has the `HOST_IP` environment variable set. Add this entry to the `env:` block that contains the environment variables `POD_NAME` and `POD_NAMESPACE`.

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
```

To set a different service name per Ingress using annotations:

```yaml
  nginx.ingress.kubernetes.io/configuration-snippet: |
      opentracing_tag "service.name" "custom-service-name";
```
The above overrides the default `nginx-ingress-controller.ingress-nginx` service name.

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[3]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[4]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[5]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[6]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[7]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[8]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[9]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog
[10]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[11]: https://github.com/DataDog/dd-opentracing-cpp/
[12]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/doc/sampling.md
[13]: https://github.com/kubernetes/ingress-nginx
[14]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#main-snippet
[15]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[16]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#datadog-sample-rate
[17]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/
[18]: /opentelemetry/otlp_ingest_in_the_agent/

{{% /tab %}}

{{% tab "Istio" %}}

Datadog monitors every aspect of your Istio environment, so you can:
- View individual distributed traces for applications transacting over the mesh with APM (see below).
- Assess the health of Envoy and the Istio control plane with [logs][1].
- Break down the performance of your service mesh with request, bandwidth, and resource consumption [metrics][1].
- Map network communication between containers, pods, and services over the mesh with [Network Performance Monitoring][2].

To learn more about monitoring your Istio environment with Datadog, [see the Istio blog][3].

Datadog APM is available for [supported Istio releases][13].

## Datadog Agent installation

1. [Install the Agent][4]
2. [Make sure APM is enabled for your Agent][5].
3. Uncomment the `hostPort` setting so that Istio sidecars can connect to the Agent and submit traces.


## Istio configuration and installation

To enable Datadog APM, a [custom Istio installation][6] is required to set two extra options when installing Istio.

- `--set values.global.proxy.tracer=datadog`
- `--set values.pilot.traceSampling=100.0`

```shell
istioctl manifest apply --set values.global.proxy.tracer=datadog --set values.pilot.traceSampling=100.0
```

Traces are generated when the namespace for the pod has sidecar injection enabled. This is done by adding
the `istio-injection=enabled` label.

```shell
kubectl label namespace example-ns istio-injection=enabled
```

Traces are generated when Istio is able to determine the traffic is using an HTTP-based protocol.
By default, Istio tries to automatically detect this. It can be manually configured by naming the ports in your
application's deployment and service. More information can be found in Istio's documentation for [Protocol Selection][7]

By default, the service name used when creating traces is generated from the deployment name and namespace. This can be
set manually by adding an `app` label to the deployment's pod template:

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

For [CronJobs][8], the `app` label should be added to the job template, as the generated name comes from the `Job` instead
of the higher-level `CronJob`.

## Istio Sampling

To control the volume of Istio traces that are sent to Datadog, configure a
sampling rule whose `"sample_rate"` is a value between `0.0` (0%) and `1.0`
(100%). Configure sampling rules with the `DD_TRACE_SAMPLING_RULES`
environment variable. If `DD_TRACE_SAMPLING_RULES` is not specified, then 100%
of Istio traces are sent to Datadog.

**Note**: These environment variables apply only to the subset of traces indicated by the `values.pilot.traceSampling` setting, hence the required `--set values.pilot.traceSampling=100.0` during Istio configuration.

To use the [Datadog Agent calculated sampling rates][9] (10 traces per second per Agent) and ignore the default sampling rule set to 100%, set the parameter `DD_TRACE_SAMPLING_RULES` to an empty array:

```bash
DD_TRACE_SAMPLING_RULES='[]'
```

Explicitly specifying an empty array of rules is different from not specifying rules.

To configure `DD_TRACE_SAMPLING_RULES`, in each deployment whose namespace is labeled `istio-injection=enabled`, set the environment variable as part of the `apm.datadoghq.com/env` annotation of the deployment spec template:
```
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{"DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1", "DD_TRACE_SAMPLING_RULES": "[]"}'
```
`apm.datadoghq.com/env` is a string whose content is a JSON object mapping
environment variable names to values. The environment variable values are
themselves strings, and in the case of `DD_TRACE_SAMPLING_RULES`, the string
value is a JSON array of objects.

## Environment variables

Environment variables for Istio sidecars can be set on a per-deployment basis using the `apm.datadoghq.com/env` annotation. This is unique for deployments employing Istio sidecars and is set in addition to the [labels for unified service tagging][10].
```yaml
apiVersion: apps/v1
...
kind: Deployment
...
spec:
  template:
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_SERVICE": "my-service", "DD_VERSION": "v1.1"}'
```

## Deployment and service

If the Agents on your cluster are running as a deployment and service instead of the default DaemonSet, then an additional option is required to specify the DNS address and port of the Agent.
For a service named `datadog-agent` in the `default` namespace, that address would be `datadog-agent.default.svc.cluster.local:8126`.

- `--set values.global.tracer.datadog.address=datadog-agent.default:8126`

If Mutual TLS is enabled for the cluster, then the Agent's deployment should disable sidecar injection, and you should add a traffic policy that disables TLS.

This annotation is added to the Agent's Deployment template.
```
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "false"
```

For Istio v1.4.x, the traffic policy can be configured using a DestinationRule. Istio v1.5.x and higher do not need an additional traffic policy.
```
apiVersion: networking.istio.io/v1alpha3
kind: DestinationRule
metadata:
  name: datadog-agent
  namespace: istio-system
spec:
  host: datadog-agent.default.svc.cluster.local
  trafficPolicy:
    tls:
      mode: DISABLE
```

Automatic Protocol Selection may determine that traffic between the sidecar and Agent is HTTP, and enable tracing.
This can be disabled using [manual protocol selection][12] for this specific service. The port name in the `datadog-agent` Service can be changed to `tcp-traceport`.
If using Kubernetes 1.18+, `appProtocol: tcp` can be added to the port specification.

[1]: /integrations/istio/
[2]: /network_monitoring/performance/setup/#istio
[3]: https://www.datadoghq.com/blog/istio-datadog/
[4]: /agent/kubernetes/
[5]: /agent/kubernetes/apm/
[6]: https://istio.io/docs/setup/install/istioctl/
[7]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[8]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[9]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[10]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#configuration-1
[11]: /tracing/setup/cpp/#environment-variables
[12]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
[13]: https://istio.io/latest/docs/releases/supported-releases/#support-status-of-istio-releases
{{% /tab %}}
{{% tab "Kong" %}}

Datadog APM is available for [Kong Gateway][1] using the [kong-plugin-ddtrace][2] plugin.

## Installation

The plugin is installed using `luarocks`.
```
luarocks install kong-plugin-ddtrace
```

Kong Gateway is not a bundled plugin, so it needs to be configured before it can be enabled.
To enable it, include `bundled` and `ddtrace` in the `KONG_PLUGINS` environment variable, or
set `plugins=bundled,ddtrace` in `/etc/kong/kong.conf`. Next, restart Kong Gateway to apply the change.

```
# Set the KONG_PLUGINS environment variable or edit /etc/kong/kong.conf to enable the ddtrace plugin
export KONG_PLUGINS=bundled,ddtrace
kong restart
```

## Configuration

The plugin can be enabled globally or on specific services in Kong Gateway.

```
# Enabled globally
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace'
# Enabled for specific service only
curl -i -X POST --url http://localhost:8001/services/example-service/plugins/ --data 'name=ddtrace'
```

Options are available for setting the service name, environment, and other features within the plugin.
The example below sets the service name to `mycorp-internal-api` in the `prod` environment.
```
curl -i -X POST --url http://localhost:8001/plugins/ --data 'name=ddtrace' --data 'config.service_name=mycorp-internal-api' --data 'config.environment=prod'
```

More configuration options can be found on the [kong-plugin-ddtrace][3] plugin documentation.


[1]: https://docs.konghq.com/gateway/latest/
[2]: https://github.com/DataDog/kong-plugin-ddtrace
[3]: https://github.com/DataDog/kong-plugin-ddtrace#configuration

{{% /tab %}}

{{% tab "Apache HTTP Server %}}

## HTTPd with Datadog module
Datadog provides a [module][1] for enhancing [Apache HTTP Server][2] and [IHS HTTP Server][3] capabilities with APM Tracing.

### Compatibility
Our module only support Apache HTTP Server `v2.4.x`.

Since IHS HTTP Server is essentially a wrapper of the Appache HTTP Server, our module can also be used with IHS without any modifications.

### Module installation
<div class="alert alert-warning">
  <strong>Note:</strong> Only Apache HTTP Server 2.4.x is supported.
</div>

The module is provided as a shared library for dynamical loading by HTTPd. Each supported platform
and architecture has its own artifact hosted on [httpd-datadog's repository][1].

Run the following script to download the latest version of the module:

```bash
curl -s https://api.github.com/repos/DataDog/httpd-datadog/releases/latest \
| grep "linux-x86_64-mod_datadog.tar.gz" \
| cut -d : -f 2,3 \
| tr -d \" \
| wget -qi -
```

When unpacking the tarball, the resulting file is `mod_datadog.so`, the shared library that must
be loaded by the server.

Place it in the directory where HTTPd searches for modules, typically `/usr/local/apache2/modules`.

Load the module by adding the following line in the configuration file:

```nginx
LoadModule datadog_module modules/mod_datadog.so
```

To enable the module, make sure to restart or reload HTTPd.

### Module configuration
By default, all requests are traced and sent to the Datadog Agent.
To change the module default behaviour, use `Datadog*` directives described in the Datadog module's [API documentation][3].

For example, the following configuration sets the service name to `my-service` and the sampling rate to 10%

```nginx
LoadModule datadog_module modules/mod_datadog.so

DatadogServiceName my-app
DatadogSamplingRate 0.1
```

[1]: https://github.com/DataDog/httpd-datadog
[2]: https://httpd.apache.org/
[3]: https://github.com/DataDog/httpd-datadog/blob/main/doc/configuration.md
{{% /tab %}}

{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
