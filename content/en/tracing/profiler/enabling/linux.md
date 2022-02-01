---
title: Enabling the Datadog Profiler for Linux
kind: Documentation
code_lang: linux
type: multi-code-lang
code_lang_weight: 90
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

<div class="alert alert-warning">
The Datadog Profiler for Linux is in public beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

The Datadog Profiler for Linux lets you collect profile data for applications running on Linux. It is ideally suited for applications written in compiled languages, such as C, C++, or Rust. It can also profile services such as nginx, Redis, or Postgres, as it does not require access to source code.

## Requirements

The Datadog Profiler requires Linux kernel v4.17+ on an `amd64` compatible processor. It does not support macOS, BSD, Windows, or other operating systems besides Linux v4.17 or later. 

## Installation

To begin profiling applications:

1. Configure the `perf_event_paranoid` kernel setting to be at most 2. On many distributions, you can check this parameter by running `cat /proc/sys/kernel/perf_event_paranoid` or `sysctl kernel.perf_event_paranoid`. You can set this value until the next reboot by running `echo 2 | sudo tee /proc/sys/kernel/perf_event_paranoid` and set it on every system startup with `sudo sysctl -w kernel.perf_event_paranoid=2`. These commands can't usually be run from a container, as the `perf_event_paranoid` setting is an operating system parameter. These commands may not work for all configurations. For alternatives, see [Troubleshooting][1].

2. Ensure you are running the Datadog Agent version [7.20.2][2]+ or [6.20.2][3]+.

3. Download the appropriate [ddprof binary][4] for your Linux distribution. For example, here is one way to pull the latest release:

   ```shell
   curl -L -O https://github.com/DataDog/ddprof/releases/download/v0.7.0/ddprof-x86_64-linux-gnu.tar.gz
   tar xvf ddprof-x86_64-linux-gnu.tar.gz
   mv ddprof-x86_64-linux-gnu/bin/ddprof INSTALLATION_TARGET
   ```

   Where `INSTALLATION_TARGET` specifies the location you'd like to store the `ddprof` binary. The examples that follow assume `INSTALLATION_TARGET` is set to `./ddprof`.

4. Modify your service invocation to include the profiler. Your usual command is passed as the last arguments to the `ddprof` executable.
   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
./ddprof myapp --arg1 --arg2
```
**Note**: If you usually launch your application using a shell builtin, for example:

```shell
exec myapp --arg1 --arg2
```

Then you must invoke `ddprof` with that builtin instead:

```shell
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
exec ./ddprof myapp --arg1 --arg2
```

{{% /tab %}}
{{% tab "In code" %}}

```shell
./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

**Note**: If you usually launch your application using a shell builtin, for example:

```shell
exec myapp --arg1
```

Then you must invoke `ddprof` with that builtin instead:

```shell
exec ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

{{% /tab %}}
{{< /tabs >}}


5. A minute or two after starting your application, your profiles appear on the [Datadog APM > Profiler page][5].

## Configuration

Configuration for the profiler can be set by command line parameters, environment variables, or a combination of both. Whenever both are provided for a given setting, the command line parameter is used.

| Environment variable            | Long name       | Short name | Default   | Description                                                                                                                          |
|---------------------------------|-----------------|------------|-----------|--------------------------------------------------------------------------------------------------------------------------------------|
| DD_ENV                          | environment     | E          |           | The [environment][6] name, for example, `production`.                                                                                |
| DD_SERVICE                      | service         | S          | myservice | The [service][6] name, for example, `web-backend`.                                                                                   |
| DD_VERSION                      | service_version | V          |           | The [version][6] of your service.                                                                                                    |
| DD_AGENT_HOST                   | host            | H          | localhost | The hostname for the Datadog agent.                                                                                                  |
| DD_TRACE_AGENT_PORT             | port            | P          | 8126      | The Datadog agent listening port.                                                                                                    |
| DD_TRACE_AGENT_URL              | url             | U          |           | `https://<hostname>:<port>` overrides other agent host/port settings.                                                                |
| DD_TAGS                         | tags            | T          |           | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` pairs separated by commas, such as: `layer:api,team:intake`. |
| DD_PROFILING_NATIVE_NICE        | nice            | i          |           | Sets the nice level of the profiler without affecting the instrumented processes.                                                    |
| DD_PROFILING_NATIVE_SHOW_CONFIG | show_config     | a          | no        | Whether to log profiler configuration parameters.                                                                                    |
| DD_PROFILING_NATIVE_LOG_MODE    | log_mode        | o          | stdout    | How to emit profiler logs. See the section on logging for details.                                                                   |
| DD_PROFILING_NATIVE_LOG_LEVEL   | log_level       | l          | warn      | Determines log verbosity.                                                                                                            |
| DD_PROFILING_NATIVE_TARGET_PID  | pid             | p          |           | Engages pidmode. See the section on pidmode for details.                                                                             |
| DD_PROFILING_NATIVE_GLOBAL      | global          | g          | no        | Engages globalmode. See the section on globalmode for details. Overrides --pid.                                                      |

When passing command line arguments, precede long names with two dashes and short names with a single dash. For example, `--service myservice` and `-S myservice`.

The `environment`, `service`, and `service_version` settings are recommended, as they are used by the Profiling UI.

**Note**: Parameters must be set with a value. For example, to log profiler configuration, you must either set `DD_PROFILING_NATIVE_SHOW_CONFIG=yes` or pass `--show_config yes`, rather than `--show_config` alone. For such arguments, `yes`, `true`, and `enable` may be used interchangeably to enable the setting and `no`, `false`, and `disable` may be used to disable it.

### Logging

You can configure logging to one of several endpoints:
- `stdout` prints the logs to standard output stream (the default).
- `stderr` prints the logs to the standard error stream.
- `syslog` publishes the logs to syslog, attempting to adhere to the specification in RFC 3164.
- `disable` disables the logs entirely.
- Any other value is treated as a file path, with a leading `/` designating an absolute path.

### Pidmode

When a target PID is given, instrument that PID. When this mode is engaged, any parameter after typical profiler argument processing is ignored. If the owning UID of the target PID and the profiler differ, do one of the following:
- Run the profiler as the root process instead.
- Grant `CAP_PERFMON` to the profiler (Linux v5.8 or later).
- Grant `CAP_SYS_ADMIN` to the profiler.
- Decrease `perf_event_paranoid` to `-1` (consult your distro documentation or system administrator for details).

When a PID is specified in this way, only child processes (both forks and threads) spawned after instrumentation will be followed.

### Globalmode

When globalmode is engaged, the profiler attempts to profile as many processes as possible. Usually, this requires elevated permissions (for example, running as root or granting `CAP_PERFMON`) or setting `perf_event_paranoid` to `-1`.

When the profiler has non-root UID, usually only processes owned by the matching UID are instrumented.

When the profiler has root UID, all visible processes are instrumented. For most configurations, this consists of all processes visible within the profiler's PID namespace, as well as some other processes (such as the container runtime--these external processes are listed as "PID 0" in the UI).

## Not sure what to do next?

The [Getting Started with Profiler][7] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/profiler/profiler_troubleshooting
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://github.com/DataDog/ddprof/releases
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/tagging/unified_service_tagging
[7]: /getting_started/profiler/
