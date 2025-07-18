---
title: Troubleshooting Single Step APM  
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation (SSI) allows you to instrument applications at the host or Kubernetes level without modifying application dependencies or images. If you experience challenges enabling APM with SSI, use this guide to diagnose and resolve common issues. If problems persist, contact [Datadog Support][1] for further assistance. 

## Host and Docker instrumentation

### Host injection doesn't apply to existing shells

The preload library only injects into newly launched processes. Start a new shell session or log out and log back in to apply instrumentation. 

**Note:** Docker-based injection does not have this limitation.  

### Instance is too small

The preload library allows the analyzer one second to complete its work. On small VM instances running multiple services (for example, `t2.micro`), this time limit may be exceeded. To overcome this issue, use a larger instance size, such as `t2.small`.  

### Errors after manual uninstallation

If you manually delete agent files, you may see errors like: 
```
ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored
```

To properly uninstall SSI, follow the platform-specific instructions:

* [Kubernetes][1]
* [Docker][2]
* [Linux][3]
* [Windows][3]

### Rootless Docker

When using rootless Docker, update `/etc/datadog-agent/inject/docker\_config.yaml` to set `docker\_socket` to the path of the Docker socket for the user running Docker (default: `/run/user/$UID/docker.sock`). No reboot is required.  

### Custom launchers

If a custom launcher is statically linked (common with Go), the preload library might not be invoked. Injection can still succeed if:
- The launcher's command line includes the language name
- The launcher runs an intermediary dynamically linked program

However, direct process launches from statically linked binaries are not injected.

## Kubernetes instrumentation

### Admission Controller not configured or running

The Datadog Admission Controller must be deployed and configured before application pods are created; it cannot modify existing pods. 

To troubleshoot Admission Controller issues:

1. Verify Cluster Agent pod health:
   ```
   kubectl get pods
   kubectl get deployments
   ```  
1. Check the Cluster Agent leader logs for INFO messages indicating successful Admission Controller startup. For example:
   ```
   Group version 'admissionregistration.k8s.io/v1' is available, Starting secrets controller, Starting webhook controller
   ```

1. Run the `agent status` command on the Cluster Agent. The output includes admission controller and webhooks sections, which are also 


1. Check the Cluster Agent's Admission Controller status by doing one of the following:

   - Run `agent status` inside the Cluster Agent pod to get a live status output. 
   - Check `status.log` within a flare if troubleshooting after the fact. The system runs `agent status` when it generates a flare and captures the output in `status.log`. 

   In both cases, find the Admission Controller and Webhooks sections, and verify the following:
   - All expected `MutatingWebhookConfiguration` resources are listed (for auto-instrumentation, configuration injection, and tag injection). 
   - The webhook configurations reference the correct Secret.
   - The CA bundle digest matches across configurations.

1. Inspect injection attempts in `telemetry.log` or in the output of the following command:

   ```
   kubectl exec -it <cluster agent pod> agent telemetry
   ```
   
   Look for `admission_webhooks_library_injection_attempts` to see injection attempts by language.

### Injection mutation failures

The Cluster Agent logs warnings and errors for injection failures, typically from `admission/server.go`. For example, a warning might appear if `JAVA_TOOL_OPTIONS` is set using `valueFrom`. 

Use the metric `datadog.cluster_agent.admission_webhooks.library_injection_errors` for further debugging. 

#### Label annotation failure due to Kubernetes string limits

During setup, SSI detects the application language of your service and applies a service label in the form `internal.dd.datadoghq.com/service-name.detected_langs`. 

If the label cannot be applied, injection fails. 

Sometimes, labeling errors occur because a service name breaks Kubernetes string limits ([63 characters][6]). For example:
```
languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters
```

String limit violations are common if service tags are not explicitly set through [Unified Service Tagging][8], in which case default image names are used. 

#### No errors but no injection

If logs show no issues but traces are missing, there may be an application-side misconfiguration. 
- Check annotations and labels 
- Confirm [Unified Service Tagging][8] is set up correctly
- Verify allow/deny lists for workload selection 

## Debugging the injection process

After verifying webhook injection, verify the following in the application container:

1. `/etc/ld.so.preload` includes: `/opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so`  
2. `LD\_PRELOAD` environment variable is set to the same value
3. The directory `/opt/datadog-packages/datadog-apm-inject` exists, with `stable` and `$version` subdirectories
4. Language-specific directories exist (for example, `/opt/datadog/apm/library/java/` for Java)

To enable debug logs:
1. Set `DD_APM_INSTRUMENTATION_DEBUG: true` in the deployment/pod/container spec.
2. Delete the pod to enable debug logs during injection.

## Strict pod security rules  

If Pod Security Rules block the Datadog init container, you may see errors like:
```
Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false
```

To resolve this, configure the Datadog Cluster Agent by setting one of the following:
- `DD_ADMISSION_CONTROLLER_AUTO_INSTRUMENTATION_INIT_SECURITY_CONTEXT`
- `admission_controller.auto_instrumentation.init_security_context`

The value should be a JSON string that applies the necessary security context to the Datadog init containers.  

## Upgrading or downgrading the injector version

To set the injector version:
- At the cluster level:
  
  Set in `values.yaml` under `datadog.apm.instrumentation.injector.imageTag`

- At the pod level:
 
  Set with the annotation `admission.datadoghq.com/apm-inject.version`


For host/Docker injection, modifying the `auto_inject`  version is not recommended. 

If the installation script was already run, update the injector version with:
```sudo datadog-installer install "oci://install.datadoghq.com/apm-inject-package: \<VERSION\>-1"
```
Alternatively, set the following in the installation script:
```DD_INSTALLER_DEFAULT_PKG_VERSION_DATADOG_APM_INJECT=<VERSION>-1```

## Process deny lists

### Default deny list

Datadog maintains an internal deny list to prevent injection into certain processes (for example, IDEs or databases). If a process command or entrypoint is on this list, the injector exits the injection process.  

### Custom deny list entries (Linux only)  

**Note**: Custom deny lists require Datadog Injector version `v0.26.0+`. 

To define a custom policy:
1. Edit `/etc/datadog-agent/inject/policies.yaml`. Policy schema fields:

   * `version`: Must be `1`.  
   * `instrument_default_supported_processes`: `true` (**allow** by default), or `false` (**block** by default)
   * `instrument`: A list of processes to allow, with match rules (exact or prefix) for command line or executable paths
   * `deny`: A list of processes to block, with match rules (exact or prefix) for command line or executable paths

2. Run the following:
   ```
   sudo /opt/datadog-packages/datadog-apm-inject/stable/inject/process apply-config
   ```

### `apm-inject` container flagged by security scanners

Security tools may flag the `apm-inject` container because it runs an executable at startup, which resembles malicious software. 

The container's behavior is expected and safe; the executable configures the environment for auto-instrumentation. 

Datadog adheres to security best practices and is working with security vendors to whitelist this container.

### Workload selection issues  

Workload selection enables injection based on Kubernetes labels and selectors. Rules to consider:

1. `disabledNamespaces` always takes precedence.
2. When a pod initializes, the target list is checked from top to bottom. Only the first matching rule applies per pod.

## Language specific issues

### Java

- `JAVA_TOOL_OPTIONS` too long

   The `JAVA_TOOL_OPTIONS` environment variable has a JVM-enforced limit of 1024 characters. During injection, Datadog appends the -javaagent flag to this variable to enable tracing. If the combined value exceeds the limit, the JVM emits a warning and ignores the variable, preventing injection.

   To avoid this issue, exclude the affected process from injection.

- `JAVA_TOOL_OPTIONS` changes program output

   

#### Setting JAVA\_TOOL\_OPTIONS changes Java program output

When `JAVA\_TOOL\_OPTIONS` is set, the JVM prints a message to the command line (for example, `Picked up JAVA\_TOOL\_OPTIONS: \-Xmx1024m)`. If a process reads this output, it may be affected. As of version 0.12.2, injection no longer occurs for java \-version.  

#### DD\_SERVICE sets one service name for all sites in application servers

Single Step always injects `DD\_SERVICE`, causing all sites in application servers (like Tomcat, Weblogic) to report under the same name. To override this, enable split by tags (for example, `\-Ddd.trace.split-by-tags=servlet.context` or `DD\_TRACE\_SPLIT\_BY\_TAGS=servlet.context`) so each site reports its own name.

#### Existing `javaagent` configuration

SSI does not inject into an application with existing tracing running. 

### Ruby

#### Ruby gemfile modifications

Ruby injection modifies the Gemfile to add the Datadog tracing library. If injection support is removed, the application may error. Restoring the Gemfile to its original state resolves this. If APM is still desired after removal, run bundle install to download the gem.

### Python

#### Protobuf dependency issues

Versions 2.7.5 and below contain a pre-packaged protobuf dependency that can conflict with a user's installation.

## SSI with custom instrumentation

Users with custom instrumentation still need to import the library as usual. Library configuration environment variables (for example, .NET's `DD\_TRACE\_METHODS`) are still available for adding custom spans.  

## Private registries and mirroring SSI images

Should you wish to set up private registries for the SSI images, follow the documentation provided in [Synchronize Datadog's images with a private registry][5].

The required images depend on configured languages but generally include `gcr.io/datadoghq/apm-inject` and `gcr.io/datadoghq/dd-lib-\<lang\>-init` images. 

The images that need to exist depend on the languages configured. Here is a reasonable default list:

* `gcr.io/datadoghq/apm-inject`
* `gcr.io/datadoghq/dd-lib-dotnet-init`
* `gcr.io/datadoghq/dd-lib-java-init`
* `gcr.io/datadoghq/dd-lib-js-init`
* `gcr.io/datadoghq/dd-lib-python-init`
* `gcr.io/datadoghq/dd-lib-ruby-init`

### Version mirroring 

The version of each language library needs to match the versions configured as part of workload selection. Unless overridden in the cluster agent configuration, the injector has a default version of `0`. If you are using annotations to set the tracer versions, those versions also need to exist in the private registry.

### Example for SSI Image Mirroring
For example, this configuration:

    apm:
      instrumentation:
        enabled: true
        targets:
          - name: "default-target"
            ddTraceVersions:
              java: "1"
              python: "3"
 
Would require the following image tags to exist in the private registry:

* `gcr.io/datadoghq/apm-inject:0`
* `gcr.io/datadoghq/dd-lib-java-init:1`
* `gcr.io/datadoghq/dd-lib-python-init:3`

If the user does not mirror these images in their private registry, they may run into an error similar to this:

`Failed to pull image "...." rpc error: code = Unknown`
 
## Asking for support 

1. Are you using host injection, Docker injection, or both?  
2. Do the /opt/datadog-packages/datadog-apm\* directories exist?  
3. For host injection, check for the existence and permissions of /etc/ld.so.preload using sudo ls \-l /etc/ld.so.preload. It should be owned by root with 644 permissions (-rw-r--r--).  
4. Enable Injector Debug Logs by setting the environment variable DD\_APM\_INSTRUMENTATION\_DEBUG to true. Debug output goes to stderr.  
   * For host injection, route logs to a file using DD\_APM\_INSTRUMENTATION\_OUTPUT\_PATHS=\<log\_file\_path\>.  
   * For Docker injection, logs are sent to stderr and can be viewed with docker logs or docker compose logs.  
5. Provide an Agent flare.

Collect the following information for Kubernetes injection issues:

* Commands/Helm chart/Datadog Operator used for Cluster Agent deployment.  
* Deployment files for the application pod.  
* Node Agent flare and Cluster Agent flare in DEBUG mode.  
* Output of kubectl describe pod \<app pod\>.  
* Injector Debug Logs: Enabled by setting DD\_APM\_INSTRUMENTATION\_DEBUG: true on the application container. Logs are printed to stderr by default, or can be routed to a file through DD\_APM\_INSTRUMENTATION\_OUTPUT\_PATHS=\<log\_file\_path\>.

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