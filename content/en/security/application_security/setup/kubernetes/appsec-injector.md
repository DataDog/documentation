---
title: Appsec Injector for Kubernetes
code_lang: appsec-injector
code_lang_weight: 10
further_reading:
  - link: "/security/application_security/setup/kubernetes/envoy-gateway"
    tag: "Documentation"
    text: "App and API Protection for Envoy Gateway"
  - link: "/security/application_security/setup/kubernetes/istio"
    tag: "Documentation"
    text: "App and API Protection for Istio"
  - link: "/containers/kubernetes/installation/"
    tag: "Documentation"
    text: "Installing the Datadog Agent on Kubernetes"
  - link: "/security/default_rules/?category=cat-application-security"
    tag: "Documentation"
    text: "OOTB App and API Protection Rules"
  - link: "/security/application_security/troubleshooting"
    tag: "Documentation"
    text: "Troubleshooting App and API Protection"
---

{{< callout url="#" btn_hidden="true" header="Appsec Injector is in Preview" >}}
The Appsec Injector feature is in Preview. Use the following instructions to try the preview.
{{< /callout >}}

## Overview

The Datadog Appsec Injector automatically configures ingress proxies and gateways in your Kubernetes cluster to enable Application Security monitoring. This eliminates the need for manual proxy configuration and provides API-wide security coverage without modifying individual services or deploying tracers across your application fleet.

### What is the Appsec Injector?

The Appsec Injector is a Kubernetes controller that:
- **Automatically detects** supported proxies in your cluster (Envoy Gateway, Istio)
- **Configures proxies** to route traffic through an external Application Security processor
- **Enables threat detection** for all traffic passing through your ingress layer
- **Simplifies operations** through centralized configuration with the Datadog Operator or Helm

### Supported proxies

- **Envoy Gateway**: Automatically creates `EnvoyExtensionPolicy` resources
- **Istio**: Automatically creates `EnvoyFilter` resources in the Istio system namespace

More proxies are available via manual installation on the global [setup page][9]

## Prerequisites

Before enabling the Appsec Injector, ensure you have:

1. A running Kubernetes cluster (version 1.20 or later)
2. [Datadog Cluster Agent 7.73.0+][1] installed and configured in your cluster
3. One or more supported proxies installed:
   - [Envoy Gateway][2]
   - [Istio][3]
4. [Remote Configuration][4] enabled to allow blocking attackers through the Datadog UI

## How it works

The Appsec Injector operates in **External Mode**, where a single Application Security processor deployment serves all gateway traffic in your cluster.

### Architecture

1. **External Processor Deployment**: You deploy a centralized Application Security processor as a Kubernetes Deployment with an associated Service.
2. **Automatic Proxy Detection**: The Appsec Injector controller watches for supported proxy resources in your cluster using Kubernetes informers.
3. **Automatic Configuration**: When proxies are detected, the injector creates the necessary configuration:
   - For Envoy Gateway: Creates `EnvoyExtensionPolicy` resources that reference the external processor service
   - For Istio: Creates `EnvoyFilter` resources in the Istio system namespace
4. **Traffic Processing**: Gateways route traffic to the external processor via the Kubernetes service for security analysis.

### Benefits

- **Resource Efficient**: A single shared processor handles traffic from all gateways
- **Centralized Management**: One deployment to monitor, scale, and configure
- **Infrastructure-as-Code**: Manage configuration through Datadog Operator CRDs or Helm values
- **Non-Invasive**: No application code changes required
- **Scalable**: Easily add new gateways without additional configuration

## Configuration

You can configure the Appsec Injector using either the Datadog Operator or Helm Chart.

{{< tabs >}}
{{% tab "Datadog Operator" %}}

Add the following configuration to your `DatadogAgent` custom resource:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  features:
    appsec:
      injector:
        # Enable the Appsec Injector
        enabled: true

        # Enable automatic proxy detection (recommended)
        autoDetect: true

        # Or manually specify proxy types to inject
        # proxies:
        #   - envoy-gateway
        #   - istio

        # External processor configuration
        processor:
          service:
            name: datadog-aap-extproc-service
            namespace: datadog
          port: 443
```

Apply the configuration:

```bash
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{% tab "Helm" %}}

Add the following configuration to your Helm `values.yaml`:

```yaml
datadog:
  appsec:
    injector:
      # Enable the Appsec Injector
      enabled: true

      # Enable automatic proxy detection (recommended)
      autoDetect: true

      # Or manually specify proxy types to inject
      # proxies:
      #   - envoy-gateway
      #   - istio

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

{{% /tab %}}
{{< /tabs >}}

## Setup

Follow these steps to enable the Appsec Injector in your cluster:

### 1. Deploy the external processor

Deploy the Datadog Application Security external processor service. This processor analyzes traffic forwarded from your gateways.

For detailed deployment instructions and configuration options, see the [Envoy Gateway documentation][5] or [Istio documentation][6].

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
        - name: DD_AGENT_HOST
          value: "datadog-agent.datadog.svc.cluster.local"
        - name: DD_SERVICE_EXTENSION_TLS
          value: "false"
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

### 2. Configure the Appsec Injector

Enable the injector and configure it to use your external processor service using the configuration shown in the [Configuration](#configuration) section above.

### 3. Enable auto-detection or specify proxies

**Auto-detection (recommended)**: Set `autoDetect: true` to automatically detect and configure all supported proxies in your cluster.

**Manual specification**: Alternatively, explicitly list the proxy types to configure:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

```yaml
spec:
  features:
    appsec:
      injector:
        enabled: true
        autoDetect: false
        proxies:
          - envoy-gateway
          - istio
```

{{% /tab %}}
{{% tab "Helm" %}}

```yaml
datadog:
  appsec:
    injector:
      enabled: true
      autoDetect: false
      proxies:
        - envoy-gateway
        - istio
```

{{% /tab %}}
{{< /tabs >}}

### 4. Apply configuration and verify

After applying your configuration, verify the injector is running:

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep appsec
```

Look for log messages indicating the injector has started and detected proxies.

## Validation

Verify that the Appsec Injector is working correctly:

### 1. Check injector status

View the Cluster Agent logs to confirm the injector is running:

```bash
kubectl logs -n datadog deployment/datadog-cluster-agent | grep "appsec.*injector"
```

### 2. Verify proxy configuration

For **Envoy Gateway**, check that `EnvoyExtensionPolicy` resources were created:

```bash
kubectl get envoyextensionpolicy -A
```

For **Istio**, check that `EnvoyFilter` resources were created:

```bash
kubectl get envoyfilter -n istio-system
```

### 3. Test traffic processing

Send requests through your gateway and verify they appear in the Datadog App and API Protection UI.

{{% appsec-getstarted-2-plusrisk %}}

## Configuration reference

### Injector options

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| `enabled` | Boolean | `false` | Enable or disable the Appsec Injector |
| `autoDetect` | Boolean | `true` | Automatically detect and configure supported proxies |
| `proxies` | Array | `[]` | Manual list of proxy types to configure. Valid values: `"envoy-gateway"`, `"istio"` |
| `processor.service.name` | String | - | Name of the external processor Kubernetes Service |
| `processor.service.namespace` | String | - | Namespace where the external processor Service is deployed |
| `processor.address` | String | - | (Optional) Full service address. Defaults to `{service.name}.{service.namespace}.svc` |
| `processor.port` | Integer | `443` | Port of the external processor service |

### Proxy types

- `envoy-gateway`: Configures Envoy Gateway using `EnvoyExtensionPolicy` resources
- `istio`: Configures Istio using global `EnvoyFilter` resources in the Istio system namespace

## Troubleshooting

### Injector not detecting proxies

**Symptom**: No `EnvoyExtensionPolicy` or `EnvoyFilter` resources are created.

**Solutions**:
- Check that `autoDetect` is set to `true` or proxies are manually specified
- Verify the Cluster Agent logs for proxy detection messages
- Ensure your proxies are installed and have the expected Kubernetes resources (Gateway, GatewayClass)
- Try manually specifying proxy types using the `proxies` parameter

### EnvoyExtensionPolicy or EnvoyFilter not created

**Symptom**: Injector is running but configuration resources are missing.

**Solutions**:
- Check Cluster Agent logs for RBAC permission errors
- Verify the Cluster Agent service account has permissions to create `EnvoyExtensionPolicy` or `EnvoyFilter` resources
- Ensure the processor service exists and is accessible
- Check for conflicting existing policies or filters

### Traffic not being processed

**Symptom**: No security events appear in the Datadog UI.

**Solutions**:
- Verify the external processor deployment is running: `kubectl get pods -n datadog -l app=datadog-aap-extproc`
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
  - `gateway.envoyproxy.io/envoyextensionpolicies` (create, update, delete, get, list, watch)
  - `networking.istio.io/envoyfilters` (create, update, delete, get, list, watch)
  - `gateway.networking.k8s.io/gateways` (get, list, watch)
  - `gateway.networking.k8s.io/gatewayclasses` (get, list, watch)
- Check that the ClusterRoleBinding references the correct service account

## Limitations

- The Appsec Injector is in Preview and subject to change
- Requires Datadog Cluster Agent 7.73.0 or later
- Supported proxy types: Envoy Gateway, Istio
- External processor must be manually deployed and scaled
- Cross-namespace service references require appropriate NetworkPolicy and ReferenceGrant configuration
- For specific proxy version compatibility, see:
  - [Envoy Gateway compatibility][7]
  - [Istio compatibility][8]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/kubernetes/installation/
[2]: https://gateway.envoyproxy.io/
[3]: https://istio.io/
[4]: /agent/remote_config/?tab=helm#enabling-remote-configuration
[5]: /security/application_security/setup/kubernetes/envoy-gateway
[6]: /security/application_security/setup/kubernetes/istio
[7]: /security/application_security/setup/compatibility/envoy-gateway
[8]: /security/application_security/setup/compatibility/istio
[0]: /security/application_security/setup/
