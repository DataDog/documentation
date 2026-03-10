---
title: Enabling App and API Protection for GKE
aliases:
    - /security/application_security/setup/gke
code_lang: gke
code_lang_weight: 45
further_reading:
- link: 'https://github.com/DataDog/dd-trace-go/tree/main/contrib/envoyproxy/go-control-plane/cmd/serviceextensions'
  tag: 'Source Code'
  text: 'App and API Protection Service Extension source code'
- link: 'https://cloud.google.com/kubernetes-engine/docs/how-to/configure-gke-service-extensions'
  tag: 'Documentation'
  text: 'Customize GKE Gateway traffic using Service Extensions'
- link: '/security/default_rules/?category=cat-application-security'
  tag: 'Documentation'
  text: 'OOTB App and API Protection Rules'
- link: '/security/application_security/setup/compatibility/gcp-service-extensions'
  tag: 'Documentation'
  text: 'GCP Service Extensions compatibility requirements'
- link: '/security/application_security/troubleshooting'
  tag: 'Documentation'
  text: 'Troubleshooting App and API Protection'
---

{{< callout url="#" btn_hidden="true" header="App and API Protection for GKE is in Preview" >}}
Use the following setup instructions to try the preview of App and API Protection for GKE.
{{< /callout >}}

You can enable App and API Protection for services exposed through Google Kubernetes Engine (GKE) Gateway by using Google Cloud Service Extensions and the Datadog external processor. This integration inspects traffic at the load balancer layer for threat detection and blocking.

If your application uses Google Cloud Load Balancing outside Kubernetes, see [Enabling App and API Protection for GCP Service Extensions][6].

## Prerequisites

-   A GKE Standard or Autopilot cluster running GKE 1.33 or later.
-   A VPC-native GKE cluster with the `HttpLoadBalancing` add-on enabled.
-   Gateway API enabled on the cluster. If you need to enable it, follow the [GKE Gateway deployment guide][4].
-   A Gateway and HTTPRoute that use a GatewayClass supported by `GCPTrafficExtension`. Google Cloud supports `gke-l7-global-external-managed`, `gke-l7-regional-external-managed`, and `gke-l7-rilb`.
-   If you use `gke-l7-regional-external-managed` or `gke-l7-rilb`, configure the proxy-only subnet required by Google Cloud for regional GatewayClasses.
-   The Compute Engine API and Network Services API enabled in your GCP project.
-   A Datadog Agent deployment in the cluster with APM enabled so the external processor can send traces to Datadog. If you want to block requests from the Datadog UI, Remote Configuration must also be enabled.
-   A single namespace for the Gateway, the `GCPTrafficExtension`, and the Datadog service extension `Service`. Google Cloud requires these resources to stay in the same namespace.

## Enabling threat detection

### Step 1: install or verify the Datadog Agent

Install the Agent on GKE with the [Datadog Operator or Helm chart][1], then confirm [APM is enabled][2]. If you plan to use blocking, set up [Remote Configuration][3].

<div class="alert alert-info">
  <strong>Note:</strong> Datadog recommends installing the Agent with the Datadog Operator or Helm chart instead of storing API keys in raw Kubernetes manifests.
</div>

### Step 2: deploy the Datadog service extension backend

Deploy the Datadog external processor as a Kubernetes `Deployment`, expose it with a `Service`, and attach a `HealthCheckPolicy` for the Gateway load balancer.

Save the following manifest as `datadog-service-extension.yaml`:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
    name: datadog-service-extension
    namespace: datadog
spec:
    replicas: 2
    selector:
        matchLabels:
            app: datadog-service-extension
    template:
        metadata:
            labels:
                app: datadog-service-extension
        spec:
            containers:
                - name: datadog-service-extension
                  image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0
                  ports:
                      - name: grpc
                        containerPort: 443
                      - name: health
                        containerPort: 80
                  env:
                      - name: DD_AGENT_HOST
                        value: 'datadog-agent.datadog.svc.cluster.local'
                      - name: DD_TRACE_AGENT_PORT
                        value: '8126'
                      - name: DD_SERVICE
                        value: 'gke-service-extension'
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
    name: datadog-service-extension
    namespace: datadog
spec:
    selector:
        app: datadog-service-extension
    ports:
        - name: grpc
          port: 443
          targetPort: grpc
          appProtocol: HTTP2
        - name: health
          port: 80
          targetPort: health
---
apiVersion: networking.gke.io/v1
kind: HealthCheckPolicy
metadata:
    name: datadog-service-extension
    namespace: datadog
spec:
    targetRef:
        group: ''
        kind: Service
        name: datadog-service-extension
    default:
        config:
            type: HTTP
            httpHealthCheck:
                portSpecification: USE_FIXED_PORT
                port: 80
                requestPath: /
```

Apply the manifest:

```bash
kubectl apply -f datadog-service-extension.yaml
```

<div class="alert alert-info">
  <strong>Note:</strong> GKE callout backends require TLS. The Datadog service extension image keeps gRPC TLS enabled by default, so do not set <code>DD_SERVICE_EXTENSION_TLS=false</code> for this deployment.
</div>

<div class="alert alert-info">
  <strong>Note:</strong> GKE Gateway does not infer health checks for Gateway backends. If your health endpoint is not <code>GET /</code> on port <code>80</code>, update the <code>HealthCheckPolicy</code> to match your deployment.
</div>

### Step 3: create or reuse a `Gateway` and `HTTPRoute`

If you already have a GKE Gateway and HTTPRoute, you can reuse them. Otherwise, create a Gateway and route that expose your application.

For example, save the following as `gateway.yaml`:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
    name: external-http
    namespace: datadog
spec:
    gatewayClassName: gke-l7-global-external-managed
    listeners:
        - name: http
          protocol: HTTP
          port: 80
          allowedRoutes:
              namespaces:
                  from: All
---
apiVersion: gateway.networking.k8s.io/v1
kind: HTTPRoute
metadata:
    name: app-route
    namespace: datadog
spec:
    parentRefs:
        - kind: Gateway
          name: external-http
    rules:
        - backendRefs:
              - name: my-app
                namespace: app
                port: 80
```

If the `HTTPRoute` references a backend `Service` in a different namespace, add a `ReferenceGrant` in the backend `Service` namespace:

```yaml
apiVersion: gateway.networking.k8s.io/v1beta1
kind: ReferenceGrant
metadata:
    name: allow-datadog-route
    namespace: app
spec:
    from:
        - group: gateway.networking.k8s.io
          kind: HTTPRoute
          namespace: datadog
    to:
        - group: ''
          kind: Service
          name: my-app
```

Apply the manifests:

```bash
kubectl apply -f gateway.yaml
```

### Step 4: attach the `GCPTrafficExtension`

Create a `GCPTrafficExtension` that points to the Datadog service extension backend.

Save the following manifest as `gcp-traffic-extension-datadog.yaml`:

```yaml
apiVersion: networking.gke.io/v1
kind: GCPTrafficExtension
metadata:
    name: datadog-appsec-extension
    namespace: datadog
spec:
    targetRefs:
        - group: gateway.networking.k8s.io
          kind: Gateway
          name: external-http
    extensionChains:
        - name: datadog-chain
          matchCondition:
              celExpressions:
                  - celMatcher: 'true'
          extensions:
              - name: datadog-appsec
                authority: 'datadog-service-extension.datadog.svc.cluster.local'
                timeout: 1s
                supportedEvents:
                    - RequestHeaders
                    - ResponseHeaders
                backendRef:
                    group: ''
                    kind: Service
                    name: datadog-service-extension
                    port: 443
```

Apply the manifest:

```bash
kubectl apply -f gcp-traffic-extension-datadog.yaml
```

<div class="alert alert-info">
  <strong>Note:</strong> The <code>authority</code> field is required when <code>backendRef</code> points to a Kubernetes <code>Service</code>. The backend <code>Service</code> must use <code>appProtocol: HTTP2</code>.
</div>

<div class="alert alert-info">
  <strong>Note:</strong> Google Cloud allows one traffic extension per forwarding rule. If your Gateway already uses a traffic extension, update that extension instead of creating a second top-level traffic extension. This example also keeps the default fail-closed behavior because <code>failOpen</code> is not set.
</div>

### Optional: enable body inspection

To inspect request or response bodies, set `DD_APPSEC_BODY_PARSING_SIZE_LIMIT` on the Datadog service extension container and extend the `GCPTrafficExtension` to send bodies. Google Cloud supports body send modes only when `backendRef` points to a Kubernetes `Service`.

For example:

```yaml
supportedEvents:
    - RequestHeaders
    - ResponseHeaders
    - RequestBody
    - ResponseBody
requestBodySendMode: Streamed
responseBodySendMode: Streamed
```

If you enable body inspection, increase the `timeout` value to account for larger payloads.

### Step 5: validate the installation

Verify that the Kubernetes resources are ready:

```bash
kubectl get pods,svc,healthcheckpolicy -n datadog
kubectl get gateway,httproute,gcptrafficextension -n datadog
```

Then send traffic through the Gateway and confirm that the requests appear in Datadog.

{{% appsec-getstarted-2-plusrisk %}}

{{< img src="/security/application_security/appsec-getstarted-threat-and-vuln_2.mp4" alt="Video showing Signals explorer and details, and Vulnerabilities explorer and details." video="true" >}}

## Configuration

The Datadog service extension image supports the following configuration settings:

| Environment variable                    | Default value       | Description                                                                                                                                                                             |
| --------------------------------------- | ------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `DD_SERVICE_EXTENSION_HOST`             | `0.0.0.0`           | gRPC server listening address.                                                                                                                                                          |
| `DD_SERVICE_EXTENSION_PORT`             | `443`               | gRPC server port.                                                                                                                                                                       |
| `DD_SERVICE_EXTENSION_HEALTHCHECK_PORT` | `80`                | HTTP server port for health checks.                                                                                                                                                     |
| `DD_APPSEC_BODY_PARSING_SIZE_LIMIT`     | `0`                 | Maximum size of request or response bodies to inspect in bytes. If set to `0`, Datadog does not inspect bodies. Datadog recommends `10000000` (10 MB) when body inspection is required. |
| `DD_SERVICE`                            | `serviceextensions` | Service name shown in Datadog.                                                                                                                                                          |

Configure the connection from the service extension to the Datadog Agent with the following environment variables:

| Environment variable  | Default value | Description                           |
| --------------------- | ------------- | ------------------------------------- |
| `DD_AGENT_HOST`       | `localhost`   | Hostname or IP of your Datadog Agent. |
| `DD_TRACE_AGENT_PORT` | `8126`        | Port used for trace collection.       |

The GKE service extension integration is built on top of the [Datadog Go Tracer][7] and inherits its environment variables. See [Configuring the Go Tracing Library][8] and [App and API Protection Library Configuration][9].

## Limitations

The GKE integration has the following limitations:

-   App and API Protection on GKE uses Google Cloud Service Extensions, which is a Preview feature in GKE.
-   The Gateway, `GCPTrafficExtension`, and Datadog service extension `Service` must stay in the same namespace.
-   The backend `Service` referenced by `GCPTrafficExtension` must use `appProtocol: HTTP2`.
-   Google Cloud allows one traffic extension per forwarding rule.
-   App and API Protection does not support GCP Service Extensions observability mode.

For image version and feature compatibility details, see the [GCP Service Extensions compatibility page][10].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/distributions/#gke
[2]: /containers/kubernetes/apm/
[3]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[4]: https://cloud.google.com/kubernetes-engine/docs/how-to/deploying-gateways
[5]: https://cloud.google.com/kubernetes-engine/docs/how-to/configure-gke-service-extensions
[6]: /security/application_security/setup/gcp/service-extensions
[7]: https://github.com/DataDog/dd-trace-go
[8]: /tracing/trace_collection/library_config/go/
[9]: /security/application_security/policies/library_configuration/
[10]: /security/application_security/setup/compatibility/gcp-service-extensions
