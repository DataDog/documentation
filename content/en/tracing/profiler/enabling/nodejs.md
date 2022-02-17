---
title: Enabling the Node.js Profiler
kind: Documentation
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'tracing/profiler/search_profiles'
      tag: 'Documentation'
      text: 'Learn more about available profile types'
    - link: 'tracing/profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
---

<div class="alert alert-warning">
Datadog Node.js Profiler is currently in public beta. Datadog recommends evaluating the profiler in a non-sensitive environment before deploying in production.
</div>

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

The Datadog Profiler requires at least Node.js 12, but Node.js 16 or higher is recommended. **If you use a version of Node.js earlier than 16, some applications see tail latency spikes every minute when starting the next profile.**

Profiling is not supported on serverless platforms.

## Installation

To begin profiling applications:

1. If you are already using Datadog, upgrade your Agent to version [7.20.2][2]+ or [6.20.2][3]+.

2. Run `npm install --save dd-trace@latest` to add a dependency on the `dd-trace` module which includes the profiler.

3. Enable the profiler:

   {{< tabs >}}
{{% tab "Environment variables" %}}

```shell
export DD_PROFILING_ENABLED=true
export DD_ENV=prod
export DD_SERVICE=my-web-app
export DD_VERSION=1.0.3
```

**Note**: If you’re already using Datadog APM, you are already calling `init` and don’t need to do so again. If you are not, ensure the tracer and the profiler are loaded together:

```node
node -r dd-trace/init app.js
```

{{% /tab %}}
{{% tab "In code" %}}

```js
const tracer = require('dd-trace').init({
  profiling: true,
  env: 'prod',
  service: 'my-web-app',
  version: '1.0.3'
})
```

**Note**: If you’re already using Datadog APM, you are already calling `init` and don’t need to do so again. If you are not, ensure the tracer and the profiler are loaded together:

```node
const tracer = require('dd-trace/init')
```

{{% /tab %}}
{{< /tabs >}}

4. A minute or two after starting your Node.js application, your profiles will show up on the [APM > Profiler page][4].

## Not sure what to do next?

The [Getting Started with Profiler][5] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Experiencing high overhead?

Node.js 16 or higher is recommended. On earlier versions, some applications see tail latency spikes every minute while starting the next profile.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/setup_overview/
[2]: https://app.datadoghq.com/account/settings#agent/overview
[3]: https://app.datadoghq.com/account/settings?agent_version=6#agent
[4]: https://app.datadoghq.com/profiling
[5]: /getting_started/profiler/
