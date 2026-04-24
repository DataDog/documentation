---
title: Enabling App and API Protection for Google Kubernetes Engine (GKE)
aliases:
  - /security/application_security/setup/gke
code_lang: gke
code_lang_weight: 50
further_reading:
  - link: "https://www.datadoghq.com/blog/app-api-protection-envoy-istio-nginx-haproxy"
    tag: "Blog"
    text: "Secure your APIs through Envoy, Istio, NGINX, HAProxy, and more with Datadog App and API Protection"
  - link: 'https://docs.cloud.google.com/kubernetes-engine/docs/how-to/configure-gke-service-extensions'
    tag: "Documentation"
    text: "Configure Service Extensions on a GKE Gateway"
  - link: 'https://cloud.google.com/service-extensions/docs/overview'
    tag: "Documentation"
    text: "Google Cloud Service Extensions overview"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
  - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions'
    tag: "Source Code"
    text: "App and API Protection Service Extension source code"
---

{{< callout url="#" btn_hidden="true" header="App and API Protection for GKE is in Preview" >}}
To try the Preview of App and API Protection for GKE, use the following setup instructions.
{{< /callout >}}

You can enable Datadog [App and API Protection][1] on a Google Kubernetes Engine (GKE) Gateway to inspect and protect traffic at the cluster edge. The integration uses the GKE Gateway controller and the `GCPTrafficExtension` custom resource to attach the Datadog security processor to the GCP Cloud Load Balancer.

## Prerequisites

- A GKE cluster running **version 1.33 or later**, with the [Gateway API enabled][2].
- A `Gateway` resource that uses a [GatewayClass][3] supporting traffic extensions, such as `gke-l7-global-external-managed` or `gke-l7-regional-external-managed`. For the full list, see [supported `GatewayClasses` for `GCPTrafficExtension`][12].
- The [Datadog Agent is installed and configured][4] in your Kubernetes cluster.
  - [Remote Configuration][5] is enabled and configured in the Datadog UI to block attackers.
  - [APM][6] is enabled in the Agent so the security processor can send its own traces to the Agent.

## Enabling threat detection

To enable App and API Protection on a GKE Gateway, do the following:

1. Deploy the Datadog security processor service in your cluster.
2. Create a `HealthCheckPolicy` so GCP can probe the security processor.
3. Create a `GCPTrafficExtension` that attaches the security processor to your `Gateway`.

### Deploy the Datadog security processor service

The Datadog security processor is a gRPC service that analyzes requests and responses for App and API Protection. Deploy it in the same namespace as your `Gateway`. The Docker image is available on the [Datadog Go tracer GitHub Registry][7].

Example manifest (`datadog-aap-extproc-service.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-gateway-namespace> # Same namespace as the Gateway
  labels:
    app: datadog-aap-extproc
spec:
  replicas: 1 # Adjust the replica count based on your load
  selector:
    matchLabels:
      app: datadog-aap-extproc
  template:
    metadata:
      labels:
        app: datadog-aap-extproc
    spec:
      containers:
        - name: datadog-aap-extproc-container
          image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:latest
          ports:
            - name: grpc
              containerPort: 443 # Default gRPC port for the security processor
            - name: health
              containerPort: 80  # Default health check port
          env:
            # Agent configuration: host and port of your Datadog Agent
            - name: DD_AGENT_HOST
              value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
            - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
              value: "8126"
          readinessProbe:
            httpGet:
              path: /
              port: health
            initialDelaySeconds: 5
            periodSeconds: 10
          livenessProbe:
            httpGet:
              path: /
              port: health
            initialDelaySeconds: 15
            periodSeconds: 20
---
apiVersion: v1
kind: Service
metadata:
  name: datadog-aap-extproc-service # This name is referenced by the GCPTrafficExtension
  namespace: <your-gateway-namespace> # Same namespace as the Gateway
  labels:
    app: datadog-aap-extproc
spec:
  selector:
    app: datadog-aap-extproc
  ports:
    - name: grpc
      port: 443
      targetPort: grpc
      protocol: TCP
      appProtocol: HTTP2 # Required: GKE callout backends must use HTTP/2
    - name: health
      port: 80
      targetPort: health
      protocol: TCP
```

<div class="alert alert-info">
  <strong>Note:</strong> On GKE, backends used as Service Extension callouts must speak HTTP/2. The <code>appProtocol: HTTP2</code> field on the <code>grpc</code> Service port tells the GKE Gateway controller to use HTTP/2 when forwarding traffic. Without it, the load balancer cannot talk gRPC to the security processor.
</div>

#### Configuration options for the security processor

The Datadog security processor exposes the following settings:

| Environment variable                    | Default value       | Description                                                                                                                   |
|-----------------------------------------|---------------------|-------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`             | `0.0.0.0`           | gRPC server listening address.                                                                                                |
| `DD_SERVICE_EXTENSION_PORT`             | `443`               | gRPC server port.                                                                                                             |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT` | `80`                | HTTP server port for health checks.                                                                                           |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`     | `0`                 | Maximum size of bodies to process, in bytes. If set to `0`, bodies are not processed. Recommended value is `10000000` (10MB). |
| `DD_SERVICE`                            | `serviceextensions` | Service name shown in the Datadog UI.                                                                                         |

Configure the connection from the security processor to the Datadog Agent with these environment variables:

| Environment variable  | Default value | Description                                      |
|-----------------------|---------------|--------------------------------------------------|
| `DD_AGENT_HOST`       | `localhost`   | Hostname or IP of your Datadog Agent.            |
| `DD_TRACE_AGENT_PORT` | `8126`        | Port of the Datadog Agent for trace collection.  |

The security processor is built on top of the [Datadog Go Tracer][8] and inherits all of its environment variables. See [Configuring the Go Tracing Library][9] and [App and API Protection Library Configuration][10].

<div class="alert alert-info">
  Because the Datadog security processor is built on top of the Datadog Go tracer, it generally follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version (for example, <code>v2.7.0</code>). In some cases, early release versions might be published between official tracer releases, and these images are tagged with a suffix such as <code>-docker.1</code>.
</div>

### Create a HealthCheckPolicy

GKE uses a [HealthCheckPolicy][11] to probe Services used as backends by Google Cloud load balancers. Point the policy at the security processor Service so the load balancer can probe it and start forwarding traffic.

Example manifest (`datadog-aap-extproc-hc.yaml`):

```yaml
apiVersion: networking.gke.io/v1
kind: HealthCheckPolicy
metadata:
  name: datadog-aap-extproc-hc
  namespace: <your-gateway-namespace> # Same namespace as the Gateway and the security processor Service
spec:
  targetRef:
    group: ""
    kind: Service
    name: datadog-aap-extproc-service
  default:
    checkIntervalSec: 15
    timeoutSec: 15
    healthyThreshold: 1
    unhealthyThreshold: 2
    logConfig:
      enabled: true
    config:
      type: HTTP
      httpHealthCheck:
        portSpecification: USE_FIXED_PORT
        port: 80
        requestPath: "/"
```

### Create a GCPTrafficExtension

Attach the security processor to your `Gateway` with a [GCPTrafficExtension][12]. The extension forwards requests and responses from the Gateway to the security processor for inspection.

Example manifest (`datadog-aap-extproc-extension.yaml`):

```yaml
apiVersion: networking.gke.io/v1
kind: GCPTrafficExtension
metadata:
  name: datadog-aap-extproc-extension
  namespace: <your-gateway-namespace> # Same namespace as the Gateway
spec:
  targetRefs:
    - group: "gateway.networking.k8s.io"
      kind: Gateway
      name: <your-gateway-name> # Replace with your Gateway name
  extensionChains:
    - name: datadog-aap-chain
      matchCondition:
        celExpressions:
          - celMatcher: "1 == 1" # Match all traffic
      extensions:
        - name: datadog-aap-extension
          backendRef:
            group: ""
            kind: Service
            name: datadog-aap-extproc-service
            port: 443

          # Required: set the authority for the gRPC call to the extension.
          # Use your application hostname or the security processor Service DNS name.
          authority: "datadog-aap-extproc-service.<your-gateway-namespace>.svc.cluster.local"

          # By default, if the security processor fails or times out, the proxy returns a
          # 5xx error. To prevent this, enable the failOpen setting. When enabled, request
          # processing is stopped on error but the request is not dropped, which keeps the
          # application available.
          failOpen: true

          # Mandatory: Only set the Request and Response Headers events.
          # If body events are selected, the security processor transfers and analyzes
          # the bodies for every request without applying the relevant selection rules.
          # Use the DD_APPSEC_BODY_PARSING_SIZE_LIMIT environment variable on the callout
          # container to enable body processing.
          supportedEvents:
            - RequestHeaders
            - ResponseHeaders

          # Adjust the timeout to match your processing needs (for example, with body processing).
          # Valid range: 10ms to 10s. This is the same option as message_timeout in an Envoy ext_proc configuration.
          timeout: 1s
```

<div class="alert alert-info">
  <strong>Note:</strong> The <code>Gateway</code>, the <code>GCPTrafficExtension</code>, and the security processor <code>Service</code> referenced by <code>backendRef</code> must all reside in the same namespace. See the <a href="https://cloud.google.com/kubernetes-engine/docs/how-to/configure-gke-service-extensions">GKE Service Extensions restrictions</a> for the full list of constraints on the extension's backend <code>Service</code>.
</div>

### Validate

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Limitations

The GKE integration has the following limitations:

- Asynchronous (observability) mode is not supported. This is a limitation of GCP Service Extensions.

For additional details on the underlying compatibility, see the [GCP Service Extensions integration compatibility page][13].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/application_security/
[2]: https://cloud.google.com/kubernetes-engine/docs/how-to/deploying-gateways
[3]: https://cloud.google.com/kubernetes-engine/docs/concepts/gateway-api#gatewayclass
[4]: /containers/kubernetes/installation/?tab=datadogoperator
[5]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[6]: /tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[7]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[8]: https://github.com/DataDog/dd-trace-go
[9]: /tracing/trace_collection/library_config/go/
[10]: /security/application_security/policies/library_configuration/
[11]: https://cloud.google.com/kubernetes-engine/docs/how-to/configure-gateway-resources#configure_health_check
[12]: https://cloud.google.com/kubernetes-engine/docs/how-to/configure-gke-service-extensions
[13]: /security/application_security/setup/compatibility/gcp-service-extensions
