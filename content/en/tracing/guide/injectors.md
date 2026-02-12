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

On Linux systems, the injector uses the `LD_PRELOAD` mechanism—a dynamic linking feature in Unix-like environments—to load itself into all dynamically linked processes. This can happen in two ways:
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
   - Add init containers to download injector and tracer libraries
   - Set environment variables (like `LD_PRELOAD`)
   - Mount volumes to persist injected libraries

## Injector behavior

After the injector is loaded into a process's memory space—regardless of platform—it performs the following:
- Detects the application's runtime (such as Python, Node.js, PHP, Java, .NET, and Ruby).
- Modifies environment variables or command-line arguments to load the appropriate tracer SDK.
- Emits telemetry to report status and aid in debugging.
- Includes fallback logic to allow the application to continue running uninstrumented if injection fails.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/automatic_instrumentation/single-step-apm
