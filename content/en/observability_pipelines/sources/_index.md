---
title: Sources
disable_toc: false
further_reading:
- link: "/observability_pipelines/configuration/set_up_pipelines/"
  tag: "Documentation"
  text: "Set up pipelines"
- link: "/observability_pipelines/processors/"
  tag: "Documentation"
  text: "Processors for your pipelines"
- link: "/observability_pipelines/destinations/"
  tag: "Documentation"
  text: "Observability Pipelines destinations"
---

## Overview

Use Observability Pipelines' sources to receive logs or metrics ({{< tooltip glossary="preview" case="title" >}}) from different data sources. Sources have different prerequisites and settings. Some sources also need to be configured to send data to the Observability Pipelines Worker.

Select a source in the left navigation menu to see more information about it.

## Sources

These are the available sources:

{{< tabs >}}
{{% tab "Logs" %}}

- [Amazon Data Firehose][1]
- [Amazon S3][2]
- [Azure Event Hubs][3]
- [Datadog Agent][4]
- [Filebeat][5]
- [Fluentd and Fluent Bit][6]
- [Google Pub/Sub][7]
- [HTTP Client][8]
- [HTTP Server][9]
- [Kafka][10]
- [Lambda Extension][11]
- [Lambda Forwarder][12]
- [Logstash][13]
- [OpenTelemetry][14]
- [Socket][15]
- [Splunk HTTP Event Collector (HEC)][16]
- [Splunk Heavy or Universal Forwarders (TCP)][17]
- [Sumo Logic Hosted Collector][18]
- [Syslog][19]

[1]: /observability_pipelines/sources/amazon_data_firehose/
[2]: /observability_pipelines/sources/amazon_s3/
[3]: /observability_pipelines/sources/azure_event_hubs/
[4]: /observability_pipelines/sources/datadog_agent/
[5]: /observability_pipelines/sources/filebeat/
[6]: /observability_pipelines/sources/fluent/
[7]: /observability_pipelines/sources/google_pubsub/
[8]: /observability_pipelines/sources/http_client/
[9]: /observability_pipelines/sources/http_server/
[10]: /observability_pipelines/sources/kafka/
[11]: /observability_pipelines/sources/lambda_extension/
[12]: /observability_pipelines/sources/lambda_forwarder/
[13]: /observability_pipelines/sources/logstash/
[14]: /observability_pipelines/sources/opentelemetry/
[15]: /observability_pipelines/sources/socket/
[16]: /observability_pipelines/sources/splunk_hec/
[17]: /observability_pipelines/sources/splunk_tcp/
[18]: /observability_pipelines/sources/sumo_logic/
[19]: /observability_pipelines/sources/syslog/

{{% /tab %}}
{{% tab "Metrics" %}}

- [Datadog Agent][1]

[1]: /observability_pipelines/sources/datadog_agent/

{{% /tab %}}
{{% tab "Rehydration" %}}

- [Amazon S3][1]
- [Azure Storage][2]

[1]: /observability_pipelines/sources/amazon_s3/
[2]: /observability_pipelines/sources/azure_storage/

{{% /tab %}}
{{< /tabs >}}

## Standard metadata fields

All sources add the following standard metadata fields to ingested events:

| Field name     | Value type     | Example                      |
| -------------- | -------------- | ---------------------------- |
| `hostname`     | String         | `"ip-34-2-553.us.test"`      |
| `timestamp`    | String         | `"2024-06-17T22:25:55.439Z"` |
| `source_type`  | String         | `"splunk_tcp"`               |

For example, if this is the raw event:

```
{
  "foo": "bar"
}
```

Then the enriched event with the standard metadata fields is:

```
{
  "foo": "bar",
  "hostname": "ip-34-2-553.us.test",
  "timestamp": "2024-06-17T22:25:55.439Z",
  "source_type": "splunk_tcp"
}
```

You can see these standard metadata fields when you use the [`tap` command][2] to see the events sent through the source.

After events are ingested by the source, they get sent to different processors and destinations that might update those fields. For example, if the event is sent to the Datadog Logs destination, the timestamp field gets converted to UNIX format.

**Note**: The `bytes in per second` metric in the UI is for ingested raw events, not enriched events.

## TLS certificates

Enable TLS for Observability Pipelines to ensure that data are encrypted during transit. This prevents attackers from tampering with your data.

Observability Pipelines does not accept self-signed certificates by default because they do not provide secure trust verification and can potentially expose your environment to man-in-the-middle attacks.

To check if your certificate is self-signed, run this command:

```
openssl verify -CAfile certificate.pem certificate.pem
```

If the certificate is self-signed and verifies against itself, the output is:

```
certificate.pem: OK
```

Otherwise, you see the error `unable to get local issuer certificate`.

Instead of using a self-signed certificate, Datadog recommends the following:

1. Use a certificate signed by Certificate Authority (CA).
2. If you cannot use a CA-signed certificate, use a certificate from [Let's Encrypt][3].

If you must use a self-signed certificate because the above approaches are not possible, you can configure your environment to trust the self-signed certificate on the Observability Pipelines Worker host.

<div class="alert alert-warning">Datadog does not recommend self-signed certificates. They are less secure and are not appropriate for production or internet-facing use. If you must use self-signed certificates, limit usage to internal testing only.</a></div>

For the Worker host to trust the self-signed certificate:

- On Linux hosts, install the certificate in the OS trust store.
- In Kubernetes, you can either:
    - Build a custom container image that includes the certificate.
    - Mount the certificate and update the container's trust store manually.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#use-tap-to-see-your-data
[3]: https://letsencrypt.org/

