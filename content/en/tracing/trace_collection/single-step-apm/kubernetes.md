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
- A supported language runtime per the [SSI compatibility guide][36]
- **No existing tracer dependencies.** SSI silently disables itself if it detects `ddtrace`, `dd-trace`, an OpenTelemetry SDK, or `-javaagent` in your application. Before enabling SSI, check your dependency manifests:
  ```shell
  grep -rn "ddtrace\|dd-trace\|opentelemetry" requirements.txt package.json Gemfile go.mod pom.xml build.gradle 2>/dev/null
  ```
  Remove any matches and rebuild your application image before proceeding.
- **Node.js: CommonJS only.** SSI does not support ECMAScript Modules (ESM). If your application uses `import` syntax or sets `"type": "module"` in `package.json`, use [manually managed SDKs][44] instead.
- **Alpine and musl-based images:** Kubernetes SSI injects through the `LD_PRELOAD` environment variable, not `/etc/ld.so.preload`, so the Kubernetes injector supports musl-based images. Language and runtime compatibility still apply; for example, Ruby SSI requires glibc and is not compatible with Alpine or other musl-based images.

{{< agent-only >}}
Resolve these variables before starting:

| Variable | How to resolve |
|---|---|
| CLUSTER_NAME | `kubectl config current-context` or `spec.global.clusterName` in datadog-agent.yaml |
| AGENT_NAMESPACE | Namespace where the Datadog Agent is installed (default: `datadog`) |
| APP_NAMESPACE | Namespace of the user's application — ask the user |
| DEPLOYMENT_NAME | `metadata.name` in the application Deployment — ask the user or check their repo |
| APP_LABEL | `spec.selector.matchLabels.app` in the Deployment |
| SERVICE_NAME | `tags.datadoghq.com/service` label on the Deployment — ask the user |
| ENV | `tags.datadoghq.com/env` label on the Deployment — ask the user |

Pre-flight checks:
- `kubectl config current-context` returns the target cluster
- `helm version` confirms Helm is installed
- Check for existing Datadog deployment: `helm list -A | grep datadog`
- The user has a Datadog API key (do not ask them to share it in chat)
- Application language is one of: Java, Python, Ruby, Node.js, .NET, PHP
- Runtime version is within the SSI supported range per the compatibility guide
- For Node.js: confirm the app uses CommonJS, not ESM (`"type": "module"` in package.json means ESM)

Check for existing instrumentation that silently disables SSI. Check both dependency manifests AND source files:
- Dependency manifests: `grep -rn "ddtrace\|dd-trace\|opentelemetry\|dd-java-agent\|javaagent" requirements.txt package.json Gemfile go.mod pom.xml build.gradle`
- Python: `grep -rn "import ddtrace\|from ddtrace\|ddtrace.patch_all" *.py`
- Node.js: `grep -rn "require.*dd-trace\|require.*ddtrace\|DD.init" *.js`
- Java: look for `-javaagent` in Dockerfile CMD/ENTRYPOINT or `JAVA_TOOL_OPTIONS`
- .NET: `grep -rn "Tracer.Instance\|DD.Trace" *.cs`
- Ruby: `grep -rn "require.*ddtrace\|Datadog.configure" *.rb`
- PHP: `grep -rn "DDTrace" *.php`

Do NOT add `ddtrace-run` or `ddtrace` imports. SSI handles instrumentation automatically. Manual instrumentation causes SSI to silently disable itself.

Always configure SSI through the DatadogAgent manifest (Helm values or Operator CR). Never use `kubectl patch`. Always use `kubectl apply -f` with a YAML file.
{{< /agent-only >}}

## Enable SSI

<div class="alert alert-info">SSI does not instrument applications in the namespace where the Datadog Agent is installed. Install the Agent in a separate namespace.</div>

These steps enable SSI across your entire cluster. To instrument specific namespaces or pods, see [Target specific workloads](#target-specific-workloads).

{{< tabs >}}
{{% tab "In-app wizard" %}}

Datadog generates a configuration file with SSI enabled:

1. Go to the [Install the Datadog Agent on Kubernetes][11] page.
1. Choose your installation method, select an API key, and set up the Operator or Helm repository.
1. Under **Configure `datadog-agent.yaml`**, go to **Additional configuration** > **Application Observability** and turn on **APM Instrumentation**.

   {{< img src="tracing/trace_collection/k8s-apm-instrumentation-toggle.jpg" alt="APM Instrumentation toggle in the Kubernetes Agent installation wizard" style="width:100%;" >}}

1. Deploy the Agent with the generated configuration file.
1. Coordinate a restart of your application pods.

   <div class="alert alert-warning">Restarting application pods can cause a brief outage. Coordinate the restart with the application owner before running this command.</div>

   ```shell
   kubectl rollout restart deployment/<DEPLOYMENT_NAME> -n <APP_NAMESPACE>
   ```

[11]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes

{{% /tab %}}
{{% tab "Helm" %}}

If the Datadog Agent is not installed, set `DD_API_KEY` to your [Datadog API key][45]. Then, add the Datadog Helm repository and create a Kubernetes Secret:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
kubectl create namespace datadog --dry-run=client -o yaml | kubectl apply -f -
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY -n datadog --dry-run=client -o yaml | kubectl apply -f -
```

If you install the Agent in a different namespace, replace `datadog` with your Agent namespace.

Create or update `datadog-values.yaml`:

```yaml
datadog:
  apiKeyExistingSecret: datadog-secret
  clusterName: <CLUSTER_NAME>
  site: <DATADOG_SITE>
  apm:
    instrumentation:
      enabled: true
```

Replace `<CLUSTER_NAME>` with your Kubernetes cluster name and `<DATADOG_SITE>` with your [Datadog site][46].

If the Agent is already installed, add `apm.instrumentation.enabled: true` to your existing `datadog-values.yaml` and keep your existing API key, site, and cluster name configuration.

Deploy or update the Agent:

```shell
helm upgrade --install datadog-agent -f datadog-values.yaml datadog/datadog -n datadog
```

Coordinate a restart of your application pods:

<div class="alert alert-warning">Restarting application pods can cause a brief outage. Coordinate the restart with the application owner before running this command.</div>

```shell
kubectl rollout restart deployment/<DEPLOYMENT_NAME> -n <APP_NAMESPACE>
```

{{% /tab %}}
{{% tab "Datadog Operator" %}}

If the Datadog Operator and Agent are not installed, set `DD_API_KEY` to your [Datadog API key][45]. Then, install the Operator and create a Kubernetes Secret:

```shell
helm repo add datadog https://helm.datadoghq.com
helm repo update
helm upgrade --install datadog-operator datadog/datadog-operator --namespace datadog --create-namespace
kubectl create secret generic datadog-secret --from-literal api-key=$DD_API_KEY -n datadog --dry-run=client -o yaml | kubectl apply -f -
```

If you install the Agent in a different namespace, replace `datadog` with your Agent namespace.

Create or update `datadog-agent.yaml`:

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

Replace `<CLUSTER_NAME>` with your Kubernetes cluster name and `<DATADOG_SITE>` with your [Datadog site][46].

If the Agent is already installed with the Datadog Operator, add `features.apm.instrumentation.enabled: true` to your existing `DatadogAgent` manifest and keep your existing site, credentials, and cluster name configuration.

Apply the manifest:

```shell
kubectl apply -f datadog-agent.yaml
```

Coordinate a restart of your application pods:

<div class="alert alert-warning">Restarting application pods can cause a brief outage. Coordinate the restart with the application owner before running this command.</div>

```shell
kubectl rollout restart deployment/<DEPLOYMENT_NAME> -n <APP_NAMESPACE>
```

{{% /tab %}}
{{< /tabs >}}

<div class="alert alert-info">SSI adds a small amount of startup time to instrumented applications. If this overhead is not acceptable, contact <a href="/help/">Datadog Support</a>.</div>

<div class="alert alert-warning">If your cluster enforces PodSecurity <code>restricted</code> policies, the Datadog init container may be blocked with: <code>allowPrivilegeEscalation is false</code> or <code>violates PodSecurity "restricted:latest"</code>. See the <a href="/tracing/trace_collection/single-step-apm/troubleshooting/#environments-with-strict-pod-security-settings">SSI troubleshooting guide</a> for the required security context configuration.</div>

{{< agent-only >}}
Use one of the three tabs (In-app wizard, Helm, or Datadog Operator). For agents helping users, prefer the Helm or Operator tab.

Before changing configuration, check whether the Datadog Agent is already installed:
- `helm list -A | grep -i datadog`
- `kubectl get datadogagent -A`

If the Agent is not installed, follow the bootstrap steps in the selected tab: add the Datadog Helm repository, create the `datadog` namespace, create `datadog-secret`, set `site` and `clusterName`, and deploy the Agent.

If the Agent is already installed, add `instrumentation.enabled: true` to the user's existing Helm values or `DatadogAgent` manifest. Do not create a separate manifest.

If the user wants to pin SDK versions, recommend these defaults:
`java: "1"`, `python: "2"`, `js: "5"`, `dotnet: "3"`, `ruby: "2"`, `php: "1"`

After applying the config, confirm with the user before restarting their pods. After restart, wait for pods to be ready:
`kubectl wait --for=condition=Ready pod -l app=<APP_LABEL> -n <APP_NAMESPACE> --timeout=120s`

If `enabledNamespaces` or `disabledNamespaces` is set, SSI only instruments matching namespaces. You cannot set both. See the Target specific workloads section for workload targeting with `targets` and `podSelector`.
{{< /agent-only >}}

## Verify SSI is working

After restarting your application pods, wait two to three minutes for traces to arrive, then confirm SSI is working:

1. **Check for init containers.** Run this command against one of your application pods. The output should include `datadog-lib-<language>-init`:
   ```shell
   kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
   ```

2. **Generate traffic.** If your application does not receive traffic automatically, port-forward and send a few requests:
   ```shell
   kubectl port-forward deployment/<DEPLOYMENT_NAME> 8080:<APP_PORT> -n <APP_NAMESPACE>
   curl http://localhost:8080/
   ```

3. **Find your service.** Go to [**APM** > **Services**][42] and confirm your service appears.

4. **Confirm traces.** Go to [**APM** > **Traces**][43] and search for traces from your service.

If traces do not appear after five minutes, see the [SSI troubleshooting guide][35].

{{< agent-only >}}
How SSI works (use this to reason about failures):
1. Admission webhook (registered by Cluster Agent) intercepts pod creation
2. Webhook mutates the pod spec — adds a `datadog-lib-<language>-init` init container
3. Init container copies the tracer library onto a shared volume
4. `LD_PRELOAD` env var is set pointing to the library .so file
5. Application process loads the library automatically on startup

What each diagnostic layer can see:
- pup sees what Datadog's backend received. If pup shows no instrumented pods, the problem is in the cluster.
- kubectl sees cluster state. If kubectl shows the init container but pup shows no traces, the problem is post-injection.

pup CLI setup (if not already available):
- Install: `brew tap datadog-labs/pack && brew install pup`
- Authenticate: `pup auth login` (opens browser for OAuth)
- Verify: `pup auth status`

After the user restarts their pods, verify with these checks:

1. Init containers: `kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'`
   Expected: includes `datadog-lib-<language>-init`

2. If pup is available:
   - `pup fleet instrumented-pods list <CLUSTER_NAME>`
   - `pup apm services list --env <ENV>`
   - `pup traces search --query "service:<SERVICE_NAME>" --from 1h --limit 5`
   - `pup apm service-library-config get --service-name <SERVICE_NAME> --env <ENV>` (validates tracer config)

3. Runtime version (if compatibility is suspected):
   - `kubectl exec -n <APP_NAMESPACE> <POD_NAME> -- python --version`
   - `kubectl exec -n <APP_NAMESPACE> <POD_NAME> -- node --version`
   - `kubectl exec -n <APP_NAMESPACE> <POD_NAME> -- java -version`

No init container (injection never happened) — check:
- Namespace targeting: `kubectl get datadogagent datadog -n <AGENT_NAMESPACE> -o yaml | grep -A 15 instrumentation`
- Opt-out label: `kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.metadata.labels.admission\.datadoghq\.com/enabled}'` — if "false", the Admission Controller skips this pod
- Pod labels: `kubectl get pod <POD_NAME> -n <APP_NAMESPACE> --show-labels`
- Admission webhook registered: `kubectl get mutatingwebhookconfigurations | grep datadog`
- Cluster Agent running: `kubectl get pods -n <AGENT_NAMESPACE> -l app=datadog-cluster-agent`
- Whether the pod is in the Agent namespace (SSI skips its own namespace)

Init container present but no traces (tracer not reporting) — check:
- Existing instrumentation in application code or dependency manifests
- Agent APM receiver: `kubectl exec -n <AGENT_NAMESPACE> $(kubectl get pod -n <AGENT_NAMESPACE> -l app=datadog-agent -o name | head -1) -- agent status | grep -A 5 "APM Agent"`
- Injection errors: `kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.spec.nodeName}'` then `pup apm troubleshooting list --hostname <NODE_HOSTNAME> --timeframe 1h`
- Tracer status: `pup fleet tracers list --filter "service:<SERVICE_NAME>"`
- Agent connectivity: `pup fleet agents list --filter "hostname:<NODE_HOSTNAME>"`
{{< /agent-only >}}

## Configure Unified Service Tags

[Unified Service Tags][5] (USTs) apply consistent `service`, `env`, and `version` tags across traces, metrics, and logs. SSI can automatically extract UST values from your existing Kubernetes labels.

<div class="alert alert-warning">
Automatic label extraction is not compatible with <a href="/agent/remote_config/">Remote Configuration</a>. If you use Remote Configuration, <a href="#configure-usts-with-ddtraceconfigs">configure USTs with ddTraceConfigs</a> instead.
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

For complete instructions, see [setting USTs for Kubernetes services][5].

{{% /collapse-content %}}

## Next steps

After traces are flowing:

{{< whatsnext desc=" " >}}
    {{< nextlink href="/tracing/trace_explorer/" >}}Trace Explorer: search and analyze your traces{{< /nextlink >}}
    {{< nextlink href="/tracing/services/service_page/" >}}Service Page: monitor service health and performance{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/custom_instrumentation/" >}}Custom instrumentation: add application-specific spans{{< /nextlink >}}
    {{< nextlink href="/tracing/trace_collection/dynamic_instrumentation/" >}}Dynamic Instrumentation: add custom spans without redeploying{{< /nextlink >}}
{{< /whatsnext >}}

## Advanced SSI configuration

### Target specific workloads

By default, SSI instruments all services in all namespaces. Use one of the following methods to limit instrumentation scope.

{{< tabs >}}

{{% tab "Agent v7.64+ (Recommended)" %}}

Define targeting blocks with `targets` to control which workloads are instrumented and what configuration they receive.

| Key             | Description |
|------------------|-------------|
| `name`            | Target block name (metadata only). |
| `namespaceSelector` | Namespace(s) to instrument. Use `matchNames`, `matchLabels`, or `matchExpressions`. See the [Kubernetes selector documentation][10].|
| `podSelector`     | Pod(s) to instrument. Use `matchLabels` or `matchExpressions`. See the [Kubernetes selector documentation][10]. |
| `ddTraceVersions` | [Datadog APM SDK][9] version per language. |
| `ddTraceConfigs`  | SDK configuration: [Unified Service Tags][8], [additional products](#enable-additional-products), and [other APM settings][14]. |

Edit `datadog-values.yaml` (Helm) or `datadog-agent.yaml` (Operator). Targets are evaluated in order; the first match wins.

{{< collapse-content title="Example 1: Enable all namespaces except one" level="h4" >}}

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

{{< collapse-content title="Example 2: Instrument specific namespaces by name and label" level="h4" >}}

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
            - name: "DD_PROFILING_ENABLED"
              value: "auto"
        - name: "billing-service_apps"
          namespaceSelector:
            matchLabels:
              app: "billing-service"
          ddTraceVersions:
            python: "3.1.0"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Example 3: Different SDKs for different workloads" level="h4" >}}

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
           ddTraceConfigs:
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

{{< collapse-content title="Example 4: Target a pod within a namespace" level="h4" >}}

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

{{< collapse-content title="Example 5: Exclude specific pods with matchExpressions" level="h4" >}}

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

{{< collapse-content title="Example 6: Enable additional products" level="h4" >}}

Enable [App and API Protection][12] and [Continuous Profiler][11] for a namespace:

{{< highlight yaml "hl_lines=4-20" >}}
   apm:
     instrumentation:
       enabled: true
       targets:
         - name: "web-apps-with-security"
           namespaceSelector:
             matchNames:
               - "web-apps"
           ddTraceVersions:
             java: "default"
             python: "default"
           ddTraceConfigs:
             - name: "DD_APPSEC_ENABLED"
               value: "true"
             - name: "DD_PROFILING_ENABLED"
               value: "auto"
{{< /highlight >}}

{{< /collapse-content >}}

[8]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[9]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/#tracer-libraries
[10]: https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/#resources-that-support-set-based-requirements
[11]: /profiler/
[12]: /security/application_security/
[14]: /tracing/trace_collection/library_config/

{{% /tab %}}

{{% tab "Agent <=v7.63 (Legacy)" %}}

#### Namespace filtering

Enable or disable instrumentation for specific namespaces. You can set `enabledNamespaces` or `disabledNamespaces`, but not both.

{{< collapse-content title="Datadog Operator" level="h5" >}}

{{< highlight yaml "hl_lines=5-7" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         enabledNamespaces:
           - default
           - applications
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

{{< highlight yaml "hl_lines=5-7" >}}
   datadog:
      apm:
        instrumentation:
          enabled: true
          enabledNamespaces:
             - namespace_1
             - namespace_2
{{< /highlight >}}

{{< /collapse-content >}}

#### SDK versions

Specify SDK versions to control which languages are instrumented and which library versions are used. You can set versions at the [service level](#specify-at-the-service-level) (pod annotations) or at the [cluster level](#specify-at-the-cluster-level) (Agent config). Service-level settings take precedence.

If you don't specify versions, all supported languages are instrumented with the latest SDK.

##### Specify at the service level

Add a language annotation to your pod spec:

| Language   | Pod annotation                                                        |
|------------|-----------------------------------------------------------------------|
| Java       | `admission.datadoghq.com/java-lib.version: "<TAG>"`   |
| Node.js    | `admission.datadoghq.com/js-lib.version: "<TAG>"`     |
| Python     | `admission.datadoghq.com/python-lib.version: "<TAG>"` |
| .NET       | `admission.datadoghq.com/dotnet-lib.version: "<TAG>"` |
| Ruby       | `admission.datadoghq.com/ruby-lib.version: "<TAG>"`   |
| PHP        | `admission.datadoghq.com/php-lib.version: "<TAG>"`   |

Available versions: [Java][34], [Node.js][35], [Python][36], [.NET][37], [Ruby][38], [PHP][39].

<div class="alert alert-danger">Exercise caution with the <code>latest</code> tag. Major releases may introduce breaking changes.</div>

##### Specify at the cluster level

{{< collapse-content title="Datadog Operator" level="h5" >}}

{{< highlight yaml "hl_lines=5-8" >}}
   features:
     apm:
       instrumentation:
         enabled: true
         libVersions:
            dotnet: "x.x.x"
            python: "x.x.x"
            js: "x.x.x"
{{< /highlight >}}

{{< /collapse-content >}}

{{< collapse-content title="Helm" level="h5" >}}

{{< highlight yaml "hl_lines=5-8" >}}
   datadog:
     apm:
       instrumentation:
         enabled: true
         libVersions:
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

### Enable additional products

After SSI enables distributed tracing, you can activate additional SDK-dependent products:

{{< ssi-products >}}

To enable products:

- **With workload targeting (recommended):** Add `ddTraceConfigs` entries to your [target blocks](#target-specific-workloads). See [Example 6: Enable additional products](#target-specific-workloads).
- **With environment variables:** Set variables directly in your application configuration. See [Library Configuration][7].

### Configure injection modes

SSI supports multiple injection modes that control how library files are delivered to application containers. Adjust this setting if you notice pod startup delays or high resource usage during initialization.

| Mode | Description | Requirements |
|------|-------------|--------------|
| `init_container` | Copies files with an init container. | Agent deployed with Helm or Operator |
| `csi` | **In Preview.** Mounts files with the [Datadog CSI driver][37]. Faster pod startup. | Agent 7.76.0+, CSI driver 1.2.0+, Helm 3.178.1+ or Operator 1.25.0+ |

For `csi` mode, install and activate the CSI driver first. With Helm, set `datadog.csi.enabled: true`. See the [CSI driver documentation][37].

{{< collapse-content title="Set injection mode globally" level="h4" >}}

**Helm** — add to `datadog-values.yaml`:
```yaml
datadog:
  apm:
    instrumentation:
      injectionMode: <mode>
```

**Datadog Operator** — add to `datadog-agent.yaml`:
```yaml
features:
  apm:
    instrumentation:
      injectionMode: <mode>
```

Supported values: `init_container`, `csi`.

{{< /collapse-content >}}

{{< collapse-content title="Set injection mode per pod" level="h4" >}}

Add this annotation to the pod spec:

```yaml
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.injection-mode: "<mode>"
```

Supported values: `init_container`, `csi`.

{{< /collapse-content >}}

### Change the image registry

Datadog publishes SDK images on gcr.io (default), Docker Hub, and Amazon ECR. To use a different registry, set `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` in the Cluster Agent config:

| Registry | Value |
|----------|-------|
| gcr.io (default) | `gcr.io/datadoghq` |
| Docker Hub | `docker.io/datadog` |
| Amazon ECR | `public.ecr.aws/datadog` |

For detailed instructions, see [Changing Your Container Registry][33].

{{% collapse-content title="Use a private container registry" level="h4" expanded=false %}}

If your organization cannot pull from public registries, mirror the Datadog images to your private registry:

1. [Mirror the images][34] for the languages you are instrumenting. At minimum, mirror `apm-inject` and the `dd-lib-<language>-init` images you need.

2. Tag the images to match your configuration. If you set `ddTraceVersions` to `java: "1"` and `python: "3"`, mirror:
   - `apm-inject:0`
   - `dd-lib-java-init:1`
   - `dd-lib-python-init:3`

3. Set `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_CONTAINER_REGISTRY` to your private registry URL.

{{% /collapse-content %}}

### Container Network Interface on EKS

When using a CNI like Calico on EKS, control plane nodes cannot connect to the Admission Controller. Set `useHostNetwork: true` on the Cluster Agent:

```yaml
clusterAgent:
  useHostNetwork: true
```

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

## SSI best practices

{{% collapse-content title="Use opt-in labels for controlled rollout" level="h3" expanded=false %}}

| Mode    | Behavior    | When to use |
| ---  | ----------- | ----------- |
| Default | All supported processes are instrumented. | Small clusters or prototypes. |
| Opt-in | [Workload targeting](#target-specific-workloads) restricts instrumentation to labeled pods. | Production clusters, staged rollouts, cost-sensitive environments. |

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

{{% collapse-content title="Pin SDK versions" level="h3" expanded=false %}}

Use `ddTraceVersions` to control which SDK versions are injected. This reduces init container size, avoids downloading unnecessary SDKs, and makes tracer upgrades deliberate.

```yaml
targets:
  - name: default-target
    ddTraceVersions:
      java:   "1"
      python: "3"
      js:     "5"
      php:    "1"
      dotnet: "3"
```

{{% /collapse-content %}}

## Troubleshooting

If you encounter problems with SSI, see the [SSI troubleshooting guide][35].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://v3.helm.sh/docs/intro/install/
[2]: https://kubernetes.io/docs/tasks/tools/install-kubectl/
[3]: /tracing/glossary/#instrumentation
[5]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes#containerized-environment
[7]: /tracing/trace_collection/library_config/
[11]: https://app.datadoghq.com/fleet/install-agent/latest?platform=kubernetes
[33]: /containers/guide/changing_container_registry/
[34]: /containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[35]: /tracing/trace_collection/single-step-apm/troubleshooting
[36]: /tracing/trace_collection/single-step-apm/compatibility/
[37]: /containers/kubernetes/csi_driver/
[42]: https://app.datadoghq.com/apm/services
[43]: https://app.datadoghq.com/apm/traces
[44]: /tracing/trace_collection/dd_libraries/nodejs/
[45]: https://app.datadoghq.com/organization-settings/api-keys
[46]: /getting_started/site/
