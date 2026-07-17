---
title: Troubleshooting Single Step APM
description: "Diagnose and fix Single Step Instrumentation (SSI) issues on Kubernetes, Linux, Docker, and Windows. Covers missing traces, silent failure modes, injection verification, Fleet Automation diagnostics, and language-specific troubleshooting."
aliases:
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/troubleshooting/
further_reading:
- link: /tracing/trace_collection/single-step-apm/
  tag: Documentation
  text: Single Step APM Instrumentation
- link: https://learn.datadoghq.com/courses/troubleshooting-apm-instrumentation-on-a-host
  tag: Learning Center
  text: Troubleshooting APM Instrumentation on a Host
---

## Overview

[Single Step Instrumentation (SSI)][2] instruments applications by automatically loading application processes with the Datadog SDKs. SSI works for applications running on Linux hosts, in container environments such as Kubernetes and Docker, and for .NET applications served by Windows IIS, without requiring changes to application dependencies or images. If you enabled SSI but don't see traces, use this guide to find and fix the cause. For further assistance, contact [Datadog Support][1].

## How SSI injection works

Understanding the injection mechanism helps you reason about where a failure occurs.

**Kubernetes:**

1. An admission webhook (registered by the Cluster Agent) intercepts pod creation.
2. The webhook mutates the pod spec, adding a `datadog-lib-<language>-init` init container.
3. The init container copies the tracer library onto a shared volume.
4. The `LD_PRELOAD` environment variable is set, pointing to the library `.so` file.
5. The application process loads the library automatically on startup.

**Linux hosts and Docker:**

1. The installer adds the Datadog launcher to `/etc/ld.so.preload`.
2. Each newly launched process preloads `launcher.preload.so`.
3. The launcher detects the runtime and loads the matching tracer library into the process.

Two vantage points help you locate a failure:

- Cluster or host state (`kubectl`, `/proc/<PID>/maps`, `/etc/ld.so.preload`) shows whether injection was applied.
- The Datadog UI (**APM** > **Services** and **Traces**) shows what the backend received.

If injection was applied but no traces reach the backend, the problem is post-injection: the tracer isn't reporting, the Agent can't be reached, or existing instrumentation took precedence.

SSI fails silently in several cases. It produces no error when it detects existing instrumentation, when the runtime version is unsupported, when a process isn't restarted after SSI is enabled, or when a pod is opted out or runs in the Agent's namespace. The checks below surface these cases.

## First checks: no traces after enabling SSI

Work through these checks in order for your platform.

### All platforms

1. **Did you restart your application after enabling SSI?** SSI injects at startup. Existing processes and pods are not instrumented until restarted.

2. **Does your application have existing tracer dependencies?** SSI silently disables itself if it detects `ddtrace`, `dd-trace`, an OpenTelemetry SDK, or `-javaagent` in your application. Check your dependency manifests and startup scripts:
   ```shell
   grep -rn "ddtrace\|dd-trace\|opentelemetry\|dd-java-agent\|javaagent" requirements.txt package.json Gemfile go.mod pom.xml build.gradle 2>/dev/null
   ```
   For Java, also check Dockerfiles and startup scripts for `-javaagent` flags, and check the `JAVA_TOOL_OPTIONS` environment variable. Remove any matches and rebuild your application before proceeding.

3. **Is the runtime version supported?** Check the [SSI compatibility guide][3].

4. **For Node.js: is your application using ECMAScript Modules (ESM)?** SSI does not support ESM. If your application uses `import` syntax or sets `"type": "module"` in `package.json`, use [manually managed SDKs][4] instead.

### Kubernetes

First, confirm whether injection happened. Run this against one application pod. The output should include `datadog-lib-<language>-init`:

```shell
kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.spec.initContainers[*].name}'
```

#### No init container (injection never happened)

Injection was never applied to the pod. Check:

- **Namespace and target configuration:**
  ```shell
  kubectl get datadogagent datadog -n <AGENT_NAMESPACE> -o yaml | grep -A 15 instrumentation
  ```
  Confirm your `enabledNamespaces`, `disabledNamespaces`, or `podSelector` targets match your application's namespace and labels.
- **Opt-out label**: if this returns `false`, the Admission Controller skips the pod:
  ```shell
  kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.metadata.labels.admission\.datadoghq\.com/enabled}'
  ```
- **Pod labels** (confirm the pod matches your targeting selectors):
  ```shell
  kubectl get pod <POD_NAME> -n <APP_NAMESPACE> --show-labels
  ```
- **Admission webhook registered:**
  ```shell
  kubectl get mutatingwebhookconfigurations | grep datadog
  ```
- **Cluster Agent running:**
  ```shell
  kubectl get pods -n <AGENT_NAMESPACE> -l app=datadog-cluster-agent
  ```
- **Agent namespace**: SSI does not instrument pods in the namespace where the Datadog Agent runs.

#### Init container present but no traces (tracer not reporting)

The library was injected but no traces arrive. Check:

- **Existing instrumentation** in application code or dependency manifests. Manual instrumentation (a bundled tracer, `-javaagent`, or `ddtrace` imports) causes SSI to disable itself silently.
- **Agent APM receiver:**
  ```shell
  kubectl exec -n <AGENT_NAMESPACE> $(kubectl get pod -n <AGENT_NAMESPACE> -l app=datadog-agent -o name | head -1) -- agent status | grep -A 5 "APM Agent"
  ```
- **Cluster node the pod is scheduled on** (for correlating Agent connectivity):
  ```shell
  kubectl get pod <POD_NAME> -n <APP_NAMESPACE> -o jsonpath='{.spec.nodeName}'
  ```
- **Wrong service or environment** on the traces you do see indicates a Unified Service Tagging problem. See [Unified Service Tagging][7] and [Injection appears successful but traces are missing](#injection-appears-successful-but-traces-are-missing).

#### Runtime version (when compatibility is suspected)

```shell
kubectl exec -n <APP_NAMESPACE> <POD_NAME> -- python --version
kubectl exec -n <APP_NAMESPACE> <POD_NAME> -- node --version
kubectl exec -n <APP_NAMESPACE> <POD_NAME> -- java -version
```

Compare against the [SSI compatibility guide][3].

### Linux hosts and Docker

1. **Is the launcher loaded into the process?** The authoritative check is the process memory map. A successfully instrumented process shows **both** the launcher (`launcher.preload.so`) and a language library:
   ```shell
   grep -E "launcher.preload.so|/opt/datadog/apm/library/" /proc/<PID>/maps
   ```
   If both appear, injection succeeded. If the launcher appears but no language library does, the runtime wasn't detected or is unsupported. If neither appears, the preload isn't active for this process; continue with the checks below.

2. **Was the process started after SSI was enabled?** The preload applies only to processes launched after `/etc/ld.so.preload` was written. Compare the process start time against the file's modification time:
   ```shell
   ps -o lstart= -p <PID>
   stat -c %y /etc/ld.so.preload
   ```

3. **Is `/etc/ld.so.preload` configured?** SSI on Linux uses `/etc/ld.so.preload` to load the launcher. Check:
   ```shell
   cat /etc/ld.so.preload
   ```
   The output should contain `/opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so`.

4. **Is the application using musl libc or a static binary?** The SSI launcher on Linux requires glibc. Applications on Alpine or other musl-based distributions, and statically linked binaries (common with Go), cannot be instrumented with SSI. Check the libc and binary type:
   ```shell
   ldd --version         # musl indicates an incompatible libc
   file /proc/<PID>/exe  # "statically linked" indicates an incompatible binary
   ```

5. **Is SELinux or AppArmor blocking the launcher?** Security policies can prevent `/etc/ld.so.preload` from being read. Check `getenforce` (SELinux) or `dmesg | grep apparmor` (AppArmor) for denials.

6. **Is the Agent APM receiver up?**
   ```shell
   datadog-agent status | grep -A 5 "APM Agent"
   ```

If none of these apply, continue with the diagnostic methods below.

## Troubleshooting methods

You can investigate injection issues in the Datadog UI with Fleet Automation, or manually at the container level. For a lower-level view of what the injector decided for each process, see [Injector debug logs](#injector-debug-logs).

### Troubleshoot injection in Datadog Fleet Automation

Fleet Automation provides two types of instrumentation insights for SSI:

- **Process-level insights** show instrumentation status and SDK installation details for individual hosts or containers.
- **Kubernetes cluster insights** provide a higher-level view of instrumentation across your clusters, helping you understand how SSI configuration and injection are applied at scale.

Together, these views let you diagnose injection issues from both the process and cluster perspectives.

#### Prerequisites

This functionality is available for:

- **Languages**: Python, Java, Node.js, PHP, .NET
- **Environments**: Linux hosts, containers, Kubernetes
- Datadog Agent v7.68.2+

#### View process-level insights

Use process-level insights to verify whether SSI has been correctly applied to your application processes and to identify any injection failures.

1. Navigate to [Fleet Automation][5].
1. Use facets to filter down to relevant hosts:
   - `single_step_instrumentation` shows which hosts have SSI enabled or disabled.
   - `single_step_instrumentation_status` shows which hosts have encountered issues with service instrumentation.
1. Select a host to open the Agent details panel.
1. In the Agent panel, go to the {{< ui >}}Services{{< /ui >}} tab.
1. If SSI is enabled on the host, the tab shows:
   - A banner with the message: "Single Step Instrumentation is enabled on this host."
   - An {{< ui >}}SDK Installations{{< /ui >}} section if there are issues to troubleshoot.

#### View Kubernetes cluster insights

Use cluster-level insights to understand how SSI is configured and functioning across your Kubernetes clusters. These insights extend troubleshooting beyond individual processes to show how instrumentation is applied to workloads at the cluster level.

1. Navigate to [{{< ui >}}Fleet Automation{{< /ui >}}][5] > {{< ui >}}View Agents{{< /ui >}}, and select {{< ui >}}Kubernetes Clusters{{< /ui >}} in the upper-right corner.
1. Select a cluster to view its details, including:
   - Whether the cluster is managed by Helm or the Datadog Operator
   - The Cluster Agent and Node Agent versions
   - The integrations and services running on each host
1. Open the {{< ui >}}Single Step Instrumentation{{< /ui >}} tab to review:
   - The cluster's SSI configuration (YAML view)
   - The pods identified as instrumentation targets based on cluster configuration or pod-level annotations
   - The status of each targeted pod, including whether instrumentation succeeded
   - The SDKs injected into each pod, including language and version
   - Whether each instrumented workload is generating traces
1. Hover over any status icon to see contextual details about the state of instrumentation or trace collection.

{{< img src="tracing/trace_collection/k8s-ssi-tab.png" alt="The Single Step Instrumentation tab for a Kubernetes cluster, showing the SSI config yaml and a list of instrumented pods" style="width:100%;" >}}

### Manually verify injection in the application container

If the Datadog UI does not show any instrumentation issues, or if you're troubleshooting a single service or container, you can manually verify whether injection occurred as expected. This method is helpful when debugging in environments where centralized visibility is limited or when a specific service isn't reporting traces.

To confirm injection at the container level, check that:

1. `/etc/ld.so.preload` includes the following entry:
   ```
   /opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so
   ```
2. The `LD_PRELOAD` environment variable is set to the same value.
3. The directory `/opt/datadog-packages/datadog-apm-inject` exists, with `stable` and `$version` subdirectories.
4. Language-specific directories exist (for example, `/opt/datadog/apm/library/java/` for Java).

For a running process, `/proc/<PID>/maps` is the authoritative confirmation: it shows both `launcher.preload.so` and the loaded language library. See [Linux hosts and Docker](#linux-hosts-and-docker).

To enable debug logs during manual verification:

1. Set the following in your pod spec:

   {{< code-block lang="yaml" disable_copy="true" collapsible="true" >}}
   env:
     - name: DD_TRACE_DEBUG    # debug logging for the SDK
       value: "true"
     - name: DD_APM_INSTRUMENTATION_DEBUG    # debug logging for the injector
       value: "true"
   {{< /code-block >}}

2. Delete the pod to enable debug logs during injection.

## Injector debug logs

Injector debug logs show what the injector decided for each process: whether injection succeeded, was denied, or was skipped, and why. Enable them when [Fleet Automation](#troubleshoot-injection-in-datadog-fleet-automation) doesn't explain a failure, when you're diagnosing at the host or container level, or when you're collecting information for [Datadog Support][1].

Injector debug logs are separate from tracer debug logs. Use injector logs to diagnose whether and how a tracer was injected; after injection, use [tracer debug logs][6] to diagnose the tracer running inside the process.

### Enable debug mode

Set the following environment variable on the process you want to instrument:

```
DD_APM_INSTRUMENTATION_DEBUG=true
```

This raises the injector log level to `DEBUG` and adds `stderr` as a log sink.

The variable must be set in the environment that the injected process inherits:

#### Host

Export the variable before starting the process:

```sh
export DD_APM_INSTRUMENTATION_DEBUG=true
./my-service
```

#### Docker

Add the environment variable to the application container:

```sh
docker run -e DD_APM_INSTRUMENTATION_DEBUG=true my-image
```

Debug output appears in the container logs (`docker logs <container>`).

#### Kubernetes

Add the variable to the container spec in your pod template:

{{< code-block lang="yaml" disable_copy="true" >}}
spec:
  containers:
    - name: my-app
      env:
        - name: DD_APM_INSTRUMENTATION_DEBUG
          value: "true"
{{< /code-block >}}

Alternatively, add the following pod annotation to enable debug mode without editing the container spec:

{{< code-block lang="yaml" disable_copy="true" >}}
metadata:
  annotations:
    admission.datadoghq.com/apm-inject.debug: "true"
{{< /code-block >}}

Debug output appears in the application pod logs (`kubectl logs <pod>`).

### Review debug logs

#### Where to find the logs

With debug mode enabled, the injector writes to the `stderr` of the instrumented process:

| Environment | Where to look |
| --- | --- |
| Host or shell | The process's terminal, or wherever its `stderr` is redirected |
| Docker | `docker logs <container>` |
| Kubernetes | `kubectl logs <pod>` (the application pod, not the Cluster Agent) |

**Note**: To send debug output to a file instead of `stderr`, set `DD_APM_INSTRUMENTATION_OUTPUT_PATHS` to an absolute path.

#### Successful injection

To confirm that injection occurred, look for the log block whose executable matches your runtime. The following example shows a successful Node.js injection:

```
<DEBUG> ... [linux/process.c:405] process_exe: 'node'
<DEBUG> ... [linux/process.c:443] Main executable path: '/usr/local/bin/node'
<DEBUG> ... [workload_selection.c:147] Workload selection allowed injection: continuing
<DEBUG> ... [workload_selection.c:90] Succesfully loaded policy: 'requirements.bin from SDK policies' from '/opt/datadog-packages/datadog-apm-inject/0.67.0/requirements/nodejs/requirements.bin' [size: 3864]
<DEBUG> ... [languages.c:71] detected language: 'nodejs'
<DEBUG> ... [languages.c:72] detected language version: '20.20.2'
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TELEMETRY_FORWARDER_PATH=/opt/datadog-packages/datadog-apm-inject/0.67.0/inject/process
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_TAGS=_dd.injection.mode:k8s
<DEBUG> ... [linux/env_injector.c:38] injection config: DD_INJECTION_ENABLED=tracer
<DEBUG> ... [linux/env_injector.c:38] injection config: NODE_OPTIONS=--require /opt/datadog/apm/library/js/node_modules/dd-trace/init.js
<INFO>  ... [./libinject.c:81] injection duration: 1.066500 ms
<DEBUG> ... [injection_metadata.c:101] sending injection-metadata telemetry: result='0', result_reason='injection completed successfully'
<DEBUG> ... [./libinject.c:231] injector finished
```

| Log line | Meaning |
| --- | --- |
| `process_exe: '<exe>'` / `Main executable path: '<path>'` | The process being evaluated. |
| `Workload selection allowed injection: continuing` | Policy permitted injection. |
| `Succesfully loaded policy: 'requirements.bin...'` | The language requirements policy for the detected runtime was loaded. |
| `detected language: '<lang>'` / `detected language version: '<version>'` | The runtime was identified (`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`) and its version was read. |
| `injection config: <VAR>=<value>` | Each environment variable the injector set. Seeing `DD_INJECTION_ENABLED=tracer` plus the language-specific variable (for example, `NODE_OPTIONS` or `JAVA_TOOL_OPTIONS`) confirms the tracing SDK was loaded. |
| `injection duration: <N> ms` | Injection completed and the elapsed time. |
| `injection completed successfully` (`result='0'`) | The injector reported a successful injection to telemetry. A non-zero `result` with a different `result_reason` indicates a failure. |
| `injector finished` | The injector constructor returned. |

#### Common log messages

**Injection disabled**

If `DD_INSTRUMENT_SERVICE_WITH_APM=false` or injection is otherwise disabled:

```
<DEBUG> ... [libinject.c:115] disabled flag set, not injecting
```

The injector loaded but intentionally skipped injection. Remove `DD_INSTRUMENT_SERVICE_WITH_APM=false` or set it to `true` to allow injection.

**No runtime detected**

If the process is not a supported language runtime:

```
<DEBUG> ... [libinject.c:175] No known runtime was detected - not injecting!
```

The injector ran but the process is not one it instruments (`nodejs`, `java`, `python`, `ruby`, `dotnet`, `php`). This is expected for non-application processes.

**Workload selection denied**

```
<DEBUG> ... [workload_selection.c:149] Workload selection denied injection
```

A policy prevented injection for this process. The preceding `Evaluating '<policy-name>'` lines show which rule matched and the values it compared.

**Re-exec detected**

```
<DEBUG> ... [libinject.c:102] Re-exec detected!
```

The process re-executed itself so that the injected environment variables take effect. This is expected behavior. Injection continues in the re-executed process, which produces its own set of debug lines.

## Configuration that can block injection

Several configuration mechanisms can block or alter injection behavior.

### Storage requirements

SSI downloads language SDKs and an injector package onto each host. The amount of disk space required depends on the number of languages in use and the number of pods being instrumented. A rough estimate is:

<div style="text-align:center;">
  <pre><code>[sum of the language library sizes]
+
[injector package size] * [number of injected pods per host]</code></pre>
</div>

Because library packages are updated frequently and may grow when support for new language versions is added, disk usage can change over time. If your environment has limited disk space, monitor package sizes and allow extra capacity to avoid injection failures.

### Injector version

To set the injector version:

- At the cluster level:

  Set in `values.yaml` under `datadog.apm.instrumentation.injector.imageTag`.

- At the pod level:

  Set with the annotation `admission.datadoghq.com/apm-inject.version`.

For host or Docker injection, modifying the `auto_inject` version is not recommended.

### Allow and deny lists

#### Default deny list

Datadog maintains an internal deny list to prevent injection into certain processes (for example, IDEs or databases). If a process command or entrypoint is on this list, the injector skips the injection process.

#### Linux instrumentation rules

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSdMu6WAsUCD3djkl_oN0Qh7fQmBCiKYyUvuqlYWRyObebAc6Q/viewform" header="Join the Preview!">}}
Instrumentation rules are available for Linux-based apps through a limited availability preview. To configure allow or deny rules for process injection, sign up for preview access.
{{< /callout >}}

#### Kubernetes instrumentation rules

Instrumentation rules enable injection based on Kubernetes labels and selectors. Rules to consider:

1. `disabledNamespaces` always takes precedence.
2. When a pod initializes, the target list is checked from top to bottom. Only the first matching rule applies per pod.

#### Injection container flagged by security scanners

Security tools may flag the `apm-inject` container because it runs an executable at startup, which can resemble malicious software.

The container's behavior is expected and safe; the executable configures the environment for auto-instrumentation.

Datadog adheres to security best practices and works with security vendors to allowlist this container.

### Environments with strict pod security settings

If pod security rules block the Datadog init container, you may see errors like:

```
Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false
```

To resolve this, set one of the following Cluster Agent options:

- `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_SECURITY_CONTEXT`
- `admission_controller.auto_instrumentation.init_security_context`

The value should be a JSON string that applies the necessary security context to the Datadog init containers.

### Custom instrumentation

Custom instrumentation still requires you to import the SDK. Configuration variables like .NET's `DD_TRACE_METHODS` remain available for defining custom spans.

### SDK environment variables do not disable SSI

Setting `DD_TRACE_ENABLED=false` does not prevent SSI from loading the SDK. The [injector][8] runs before the SDK evaluates its environment variables, so SDK-level environment variables have no effect on SSI. To disable or remove SSI, see your platform's [SSI setup page][9].

## Environment-specific issues

### Host and Docker

#### Host injection does not apply to existing processes

The preload library only injects into newly launched processes. Start a new shell session or log out and log back in to apply instrumentation.

**Note**: Docker-based injection does not have this limitation.

#### Injection fails on small instance types

The preload library allows the analyzer one second to complete its work. On small VM instances running multiple services (for example, `t2.micro`), this time limit may be exceeded. To overcome this issue, use a larger instance size, such as `t2.small`.

#### Stale package registration

`datadog-installer status` reports what's registered in the installer's package database, not what's present on disk. A package can appear installed while its files are missing. For example, `datadog-installer status` lists `datadog-apm-library-<lang>` while `/opt/datadog-packages/datadog-apm-library-<lang>/` is empty. When this happens, injection finds no library to load and no traces appear.

Confirm the on-disk state:

```shell
ls /opt/datadog-packages/datadog-apm-library-<lang>/
```

If the directory is empty or missing, remove the stale registration and reinstall:

```shell
datadog-installer remove datadog-apm-library-<lang>
```

Then re-run your platform's SSI installation command.

#### Errors after manual uninstallation of Agent files

If you manually delete Agent files, you may see errors like:

```
ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored
```

To properly uninstall SSI, follow the platform-specific instructions:

* [Kubernetes][10]
* [Docker][11]
* [Linux][12]
* [Windows][13]

#### Injection not working with rootless Docker

When using rootless Docker, set `docker_socket` in `/etc/datadog-agent/inject/docker_config.yaml` to the path of the Docker socket used by the current user (typically `/run/user/$UID/docker.sock`). No reboot is required.

#### Injection fails with statically linked launchers

If a custom launcher is statically linked (common with Go), the preload library might not be invoked. Injection can still succeed if:

- The launcher's command line includes the language name
- The launcher runs an intermediary dynamically linked program

However, direct process launches from statically linked binaries are not injected.

### Kubernetes

The Datadog Admission Controller must be deployed and configured before application pods are created; it cannot modify existing pods.

To troubleshoot Admission Controller issues:

1. Check Cluster Agent pod health:
   ```
   kubectl get pods
   kubectl get deployments
   ```
1. Check the Cluster Agent leader logs for `INFO` messages indicating successful Admission Controller startup. For example:

   ```
   Group version 'admissionregistration.k8s.io/v1' is available, Starting secrets controller, Starting webhook controller
   ```

1. Check the Admission Controller status by doing one of the following:

   - Run `agent status` inside the Cluster Agent pod to get a live status output.
   - If troubleshooting retrospectively, check `status.log` within a flare. When a flare is generated, the system runs `agent status` and stores the output in `status.log`.

   In both cases, find the Admission Controller and Webhooks sections, and verify the following:
   - All expected `MutatingWebhookConfiguration` resources are listed (for auto-instrumentation, configuration injection, and tag injection).
   - The webhook configurations reference the correct Secret.
   - The CA bundle digest matches across configurations.

1. Inspect injection attempts in `telemetry.log` or in the output of the following command:

   ```
   kubectl exec -it <cluster agent pod> agent telemetry
   ```

   Look for `admission_webhooks_library_injection_attempts` to see injection attempts by language.

#### Failed mutations

The Cluster Agent logs warnings and errors for injection failures, typically from `admission/server.go`. For example, a warning might appear if `JAVA_TOOL_OPTIONS` is set using `valueFrom`.

Use the metric `datadog.cluster_agent.admission_webhooks.library_injection_errors` for further debugging.

#### Language annotation cannot be applied

During setup, SSI detects the application language of your service and applies a service label in the form `internal.dd.datadoghq.com/service-name.detected_langs`. If the label cannot be applied, injection fails.

Sometimes, labeling errors occur because a service name breaks Kubernetes string limits ([63 characters][14]). For example:

```
languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters
```

String limit violations are common if service tags are not explicitly set through [Unified Service Tagging][7], in which case default image names are used.

#### Injection appears successful but traces are missing

If logs show no issues but traces are missing, there may be an application-side misconfiguration. Verify that:

- Required annotations and labels are present.
- [Unified Service Tagging][7] is set up correctly.
- Allow/deny lists for instrumentation rules are properly defined.

## Language-specific issues

### Java

#### `JAVA_TOOL_OPTIONS` is too long

The `JAVA_TOOL_OPTIONS` environment variable has a JVM-enforced limit of 1024 characters. During injection, Datadog appends a `-javaagent` flag to this variable to enable tracing. If the combined value exceeds the limit, the JVM emits a warning and ignores the variable, preventing injection.

To avoid this issue, exclude the affected process from injection.

#### `JAVA_TOOL_OPTIONS` changes program output

When `JAVA_TOOL_OPTIONS` is set, the JVM prints a message to stdout, such as `Picked up JAVA_TOOL_OPTIONS: -Xmx1024m`. If a process reads and depends on this output, it may be affected.

As of version 0.12.2, injection is skipped for `java -version` to avoid interfering with processes that parse its output.

#### Multiple Java sites report under the same service name

By default, Single Step sets the `DD_SERVICE` environment variable, which applies a single service name across all web applications running on the same server (such as Tomcat or WebLogic). As a result, all sites report under the same name.

Use one of the following options to enable **split-by-tags** so that each site reports under its own name:

- JVM system property: `-Ddd.trace.split-by-tags=servlet.context`
- Environment variable: `DD_TRACE_SPLIT_BY_TAGS=servlet.context`

#### Tracer already exists

SSI does not inject into applications that already use a `-javaagent` option or other tracing configuration.

### Ruby

Ruby injection modifies the `Gemfile` to add the Datadog SDK. If injection support is later removed, the application may fail to start due to the missing dependency.

To resolve this, restore the original `Gemfile`. If you still want to use APM after removing injection, run `bundle install` to download the gem.

### Python

Versions <=2.7.5 contain a pre-packaged protobuf dependency that can conflict with system libraries.

### .NET

#### SSI is applied but no .NET traces reach the Agent

If SSI annotations and init containers are present on the pod but no .NET traces arrive, another profiler may have precedence. Check `CORECLR_PROFILER` on the main container. If the value is not `{846F5F1C-F9AE-4B07-969E-05C26BC060D8}` (the Datadog .NET tracer CLSID), another profiler is loaded instead of Datadog.

Remove the conflicting `CORECLR_*` environment variables (and any `LD_PRELOAD` entries that reference the other profiler) from the source that injected them: another vendor's operator, init container, pod template, or Helm values. Then roll the pods. The [.NET CLR Profiling API allows only one subscriber per process][15].

## Collect diagnostic information for support

When contacting support about injection issues, collect the following information to assist troubleshooting:

1. Are you using host injection, Docker injection, or both?
1. Verify that the `/opt/datadog-packages/datadog-apm*` directories exist.
1. For host injection, check for the existence and permissions of `/etc/ld.so.preload`:

   ```
   sudo ls -l /etc/ld.so.preload
   ```

   It should be owned by `root` with `644` permissions (`-rw-r--r--`).

1. Enable injector debug logs and collect the output. For instructions, see [Injector debug logs](#injector-debug-logs).

1. Provide an Agent flare.

### Additional information for Kubernetes-based injection

Collect the following details if troubleshooting injection in a Kubernetes environment:

- The method used to deploy the Cluster Agent (for example, Helm, Datadog Operator, or kubectl commands).
- Deployment files for the application pod.
- Flares from both the Node Agent and the Cluster Agent, ideally with `DEBUG` mode enabled.
- Output of:
  ```
  kubectl describe pod <app pod>
  ```
- Injector debug logs from the application pod (not the Cluster Agent). For instructions, see [Injector debug logs](#injector-debug-logs).

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /help/
[2]: /tracing/trace_collection/single-step-apm/
[3]: /tracing/trace_collection/single-step-apm/compatibility/
[4]: /tracing/trace_collection/dd_libraries/nodejs/
[5]: https://app.datadoghq.com/fleet
[6]: /tracing/troubleshooting/tracer_debug_logs/
[7]: /getting_started/tagging/unified_service_tagging/
[8]: /tracing/guide/injectors/
[9]: /tracing/trace_collection/single-step-apm/#instrument-sdks-across-applications
[10]: /tracing/trace_collection/single-step-apm/kubernetes?tab=agentv764recommended#remove-apm-for-all-services-on-the-infrastructure
[11]: /tracing/trace_collection/single-step-apm/docker#remove-apm-for-all-services-on-the-infrastructure
[12]: /tracing/trace_collection/single-step-apm/linux#remove-single-step-apm-instrumentation-from-your-agent
[13]: /tracing/trace_collection/single-step-apm/windows#remove-single-step-apm-instrumentation-from-your-agent
[14]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set
[15]: /tracing/trace_collection/dd_libraries/dotnet-core/#installation-and-getting-started
