---
title: Kubernetes Application Security - Appsec Injector
description: Automatically enable Application Security monitoring for ingress proxies and gateways in Kubernetes
aliases:
    - /agent/kubernetes/appsec
further_reading:
- link: "/containers/kubernetes/apm/"
  tag: "Documentation"
  text: "Collect your application traces"
- link: "/containers/kubernetes/log/"
  tag: "Documentation"
  text: "Collect your application logs"
- link: "/security/application_security/setup/kubernetes/appsec-injector"
  tag: "Documentation"
  text: "Appsec Injector detailed documentation"
- link: "/security/application_security/setup/kubernetes/envoy-gateway"
  tag: "Documentation"
  text: "App and API Protection for Envoy Gateway"
- link: "/security/application_security/setup/kubernetes/istio"
  tag: "Documentation"
  text: "App and API Protection for Istio"
---

{{< callout url="#" btn_hidden="true" header="Appsec Injector is in Preview" >}}
The Appsec Injector feature is in Preview. Use the following instructions to try the preview.
{{< /callout >}}

This page describes how to set up the Datadog Appsec Injector to automatically enable Application Security monitoring for your Kubernetes ingress proxies and gateways.

## Overview

The Datadog Appsec Injector automatically configures ingress proxies and gateways in your Kubernetes cluster to enable Application Security monitoring. This eliminates the need for manual proxy configuration and provides API-wide security coverage without modifying individual services or deploying tracers across your application fleet.

### How it works

The Appsec Injector:
1. **Detects proxies**: Automatically discovers supported proxies (Envoy Gateway, Istio) in your cluster
2. **Configures routing**: Creates proxy configuration resources to route traffic through an external Application Security processor
3. **Enables monitoring**: Allows the processor to analyze traffic for security threats and attacks

### Supported proxies

- **Envoy Gateway**: Automatically creates `EnvoyExtensionPolicy` resources
- **Istio**: Automatically creates `EnvoyFilter` resources in the Istio system namespace

## Setup

### Prerequisites

Before enabling the Appsec Injector, ensure you have:

1. A running Kubernetes cluster (version 1.20 or later)
2. [Datadog Cluster Agent 7.73.0+][1] installed and configured in your cluster
3. One or more supported proxies installed:
   - [Envoy Gateway][2]
   - [Istio][3]
4. [Remote Configuration][4] enabled to allow blocking attackers through the Datadog UI

### Step 1: Deploy the external processor

Deploy the Datadog Application Security external processor service. This processor analyzes traffic forwarded from your gateways.

Create a Kubernetes Deployment and Service:

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

### Step 2: Enable the Appsec Injector

Configure the Appsec Injector using Helm values. Add the following to your `values.yaml`:

```yaml
datadog:
  appsec:
    injector:
      # Enable the Appsec Injector
      enabled: true

      # Enable automatic proxy detection (recommended)
      autoDetect: true

      # External processor configuration
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
        port: 443
```

Install or upgrade the Datadog Helm chart:

```bash
helm upgrade -i datadog-agent datadog/datadog -f values.yaml
```

### Step 3: Verify the setup

Verify the injector is running and has detected your proxies:

```bash
# Check Cluster Agent logs
kubectl logs -n datadog deployment/datadog-cluster-agent | grep "appsec.*injector"

# For Envoy Gateway - check for created policies
kubectl get envoyextensionpolicy -A

# For Istio - check for created filters
kubectl get envoyfilter -n istio-system
```

## Configuration options

### Manual proxy specification

Instead of auto-detection, you can explicitly list the proxy types to configure:

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      autoDetect: false
      proxies:
        - envoy-gateway
        - istio
      processor:
        service:
          name: datadog-aap-extproc-service
          namespace: datadog
        port: 443
```

### Processor configuration

Customize the external processor service connection:

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `processor.service.name` | String | - | Name of the external processor Kubernetes Service |
| `processor.service.namespace` | String | - | Namespace where the external processor Service is deployed |
| `processor.address` | String | - | (Optional) Full service address. Defaults to `{service.name}.{service.namespace}.svc` |
| `processor.port` | Integer | `443` | Port of the external processor service |

## Validation

After enabling the Appsec Injector, verify that Application Security monitoring is active:

### Check proxy configuration

For **Envoy Gateway**, verify that `EnvoyExtensionPolicy` resources were created:

```bash
kubectl get envoyextensionpolicy -A
kubectl describe envoyextensionpolicy <policy-name> -n <namespace>
```

For **Istio**, verify that `EnvoyFilter` resources were created:

```bash
kubectl get envoyfilter -n istio-system
kubectl describe envoyfilter <filter-name> -n istio-system
```

### Test traffic processing

Send test requests through your gateway and verify they appear in the Datadog App and API Protection UI:

1. Navigate to [Security > Application Security][5] in Datadog
2. Look for security signals from your gateway traffic
3. Verify that threat detection is active

## Troubleshooting

### Injector not detecting proxies

**Check Cluster Agent logs:**

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

**Verify configuration:**
- Ensure `autoDetect: true` is set or proxies are manually specified
- Confirm your proxies are installed and have the expected Kubernetes resources

### EnvoyExtensionPolicy or EnvoyFilter not created

**Check for RBAC permission errors:**

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep -i permission
```

**Verify the Cluster Agent has permissions for:**
- `gateway.envoyproxy.io/envoyextensionpolicies` (create, update, delete, get, list, watch)
- `networking.istio.io/envoyfilters` (create, update, delete, get, list, watch)
- `gateway.networking.k8s.io/gateways` (get, list, watch)
- `gateway.networking.k8s.io/gatewayclasses` (get, list, watch)

### Traffic not being processed

**Verify the external processor is running:**

```bash
kubectl get pods -n datadog -l app=datadog-aap-extproc
kubectl logs -n datadog -l app=datadog-aap-extproc
```

**Check connectivity:**
- Verify the processor service exists: `kubectl get svc -n datadog datadog-aap-extproc-service`
- Test DNS resolution from gateway pods
- Check for NetworkPolicy rules blocking cross-namespace traffic

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/installation/
[2]: https://gateway.envoyproxy.io/
[3]: https://istio.io/
[4]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: https://app.datadoghq.com/security/appsec
