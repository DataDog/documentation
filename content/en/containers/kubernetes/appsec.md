---
title: App and API Protection for Kubernetes
description: Automatically enable App and API Protection for your Kubernetes ingress proxies and gateways
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
- **Automatically detects** supported proxies in your cluster (Envoy Gateway, Istio)
- **Configures proxies** to route traffic through an external Application Security processor
- **Enables threat detection** for all traffic passing through your ingress layer
- **Simplifies operations** through centralized configuration with Helm

### Supported proxies

- **Envoy Gateway**: Automatically creates `EnvoyExtensionPolicy` resources
- **Istio**: Automatically creates `EnvoyFilter` resources in the Istio system namespace

More proxies are available via manual installation on the global [setup page][10].

## Limitations

- Requires Datadog Cluster Agent 7.73.0 or later
- External processor must be manually deployed and scaled
- Deployed service may require an appropriate network policy:
  - From the proxy pods on the service port
  - To the Datadog Agent for traces
- For specific proxy version compatibility, see:
  - [Envoy Gateway compatibility][8]
  - [Istio compatibility][9]

## Prerequisites

Before enabling App and API Protection for Kubernetes, ensure you have:

- 1. A running Kubernetes cluster (version 1.20 or later)
- 2. [Datadog Cluster Agent 7.73.0+][1] installed and configured in your cluster
- 3. One or more supported proxies installed:
-   - [Envoy Gateway][2]
-   - [Istio][3]
- 4. [Remote Configuration][4] enabled to allow blocking attackers through the Datadog UI

## How it works

App and API Protection for Kubernetes uses **External Mode**, where a single Application Security processor deployment serves all gateway traffic in your cluster.

### Architecture

-  **External Processor Deployment**: You deploy a centralized Application Security processor as a Kubernetes Deployment with an associated Service.
-  **Automatic Proxy Detection**: The controller watches for supported proxy resources in your cluster using Kubernetes informers.
-  **Automatic Configuration**: When proxies are detected, the controller creates the necessary configuration:
   - For Envoy Gateway: Creates `EnvoyExtensionPolicy` resources that reference the external processor service
   - For Istio: Creates `EnvoyFilter` resources in the Istio system namespace
-  **Traffic Processing**: Gateways route traffic to the external processor via the Kubernetes service for security analysis.

### Benefits

- **Resource Efficient**: A single shared processor handles traffic from all gateways
- **Centralized Management**: One deployment to monitor, scale, and configure
- **Infrastructure-as-Code**: Manage configuration through Helm values
- **Non-Invasive**: No application code changes required
- **Scalable**: Easily add new gateways without additional configuration

## Setup

### Step 1: Deploy the external processor

Deploy the Datadog Application Security external processor service. This processor analyzes traffic forwarded from your gateways.

For detailed deployment instructions and configuration options, see the [Envoy Gateway documentation][6] or [Istio documentation][7].

Example processor deployment:

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

Enable automatic configuration in the Datadog Cluster Agent and configure it to use your external processor service.

Configure App and API Protection for Kubernetes using Helm values. Add the following to your `values.yaml`:

```yaml
datadog:
  appsec:
    injector:
      enabled: true

      # Enable automatic proxy detection (enabled by default)
      autoDetect: true

      # External processor configuration (required)
      processor:
        service:
          name: datadog-aap-extproc-service # Required: name of the processor service
          namespace: datadog                # Optional: defaults to Cluster Agent namespace
        port: 443
```

Install or upgrade the Datadog Helm chart:

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

### Step 3: Verify installation

After applying your configuration, verify the Datadog Cluster Agent has started automatic configuration:

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

Look for log messages indicating it has started and detected proxies.

#### Verify proxy configuration

For **Envoy Gateway**, check that `EnvoyExtensionPolicy` resources were created:

```bash
kubectl get envoyextensionpolicy -A
```

For **Istio**, check that `EnvoyFilter` resources were created:

```bash
kubectl get envoyfilter -n istio-system
```

The Datadog Cluster Agent will produce events for each operation done in the cluster whenever it resulted in failure or success.

#### Test traffic processing

Send requests through your gateway and verify they appear in the Datadog App and API Protection UI:

1. Navigate to [Security > Application Security][5] in Datadog.
2. Look for security signals from your gateway traffic.
3. Verify that threat detection is active.

## Configuration reference

### Automatic configuration options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | Boolean | `false` | Enable or disable automatic configuration for App and API Protection for Kubernetes |
| `autoDetect` | Boolean | `true` | Automatically detect and configure supported proxies |
| `proxies` | Array | `[]` | Manual list of proxy types to configure. Valid values: `"envoy-gateway"`, `"istio"` |
| `processor.service.name` | String |   | **Required.** Name of the external processor Kubernetes Service |
| `processor.service.namespace` | String | Cluster Agent namespace | Namespace where the external processor Service is deployed. Defaults to the namespace where the Cluster Agent is running |
| `processor.address` | String | `{service.name}.{service.namespace}.svc` | (Optional) Full service address override |
| `processor.port` | Integer | `443` | Port of the external processor service |

### Proxy types

- `envoy-gateway`: Configures Envoy Gateway using `EnvoyExtensionPolicy` resources
- `istio`: Configures Istio using global `EnvoyFilter` resources in the Istio system namespace

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

Resources with the `appsec.datadoghq.com/enabled: "false"` label will be ignored. This is useful when you want to:
- Manually configure specific gateways
- Temporarily disable App and API Protection for testing
- Exclude certain gateways from security monitoring

**Note**: By default, all resources are included. Only resources with the label explicitly set to `"false"` are excluded.

## Troubleshooting

All errors are logged as Kubernetes events. Make sure to check for events on the Gateway or GatewayClass you wish to instrument.

### Automatic configuration not detecting proxies

**Symptom**: No `EnvoyExtensionPolicy` or `EnvoyFilter` resources are created.

**Solutions**:
- Check that `autoDetect` is set to `true` or proxies are manually specified
- Verify the Cluster Agent logs for proxy detection messages
- Ensure your proxies are installed and have the expected Kubernetes resources (Gateway, GatewayClass)
- Try manually specifying proxy types using the `proxies` parameter

### EnvoyExtensionPolicy or EnvoyFilter not created

**Symptom**: The controller is running but configuration resources are missing.

**Solutions**:
- Check Cluster Agent logs for RBAC permission errors
- Verify the Cluster Agent service account has permissions to create `EnvoyExtensionPolicy` or `EnvoyFilter` resources
- Ensure the processor service exists and is accessible
- Check for conflicting existing policies or filters

### Traffic not being processed

**Symptom**: No security events appear in the Datadog UI.

**Solutions**:
- Verify the external processor deployment is running: `kubectl get pods -n datadog -l app=datadog-aap-extproc`
- Look for warning logs in your reverse proxies concerning this part of the configuration.
- Check processor logs for connection errors: `kubectl logs -n datadog -l app=datadog-aap-extproc`
- Verify the processor service is correctly configured and resolvable
- Test connectivity from gateway pods to the processor service
- Ensure [Remote Configuration][4] is enabled in your Datadog Agent

### External processor connection issues

**Symptom**: Gateways cannot reach the external processor.

**Solutions**:
- Verify the processor service name and namespace match your configuration
- Check for NetworkPolicy rules blocking cross-namespace traffic
- For Envoy Gateway: Ensure `ReferenceGrant` resources exist for cross-namespace service references
- Test DNS resolution from gateway pods: `nslookup datadog-aap-extproc-service.datadog.svc.cluster.local`
- Verify the processor port configuration matches the service definition

### RBAC permission errors

**Symptom**: Cluster Agent logs show permission denied errors.

**Solutions**:
- Verify the Cluster Agent ClusterRole includes permissions for:
  - `gateway.envoyproxy.io/envoyextensionpolicies`
  - `networking.istio.io/envoyfilters`
  - `gateway.networking.k8s.io/gateways`
  - `gateway.networking.k8s.io/gatewayclasses`
- Check that the ClusterRoleBinding references the correct service account
- Make sure you are using the newest version of the Datadog Helm Chart or Operator.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/installation/
[2]: https://gateway.envoyproxy.io/
[3]: https://istio.io/
[4]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec
[6]: /security/application_security/setup/kubernetes/envoy-gateway
[7]: /security/application_security/setup/kubernetes/istio
[8]: /security/application_security/setup/compatibility/envoy-gateway
[9]: /security/application_security/setup/compatibility/istio
[10]: /security/application_security/setup/kubernetes/
[11]: /security/application_security/