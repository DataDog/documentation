---
title: Enabling the Native Profiler for Linux
kind: Documentation
code_lang: native
type: multi-code-lang
code_lang_weight: 40
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

{{< site-region region="us5" >}}
<div class="alert alert-warning">
  The Continuous Profiler is not available for the Datadog {{< region-param key="dd_site_name" >}} site.
</div>
{{< /site-region >}}

## Requirements

The Datadog Profiler requires Linux kernel v4.17+ on an `amd64` compatible processor. It does not currently support macOS, BSD, Windows, or other operating systems besides Linux v4.17 or later. `/proc/sys/kernel/perf_event_open` must be set to *at most* 2 or `CAP_SYS_ADMIN` (or `CAP_PERFMON` on Linux v5.8 or later) must be granted to the profiling process or service container.

## Installation

To begin profiling applications:

1. Ensure you are running the Datadog agent version [7.20.2][1]+ or [6.20.2][2]+.

2. Download the appropriate [ddprof binary][3] for your Linux distribution.

3. Modify your service invocation to include the profiler. Your usual command is passed as the last arguments to the `ddprof` executable.
   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_ENV="<APPLICATION_ENVIRONMENT>"
export DD_SERVICE="<SERVICE_NAME>"
export DD_VERSION="<APPLICATION_VERSION>"
ddprof myapp --arg1 --arg2
```

The following parameters are recommended, as they help identify the source of your profiles in the Profiling UI:
- `DD_ENV`, the [environment][4] name, for example, `production`.
- `DD_SERVICE`, the [service][4] name, for example, `web-backend`. If this is not specified, the profiler will use the default value `myservice`.
- `DD_VERSION`, the [version][4] of your application.

**Note**: if you usually launch your application using shell builtins, for example:

```shell
exec myapp --arg1 --arg2
```

then you must invoke `ddprof` with those builtins instead:

```shell
export DD_SERVICE="<SERVICE_NAME>"
export DD_VERSION="<APPLICATION_VERSION>"
export DD_ENV="<APPLICATION_ENVIRONMENT>"
exec ddprof myapp --arg1 --arg2
```

{{% /tab %}}
{{% tab "In code" %}}

```shell
ddprof --service "<SERVICE_NAME>" --vername "<APPLICATION_VERSION"> myapp --arg1 --arg2
```

The following settings help you identify the source of your profiles:
- `--environment`, the [environment][4] name, for example, `production`.
- `--service`, the [service][4] name, for example, `web-backend`. If this is not specified, the profiler will use the default value `myservice`.
- `--vername`, the [version][4] of your application.

**Note**: if you usually launch your application using shell builtins, for example:

```shell
exec myapp --arg1
```

then you must invoke `ddprof` with those builtins instead:

```shell
exec ddprof --service "<SERVICE_NAME>" --vername "<APPLICATION_VERSION"> myapp --arg1
```

{{% /tab %}}
{{< /tabs >}}


4. A minute or two after starting your application, your profiles will show up on the [Datadog APM > Profiler page][4].

## Configuration

Configuration for the profiler can be set by commandline parameters, environment variables, or a combination of both. Whenever both are provided for a given setting, the commandline parameter is preferred.

| Environment variable         | Longname    | Shortname | Default   | Description                                                                                                                    |
|------------------------------|-------------|-----------|-----------|--------------------------------------------------------------------------------------------------------------------------------|
| DD_ENV                       | environment | E         |           | The [environment][5] name, for example, `production`.                                                                          |
| DD_SERVICE                   | service     | S         | myservice | The [service][5] name, for example, `web-backend`.                                                                             |
| DD_VERSION                   | vername     | V         |           | The [version][5] of your service.                                                                                              |
| DD_AGENT_HOST                | host        | H         | localhost | The hostname for the Datadog agent.                                                                                            |
| DD_TRACE_AGENT_PORT          | port        | P         | 8126      | The Datadog agent listening port.                                                                                              |
| DD_TRACE_AGENT_URL           | url         | U         |           | `https://<hostname>:<port>` overrides other agent host/port settings.                                                          |
| DD_TAGS                      | tags        | T         |           | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` separated by commas, such as: `layer:api,team:intake`. |
| DD_PROFILING_NATIVENICE      | nice        | i         |           | Sets the nice level of the profiler without affecting the instrumented processes.                                              |
| DD_PROFILING_NATIVEPRINTARGS | printargs   | a         | no        | Whether or not to log profiler configuration parameters.                                                                       |
| DD_PROFILING_NATIVELOGMODE   | logmode     | o         | stdout    | How to emit profiler logs. See the section on logging for details.                                                             |
| DD_PROFILING_NATIVELOGLEVEL  | loglevel    | l         | warn      | Determines log verbosity.                                                                                                      |
| DD_PROFILINE_NATIVETARGET    | pid         | p         |           | Engages pidmode. See the section on pidmode for details.                                                                       |
| DD_PROFILING_NATIVEGLOBAL    | global      | g         | no        | Engages globalmode. See the section on globalmode for details. Overrides --pid.                                                |

When passing commandline arguments, the profiler adheres to the convention by which longnames are preceeded by two dashes and shortnames by a single dash. For example, `--service myservice` versus `-S myservice`.

**Note**: parameters must be set with a value. For example, to log profiler configuration, you must either set `DD_PROFILING_NATIVEPRINTARGS=yes` or pass `--printargs yes`, rather than `--printargs` alone. For such arguments, `yes`, `true`, and `enable` may be used interchangeably to enable the setting and `no`, `false`, and `disable` may be used to disable it.

### Logging

You may configure logging to one of several endpoints:
- `stdout` will print the logs to standard output stream (the default).
- `stderr` will print the logs to the standard error stream.
- `syslog` will publish the logs to syslog, attempting to adhere to the specification in RFC 3164.
- `disable` will disable the logs entirely.
- Any other value will be treated as a file path, with a leading `/` designating an absolute path.

### Pidmode

When a target PID is given, instrument that PID. When this mode is engaged, any parameter after typical profiler argument processing is ignored. If the owning UID of the target PID and the profiler varies, then you may have to do one of the following
- Run the profiler as the root process instead
- Grant `CAP_PERFMON` to the profiler (Linux v5.8 or later)
- Grant `CAP_SYS_ADMIN` to the profiler
- Decrease `perf_event_paranoid` to `-1` (consult your distro documentation or system administrator for details)

When a PID is specified in this way, only child processes (both forks and threads) spawned after instrumentation will be followed.

### Globalmode

When globalmode is engaged, the profiler attempts to profile as many processes as possible. Usually, this requires elevated permissions (for example, running as root or granting `CAP_PERFMON`) or setting `perf_event_paranoid` to `-1`.

When the profiler has non-root UID, usually only processes owned by the matching UID are instrumented.

When the profiler has root UID, all visible processes are instrumented. For most configurations, this consists of all processes visible within the profiler's PID namespace, as well as some other processes (such as the container runtime--these external processes are listed as "PID 0" in the UI).

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/overview
[2]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[3]: https://github.com/DataDog/ddprof/releases
[4]: https://app.datadoghq.com/profiling
[5]: /getting_started/tagging/unified_service_tagging
