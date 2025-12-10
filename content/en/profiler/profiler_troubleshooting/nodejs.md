---
title: Troubleshooting the Node.js Profiler
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 10
further_reading:
    - link: '/tracing/troubleshooting'
      tag: 'Documentation'
      text: 'APM Troubleshooting'
---

## Missing profiles in the profile search page

If you've configured the profiler and don't see profiles in the profile search page, turn on [debug mode][1] and [open a support ticket][2] with debug files and the following information:

- Operating system type and version (for example, Linux Ubuntu 20.04)
- Runtime type, version, and vendor (for example, Node.js 18.19.01)

## Profiler fails to find the native component

The profiler might fail to find its native component. In this situation, your application logs or console display an error message similar to:

```
Error: No native build was found for runtime=node abi=109 platform=linuxglibc arch=x64
```

If you are using a bundler such as esbuild or webpack, which is used by frameworks such as Next.js, see [Bundling with the Node.js tracer][3]. The Datadog tracer and profiler have special requirements when used with bundlers.

Node versions available through package managers may sometimes incorrectly report their ABI (Application Binary Interface) version. For example, Ubuntu Linux 24.04.01 LTS includes a Node 18 package that incorrectly reports its ABI version as 109, instead of the correct version, 108, for Node 18.

The profiler ships with prebuilt binaries for all supported combinations of platforms, CPU architectures, and Node ABI versions in `node_modules/@datadog/pprof/prebuilds/${platform}-${arch}/node-${abi}.node` files. If your Node version reports an incompatible ABI version, there won't be a prebuilt binary available, causing the profiler to fail to start.

To resolve this issue, download and install Node from the [Node.js website][4] instead of using your operating system's package manager, or
update your operating system to a newer version that might include an updated version of Node.js without this issue.

## Profiler fails to load the native component

The profiler might find the native component but fail to load it. If this happens, you will see an error message like the following:
```
Error: Error relocating /app/node_modules/@datadog/pprof/prebuilds/linuxmusl-x64/node-108.node: _ZSt28__throw_bad_array_new_lengthv: symbol not found
```
and further down below the stack trace:
```
code: 'ERR_DLOPEN_FAILED'
```

This issue typically occurs on Linux systems using an unsupported version of the musl C standard library, such as Alpine Linux. To resolve:

1. Ensure that you are using the latest version of the dd-trace library. 
2. If the issue persists, try upgrading musl or your Linux distribution. 

If you believe your musl version should be supported, contact [Datadog support][5].

## High event loop usage observed after enabling Nodejs profiler

When the Datadog profiler is enabled, it periodically sends a small signal to collect profiling data. If the application is idle (waiting for I/O or timers), this signal briefly wakes the event loop to take a sample, even though there's no real work to do. As a result, ELU appears higher because the loop wakes up more often, but CPU usage stays low, and no latency or extra workload is introduced.
In a busy application, these same signals occur while the loop is already active, so the effect on ELU is negligible.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/troubleshooting/tracer_debug_logs/?code-lang=nodejs#enable-debug-mode
[2]: /help/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling
[4]: https://nodejs.org/
[5]: /help
