The Datadog Tracer implements the [OpenTelemetry][101] standard, and Datadog recommends using it as an interface for tracing your application because it's vendor-neutral, supports many languages and frameworks, and unifies traces, metrics, and logs under one standard. See instructions on [setting up OpenTelemetry integration with the SDK][103]. 

**Note:** The OpenTelemetry specification library requires [desugaring][102] to be enabled for projects with a `minSdk` < `26`. If you cannot enable desugaring in your project, you can still use the Trace product with the Datadog API instead.

**Note**: The *Datadog API* implementation helps you transition from OpenTracing to OpenTelemetry.

[101]: /tracing/trace_collection/custom_instrumentation/android/otel
[102]: https://github.com/open-telemetry/opentelemetry-java?tab=readme-ov-file#requirements
[103]: /tracing/trace_collection/custom_instrumentation/android/otel/?tab=kotlin
