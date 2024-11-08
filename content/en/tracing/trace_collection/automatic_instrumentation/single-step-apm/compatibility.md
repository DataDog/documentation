---
title: Compatibility
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/dd_libraries/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation (SSI) has specific compatibility requirements that vary by language and environment. This page outlines supported versions, known limitations, and conditions that may impact Single Step Instrumentation for your specific setup.

## Operating systems

The following operating systems and architectures are compatible:

| OS           | Version   | Architecture  | Support |
|--------------|-----------|---------------|-----------|
| Amazon Linux | 2022+     | x86_64, arm64 | {{< X >}} |
| CentOS       | 7+, 8+    | x86_64, arm64 | {{< X >}} |
| Debian       | 9-12      | x86_64, arm64 | {{< X >}} |
| Red Hat      | 7+        | x86_64, arm64 | {{< X >}} |
| Ubuntu       | 20+ (LTS) | x86_64, arm64 | {{< X >}} |

## Platforms

The following container platforms are compatible:

| Environment     | Requirements & Limitations                             | Support |
|-----------------|--------------------------------------------------------|---------|
| Linux           | Not supported on hardened environments such as SELinux | GA      |
| Docker on Linux |                                                        | GA      |
| Kubernetes      | [Datadog Admission Controller][1] enabled              | Preview |

### Platform-specific limitations

#### Linux virtual machines (VMs)

You may encounter timeouts with smaller VM instances such as `t2.micro`. In this case, you should upgrade to a larger instance such as `t2.small`.

#### Docker containers

- **Rootless Docker mode**: If you are using Docker in rootless mode (that is, Docker running without root privileges for added security), you need to configure the socket path to ensure SSI can connect to Docker. Update the socket path in `/etc/datadog-agent/inject/docker_config.yaml` to match your environment. By default, this path is set to `/run/user/$UID/docker.sock`, but it may vary based on your setup.

- **Custom `runc` shims**: If your environment uses custom `runc` shims (for GPU support or other specialized tasks), you must adjust your configuration to avoid conflicts. SSI requires its own `runc` shim to enable automatic instrumentation within Docker containers. To ensure compatibility, update the `runtimes` property in `/etc/datadog-agent/inject/docker_config.yaml` to include both your custom shim and the Datadog shim.

#### Kubernetes with Windows pods

For Kubernetes clusters with Windows pods, use namespace inclusion/exclusion or specify an annotation in the application to exclude them from library injection.

## Language-specific requirements

This section provides language-specific compatibility requirements for Single Step Instrumentation:

| Language | Support       |
|----------|---------------|
| Java     | GA            |
| .NET     | GA            |
| Node.js  | GA            |
| Python   | GA            |
| Ruby     | GA            |
| PHP      | Preview       |
| Go       | Not Supported |
| C++      | Not Supported |

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet,php" >}}

{{< programming-lang lang="java" >}}

### Supported Java versions

| Java Version | Support                         | Notes |
|--------------|---------------------------------| ----- |
| 8+           | <i class="icon-check-bold"></i> |       |

### Troubleshooting

**Environment Variable Length**: If your application uses extensive command-line options or environment variables, you might encounter initialization failures. This typically occurs when you have many JVM arguments or other startup configurations. To resolve this:
  - Review and minimize non-essential JVM arguments
  - Consider moving some configurations to a properties file
  - Check application logs for specific initialization errors

<div class="alert alert-info">Single Step Instrumentation disables automatically when custom instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### Supported Python versions

| Python Version | Support                         | Notes |
|----------------|---------------------------------|-------|
| 3.11           | <i class="icon-check-bold"></i> |       |
| 3.10           | <i class="icon-check-bold"></i> |       |
| 3.9            | <i class="icon-check-bold"></i> |       |
| 3.8            | <i class="icon-check-bold"></i> |       |
| 3.7            | <i class="icon-check-bold"></i> |       |


<div class="alert alert-info">Single Step Instrumentation disables automatically when custom instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Supported Ruby versions

| Ruby Version | Support                         | Notes |
|--------------|---------------------------------|-------|
| 3.2          | <i class="icon-check-bold"></i> |       |
| 3.1          | <i class="icon-check-bold"></i> |       |
| 3.0          | <i class="icon-check-bold"></i> |       |
| 2.9          | <i class="icon-check-bold"></i> |       |
| 2.8          | <i class="icon-check-bold"></i> |       |
| 2.7          | <i class="icon-check-bold"></i> |       |

### Troubleshooting

When uninstalling Single Step Instrumentation from a Ruby application, follow these steps to prevent errors:

1. **Before uninstalling**: Make a backup of your `Gemfile` and `Gemfile.lock`.
2. **After uninstalling**:
   - Restore your original `Gemfile` and `Gemfile.lock`, or
   - Run `bundle install` to rebuild your dependencies.

### Additional information

- Requires Linux distributions using glibc 2.27 or newer
- Not compatible with Alpine Linux or other musl-based distributions

<div class="alert alert-info">Single Step Instrumentation disables automatically when custom instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Supported Node.js versions

| Node.js Version    | Support                         | Notes                                         |
|--------------------|---------------------------------|-----------------------------------------------|
| Latest LTS release | <i class="icon-check-bold"></i> | Instrumenting ESM modules is not supported.   |

<div class="alert alert-info">Single Step Instrumentation disables automatically when custom instrumentation is detected.</div>

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Supported .NET runtimes

| .NET Version     | Support                         | Notes                                |
|------------------|---------------------------------|--------------------------------------|
| .NET 8           | <i class="icon-check-bold"></i> |                                      |
| .NET 7           | <i class="icon-check-bold"></i> |                                      |
| .NET 6           | <i class="icon-check-bold"></i> | Versions below 6.0.13 not supported. |
| .NET 5           | <i class="icon-check-bold"></i> |                                      |
| .NET Core 3.1    | <i class="icon-check-bold"></i> |                                      |
| .NET Core 3.0    |                                 |                                      |
| .NET Core 2.2    |                                 |                                      |
| .NET Core 2.1    |                                 |                                      |
| .NET Core 2.0    |                                 |                                      |
| Preview versions | Not supported                   |                                      |

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

### Supported PHP versions

<div class="alert alert-warning">Using Single Step Instrumentation with PHP applications is in Preview.</div>


| PHP Version | Support | Notes |
|-------------|---------|-------|
| 8.3.x       | Preview |       |
| 8.2.x       | Preview |       |
| 8.1.x       | Preview |       |
| 8.0.x       | Preview |       |
| 7.4.x       | Preview |       |
| 7.3.x       | Preview |       |
| 7.2.x       | Preview |       |
| 7.1.x       | Preview |       |
| 7.0.x       | Preview |       |

### PHP extensions

SSI disables automatically when it detects:
- PHP's Just-In-Time (JIT) compilation
- Any of the following extensions:
  - Xdebug 
  - ionCube Loader
  - NewRelic
  - Blackfire
  - pcov
  
<div class="alert alert-info">If you need to run the SSI alongside these tools, you can force it to enable by setting: <code>DD_INJECT_FORCE=true</code></div>

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/cluster_agent/admission_controller/