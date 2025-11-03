---
title: Compatibility
further_reading:
- link: /tracing/trace_collection/automatic_instrumentation/single-step-apm/
  tag: "Documentation"
  text: "Single Step APM Instrumentation"
---

## Overview

Single Step Instrumentation (SSI) has specific compatibility requirements that vary by language and environment. This page outlines supported versions, known limitations, and conditions that may impact Single Step Instrumentation for your specific setup.

## Operating systems

The following operating systems and architectures are compatible:

| OS           | Version   | Architecture  |
|--------------|-----------|---------------|
| Amazon Linux | 2022+     | x86_64, arm64 |
| CentOS       | 7+, 8+    | x86_64, arm64 |
| Debian       | 10-12     | x86_64, arm64 |
| Red Hat      | 7+        | x86_64, arm64 |
| Ubuntu       | 20+ (LTS) | x86_64, arm64 |
| Fedora       | 40        | x86_64, arm64 |
| AlmaLinux    | 8+        | x86_64, arm64 |
| Oracle Linux | 8+        | x86_64, arm64 |
| Rocky Linux  | 8+        | x86_64, arm64 |

<div class="alert alert-info">For additional operating system requirements specific to your programming language, see <a href="#language-specific-requirements">Language specific requirements</a>.</div>

## Deployment environments

The following environments are compatible:

| Environment     | Requirements & Limitations                              | Support |
|-----------------|---------------------------------------------------------|---------|
| Linux           | Not supported on hardened environments such as SELinux. | GA      |
| Docker on Linux |                                                         | GA      |
| Kubernetes      | Requires [Datadog Admission Controller][1] to be enabled. <br>Only supports Linux nodepools     | GA      |
| Windows IIS     | Requires Agent v7.67.1+ and Tracer v3.19.0+.<br>Only .NET applications running in IIS are supported.     | GA      |


### Environment-specific requirements

#### Linux virtual machines (VMs)

You may encounter timeouts with smaller VM instances such as `t2.micro`. In this case, you should upgrade to a larger instance such as `t2.small`.

#### Docker containers

- **Rootless Docker mode**: If you are using Docker in rootless mode (that is, Docker running without root privileges for added security), you need to configure the socket path to ensure SSI can connect to Docker. Update the socket path in `/etc/datadog-agent/inject/docker_config.yaml` to match your environment. By default, this path is set to `/run/user/$UID/docker.sock`, but it may vary based on your setup.

- **Custom `runc` shims**: If your environment uses custom `runc` shims (for GPU support or other specialized tasks), you must adjust your configuration to avoid conflicts. SSI requires its own `runc` shim to enable automatic instrumentation within Docker containers. To ensure compatibility, update the `runtimes` property in `/etc/datadog-agent/inject/docker_config.yaml` to include both your custom shim and the Datadog shim.

#### Kubernetes with Windows pods

For Kubernetes clusters with Windows pods, use namespace inclusion/exclusion or specify an annotation in the application to exclude them from library injection.

## Tracer libraries

<div class="alert alert-info">

SSI instrumentation depends on both the tracer version and your application's language version. Specifically:

- SSI must be compatible with the tracer version
- That tracer version must support the language version you're using

If either requirement isn't met, SSI falls back gracefully and your application runs uninstrumented.

</div>

SSI [automatically downloads][2] a compatible tracer version based on your application's language. The following tracer versions support injection with SSI:

| Tracer Language  | Version   |
|------------------|-----------|
| Java             | 1.44.0+   | 
| Python           | 2.20.1+   | 
| Node.js          | 4+        | 
| .NET             | 3.7.0+    | 
| Ruby             | 2.5.0+    |  
| PHP              | 1.6.0+    |  


## Language-specific requirements

While Single Step Instrumentation itself does not directly require a specific language version, compatibility depends on whether a supported tracer version exists for that language version. See the [Tracer libraries](#tracer-libraries) section for details.

To check which language versions are supported for your runtime, see the compatibility documentation for each tracer:

For a complete list of supported language versions, see the compatibility documentation for each tracer:

- [Java tracer compatibility][4]
- [Python tracer compatibility][5]
- [Ruby tracer compatibility][6]
- [Node.js tracer compatibility][7]
- [.NET Core tracer compatibility][8]
- [.NET Framework tracer compatibility][9]
- [PHP tracer compatibility][10]

The following section provides additional notes, troubleshooting guidance, and known limitations for each language:

{{< programming-lang-wrapper langs="java,python,ruby,nodejs,dotnet,php" >}}

{{< programming-lang lang="java" >}}

### Limitations

By default, SSI does not instrument some Java applications and libraries to avoid performance overhead or low-value traces. These exclusions are defined in the [Java tracer denylist][1]. If your workload is included, the injector skips attaching the Java agent.

### Troubleshooting

**Environment variable length**: If your application uses extensive command-line options or environment variables, you might encounter initialization failures. This typically occurs when you have many JVM arguments or other startup configurations. To resolve this:
  - Minimize non-essential JVM arguments
  - Consider moving some configurations to a `.properties` file
  - Check application logs for specific initialization errors

### Known warnings

When using SSI for Java 24+, you may see warnings related to JNI native access or `sun.misc.Unsafe` memory access. These warnings can be suppressed with the `--illegal-native-access=allow` and `--sun-misc-unsafe-memory-access=allow` environment variables. See [JEP 472][2] and [JEP 498][3] for more information.

[1]: https://github.com/DataDog/dd-trace-java/blob/master/metadata/requirements.json
[2]: https://openjdk.org/jeps/472
[3]: https://openjdk.org/jeps/498

{{< /programming-lang >}}

{{< programming-lang lang="python" >}}

### Default system repository support

Single Step Instrumentation requires Python 3.7+, which is available by default only on:
- CentOS Stream 8+
- Red Hat Enterprise Linux 8+

{{< /programming-lang >}}

{{< programming-lang lang="ruby" >}}

### Troubleshooting

When uninstalling Single Step Instrumentation from a Ruby application, follow these steps to prevent errors:

1. **Before uninstalling**: Make a backup of your `Gemfile` and `Gemfile.lock`.
2. **After uninstalling**:
   - Restore your original `Gemfile` and `Gemfile.lock`, or
   - Run `bundle install` to rebuild your dependencies.

### Additional information

- Requires Linux distributions using glibc 2.27 or newer
- Not compatible with Alpine Linux or other musl-based distributions

{{< /programming-lang >}}

{{< programming-lang lang="nodejs" >}}

### Default system repository support
Default system repositories include supported Node.js versions only on:
- CentOS Stream 9+
- Red Hat Enterprise Linux 9+

### Additional information
- Instrumentation of ESM modules is not currently supported.

{{< /programming-lang >}}

{{< programming-lang lang="dotnet" >}}

## Supported .NET runtimes

SSI supports both .NET Core and .NET runtimes. See the tracer documentation for version compatibility details:

- [.NET Core tracer compatibility][8]
- [.NET Framework tracer compatibility][9]

[8]: /tracing/trace_collection/compatibility/dotnet-core
[9]: /tracing/trace_collection/compatibility/dotnet-framework

{{< /programming-lang >}}

{{< programming-lang lang="PHP" >}}

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
[2]: /tracing/guide/injectors/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[4]: /tracing/trace_collection/compatibility/java/
[5]: /tracing/trace_collection/compatibility/python
[6]: /tracing/trace_collection/compatibility/ruby
[7]: /tracing/trace_collection/compatibility/nodejs
[8]: /tracing/trace_collection/compatibility/dotnet-core
[9]: /tracing/trace_collection/compatibility/dotnet-framework
[10]: /tracing/trace_collection/compatibility/php
