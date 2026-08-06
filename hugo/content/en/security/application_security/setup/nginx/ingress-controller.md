---
title: Set up App and API Protection for Nginx in Kubernetes
type: multi-code-lang
aliases:
  - /security/application_security/setup/nginx/kubernetes/
further_reading:
  - link: "/security/application_security/how-it-works/"
    tag: "Documentation"
    text: "How App and API Protection Works"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

{{< site-region region="gov" >}}
<div class="alert alert-info">
App and API Protection is in Preview on Datadog Government site US1-FED.
</div>
{{< /site-region >}}

{{< partial name="app_and_api_protection/callout.html" >}}

# Ingress-nginx support for Datadog

[Ingress-nginx][1] is a [Kubernetes ingress controller][2]
that uses NGINX as a reverse proxy and load balancer. In a Kubernetes cluster, external access is restricted by default for security reasons.
An ingress controller uses rules to control how external traffic may reach your services.

You can enable [App and API Protection][10] for your ingress-nginx controller to inspect and protect traffic at the edge of your cluster. Datadog supports two setup methods:

- **Automated configuration** (recommended): the Datadog Cluster Agent injects the `nginx-datadog` module into your ingress-nginx controller pods.
- **Manual configuration**: you add a Datadog init container and NGINX configuration snippets yourself.

## Automated configuration with App and API Protection for Kubernetes

<div class="alert alert-info">
  Automated configuration lets the Datadog Cluster Agent inject the <code>nginx-datadog</code> module into your ingress-nginx controller pods, without manual init container or NGINX snippet changes. This is the recommended approach for most users.
</div>

### Setup

This setup requires:

- The Datadog Cluster Agent `v7.79.0` or later.
- For the Helm method, the Datadog Helm chart `v3.217.0` or later.

Enable automatic configuration using the Datadog Operator or Helm.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Add annotations to your `DatadogAgent` resource:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
    # Optional: override the path where the nginx-datadog module is mounted
    # in the controller pod (default: /modules_mount)
    # agent.datadoghq.com/appsec.nginx.module_mount_path: "/modules_mount"
```

Apply the configuration:

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Add the following to your `values.yaml`:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # Optional: override the path where the nginx-datadog module is mounted
      # in the controller pod (default: /modules_mount)
      # nginx:
      #   moduleMountPath: "/modules_mount"
```

Install or upgrade the Datadog Helm chart (`v3.217.0` or later):

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

After you enable automatic configuration, the Datadog Cluster Agent:

- Detects your ingress-nginx controller pods
- Injects the `nginx-datadog` module into the controller
- Configures the controller to load the module and apply App and API Protection

You can turn App and API Protection on or off through [Remote Configuration][8] without changing this setup.

For configuration options, see [App and API Protection for Kubernetes][9].

### Validate

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Manual configuration (alternative)

The ingress-nginx controller is managed through [Kubernetes resources][3],
but customization of the underlying NGINX configuration is typically limited beyond its intended use case. However, ingress-nginx allows
the addition of extra NGINX modules for extended functionality. To take advantage of this feature with `nginx-datadog`, Datadog provides **init containers**.

### How to enable `nginx-datadog` in ingress-nginx?
To integrate `nginx-datadog` with ingress-nginx, add a Datadog [init container][4] to your pod
specification and configure NGINX to load the `nginx-datadog` module.

The following Helm values demonstrate how to inject the `nginx-datadog` module into an ingress-nginx controller:

```yaml
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
```

See the [detailed examples][5] to help you set up ingress-nginx with `nginx-datadog`.

### How does it work?
Init containers are special containers that run before the main container in a Kubernetes pod. In this case,
the Datadog init container is responsible for copying the `nginx-datadog` module into a shared volume that the
main ingress-nginx container can access.

When the main ingress-nginx controller starts, the NGINX configuration must be updated with the `load_module` directive,
allowing it to load the Datadog module.

<div class="alert alert-danger">
Datadog provides a specific init container <b>for each ingress-nginx controller version</b>, starting with <code>v1.10.0</code>. This is crucial because <b>each</b> init container must match the underlying NGINX version. To confirm compatibility, verify that the version of the Datadog init container matches your ingress-nginx version.
</div>

### Interaction with OpenTelemetry
By default, ingress-nginx includes an OpenTelemetry (oTel) module that can be enabled using the `enable-opentelemetry: true` setting
in the [ingress-nginx ConfigMap][6].
However, if you are using `nginx-datadog` for tracing, Datadog recommends **disabling** OpenTelemetry to prevent duplicate tracing data from both
the oTel and Datadog modules.

To disable OpenTelemetry, set `enable-opentelemetry: false`.

### Enabling AppSec

You can enable the WAF provided by AppSec to protect your applications from security threats. To do so, update your Helm values to include the AppSec configuration:

```yaml
controller:
  config:
    main-snippet: |
      load_module /modules_mount/ngx_http_datadog_module.so;
      # AppSec thread pool configuration (adjust threads and max_queue as needed)
      thread_pool waf_thread_pool threads=2 max_queue=16;
    http-snippet: |
      # Enable AppSec
      datadog_appsec_enabled on;
      datadog_waf_thread_pool_name waf_thread_pool;
  opentelemetry:
    enabled: false
  extraModules:
    - name: nginx-datadog
      image:
        registry: docker.io
        image: datadog/ingress-nginx-injection
        tag: "v1.10.0"
        distroless: false
```

**Key configuration parameters:**
- `thread_pool waf_thread_pool`: Creates a dedicated thread pool for AppSec processing. Adjust `threads` and `max_queue` based on your traffic patterns and available resources.
- `datadog_appsec_enabled on`: Enables the Application Security module for threat detection and protection. This can be omitted so that AppSec can be enabled or disabled through Remote Configuration.
- `datadog_waf_thread_pool_name waf_thread_pool`: Associates the matching requests with the configured thread pool.

See the [configuration reference][7] for more configurable options.

<div class="alert alert-info">
For production environments, monitor the thread pool performance and adjust the <code>threads</code> and <code>max_queue</code> parameters based on your traffic volume and latency requirements.
</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://kubernetes.io/docs/concepts/services-networking/ingress/
[3]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[4]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[5]: https://github.com/DataDog/nginx-datadog/tree/master/example/ingress-nginx
[6]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry
[7]: https://github.com/DataDog/nginx-datadog/blob/master/doc/API.md
[8]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[9]: /containers/kubernetes/appsec
[10]: /security/application_security/
