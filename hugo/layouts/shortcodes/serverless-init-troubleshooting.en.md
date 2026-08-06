This integration depends on your runtime having a full SSL implementation. If you are using a slim image, you may need to add the following command to your Dockerfile to include certificates:

```dockerfile
RUN apt-get update && apt-get install -y ca-certificates
```

To have your {{ .Get "productNames" }} appear in the [software catalog][2001], you must set the `DD_SERVICE`, `DD_VERSION`, and `DD_ENV` environment variables.

{{ if eq (.Get "sidecar") "true" }}If you are missing logs or traces during container shutdown, specify a container start up order to make your main container depend on the sidecar container.
{{ end }}

{{ if eq (.Get "in_container") "true" }}
If you are using [request-based billing](https://docs.cloud.google.com/run/docs/container-contract#cpu) for a Google Cloud Run application instrumented in-container, very short requests may lead to dropped logs during the post-request CPU throttling. You can control the speed at which logs are sent to Datadog using the [`DD_LOGS_CONFIG_BATCH_WAIT`](https://docs.datadoghq.com/agent/logs/log_transport/?tab=https#configure-the-batch-wait-time) environment variable. Set `DD_LOGS_CONFIG_BATCH_WAIT` to a value shorter than your typical request duration to avoid dropped logs. Sidecar instrumentation also prevents this issue, as the sidecar is not affected by request-based CPU throttling.
{{ end }}
[2001]: /internal_developer_portal/software_catalog/
