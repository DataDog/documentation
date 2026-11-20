Allow traffic to the ports used by the configured export path:

| Export path | Protocol | Default port | Destination |
|-------------|----------|--------------|-------------|
| Traces, metrics, and logs exported over OTLP | OTLP (gRPC/HTTP) | 4317 / 4318 | Datadog Agent OTLP receiver or DDOT Collector |
| Traces exported in Datadog format | Datadog trace intake | 8126 (TCP) | Datadog Trace Agent |
| Runtime metrics exported through DogStatsD | DogStatsD | 8125 (UDP) | DogStatsD server |

If the OTLP receiver uses a different port, allow traffic to that port instead.
