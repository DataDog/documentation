---
title: [Go] Save 2 to 14% CPU in production with PGO
kind: guide
further_reading:
- link: "/profiler"
  tag: "Documentation"
  text: "Datadog Continuous Profiler"
- link: "/profiler/compare_profiles/"
  tag: "Documentation"
  text: "Comparing Profiles"
---

## Overview

Starting [Go 1.21][1], the Go compiler supports Profile-Guided Optimization (PGO).

PGO enables additional optimizations on code identified as hot by CPU profiles of production workloads. This is compatible with [Datadog Go Continuous Profiler][2] and can be used for production builds.

## How does it work?

PGO is described in great detail at https://go.dev/doc/pgo, but here are some highlights:

- Building a Go program causes the compiler to look for a pprof CPU profile called default.pgo and use it to produce a more optimized binary.
- Typical programs should see a 2-14% decrease in CPU time after optimization. PGO remains under active development and future versions of Go hope to achieve even more CPU savings. Datadog is [actively supporting the initiative][3].
- PGO will produce the best results when using representative profiles. But using non-representative or old profiles (from previous versions of the software) is not expected to produce slower binaries than not using PGO.
- Using a profile from a PGO optimized application is not expected to cause optimization/deoptimization cycles. This is referred to as iterative stability.

## How to enable it?

PGO is a standard Go compiler option that you can use by manually downloading profiles from Datadog. We built a tool to help you do it on all services, with the latest and most representative profiles.

<div class="alert alert-warning">This tool is in public beta.</div>

See [datadog-pgo GitHub repository][4] for more details:

1. Create a dedicated API key and unscoped Application key for PGO as described in the [documentation][5].
2. Set `DD_API_KEY`, `DD_APP_KEY` and `DD_SITE` via the environment secret mechanism of your CI provider.
3. Run `datadog-pgo` before your build step. E.g. for a service `foo` that runs in `prod` and has its main package in `./cmd/foo`, you should add this step:

```
go run github.com/DataDog/datadog-pgo@latest 'service:foo env:prod' ./cmd/foo/default.pgo
```

That's it. The go toolchain will automatically pick up any `default.pgo` file in the main package, so there is no need to modify your `go build` step.

[1]: https://tip.golang.org/doc/go1.21
[2]: /profiler/enabling/go
[3]: https://github.com/golang/go/issues/65532
[4]: https://github.com/DataDog/datadog-pgo?tab=readme-ov-file#getting-started
[5]: /account_management/api-app-keys

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
