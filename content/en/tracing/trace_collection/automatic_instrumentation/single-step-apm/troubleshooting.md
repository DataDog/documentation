---
title: Troubleshooting Single Step APM  
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

# Troubleshooting Single Step APM

If you experience challenges with enabling APM through Simple Step Implementation, use this guide to resolve issues. If you continue to have trouble, contact [Datadog Support][1] for further assistance. 

Single Step Instrumentation (SSI) allows you to instrument applications at the host or Kubernetes level without modifying application dependencies or images. This document provides troubleshooting steps for common issues encountered with SSI.

## Host (and containers on host) single step instrumentation troubleshooting

### Host Injection not working on a running shell

The preload library only injects into newly launched processes. For instrumentation to take effect, a new shell must be created. This can be done by launching a new shell inside the current one, or by logging out and logging in again. Note: Docker injection does not have this limitation.  

### Undersized Instance

The preload library allows the analyzer one second to complete its work. On small VM instances with multiple services (for example, `t2.micro`), this might exceed one second. The recommended solution is to use a larger instance size (for example, `t2.small`).  

### Issues after attempting to uninstall host injection manually

If agent files are manually deleted, you may see errors such as `ERROR: ld.so: object /opt/datadog/apm/inject/launcher.preload.so from /etc/ld.so.preload cannot be preloaded (cannot open shared object file): ignored`. 

To properly remove SSI, follow the instructions in the public documentation for the platform you're on, uninstallation steps are avaliable for each platform:

* [Kubernetes][1]
* [Docker][2]
* [Linux][3]
* [Windows][3]

### Rootless Docker:

When using rootless Docker, edit `/etc/datadog-agent/inject/docker\_config.yaml` and set `docker\_socket` to the path of the Docker socket for the user running Docker (default: `/run/user/$UID/docker.sock`). No reboot is required.  

### Launchers

If a custom launcher is statically linked (common with Go), the preload library might not be invoked. If the launcher's command line includes the language name, injection might still work. If it launches an intermediary dynamically linked program, injection works. However, direct process launches by a statically linked launcher are not injected.

## Kubernetes single step instrumentation troubleshooting

### Ensure the admission controller is configured and running

The Admission Controller must be deployed and configured before new application pods are created, as it cannot update existing pods. Verify Cluster Agent pod health with `kubectl get pods` or `kubectl get deployments`.  

Check the Cluster Agent leader logs for INFO messages indicating successful Admission Controller startup (for example, `Group version 'admissionregistration.k8s.io/v1' is available, Starting secrets controller, Starting webhook controller`).

The agent status command on the Cluster Agent provides Admission Controller information, visible in `status.log` within a flare. Look for Admission Controller and Webhooks info sections, checking for MutatingWebhookConfigurations (auto-instrumentation, config injection, tags injection) and Secret info. The CA bundle digest should match.

The Cluster Agent also exposes telemetry events for library injection. In telemetry.log (or through kubectl exec \-it \<cluster agent pod\> agent telemetry), look for admission\_webhooks\_library\_injection\_attempts to see injection attempts by language.

### Failed mutations in Kubernetes

The Cluster Agent logs warnings and errors for injection failures, typically from `admission/server.go`. For example, a warning might appear if `JAVA\_TOOL\_OPTIONS` is defined through `ValueFrom`. 

The `datadog.cluster\_agent.admission\_webhooks.library\_injection\_errors` metric can also be used.

#### Language detection annotation failure issues

As part of the SSI setup steps in Kubernetes, the language the application is detected and added as a label to the service. The format is `internal.dd.datadoghq.com/service-name.detected_langs`

However, if the annotation is unable to be made due to a Kubernetes level error, the injection fails and SSI is not applied successfully. 

A common example of this a service name that breaks Kubernetes string limits. The name section of a labels in Kubernetes are [capped at 63][6] characters, to comply with [RFC1035][7]. 

This means, if the service name given is greater than 63 characters, the labelling fails at the Kubernetes API level:

`languagedetection/patcher.go:231 in handleDeploymentEvent) | failed to handle deployment event: annotations: Invalid value: "internal.dd.datadoghq.com/dummy-python-container-long-long-long-long-long-x.detected_langs": name part must be no more than 63 characters`

Normally this occurs when services have not had the service explicitly set through [Unified Service Tagging][8]. Services are defaulted to something like the image name for a service, which can break the 63 character limit.

#### No errors found in injection but still no SSI

If no errors or warnings are seen but injection still doesn't occur, it's likely an application-side misconfiguration. This could be incorrect labels/annotations to trigger auto-instrumentation.

Double check your annotations, check you've used [Unified Service Tagging][8] correctly, and that your allow/deny-list setup is done correctly. 

## Debugging what happens during injection

After verifying webhook injection, check the application container for:

1. `/etc/ld.so.preload` with the entry `/opt/datadog-packages/datadog-apm-inject/stable/inject/launcher.preload.so.`  
2. A `LD\_PRELOAD` environment variable with the same value.  
3. The directory `/opt/datadog-packages/datadog-apm-inject` must exist, containing `stable` and `$version` subdirectories.  
4. Language-specific directories (for example, `/opt/datadog/apm/library/java/` for Java).

You can add `DD\_APM\_INSTRUMENTATION\_DEBUG: true` to the deployment/pod/container spec and delete the pod to enable debug logs during injection.

## Environments with strict pod security rules  

Strict Pod Security Rules may prevent Datadog init containers from being added, leading to errors like `Privilege escalation container is not allowed or violates PodSecurity "restricted: latest": allowPrivilegeEscalation is false`. 

To resolve this, configure the Datadog Cluster Agent by setting `DD\_ADMISSION\_CONTROLLER\_AUTO\_INSTRUMENTATION\_INIT\_SECURITY\_CONTEXT` or `admission\_controller.auto\_instrumentation.init\_security\_context`. This should be a JSON string that applies the necessary security context to the Datadog init containers.  

## Upgrading/downgrading the injector version

You can specify the injector version at the Cluster Agent level (in `values.yaml` under `datadog.apm.instrumentation.injector.imageTag`) or at the service level (using the annotation `admission.datadoghq.com/apm-inject.version`).

For Host/Docker Injection, modifying the `auto\_inject` library version is generally not advised due to potential compatibility issues. 

If the installation script was already run, update the injector version with `sudo datadog-installer install "oci://install.datadoghq.com/apm-inject-package: \<VERSION\>-1"` or by setting `DD\_INSTALLER\_DEFAULT\_PKG\_VERSION\_DATADOG\_APM\_INJECT=\<VERSION\>-1` in the installation script.

## SSI deny list

Datadog maintains an internal deny list to prevent injecting tracers into processes where it's not beneficial or could cause issues (for example, IDEs, databases). If a process command or entrypoint is on this list, the injector exits the injection process.  

### Custom deny list entries (Linux only)  

You can define custom policies in `/etc/datadog-agent/inject/policies.yaml` to control instrumentation (Requires Datadog Injector version `v0.26.0+`) 

fter setting up the policy, run `sudo /opt/datadog-packages/datadog-apm-inject/stable/inject/process apply-config`

The policy schema allows you to:

* Block all processes by default and specify exceptions.  
* Allow all processes by default and block specific ones.  
* Explicitly override the default deny list.

#### Policy schema fields

* version: Must be 1\.  
* instrument\_default\_supported\_processes: true instruments by default unless blocked; false blocks by default unless explicitly allowed.  
* instrument: A list of processes to allow, with match rules (exact or prefix) for command\_line or executable paths.  
* deny: A list of processes to block, with match rules (exact or prefix) for command\_line or executable paths.

### Apm-inject container detected as a threat for security scanning tools

Security scanners may flag the `apm-inject` container due to its behavior of running an executable at startup, which resembles malicious software. 

The container is expected and safe. The executable is purpose-built for configuring Datadog auto-instrumentation, copies necessary files, and dynamically configures the environment for seamless instrumentation. 

Datadog adheres to security best practices and is working with security vendors for whitelisting.  

### Workload selection troubleshooting  

Workload selection allows enabling/disabling tracing for specific applications using Kubernetes labels and selectors.  
Rules to consider:

1. `disabledNamespaces` takes precedence over all other targets.  
2. When a pod initializes, the target list is checked from top to bottom. The first matching label or podSelector applies, and no other targets are checked.

## Language specific troubleshooting

### Java

#### JAVA\_TOOL\_OPTIONS length

The `JAVA\_TOOL\_OPTIONS` environment variable has a JVM hard-coded limit of 1024 characters. If appending the \-javaagent flag exceeds this, a warning is emitted, and the process is not injected. The current solution is to not use injection for that process.  

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