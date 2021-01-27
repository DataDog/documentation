---
title: Tracing a Proxy
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
- link: "https://www.nginx.com/"
  tag: "Documentation"
  text: "NGINX website"
- link: "https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentracing/"
  tag: "Documentation"
  text: "NGINX Ingress Controller OpenTracing"
- link: "https://github.com/opentracing-contrib/nginx-opentracing"
  tag: "Source Code"
  text: "NGINX plugin for OpenTracing"
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
---

You can set up tracing to include collecting trace information about proxies.

{{< tabs >}}
{{% tab "Envoy" %}}

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




[1]: https://github.com/DataDog/dd-opentracing-cpp/tree/master/examples/envoy-tracing
[2]: /tracing/setup/cpp/#environment-variables
{{% /tab %}}
{{% tab "NGINX" %}}

Support for Datadog APM is available for NGINX using a combination of plugins and configurations.
The instructions below use NGINX from the official [Linux repositories][1] and pre-built binaries for the plugins.

## NGINX Open Source

### Plugin Installation

**Note**: this plugin does not work on Linux distributions that use older versions of `libstdc++`. This includes RHEL/Centos 7 and AmazonLinux 1.
A workaround for this is to run NGINX from a Docker container. An example Dockerfile is available [here][2].

The following plugins must be installed:

- NGINX plugin for OpenTracing - [linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz][3] - installed in `/usr/lib/nginx/modules`
- Datadog OpenTracing C++ Plugin - [linux-amd64-libdd_opentracing_plugin.so.gz][4] - installed somewhere accessible to NGINX, eg `/usr/local/lib`

Commands to download and install these modules:

```bash
# Gets the latest release version number from Github.
get_latest_release() {
  wget -qO- "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"([^"]+)".*/\1/';
}
NGINX_VERSION=1.17.3
OPENTRACING_NGINX_VERSION="$(get_latest_release opentracing-contrib/nginx-opentracing)"
DD_OPENTRACING_CPP_VERSION="$(get_latest_release DataDog/dd-opentracing-cpp)"
# Install NGINX plugin for OpenTracing
wget https://github.com/opentracing-contrib/nginx-opentracing/releases/download/${OPENTRACING_NGINX_VERSION}/linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz
tar zxf linux-amd64-nginx-${NGINX_VERSION}-ngx_http_module.so.tgz -C /usr/lib/nginx/modules
# Install Datadog Opentracing C++ Plugin
wget https://github.com/DataDog/dd-opentracing-cpp/releases/download/${DD_OPENTRACING_CPP_VERSION}/linux-amd64-libdd_opentracing_plugin.so.gz
gunzip linux-amd64-libdd_opentracing_plugin.so.gz -c > /usr/local/lib/libdd_opentracing_plugin.so
```

### NGINX Configuration

The NGINX configuration must load the OpenTracing module.

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

The `service` value can be modified to a meaningful value for your usage of NGINX.
The `agent_host` value may need to be changed if NGINX is running in a container or orchestrated environment.

Complete examples:

* [nginx.conf][5]
* [dd-config.json][6]

After completing this configuration, HTTP requests to NGINX will initiate and propagate Datadog traces, and will appear in the APM UI.

#### NGINX and FastCGI

When the location is serving a FastCGI backend instead of HTTP, the `location` block should use `opentracing_fastcgi_propagate_context` instead of `opentracing_propagate_context`.

## NGINX Ingress Controller for Kubernetes

The [Kubernetes ingress-nginx][7] controller versions 0.23.0+ include the NGINX plugin for OpenTracing.

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



[1]: http://nginx.org/en/linux_packages.html#stable
[2]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/Dockerfile
[3]: https://github.com/opentracing-contrib/nginx-opentracing/releases/latest
[4]: https://github.com/DataDog/dd-opentracing-cpp/releases/latest
[5]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/nginx.conf
[6]: https://github.com/DataDog/dd-opentracing-cpp/blob/master/examples/nginx-tracing/dd-config.json
[7]: https://github.com/kubernetes/ingress-nginx
{{% /tab %}}
{{% tab "Istio" %}}

Datadog monitors every aspect of your Istio setup, including:

- Application distributed traces (see below)
- [Metrics and logs][1] (using the Istio Agent Check)
- [Container and pod-level flow data][2] (using Network Performance Monitoring)

## Configuration

Datadog APM is available for Istio v1.1.3+ on Kubernetes clusters. 

### Datadog Agent Installation

1. [Install the Agent][3]
2. [Make sure APM is enabled for your Agent][4].
3. Uncomment the `hostPort` setting so that Istio sidecars can connect to the Agent and submit traces.


### Istio Configuration and Installation

To enable Datadog APM, a [custom Istio installation][5] is required to set two extra options when installing Istio.

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
application's deployment and service. More information can be found in Istio's documentation for [Protocol Selection][6]

By default, the service name used when creating traces is generated from the deployment name and namespace. This can be
set manually by adding an `app` label to the deployment's pod template:

```yaml
template:
  metadata:
    labels:
      app: <SERVICE_NAME>
```

For [CronJobs][7], the `app` label should be added to the job template, as the generated name comes from the `Job` instead
of the higher-level `CronJob`.

### Environment Variables

Environment variables for Istio sidecars can be set on a per-deployment basis using the `apm.datadoghq.com/env` annotation.
```yaml
    metadata:
      annotations:
        apm.datadoghq.com/env: '{ "DD_ENV": "prod", "DD_TRACE_ANALYTICS_ENABLED": "true" }'
```

The available [environment variables][8] depend on the version of the C++ tracer embedded in the Istio sidecar's proxy.

| Istio Version | C++ Tracer Version |
|---------------|--------------------|
| v1.7.x | v1.1.5 |
| v1.6.x | v1.1.3 |
| v1.5.x | v1.1.1 |
| v1.4.x | v1.1.1 |
| v1.3.x | v1.1.1 |
| v1.2.x | v0.4.2 |
| v1.1.3 | v0.4.2 |


### Running Agent as Deployment and Service

If the Agents on your cluster are running as a Deployment and Service instead of the default DaemonSet, then an additional option is required to specify the DNS address and port of the Agent.
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
This can be disabled using [manual protocol selection][9] for this specific service. The port name in the `datadog-agent` Service can be changed to `tcp-traceport`.
If using Kubernetes 1.18+, `appProtocol: tcp` can be added to the port specification.




[1]: /integrations/istio/
[2]: https://www.datadoghq.com/blog/monitor-istio-with-npm/
[3]: /agent/kubernetes/
[4]: /agent/kubernetes/apm/
[5]: https://istio.io/docs/setup/install/istioctl/
[6]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/
[7]: https://kubernetes.io/docs/concepts/workloads/controllers/cron-jobs/
[8]: /tracing/setup/cpp/#environment-variables
[9]: https://istio.io/docs/ops/configuration/traffic-management/protocol-selection/#manual-protocol-selection
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

