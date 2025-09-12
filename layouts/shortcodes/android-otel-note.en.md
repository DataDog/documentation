The Datadog Tracer implements the [OpenTelemetry][1] standard, and we recommend using it as an interface for tracing your application because it's vendor-neutral, supports many languages and frameworks, and unifies traces, metrics, and logs under one standard. See [this][3] page for instructions on setting up OpenTelemetry integration with the SDK. However, the OpenTelemetry specification library **[requires desugaring][2]** to be enabled for projects with a `minSdk` < `26`. If this requirement cannot be met in your project, you can still use the Trace product with the Datadog API.

**Note**: The *Datadog API* implementation helps you transition from OpenTracing to OpenTelemetry. However, it may be removed in future releases of the SDK.

[1]: /tracing/trace_collection/custom_instrumentation/android/otel
[2]: https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#requirements
[3]: /tracing/trace_collection/custom_instrumentation/android/otel/?tab=kotlin
