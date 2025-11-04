The Datadog SDK automatically populates OTel resource attributes (like service.name, deployment.environment.name, and service.version) using standard Datadog environment variables.

If both Datadog and OpenTelemetry variables are set for the same setting, the Datadog-defined configuration takes precedence.

For example:

- `DD_SERVICE` overrides `OTEL_RESOURCE_ATTRIBUTES="service.name=..."`.
- `DD_ENV` overrides `OTEL_RESOURCE_ATTRIBUTES="deployment.environment.name=..."`.
- `DD_VERSION` overrides `OTEL_RESOURCE_ATTRIBUTES="service.version=..."`.