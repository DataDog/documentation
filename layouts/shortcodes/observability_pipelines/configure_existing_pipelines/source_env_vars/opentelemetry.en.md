You must provide both HTTP and gRPC endpoints. Configure your OTLP exporters to point to one of these endpoints. See [Send logs to the Observability Pipelines Worker][10230] for more information.

- HTTP listener address
	- The Observability Pipelines Worker listens to this socket address to receive logs from the OTel collector.
    - Stored in the environment variable `DD_OP_SOURCE_OTEL_HTTP_ADDRESS`.

- gRPC listener address
	- The Observability Pipelines Worker listens to this socket address to receive logs from the OTel collector.
    - Stored in the environment variable `DD_OP_SOURCE_OTEL_GRPC_ADDRESS`.

If TLS is enabled:

- OpenTelemetry TLS passphrase
    - Stored in the environment variable `DD_OP_SOURCE_OTEL_KEY_PASS`.

[10230]: /observability_pipelines/sources/opentelemetry/#send-logs-to-the-observability-pipelines-worker