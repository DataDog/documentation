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
  text: "Nginx website"
- link: "https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentracing/"
  tag: "Documentation"
  text: "Nginx Ingress Controller OpenTracing"
- link: "https://github.com/opentracing-contrib/nginx-opentracing"
  tag: "Source Code"
  text: "Nginx plugin for OpenTracing"
- link: "https://istio.io/"
  tag: "Documentation"
  text: "Istio website"
- link: "https://istio.io/docs/"
  tag: "Documentation"
  text: "Istio documentation"
- link: "https://github.com/DataDog/dd-opentracing-cpp"
  tag: "Source Code"
  text: "Datadog OpenTracing C++ Client"
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
- /tracing/setup_overview/proxy_setup/
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
| v1.19 | v1.2.1 |
| v1.18 | v1.2.1 |
| v1.17 | v1.1.5 |
| v1.16 | v1.1.5 |
| v1.15 | v1.1.5 |
| v1.14 | v1.1.3 |
| v1.13 | v1.1.1 |
| v1.12 | v1.1.1 |
| v1.11 | v0.4.2 |
| v1.10 | v0.4.2 |
| v1.9 | v0.3.6 |

[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[3]: /tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "Nginx" %}}

Datadog APM supports Nginx in multiple configurations:
- Nginx operated as a proxy with tracing provided by the new Datadog module.
- Nginx operated as a proxy with tracing provided by the OpenTracing module.
- Nginx as an Ingress Controller for Kubernetes.

## Nginx with Datadog module
Datadog provides an Nginx module for distributed tracing.

<div class="alert alert-warning">
Datadog Nginx module is in beta. Send feedback to
<a href="https://docs.datadoghq.com/help/">support</a>.
We'd love to hear about your experience with the new module.
</div>

### Module installation
There is one version of the Datadog Nginx module for each [Nginx Docker image
tag][12]. Install the module by downloading the appropriate file from the
[latest nginx-datadog GitHub release][13] and extracting it into Nginx's
modules directory.

For example, if Nginx version 1.23.1 is running on a Debian-based system, then
the appropriate Nginx image tag is [1.23.1][14]. The corresponding Alpine-based
image is tagged [1.23.1-alpine][15].

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}
NGINX_IMAGE_TAG=1.23.1
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
tarball="$NGINX_IMAGE_TAG-ngx_http_datadog_module.so.tgz"
wget "https://github.com/DataDog/nginx-datadog/releases/download/$RELEASE_TAG/$tarball"
tar -xzf "$tarball" -C /usr/lib/nginx/modules
rm "$tarball"
```

### Nginx configuration with Datadog module
In the topmost section of the Nginx configuration, load the Datadog module.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

The default configuration connects to a local Datadog Agent and produces traces
for all Nginx locations. Specify custom configuration in a `datadog` JSON block
within the `http` section of the nginx configuration.

For example, the following Nginx configuration sets the service name to
`usage-internal-nginx` and the sampling rate to 10%. 

```nginx
load_module modules/ngx_http_datadog_module.so;

http {
  datadog {
    "service": "usage-internal-nginx",
    "sample_rate": 0.1
  }
}
```

For information about fields supported by the `datadog` directive and about
other configuration directives supported by the module, see the [API
documentation][16].

## Nginx with OpenTracing module
The OpenTracing project provides an Nginx module for distributed tracing. The
module loads any OpenTracing-compatible plugin, such as the Datadog plugin.

### Plugin installation

**Note**: this plugin does not work on Linux distributions that use older versions of `libstdc++`. This includes RHEL/Centos 7 and AmazonLinux 1.
A workaround for this is to run Nginx from a Docker container. An example Dockerfile is available [here][2].

The following plugins must be installed:

- Nginx plugin for OpenTracing - [linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz][3] - installed in `/usr/lib/nginx/modules`
- Datadog OpenTracing C++ Plugin - [linux-amd64-libdd_opentracing_plugin.so.gz][4] - installed somewhere accessible to Nginx, for example `/usr/local/lib`

Commands to download and install these modules:

```bash
# Gets the latest release version tag from GitHub.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
NGINX_VERSION=1.17.3
OPENTRACING_NGINX_VERSION="$(get_latest_release opentracing-contrib/nginx-opentracing)"
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Install Nginx plugin for OpenTracing
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ot16-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
# Install Datadog Opentracing C++ Plugin
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

### Nginx configuration with OpenTracing module

The Nginx configuration must load the OpenTracing module.

```nginx
# Load OpenTracing module
load_module modules/ngx_http_opentracing_module.so;
```

The `http` block enables the OpenTracing module and loads the Datadog tracer:

```nginx
    opentracing on; # Enable OpenTracing
    opentracing_tag http_user_agent $http_user_agent; # Add a tag to each trace!
    opentracing_trace_locations off; # Emit only one span per request.

    # Load the Datadog tracing implementation, and the given config file.
    opentracing_load_tracer /usr/local/lib/libdd_opentracing_plugin.so /etc/nginx/dd-config.json;
```

The `log_format with_trace_id` block is for correlating logs and traces. See the [example Nginx config][5] file for the complete format. The `$opentracing_context_x_datadog_trace_id` value captures the trace ID, and `$opentracing_context_x_datadog_parent_id` captures the span ID.

The `location` block within the server where tracing is desired should add the following:

```nginx
            opentracing_operation_name "$request_method $uri";
            opentracing_propagate_context;
```

A config file for the Datadog tracing implementation is also required:

```json
{
  "environment": "prod",
  "service": "nginx",
  "operation_name_override": "nginx.handle",
  "agent_host": "localhost",
  "agent_port": 8126
}
```

The `service` value can be modified to a meaningful value for your usage of Nginx.
The `agent_host` value may need to be changed if Nginx is running in a container or orchestrated environment.

Complete examples:

* [nginx.conf][5]
* [dd-config.json][6]

After completing this configuration, HTTP requests to Nginx will initiate and propagate Datadog traces, and will appear in the APM UI.

## Nginx Sampling

To control the volume of Nginx traces that are sent to Datadog, specify a
sampling rate in the configuration JSON by setting the `sample_rate` property
to a value between `0.0` (0%) and `1.0` (100%).
- If you are using the Datadog module, the JSON configuration is in the
  [datadog][17] directive.
- If you are using the OpenTracing module, the JSON configuration is the file
  passed as an argument to `opentracing_load_tracer`
  (`/etc/nginx/dd-config.json` in the example above).

```json
{
  "environment": "prod",
  "service": "nginx",
  "agent_host": "localhost",
  "agent_port": 8126,
  "sample_rate": 0.2
}
```

If no sample rate is specified, the [Datadog Agent calculated sampling rates][7] (10 traces per second per Agent) are applied.

Set **by-service** sampling rates with the `sampling_rules` configuration parameter. Configure a rate limit by setting the parameter `sampling_limit_per_second` to a number of traces per second per service instance. If no `sampling_limit_per_second` value is set, a limit of 100 traces per second is applied.

For example, to send 50% of the traces for the service named `nginx`, up to `50` traces per second:

```json
{
  "environment": "prod",
  "service": "nginx",
  "agent_host": "localhost",
  "agent_port": 8126,
  "sampling_rules": [{"service":"nginx", "sample_rate":0.5}],
  "sampling_limit_per_second":50
}
```

Read more about sampling configuration options of the [dd-opentracing-cpp][8] library in the [respository documentation][9].

## Nginx Ingress Controller for Kubernetes

The [Kubernetes ingress-nginx][10] controller versions 0.23.0+ include the Nginx plugin for OpenTracing.

To enable this plugin, create or edit a ConfigMap to set `enable-opentracing: "true"` and the `datadog-collector-host` to which traces should be sent.
The name of the ConfigMap will be cited explicitly by the nginx-ingress controller container's command line argument, defaulting to `--configmap=$(POD_NAMESPACE)/nginx-configuration`.
If ingress-nginx was installed via helm chart, this ConfigMap will be named like `Release-Name-nginx-ingress-controller`.

The ingress controller manages both the `nginx.conf` and `/etc/nginx/opentracing.json` files. Tracing is enabled for all `location` blocks.

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
```

Additionally, ensure that your nginx-ingress controller's pod spec has the `HOST_IP` environment variable set. Add this entry to the `env:` block that contains the environment variables `POD_NAME` and `POD_NAMESPACE`.

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

### Ingress Controller Sampling
The Nginx Ingress Controller for Kubernetes uses [v1.2.1][11] of the Datadog
tracing library, `dd-opentracing-cpp`.

To control the volume of Ingress Controller traces that are sent to Datadog,
specify a sampling rule that matches all traces. The `sample_rate` configured
in the rule determines the proportion of traces that are sampled. If no
rules are specified, then sampling defaults to 100%.

Specify sampling rules by using the `DD_TRACE_SAMPLING_RULES` environment
variable. To define sampling rules in the Ingress Controller:

1. Instruct Nginx to forward the environment variable to its worker processes by adding the following [main-snippet][11] to the `data` section of the Ingress Controller's `ConfigMap`:
   ```yaml
   data:
     main-snippet: "env DD_TRACE_SAMPLING_RULES;"
   ```

2. Specify a value for the environment variable in the `env` section of the Ingress Controller's `Deployment`. For example, to keep 10% of traces originating from the Ingress Controller:
   ```yaml
   env:
   - name: DD_TRACE_SAMPLING_RULES
     value: '[{"sample_rate": 0.1}]'
   ```
   To use the [Datadog Agent calculated sampling rates][7] (10 traces per second per Agent by default), specify an empty array of sampling rules:
   ```yaml
   env:
   - name: DD_TRACE_SAMPLING_RULES
     value: '[]'
   ```

[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[3]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[6]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[7]: /tracing/trace_pipeline/ingestion_mechanisms/#in-the-agent
[8]: https://github.com/DataDog/dd-opentracing-cpp/
[9]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/doc/sampling.md
[10]: https://github.com/kubernetes/ingress-nginx
[11]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#main-snippet
[12]: https://hub.docker.com/_/nginx/tags
[13]: https://github.com/DataDog/nginx-datadog/releases/latest
[14]: https://hub.docker.com/layers/nginx/library/nginx/1.23.1/images/sha256-f26fbadb0acab4a21ecb4e337a326907e61fbec36c9a9b52e725669d99ed1261?context=explore
[15]: https://hub.docker.com/layers/nginx/library/nginx/1.23.1-alpine/images/sha256-2959a35e1b1e61e2419c01e0e457f75497e02d039360a658b66ff2d4caab19c4?context=explore
[16]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[17]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md#datadog
{{% /tab %}}
{{% tab "Istio" %}}

Datadog monitors every aspect of your Istio environment, so you can:
- View individual distributed traces for applications transacting over the mesh with APM (see below).
- Assess the health of Envoy and the Istio control plane with [logs][1].
- Break down the performance of your service mesh with request, bandwidth, and resource consumption [metrics][1].
- Map network communication between containers, pods, and services over the mesh with [Network Performance Monitoring][2].

To learn more about monitoring your Istio environment with Datadog, [see the Istio blog][3].

Datadog APM is available for Istio v1.1.3+ on Kubernetes clusters.

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

The available [environment variables][11] depend on the version of the C++ tracer embedded in the Istio sidecar's proxy.

| Istio Version | C++ Tracer Version |
|---------------|--------------------|
| v1.12.x | v1.2.1 |
| v1.11.x | v1.2.1 |
| v1.10.x | v1.2.1 |
| v1.9.x | v1.2.1 |
| v1.8.x | v1.1.5 |
| v1.7.x | v1.1.5 |
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


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
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
