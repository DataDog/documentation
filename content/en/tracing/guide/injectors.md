---
title: How the Injector Works with Single Step Instrumentation
further_reading:
- link: tracing/trace_collection/automatic_instrumentation/single-step-apm
  tag: Documentation
  text: Single Step APM Instrumentation
---

## Overview

The injector is a shared library that automatically instruments applications at runtime. With Single Step Instrumentation, the injector handles much of the setup process behind the scenes, eliminating the need for manual configuration. Its behavior varies slightly by platform:

### Linux

On Linux systems, the injector uses the `LD_PRELOAD` mechanism—a dynamic linking feature in Unix-like environments—to load itself into all dynamically linked processes. This can happen in two ways:
- Explicitly, by setting the `LD_PRELOAD` environment variable.
- Implicitly, by modifying the system-wide `/etc/ld.so.preload` file.

Once loaded into a process's memory space, the injector:
- Initializes and detects the runtime language (e.g., Python, Node.js, PHP, Java, .NET, Ruby).
- Updates environment variables and command-line arguments to load the appropriate SDK libraries using native runtime capabilities.
- Emits telemetry for monitoring status and debugging. 
- Includes fallback logic to safely exit if injection isn't possible.

### Docker

In Docker environments, the injector uses the same `LD_PRELOAD` mechanism as on Linux hosts to load into application processes at runtime. This allows it to initialize before the application starts and perform automatic instrumentation.

To enable this, Datadog provides a custom `runc` shim that replaces Docker's default container runtime. The shim's purpose is to:
1. Inject the shared library (the injector) into the container.
1. Set the `LD_PRELOAD` environment variable, ensuring the injector is loaded into all dynamically linked processes inside the container.

Once loaded, the injector:
- Detects the application's runtime (e.g., Python, Node.js, PHP, Java, .NET, Ruby).
- Updates environment variables or command-line arguments to load the appropriate tracer SDK.
- Emits telemetry to report status and aid in debugging.
- Includes fallback logic to exit gracefully if injection isn't possible.

This approach allows instrumentation to happen automatically, with no changes to container images or application code.

## Kubernetes

In Kubernetes environments, injection is handled by the Datadog Admission Controller, which uses a mutating admission webhook. When a pod is scheduled, the controller:

1. Evaluates whether the pod should be instrumented based on configured selectors (such as namespaces, labels, or specific pod properties).
1. Mutates the pod spec by adding:
   - Init containers to download injector and tracer libraries
   - Environment variables (like `LD_PRELOAD`)
   - Volume mounts to persist injected libraries

At runtime, the injector detects the application's runtime language and activates the tracer automatically—no code changes required.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}


