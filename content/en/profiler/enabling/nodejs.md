---
title: Enabling the Node.js Profiler
code_lang: nodejs
type: multi-code-lang
code_lang_weight: 50
further_reading:
    - link: 'getting_started/profiler'
      tag: 'Documentation'
      text: 'Getting Started with Profiler'
    - link: 'profiler/profile_visualizations'
      tag: 'Documentation'
      text: 'Learn more about available profile visualizations'
    - link: 'profiler/profiler_troubleshooting'
      tag: 'Documentation'
      text: 'Fix problems you encounter while using the profiler'
aliases:
  - /tracing/profiler/enabling/nodejs/
---

The profiler is shipped within Datadog tracing libraries. If you are already using [APM to collect traces][1] for your application, you can skip installing the library and go directly to enabling the profiler.

## Requirements

For a summary of the minimum and recommended runtime and tracer versions across all languages, read [Supported Language and Tracer Versions][7].

The Datadog Profiler requires at least Node.js 18.

Continuous Profiler support is in Preview for some serverless platforms, such as [AWS Lambda][8].

Continuous Profiler support is in Preview for Google Cloud Run.

## Installation

To begin profiling applications:

1. Ensure Datadog Agent v6+ is installed and running. Datadog recommends using [Datadog Agent v7+][2].

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

**Note**: If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, ensure the tracer and the profiler are loaded together:

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

**Note**: If you're already using Datadog APM, you are already calling `init` and don't need to do so again. If you are not, ensure the tracer and the profiler are loaded together:

```node
const tracer = require('dd-trace/init')
```

{{% /tab %}}
{{< /tabs >}}

4. Optional: Set up [Source Code Integration][4] to connect your profiling data with your Git repositories.

5. A minute or two after starting your Node.js application, your profiles will appear on the [APM > Profiler page][5]. If they do not, refer to the [Troubleshooting][9] guide.

## Not sure what to do next?

The [Getting Started with Profiler][6] guide takes a sample service with a performance problem and shows you how to use Continuous Profiler to understand and fix the problem.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://app.datadoghq.com/account/settings/agent/latest?platform=overview
[3]: https://app.datadoghq.com/account/settings/agent/6?platform=overview
[4]: /integrations/guide/source-code-integration/?tab=nodejs
[5]: https://app.datadoghq.com/profiling
[6]: /getting_started/profiler/
[7]: /profiler/enabling/supported_versions/
[8]: /serverless/aws_lambda/profiling/
[9]: /profiler/profiler_troubleshooting/nodejs/
