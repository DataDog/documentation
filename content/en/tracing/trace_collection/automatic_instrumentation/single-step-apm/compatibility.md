---
title: Compatibility
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation has specific compatibility requirements that vary by language and environment. This page outlines supported versions, known limitations, and conditions that may impact Single Step Instrumentation for your specific setup.

## Operating systems

The following operating systems and architectures are compatible:

| OS             | Version       | Architecture  | Support   |
|----------------|---------------|---------------|-----------|
| Debian         | Latest stable | x86_64, arm64 | {{< X >}} |
| Ubuntu         | Latest LTS    | x86_64, arm64 | {{< X >}} |
| Amazon Linux   | Latest        | x86_64, arm64 | {{< X >}} |
| CentOS/Red Hat | Latest        | x86_64, arm64 | {{< X >}} |
| Fedora         | Latest        | x86_64, arm64 | {{< X >}} |

## Container platforms

The following container platforms are compatible:

| Environment                      | Requirements                              | Support   |
|----------------------------------|-------------------------------------------|-----------|
| Docker                           |                                           | {{< X >}} |
| Kubernetes with Linux containers | [Datadog Admission Controller][1] enabled | {{< X >}} |
| Kubernetes with Windows pods     |                                           |           |

<div class="alert alert-info">For Kubernetes with Windows pods, use namespace inclusion/exclusion or specify an annotation in the application to exclude them from library injection.</div>
 
## Language-specific requirements

This section provides language-specific compatibility requirements for Single Step Instrumentation:

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet" >}}

{{< programming-lang lang="java" >}}

<div class="alert alert-info">Single Step Instrumentation disables automatically when manual instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

<div class="alert alert-info">Single Step Instrumentation disables automatically when manual instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

<div class="alert alert-info">Single Step Instrumentation disables automatically when manual instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

<div class="alert alert-info">Single Step Instrumentation disables automatically when manual instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Supported .NET runtimes

| .NET Version     | Support       | Notes                               |
|------------------|---------------|-------------------------------------|
| .NET 8           | {{< X >}}     |                                     |
| .NET 7           | {{< X >}}     |                                     |
| .NET 6           | {{< X >}}     | Versions below 6.0.13 not supported |
| .NET 5           | {{< X >}}     |                                     |
| .NET Core 3.1    | {{< X >}}     |                                     |
| .NET Core 3.0    |               |                                     |
| .NET Core 2.2    | {{< X >}}     |                                     |
| .NET Core 2.1    |               |                                     |
| .NET Core 2.0    |               |                                     |
| Preview versions | Not supported |                                     |

<div class="alert alert-info">Single Step Instrumentation disables automatically when manual instrumentation is detected.</div>


{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/cluster_agent/admission_controller/
