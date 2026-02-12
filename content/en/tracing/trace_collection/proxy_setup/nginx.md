---
title: Instrumenting NGINX
code_lang: nginx
type: multi-code-lang
code_lang_weight: 50
further_reading:
- link: "https://www.nginx.com/"
  tag: "External Site"
  text: "NGINX website"
- link: "https://kubernetes.github.io/ingress-nginx/user-guide/third-party-addons/opentelemetry/"
  tag: "External Site"
  text: "OpenTelemetry for Ingress-NGINX Controller"
aliases:
- /tracing/proxies/nginx
- /tracing/nginx/
- /tracing/setup/nginx/
- /tracing/proxies
- /tracing/setup_overview/nginx/
- /tracing/setup_overview/proxy_setup/
---

Datadog APM supports NGINX in two configurations:
- NGINX operated as a proxy with tracing provided by the Datadog module.
- NGINX as an Ingress Controller for Kubernetes.

## NGINX with Datadog module
Datadog provides an NGINX module for distributed tracing.

### Module installation
To install the Datadog NGINX module, follow these instructions:
1. Download the appropriate version from the [latest nginx-datadog GitHub release][1]
2. Choose the tarball corresponding to the specific NGINX version and CPU architecture.

Each release includes two tarballs per combination of NGINX version and CPU architecture.
The main tarball contains a single file, `ngx_http_datadog_module.so`, which is the Datadog NGINX module. The second one is debug symbols, it is optional.

For simplicity, the following script downloads only the module for the latest release:

```bash
get_latest_release() {
  curl --silent "https://api.github.com/repos/$1/releases/latest" | jq --raw-output .tag_name
}

get_architecture() {
  case "$(uname -m)" in
    aarch64|arm64)
      echo "arm64"
      ;;
    x86_64|amd64)
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

NGINX_VERSION="1.29.0"
RELEASE_TAG=$(get_latest_release DataDog/nginx-datadog)
TARBALL="ngx_http_datadog_module-${ARCH}-${NGINX_VERSION}.so.tgz"

curl -Lo ${TARBALL} "https://github.com/DataDog/nginx-datadog/releases/download/${RELEASE_TAG}/${TARBALL}"
```

Extract the `ngx_http_datadog_module.so` file from the downloaded tarball using `tar` and place it in the NGINX modules directory, typically located at `/usr/lib/nginx/modules`.

### NGINX configuration with Datadog module
In the topmost section of the NGINX configuration, load the Datadog module.

```nginx
load_module modules/ngx_http_datadog_module.so;
```

The default configuration connects to a local Datadog Agent and produces traces
for all NGINX locations. Specify custom configuration using the dedicated
`datadog_*` directives described in the Datadog module's [API documentation][4].

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

Datadog offers support for monitoring the Ingress-NGINX controller in Kubernetes.
Choose from the following instrumentation methods based on your controller version and requirements:

- [v1.10.0+ using Datadog's features](#controller-v1100-using-datadogs-features).
- [v1.10.0+ using OpenTelemetry](#controller-v1100-using-opentelemetry).
- [v1.9.0 and older](#controller-v190-and-older).

### Controller v1.10.0+ using Datadog's features

This instrumentation method uses [nginx-datadog][6] and leverages Kubernetes [init-container][7] mechanism
to install the module within the Ingress-NGINX Controller instance.

To instrument Ingress-NGINX **v1.10.0+** using Datadog's module, follow these steps:

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Verify your Ingress-NGINX version**<br>
Check your Ingress-NGINX Controller version and ensure you have the matching Datadog init-container available.
The init-container version ([datadog/ingress-nginx-injection][1]) must exactly match your controller version to prevent startup issues.
For example, if you're running Ingress-NGINX v1.11.3, you need [datadog/ingress-nginx-injection:v1.11.3][2].

**2. Modify your controller's pod specification**<br>
Update the controller pod specification to include the init-container and configure the Datadog Agent host environment variable:


{{< highlight yaml "hl_lines=4-10 13-16 19-22 25-26" >}}
    spec:
      template:
        spec:
          initContainers:
            - name: init-datadog
              image: datadog/ingress-nginx-injection:<MY_INGRESS_NGINX_VERSION>
              command: ['/datadog/init_module.sh', '/opt/datadog-modules']
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
          containers:
            - name: controller
              image: registry.k8s.io/ingress-nginx/controller:<MY_INGRESS_NGINX_VERSION>
              volumeMounts:
                - name: nginx-module
                  mountPath: /opt/datadog-modules
              env:
                - ...
                - name: DD_AGENT_HOST
                  valueFrom:
                    fieldRef:
                      fieldPath: status.hostIP
          volumes:
            - ...
            - name: nginx-module
              emptyDir: {}
{{< /highlight >}}

**Note**: For an alternative way to access the Datadog Agent, see the [Kubernetes installation guide][1].

**3. Configure Ingress-NGINX** <br>
Create or modify the `ConfigMap` to load the Datadog module:

{{< highlight yaml "hl_lines=5 7-8" >}}
    kind: ConfigMap
    apiVersion: v1
    ...
    data:
      enable-opentelemetry: "false"
      error-log-level: notice
      main-snippet: |
        load_module /opt/datadog-modules/ngx_http_datadog_module.so;
{{< /highlight >}}

**4. Apply the ConfigMap** <br>
Apply the updated `ConfigMap` to ensure the Datadog module is correctly loaded.

This configuration ensures that the Datadog module is loaded and ready to trace incoming requests.

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1
{{% /tab %}}

{{% tab "Helm" %}}
**1. Verify your Ingress-NGINX version**<br>
Check your Ingress-NGINX Controller version and ensure you have the matching Datadog init-container available.
The init-container version ([datadog/ingress-nginx-injection][1]) must exactly match your controller version to prevent startup issues.
For example, if you're running Ingress-NGINX v1.11.3, you need [datadog/ingress-nginx-injection:v1.11.3][2].

**2. Overriding Helm chart values**<br>
To customize the Ingress-NGINX Helm chart and load the required Datadog module, create a YAML file or modify an existing one with the following configuration:

{{< code-block lang="yaml" filename="values.yaml" >}}
controller:
  config:
    main-snippet: "load_module /modules_mount/ngx_http_datadog_module.so;"
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        # The tag should match the version of the ingress-nginx controller
        # For example, this will inject the Datadog module for ingress v1.10.0
        # Check <https://hub.docker.com/repository/docker/datadog/ingress-nginx-injection/tags>
        # for the list of all versions supported.
        tag: "v1.10.0"
        distroless: false
  extraEnvs:
    - name: DD_AGENT_HOST
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
{{< /code-block >}}

**3. Deploy**<br>
Install or upgrade the Helm release using the `-f` flag to apply the custom values created in the previous step.
```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[2]: https://hub.docker.com/layers/datadog/ingress-nginx-injection/v1.11.3/images/sha256-19ea2874d8a4ebbe4de0bf08faeb84c755cd71f1e8740ce2d145c5cf954a33a1

{{% /tab %}}
{{< /tabs >}}

### Controller v1.10.0+ using OpenTelemetry

{{< tabs >}}
{{% tab "Kubernetes" %}}

**1. Prepare the Datadog Agent** <br>
Ensure that your Datadog Agent has [gRPC OTLP Ingestion enabled][1] to act as an OpenTelemetry Collector.

**2. Configure the Ingress controller** <br>
To begin, verify that your Ingress controller's pod spec has the `HOST_IP` environment variable set. If not, add the following entry to the `env` block within the pod's specification:

```yaml
- name: HOST_IP
  valueFrom:
    fieldRef:
      fieldPath: status.hostIP
- name: OTEL_EXPORTER_OTLP_ENDPOINT
  value: "http://$(HOST_IP):4317"
```

Next, enable OpenTelemetry instrumentation for the controller. Create or edit a ConfigMap with the following details:

{{< highlight yaml "hl_lines=7-11" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: ingress-nginx-controller
  namespace: ingress-nginx
data:
  enable-opentelemetry: "true"
  otel-sampler: AlwaysOn
  # Defaults
  # otel-service-name: "nginx"
  # otel-sampler-ratio: 0.01
{{< /highlight >}}

[1]: /opentelemetry/otlp_ingest_in_the_agent/

{{% /tab %}}

{{% tab "Helm" %}}
**1. Prepare the Datadog Agent** <br>
Ensure that your Datadog Agent has [gRPC OTLP Ingestion enabled][1] to act as an OpenTelemetry Collector.

**2. Overriding Helm chart values**<br>
To customize the Ingress-NGINX Helm chart and load the required Datadog module, create a YAML file or modify an existing one with the following configuration:

{{< code-block lang="yaml" filename="values.yaml" >}}
controller:
  opentelemetry:
    enabled: true
  config:
    otel-service-name: "nginx"
    otel-sampler: AlwaysOn
    otel-sampler-ratio: 0.01
  extraEnvs:
    - name: HOST_IP
      valueFrom:
        fieldRef:
          fieldPath: status.hostIP
    - name: OTEL_EXPORTER_OTLP_ENDPOINT
      value: "http://$(HOST_IP):4317"
{{< /code-block >}}

**3. Deploy**
Install or upgrade the Helm release using the `-f` flag to apply the custom values created in the previous step.
```shell
helm install my-release ingress-nginx/ingress-nginx -f values.yaml
```

[1]: /opentelemetry/otlp_ingest_in_the_agent/
{{% /tab %}}
{{< /tabs >}}

### Controller v1.9.0 and older
To enable Datadog tracing, create or edit a ConfigMap to set `enable-opentracing: "true"` and the `datadog-collector-host` to which traces should be sent.
The name of the ConfigMap is cited explicitly by the Ingress-NGINX Controller container's command line argument, defaulting to `--configmap=<POD_NAMESPACE>/nginx-configuration`.
If `ingress-nginx` was installed via Helm chart, the ConfigMap's name will follow the pattern `<RELEASE_NAME>-nginx-ingress-controller`.

The Ingress controller manages both the `nginx.conf` and `/etc/nginx/opentracing.json` files. Tracing is enabled for all `location` blocks.

{{< highlight yaml "hl_lines=6-7 9-15" >}}
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
{{< /highlight >}}

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

## Correlating traces to logs

After you've enabled APM tracing, you can connect your traces to the corresponding NGINX logs. This correlation links each trace and span to the specific log events generated during that request, allowing you to pivot between them to troubleshoot issues.

### Prerequisites

Before you begin, ensure that you have:
- Enabled APM tracing for NGINX by following the steps earlier in this guide.
- Configured Datadog log collection for NGINX.

### Step 1: Inject trace and span IDs into NGINX logs

Modify your `log_format` directive to include the trace ID and the span ID. The variables you use depends on your instrumentation method. Select the appropriate tab below for the instructions that match your setup.

{{< tabs >}}
{{% tab "Datadog NGINX Module" %}}

If you installed the [Datadog NGINX module][100], use the `$datadog_trace_id` and `$datadog_span_id` variables. This value is `-` for requests that are not traced.

Update your NGINX configuration file (for example, `/etc/nginx/nginx.conf`):

```nginx
http {
  log_format main_datadog '$remote_addr - $remote_user [$time_local] "$request" '
                         '$status $body_bytes_sent "$http_referer" '
                         '"$http_user_agent" "$http_x_forwarded_for" '
                         'dd.trace_id="$datadog_trace_id"' 'dd.span_id="$datadog_span_id"';

  access_log /var/log/nginx/access.log main_datadog;
}
```
[100]: https://github.com/DataDog/nginx-datadog/releases/latest

{{% /tab %}}
{{% tab "OpenTelemetry" %}}

If you are using the [NGINX OpenTelemetry module][100], use the `$otel_trace_id` and `$otel_span_id` variables. This value is an empty string for requests that are not traced.

Update your NGINX configuration file (for example, `/etc/nginx/nginx.conf`):

```nginx
http {
  log_format main_opentelemetry '$remote_addr - $remote_user [$time_local] "$request" '
                               '$status $body_bytes_sent "$http_referer" '
                               '"$http_user_agent" "$http_x_forwarded_for" '
                               'dd.trace_id="$otel_trace_id"' 'dd.span_id="$otel_span_id"' ;

  access_log /var/log/nginx/access.log main_opentelemetry;
}
```
[100]: https://nginx.org/en/docs/ngx_otel_module.html
{{% /tab %}}
{{< /tabs >}}

After saving your changes, reload the NGINX configuration. For example:

```sh
sudo nginx -s reload
```

### Step 2: Configure the log pipeline to parse the trace and span IDs

By default, logs capture `dd.trace_id` and `dd.span_id` in hexadecimal format:

```
10.244.0.1 - - [12/Sep/2025:22:41:03 +0000] "GET /health HTTP/1.1" 200 87 0.002 "-" "kube-probe/1.32" "-" dd.trace_id="68c4a17f000000009aed12af2ccb1ead" dd.span_id="9aed12af2ccb1ead"
```

To enable log and trace correlation in Datadog, configure a log processing pipeline to convert these IDs from hexadecimal to decimal. Follow the same steps regardless of the instrumentation method you use.

1. In Datadog, navigate to the [**Log Configuration**][9] page.
2. Hover over your active NGINX pipeline and click the **Clone** icon to create an editable version.
3. Click the cloned pipeline.
4. Click **Add Processor**.
5. Select [Grok Parser][11] as the processor type.
6. Define the following parsing rule to extract the trace ID attribute from a log event. This rule works for both the Datadog module and OpenTelemetry outputs:
   ```text
   extract_correlation_ids %{data} dd.trace_id="%{notSpace:dd.trace_id:nullIf("-")}" dd.span_id="%{notSpace:dd.span_id:nullIf("-")}"
   ```
7. Click **Create**.
8. Click **Add Processor** again.
9. Select [Trace ID Remapper][10] as the processor type. This processor associates the parsed ID with its corresponding APM trace.
10. In the **Set trace id attribute(s)** field, enter `dd.trace_id`.
11. Click **Create**.
12. Click **Add Processor** again.
13. Select [Span ID Remapper][12] as the processor type. This processor associates the parsed ID with its corresponding APM span.
14. In the **Set span id attribute(s)** field, enter `dd.span_id`.
15. Click **Create**.
16. Save and enable your new pipeline.

Once the pipeline is active, new NGINX logs are automatically correlated with their traces and spans.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/nginx-datadog/releases/latest
[2]: https://hub.docker.com/layers/library/nginx/1.23.2-alpine/images/sha256-0f2ab24c6aba5d96fcf6e7a736333f26dca1acf5fa8def4c276f6efc7d56251f?context=explore
[3]: https://hub.docker.com/layers/library/amazonlinux/2.0.20230119.1/images/sha256-db0bf55c548efbbb167c60ced2eb0ca60769de293667d18b92c0c089b8038279?context=explore
[4]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[6]: https://github.com/DataDog/nginx-datadog/
[7]: https://kubernetes.io/docs/concepts/workloads/pods/init-containers/
[8]: /logs/guide/ease-troubleshooting-with-cross-product-correlation
[9]: https://app.datadoghq.com/logs/pipelines
[10]: /logs/log_configuration/processors/?tab=ui#trace-remapper
[11]: /logs/log_configuration/processors/?tab=ui#grok-parser
[12]: /logs/log_configuration/processors/?tab=ui#span-remapper

