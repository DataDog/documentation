The Datadog Tracer implements the [OpenTelemetry][1] standard, and Datadog recommends using it as an interface for tracing your application because it's vendor-neutral, supports many languages and frameworks, and unifies traces, metrics, and logs under one standard. See instructions on [setting up OpenTelemetry integration with the SDK][3]. 

**Note:** The OpenTelemetry specification library requires [desugaring][2] to be enabled for projects with a `minSdk` < `26`. If you cannot enable desugaring in your project, you can still use the Trace product with the Datadog API instead.

**Note**: The *Datadog API* implementation helps you transition from OpenTracing to OpenTelemetry.

[1]: /tracing/trace_collection/custom_instrumentation/android/otel
[2]: https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#requirements
[3]: /tracing/trace_collection/custom_instrumentation/android/otel/?tab=kotlin
