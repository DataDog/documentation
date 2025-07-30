---
title: Troubleshooting Single Step APM
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation (SSI) helps instrument applications by automatically loading application processes with the Datadog APM SDKs. SSI works for applications running on Linux hosts, in container environments such as Kubernetes and Docker, and for .NET applications served by Windows IIS—without requiring changes to application dependencies or images. If you encounter issues enabling APM with SSI, use this guide to troubleshoot and resolve common problems. For further assistance, contact [Datadog Support][1].
## Host and Docker instrumentation

### Host injection does not apply to existing processes

The preload library only injects into newly launched processes. Start a new shell session or log out and log back in to apply instrumentation.

**Note:** Docker-based injection does not have this limitation.

### Injection fails on small instance types

The preload library allows the analyzer one second to complete its work. On small VM instances running multiple services (for example, `t2.micro`), this time limit may be exceeded. To overcome this issue, use a larger instance size, such as `t2.small`.

### Errors after manual uninstallation of agent files

If you manually delete agent files, you may see errors like:
```
ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored
```

To properly uninstall SSI, follow the platform-specific instructions:

* [Kubernetes][1]
* [Docker][2]
* [Linux][3]
* [Windows][3]

### Injection not working with rootless Docker

When using rootless Docker, set `docker_socket` in `/etc/datadog-agent/inject/docker_config.yaml` to the path of the Docker socket used by the current user (typically `/run/user/$UID/docker.sock`). No reboot is required.

### Injection fails with statically linked launchers

If a custom launcher is statically linked (common with Go), the preload library might not be invoked. Injection can still succeed if:
- The launcher's command line includes the language name
- The launcher runs an intermediary dynamically linked program

However, direct process launches from statically linked binaries are not injected.

## Kubernetes instrumentation

### Ensure the Admission Controller is configured and running

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

### Failed mutations

The Cluster Agent logs warnings and errors for injection failures, typically from `admission/server.go`. For example, a warning might appear if `JAVA_TOOL_OPTIONS` is set using `valueFrom`.

Use the metric `datadog.cluster_agent.admission_webhooks.library_injection_errors` for further debugging.

#### Language annotation cannot be applied

During setup, SSI detects the application language of your service and applies a service label in the form `internal.dd.datadoghq.com/service-name.detected_langs`. If the label cannot be applied, injection fails.

Sometimes, labeling errors occur because a service name breaks Kubernetes string limits ([63 characters][6]). For example:
```
languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters
```

String limit violations are common if service tags are not explicitly set through [Unified Service Tagging][8], in which case default image names are used.

#### Injection appears successful but traces are missing

If logs show no issues but traces are missing, there may be an application-side misconfiguration. Verify that:
- Required annotations and labels are present.
- [Unified Service Tagging][8] is set up correctly.
- Allow/deny lists for workload selection are properly defined.

## Debug the injection process

After verifying webhook injection, verify the following in the application container:

1. `/etc/ld.so.preload` includes the following entry:
   ```
   /opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so
   ```
2. The `LD_PRELOAD` environment variable is set to the same value.
3. The directory `/opt/datadog-packages/datadog-apm-inject` exists, with `stable` and `$version` subdirectories.
4. Language-specific directories exist (for example, `/opt/datadog/apm/library/java/` for Java).

To enable debug logs:
1. Set `DD_APM_INSTRUMENTATION_DEBUG: true` in the pod spec.
2. Delete the pod to enable debug logs during injection.

## Environments with strict Pod Security settings

If Pod Security Rules block the Datadog init container, you may see errors like:
```
Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false
```

To resolve this, set one of the following Cluster Agent options:
- `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_SECURITY_CONTEXT`
- `admission_controller.auto_instrumentation.init_security_context`

The value should be a JSON string that applies the necessary security context to the Datadog init containers.

## Upgrade or downgrade the injector version

To set the injector version:
- At the cluster level:

  Set in `values.yaml` under `datadog.apm.instrumentation.injector.imageTag`.

- At the pod level:

  Set with the annotation `admission.datadoghq.com/apm-inject.version`.


For host or Docker injection, modifying the `auto_inject` version is not recommended.

To manually update the injector version, run:
```
sudo datadog-installer install "oci://install.datadoghq.com/apm-inject-package: <VERSION>-1"
```

Alternatively, set the following in the installation script:
```
DD_INSTALLER_DEFAULT_PKG_VERSION_DATADOG_APM_INJECT=<VERSION>-1
```

## Process deny lists

### Default deny list

Datadog maintains an internal deny list to prevent injection into certain processes (for example, IDEs or databases). If a process command or entrypoint is on this list, the injector exits the injection process.

### Custom deny list entries (Linux only)

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSdMu6WAsUCD3djkl_oN0Qh7fQmBCiKYyUvuqlYWRyObebAc6Q/viewform" header="Join the Preview!">}}
Workload selection is available for Linux-based apps through a limited availability preview. To configure allow or deny rules for process injection, sign up for preview access.
{{< /callout >}}

### Injection container flagged by security scanners

Security tools may flag the `apm-inject` container because it runs an executable at startup, which can resemble malicious software.

The container's behavior is expected and safe; the executable configures the environment for auto-instrumentation.

Datadog adheres to security best practices and is working with security vendors to allow this container.

### Kubernetes workload selection issues

Workload selection enables injection based on Kubernetes labels and selectors. Rules to consider:

1. `disabledNamespaces` always takes precedence.
2. When a pod initializes, the target list is checked from top to bottom. Only the first matching rule applies per pod.

## Language-specific troubleshooting

### Java

#### `JAVA_TOOL_OPTIONS` is too long

The `JAVA_TOOL_OPTIONS` environment variable has a JVM-enforced limit of 1024 characters. During injection, Datadog appends a `-javaagent` flag to this variable to enable tracing. If the combined value exceeds the limit, the JVM emits a warning and ignores the variable, preventing injection.

To avoid this issue, exclude the affected process from injection.

####  `JAVA_TOOL_OPTIONS` changes program output

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

Ruby injection modifies the `Gemfile` to add the Datadog tracing library. If injection support is later removed, the application may fail to start due to the missing dependency.

To resolve this, restore the original `Gemfile`. If you still want to use APM after removing injection, run `bundle install` to download the gem.

### Python

Versions <=2.7.5 contain a pre-packaged protobuf dependency that can conflict with system libraries.

## Custom instrumentation

Custom instrumentation still requires you to import the tracing library. Configuration variables like .NET's `DD_TRACE_METHODS` remain available for defining custom spans.

## Use SSI with private registries

To use SSI with a private container registry, follow the instructions in [Synchronize Datadog's images with a private registry][5].

The required images vary depending on the language(s) you configure, but typically include:
- `gcr.io/datadoghq/apm-inject`
- `gcr.io/datadoghq/dd-lib-<lang>-init`
  - `gcr.io/datadoghq/dd-lib-dotnet-init`
  - `gcr.io/datadoghq/dd-lib-java-init`
  - `gcr.io/datadoghq/dd-lib-js-init`
  - `gcr.io/datadoghq/dd-lib-python-init`
  - `gcr.io/datadoghq/dd-lib-ruby-init`

### Version mirroring for private registries

Each language-specific tracer image must be available in your private registry at the version specified during workload selection.

By default, the injector uses version `0` unless a different version is configured in the Cluster Agent. If you are using annotations to specify tracer versions, those versions must also be mirrored and available in your private registry.

For example:

    apm:
      instrumentation:
        enabled: true
        targets:
          - name: "default-target"
            ddTraceVersions:
              java: "1"
              python: "3"

This configuration would require the following image tags to exist in the private registry:

* `gcr.io/datadoghq/apm-inject:0`
* `gcr.io/datadoghq/dd-lib-java-init:1`
* `gcr.io/datadoghq/dd-lib-python-init:3`

If these images are not mirrored in your private registry, you may run into an error like the following:

```
Failed to pull image "...." rpc error: code = Unknown
```

## Asking for support

When contacting support about injection issues, collect the following information to assist troubleshooting:

1. Are you using host injection, Docker injection, or both?
1. Verify that the `/opt/datadog-packages/datadog-apm*` directories exist.
1. For host injection, check for the existence and permissions of `/etc/ld.so.preload`:

   ```
   sudo ls -l /etc/ld.so.preload
   ```

   It should be owned by `root` with `644` permissions (`-rw-r--r--`).

1. Enable injector debug logs by setting the environment variable:

   ```
   DD_APM_INSTRUMENTATION_DEBUG=true
   ```

   By default, logs are written to stderr.

   - For host injection, you can send logs to a file by setting:
     ```
     DD_APM_INSTRUMENTATION_OUTPUT_PATHS=<log_file_path>
     ```

   - For Docker injection, logs can be viewed using `docker logs` or `docker compose logs`.

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
- Injector debug logs from the application container:
  - Set `DD_APM_INSTRUMENTATION_DEBUG: true`
  - Logs are printed to stderr by default, or can be routed to a file through:
    ```
    DD_APM_INSTRUMENTATION_OUTPUT_PATHS=<log_file_path>
    ```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes?tab=agentv764recommended#remove-apm-for-all-services-on-the-infrastructure
[2]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/docker#remove-apm-for-all-services-on-the-infrastructure
[3]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/linux#remove-single-step-apm-instrumentation-from-your-agent
[4]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/windows#remove-single-step-apm-instrumentation-from-your-agent
[5]: /containers/guide/sync_container_images/#copy-an-image-to-another-registry-using-crane
[6]: https://kubernetes.io/docs/concepts/overview/working-with-objects/annotations/#syntax-and-character-set
[7]: https://datatracker.ietf.org/doc/html/rfc1035
[8]: /getting_started/tagging/unified_service_tagging/
