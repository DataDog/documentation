---
title: Understanding Injector Behavior with Single Step Instrumentation
description: Learn how the injector works with Single Step Instrumentation to automatically instrument applications at runtime without manual configuration.
further_reading:
- link: tracing/trace_collection/automatic_instrumentation/single-step-apm
  tag: Documentation
  text: Single Step APM Instrumentation
---

## Overview

The injector is a shared library that automatically instruments applications at runtime. With [Single Step Instrumentation][1], the injector automates environment setup and tracer initialization, eliminating the need for manual configuration.

## How the injector is loaded

### Linux

On Linux systems, the injector uses the `LD_PRELOAD` mechanism—a dynamic linking feature in UNIX-like environments—to load itself into all dynamically linked processes. This can happen in two ways:
- Explicitly, by setting the `LD_PRELOAD` environment variable.
- Implicitly, by modifying the system-wide `/etc/ld.so.preload` file.

### Docker

In Docker environments, the injector uses the same `LD_PRELOAD` mechanism as on Linux hosts to load into application processes at runtime. This allows it to initialize tracing logic and modify environment variables before the application starts.

To enable this, Datadog provides a custom `runc` shim that replaces Docker's default container runtime. The shim's purpose is to:
1. Inject the shared library (the injector) into the container.
1. Set the `LD_PRELOAD` environment variable, ensuring the injector is loaded into all dynamically linked processes inside the container.

### Kubernetes

In Kubernetes environments, injection is handled by the Datadog Admission Controller, which uses a mutating admission webhook. When a pod is scheduled, the controller:

1. Evaluates whether the pod should be instrumented based on configured selectors (such as namespaces, labels, or specific pod properties).
1. Mutates the pod spec to:
   - Use the Datadog CSI driver to mount the injector and SDKs
   - Set environment variables (such as `LD_PRELOAD`)
   - Mount volumes to persist injected libraries

The default delivery method uses init containers, but SSI supports additional [injection modes][2] that may better suit your environment.

### Windows

On Windows, the injector is delivered as a DLL. A Datadog kernel driver loads the injector DLL into every new process, and the DLL's `DllMain` function runs before the application's entry point. After loading, the injector follows the same flow described in [Injector behavior](#injector-behavior). Windows supports only Java and .NET. Runtime detection on Windows differs from Linux in implementation, but the resulting instrumentation behavior is the same.

## Injector behavior

After the injector is loaded into a process's memory space—regardless of platform—it performs the following:
- Detects the application's runtime (such as Python, Node.js, PHP, Java, .NET, Ruby, or NGINX).
- Evaluates whether the process should be instrumented. Some processes are excluded by default. You can also define instrumentation rules to allow or deny injection per workload on [Linux][3], [Kubernetes][4], and [Windows][5].
- Modifies environment variables or command-line arguments to load the appropriate tracer SDK.
- Emits telemetry to report status and aid in debugging.

If injection fails or no supported runtime is detected, the application continues to run without instrumentation. The same applies if a process is excluded by configuration.

**Note**: Because the injector runs before the SDK evaluates its environment variables, setting `DD_TRACE_ENABLED=false` does not prevent SSI from loading the SDK. To disable or remove SSI, see the [Single Step APM Instrumentation][1] setup page for your platform.

## Injector life cycle

The injector completes its work before the application's `main` function runs. It is not a background process or thread that runs alongside the application.

After the injector sets the necessary environment variables or command-line arguments, the application proceeds normally. From that point on, the only Datadog code in the process is the tracer SDK that the application itself loads using that configuration.

## Per-runtime instrumentation

The injector loads the appropriate tracer SDK by setting environment variables or modifying command-line arguments for the application process. The mechanism varies by runtime:

| Runtime  | Mechanism |
|----------|-----------|
| Java     | Sets `JAVA_TOOL_OPTIONS` with `-javaagent:<path-to-dd-java-agent.jar>`. |
| Python   | Sets `PYTHONPATH` to the tracer installation directory. |
| Node.js  | Sets `NODE_OPTIONS` with `--require` (CommonJS) or `--import` (ECMAScript modules). |
| Ruby     | Sets `RUBYOPT` with `-r <path-to-Datadog-host-inject-script>`. |
| .NET     | Sets the .NET CLR profiler environment variables (`CORECLR_ENABLE_PROFILING`, `CORECLR_PROFILER`, `CORECLR_PROFILER_PATH`, and related variables). |
| PHP      | Sets `PHP_INI_SCAN_DIR` to a Datadog-provided loader directory. |
| NGINX    | Re-executes the NGINX binary with added command-line arguments to load the Datadog module (for example, `-g "load_module <path-to-Datadog-module>;"`). |

## Privileges and scope

### Injection scope

SSI instruments applications by loading a tracer or profiler into the application process using user-space dynamic linking (such as `LD_PRELOAD` on Linux or DLL injection on Windows). It does not install kernel modules, patch the kernel, hook system calls, or use eBPF. The injector and the tracer or profiler run with the same OS privileges as the application process—see [Runtime privileges](#runtime-privileges).

While the injected code runs inside the application process, some deployment modes update OS or runtime configuration so that the injector loads automatically:

- **Kubernetes admission controller injection**: Mutates pod specs to mount the injector (using an init container or the [Datadog CSI driver][2]) and set environment variables. This is a Kubernetes API action, not a host OS modification.
- **Linux host injection**: Configures the dynamic loader (typically through `/etc/ld.so.preload`) so that every new dynamically linked process loads the injection launcher. This is an OS-level configuration change, but it remains user-space dynamic linking, not kernel code.
- **Docker runtime injection**: Configures Docker to use a wrapper runtime so that containers start with the tracer mounted and configured (typically by injecting an `LD_PRELOAD` environment variable into the container). This modifies Docker daemon configuration.
- **Windows injection**: Installs a kernel driver that loads the injector DLL into new processes. The driver runs at the OS level. The injected code that runs inside each application process remains user-space.

### Runtime privileges

The injector, tracer, and profiler all run inside the application process and inherit the same OS permissions as that process. They do not gain additional privileges. If the application runs as a restricted user, the injector, tracer, and profiler are also restricted to that user's permissions.

### Installation privileges

Privilege requirements at install time depend on the deployment mode:

#### Kubernetes admission controller

- **Cluster-side components** (the Datadog Cluster Agent and admission controller) typically require cluster-level permissions to register webhooks and mutate pods.
- **Application pods** do not require elevated OS privileges from Datadog, but hardened clusters may need to allow:
  - Volume mounts used to communicate with the Agent (commonly a `hostPath` mount to a socket directory).
  - Specific `SecurityContext` or SCC allowances.

  You can keep the injected init container and application container locked down (non-root, dropped capabilities, no privilege escalation) as long as your policies permit the required mounts.

#### Linux host

- Installation typically requires root (or equivalent), because it installs packages and may modify system-wide loader configuration and service configuration.
- After installation, the Datadog Agent service runs as its own service user (commonly `dd-agent`), and the injected code runs with the application user's privileges.

#### Docker runtime on a host

- Installation and configuration typically require root, because they modify Docker daemon configuration.
- At runtime, the injector and the tracer run inside the container's application process as that container's user.

#### Windows

- Installing the Datadog Agent on Windows requires Administrator privileges (service installation and system-wide configuration).
- For application instrumentation (for example, .NET), the profiler runs in the target process context. System-wide configuration changes enable the profiler for processes and services, but they do not grant the profiler additional privileges.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
[2]: /tracing/trace_collection/automatic_instrumentation/single-step-apm/kubernetes/#configure-injection-modes
[3]: /tracing/trace_collection/single-step-apm/linux/#define-instrumentation-rules
[4]: /tracing/trace_collection/single-step-apm/kubernetes/#target-specific-workloads
[5]: /tracing/trace_collection/single-step-apm/windows/#define-instrumentation-rules
