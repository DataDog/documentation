---
title: Enabling App and API Protection for Istio
code_lang: istio
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
To try the preview of App and API Protection for Istio, use the following setup instructions.
{{< /callout >}}

You can enable App and API Protection for your services within an Istio service mesh. The Datadog Istio integration allows Datadog to inspect and protect your traffic for threat detection and blocking directly at the edge of your infrastructure. This can be applied at the Istio Ingress Gateway or at the sidecar level.

## Prerequisites

Before you begin, ensure you have the following:

1. A running Kubernetes cluster with [Istio][1] installed.
2. The [Datadog Agent is installed and configured][2] in your Kubernetes cluster.
    - Ensure [Remote Configuration][3] is enabled and configured to enable blocking attackers through the Datadog UI.
    - Ensure [APM is enabled][4] in the Agent. *This allows the external processor service to send its own traces to the Agent.*
      - Optionally, enable the [Cluster Agent Admission Controller][5] to automatically inject the Datadog Agent host information to the App and API Protection External Processor service.

## Automated configuration with Appsec Injector

<div class="alert alert-info">
  The Appsec Injector can automatically configure your Istio service mesh for Application Security monitoring. This is the recommended approach for most users as it eliminates manual configuration and simplifies operations.
</div>

Instead of manually deploying the external processor and configuring `EnvoyFilter` (as shown in the manual configuration section below), use the Appsec Injector to handle this automatically.

### When to use the Appsec Injector

Use the Appsec Injector if you want to:
- Automatically configure Istio ingress gateways for Application Security
- Simplify deployment and ongoing maintenance
- Manage configuration through infrastructure-as-code with Helm
- Centralize Application Security processor management

### Quick setup

**1. Deploy the external processor** using the deployment manifest shown in [Step 1](#1-deploy-the-datadog-external-processor-service) below.

**2. Enable the Appsec Injector** using Helm values:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      autoDetect: true
      processor:
        service:
          name: datadog-aap-extproc-service  # Required: name of the processor service
          namespace: datadog                  # Optional: defaults to Cluster Agent namespace
        port: 443
```

Install or upgrade the Datadog Helm chart:

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

**3. The injector automatically:**
- Detects your Istio installation
- Creates `EnvoyFilter` resources in the Istio system namespace (typically `istio-system`)
- Configures the filters to route traffic to the external processor

**4. Verify** the configuration by checking for created filters:

```bash
kubectl get envoyfilter -n istio-system
```

For detailed configuration options, advanced features, and troubleshooting, see the [Appsec Injector documentation](/containers/kubernetes/appsec).

## Manual configuration (alternative)

If you prefer manual configuration or need fine-grained control over specific gateways or sidecars, follow the instructions below. Enabling the threat detection for Istio involves two main steps:
1. Deploying the Datadog External Processor service.
2. Configuring an `EnvoyFilter` to direct traffic from your Istio Ingress Gateway (or sidecars) to this service.

### 1. Deploy the Datadog External Processor Service

This service is a gRPC server that Envoy communicates with to have requests and responses analyzed by App and API Protection.

Create a Kubernetes Deployment and Service for the Datadog External Processor. It's recommended to deploy this service in a namespace accessible by your Istio Ingress Gateway.

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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.2.2 # Replace with the latest released version
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

#### Configuration options for the External Processor

The Datadog External Processor exposes some settings:

| Environment variable                      | Default value       | Description                                                                                                                              |
|-------------------------------------------|---------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| `DD_SERVICE_EXTENSION_HOST`               | `0.0.0.0`           | gRPC server listening address.                                                                                                           |
| `DD_SERVICE_EXTENSION_PORT`               | `443`               | gRPC server port.                                                                                                                        |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT`   | `80`                | HTTP server port for health checks.                                                                                                      |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`       | `0`                 | Maximum size of the bodies to be processed in bytes. If set to `0`, the bodies are not processed. The recommended value is `10000000` (10MB). (To fully enable body processing, the `allow_mode_override` option should also be set in the External Processing filter configuration) |
| `DD_SERVICE_EXTENSION_OBSERVABILITY_MODE` | `false`             | Enable asynchronous analysis of requests. This also disables blocking capabilities. (To fully enable observability mode, this option should also be set in the External Processing filter configuration) |
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

### 2. Configure an EnvoyFilter

Next, create an `EnvoyFilter` resource to instruct your Istio Ingress Gateway or specific sidecar proxies to send traffic to the `datadog-aap-extproc-service` you deployed. This filter tells Envoy how to connect to the external processor and what traffic to send.

Choose the appropriate configuration based on whether you want to apply App and API Protection at the Ingress Gateway or directly on your application's sidecar proxies.

{{< tabs >}}
{{% tab "Istio Ingress Gateway" %}}

This configuration applies App and API Protection to all traffic passing through your Istio Ingress Gateway. This is a common approach to protect all North-South traffic entering your service mesh.

Below is an example manifest (`datadog-aap-gateway-filter.yaml`) that targets the default Istio Ingress Gateway that typically runs in the `istio-system` namespace with the label `istio: ingressgateway`.

**Note**: Please read the provided example configuration carefully and adapt it to match your infrastructure and environment. You can find more configuration options available in the [Envoy external processor documentation][10].

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
    # Patch to add the External Processing Filter to the Gateway's HTTP connection manager
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
        # Insert this filter before the router filter. This filter needs to be the earliest filter in the chain to process malicious traffic before the data is sent to an application.
        operation: INSERT_BEFORE
        value:
          name: envoy.filters.http.ext_proc
          typed_config:
            "@type": type.googleapis.com/envoy.extensions.filters.http.ext_proc.v3.ExternalProcessor
            grpc_service:
              envoy_grpc:
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the external processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The external processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the external processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the external processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The external processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the External Processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the cluster definition for the Datadog External Processing service
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
    # Patch to add the External Processing HTTP Filter to the Sidecar's connection manager
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
                cluster_name: datadog_aap_ext_proc_cluster

              ## Mandatory: Correctly show the service as an Envoy proxy in the UI.
              initial_metadata:
                - key: x-datadog-envoy-integration
                  value: '1'

              ## A timeout configuration for the grpc connection exist but is not useful in our case.
              ## This timeout is for all the request lifetime. A timeout on the route is preferred.
              #timeout: 0s

            ## Optional: Enable fail open mode. Default is false.
            ## Normally, if the external processor fails or times out, the filter fails and Envoy
            ## returns a 5xx error to the downstream client. Setting this to true allows requests
            ## to continue without error if a failure occurs.
            failure_mode_allow: true # It won't cause 5xx error if an error occurs.

            ## Mandatory: Only enable the request and response header modes.
            ## If you want to enable body processing, please see the section below.
            processing_mode:
              request_header_mode: SEND
              response_header_mode: SEND

            ## Optional for headers analysis only but **mandatory** for body processing.
            ## The external processor can dynamically override the processing mode as needed instructing
            ## Envoy to forward request and response bodies to the external processor. Body processing is
            ## enabled when DD_APPSEC_BODY_PARSING_SIZE_LIMIT is set on the external processor container.
            allow_mode_override: true

            ## Optional: Set a timeout by processing message. Default is 200ms.
            ## There is a maxium of 2 messages per requests with headers only and 4 messages maximum
            ## with body processing enabled.
            ## Note: This timeout also includes the data communication between Envoy and the external processor.
            ## Optional: When the body processing is enabled, the timeout should be adjusted to accommodate
            ## the additional possible processing time. Larger payloads will require a longer timeout. 
            #message_timeout: 200ms

            ## Optional: Enable asynchronous mode analysis. Default is false.
            ## This mode will disable all blocking capabilities. The external processor should also be
            ## configured with the DD_SERVICE_EXTENSION_OBSERVABILITY_MODE environment variable.
            ## Beware, there is no flow control implemented in Envoy
            ## (cf https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto#envoy-v3-api-field-extensions-filters-http-ext-proc-v3-externalprocessor-observability-mode)
            #observability_mode: true
            ## Optional: When in asynchronous mode, the message_timeout is not used. This deferred
            ## timeout starts when the http request is finished, to let the External Processor
            ## process all processing messages. Default is 5s.
            #deferred_close_timeout: 5s


    # Patch to add the Cluster definition for the Datadog External Processing service
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
```

{{% /tab %}}
{{< /tabs >}}

After applying the chosen `EnvoyFilter`, traffic passing through your Istio Ingress Gateway or selected sidecars will be processed by the Datadog External Processor service, enabling App and API Protection features.

### 3. Validation

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Limitations

The Istio integration has the following limitations:

* Inspection of request and response bodies is supported when using the Datadog External Processor image version `v2.2.2` or later.

For additional details on the Istio integration compatibilities, refer to the [Istio integration compatibility page][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://istio.io/
[2]: /containers/kubernetes/installation/?tab=datadogoperator
[3]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: /tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator
[5]: /tracing/guide/setting_up_apm_with_kubernetes_service/?tab=datadogoperator#cluster-agent-admission-controller
[6]: https://github.com/DataDog/dd-trace-go/pkgs/container/dd-trace-go%2Fservice-extensions-callout
[7]: https://github.com/DataDog/dd-trace-go
[8]: /tracing/trace_collection/library_config/go/
[9]: /security/application_security/policies/library_configuration/
[10]: https://www.envoyproxy.io/docs/envoy/latest/api-v3/extensions/filters/http/ext_proc/v3/ext_proc.proto
[11]: /security/application_security/setup/compatibility/istio
