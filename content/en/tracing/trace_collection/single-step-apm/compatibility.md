---
title: Compatibility
aliases:
- /tracing/trace_collection/automatic_instrumentation/single-step-apm/compatibility/
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation (SSI) has compatibility requirements that vary by operating system, environment, and language runtime. This page outlines supported platforms, requirements, and known limitations that may impact SSI for your specific setup.

## Compatibility by application environment

<div class="alert alert-warning">ECS Fargate is not supported.</div>

Select your environment to see compatibility requirements and limitations:

{{< tabs >}}
{{% tab "Linux Host" %}}

### Compatibility

- **Status**: GA
- **Supported operating systems**: See [Linux distributions reference](#linux-distributions-reference)
- **Supported architectures**: x86_64, arm64

### Requirements

- Datadog Agent with APM Instrumentation enabled
- A [supported Linux distribution](#linux-distributions-reference)

### Limitations

- **SELinux**: Hardened SELinux environments are not supported.
- **Small VM instances**: Very small instance types (for example, `t2.micro`) can experience timeouts. Use a larger instance type such as `t2.small` or higher.

{{% /tab %}}

{{% tab "Docker" %}}

### Compatibility

- **Status**: GA
- **Supported operating systems**: See [Linux distributions reference](#linux-distributions-reference)
- **Supported architectures**: x86_64, arm64

### Requirements

- Datadog Agent with APM Instrumentation enabled
- Docker running on a [supported Linux distribution](#linux-distributions-reference)

### Limitations

- **Rootless Docker mode**: When running Docker in rootless mode, update the socket path in `/etc/datadog-agent/inject/docker_config.yaml` so SSI can connect to Docker. The default path is `/run/user/$UID/docker.sock`, but your environment may differ.
- **Custom `runc` shims**: If your environment uses custom `runc` shims (for example, for GPU workloads), update the `runtimes` entry in `/etc/datadog-agent/inject/docker_config.yaml` to include both your custom runtime and the Datadog runtime required for SSI.

{{% /tab %}}

{{% tab "Kubernetes" %}}

<div class="alert alert-info">EKS Fargate support is in Preview.</div>

### Compatibility

- **Status**: GA
- **Supported node pools**: Linux nodes only (see [Linux distributions reference](#linux-distributions-reference))
- **Supported architectures**: x86_64, arm64

### Requirements

- [Datadog Admission Controller][1] enabled
- Kubernetes nodes running a [supported Linux distribution](#linux-distributions-reference)

### Limitations

- **Linux node pools only**: Only Linux node pools are supported.
- **Windows pods**: For Kubernetes clusters with Windows pods, use namespace inclusion/exclusion or specify an annotation in the application to exclude them from library injection.

[1]: /containers/cluster_agent/admission_controller/

{{% /tab %}}

{{% tab "Windows IIS" %}}

### Compatibility

- **Status**: GA
- **Supported runtimes**: .NET only

### Requirements

- Datadog Agent v7.67.1 or higher
- Datadog .NET SDK v3.19.0 or higher
- Applications running in IIS

### Limitations

- **IIS only**: Only .NET applications running in IIS are supported.

{{% /tab %}}
{{< /tabs >}}

## Supported language runtimes

SSI automatically instruments applications written in the following languages by [loading a compatible Datadog Language SDK][2] at runtime. Select your language to see minimum SDK versions, supported runtime versions, and any limitations.

<div class="alert alert-info">

SSI compatibility depends on two factors:

1. **SDK version**: SSI must support the Datadog Language SDK version.
2. **Runtime version**: The Datadog Language SDK must support your application's language runtime version.

If either requirement is not met, SSI falls back gracefully and your application runs without instrumentation.

</div>

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet,php" >}}

{{< programming-lang lang="java" >}}

### Minimum SDK version

**Java SDK**: 1.44.0 or higher

### Supported runtime versions

For a complete list of supported Java versions, see the [Java SDK compatibility documentation][1].

<div class="alert alert-info">SSI uses the <code>--enable-native-access=ALL-UNNAMED</code> flag on Java 24+ to enable native access for all code on the class path. This is necessary for products such as Profiling that require native access. See [JEP 472][2] for more information.</div>

### Limitations

By default, SSI does not instrument some Java applications and libraries to avoid performance overhead or non-actionable traces. These exclusions are defined in the [Java SDK denylist][3]. If your workload is included, SSI skips loading the Java SDK.

### Known issues

**Environment variable length**: If your application uses extensive command-line options or environment variables, you might encounter initialization failures. This typically occurs when you have many JVM arguments or other startup configurations. To resolve this:
- Minimize non-essential JVM arguments
- Consider moving some configurations to a `.properties` file
- Check application logs for specific initialization errors

[1]: /tracing/trace_collection/compatibility/java/
[2]: https://openjdk.org/jeps/472
[3]: https://github.com/DataDog/dd-trace-java/blob/master/metadata/requirements.json

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### Minimum SDK version

**Python SDK**: 2.20.1 or higher

### Supported runtime versions

**Minimum Python version**: 3.7 or higher

For a complete list of supported Python versions, see the [Python SDK compatibility documentation][1].

### Operating system considerations

Python 3.7+ is available by default only on:
- CentOS Stream 8+
- Red Hat Enterprise Linux 8+

For other distributions, you may need to install Python 3.7+ separately.

[1]: /tracing/trace_collection/compatibility/python

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Minimum SDK version

**Ruby SDK**: 2.5.0 or higher

### Supported runtime versions

For a complete list of supported Ruby versions, see the [Ruby SDK compatibility documentation][1].

### Operating system requirements

- Requires Linux distributions using glibc 2.27 or newer
- Not compatible with Alpine Linux or other musl-based distributions

### Known issues

**Uninstalling SSI**: When uninstalling Single Step Instrumentation from a Ruby application, follow these steps to prevent errors:

1. **Before uninstalling**: Make a backup of your `Gemfile` and `Gemfile.lock`.
2. **After uninstalling**, do one of the following:
   - Restore your original `Gemfile` and `Gemfile.lock`.
   - Run `bundle install` to rebuild your dependencies.

[1]: /tracing/trace_collection/compatibility/ruby

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Minimum SDK version

**Node.js SDK**: 4.0 or higher

### Supported runtime versions

For a complete list of supported Node.js versions, see the [Node.js SDK compatibility documentation][1].

### Operating system considerations

Supported Node.js versions are available by default only on:
- CentOS Stream 9+
- Red Hat Enterprise Linux 9+

For other distributions, you may need to install Node.js separately.

### Limitations

- **ESM modules**: Instrumentation of ESM (ECMAScript modules) is not supported.

[1]: /tracing/trace_collection/compatibility/nodejs

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Minimum SDK version

**.NET SDK**: 3.7.0 or higher

### Supported runtime versions

SSI supports both .NET Core and .NET Framework runtimes. For a complete list of supported versions, see:

- [.NET Core SDK compatibility][1]
- [.NET Framework SDK compatibility][2]

[1]: /tracing/trace_collection/compatibility/dotnet-core
[2]: /tracing/trace_collection/compatibility/dotnet-framework

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

### Minimum SDK version

**PHP SDK**: 1.6.0 or higher

### Supported runtime versions

For a complete list of supported PHP versions, see the [PHP SDK compatibility documentation][1].

### Limitations

SSI automatically disables when it detects:
- PHP's Just-In-Time (JIT) compilation
- Any of the following extensions:
  - Xdebug
  - ionCube Loader
  - NewRelic
  - Blackfire
  - pcov

<div class="alert alert-info">If you need to run SSI alongside these tools, you can force it to enable by setting <code>DD_INJECT_FORCE=true</code>.</div>

[1]: /tracing/trace_collection/compatibility/php

{{< /programming-lang >}}
{{< /programming-lang-wrapper >}}

## Linux distributions reference

The following Linux distributions and architectures are supported for SSI across all deployment platforms (Linux hosts, Docker, Kubernetes):

| OS           | Version        | Architecture  |
|--------------|----------------|---------------|
| Amazon Linux | 2022, 2023     | x86_64, arm64 |
| CentOS       | 7, 8           | x86_64, arm64 |
| Debian       | 10, 11, 12     | x86_64, arm64 |
| Red Hat      | 7, 8, 9        | x86_64, arm64 |
| Ubuntu       | 20, 22, 24 (LTS) | x86_64, arm64 |
| Fedora       | 40             | x86_64, arm64 |
| AlmaLinux    | 8              | x86_64, arm64 |
| Oracle Linux | 8              | x86_64, arm64 |
| Rocky Linux  | 8              | x86_64, arm64 |

<div class="alert alert-info">For additional operating system requirements specific to your programming language, see <a href="#supported-language-runtimes">Supported language runtimes</a>.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/cluster_agent/admission_controller/
[2]: /tracing/guide/injectors/
