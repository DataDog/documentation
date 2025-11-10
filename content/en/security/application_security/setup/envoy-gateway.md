---
title: Enabling App and API Protection for Envoy Gateway
code_lang: envoy-gateway
code_lang_weight: 50
further_reading:
  - link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions'
    tag: "Source Code"
    text: "Envoy integration's source code"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

{{< callout url="#" btn_hidden="true" header="App and API Protection for Envoy Gateway is in Preview" >}}
To try the preview of App and API Protection for Envoy Gateway, use the following setup instructions.
{{< /callout >}}

You can enable Datadog App and API Protection for traffic managed by [Envoy Gateway][1]. The Datadog Envoy Gateway integration allows Datadog to inspect and protect your traffic for threat detection and blocking directly at the edge of your infrastructure.

## Prerequisites

1. A running Kubernetes cluster with [Envoy Gateway][1] installed.
2. The [Datadog Agent is installed and configured][2] in your Kubernetes cluster.
    - Ensure [Remote Configuration][3] is enabled and configured to enable blocking attackers through the Datadog UI.
    - Ensure [APM is enabled][4] in the Agent. *This allows the external processor service to send its own traces to the Agent.*
      - Optionally, enable the [Cluster Agent Admission Controller][5] to automatically inject the Datadog Agent host information to the App and API Protection External Processor service.

## Enabling threat detection

Enabling App and API Protection with Envoy Gateway involves two steps:

1. Deploying the Datadog External Processor service in your cluster.
2. Configuring an `EnvoyExtensionPolicy` that points to the processor service to direct traffic from your Envoy Gateway to this service.

### 1. Deploy the Datadog External Processor service

This service is a gRPC server that Envoy communicates with to have requests and responses analyzed by App and API Protection.

Create a Kubernetes Deployment and Service for the Datadog External Processor. It's recommended to deploy this service in a namespace accessible by your Envoy Gateway.

The Datadog External Processor Docker image is available on the [Datadog Go tracer GitHub Registry][6].

Here is an example manifest (`datadog-aap-extproc-service.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
  labels:
    app: datadog-aap-extproc
spec:
  replicas: 1 # Adjust replica count based on your load
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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0 # Replace with the latest released version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the external processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # Optional: Agent Configuration
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the external processor
        - name: DD_AGENT_HOST
          value: "<your-datadog-agent-service>.<your-datadog-agent-namespace>.svc.cluster.local"
        - name: DD_TRACE_AGENT_PORT # Optional if your Agent's trace port is the default 8126
          value: "8126"

        # Disable TLS for communication between Envoy Gateway and the external processor. Default is true.
        # By default, the external processor configuration used by Envoy Gateway is configured to not use TLS.
        # You can enable TLS and configure it with DD_SERVICE_EXTENSION_TLS_KEY_FILE and DD_SERVICE_EXTENSION_TLS_CERT_FILE
        # and apply a BackendTLSPolicy on the Datadog External Processor Service.
        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"

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
  name: datadog-aap-extproc-service # This name will be used in the EnvoyExtensionPolicy configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy Gateway
  labels:
    app: datadog-aap-extproc
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
    protocol: TCP
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

#### Configuration options for the External Processor

The Datadog External Processor exposes some settings:

| Environment variable                      | Default value       | Description                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC server listening address.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC server port.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | HTTP server port for health checks.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS`                | `true`          | Enable the gRPC TLS layer.                                                                                                      |
| `DD_SERVICE_EXTENSION_TLS_KEY_FILE`       | `localhost.key` | Change the default gRPC TLS layer key.                                                                           |
| `DD_SERVICE_EXTENSION_TLS_CERT_FILE`      | `localhost.crt` | Change the default gRPC TLS layer cert.                                                                           |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `10485760`                 | Maximum size of the bodies to be processed in bytes. If set to `0`, the bodies are not processed. The recommended value is `10485760` (10MB). (To fully enable body processing, the `allowModeOverride` option should also be set in the External Processing filter configuration) |
| `DD_SERVICE`                              | `serviceextensions` | Service name shown in the Datadog UI.                                                                                                    |


Configure the connection from the external processor to the Datadog Agent using these environment variables:

| Environment variable                   | Default value | Description                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Hostname or IP of your Datadog Agent.                                            |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection.                                  |

The External Processor is built on top of the [Datadog Go Tracer][7] and inherits all of its environment variables. See [Configuring the Go Tracing Library][8] and [App and API Protection Library Configuration][9].

<div class="alert alert-danger">
  <strong>Note:</strong> As the Datadog External Processor is built on top of the Datadog Go Tracer, it generally follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version (for example, <code>v2.2.2</code>). In some cases, early release versions might be published between official tracer releases, and these images are tagged with a suffix such as <code>-docker.1</code>.
</div>

### 2. Configure an EnvoyExtensionPolicy

Use an `EnvoyExtensionPolicy` to instruct Envoy Gateway to call the Datadog external processor. You can attach the policy to a Gateway or to specific HTTPRoute/GRPCRoute resources.

This sends all traffic on the selected Gateway to the external processor. Here is an example manifest (`datadog-aap-extproc-eep.yaml`):

```yaml
apiVersion: gateway.envoyproxy.io/v1alpha1
kind: EnvoyExtensionPolicy
metadata:
  name: datadog-aap-extproc-eep
  namespace: <your-preferred-namespace> # same namespace as the Gateway
spec:
  targetRefs:
  # Target the entire Gateway
  - group: gateway.networking.k8s.io
    kind: Gateway
    name: <your-gateway-name> # update to your specific gateway name
  # Target specific HTTPRoutes/GRPCRoutes
  #- group: gateway.networking.k8s.io
  #  kind: HTTPRoute
  #  name: <your-http-route-name>
  extProc:
  - backendRefs:
    - group: ""
      kind: Service
      name: datadog-aap-extproc-service
      namespace: <your-preferred-namespace> # namespace of the external processor Service
      port: 443

    # Optional: Enable fail open mode. Default is false.
    # Normally, if the external processor fails or times out, the filter fails and Envoy
    # returns a 5xx error to the downstream client. Setting this to true allows requests
    # to continue without error if a failure occurs.
    failOpen: true

    # Optional: Set a timeout by processing message. Default is 200ms.
    # There is a maxium of 2 messages per requests with headers only and 4 messages maximum
    # with body processing enabled.
    # Note: This timeout also includes the data communication between Envoy and the external processor.
    # The timeout should be adjusted to accommodate the additional possible processing time.
    # Larger payloads will require a longer timeout. 
    messageTimeout: 200ms

    processingMode:
      # The external processor can dynamically override the processing mode as needed, instructing
      # Envoy to forward request and response bodies to the external processor.
      allowModeOverride: true
      # Only enable the request and response header modes by default.
      request: {}
      response: {}
```

#### Cross‑namespace reference

If your external processor `Service` is in a **different namespace** than the policy, add a [ReferenceGrant][10] in the processor’s namespace. For example, you can do this with a manifest such as `datadog-aap-eep-rg.yaml`.

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
  name: datadog-aap-eep-rg
  namespace: <your-extproc-namespace>   # namespace of the external processor Service
spec:
  from:
  - group: gateway.envoyproxy.io
    kind: EnvoyExtensionPolicy
    namespace: <your-policy-namespace>  # namespace of the EnvoyExtensionPolicy (and the Gateway)
  to:
  - group: ""
    kind: Service
    name: datadog-aap-extproc-service
```

### Validation

After applying the policy, traffic through the targeted Gateway/Routes is inspected by App and API Protection.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Limitations

The Envoy Gateway integration has the following limitations:

* Observability mode (asynchronous analysis) is not available for Envoy Gateway.

For additional details on the Envoy Gateway integration compatibilities, refer to the [Envoy Gateway integration compatibility page][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://gateway.envoyproxy.io/docs/
[2]: /containers/kubernetes/installation/?tab=datadogoperator
[3]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /tracing/trace_collection/library_config/go/
[9]: /security/application_security/policies/library_configuration/
[10]: https://gateway-api.sigs.k8s.io/api-types/referencegrant/
[11]: /security/application_security/setup/compatibility/envoy-gateway