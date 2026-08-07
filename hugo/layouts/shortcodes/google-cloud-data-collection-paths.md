The Google Cloud integration provides three independent collection paths. Each is configured separately. Set up the ones you need.

**Metrics**: Datadog pulls metrics from the Google Cloud Monitoring API after the integration is configured. The integration ingests metrics from the [Google Cloud metric catalog][1]. Start with [Metric collection][2].

**Logs**: Cloud Logging sends logs through Cloud Pub/Sub and Cloud Dataflow to Datadog Log Management. Log collection runs as a separate pipeline from metrics. Start with the [Google Cloud log forwarding guide][3]. For details on the log forwarding architecture, see [Stream cloud logs to Datadog][4] in the Google Cloud Architecture Center.

[1]: https://cloud.google.com/monitoring/api/metrics_gcp
[2]: #metric-collection
[3]: /logs/guide/google-cloud-log-forwarding/
[4]: https://docs.cloud.google.com/architecture/partners/stream-cloud-logs-to-datadog
