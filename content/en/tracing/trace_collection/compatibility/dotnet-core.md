---
title: .NET and .NET Core Compatibility Requirements
description: 'Compatibility Requirements for the .NET Tracer'
aliases:
  - /tracing/compatibility_requirements/dotnet-core
  - /tracing/setup_overview/compatibility_requirements/dotnet-core
code_lang: dotnet-core
type: multi-code-lang
code_lang_weight: 70
further_reading:
    - link: 'tracing/trace_collection/dd_libraries/dotnet-core'
      tag: 'Documentation'
      text: 'Instrument Your Application'
    - link: 'https://github.com/DataDog/dd-trace-dotnet/tree/master/tracer/samples'
      tag: "Source Code"
      text: 'Examples of Custom Instrumentation'
    - link: 'https://www.datadoghq.com/blog/asp-dotnet-core-monitoring/'
      tag: 'Blog'
      text: 'Monitor containerized ASP.NET Core applications'
---


The Datadog .NET Tracer supports all .NET-based languages (for example, C#, F#, Visual Basic). It has [beta support for trimmed apps][12].

The .NET Tracer is open source. For more information, see the [.NET Tracer repository][1].

## Supported .NET and .NET Core runtimes

The .NET Tracer supports automatic instrumentation on the following .NET and .NET Core versions. It also supports [.NET Framework][2].

| .NET Version         | Microsoft End of Life | Support level        | Package version      |
| -------------------- | --------------------- | -------------------- | -------------------- |
| .NET 8               |                       | [GA](#support-ga)    | latest (>= 2.42.0)   |
| .NET 7               | 05/14/2024            | [GA](#support-ga)    | latest (>= 2.20.0)   |
| .NET 6               |                       | [GA](#support-ga)    | latest (>= 2.0.0)    |
| .NET 5               | 05/10/2022            | [GA](#support-ga)    | latest (>= 2.0.0)    |
| .NET Core 3.1        | 12/13/2022            | [GA](#support-ga)    | latest               |
| .NET Core 3.0        | 03/03/2020            | [EOL](#support-eol)  | Not recommended       |
| .NET Core 2.2        | 12/23/2019            | [EOL](#support-eol)  | Not recommended       |
| .NET Core 2.1        | 08/21/2021            | [EOL](#support-eol)  | Not recommended       |
| .NET Core 2.0        | 10/01/2018            | [EOL](#support-eol)  | Not recommended       |

Additional information can be found in [Microsoft's .NET and .NET Core Lifecycle Policy][3], [End of life .NET runtime versions](#end-of-life-net-runtime-versions), and [.NET runtime support policy](#net-runtime-support-policy).

## Supported processor architectures

The .NET Tracer supports automatic instrumentation on the following architectures:

| Processor architectures                   | Support level         | Package version                        |
| ------------------------------------------|-----------------------|----------------------------------------|
| Windows x64 (`win-x64`)                   | [GA](#support-ga)     | latest                                 |
| Windows x86 (`win-x86`)                   | [GA](#support-ga)     | < 3.0.0 (e.g. 2.56.0)                  |
| Linux x64 (`linux-x64`)                   | [GA](#support-ga)     | latest                                 |
| Alpine Linux x64 (`linux-musl-x64`)       | [GA](#support-ga)     | latest                                 |
| Linux ARM64 (`linux-arm64`)               | [GA](#support-ga)     | .NET 5+ only, added in version 1.27.0  |
| Alpine Linux arm64 (`linux-musl-arm64`)   | [GA](#support-ga)     | .NET 6+ only, added in version 3.2.0   |

Note that running 32-bit applications on Windows x64 is supported.

## Supported operating systems

The .NET Tracer supports automatic instrumentation on Windows and Linux operating systems. It supports macOS for CI Test Optimization only.

### Windows

| Operating System             | Version     | Support level         | Package version                        |
| -----------------------------|-------------|-----------------------|----------------------------------------|
| Windows Server (x64)         | 2012+       | [GA](#support-ga)     | latest                                 |
| Windows Client (x64)         | 8.1+        | [GA](#support-ga)     | latest                                 |
| Nano Server (x64)            | < 2012      | [EOL](#support-eol)   | < 3.0.0 (e.g. 2.48.0)                  |
| Windows Server (x64)         | < 2012      | [EOL](#support-eol)   | < 3.0.0 (e.g. 2.48.0)                  |
| Windows Server (x86)         | All versions| [EOL](#support-eol)   | < 3.0.0 (e.g. 2.48.0)                  |

Additional information on the operating systems supported by .NET and .NET Core can be found in the [.NET release notes][19]

### Linux

The .NET Tracer supports Linux distributions as best-effort, based on minimum libc version compatibility:

- x64: [glibc][20] 2.17 (from CentOS 7)
- Arm64: [glibc][20] 2.23 (from Debian 10)
- Alpine x64: [musl][21] 1.2.2 (from Alpine 3.14)
- Alpine arm64: [musl][21] 1.2.4 (from Alpine 3.18)

| Operating System         | Version | Architectures | Support level         | Package version              |
| -------------------------|---------|---------------|-----------------------|------------------------------|
| Alpine Linux (x64)       | 3.14+   |  x64,         | [GA](#support-ga)     | latest (.NET 5+ only, v1.27.0+) |
| Alpine Linux (arm64)     | 3.18+   |  Arm64        | [GA](#support-ga)     | latest (.NET 6+ only, v3.2.0+) |
| CentOS Linux             | 7+      |  x64          | [Maintenance](#support-maintenance)   | latest (EOL in v4.0.0)  |
| CentOS Stream Linux      | 8       |  x64          | [Maintenance](#support-maintenance)   | latest (EOL in v4.0.0)  |
| Debian                   | 10+     |  x64, Arm64   | [GA](#support-ga)     | latest                       |
| Fedora                   | 29+     |  x64          | [GA](#support-ga)     | latest                       |
| openSUSE                 | 15+     |  x64          | [GA](#support-ga)     | latest                       |
| Red Hat Enterprise Linux | 7+      |  x64          | [GA](#support-ga)     | latest                       |
| Ubuntu                   | 18.04+  |  x64, Arm64   | [GA](#support-ga)     | latest                       |

### macOS

The .NET Tracer supports macOS for CI Test Optimization only

| Operating System         | Version | Architectures | Support level         | Package version              |
| -------------------------|---------|---------------|-----------------------|------------------------------|
| macOS                    | 12.0+   |  x64, Arm64   | [GA](#support-ga)     | latest                       |
| macOS                    | 11.0    |  x64          | [EOL](#support-eol)     | < 3.0.0                    |
| macOS                    | 11.0    |  Arm64        | [EOL](#support-eol)     | < 3.0.0 (Added in 2.20.0)  |

## Integrations


Link


## End of life .NET runtime versions

The .NET Tracer works on .NET Core 2.0, 2.1, 2.2, 3.0, and 3.1, and on .NET 5 and 7, but these versions reached their end of life and are no longer supported by Microsoft. See [Microsoft's support policy][3] for more details. Datadog recommends using the latest patch version of .NET 6 or .NET 8. Older versions of .NET and .NET Core may encounter the following runtime issues when enabling automatic instrumentation:

| Issue                                         | Affected .NET Versions                    | Solution                                                               | More information                        |
|-----------------------------------------------|-------------------------------------------|------------------------------------------------------------------------|-----------------------------------------|
| JIT Compiler bug on Linux/x64                 | 2.0.x,</br>2.1.0-2.1.11,</br>2.2.0-2.2.5  | Upgrade .NET Core to the latest patch version, or follow steps in the linked issue | [DataDog/dd-trace-dotnet/issues/302][6] |
| Resource lookup bug with a non `en-US` locale | 2.0.0                                     | Upgrade .NET Core to 2.0.3 or above                                    | [dotnet/runtime/issues/23938][7]        |
| JIT Compiler bug causing crash on shutdown    | 2.0.0-2.2.x                               | Upgrade .NET Core to 3.1.0 or above | [dotnet/runtime/pull/11885][15]   |
| JIT Compiler bug                              | 2.x, 3.x, 5.x, 6.x, 7.x, 8.0.0-8.0.5      | Upgrade .NET to 8.0.6 or above    | [dotnet/runtime/pull/73760][16]   |
| JIT Compiler bug                              | All versions of .NET                      | No current workaround    | [dotnet/runtime/issues/85777][17]   |
| .NET runtime bug causing crashes when used with runtime metrics | 6.0.0-6.0.10            | Upgrade .NET 6.0.11 or above, or disable runtime metrics    | [dotnet/runtime/pull/76431][18]   |

## Supported Datadog Agent versions

| **Datadog Agent version**   | **Package version** |
|-----------------------------|---------------------|
| [7.x][8]                    | Latest              |
| [6.x][8]                    | Latest              |
| [5.x][9]                    | Latest              |

## .NET runtime support policy

The .NET Tracer depends on the host operating system, .NET runtime, certain .NET libraries, and the Datadog Agent/API. These third party software systems support specific versions of .NET and .NET Core. When the external software no longer supports a version of .NET, the .NET Tracer also limits its support for that version.

### Levels of support

| **Level**                                              | **Support provided**                                                                                                                                                          |
|--------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| <span id="support-unsupported">Unsupported</span>      |  No implementation. [Contact customer support for special requests.][10]                                                             |
| <span id="support-beta">Beta</span>                    |  Initial implementation. May not yet contain all features. Support for new features, bug & security fixes provided on a best-effort basis.                                    |
| <span id="support-ga">General Availability (GA)</span> |  Full implementation of all features. Full support for new features, bug & security fixes.                                                                                    |
| <span id="support-maintenance">Maintenance</span>      |  Full implementation of existing features. Does not receive new features. Support for bug & security fixes only.                                                              |
| <span id="support-eol">End-of-life (EOL)</span>        |  No support.                                                                                                                                                                  |

### Package versioning

The .NET Tracer practices [semantic versioning][11].
Version updates imply the following changes to runtime support:

  - **Major version updates** (for example `1.0.0` to `2.0.0`) may change support for any runtime from [Beta](#support-beta)/[GA](#support-ga) to [Maintenance](#support-maintenance)/[EOL](#support-eol).
  - **Minor version updates** (for example `1.0.0` to `1.1.0`) won't lower the level of support for one runtime but may add support for one.
  - **Patch version updates** (for example `1.0.0` to `1.0.1`) will not change support for any runtime.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://github.com/DataDog/dd-trace-dotnet
[2]: /tracing/compatibility_requirements/dotnet-framework/
[3]: https://dotnet.microsoft.com/platform/support/policy/dotnet-core
[4]: https://github.com/DataDog/dd-trace-dotnet/releases/latest
[5]: /help/
[6]: https://github.com/DataDog/dd-trace-dotnet/issues/302#issuecomment-603269367
[7]: https://github.com/dotnet/runtime/issues/23938
[8]: /agent/basic_agent_usage/?tab=agentv6v7
[9]: /agent/basic_agent_usage/?tab=agentv5
[10]: https://www.datadoghq.com/support/
[11]: https://semver.org/
[12]: https://www.nuget.org/packages/Datadog.Trace.Trimming/
[13]: /opentelemetry/interoperability/instrumentation_libraries/?tab=dotnet
[15]: https://github.com/dotnet/runtime/pull/73760
[16]: https://github.com/dotnet/runtime/issues/11885
[17]: https://github.com/dotnet/runtime/issues/85777
[18]: https://github.com/dotnet/runtime/pull/76431
[19]: https://github.com/dotnet/core/tree/main/release-notes
[20]: https://www.gnu.org/software/libc/
[21]: https://musl.libc.org/