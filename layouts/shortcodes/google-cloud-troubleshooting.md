For common Google Cloud integration issues, see the relevant troubleshooting guide:

- **Metric appears delayed or missing**: See the [Google Cloud metric discrepancy guide][1] for symptom-scoped flows covering both missing metrics and value mismatches.
- **Partial data after configuring the integration**: Confirm the service account has the IAM roles required for the data type you expect. See the [Google Cloud integration setup][2].
- **Logs are not appearing in Datadog**: See [Monitor the Cloud Pub/Sub log forwarding][3] and [Monitor the Dataflow pipeline][4].
- **Billing or host count looks wrong**: See the [Google Cloud integration billing guide][5].

If your issue is not covered, contact [Datadog support][6].

[1]: /integrations/guide/gcp-metric-discrepancy/
[2]: /integrations/google-cloud-platform/#setup
[3]: /logs/guide/google-cloud-log-forwarding/#monitor-the-cloud-pubsub-log-forwarding
[4]: /logs/guide/google-cloud-log-forwarding/#monitor-the-dataflow-pipeline
[5]: /account_management/billing/google_cloud/
[6]: /help/
