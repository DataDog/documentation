The Google Cloud integration provides two independent collection paths. Each is configured separately. Set up the ones you need.

**Metrics**: Datadog pulls metrics from the Google Cloud Monitoring API after the integration is configured. The integration ingests metrics from the [Google Cloud metric catalog][101]. Start with [Metric collection][102].

**Logs**: Cloud Logging sends logs through Cloud Pub/Sub and Cloud Dataflow to Datadog Log Management. Log collection runs as a separate pipeline from metrics. Start with the [Google Cloud log forwarding guide][103]. For details on the log forwarding architecture, see [Stream cloud logs to Datadog][104] in the Google Cloud Architecture Center.

[101]: https://cloud.google.com/monitoring/api/metrics_gcp
[102]: #metric-collection
[103]: /logs/guide/google-cloud-log-forwarding/
[104]: https://docs.cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
