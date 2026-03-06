---
title: Instrument Unsupported Runtimes with OpenTelemetry
further_reading:
- link: /opentelemetry/compatibility/
  tag: "Documentation"
  text: "Datadog and OpenTelemetry Compatibility"
- link: /opentelemetry/setup/ddot_collector/custom_components
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components"
- link: /opentelemetry/instrument/
  tag: "Documentation"
  text: "Instrument Your Application with OpenTelemetry"
---

## Overview

If your application's runtime isn't natively supported by a [Datadog SDK][1], you can use the OpenTelemetry SDK to send telemetry to Datadog. This approach gives you traces and metrics without waiting for native runtime support.

This guide walks through instrumenting a [Bun][2] application as an example. Bun is compatible with most Node.js APIs, so you can use the [OpenTelemetry Node.js SDK][3] to instrument Bun applications. You can apply the same pattern to other unsupported runtimes with OpenTelemetry SDK compatibility.

## Support level

<div class="alert alert-info">
This guide falls under the <strong>Custom Components</strong> <a href="/opentelemetry/setup/ddot_collector#support-levels">support level</a>. Datadog provides this documentation as a starting point, but does not directly support the runtime's functionality or the OpenTelemetry SDK's behavior within it. For runtime-specific issues, engage with the <a href="https://opentelemetry.io/community/">OpenTelemetry community</a> or the runtime maintainers.
</div>

## Prerequisites

- An OpenTelemetry-compatible backend configured to send data to Datadog. See [Send OpenTelemetry Data to Datadog][4] for setup options including the DDOT Collector, OSS Collector with Datadog Exporter, or direct OTLP ingest.
- [Bun][2] installed (v1.0 or later).
- A Bun application you want to instrument.

## Instrument a Bun application

### Install OpenTelemetry packages

From your project's root directory, install the required OpenTelemetry packages:

```shell
bun add @opentelemetry/api \
  @opentelemetry/sdk-node \
  @opentelemetry/sdk-metrics \
  @opentelemetry/auto-instrumentations-node \
  @opentelemetry/exporter-trace-otlp-http \
  @opentelemetry/exporter-metrics-otlp-http \
  @opentelemetry/resources \
  @opentelemetry/semantic-conventions
```

### Create a telemetry initialization module

In Node.js, OpenTelemetry typically loads through the `--require` flag, which preloads instrumentation before your application code runs. Bun's module resolution system works differently, so you need to initialize OpenTelemetry programmatically instead.

Create a `tracing.ts` file that configures the OpenTelemetry Node.js SDK:

{{< code-block lang="typescript" filename="tracing.ts" >}}
import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { OTLPMetricExporter } from '@opentelemetry/exporter-metrics-otlp-http';
import { PeriodicExportingMetricReader } from '@opentelemetry/sdk-metrics';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';

const resource = resourceFromAttributes({
  [ATTR_SERVICE_NAME]: process.env.OTEL_SERVICE_NAME || '<YOUR_SERVICE_NAME>',
  [ATTR_SERVICE_VERSION]: process.env.OTEL_SERVICE_VERSION || '1.0.0',
  'telemetry.sdk.runtime': 'bun',
});

const sdk = new NodeSDK({
  resource,
  traceExporter: new OTLPTraceExporter(),
  metricReaders: [new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter(),
  })],
  instrumentations: [getNodeAutoInstrumentations({
    // Disable fs instrumentation to avoid compatibility issues with Bun
    '@opentelemetry/instrumentation-fs': { enabled: false },
  })],
});

sdk.start();

process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => console.log('OpenTelemetry SDK shut down'))
    .catch((err) => console.error('Error shutting down OpenTelemetry SDK', err))
    .finally(() => process.exit(0));
});
{{< /code-block >}}

Replace `<YOUR_SERVICE_NAME>` with your application's service name.

### Initialize telemetry at your application entry point

Import the `tracing.ts` module **before** any other application imports. The OpenTelemetry SDK must initialize first to patch libraries for auto-instrumentation.

{{< code-block lang="typescript" filename="index.ts" >}}
import './tracing';

// Import your application code after tracing is initialized
import { startApp } from './app';

startApp();
{{< /code-block >}}

### Configure environment variables

Set the following environment variables to configure the OTLP exporter endpoint and your service identity:

```shell
export OTEL_EXPORTER_OTLP_ENDPOINT="http://localhost:4318"
export OTEL_SERVICE_NAME="<YOUR_SERVICE_NAME>"
```

The `OTEL_EXPORTER_OTLP_ENDPOINT` value depends on your setup:
- **Local collector** (DDOT or OSS): `http://localhost:4318` (default HTTP) or `http://localhost:4317` (gRPC)
- **Remote collector**: Use the collector's address and port

For additional configuration options, see the [OpenTelemetry environment variable specification][5].

### Run your application

Start your Bun application:

```shell
bun run index.ts
```

### Add manual instrumentation for Bun-native APIs

Built-in Bun APIs such as `Bun.serve()`, `bun:sqlite`, and the native file I/O APIs are not automatically instrumented. To capture telemetry from these APIs, create spans manually with the `@opentelemetry/api` package.

The following example wraps a `Bun.serve()` route handler with a custom span:

{{< code-block lang="typescript" filename="server.ts" >}}
import { trace, SpanKind } from '@opentelemetry/api';

const tracer = trace.getTracer('bun-app');

export function startServer() {
  Bun.serve({
    port: 3000,
    fetch(req) {
      return tracer.startActiveSpan('handleRequest', { kind: SpanKind.SERVER }, (span) => {
        try {
          span.setAttribute('http.method', req.method);
          span.setAttribute('http.url', req.url);
          return new Response('Hello from Bun!');
        } finally {
          span.end();
        }
      });
    },
  });
}
{{< /code-block >}}

For more manual instrumentation patterns, see the [OpenTelemetry JS instrumentation docs][7].

### Verify traces in Datadog

After your application handles a few requests:

1. Go to [**APM** > **Traces**][6] in Datadog.
2. Search for your service name.
3. Confirm that traces appear with the expected spans and metadata.

## Limitations

- **Auto-instrumentation coverage**: The OpenTelemetry Node.js auto-instrumentation libraries depend on Bun's Node.js compatibility layer. Most common libraries (HTTP clients, Express, database drivers) work, but some instrumentation packages may not function as expected.
- **Bun-native APIs**: Built-in Bun APIs such as `Bun.serve()`, `bun:sqlite`, and the native file I/O APIs are not automatically instrumented. See [Add manual instrumentation for Bun-native APIs](#add-manual-instrumentation-for-bun-native-apis) for an example.
- **Library compatibility**: Not all Node.js instrumentation libraries are guaranteed to work with Bun. Test your specific dependencies and disable any instrumentations that cause errors by passing configuration options to `getNodeAutoInstrumentations()`. The `@opentelemetry/instrumentation-fs` package is a common source of issues and is disabled in the example configuration above.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /tracing/trace_collection/
[2]: https://bun.com/docs/installation
[3]: https://opentelemetry.io/docs/languages/js/getting-started/nodejs/
[4]: /opentelemetry/setup/
[5]: https://opentelemetry.io/docs/specs/otel/configuration/sdk-environment-variables/
[6]: https://app.datadoghq.com/apm/traces
[7]: https://opentelemetry.io/docs/languages/js/instrumentation/
