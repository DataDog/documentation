When using the Datadog SDK with OTel API support, telemetry is transmitted through different protocols depending on the signal source. Ensure the following ports are accessible on your Datadog Agent or Collector:

| Signal Source | Protocol | Port | Destination Component |
|---------------|----------|------|----------------------|
| OTel Metrics and Logs API | OTLP (gRPC/HTTP) | 4317 / 4318 | Datadog Agent OTLP Receiver or DDOT Collector |
| Datadog Tracing | Datadog trace intake | 8126 (TCP) | Datadog Trace Agent |
| Runtime Metrics | DogStatsD | 8125 (UDP) | DogStatsD Server |
