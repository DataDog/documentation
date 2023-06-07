---
title: Enabling the Native Profiler for Compiled Languages
kind: Documentation
code_lang: ddprof
type: multi-code-lang
code_lang_weight: 90
aliases:
  - /tracing/profiler/enabling/linux/
  - /tracing/profiler/enabling/ddprof/
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profiler_troubleshooting/ddprof'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

<div class="alert alert-warning">
<code>ddprof</code> is in beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

The native profiler for compiled languages (`ddprof`) uses OS level APIs to collect profiling data. It is ideally suited for applications written in compiled languages, such as C, C++, or Rust.
Profiles sent from `ddprof` show up under the _native_ runtime in the Datadog web app.

## Requirements

Supported operating systems
: Linux (glibc or musl)

Supported architecture
: `amd64` or `arm64` processors

Serverless
: `ddprof` is not supported on serverless platforms, such as AWS Lambda.

OS Settings
: `perf_event_paranoid` kernel setting is 2 or less (see [Troubleshooting][1])

Debugging information
: Symbols should be available. The profiler cannot provide human-readable function names if the symbol table is stripped.

## Installation

The profiler can be used either as a standalone executable or as a library. Skip to [library installation instructions](#library) if you want to use it as a library.

### Standalone

1. Download the latest [`ddprof` release][2]. For example, here is one way to pull the `v0.10.1` release for an `amd64` (also known as `x86_64`) platform:

   ```bash
   curl -L -o ddprof-amd64-linux.tar.xz https://github.com/DataDog/ddprof/releases/download/v0.10.1/ddprof-0.10.1-amd64-linux.tar.xz
   tar xvf ddprof-amd64-linux.tar.xz
   mv ddprof/bin/ddprof INSTALLATION_TARGET
   ```

   Where `INSTALLATION_TARGET` specifies the location you'd like to store the `ddprof` binary. The examples that follow assume `INSTALLATION_TARGET` is set to `./ddprof`.

2. Modify your service invocation to include the profiler. Your usual command is passed as the last arguments to the `ddprof` executable.
   {{< tabs >}}
{{% tab "Environment variables" %}}

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
./ddprof myapp --arg1 --arg2
```
**Note**: If you usually launch your application using a shell builtin, for example:

```bash
exec myapp --arg1 --arg2
```

Then you must invoke `ddprof` with that builtin instead:

```bash
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
exec ./ddprof myapp --arg1 --arg2
```

{{% /tab %}}
{{% tab "Parameters" %}}

```bash
./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

**Note**: If you usually launch your application using a shell builtin, for example:

```bash
exec myapp --arg1
```

Then you must invoke `ddprof` with that builtin instead:

```bash
exec ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
```

{{% /tab %}}
{{< /tabs >}}


5. A few minutes after starting your application, your profiles appear on the [Datadog APM > Profiler page][3].

### Library

The library exposes a C API.

1. Download a release of [ddprof][2] with library support (v0.8.0 or later) and extract the tarball. For example:

   ```bash
   curl -L -o ddprof-amd64-linux.tar.xz https://github.com/DataDog/ddprof/releases/download/v0.10.1/ddprof-0.10.1-amd64-linux.tar.xz
   tar xvf ddprof-amd64-linux.tar.xz --directory /tmp
   ```

2. In your code, start the profiler using the `ddprof_start_profiling()` interface, defined in the `_dd_profiling.h_` header provided by the release. The profiler stops automatically when your program closes. To stop the profiler manually, use `ddprof_stop_profiling(ms)` with the `ms` parameter indicating the maximum block time of the function in milliseconds. Here is a standalone example (`profiler_demo.c`) in C:
   ```cpp
   #include <stdlib.h>
   #include "dd_profiling.h"
  
   int foo(void) {
     int n = 0;
     for (int i = 0; i < 1000; i++) {
       n += 1;
     }
     return n;
   }
  
   int main(void) {
     // Initialize and start the Datadog profiler. Uses agent defaults if not
     // specified
     setenv("DD_ENV", "prod", 1);
     setenv("DD_SERVICE", "c_testservice", 1);
     setenv("DD_VERSION", "1.0.3", 1);
     ddprof_start_profiling();
  
     // Do some work
     for (int i = 0; i < 1e6; i++) {
       foo();
     }
     return 0;
   }
   ```

3. Pass the `include` and `lib` subdirectories of the extracted directory to your build system and link against `libdd_profiling`. For the above example:
   ```bash
   gcc -I/tmp/ddprof/include -L/tmp/ddprof/lib profiler_demo.c -o profiler_demo -ldd_profiling
   ```

### Deploying the shared library

The shared library must be present in the system's library search path. Otherwise, the application will fail to start. Using the example from before:
```bash
./profiler_demo
./profiler_demo: error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

Avoid this by linking against the static library.

#### Installing the library

Add the library to the search path by copying it to any existing search directory. To find out what your search directories are, on Linux systems, run:
```bash
ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n
```

#### Appending a search directory

Use the `LD_LIBRARY_PATH` environment variable to add additional search paths to the runtime linker. For example, using the directory layout from before:

```bash
export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/tmp/ddprof/lib
```

## Configuration

Configuration for the profiler can be set by command line parameters, environment variables, or a combination of both. Whenever both are provided for a given setting, the command line parameter is used.

| Environment variable            | Long name       | Short name | Default   | Description                                                                                                                          |
| ------------------------------- | --------------- | ---------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| DD_ENV                          | environment     | E          |           | The [environment][4] name, for example, `production`.                                                                                |
| DD_SERVICE                      | service         | S          | myservice | The [service][4] name, for example, `web-backend`.                                                                                   |
| DD_VERSION                      | service_version | V          |           | The [version][4] of your service.                                                                                                    |
| DD_AGENT_HOST                   | host            | H          | localhost | The hostname for the Datadog agent.                                                                                                  |
| DD_TRACE_AGENT_PORT             | port            | P          | 8126      | The Datadog agent listening port.                                                                                                    |
| DD_TRACE_AGENT_URL              | url             | U          |           | `https://<hostname>:<port>` overrides other agent host/port settings.                                                                |
| DD_TAGS                         | tags            | T          |           | Tags to apply to an uploaded profile. Must be a list of `<key>:<value>` pairs separated by commas, such as: `layer:api,team:intake`. |
| DD_PROFILING_NATIVE_NICE        | nice            | i          |           | Sets the nice level of the profiler without affecting the instrumented processes.                                                    |
| DD_PROFILING_NATIVE_SHOW_CONFIG | show_config     | c          | no        | Whether to log profiler configuration parameters.                                                                                    |
| DD_PROFILING_NATIVE_LOG_MODE    | log_mode        | o          | stdout    | How to emit profiler logs. See the section on logging for details.                                                                   |
| DD_PROFILING_NATIVE_LOG_LEVEL   | log_level       | l          | warn      | Determines log verbosity.                                                                                                            |
| DD_PROFILING_NATIVE_TARGET_PID  | pid             | p          |           | Engages pidmode. See the section on pidmode for details.                                                                             |
| DD_PROFILING_NATIVE_GLOBAL      | global          | g          | no        | Engages globalmode. See the section on globalmode for details. Overrides --pid.                                                      |

When passing command line arguments, precede long names with two dashes and short names with a single dash. For example, `--service myservice` and `-S myservice`.

The `environment`, `service`, and `service_version` settings are recommended, as they are used by the Profiling UI.

**Note**: Parameters must be set with a value. For example, to log profiler configuration, you must either set `DD_PROFILING_NATIVE_SHOW_CONFIG=yes` or pass `--show_config yes`, rather than `--show_config` alone. For such arguments, `yes`, `true`, and `enable` may be used interchangeably to enable the setting and `no`, `false`, and `disable` may be used to disable it.

See the [full list of parameters][5] or use the command line.

```bash
ddprof --help
```

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

Global mode is intended for debug purposes. When `global` is set to `yes`, the profiler attempts to profile all the visible processes. 
This requires elevated permissions (for example, running as root or granting `CAP_PERFMON`, `CAP_SYSADMIN`) or setting `perf_event_paranoid` to `-1`.

```bash
./ddprof --environment staging --global yes --service_version full-host-profile
```

When the profiler is run as the root user, all visible processes are instrumented.
For most configurations, this consists of all processes visible within the profiler's PID namespace.

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /profiler/profiler_troubleshooting
[2]: https://github.com/DataDog/ddprof/releases
[3]: https://app.datadoghq.com/profiling
[4]: /getting_started/tagging/unified_service_tagging
[5]: https://github.com/DataDog/ddprof/blob/v0.10.1/docs/Commands.md
[6]: /getting_started/profiler/
