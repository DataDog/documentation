---
title: Enabling AAP for Gateway API in Kubernetes
aliases:
  - /security/application_security/threats/setup/threat_detection/gateway_api
  - /security/application_security/threats_detection/gateway_api
  - /security/application_security/setup/gateway-api
further_reading:
    - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/k8s.io/gateway-api'
      tag: "Source Code"
      text: "Gateway API integration's source code"
    - link: "/security/default_rules/?category=cat-application-security"
      tag: "Documentation"
      text: "OOTB App and API Protection Rules"
    - link: "/security/application_security/troubleshooting"
      tag: "Documentation"
      text: "Troubleshooting App and API Protection"
---

<div class="alert alert-danger">
  AAP for Gateway API is experimental. Please follow the instructions below to try it out.
</div>

## Overview

The **Datadog AppSec Gateway API Request Mirror** enhances application security by leveraging the **RequestMirror** functionality in Kubernetes Gateway APIs to duplicate traffic to a Datadog App &API Protection endpoint. This enables real-time detection and analysis of potential application-level attacks, API endpoint discovery, and more, all without impacting the primary request flow.

## Prerequisites

- A Kubernetes cluster with [Gateway API CRDs installed][9].
- A [controller compatible with the Gateway API RequestMirror filter][10].
- [Go][11] 1.23+ installed on your local machine.

## Enabling threat detection

### Installation

1. **Deploy the Datadog Agent** in your Kubernetes cluster following the [Kubernetes installation guide][12].

2. **Configure the Datadog Agent** to [support incoming AppSec payloads][13] using APM as transport.

3. **Deploy the AppSec Gateway API Request Mirror** in the namespace of your choice (e.g., `datadog`) along with its service:

   ```bash
   kubectl apply -f https://raw.githubusercontent.com/DataDog/dd-trace-go/refs/heads/main/contrib/k8s.io/gateway-api/cmd/request-mirror/deployment.yml
   ```

4. **Verify the deployment**:

   ```bash
   kubectl get pods -l app=request-mirror
   ```

5. **Patch your Gateway resources** to allow access to the namespace with the deployment:

   ```bash
   git clone https://github.com/DataDog/dd-trace-go.git
   cd dd-trace-go
   go run ./contrib/k8s.io/gateway-api/cmd/patch-gateways
   ```

   Use the `-help` flag to see options for customizing the patching behavior.

6. **Patch your HTTPRoute resources** to redirect traffic to the service:

   ```bash
   go run ./contrib/k8s.io/gateway-api/cmd/patch-httproutes
   ```

   This command adds a [RequestMirror][14] filter to all `HTTPRoute` resources in all namespaces. Use the `-help` flag for configuration options.

   **Note**: Regularly running this command ensures any newly created `HTTPRoute` resources automatically include the `RequestMirror` filter. Consider adding the resulting patch to your CI/CD pipeline where `HTTPRoute` resources are modified.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Configuration

### Environment Variables

The Gateway API Request Mirror deployment can be configured using the following environment variables:

| Environment Variable                 | Default Value | Description                                                                                                                |
|--------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------------|
| `DD_REQUEST_MIRROR_LISTEN_ADDR`      | `:8080`       | Address and port where the request mirror service listens for incoming mirrored requests                                   |
| `DD_REQUEST_MIRROR_HEALTHCHECK_ADDR` | `:8081`       | Address and port where the health check endpoint is served                                                                 |

Configure the Datadog Agent to receive traces from the integration using the following environment variables:

| Environment Variable                   | Default value | Description                                                           |
|----------------------------------------|---------------|-----------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Hostname where your Datadog Agent is running                          |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection                        |

### Deployment Example

The default deployment creates a service that listens on port 8080 for mirrored requests and exposes a health check endpoint on port 8081:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: request-mirror
  labels:
    app.kubernetes.io/component: request-mirror
    app.kubernetes.io/name: datadog
spec:
  strategy:
    type: RollingUpdate
  selector:
    matchLabels:
      app: request-mirror
  template:
    metadata:
      labels:
        app: request-mirror
    spec:
      containers:
        - name: request-mirror
          image: ghcr.io/datadog/dd-trace-go/request-mirror:latest
          ports:
            - containerPort: 8080
              name: http
          livenessProbe:
            httpGet:
              path: /
              port: 8081
          readinessProbe:
            httpGet:
              path: /
              port: 8081
          env:
            - name: DD_AGENT_HOST
              value: "datadog-agent"  # Adjust to your Agent service name
---
apiVersion: v1
kind: Service
metadata:
  name: request-mirror
spec:
  selector:
    app: request-mirror
  ports:
    - name: http
      port: 8080
      targetPort: 8080
```

## Datadog Go Tracer and Gateway API integration

<div class="alert alert-info">
  The AAP Gateway API integration is built on top of the Datadog Go Tracer. It follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version.
</div>

The Gateway API integration uses the [Datadog Go Tracer][6] and inherits all environment variables from the tracer. You can find more information in [Configuring the Go Tracing Library][7] and [AAP Library Configuration][8].

## Enabling APM tracing

By default, the request mirror traces won't enable Datadog's APM product. If you want to use Application & API Protection without APM tracing functionality, this is the default behavior. 

To enable APM tracing, set the environment variable `DD_APM_TRACING_ENABLED=true` in the request mirror deployment.

If you want to explicitly disable APM tracing while using App and API Protection:

1. Configure your deployment with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable.
2. This configuration will reduce the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

For more details, see [Standalone App and API Protection][15].

## Limitations

The Gateway API integration has the following limitations:

- It cannot access HTTP responses
- No request blocking can be applied
- Only json is supported for analysing HTTP request bodies.

For finer-grained analysis and other AAP features, consider trying other AAP integrations.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent
[2]: /agent/remote_config/?tab=configurationyamlfile#enabling-remote-configuration
[6]: https://github.com/DataDog/dd-trace-go
[7]: /tracing/trace_collection/library_config/go/
[8]: /security/application_security/policies/library_configuration/
[9]: https://gateway-api.sigs.k8s.io/guides/#installing-gateway-api
[10]: https://gateway-api.sigs.k8s.io/implementations
[11]: https://go.dev/doc/install
[12]: /containers/kubernetes/installation/
[13]: /tracing/guide/setting_up_apm_with_kubernetes_service/
[14]: https://gateway-api.sigs.k8s.io/guides/http-request-mirroring/
[15]: /security/application_security/setup/standalone/
