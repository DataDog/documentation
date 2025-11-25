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
{{< partial name="app_and_api_protection/callout.html" >}}

# Ingress-nginx support for Datadog

[Ingress-nginx][1] is a [Kubernetes ingress controller][2]
that uses nginx as a reverse proxy and load balancer. In a Kubernetes cluster, external access is restricted by default for security reasons.
An ingress controller uses rules to control how external traffic may reach your services.

The ingress-nginx controller is managed through [Kubernetes resources][3],
but customization of the underlying nginx configuration is typically limited beyond its intended use case. However, ingress-nginx allows
the addition of extra nginx modules for extended functionality. To take advantage of this feature with `nginx-datadog`, we provide **init containers**.

## How to enable `nginx-datadog` in ingress-nginx?
To integrate `nginx-datadog` with ingress-nginx, add a Datadog [init container][4] to your pod
specification and configure nginx to load the `nginx-datadog` module.

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

Check [our details examples][5] to help you set up ingress-nginx with `nginx-datadog`.

## How does it work?
Init containers are special containers that run before the main container in a Kubernetes pod. In this case,
the Datadog init container is responsible for copying the `nginx-datadog` module into a shared volume that will be
accessible by the main ingress-nginx container.

When the main ingrees-nginx controller starts, the nginx configuration must be updated with the `load_module` directive,
allowing it to load the Datadog module seamlessly.

<div class="alert alert-danger">
We provide a specific init container **for each ingress-nginx controller version**, starting with <code>v1.10.0</code>. This is crucial because **each** init container must match the underlying nginx version. To ensure compatibility, ensure the version of the Datadog init container matches your ingress-nginx version.
</div>

## Interaction with OpenTelemetry
By default, ingress-nginx includes an OpenTelemetry (oTel) module that can be enabled using the `enable-opentelemetry: true` setting
in the [ingress-nginx ConfigMap][6].
However, if you are using `nginx-datadog` for tracing, we recommend **disabling** OpenTelemetry to prevent duplicate tracing data from both
the oTel and Datadog modules.

To disable OpenTelemetry, set `enable-opentelemetry: false`.

[1]: https://github.com/kubernetes/ingress-nginx
[2]: https://kubernetes.io/docs/concepts/services-networking/ingress/
[3]: https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/
[4]: https://hub.docker.com/r/datadog/ingress-nginx-injection
[5]: https://github.com/DataDog/nginx-datadog/tree/master/example/ingress-nginx
[6]: https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry
