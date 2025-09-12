---
title: Set up App and API Protection for Nginx in Kubernetes
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 20
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
# Ingress-nginx support for Datadog

[Ingress-nginx](https://github.com/kubernetes/ingress-nginx) is one of the [Kubernetes ingress controller](https://kubernetes.io/docs/concepts/services-networking/ingress/)
that uses NGINX as a reverse proxy and load balancer. In a Kubernetes cluster, external access is restricted by default for security reasons.
An ingress controller enables traffic from the outside world to reach your services, based on ingress rules.

The ingress-nginx controller is managed through [Kubernetes resources](https://kubernetes.io/docs/concepts/extend-kubernetes/api-extension/custom-resources/),
but customization of the underlying NGINX configuration is typically limited beyond its intended use case. However, ingress-nginx allows
the addition of extra NGINX modules for extended functionality. To take advantage of this feature with `nginx-datadog`, we provide **init containers**.

## How to enable `nginx-datadog` in ingress-nginx?
To integrate `nginx-datadog` with ingress-nginx, you need to add one of our [init container](https://hub.docker.com/r/datadog/ingress-nginx-injection) to your pod
specification and configure NGINX to load the `nginx-datadog` module.

The following Helm values demonstrates how to inject `nginx-datadog` module into an ingress-nginx controller:

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

Check [our details examples](./examples/ingress-nginx) to help you set up ingress-nginx with `nginx-datadog`.

## How does it work?
Init containers are special containers that run before the main container in a Kubernetes pod. In this case,
the Datadog init container is responsible for copying the `nginx-datadog` module into a shared volume that will be
accessible by the main ingress-nginx container.

When the main ingrees-nginx controller starts, the NGINX configuration must be updated with the `load_module` directive,
allowing it to load the Datadog module seamlessly.

> [!WARNING]  
> We provide a specific init container **for each ingress-nginx controller version** start with `v1.10.0`. 
> This is crucial because **each** init container must match the underlying NGINX version. Be sure to choose
> the version of the Datadog init container matching your ingress-nginx version to ensure compatibility.

## Interaction with OpenTelemetry
By default, ingress-nginx includes an OpenTelemetry (oTel) module, which can be enabled via the `enable-opentelemetry: true` setting
in the [ingress-nginx ConfigMap](https://kubernetes.github.io/ingress-nginx/user-guide/nginx-configuration/configmap/#enable-opentelemetry).
However, if you are using `nginx-datadog` for tracing, we recommend **disabling** OpenTelemetry to prevent duplicate tracing data from both
the oTel and Datadog modules.

To disable OpenTelemetry, set `enable-opentelemetry: false`.