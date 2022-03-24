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

<div class="alert alert-warning">
The Datadog Profiler for Linux is in public beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

The Datadog Profiler for Linux lets you collect profile data for applications running on Linux. It is ideally suited for applications written in compiled languages, such as C, C++, or Rust. It can also profile services such as nginx, Redis, or Postgres, as it does not require access to source code.

## Requirements

The Datadog Profiler for Linux is compatible with Linux v4.17+ on `amd64` or `arm64` processors. It is not supported on serverless platforms, such as AWS Lambda, or on operating systems other than Linux, such as Windows, BSD, and MacOS.

## Standalone installation

The profiler can be used either as a standalone executable or as a library. Skip to [library installation instructions](#library-installation) if you want to use it as a library. Otherwise, to begin profiling applications with the standalone executable:

1. Configure the `perf_event_paranoid` kernel setting to be at most 2. On many distributions, you can check this parameter by running `cat /proc/sys/kernel/perf_event_paranoid` or `sysctl kernel.perf_event_paranoid`. You can set this value until the next reboot by running `echo 2 | sudo tee /proc/sys/kernel/perf_event_paranoid` and set it on every system startup with `sudo sysctl -w kernel.perf_event_paranoid=2`. These commands can't usually be run from a container, as the `perf_event_paranoid` setting is an operating system parameter. These commands may not work for all configurations. For alternatives, see [Troubleshooting][1].

2. Ensure you are running the Datadog Agent version [7.20.2][2]+ or [6.20.2][3]+.

3. Download the appropriate [ddprof release][4] for your Linux distribution. For example, here is one way to pull the latest release for an `amd64` platform:

   ```bash
   curl -L -O https://github.com/DataDog/ddprof/releases/download/v0.8.1/ddprof-x86_64-linux-gnu.tar.xz
   tar xvf ddprof-x86_64-linux-gnu.tar.xz
   mv ddprof/bin/ddprof INSTALLATION_TARGET
   ```

   Where `INSTALLATION_TARGET` specifies the location you'd like to store the `ddprof` binary. The examples that follow assume `INSTALLATION_TARGET` is set to `./ddprof`.

4. Modify your service invocation to include the profiler. Your usual command is passed as the last arguments to the `ddprof` executable.
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
{{% tab "In code" %}}

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


5. A minute or two after starting your application, your profiles appear on the [Datadog APM > Profiler page][5].

## Library installation

Alternatively, you can use a library instead of a standalone executable. The profiler is available as both shared and static libraries. There are a few notable similarities and differences between the library and standalone versions:

* The profiling library is available only for Linux v4.17+ on `amd64` or `arm64`.
* The profiling library has the same requirements (items 1 and 2 in the [Standalone installation](#standalone-installation) section) as the standalone executable.
* The behavior of the library is nearly identical to the standalone executable, including the sandboxing features that isolate the profiler from your application.
* The profiling library interfaces check environment variables, but they do not have other means of configuration-passing.

For generality, the library exposes a C API. Here is an example of incorporating the library into a C application:
1. Download a release of [ddprof][4] with library support (v0.8.0 or later) and extract the tarball. For example:

   ```bash
   curl -L -O https://github.com/DataDog/ddprof/releases/download/v0.8.1/ddprof-x86_64-linux-gnu.tar.xz
   tar xvf ddprof-x86_64-linux-gnu.tar.xz --directory /tmp
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
