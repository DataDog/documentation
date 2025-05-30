### Monitoring Azure Service Bus

Setting up Data Streams Monitoring for Azure Service Bus applications requires additional configuration for the instrumented application.

1. Either set the environment variable `AZURE_EXPERIMENTAL_ENABLE_ACTIVITY_SOURCE` to `true`, or in your application code set the `Azure.Experimental.EnableActivitySource` context switch to `true`. This instructs the Azure Service Bus library to generate tracing information. See [Azure SDK documentation][1] for more details.
2. Set the `DD_TRACE_OTEL_ENABLED` environment variable to `true`. This instructs the .NET auto-instrumentation to listen to the tracing information generated by the Azure Service Bus Library and enables the inject and extract operations required for Data Streams Monitoring.

[1]: https://github.com/Azure/azure-sdk-for-net/blob/main/sdk/core/Azure.Core/samples/Diagnostics.md#enabling-experimental-tracing-features