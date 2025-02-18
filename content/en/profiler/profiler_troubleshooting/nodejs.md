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

## Profiler fails to load native component

The profiler might fail to find and load its native component. In this situation, your application logs or console display an error message similar to:

```
Error: No native build was found for runtime=node abi=109 platform=linuxglibc arch=x64
```

If you are using a bundler such as esbuild or webpack, which is used by frameworks such as Next.js, see [Bundling with the Node.js tracer][3]. The Datadog tracer and profiler have special requirements when used with bundlers.

Node versions available through package managers may sometimes incorrectly report their ABI (Application Binary Interface) version. For example, Ubuntu Linux 24.04.01 LTS includes a Node 18 package that incorrectly reports its ABI version as 109, instead of the correct version, 108, for Node 18. 

The profiler ships with prebuilt binaries for all supported combinations of platforms, CPU architectures, and Node ABI versions in `node_modules/@datadog/pprof/prebuilds/${platform}-${arch}/node-${abi}.node` files. If your Node version reports an incompatible ABI version, there won't be a prebuilt binary available, causing the profiler to fail to start. 

To resolve this issue, download and install Node from the [Node.js website][4] instead of using your operating system's package manager, or
update your operating system to a newer version that might include an updated version of Node.js without this issue.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/troubleshooting/#tracer-debug-logs
[2]: /help/
[3]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/#bundling
[4]: https://nodejs.org/
