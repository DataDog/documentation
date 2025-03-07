
## Limitations

Keep in mind the following limitations when using this setup:

- This instrumentation method **does not support [advanced RUM configurations][1]**, except for `allowedTracingUrls` and `excludedActivityUrls`.
- If your web server is acting as a proxy and the upstream server uses **end-to-end encryption (TLS)** or **content compression** (gzip, zstd, Brotli), the RUM Browser SDK may **not be injected**. To ensure proper instrumentation:
  - **Disable content compression** on the upstream server.
  - **Enable TLS origination** on the web server.

## Prerequisites

The [Datadog Agent][2] is required. Make sure you already have installed and configured the Agent.