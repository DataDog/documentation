<!--
C/C++/Rust (ddprof) profiler setup — self-contained.
Includes its own Requirements, Installation, and Configuration sections.
-->

{% alert level="danger" %}
`ddprof` is in Preview. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
{% /alert %}

The native profiler for compiled languages (`ddprof`) uses OS level APIs to collect profiling data. It is ideally suited for applications written in compiled languages, such as C, C++, or Rust.
Profiles sent from `ddprof` show up under the _native_ runtime in the Datadog web app.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][1].

Supported operating systems
: Linux (glibc or musl)

Supported architecture
: `amd64` or `arm64` processors

Serverless
: `ddprof` is not supported on serverless platforms, such as AWS Lambda.

OS Settings
: `perf_event_paranoid` kernel setting is 2 or less (see [Troubleshooting][2])

Debugging information
: Symbols should be available. The profiler cannot provide human-readable function names if the symbol table is stripped.

## Installation

### AI-assisted installation

Use the following prompt with a local AI coding agent to set up the native profiler (ddprof) for your C, C++, or Rust service. Copy and paste this prompt into your AI agent to get started.

```text
You are helping me set up Datadog Continuous Profiler (ddprof) for my native
(C, C++, or Rust) service.

First, scan my project to auto-detect as much as possible. Look for:
- CMakeLists.txt, Makefile, meson.build, or Cargo.toml to determine the
  language (C, C++, or Rust) and build system.
- Compiler flags or build configuration for debug symbols (-g, debuginfo,
  split-debuginfo) to determine if symbols will be available in production.
- Existing linker flags or dependencies referencing libdd_profiling or ddprof.
- Dockerfile, docker-compose.yml, or Kubernetes manifests for the base
  image (check architecture: amd64 or arm64, glibc or musl), startup
  command, and existing Datadog Agent configuration.
- systemd service files or init scripts for how the application is launched.
- Existing environment variables or .env files referencing DD_SERVICE,
  DD_ENV, or DD_VERSION.

Present a summary of what you detected, then ask ONLY about what you could
not determine:
- DD_SERVICE, DD_ENV, and DD_VERSION values (if not already set).
- Datadog Agent deployment method (if no Agent config found in the project).
- Whether to use ddprof as a standalone wrapper or linked library
  (if no existing ddprof usage was detected).
- Anything ambiguous from the project files.

Generate the setup steps tailored to what you found:

For standalone mode:
- Download the latest ddprof release for the detected architecture.
- Wrap the application command: ./ddprof myapp --arg1 --arg2
- Set DD_ENV, DD_SERVICE, and DD_VERSION as environment variables
  or as --environment, --service, --service_version flags.
- If using exec to launch the app, wrap it as: exec ./ddprof myapp --arg1

For library mode:
- Download ddprof with library support (v0.8.0+).
- Include dd_profiling.h and call ddprof_start_profiling() early in main().
- Link against libdd_profiling and set LD_LIBRARY_PATH or install the .so
  to a system library search path.
- Show a complete compilation command.

If debug symbols appear to be stripped, warn that function names in profiles
will not be human-readable and recommend keeping symbols.
Remind me that perf_event_paranoid must be 2 or less.

Reference: https://docs.datadoghq.com/profiler/enabling/?code-lang=c
```


The profiler can be used either as a standalone executable or as a library. Skip to [library installation instructions](#library) if you want to use it as a library.

### Standalone

1. Download the latest [`ddprof` release][3]. For example, here is one way to pull the latest release for an `amd64` (also known as `x86_64`) platform:

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz
   mv ddprof/bin/ddprof INSTALLATION_TARGET
   ```

   Where `INSTALLATION_TARGET` specifies the location you'd like to store the `ddprof` binary. The examples that follow assume `INSTALLATION_TARGET` is set to `./ddprof`.

   Use `arm64` instead of `amd64` for `aarch64` platform.

2. Modify your service invocation to include the profiler. Your usual command is passed as the last arguments to the `ddprof` executable.

   {% tabs %}

   {% tab label="Environment variables" %}
   ```bash
   export DD_ENV=prod
   export DD_SERVICE=my-web-app
   export DD_VERSION=1.0.3
   ./ddprof myapp --arg1 --arg2
   ```

   {% alert %}
   If you usually launch your application using a shell builtin, for example:

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
   {% /alert %}
   {% /tab %}

   {% tab label="Parameters" %}
   ```bash
   ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
   ```

   {% alert %}
   If you usually launch your application using a shell builtin, for example:

   ```bash
   exec myapp --arg1
   ```

   Then you must invoke `ddprof` with that builtin instead:

   ```bash
   exec ./ddprof --environment prod --service my-web-app --service_version 1.0.3 myapp --arg1 --arg2
   ```
   {% /alert %}
   {% /tab %}

   {% /tabs %}

3. A couple of minutes after you start your application, your profiles appear on the [Datadog APM > Profiler page][4]. If they do not, see the [Troubleshooting][5] guide.

### Library

The library exposes a C API.

1. Download a release of [ddprof][3] with library support (v0.8.0 or later) and extract the tarball. For example:

   ```bash
   curl -Lo ddprof-linux.tar.xz https://github.com/DataDog/ddprof/releases/latest/download/ddprof-amd64-linux.tar.xz
   tar xvf ddprof-linux.tar.xz --directory /tmp
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

The `environment`, `service`, and `service_version` settings are recommended, as they are used by the Profiling UI.

See the [full list of parameters][6] or use the command line.

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

### Global

If you want to instrument all running process, you can try out the `--global` option.
Global mode is intended for debug purposes. This requires elevated permissions. Depending on your setup, this can mean running as root, granting `CAP_PERFMON`, `CAP_SYSADMIN`, or setting `perf_event_paranoid` to `-1`.

```bash
./ddprof --environment staging --global --service_version full-host-profile
```

For most configurations, this consists of all processes visible within the profiler's PID namespace.

[1]: /profiler/enabling/supported_versions/
[2]: /profiler/profiler_troubleshooting
[3]: https://github.com/DataDog/ddprof/releases
[4]: https://app.datadoghq.com/profiling
[5]: /profiler/profiler_troubleshooting/ddprof/
[6]: https://github.com/DataDog/ddprof/blob/main/docs/Commands.md
