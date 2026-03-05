## Limitations

Auto-instrumentation for this server has the following limitations. If your use case requires more control, use [client-side instrumentation][101] instead.

- This instrumentation method **does not support [advanced RUM configurations][102]**.
- If your web server is acting as a proxy and the upstream server uses **end-to-end encryption (TLS)** or **content compression** (gzip, zstd, Brotli), the RUM Browser SDK **cannot be injected**. To ensure proper instrumentation:
  - **Disable content compression** on the upstream server.
  - **Enable TLS origination** on the web server.

[101]: /real_user_monitoring/application_monitoring/browser/setup/client
[102]: /real_user_monitoring/application_monitoring/browser/advanced_configuration/
