---
title: Troubleshooting the Native Profiler for Compiled Languages
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

If you've configured the profiler and don't see profiles in the profile search page, turn on verbose logging (`-l debug`) and [open a support ticket][1]. In the support ticket, include log files along with the following information:

- Linux kernel version (`uname -r`)
- libc version (`ldd --version`)
- Value of `/proc/sys/kernel/perf_event_paranoid`
- Complete command line, including both profiler and application arguments

The section below lists potential setup issues.

### "\<ERROR\> Error calling perfopen on watcher"

This error typically occurs when you do not have sufficient permission to engage the profiler. The most common reason for this is that required operating system features have been disabled, which causes profiling to fail. This is typically a host-level configuration, which cannot be set at the level of an individual pod or container.

Setting `perf_event_paranoid` so that it persists across restarts depends on your distribution. As a diagnostic step, try the following:

```shell
echo 1 | sudo tee /proc/sys/kernel/perf_event_paranoid
```

**Note**: This must be executed from a mount namespace in which the `/proc/sys/kernel/perf_event_paranoid` object exists and is writable. Within a container, this setting is inherited from the host.

There are two capabilities you can use to override the value of `perf_event_paranoid`:
- `CAP_SYS_ADMIN`: Adds many permissions and thus may be discouraged.
- `CAP_PERFMON`: Adds BPF and `perf_event_open` capabilities (available on Linux v5.8 or later).

There are a few less common permissions issues:
- The profiler relies upon the `perf_event_open()` syscall, which is disallowed by some container runtimes. Check the appropriate documentation to see whether this might be the case.
- Some seccomp profiles forbid `perf_event_open()`. If your system runs such a configuration, you may not be able to run the profiler.

### "\<ERROR\> Could not mmap memory for watcher

The profiler requires pinned memory to operate. This type of memory is constrained by kernel settings. You can view your current setting using `ulimit -l`. The following capability can be used to bypass this limitation:
- `CAP_IPC_LOCK`: Allows the use of locked memory (memory exempt from paging).

### "\<WARNING\> Could not finalize watcher"

You can encounter this warning when the system is unable to allocate sufficient locked memory for the profiler. This most commonly happens when too many instances of the profiler are active on a given host, as when many containerized services are instrumented individually on the same host. You can resolve this by increasing the `mlock()` memory limit or decreasing the number of instrumented applications.

Other profiling tools may contribute to the same limit.

### "\<WARNING\> Failure to establish connection"

This error usually means that the profiler is unable to connect to the Datadog Agent. Enable configuration logging(`--show_config`) to identify the hostname and port number used by the profiler for uploads. Additionally, the content of the error message may relay the hostname and port used. Compare these values to your Agent configuration. Check the profiler's help section (`ddprof --help`) for further information on how to configure the Agent's URL.

## Profiles are empty or sparse

The root of your profile is the frame annotated with the application's binary.  If this frame shows a significant amount of CPU time, but no child frames, consider the following:
- Stripped binaries do not have symbols available. Try using a non-stripped binary or a non-minified container image.
- Certain applications and libraries benefit from their debug packages being installed. This is true for services installed through your repo's package manager or similar.

If you are seeing `Anonymous` where you would expect your function name, you might be using a interpreted or JITed language. Consider enabling perf maps or JIT dump information.

Your profiles may be empty ("No CPU time reported") or contain few frames. Check that your application is under some amount of load. The profiler activates only when the instrumented application is scheduled on the CPU.

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

[1]: /help/
