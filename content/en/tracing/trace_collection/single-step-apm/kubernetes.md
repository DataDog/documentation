---
title: Single Step APM Instrumentation on Kubernetes
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
  - link: /tracing/guide/local_sdk_injection
    tag: Documentation
    text: Instrument your applications using local SDK injection
---

## Overview

In a Kubernetes environment, use Single Step Instrumentation (SSI) for APM to install the Datadog Agent and [instrument][3] your applications with the Datadog APM SDKs in one step.

## Requirements

- Kubernetes v1.20+.
- [`Helm`][1] for deploying the Datadog Operator.
- [`Kubectl` CLI][2] for installing the Datadog Agent.
- Confirmed environment compatibility per the [Single Step Instrumentation compatibility guide][36].


## Enable APM on your applications

<div class="alert alert-info">Single Step Instrumentation does not instrument applications in the namespace where the Datadog Agent is installed. Install the Agent in a separate namespace where you do not run your applications.</div>

Follow these steps to enable Single Step Instrumentation across your entire cluster. This automatically sends traces from all applications written in supported languages.

**Note:** To instrument only specific namespaces or pods, see workload targeting in [Advanced options](#advanced-options).

1. In Datadog, go to the [Install the Datadog Agent on Kubernetes][11] page.
1. Follow the on-screen instructions to choose your installation method, select an API key, and set up the Operator or Helm repository.
1. In the **Configure `datadog-agent.yaml`** section, go to **Additional configuration** > **Application Observability**, and turn on **APM Instrumentation**.

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="The configuration block for installing the Datadog Agent on Kubernetes through the Datadog app" style="width:100%;" >}}

1. Deploy the Agent using the generated configuration file.
1. Restart your applications.

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable for your use case, contact <a href="/help/">Datadog Support</a>.</div>

## Configure Unified Service Tags

Unified Service Tags (USTs) apply consistent tags across traces, metrics, and logs, making it easier to navigate and correlate your observability data. You can configure USTs through automatic label extraction (recommended), explicit configuration with `ddTraceConfigs`, or in deployment manifests.

<div class="alert alert-warning">
If you are using <a href="/agent/remote_config/">Remote Configuration</a>, <a href="#recommended-configure-usts-through-automatic-label-extraction">automatic label extraction</a> is not compatible. You must <a href="#configure-usts-explicitly-with-ddtraceconfigs">configure USTs explicitly</a> using <code>ddTraceConfigs</code>.
</div>

### (Recommended) Configure USTs through automatic label extraction

With SSI, you can automatically extract UST values from pod labels and metadata without modifying individual deployments. To do this, configure `kubernetesResourcesLabelsAsTags` to map your existing Kubernetes labels to Datadog service tags.

**Note:** This method is not compatible with Remote Configuration. If you're using Remote Configuration, see [Configure USTs explicitly with ddTraceConfigs](#configure-usts-explicitly-with-ddtraceconfigs).

#### Prerequisites

| Component | Minimum version  |
|-----------|------------------|
| `datadog-agent` | 7.69        |
| `datadog-operator` | 1.16.0   |
| `datadog-helm-chart` | 3.120.0 |

#### Configuration

Replace `app.kubernetes.io/name` in the following example with any label that contains your service name (for example, `service.kubernetes.io/name` or `component`). You can configure multiple labels this way.

```yaml
datadog:
  # Automatically extract service names from Kubernetes labels
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service     # Modern Kubernetes label
    deployments.apps:
      app.kubernetes.io/name: service
    replicasets.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
  tags:
    - "env:production"

  apm:
    instrumentation:
      enabled: true
```

With this configuration, Datadog automatically sets the `service` tag using the value of the `app.kubernetes.io/name` label for any instrumented workload that includes this label.

### Configure USTs explicitly with ddTraceConfigs

In most cases, automatic configuration is sufficient. However, if you need granular control over settings for specific workloads, use `ddTraceConfigs` to explicitly map labels to service configurations:

```yaml
datadog:
  kubernetesResourcesLabelsAsTags:
    pods:
      app.kubernetes.io/name: service
    deployments.apps:
      app.kubernetes.io/name: service

  # Set environment globally for the entire cluster
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
            - name: DD_SERVICE       # Explicitly override service name
              valueFrom:
                fieldRef:
                  fieldPath: metadata.labels['app.kubernetes.io/name']
            # DD_ENV inherited from cluster-level tags above
            # DD_VERSION automatically extracted from image tags
```


### Configure USTs in deployment manifests

If your setup doesn't use labels suitable for UST extraction, you can set USTs directly in your deployment manifests using environment variables. This approach requires modifying each deployment individually, but offers precise control.

For complete instructions, see [setting USTs for Kubernetes services][5].

## Enable SDK-dependent products and features

After SSI loads the Datadog SDK into your applications and enables distributed tracing, you can configure additional products that rely on the SDK. These include capabilities such as [Continuous Profiler][37], [Application Security Monitoring][38], and [trace ingestion controls][39].

Use one of the following setup methods:

- **[Configure with workload targeting (recommended)](#target-specific-workloads)**:

  By default, Single Step Instrumentation instruments all services in all namespaces. Use workload targeting to limit instrumentation to specific namespaces, pods, or workloads, and apply custom configurations.

- **[Set environment variables][7]**:

  Enable products by setting environment variables directly in your application configuration.

## Advanced options

Use the following advanced options to customize how Single Step Instrumentation behaves in your environment. These settings are optional and typically only needed in specialized setups.

### Target specific workloads

By default, SSI instruments all services in all namespaces in your cluster. Depending on your Agent version, use one of the following configuration methods to refine which services are instrumented and how.

{{< tabs >}}

{{% tab "Agent v7.64+ (Recommended)" %}}

Create targeting blocks with the `targets` label to specify which workloads to instrument and what configurations to apply.

Each target block has the following keys:

| Key             | Description |
|------------------|-------------|
| `name`            | The name of the target block. This has no effect on monitoring state and is used only as metadata. |
| `namespaceSelector` | The namespace(s) to instrument. Specify using one or more of:<br> - `matchNames`: A list of one or more namespace name(s). <br> - `matchLabels`: A list of one or more label(s) defined in `{key,value}` pairs. <br> - `matchExpressions`: A list of namespace selector requirements. <br><br> Namespaces must meet all criteria to match. For more details, see the [Kubernetes selector documentation][10].|
| `podSelector`     | The pod(s) to instrument. Specify using one or more of: <br> - `matchLabels`: A list of one or more label(s) defined in `{key,value}` pairs. <br> - `matchExpressions`: A list of pod selector requirements. <br><br> Pods must meet all criteria to match. For more details, see the [Kubernetes selector documentation][10]. |
| `ddTraceVersions` | The [Datadog APM SDK][9] version to use for each language. |
| `ddTraceConfigs`  | APM SDK configs that allow setting Unified Service Tags, enabling Datadog products beyond tracing, and customizing other APM settings. [See full list of options][8]. |

The file you need to configure depends on how you enabled Single Step Instrumentation:
- If you enabled SSI with Datadog Operator, edit `datadog-agent.yaml`.
- If you enabled SSI with Helm, edit `datadog-values.yaml`.

**Note**: Targets are evaluated in order; the first match takes precedence.

#### Example configurations

Review the following examples demonstrating how to select specific services:

{{< collapse-content title="Example 1: Enable all namespaces except one" level="h4" >}}

This configuration:
- enables APM for all namespaces except the `jenkins` namespace.
  - **Note**: use `enabledNamespaces` to disable for all namespaces except those listed.
- instructs Datadog to instrument the Java applications with the default Java APM SDK and Python applications with `v.3.1.0` of the Python APM SDK.

{{< highlight yaml "hl_lines=4-10" >}}
   apm:
     instrumentation:
       enabled: true
       disabledNamespaces:
         - "jenkins"
       targets:
         - name: "all-remaining-services"
           ddTraceVersions:
             java: "default"
             python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Example 2: Instrument a subset of namespaces, matching on names and labels" level="h4" >}}

This configuration creates two targets blocks:

- The first block (named `login-service_namespace`):
  - enables APM for services in the namespace `login-service`.
  - instructs Datadog to instrument services in this namespace with the default version of the Java APM SDK.
  - sets environment variable `DD_PROFILING_ENABLED` for this target group
- The second block (named `billing-service_apps`)
  - enables APM for services in the namespace(s) with label `app:billing-service`.
  - instructs Datadog to instrument this set of services with `v3.1.0` of the Python APM SDK.

{{< highlight yaml "hl_lines=4-28" >}}
  apm:
    instrumentation:
      enabled: true
      targets:
        - name: "login-service_namespace"
          namespaceSelector:
            matchNames:
              - "login-service"
          ddTraceVersions:
            java: "default"
          ddTraceConfigs:
            - name: "DD_PROFILING_ENABLED"  ## profiling is enabled for all services in this namespace
              value: "auto"
        - name: "billing-service_apps"
          namespaceSelector:
            matchLabels:
              app: "billing-service"
          ddTraceVersions:
            python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Example 3: Instrument different workloads with different tracers" level="h4" >}}

This configuration does the following:
- enables APM for pods with the following labels:
  - `app:db-user`, which marks pods running the `db-user` application.
  - `webserver:routing`, which marks pods running the `request-router` application.
- instructs Datadog to use the default versions of the Datadog Tracer SDKs.
- sets Datadog environment variables to apply to each target group and configure the SDKs.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "db-user"
           podSelector:
             matchLabels:
               app: "db-user"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:   ## trace configs set for services in matching pods
             - name: "DD_DATA_STREAMS_ENABLED"
               value: "true"
         - name: "user-request-router"
           podSelector:
             matchLabels:
               webserver: "user"
           ddTraceVersions:
             php: "default"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Example 4: Instrument a pod within a namespace" level="h4" >}}

This configuration:
- enables APM for pods labeled `app:password-resolver` inside the `login-service` namespace.
- instructs Datadog to use the default version of the Datadog Java Tracer SDK.
- sets Datadog environment variables to apply to this target.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "login-service-namespace"
           namespaceSelector:
             matchNames:
               - "login-service"
           podSelector:
             matchLabels:
               app: "password-resolver"
           ddTraceVersions:
             java: "default"
           ddTraceConfigs:
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Example 5: Instrument a subset of pods using <code>matchExpressions</code>" level="h4" >}}

This configuration enables APM for all pods except those that have either of the labels `app=app1` or `app=app2`.

{{< highlight yaml "hl_lines=4-28" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           podSelector:
               matchExpressions:
                 - key: app
                   operator: NotIn
                   values:
                   - app1
                   - app2
{{< /highlight >}}

{{< /collapse-content >}}

[8]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements

{{% /tab %}}

{{% tab "Agent <=v7.63 (Legacy)" %}}

#### Enable or disable instrumentation for namespaces

You can choose to enable or disable instrumentation for applications in specific namespaces. You can only set enabledNamespaces or disabledNamespaces, not both.

The file you need to configure depends on if you enabled Single Step Instrumentation with Datadog Operator or Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

To enable instrumentation for specific namespaces, add `enabledNamespaces` configuration to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces: # Add namespaces to instrument
           - default
           - applications
{{< /highlight >}}

To disable instrumentation for specific namespaces, add `disabledNamespaces` configuration to `datadog-agent.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         disabledNamespaces: # Add namespaces to not instrument
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

To enable instrumentation for specific namespaces, add `enabledNamespaces` configuration to `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces: # Add namespaces to instrument
             - namespace_1
             - namespace_2
{{< /highlight >}}

To disable instrumentation for specific namespaces, add `disabledNamespaces` configuration to `datadog-values.yaml`:

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          disabledNamespaces: # Add namespaces to not instrument
            - namespace_1
            - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

#### Specify tracing library versions

<div class="alert alert-info">Starting with Datadog Cluster Agent v7.52.0+, you can automatically instrument a subset of your applications, based on the tracing libraries you specify.</div>

Specify Datadog tracing libraries and their versions to automatically instrument applications written in those languages. You can configure this in two ways, which are applied in the following order of precedence:

1. [Specify at the service level](#specify-at-the-service-level), or
2. [Specify at the cluster level](#specify-at-the-cluster-level).

**Default**: If you don't specify any library versions, applications written in supported languages are automatically instrumented using the latest tracing library versions.

##### Specify at the service level

To automatically instrument applications in specific pods, add the appropriate language annotation and library version for your application in your pod spec:

| Language   | Pod annotation                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<CONTAINER IMAGE TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<CONTAINER IMAGE TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<CONTAINER IMAGE TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<CONTAINER IMAGE TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<CONTAINER IMAGE TAG>"`   |

Replace `<CONTAINER IMAGE TAG>` with the desired library version. Available versions are listed in the [Datadog container registries](#change-the-default-image-registry) and tracer source repositories for each language:

- [Java][34]
- [Node.js][35]
- [Python][36]
- [.NET][37]
- [Ruby][38]
- [PHP][39]

<div class="alert alert-danger">Exercise caution when using the <code>latest</code> tag, as major library releases may introduce breaking changes.</div>

For example, to automatically instrument Java applications:

{{< highlight yaml "hl_lines=10" >}}
apiVersion: apps/v1
kind: Deployment
metadata:
  labels:
    # ...
spec:
  template:
    metadata:
      annotations:
        admission.datadoghq.com/java-lib.version: "<CONTAINER IMAGE TAG>"
    spec:
      containers:
        - # ...
{{< /highlight >}}

##### Specify at the cluster level

If you don't enable automatic instrumentation for specific pods using annotations, you can specify which languages to instrument across the entire cluster using the SSI configuration. When `apm.instrumentation.libVersions` is set, only applications written in the specified languages are instrumented, using the specified library versions.

The file you need to configure depends on if you enabled Single Step Instrumentation with Datadog Operator or Helm:

{{< collapse-content title="Datadog Operator" level="h5" >}}

For example, to instrument .NET, Python, and Node.js applications, add the following configuration to your `datadog-agent.yaml` file:

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

For example, to instrument .NET, Python, and Node.js applications, add the following configuration to your `datadog-values.yaml` file:

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions: # Add any libraries and versions you want to set
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}


[34]: https://github.com/DataDog/dd-trace-java/releases
[35]: https://github.com/DataDog/dd-trace-js/releases
[36]: https://github.com/DataDog/dd-trace-py/releases
[37]: https://github.com/DataDog/dd-trace-dotnet/releases
[38]: https://github.com/DataDog/dd-trace-rb/releases
[39]: https://github.com/DataDog/dd-trace-php/releases


{{% /tab %}}
{{< /tabs >}}

### Change the default image registry

Datadog publishes instrumentation libraries images on gcr.io, Docker Hub, and Amazon ECR:

| Language   | gcr.io                              | hub.docker.com                              | gallery.ecr.aws                            |
|------------|-------------------------------------|---------------------------------------------|-------------------------------------------|
| Java       | [gcr.io/datadoghq/dd-lib-java-init][15]   | [hub.docker.com/r/datadog/dd-lib-java-init][16]   | [gallery.ecr.aws/datadog/dd-lib-java-init][17]   |
| Node.js    | [gcr.io/datadoghq/dd-lib-js-init][18]     | [hub.docker.com/r/datadog/dd-lib-js-init][19]     | [gallery.ecr.aws/datadog/dd-lib-js-init][20]     |
| Python     | [gcr.io/datadoghq/dd-lib-python-init][21] | [hub.docker.com/r/datadog/dd-lib-python-init][22] | [gallery.ecr.aws/datadog/dd-lib-python-init][23] |
| .NET       | [gcr.io/datadoghq/dd-lib-dotnet-init][24] | [hub.docker.com/r/datadog/dd-lib-dotnet-init][25] | [gallery.ecr.aws/datadog/dd-lib-dotnet-init][26] |
| Ruby       | [gcr.io/datadoghq/dd-lib-ruby-init][27] | [hub.docker.com/r/datadog/dd-lib-ruby-init][28] | [gallery.ecr.aws/datadog/dd-lib-ruby-init][29] |
| PHP        | [gcr.io/datadoghq/dd-lib-php-init][30] | [hub.docker.com/r/datadog/dd-lib-php-init][31] | [gallery.ecr.aws/datadog/dd-lib-php-init][32] |

The `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in the Datadog Cluster Agent configuration specifies the registry used by the Admission Controller. The default value is `gcr.io/datadoghq`.

You can pull the tracing library from a different registry by changing it to `docker.io/datadog`, `public.ecr.aws/datadog`, or another URL if you are hosting the images in a local container registry.

For instructions on changing your container registry, see [Changing Your Container Registry][33].

### Use a private container registry

If your organization does not allow direct pulls from public registries (such as `gcr.io`, `docker.io`, or `public.ecr.aws`), you can host the required Datadog images internally and configure the Admission Controller to use them.

To use SSI with a private container registry:

1. Follow [these instructions][34] to mirror Datadog's container images to your private registry.

   You only need the images for the languages you are instrumenting. If you're not sure which ones you need, here's a baseline that covers most use cases:

   - `apm-inject`
   - `dd-lib-java-init`
   - `dd-lib-python-init`
   - `dd-lib-dotnet-init`
   - `dd-lib-php-init`
   - `dd-lib-ruby-init`
   - `dd-lib-js-init`

   You can find these images on [gcr.io][12], [Docker Hub][13], or [Amazon ECR Public Gallery][14].

2. Tag the images according to your configuration.

   The versions you mirror must match the versions configured in your workloads, which might be set in one of the following ways:
   - globally in the Agent config using `ddTraceVersions`, or
   - per-pod using annotations like `admission.datadoghq.com/java-lib.version`.

   If no version is explicitly configured, the default version (`0`) is used.

   For example:

   ```
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "default-target"
           ddTraceVersions:
             java: "1"
             python: "3"
   ```

   This configuration requires the following image tags:
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Update the Cluster Agent configuration to use your private registry.

   Set the `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` environment variable in your Cluster Agent config to use your private registry.

For more details on changing your container registry, see [Changing Your Container Registry][33].

### Using a Container Network Interface on EKS

When using a CNI like Calico, the control plane nodes are not able to initiate network connections to Datadog's Admission Controller and report an "Address is not allowed" error.
To use Single Step instrumentation, modify Datadog's Cluster Agent with the `useHostNetwork: true` parameter.

```
datadog:
  ...

clusterAgent:
  useHostNetwork: true

  admissionController:
    ...
```

## Remove Single Step APM instrumentation from your Agent

If you don't want to collect trace data for a particular service, host, VM, or container, complete the following steps:

### Remove instrumentation for specific services

To remove APM instrumentation and stop sending traces from a specific service, you can do one of the following:

#### Use workload selection (recommended)

With workload selection (available for Agent v7.64+), you can enable and disable tracing for specific applications. [See configuration details here](#advanced-options).

#### Use the Datadog Admission Controller

As an alternative, or for a version of the agent that does not support workload selection, you can also disable pod mutation by adding a label to your pod.

<div class="alert alert-danger">In addition to disabling SSI, the following steps disable other mutating webhooks. Use with caution.</div>

1. Set the `admission.datadoghq.com/enabled:` label to `"false"` for the pod spec:
   ```yaml
   spec:
     template:
       metadata:
         labels:
           admission.datadoghq.com/enabled: "false"
   ```
2. Apply the configuration:
   ```shell
   kubectl apply -f /path/to/your/deployment.yaml
   ```
3. Restart the services you want to remove instrumentation for.

### Remove APM for all services on the infrastructure

To stop producing traces, uninstall APM and restart the infrastructure:

The file you need to configure depends on if you enabled Single Step Instrumentation with Datadog Operator or Helm:

{{< tabs >}}
{{% tab "Datadog Operator" %}}

1. Set `instrumentation.enabled=false` in `datadog-agent.yaml`:
   ```yaml
   features:
     apm:
       instrumentation:
         enabled: false
   ```

2. Deploy the Datadog Agent with the updated configuration file:
   ```shell
   kubectl apply -f /path/to/your/datadog-agent.yaml
   ```
{{% /tab %}}

{{% tab "Helm" %}}

1. Set `instrumentation.enabled=false` in `datadog-values.yaml`:
   ```yaml
   datadog:
     apm:
       instrumentation:
         enabled: false
   ```

2. Run the following command:
   ```shell
   helm upgrade datadog-agent -f datadog-values.yaml datadog/datadog
   ```
{{% /tab %}}
{{< /tabs >}}

## Best practices

After you enable SSI, all supported processes in the cluster are automatically instrumented and begin producing traces within minutes.

To control where APM is activated and reduce overhead, consider the following best practices.

{{% collapse-content title="Use opt-in labels for controlled APM rollout" level="h3" expanded=false id="id-for-anchoring" %}}

#### Default vs. opt-in instrumentation
| Mode    | Behavior    | When to use |
| ---  | ----------- | ----------- |
| Default | All supported processes in the cluster are instrumented. | Small clusters or prototypes. |
| Opt-in | Use [workload selection][4] to restrict instrumentation to specific namespaces or pods. | Production clusters, staged rollouts, or cost‑sensitive use cases. |

#### Example: Enable instrumentation for specific pods

1. Add a meaningful label (for example, `datadoghq.com/apm-instrumentation: "enabled"`) to both the deployment metadata and the pod template.

   ```
   apiVersion: apps/v1
   kind: Deployment
   metadata:
     name: checkout-api
     labels:
       app: checkout-api
       datadoghq.com/apm-instrumentation: "enabled"   # opt-in label (cluster-wide)
   spec:
     replicas: 3
     selector:
       matchLabels:
         app: checkout-api
     template:
       metadata:
         labels:
           app: checkout-api
           datadoghq.com/apm-instrumentation: "enabled"   # opt-in label must be on *template*, too
           # Unified Service Tags (recommended)
           tags.datadoghq.com/service: "checkout-api"
           tags.datadoghq.com/env:     "prod"
           tags.datadoghq.com/version: "2025-06-10"
       spec:
         containers:
           - name: api
             image: my-registry/checkout:latest
             ports:
               - containerPort: 8080
   ```

2. In your Datadog Agent Helm config, enable SSI and use `podSelector` to inject only into pods with the matching opt-in label.

   ```
     apm:
       instrumentation:
         enabled: true
         targets:
           - name: apm-instrumented
             podSelector:
               matchLabels:
                 datadoghq.com/apm-instrumentation: "enabled"
   ```

See [workload selection][4] for additional examples.

{{% /collapse-content %}}


{{% collapse-content title="Control which APM SDKs are loaded" level="h3" expanded=false id="id-for-anchoring" %}}

Use `ddTraceVersions` in your Agent Helm config to control both the language and the version of the APM SDK. This prevents unnecessary SDKs from being downloaded, which minimizes init-container footprint, reduces image size, and allows for more deliberate tracer upgrades (for example, to meet compliance requirements or simplify debugging).

#### Example: Specify a Java APM SDK for a namespace

Only Java applications run in the `login-service` namespace. To avoid downloading other SDKs, configure the Agent to target that namespace and inject only the Java SDK version 1.48.2.


```
targets:
  - name: login-service
    namespaceSelector:
      matchNames: ["login-service"]
    ddTraceVersions:
      java: "1.48.2"    # pin version
```

#### Default configuration

If a pod doesn't match any `ddTraceVersions` rule, the default target applies.

```
targets:
  - name: default-target          # tag any pod *without* an override
    ddTraceVersions:
      java:   "1"   # stay on latest v1.x
      python: "3"   # stay on latest v3.x
      js:     "5"   # NodeJS
      php:    "1"
      dotnet: "3"
```

{{% /collapse-content %}}

## Troubleshooting

If you encounter problems enabling APM with SSI, see the [SSI troubleshooting guide][35].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /tracing/glossary/#instrumentation
[4]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/?tab=agentv764recommended#configure-instrumentation-for-namespaces-and-pods
[5]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment
[7]: /tracing/trace_collection/library_config/
[11]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[12]: https://gcr.io/datadoghq
[13]: https://hub.docker.com/u/datadog
[14]: https://gallery.ecr.aws/datadog
[15]: http://gcr.io/datadoghq/dd-lib-java-init
[16]: http://hub.docker.com/r/datadog/dd-lib-java-init
[17]: http://gallery.ecr.aws/datadog/dd-lib-java-init
[18]: http://gcr.io/datadoghq/dd-lib-js-init
[19]: http://hub.docker.com/r/datadog/dd-lib-js-init
[20]: http://gallery.ecr.aws/datadog/dd-lib-js-init
[21]: http://gcr.io/datadoghq/dd-lib-python-init
[22]: http://hub.docker.com/r/datadog/dd-lib-python-init
[23]: http://gallery.ecr.aws/datadog/dd-lib-python-init
[24]: http://gcr.io/datadoghq/dd-lib-dotnet-init
[25]: http://hub.docker.com/r/datadog/dd-lib-dotnet-init
[26]: http://gallery.ecr.aws/datadog/dd-lib-dotnet-init
[27]: http://gcr.io/datadoghq/dd-lib-ruby-init
[28]: http://hub.docker.com/r/datadog/dd-lib-ruby-init
[29]: http://gallery.ecr.aws/datadog/dd-lib-ruby-init
[30]: http://gcr.io/datadoghq/dd-lib-php-init
[31]: http://hub.docker.com/r/datadog/dd-lib-php-init
[32]: http://gallery.ecr.aws/datadog/dd-lib-php-init
[33]: /containers/guide/changing_container_registry/
[34]: /containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[35]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting
[36]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
[37]: /profiler/
[38]: /security/application_security/
[39]: /tracing/trace_pipeline/ingestion_controls/



