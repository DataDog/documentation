---
title: Compatibility
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation has specific compatibility requirements that vary by language and environment. This page outlines supported versions, known limitations, and conditions that may impact Single Step Instrumentation for your specific setup.

## Environment requirements

### Operating systems

| OS             | Version       | Architecture  | Support   |
|----------------|---------------|---------------|-----------|
| Debian         | Latest stable | x86_64, arm64 | {{< X >}} |
| Ubuntu         | Latest LTS    | x86_64, arm64 | {{< X >}} |
| Amazon Linux   | Latest        | x86_64, arm64 | {{< X >}} |
| CentOS/Red Hat | Latest        | x86_64, arm64 | {{< X >}} |
| Fedora         | Latest        | x86_64, arm64 | {{< X >}} |

### Container environments

| Environment                      | Requirements                              | Support   |
|----------------------------------|-------------------------------------------|-----------|
| Docker                           |                                           | {{< X >}} |
| Kubernetes with Linux containers | [Datadog Admission Controller][1] enabled | {{< X >}} |
| Kubernetes with Windows pods     |                                           |           |

<div class="alert alert-info">For Kubernetes with Windows pods, use namespace inclusion/exclusion or specify an annotation in the application to exclude them from library injection.</div>
 
## Language-specific requirements

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet" >}}

{{< programming-lang lang="java" >}}
### Java version support
| Version | Status | Notes |
|---------|--------|-------|
| Java 15 | ✅ | Fully supported |
| Java 11 | ✅ | Fully supported |
| Java 8  | ✅ | Fully supported |

### Automatic bailout conditions
- ✋ Manual instrumentation detected: SSI will disable automatically
- ✋ Unsupported JVM version: SSI will not instrument the application

### Known limitations
- 🚫 Preview JDK versions are not supported
- 🚫 Custom classloaders may impact instrumentation

### Additional requirements
- Standard Java applications running on supported JVMs
- No conflicting APM agents installed
{{< /programming-lang >}}

{{< programming-lang lang="python" >}}
### Python version support
| Version | Status | Notes |
|---------|--------|-------|
| 3.9 | ✅ | Fully supported |
| 3.8 | ✅ | Fully supported |
| 3.7 | ✅ | Fully supported |
| 3.6 | ✅ | Fully supported |
| <3.6 | ❌ | Not supported |

### Automatic Bailout Conditions
- ✋ Manual instrumentation detected: SSI will disable automatically
- ✋ Unsupported integration versions detected: SSI will disable automatically
- ✋ Unsupported Python version: SSI will not instrument the application

### Known Limitations
- 🚫 Must verify integration version compatibility
- 🚫 Some framework versions may not be supported
{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}
### Ruby Version Support
| Version | Status | Notes |
|---------|--------|-------|
| 3.0 | ✅ | Fully supported |
| 2.7 | ✅ | Fully supported |
| 2.6 | ✅ | Fully supported |
| 2.5 | ✅ | Fully supported |
| <2.5 | ❌ | Not supported |

### Automatic Bailout Conditions
- ✋ Manual instrumentation detected: SSI will disable automatically
- ✋ Unsupported Ruby version: SSI will not instrument the application

### Known Limitations
- 🚫 All gems must be within supported versions
- 🚫 Some framework versions may not be supported
{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}
### Node.js Version Support
| Version | Status | Notes |
|---------|--------|-------|
| 16.x | ✅ | Fully supported |
| 14.x | ✅ | Fully supported |
| 12.x | ✅ | Fully supported |
| <12.x | ❌ | Not supported |

### Automatic Bailout Conditions
- ✋ Manual instrumentation detected: SSI will disable automatically
- ✋ Unsupported Node.js version: SSI will not instrument the application

### Known Limitations
- 🚫 Limited to standard Node.js libraries
- 🚫 Some framework versions may not be supported
{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}
### .NET Version Support
| Version | Status | Notes |
|---------|--------|-------|
| .NET 6.0 (≥6.0.13) | ✅ | Fully supported |
| .NET 5.0 | ✅ | Fully supported |
| .NET Core 3.1 | ✅ | Fully supported |
| .NET Core 2.2 | ✅ | Fully supported |
| .NET Core 3.0 | ❌ | SSI bails out due to incompatibility |
| .NET Core 2.1 | ❌ | SSI bails out due to incompatibility |
| .NET 6.0 (<6.0.13) | ❌ | Known crashing bugs in earlier versions |
| .NET 9 Preview | ❌ | Preview versions not supported |

### Automatic Bailout Conditions
- ✋ Unsupported .NET version: SSI will not instrument the application
- ✋ .NET 6.0 versions before 6.0.13: SSI will not instrument due to known issues
- ✋ Preview .NET versions: SSI will not instrument the application

### Special Notes
- ℹ️ Unlike other languages, .NET v3 does NOT bail out when manual instrumentation is detected
- ℹ️ Manual instrumentation can be used alongside SSI for .NET v3

### Known Limitations
- 🚫 Preview versions are not supported until official release
- 🚫 Some framework versions may have specific version requirements
{{< /programming-lang >}}

{{< /programming-lang-wrapper >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/cluster_agent/admission_controller/
