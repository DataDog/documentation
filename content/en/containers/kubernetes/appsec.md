---
title: App and API Protection for Kubernetes
description: Automatically enable App and API Protection for your Kubernetes ingress proxies and gateways
site_support_id: containers_kubernetes_appsec
aliases:
    - /agent/kubernetes/appsec
    - /security/application_security/setup/kubernetes/appsec-injector
further_reading:
- link: "/containers/kubernetes/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/containers/kubernetes/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/security/application_security/setup/kubernetes/envoy-gateway"
  tag: "Documentation"
  text: "App and API Protection for Envoy Gateway"
- link: "/security/application_security/setup/kubernetes/istio"
  tag: "Documentation"
  text: "App and API Protection for Istio"
- link: "/security/application_security/setup/nginx/ingress-controller"
  tag: "Documentation"
  text: "App and API Protection for ingress-nginx"
- link: "/security/default_rules/?category=cat-application-security"
  tag: "Documentation"
  text: "OOTB App and API Protection Rules"
- link: "/security/application_security/troubleshooting"
  tag: "Documentation"
  text: "Troubleshooting App and API Protection"
---

{{< learning-center-callout header="App and API Protection for Kubernetes is in Preview" btn_title="Join the preview" hide_image="true" btn_url="https://www.datadoghq.com/product-preview/kubernetes-gateway-security-injector/">}}
  App and API Protection for Kubernetes automatically configures supported Kubernetes ingress proxies and gateways. Try it today!
{{< /learning-center-callout >}}

This page describes how to set up [App and API Protection][11] for Kubernetes to automatically configure supported Kubernetes ingress proxies and gateways to run API discovery, threat detection, and inline blocking at the edge of the infrastructure.

## Overview

App and API Protection for Kubernetes automatically configures supported ingress proxies and gateways in your Kubernetes cluster to enable Application Security monitoring. This eliminates the need for manual proxy configuration and provides API-wide security coverage without modifying individual services or deploying tracers across your application fleet.

### What performs the automatic configuration?

App and API Protection for Kubernetes uses a Kubernetes controller (running in the Datadog Cluster Agent) that:
- **Automatically detects** supported proxies in your cluster
- **Configures proxies** to route traffic through an external Application Security processor
- **Enables threat detection** for all traffic passing through your ingress layer
- **Simplifies operations** through centralized configuration with Helm

### Supported proxies

For the list of supported proxies and proxy-specific setup steps, see the [setup page][10].

## Limitations

### Sidecar mode
- Requires Datadog Cluster Agent 7.80.2 or later
- Each gateway pod runs its own processor instance, which increases per-pod resource usage
- Datadog Operator does not support sidecar mode configuration

### External mode
- Requires Datadog Cluster Agent 7.80.2 or later
- Security processor must be manually deployed and scaled
- Deployed service may require an appropriate network policy:
  - From the proxy pods on the service port
  - To the Datadog Agent for traces

### Proxy compatibility
- For proxy version compatibility, see the [compatibility documentation][8].

## Prerequisites

Before enabling App and API Protection for Kubernetes, verify that you have:

- A running Kubernetes cluster (version 1.20 or later)
- [Datadog Cluster Agent 7.80.2+][1] installed and configured in your cluster
- One or more [supported proxies][10] installed
- [Remote Configuration][4] enabled to allow blocking attackers through the Datadog UI

## How it works

App and API Protection for Kubernetes supports two deployment modes:

- **Sidecar mode** (default): The Application Security processor runs as a sidecar container injected directly into each gateway pod. No separate processor deployment is needed, and the processor scales automatically with your gateway pods.
- **External mode**: A single, centralized Application Security processor deployment serves all gateway traffic in your cluster. Use this mode when you want to manage one shared processor for the whole cluster.

To set up the default sidecar mode, see [Set up sidecar mode](#set-up-sidecar-mode). To deploy a centralized processor instead, see [Set up external mode](#set-up-external-mode).

## Set up sidecar mode

In sidecar mode, the security processor runs as a container injected directly into each gateway pod. The Cluster Agent handles injection automatically, so you don't need a separate processor deployment or service.

### When to use sidecar mode

- You prefer not to manage a separate processor deployment and service
- You want the processor co-located with each gateway pod

### Setup

Add the following to your Helm `values.yaml`. No `processor.service.*` values are needed because the injector handles processor deployment automatically.

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      # mode defaults to "sidecar" when omitted
```

Install or upgrade the Datadog Helm chart (v3.153+):

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

<div class="alert alert-warning">
  Datadog Operator does not support sidecar mode configuration. Use Helm to configure sidecar mode.
</div>

### Sidecar configuration reference

All sidecar parameters are nested under `datadog.appsec.injector.sidecar` in your Helm `values.yaml`:

| Helm Parameter | Type | Default | Description |
|----------------|------|---------|-------------|
| `sidecar.image` | String | `ghcr.io/datadog/dd-trace-go/service-extensions-callout` | Sidecar container image |
| `sidecar.imageTag` | String | `v2.6.0` | Sidecar container image tag |
| `sidecar.port` | Integer | `8080` | gRPC listening port for the sidecar processor |
| `sidecar.healthPort` | Integer | `8081` | Health check port for the sidecar processor |
| `sidecar.bodyParsingSizeLimit` | Integer | `0` | Maximum request body size in bytes to process. `0` disables body processing. Use `-1` to disable body parsing entirely. |
| `sidecar.resources.requests.cpu` | String | `10m` | CPU request for the sidecar container |
| `sidecar.resources.requests.memory` | String | `128Mi` | Memory request for the sidecar container |
| `sidecar.resources.limits.cpu` | String | `""` | CPU limit for the sidecar container (optional) |
| `sidecar.resources.limits.memory` | String | `""` | Memory limit for the sidecar container (optional) |

## Set up external mode

In external mode, you deploy a single, centralized Application Security processor that serves all gateway traffic in your cluster. The Cluster Agent automatically configures your supported proxies to route traffic to this processor.

### Architecture

-  **Security Processor Deployment**: You deploy a centralized Application Security processor as a Kubernetes Deployment with an associated Service.
-  **Automatic Proxy Detection**: The controller watches for supported proxy resources in your cluster using Kubernetes informers.
-  **Automatic Configuration**: When proxies are detected, the controller creates the proxy configuration needed to route traffic to the security processor service.
-  **Traffic Processing**: Gateways route traffic to the security processor through the Kubernetes service for security analysis.

### Benefits

- **Resource Efficient**: A single shared processor handles traffic from all gateways
- **Centralized Management**: One deployment to monitor, scale, and configure
- **Infrastructure-as-Code**: Manage configuration through Helm values
- **Non-Invasive**: No application code changes required
- **Scalable**: Add new gateways without additional configuration

### Step 1: Deploy the security processor

Deploy the security processor service, which analyzes traffic forwarded from your gateways. For proxy-specific deployment details, see the [setup documentation][10] for your proxy.

Example deployment:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: datadog-aap-extproc-deployment
  namespace: datadog
spec:
  replicas: 2
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
        image: ghcr.io/datadog/dd-trace-go/service-extensions-callout:v2.4.0
        ports:
        - name: grpc
          containerPort: 443
        - name: health
          containerPort: 80
        env:
        # Use the address of the datadog agent service in your cluster
        - name: DD_AGENT_HOST
          value: "datadog-agent.datadog.svc.cluster.local"

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
  name: datadog-aap-extproc-service
  namespace: datadog
spec:
  ports:
  - name: grpc
    port: 443
    targetPort: grpc
  selector:
    app: datadog-aap-extproc
  type: ClusterIP
```

Apply the manifest:

```bash
kubectl apply -f datadog-aap-extproc-service.yaml
```

### Step 2: Enable automatic configuration

Point the Datadog Cluster Agent at your security processor service using Helm or the Datadog Operator.

**Note:** The processor service name (`datadog-aap-extproc-service`) must match the service you deployed in Step 1.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

This option requires Datadog Operator v1.22.0+.

Add annotations to your `DatadogAgent` resource. The service name annotation is required and must match your security processor service:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  annotations:
    agent.datadoghq.com/appsec.injector.enabled: "true"
    agent.datadoghq.com/appsec.injector.processor.service.name: "datadog-aap-extproc-service"  # Required: must match your security processor service name
    agent.datadoghq.com/appsec.injector.processor.service.namespace: "datadog"
spec:
  override:
    clusterAgent:
      env:
        - name: DD_CLUSTER_AGENT_APPSEC_INJECTOR_MODE
          value: "external"
```

Apply the configuration:

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Configure App and API Protection for Kubernetes using Helm values. Add the following to your `values.yaml`:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service  # Required: must match your security processor service name
          namespace: datadog                 # Must match the namespace where the service is deployed
```

Install or upgrade the Datadog Helm chart (v3.153+):

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

{{% /tab %}}
{{< /tabs >}}

### Step 3: Verify the installation

Check that the Cluster Agent detected your proxies:

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

#### Verify proxy configuration

Verify that the controller created the proxy configuration resources for your proxy. For proxy-specific verification commands, see the [setup documentation][10] for your proxy.

The Datadog Cluster Agent produces events for each operation that results in failure or success done in the cluster.

#### Test traffic processing

Send requests through your gateway and verify they appear in the Datadog [App and API Protection][5] UI:

1. Navigate to [Security > Application Security][5] in Datadog.
2. Look for security signals from your gateway traffic.
3. Verify that threat detection is active.

## Configuration reference

### Automatic configuration options

| Helm Parameter | Datadog Operator Annotation | Type | Default | Description |
|----------------|----------------------------|------|---------|-------------|
| `enabled` | `agent.datadoghq.com/appsec.injector.enabled` | Boolean | `false` | Enable or disable the integration |
| `mode` | N/A | String | `""`; when empty, defaults to sidecar | Injection mode: `"sidecar"` or `"external"` |
| `autoDetect` | `agent.datadoghq.com/appsec.injector.autoDetect` | Boolean | `true` | Automatically detect and configure supported proxies |
| `proxies` | `agent.datadoghq.com/appsec.injector.proxies` | JSON array | `[]` | Manual list of proxy types to configure. For valid values, see the [setup page][10]. |
| `processor.service.name` | `agent.datadoghq.com/appsec.injector.processor.service.name` | String |   | **Required.** Name of the security processor Kubernetes Service |
| `processor.service.namespace` | `agent.datadoghq.com/appsec.injector.processor.service.namespace` | String | Defaults to the namespace where the Cluster Agent is running | Namespace where the security processor service is deployed |
| `processor.address` | `agent.datadoghq.com/appsec.injector.processor.address` | String | `{service.name}.{service.namespace}.svc` | Full service address override |
| `processor.port` | `agent.datadoghq.com/appsec.injector.processor.port` | Integer | `443` | Port of the security processor service |

### Upgrading from external mode

If you are upgrading from a previous version that used external mode, the default mode has changed to sidecar. To continue using external mode, explicitly set `mode: "external"` in your Helm values:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      mode: "external"
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
```

### Opting out specific resources

You can exclude specific Gateway or GatewayClass resources from automatic configuration by adding a label:

```yaml
apiVersion: gateway.networking.k8s.io/v1
kind: Gateway
metadata:
  name: my-gateway
  namespace: my-namespace
  labels:
    appsec.datadoghq.com/enabled: "false"  # Exclude this gateway from automatic configuration
spec:
  # ... gateway configuration
```

Resources with the `appsec.datadoghq.com/enabled: "false"` label are ignored. This is useful when you want to:
- Manually configure specific gateways
- Temporarily disable App and API Protection for testing
- Exclude certain gateways from security monitoring

**Note**: By default, all resources are included. Only resources with the label explicitly set to `"false"` are excluded.

## Troubleshooting

All errors are logged as Kubernetes events. Check for events on the Gateway or GatewayClass you want to instrument.

### Automatic configuration not detecting proxies

**Symptom**: No proxy configuration resources are created.

**Solutions**:
- Check that `autoDetect` is set to `true` or proxies are manually specified
- Verify the Cluster Agent logs for proxy detection messages
- Verify that your proxies are installed and have the expected Kubernetes resources (Gateway, GatewayClass)
- Try manually specifying proxy types using the `proxies` parameter

### Proxy configuration not created

**Symptom**: The controller is running but configuration resources are missing.

**Solutions**:
- Check Cluster Agent logs for RBAC permission errors
- Verify the Cluster Agent service account has permissions to create the proxy configuration resources
- Verify that the processor service exists and is accessible
- Check for conflicting existing policies or filters

### Traffic not being processed

**Symptom**: No security events appear in the Datadog UI.

**Solutions**:
- Verify the security processor deployment is running: `kubectl get pods -n datadog -l app=datadog-aap-extproc`
- Look for warning logs in your reverse proxies concerning this part of the configuration.
- Check processor logs for connection errors: `kubectl logs -n datadog -l app=datadog-aap-extproc`
- Verify the processor service is correctly configured and resolvable
- Test connectivity from gateway pods to the processor service
- Verify that [Remote Configuration][4] is enabled in your Datadog Agent

### Security processor connection issues

**Symptom**: Gateways cannot reach the security processor.

**Solutions**:
- Verify the processor service name and namespace match your configuration
- Check for NetworkPolicy rules blocking cross-namespace traffic
- Test DNS resolution from gateway pods: `nslookup datadog-aap-extproc-service.datadog.svc.cluster.local`
- Verify the processor port configuration matches the service definition

### RBAC permission errors

**Symptom**: Cluster Agent logs show permission denied errors.

**Solutions**:
- Verify the Cluster Agent ClusterRole includes permissions for:
  - `gateway.networking.k8s.io/gateways`
  - `gateway.networking.k8s.io/gatewayclasses`
- Check that the ClusterRoleBinding references the correct service account
- Make sure you are using the newest version of the Datadog Helm Chart or Operator.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/installation/
[4]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec
[8]: /security/application_security/setup/compatibility/
[10]: /security/application_security/setup/kubernetes/
[11]: /security/application_security/
