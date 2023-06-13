---
title: Troubleshooting the Native Profiler for Compiled Languages
kind: Documentation
code_lang: ddprof
type: multi-code-lang
code_lang_weight: 90
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

<div class="alert alert-warning">
<code>ddprof</code> is in beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [verbose logging][1] and [open a support ticket][2] with log files and the following information:

- Linux kernel version (`uname -r`)
- libc version (`ldd --version`)
- Value of `/proc/sys/kernel/perf_event_paranoid`
- Complete command line, including both profiler and application arguments

If you prefer, you can also troubleshoot the problem by enabling verbose logs and reviewing the sections below.

### "\<ERROR\> Error calling perfopen on watcher"

This error typically occurs when you do not have sufficient permission to engage the profiler. The most common reason for this is that required operating system features have been disabled, which causes profiling to fail. This is typically a host-level configuration, which cannot be set at the level of an individual pod or container.

Setting `perf_event_paranoid` so that it persists across restarts depends on your distribution. As a diagnostic step, try the following:

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid

```

**Note**: This must be executed from a mount namespace in which the `/proc/sys/kernel/perf_event_paranoid` object exists and is writable. Within a container, this setting is inherited from the host.

There are two capabilities you can use to override the value of `perf_event_paranoid`:
- `CAP_SYS_ADMIN`: adds many permissions and thus may be discouraged
- `CAP_PERFMON`: adds BPF and `perf_event_open` capabilities (available on Linux v5.8 or later)

There are a few less common permissions issues:
- The profiler is not always able to instrument processes that change their UID on startup. This is common for many webservers and databases.
- The profiler relies upon the `perf_event_open()` syscall, which is disallowed by some container runtimes. Check the appropriate documentation to see whether this might be the case.
- Some seccomp profiles forbid `perf_event_open()`. If your system runs such a configuration, you may not be able to run the profiler.

### "\<WARNING\> Could not finalize watcher"

You can encounter this warning when the system is unable to allocate sufficient locked memory for the profiler. This most commonly happens when too many instances of the profiler are active on a given host, as when many containerized services are instrumented individually on the same host. You can resolve this by increasing the `mlock()` memory limit or decreasing the number of instrumented applications.

Other profiling tools may contribute to the same limit.

### "\<WARNING\> Failure to establish connection"

This error usually means that the profiler is unable to connect to the Datadog Agent. Enable [configuration logging][3] to identify the hostname and port number used by the profiler for uploads. Additionally, the content of the error message may relay the hostname and port used. Compare these values to your Agent configuration. See [Enabling the profiler][4] for details on profiler input parameters and default values.

## Profiles are empty or sparse

Your profiles may be empty ("No CPU time reported") or contain few frames. Sometimes this is caused when applications have poor symbolization information. This may also be expected--the profiler activates only when the instrumented application is scheduled on the CPU, and applications may be predominately off-CPU for many reasons, such as low user load or high application wait time.

The root of your profile is the frame annotated with the application name in parentheses. If this frame shows a significant amount of CPU time, but no child frames, your application may have poor profiling fidelity. Consider the following:
- Stripped binaries do not have symbols available. Try using a non-stripped binary or a non-minified container image.
- Certain applications and libraries benefit from their debug packages being installed. This is true for services installed through your repo's package manager or similar.

## Error while loading shared libraries

When using the Continuous Profiler for compiled languages as a dynamic library, your application may fail to launch with the following error:

```
error while loading shared libraries: libdd_profiling.so: cannot open shared object file: No such file or directory
```

This happens when your application is built with `libdd_profiling.so` as a dependency, but it cannot be found at runtime during dependency reconciliation. You can fix this by doing one of the following:

- Rebuild your application using the static library. In some build systems the choice between dynamic and static libraries can be ambiguous, so use `ldd` to check whether the resulting binary includes an unwanted dynamic dependency on `libdd_profiling.so`.
- Copy `libdd_profiling.so` to one of the directories in the search path for the dynamic linker. You can get a list of these directories by running `ld --verbose | grep SEARCH_DIR | tr -s ' ;' \\n` on most Linux systems.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: /profiler/enabling/ddprof/?tab=environmentvariables#configuration
[4]: /profiler/enabling/ddprof/