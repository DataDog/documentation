---
title: Enabling App and API Protection for Istio
code_lang: istio
type: multi-code-lang
code_lang_weight: 50
aliases:
  - /security/application_security/threats_detection/istio
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

{{< callout url="#" btn_hidden="true" header="App and API Protection for Istio is in Preview" >}}
To try the preview of App and API Protection for Istio, follow the setup instructions below.
{{< /callout >}}

You can enable App and API Protection for your services within an Istio service mesh. The Datadog Istio integration allows Datadog to inspect and protect your traffic for threat detection and blocking directly at the edge of your infrastructure. This can be applied at the Istio Ingress Gateway or at the sidecar level.

## Limitations

The Istio integration has the following limitations:

* The request body is not inspected, regardless of its content type.
## Prerequisites

Before you begin, ensure you have the following:

1. A running Kubernetes cluster with [Istio][1] installed.
2. The [Datadog Agent is installed and configured][2] in your Kubernetes cluster.
    - Ensure [Remote Configuration][3] is enabled and configured to enable blocking attackers through the Datadog UI.
    - Ensure [APM is enabled][4] in the Agent. *This allows the external processor service to send its own traces to the Agent.*
      - Optionally, enable the [Cluster Agent Admission Controller][5] to automatically inject the Datadog Agent host information to the App and API Protection External Processor service.

## Enabling threat detection

Enabling the threat detection for Istio involves two main steps:
1. Deploying the Datadog External Processor service.
2. Configuring an `EnvoyFilter` to direct traffic from your Istio Ingress Gateway (or sidecars) to this service.

### 1. Deploy the Datadog External Processor Service

This service is a gRPC server that Envoy communicates with to have requests and responses analyzed by App and API Protection.

Create a Kubernetes Deployment and Service for the Datadog External Processor. It's recommended to deploy this service in a namespace accessible by your Istio Ingress Gateway, such as `istio-system`, or a dedicated namespace.

The Datadog External Processor Docker image is available on the [Datadog Go tracer GitHub Registry][6].

Here is an example manifest (`datadog-aap-extproc-service.yaml`):

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v1.73.1 # Replace with the latest version version
        ports:
        - name: grpc
          containerPort: 443 # Default gRPC port for the external processor
        - name: health
          containerPort: 80  # Default health check port
        env:
        # ---- Optional: Agent Configuration ----
        # If you enabled the Cluster Agent Admission Controller, you can skip this section as the Agent host information is automatically injected.
        # Otherwise, configure the address of your Datadog Agent for the external processor
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
  name: datadog-aap-extproc-service # This name will be used in the EnvoyFilter configuration
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
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

#### Environment Variables for the External Processor

You can configure the Datadog App and API Protection External Processor using the following environment variables:

| Environment variable                   | Default value   | Description                                                                  |
|----------------------------------------|-----------------|------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`            | `0.0.0.0`       | gRPC server listening address.                              |
| `DD_SERVICE_EXTENSION_PORT`            | `443`           | gRPC server port.                                           |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`| `80`            | HTTP server port for health checks.      |

Configure the connection from the external processor to the Datadog Agent using these environment variables:

| Environment variable                   | Default value | Description                                                                      |
|----------------------------------------|---------------|----------------------------------------------------------------------------------|
| `DD_AGENT_HOST`                        | `localhost`   | Hostname or IP of your Datadog Agent. |
| `DD_TRACE_AGENT_PORT`                  | `8126`        | Port of the Datadog Agent for trace collection.                                  |

<div class="alert alert-warning">
  <strong>Note:</strong> The External Processor is built on top of the Datadog Go Tracer. It follows the same release process as the tracer, and its Docker images are tagged with the corresponding tracer version.
</div>

You can find more configuration options in [Configuring the Go Tracing Library][7] and [App and API Protection Library Configuration][8].

### 2. Configure an EnvoyFilter

Next, create an `EnvoyFilter` resource to instruct your Istio Ingress Gateway or specific sidecar proxies to send traffic to the `datadog-aap-extproc-service` you deployed. This filter tells Envoy how to connect to the external processor and what traffic to send.

Choose the appropriate configuration based on whether you want to apply App and API Protection at the Ingress Gateway or directly on your application's sidecar proxies.

{{< tabs >}}
{{% tab "Istio Ingress Gateway" %}}

This configuration applies App and API Protection to all traffic passing through your Istio Ingress Gateway. This is a common approach to protect all North-South traffic entering your service mesh.

Below is an example manifest (`datadog-aap-gateway-filter.yaml`) that targets the default Istio Ingress Gateway that typically runs in the `istio-system` namespace with the label `istio: ingressgateway`. You must update these settings to match your specific application.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-gateway-filter
  namespace: <your-preferred-namespace> # Change to your preferred namespace, ensure it's resolvable by the Envoy proxy
spec:
  ## If workloadSelector is omitted, the following patches apply to Gateway pods in this EnvoyFilter's namespace
  ## Use workloadSelector to target a specific Gateway instance.
  # workloadSelector:
  #   labels:
  #     istio: ingressgateway # Label for the default Istio Gateway implementation
  configPatches:
    # Patch 1: Add the Cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: GATEWAY
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          connect_timeout: 0.2s
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog External Processor service
                      address: "datadog-aap-extproc-service.<your-preferred-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443

    # Patch 2: Add the External Processing HTTP Filter to the Gateway's HTTP connection manager
    - applyTo: HTTP_FILTER
      match:
        context: GATEWAY
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: "datadog_aap_ext_proc_cluster"
```

{{% /tab %}}
{{% tab "Sidecar" %}}

This configuration applies App and API Protection to specific pods within your service mesh by targeting their Istio sidecar proxies. This allows for more granular control over which services are protected.

Here is an example manifest (`datadog-aap-sidecar-filter.yaml`) that targets pods with the label `app: <your-app-label>` in the namespace `<your-application-namespace>`. You must update these settings to match your specific application.

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: EnvoyFilter
metadata:
  name: datadog-aap-sidecar-filter
  namespace: <your-application-namespace> # Namespace of your application
spec:
  workloadSelector:
    labels:
      app: <your-app-label> # Label of your application pods
  configPatches:
    # Patch 1: Add the Cluster definition for the Datadog External Processing service
    - applyTo: CLUSTER
      match:
        context: SIDECAR_INBOUND
        cluster:
          service: "*"
      patch:
        operation: ADD
        value:
          name: "datadog_aap_ext_proc_cluster" # A unique name for this cluster configuration
          type: STRICT_DNS
          connect_timeout: 0.2s
          lb_policy: ROUND_ROBIN
          http2_protocol_options: {}
          transport_socket:
            name: envoy.transport_sockets.tls
            typed_config:
              "@type": type.googleapis.com/envoy.extensions.transport_sockets.tls.v3.UpstreamTlsContext
              sni: "localhost"
          load_assignment:
            cluster_name: "datadog_aap_ext_proc_cluster"
            endpoints:
            - lb_endpoints:
              - endpoint:
                  address:
                    socket_address:
                      # Address of the Datadog External Processor service
                      address: "datadog-aap-extproc-service.<extproc-service-namespace>.svc.cluster.local" # Adjust if your service name or namespace is different
                      port_value: 443

    # Patch 2: Add the External Processing HTTP Filter to the Sidecar's connection manager
    - applyTo: HTTP_FILTER
      match:
        context: SIDECAR_INBOUND
        listener:
          filterChain:
            filter:
              name: "envoy.filters.network.http_connection_manager"
              subFilter:
                name: "envoy.filters.http.router"
      patch:
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: "datadog_aap_ext_proc_cluster"
              timeout: 0.2s
```

{{% /tab %}}
{{< /tabs >}}

After applying the chosen `EnvoyFilter`, traffic passing through your Istio Ingress Gateway or selected sidecars will be processed by the Datadog External Processor service, enabling App and API Protection features.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Using AAP without APM tracing

If you want to use Application & API Protection without APM tracing functionality, you can deploy with tracing disabled:

1. Configure your tracing library with the `DD_APM_TRACING_ENABLED=false` environment variable in addition to the `DD_APPSEC_ENABLED=true` environment variable.
2. This configuration will reduce the amount of APM data sent to Datadog to the minimum required by App and API Protection products.

For more details, see [Standalone App and API Protection][standalone_billing_guide].
[standalone_billing_guide]: /security/application_security/guide/standalone_application_security/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://istio.io/
[2]: /containers/kubernetes/installation/?tab=datadogoperator
[3]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: /tracing/trace_collection/library_config/go/
[8]: /security/application_security/setup/threat_detection/
