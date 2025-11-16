---
title: Compatibility
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation (SSI) has specific compatibility requirements that vary by language and environment. This page outlines supported versions, known limitations, and conditions that may impact Single Step Instrumentation for your specific setup.

## Where are your applications running?

Select your deployment platform to see compatibility requirements and limitations:

{{< tabs >}}
{{% tab "Linux Host" %}}

### Compatibility

**Status**: GA

**Supported operating systems**: See [Linux distributions reference](#linux-distributions-reference)

**Supported architectures**: x86_64, arm64

### Requirements

- Datadog Agent installed with APM Instrumentation enabled
- One of the [supported Linux distributions](#linux-distributions-reference)

### Limitations

- **SELinux**: Not supported on hardened environments such as SELinux
- **Small VM instances**: You may encounter timeouts with smaller VM instances such as `t2.micro`. Upgrade to a larger instance such as `t2.small` or higher

{{% /tab %}}

{{% tab "Docker" %}}

### Compatibility

**Status**: GA

**Supported operating systems**: See [Linux distributions reference](#linux-distributions-reference)

**Supported architectures**: x86_64, arm64

### Requirements

- Datadog Agent installed with APM Instrumentation enabled
- Docker running on one of the [supported Linux distributions](#linux-distributions-reference)

### Limitations

- **Rootless Docker mode**: If you are using Docker in rootless mode (Docker running without root privileges for added security), you need to configure the socket path to ensure SSI can connect to Docker. Update the socket path in `/etc/datadog-agent/inject/docker_config.yaml` to match your environment. By default, this path is set to `/run/user/$UID/docker.sock`, but it may vary based on your setup.

- **Custom `runc` shims**: If your environment uses custom `runc` shims (for GPU support or other specialized tasks), you must adjust your configuration to avoid conflicts. SSI requires its own `runc` shim to enable automatic instrumentation within Docker containers. To ensure compatibility, update the `runtimes` property in `/etc/datadog-agent/inject/docker_config.yaml` to include both your custom shim and the Datadog shim.

{{% /tab %}}

{{% tab "Kubernetes" %}}

### Compatibility

**Status**: GA

**Supported node pools**: Linux only (see [Linux distributions reference](#linux-distributions-reference))

**Supported architectures**: x86_64, arm64

### Requirements

- [Datadog Admission Controller][1] must be enabled
- Kubernetes nodes running one of the [supported Linux distributions](#linux-distributions-reference)

### Limitations

- **Linux node pools only**: Only Linux node pools are supported
- **Windows pods**: For Kubernetes clusters with Windows pods, use namespace inclusion/exclusion or specify an annotation in the application to exclude them from library injection

{{% /tab %}}

{{% tab "Windows IIS" %}}

### Compatibility

**Status**: GA

**Supported runtimes**: .NET only

### Requirements

- Datadog Agent v7.67.1 or higher
- Datadog .NET SDK v3.19.0 or higher
- Applications running in IIS

### Limitations

- **IIS only**: Only .NET applications running in IIS are supported
- **Other .NET applications**: .NET applications not running in IIS are not supported

{{% /tab %}}
{{< /tabs >}}

## Supported language runtimes

SSI automatically instruments applications written in the following languages by loading the Datadog Language SDK at runtime.

### Understanding SDK and runtime compatibility

<div class="alert alert-info">

SSI compatibility depends on two factors:

1. **SDK version**: SSI must support the Datadog Language SDK version (minimum versions listed below)
2. **Runtime version**: The Datadog Language SDK must support your application's language runtime version

If either requirement isn't met, SSI falls back gracefully and your application runs uninstrumented.

</div>

SSI [automatically downloads][2] a compatible Datadog Language SDK version based on your application's language. Select your language below to see minimum SDK versions, supported runtime versions, and any limitations:

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet,php" >}}

{{< programming-lang lang="java" >}}

### Minimum SDK version

**Java SDK**: 1.44.0 or higher

### Supported runtime versions

For a complete list of supported Java versions, see the [Java SDK compatibility documentation][4].

### Limitations

By default, SSI does not instrument some Java applications and libraries to avoid performance overhead or low-value traces. These exclusions are defined in the [Java SDK denylist](https://github.com/DataDog/dd-trace-java/blob/master/metadata/requirements.json). If your workload is included, SSI skips loading the Java SDK.

### Known issues

**Environment variable length**: If your application uses extensive command-line options or environment variables, you might encounter initialization failures. This typically occurs when you have many JVM arguments or other startup configurations. To resolve this:
- Minimize non-essential JVM arguments
- Consider moving some configurations to a `.properties` file
- Check application logs for specific initialization errors

**Java 24+ warnings**: When using SSI for Java 24+, you may see warnings related to JNI native access or `sun.misc.Unsafe` memory access. These warnings can be suppressed with the `--illegal-native-access=allow` and `--sun-misc-unsafe-memory-access=allow` environment variables. See [JEP 472](https://openjdk.org/jeps/472) and [JEP 498](https://openjdk.org/jeps/498) for more information.

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### Minimum SDK version

**Python SDK**: 2.20.1 or higher

### Supported runtime versions

**Minimum Python version**: 3.7 or higher

For a complete list of supported Python versions, see the [Python SDK compatibility documentation][5].

### Operating system considerations

Python 3.7+ is available by default only on:
- CentOS Stream 8+
- Red Hat Enterprise Linux 8+

For other distributions, you may need to install Python 3.7+ separately.

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Minimum SDK version

**Ruby SDK**: 2.5.0 or higher

### Supported runtime versions

For a complete list of supported Ruby versions, see the [Ruby SDK compatibility documentation][6].

### Operating system requirements

- Requires Linux distributions using glibc 2.27 or newer
- Not compatible with Alpine Linux or other musl-based distributions

### Known issues

**Uninstalling SSI**: When uninstalling Single Step Instrumentation from a Ruby application, follow these steps to prevent errors:

1. **Before uninstalling**: Make a backup of your `Gemfile` and `Gemfile.lock`
2. **After uninstalling**:
   - Restore your original `Gemfile` and `Gemfile.lock`, or
   - Run `bundle install` to rebuild your dependencies

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Minimum SDK version

**Node.js SDK**: 4.0 or higher

### Supported runtime versions

For a complete list of supported Node.js versions, see the [Node.js SDK compatibility documentation][7].

### Operating system considerations

Supported Node.js versions are available by default only on:
- CentOS Stream 9+
- Red Hat Enterprise Linux 9+

For other distributions, you may need to install Node.js separately.

### Limitations

- **ESM modules**: Instrumentation of ESM (ECMAScript modules) is not currently supported

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

### Minimum SDK version

**.NET SDK**: 3.7.0 or higher

### Supported runtime versions

SSI supports both .NET Core and .NET Framework runtimes. For a complete list of supported versions, see:

- [.NET Core SDK compatibility][8]
- [.NET Framework SDK compatibility][9]

{{< /programming-lang >}}

{{< programming-lang lang="php" >}}

### Minimum SDK version

**PHP SDK**: 1.6.0 or higher

### Supported runtime versions

For a complete list of supported PHP versions, see the [PHP SDK compatibility documentation][10].

### Limitations

SSI automatically disables when it detects:
- PHP's Just-In-Time (JIT) compilation
- Any of the following extensions:
  - Xdebug
  - ionCube Loader
  - NewRelic
  - Blackfire
  - pcov

<div class="alert alert-info">If you need to run SSI alongside these tools, you can force it to enable by setting: <code>DD_INJECT_FORCE=true</code></div>

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

<div class="alert alert-info">For additional operating system requirements specific to your programming language, see <a href="#language-specific-requirements">Language-specific requirements</a>.</div>

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /containers/cluster_agent/admission_controller/
[2]: /tracing/guide/injectors/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[4]: /tracing/trace_collection/compatibility/java/
[5]: /tracing/trace_collection/compatibility/python
[6]: /tracing/trace_collection/compatibility/ruby
[7]: /tracing/trace_collection/compatibility/nodejs
[8]: /tracing/trace_collection/compatibility/dotnet-core
[9]: /tracing/trace_collection/compatibility/dotnet-framework
[10]: /tracing/trace_collection/compatibility/php
