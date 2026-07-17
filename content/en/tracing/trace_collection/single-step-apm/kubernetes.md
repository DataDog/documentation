---
title: Single Step APM Instrumentation on Kubernetes
description: "Enable Single Step Instrumentation (SSI) on Kubernetes to automatically instrument applications with Datadog APM. Covers prerequisites, setup with Helm or the Datadog Operator, verification, Unified Service Tags, workload targeting, and troubleshooting."
code_lang: kubernetes
type: multi-code-lang
code_lang_weight: 20
aliases:
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes
further_reading:
  - link: /tracing/metrics/runtime_metrics/
    tag: Documentation
    text: Enable Runtime Metrics
  - link: /tracing/guide/init_resource_calc/
    tag: Documentation
    text: Learn about init container resource usage
  - link: /tracing/trace_collection/single-step-apm/troubleshooting
    tag: Documentation
    text: Troubleshoot Single Step APM
  - link: /tracing/guide/injectors/
    tag: Documentation
    text: Understanding injector behavior with Single Step Instrumentation
---

## Overview

Single Step Instrumentation (SSI) installs the Datadog Agent and instruments your Kubernetes applications in one step. SSI loads the Datadog SDK into your application processes at runtime, with no code changes or image rebuilds required. After you enable SSI, all supported applications in your cluster automatically begin sending traces to Datadog.

## Prerequisites

- Kubernetes v1.20+
- [Helm][1] for deploying the Datadog Operator
- [kubectl][2] for installing the Datadog Agent
- A supported language runtime per the [SSI compatibility guide][3]

### Check for existing tracer dependencies

SSI disables itself silently if it detects an existing tracer in your application. Before you enable SSI, check your dependency manifests and startup scripts:

```shell
grep -rn "ddtrace\|dd-trace\|opentelemetry\|dd-java-agent\|javaagent" requirements.txt package.json Gemfile go.mod pom.xml build.gradle 2>/dev/null
```

For Java, also check Dockerfiles and startup scripts for `-javaagent` flags, and check the `JAVA_TOOL_OPTIONS` environment variable.

If any matches are found, remove the tracer dependencies and rebuild your application image before you proceed.

### Compatibility notes

- **Node.js**: SSI requires CommonJS. If your application uses `import` syntax or sets `"type": "module"` in `package.json`, use [manually managed SDKs][4] instead.
- **Ruby**: SSI requires glibc and is not compatible with Alpine or other musl-based images.
- **All other languages**: Alpine and musl-based images are supported on Kubernetes. SSI injects through the `LD_PRELOAD` environment variable, not `/etc/ld.so.preload`.

## Enable SSI

<div class="alert alert-info">SSI does not instrument applications in the namespace where the Datadog Agent is installed. Install the Agent in a separate namespace.</div>

These steps enable SSI across your entire cluster. To instrument specific namespaces or pods, see [Target specific workloads](#target-specific-workloads).

{{< tabs >}}
{{% tab "Helm" %}}

If the Datadog Agent is not installed, set `DD_API_KEY` to your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys). Then add the Datadog Helm repository and create a Kubernetes Secret:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
kubectl create namespace datadog --dry-run=client -o yaml | kubectl apply -f -
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY -n datadog --dry-run=client -o yaml | kubectl apply -f -
```

If you install the Agent in a different namespace, replace `datadog` with your Agent namespace.

If the Agent is already installed, add `apm.instrumentation.enabled: true` to your existing `datadog-values.yaml` and skip to the `helm upgrade` step.

Create a `datadog-values.yaml`:

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
  site: <DATADOG_SITE>
  apm:
    instrumentation:
      enabled: true
```

Replace `<CLUSTER_NAME>` with your Kubernetes cluster name and `<DATADOG_SITE>` with your [Datadog site](/getting_started/site/).

Deploy or update the Agent:

```shell
helm upgrade --install datadog-agent -f datadog-values.yaml datadog/datadog -n datadog
```

SSI installs the latest SDK for each supported language by default. To pin SDK versions, see [Pin SDK versions](#pin-sdk-versions).

Restart your application pods:

<div class="alert alert-warning">Restarting pods can cause a brief service interruption. Coordinate with the application owner before you proceed.</div>

```shell
kubectl rollout restart deployment/<DEPLOYMENT_NAME> -n <APP_NAMESPACE>
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

If the Datadog Operator and Agent are not installed, set `DD_API_KEY` to your [Datadog API key](https://app.datadoghq.com/organization-settings/api-keys). Then install the Operator and create a Kubernetes Secret:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm upgrade --install datadog-operator datadog/datadog-operator --namespace datadog --create-namespace
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY -n datadog --dry-run=client -o yaml | kubectl apply -f -
```

If you install the Agent in a different namespace, replace `datadog` with your Agent namespace.

If the Agent is already installed with the Datadog Operator, add `features.apm.instrumentation.enabled: true` to your existing `DatadogAgent` manifest and skip to the `kubectl apply` step.

Create a `datadog-agent.yaml`:

```yaml
apiVersion: datadoghq.com/v2alpha1
kind: DatadogAgent
metadata:
  name: datadog
  namespace: datadog
spec:
  global:
    clusterName: <CLUSTER_NAME>
    site: <DATADOG_SITE>
    credentials:
      apiSecret:
        secretName: datadog-secret
        keyName: api-key
  features:
    apm:
      instrumentation:
        enabled: true
```

Replace `<CLUSTER_NAME>` with your Kubernetes cluster name and `<DATADOG_SITE>` with your [Datadog site](/getting_started/site/).

Apply the manifest:

```shell
kubectl apply -f datadog-agent.yaml
```

SSI installs the latest SDK for each supported language by default. To pin SDK versions, see [Pin SDK versions](#pin-sdk-versions).

Restart your application pods:

<div class="alert alert-warning">Restarting pods can cause a brief service interruption. Coordinate with the application owner before you proceed.</div>

```shell
kubectl rollout restart deployment/<DEPLOYMENT_NAME> -n <APP_NAMESPACE>
```

{{% /tab %}}
{{% tab "In-app wizard" %}}

The Datadog in-app wizard generates a configuration file with SSI enabled:

1. Go to the [Install the Datadog Agent on Kubernetes](https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes) page.
1. Choose your installation method, select an API key, and set up the Operator or Helm repository.
1. Under **Configure `datadog-agent.yaml`**, go to **Additional configuration** > **Application Observability** and turn on **APM Instrumentation**.

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="APM Instrumentation toggle in the Kubernetes Agent installation wizard" style="width:100%;" >}}

1. Deploy the Agent with the generated configuration file.
1. Restart your application pods:

   <div class="alert alert-warning">Restarting pods can cause a brief service interruption. Coordinate with the application owner before you proceed.</div>

   ```shell
   kubectl rollout restart deployment/<DEPLOYMENT_NAME> -n <APP_NAMESPACE>
   ```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable, contact <a href="/help/">Datadog Support</a>.</div>

<div class="alert alert-warning">If your cluster enforces PodSecurity <code>restricted</code> policies, the Datadog init container may be blocked with <code>allowPrivilegeEscalation is false</code> or <code>violates PodSecurity "restricted:latest"</code>. See the <a href="/tracing/trace_collection/single-step-apm/troubleshooting/#environments-with-strict-pod-security-settings">SSI troubleshooting guide</a> for the required security context configuration.</div>

## Verify SSI is working

After you restart your application pods, wait two to three minutes for traces to arrive, then confirm SSI is working:

1. **Check for the init container.** Run this command against one of your application pods. The output should include `datadog-lib-<language>-init`:
   ```shell
   kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
   ```

2. **Generate traffic.** If your application does not receive traffic automatically, port-forward and send a few requests:
   ```shell
   kubectl port-forward deployment/<DEPLOYMENT_NAME> 8080:<APP_PORT> -n <APP_NAMESPACE>
   curl http://localhost:8080/
   ```

3. **Find your service.** Go to [**APM** > **Services**][6] and confirm your service appears.

4. **Confirm traces.** Go to [**APM** > **Traces**][7] and search for traces from your service.

If traces do not appear after five minutes, see the [SSI troubleshooting guide][8].

## Configure Unified Service Tags

[Unified Service Tags][5] (USTs) apply consistent `service`, `env`, and `version` tags across traces, metrics, and logs. SSI can automatically extract UST values from your existing Kubernetes labels.

<div class="alert alert-danger">
Automatic label extraction is not compatible with <a href="/remote_configuration/">Remote Configuration</a>. If you use Remote Configuration, <a href="#configure-unified-service-tags-with-ddtraceconfigs">configure USTs with ddTraceConfigs</a> instead.
</div>

### Automatic label extraction (recommended)

Map your Kubernetes labels to Datadog service tags with `kubernetesResourcesLabelsAsTags`. Replace `app.kubernetes.io/name` with whatever label contains your service name:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service
    replicasets.apps:
      app.kubernetes.io/name: service
  tags:
    - "env:production"
  apm:
    instrumentation:
      enabled: true
```

Requires `datadog-agent` 7.69+, `datadog-operator` 1.16.0+, or `datadog-helm-chart` 3.120.0+.

{{% collapse-content title="Configure Unified Service Tags with ddTraceConfigs" level="h3" expanded=false %}}

For granular control over specific workloads, use `ddTraceConfigs` to map labels to service configurations:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service
  tags:
    - "env:production"
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: frontend-services
          podSelector:
            matchLabels:
              tier: frontend
          ddTraceConfigs:
            - name: DD_SERVICE
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['app.kubernetes.io/name']
```

{{% /collapse-content %}}

{{% collapse-content title="Configure Unified Service Tags in deployment manifests" level="h3" expanded=false %}}

If your labels are not suitable for automatic extraction, set USTs directly in your deployment manifests with environment variables. This requires modifying each deployment individually.

For complete instructions, see [setting USTs for Kubernetes services](/getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment).

{{% /collapse-content %}}

## Enable additional products

After SSI enables distributed tracing, you can activate additional SDK-dependent products:

{{< ssi-products >}}

To enable products:

- **With workload targeting (recommended):** Add `ddTraceConfigs` entries to your target blocks. See [Target specific workloads](#target-specific-workloads).
- **With environment variables:** Set variables directly in your application configuration. See [Library Configuration][9].

## Next steps

After traces are flowing:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_explorer/" >}}Trace Explorer: search and analyze your traces{{< /nextlink >}}
    {{< nextlink href="/tracing/services/service_page/" >}}Service Page: monitor service health and performance{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}Custom instrumentation: add application-specific spans{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Dynamic Instrumentation: add custom spans without redeploying{{< /nextlink >}}
{{< /whatsnext >}}

## Remove SSI

### Remove instrumentation for specific services

Use [workload targeting](#target-specific-workloads) (Agent v7.64+) to exclude specific services.

Alternatively, add this label to the pod spec to skip Admission Controller mutation:

<div class="alert alert-danger">This label disables all mutating webhooks for the pod, not only SSI.</div>

```yaml
spec:
  template:
    metadata:
      labels:
        admission.datadoghq.com/enabled: "false"
```

Apply the change and restart the affected pods.

### Remove instrumentation for all services

{{< tabs >}}
{{% tab "Helm" %}}

Set `instrumentation.enabled: false` in `datadog-values.yaml` and run:

```shell
helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

Set `instrumentation.enabled: false` in `datadog-agent.yaml` and apply:

```shell
kubectl apply -f datadog-agent.yaml
```

{{% /tab %}}
{{< /tabs >}}

## Advanced configuration

The following options tune SSI behavior after the happy path is working. Each is optional.

{{% collapse-content title="Target specific workloads" level="h3" expanded=false id="target-specific-workloads" %}}

By default, SSI instruments all services in all namespaces. Use one of these methods to limit instrumentation scope.

**Namespace filtering**

Set `enabledNamespaces` or `disabledNamespaces` (mutually exclusive). Add these keys under `datadog.apm.instrumentation` (Helm) or `spec.features.apm.instrumentation` (Operator):

```yaml
apm:
  instrumentation:
    enabled: true
    enabledNamespaces:
      - default
      - applications
```

**Per-workload targeting (Agent v7.64+)**

Use `targets` to control which workloads are instrumented and what configuration they receive. Targets are evaluated in order; the first match wins.

| Key                 | Description |
|---------------------|-------------|
| `name`              | Target block name (metadata only). |
| `namespaceSelector` | Namespace(s) to instrument. Use `matchNames`, `matchLabels`, or `matchExpressions`. See the [Kubernetes selector documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements). |
| `podSelector`       | Pod(s) to instrument. Use `matchLabels` or `matchExpressions`. See the [Kubernetes selector documentation](https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements). |
| `ddTraceVersions`   | [Datadog APM SDK](/tracing/trace_collection/single-step-apm/compatibility/#supported-language-runtimes) version per language. |
| `ddTraceConfigs`    | SDK configuration: Unified Service Tags, [additional products](#enable-additional-products), and [other APM settings](/tracing/trace_collection/library_config/). |

Example - instrument specific namespaces by name and label:

```yaml
apm:
  instrumentation:
    enabled: true
    targets:
      - name: login-service
        namespaceSelector:
          matchNames:
            - login-service
        ddTraceVersions:
          java: "1"
        ddTraceConfigs:
          - name: DD_PROFILING_ENABLED
            value: "auto"
      - name: billing-service
        namespaceSelector:
          matchLabels:
            app: billing-service
        ddTraceVersions:
          python: "3"
```

Example - exclude specific pods with `matchExpressions`:

```yaml
apm:
  instrumentation:
    enabled: true
    targets:
      - name: default-target
        podSelector:
          matchExpressions:
            - key: app
              operator: NotIn
              values:
                - app1
                - app2
```

Example - enable additional products for a namespace:

```yaml
apm:
  instrumentation:
    enabled: true
    targets:
      - name: web-apps-with-security
        namespaceSelector:
          matchNames:
            - web-apps
        ddTraceVersions:
          java: "1"
          python: "3"
        ddTraceConfigs:
          - name: DD_APPSEC_ENABLED
            value: "true"
          - name: DD_PROFILING_ENABLED
            value: "auto"
```

**Legacy Agent (v7.63 and earlier)**: `targets` and `ddTraceVersions` are not available. Use `enabledNamespaces`/`disabledNamespaces` for namespace scope, and pin SDK versions with `libVersions` (cluster level) or the `admission.datadoghq.com/<language>-lib.version` pod annotation.

{{% /collapse-content %}}

{{% collapse-content title="Pin SDK versions" level="h3" expanded=false id="pin-sdk-versions" %}}

SSI installs the latest SDK for each supported language by default. Use `ddTraceVersions` (Agent v7.64+, valid only inside a `targets` entry) to pin versions. Pinning reduces init container size, avoids downloading unnecessary SDKs, and makes tracer upgrades deliberate.

```yaml
apm:
  instrumentation:
    enabled: true
    targets:
      - name: default-target
        ddTraceVersions:
          java:   "1"
          python: "3"
          js:     "5"
          dotnet: "3"
          ruby:   "2"
          php:    "1"
```

Specify a major version (for example, `python: "3"`) to receive the latest minor release, or an exact version to pin precisely.

{{% /collapse-content %}}

{{% collapse-content title="Use opt-in labels for controlled rollout" level="h3" expanded=false %}}

| Mode    | Behavior    | When to use |
| ------- | ----------- | ----------- |
| Default | All supported processes are instrumented. | Small clusters or prototypes. |
| Opt-in  | [Workload targeting](#target-specific-workloads) restricts instrumentation to labeled pods. | Production clusters, staged rollouts, cost-sensitive environments. |

Add an opt-in label to your deployment and pod template:

```yaml
metadata:
  labels:
    datadoghq.com/apm-instrumentation: "enabled"
```

Then configure SSI to match:

```yaml
apm:
  instrumentation:
    enabled: true
    targets:
      - name: apm-instrumented
        podSelector:
          matchLabels:
            datadoghq.com/apm-instrumentation: "enabled"
```

{{% /collapse-content %}}

{{% collapse-content title="Configure injection modes" level="h3" expanded=false %}}

SSI supports multiple injection modes that control how library files are delivered to application containers. Adjust this setting if you notice pod startup delays or high resource usage during initialization.

| Mode | Description | Requirements |
|------|-------------|--------------|
| `init_container` | Copies files with an init container. | Agent deployed with Helm or Operator |
| `csi` | **In Preview.** Mounts files with the [Datadog CSI driver](/containers/kubernetes/csi_driver/). Faster pod startup. | Agent 7.76.0+, CSI driver 1.2.0+, Helm 3.178.1+ or Operator 1.25.0+ |

For `csi` mode, install and activate the CSI driver first. With Helm, set `datadog.csi.enabled: true`. See the [CSI driver documentation](/containers/kubernetes/csi_driver/).

**Set injection mode globally**

Helm - add to `datadog-values.yaml`:
```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Datadog Operator - add to `datadog-agent.yaml`:
```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Supported values: `init_container`, `csi`.

**Set injection mode per pod**

Add this annotation to the pod spec:
```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

Supported values: `init_container`, `csi`.

{{% /collapse-content %}}

{{% collapse-content title="Change the image registry" level="h3" expanded=false %}}

Datadog publishes SDK images on gcr.io (default), Docker Hub, and Amazon ECR. To use a different registry, set `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` in the Cluster Agent config:

| Registry | Value |
|----------|-------|
| gcr.io (default) | `gcr.io/datadoghq` |
| Docker Hub | `docker.io/datadog` |
| Amazon ECR | `public.ecr.aws/datadog` |

For detailed instructions, see [Changing Your Container Registry](/containers/guide/changing_container_registry/).

**Use a private container registry**

If your organization cannot pull from public registries, mirror the Datadog images to your private registry:

1. [Mirror the images](/containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane) for the languages you are instrumenting. At minimum, mirror `apm-inject` and the `dd-lib-<language>-init` images you need.

2. Tag the images to match your configuration. If you set `ddTraceVersions` to `java: "1"` and `python: "3"`, mirror:
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Set `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` to your private registry URL.

{{% /collapse-content %}}

{{% collapse-content title="Container Network Interface on EKS" level="h3" expanded=false %}}

When using a CNI like Calico on EKS, control plane nodes cannot connect to the Admission Controller. Set `useHostNetwork: true` on the Cluster Agent:

```yaml
clusterAgent:
  useHostNetwork: true
```

{{% /collapse-content %}}

## Troubleshooting

If you encounter problems with SSI, see the [SSI troubleshooting guide][8].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /tracing/trace_collection/single-step-apm/compatibility/
[4]: /tracing/trace_collection/dd_libraries/nodejs/
[5]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment
[6]: https://app.datadoghq.com/apm/services
[7]: https://app.datadoghq.com/apm/traces
[8]: /tracing/trace_collection/single-step-apm/troubleshooting/
[9]: /tracing/trace_collection/library_config/
