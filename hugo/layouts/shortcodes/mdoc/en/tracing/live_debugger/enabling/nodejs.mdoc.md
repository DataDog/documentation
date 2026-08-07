<!--
Live Debugger Node.js enablement — included when prog_lang is node_js.
-->

You can enable Live Debugger in-app in one of two ways:

- On the [Live Debugger Settings page][1], enable the service and environment.
- Start a Debug Session. Live Debugger is enabled automatically on the selected service and environment.

Either option requires Datadog Node.js SDK version 5.84.0 or higher.

If your SDK version is lower, or you prefer to configure Live Debugger with environment variables, use the following manual configuration.

**SDK version**: [Datadog Node.js SDK (`dd-trace-js`)][2] version 5.109.0 or higher is strongly recommended. The minimum SDK version is 5.39.0, but it may result in unexpected errors and a degraded experience. If your source code is transpiled or bundled (for example, TypeScript, Babel, or Webpack), publish source maps with the deployed application so that logpoints map to the correct lines.

Start your service with the following environment variables set:

```shell
DD_SERVICE=<YOUR_SERVICE>
DD_ENV=<YOUR_ENV>
DD_VERSION=<YOUR_VERSION>
DD_DYNAMIC_INSTRUMENTATION_ENABLED=true
```

[1]: https://app.datadoghq.com/debugging/settings
[2]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/nodejs/
