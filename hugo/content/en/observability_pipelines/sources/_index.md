---
title: Sources
description: Learn about the sources available for the Observability Pipelines Worker.
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

Use Observability Pipelines' sources to receive logs or metrics from different data sources. Sources have different prerequisites and settings. Some sources also need to be configured to send data to the Observability Pipelines Worker.

**Notes**:
- You can add a total of 10 sources for a pipeline.
- If you add multiple sources of the same type to a pipeline, you must use [Secrets Management][4]. For example, if you add two HTTP Client sources for two different HTTP clients, you must use secret identifiers for the HTTP client endpoint URL. You cannot use the default `SOURCE_HTTP_CLIENT_ENDPOINT_URL` to store two different HTTP client URIs.

## Sources

These are the available sources:

{{< tabs >}}
{{% tab "Logs" %}}

- [Akamai DataStream][1]
- [Amazon Data Firehose][2]
- [Amazon S3][3]
- [Azure Event Hubs][4]
- [Cloudflare Logpush][5]
- [Datadog Agent][6]
- [Filebeat][7]
- [Fluentd and Fluent Bit][8]
- [Google Pub/Sub][9]
- [HTTP Client][10]
- [HTTP Server][11]
- [Kafka][12]
- [Lambda Extension][13]
- [Lambda Forwarder][14]
- [Logstash][15]
- [MySQL][16]
- [Okta][17]
- [OpenTelemetry][18]
- [Socket][19]
- [Splunk HTTP Event Collector (HEC)][20]
- [Splunk Heavy or Universal Forwarders (TCP)][21]
- [Sumo Logic Hosted Collector][22]
- [Syslog][23]
- [WebSocket][24]

[1]: /observability_pipelines/sources/akamai_datastream/
[2]: /observability_pipelines/sources/amazon_data_firehose/
[3]: /observability_pipelines/sources/amazon_s3/
[4]: /observability_pipelines/sources/azure_event_hubs/
[5]: /observability_pipelines/sources/cloudflare_logpush/
[6]: /observability_pipelines/sources/datadog_agent/
[7]: /observability_pipelines/sources/filebeat/
[8]: /observability_pipelines/sources/fluent/
[9]: /observability_pipelines/sources/google_pubsub/
[10]: /observability_pipelines/sources/http_client/
[11]: /observability_pipelines/sources/http_server/
[12]: /observability_pipelines/sources/kafka/
[13]: /observability_pipelines/sources/lambda_extension/
[14]: /observability_pipelines/sources/lambda_forwarder/
[15]: /observability_pipelines/sources/logstash/
[16]: /observability_pipelines/sources/mysql/
[17]: /observability_pipelines/sources/okta/
[18]: /observability_pipelines/sources/opentelemetry/
[19]: /observability_pipelines/sources/socket/
[20]: /observability_pipelines/sources/splunk_hec/
[21]: /observability_pipelines/sources/splunk_tcp/
[22]: /observability_pipelines/sources/sumo_logic/
[23]: /observability_pipelines/sources/syslog/
[24]: /observability_pipelines/sources/websocket/

{{% /tab %}}
{{% tab "Metrics" %}}

- [Datadog Agent][1]
- [OpenTelemetry][2]
- [Prometheus][25]

[1]: /observability_pipelines/sources/datadog_agent/
[2]: /observability_pipelines/sources/opentelemetry/
[25]: /observability_pipelines/sources/prometheus/

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

## Client identity allowlists

With mutual TLS (mTLS), the Worker accepts any client whose certificate chains to the configured CA. If several workloads share that CA, use a client identity allowlist to only accept specific clients. The Worker checks the identities in the client's certificate against named rules, after the standard certificate validation.

Client identity allowlists are available for these sources:

- [HTTP Server][5]
- [OpenTelemetry][6]
- [Splunk HTTP Event Collector (HEC)][7]
- [Splunk Heavy or Universal Forwarders (TCP)][8]

### Requirements

- Worker version 2.27.0 or later.
- TLS is enabled on the source, **Verify certificate** is on, and a `CA Certificate Path` is set.

### Modes

| Mode | Client matches a rule | Client matches no rule |
| --- | --- | --- |
| Enforce (default) | Accepted | Rejected during the TLS handshake |
| Audit | Accepted | Accepted, and reported in Worker logs and metrics |

Use audit mode to check which clients an allowlist would reject before you enforce it. In both modes, the Worker always enforces standard certificate validation (CA trust, validity period, and chain), and rejects certificates whose common name or SANs are malformed or contain control characters.

With TLS 1.3, a rejected client might only see the error on its first read or write, instead of during the handshake.

### Allowlist file and inline allowlist

You can provide the allowlist in one of two ways:

- **File**: A YAML file on the Worker host. The path is relative to the Worker's data directory, `/var/lib/observability-pipelines-worker/config/` (see [Advanced Worker Configurations][9]). The Worker checks the file every minute and applies changes to new connections without a pipeline update. If the file is missing or invalid when the pipeline starts, the Worker does not apply the pipeline. If the file becomes invalid after a change, the Worker keeps using the last valid allowlist.
- **Inline**: Rules entered in the pipeline configuration. Changing them requires a pipeline update, which restarts the source and closes established connections.

The allowlist file and the inline allowlist have the same format. For example:

```yaml
rules:
  # Kubernetes workloads, identified by SPIFFE ID.
  - name: k8s-collectors
    uri_sans:
      - "spiffe://example.com/ns/logging/sa/*"
  # VM forwarders, identified by DNS name.
  - name: vm-forwarders
    dns_sans:
      - "*.forwarders.example.com"
  # The certificate must match both the common name and the DNS SAN.
  - name: splunk-forwarders-prod
    common_names:
      - "splunk-fwd-*"
    dns_sans:
      - "*.prod.example.com"
```

Each rule has:

- A `name`: 1 to 64 letters, digits, dots (`.`), underscores (`_`), or hyphens (`-`). Rule names must be unique.
- At least one of the `common_names`, `dns_sans`, or `uri_sans` lists of patterns. Lists can't be empty.

An allowlist can have up to 1,000 rules, and each list up to 1,000 patterns. Unknown keys are rejected.

### Matching

The Worker only checks the identities in the client's leaf certificate, never those in intermediate or CA certificates.

- A list matches when at least one identity of that type in the certificate matches at least one of its patterns.
- A rule matches when every list it defines matches. For example, the `splunk-forwarders-prod` rule above requires both a matching common name and a matching DNS SAN.
- A client is allowed when any rule matches.

The certificate can contain other identities that no pattern matches. For example, a certificate with the DNS SANs `a.prod.example.com` and `b.example.net` matches the pattern `*.prod.example.com`.

Patterns must match the whole identity:

| List | Matching | Wildcard (`*`) |
| --- | --- | --- |
| `common_names` | Case-sensitive. | Matches any characters, including dots. |
| `dns_sans` | Case-insensitive. Use punycode for internationalized domain names. | Matches characters within one DNS label. For example, `*.example.com` matches `a.example.com`, but not `example.com` or `a.b.example.com`. Partial labels, such as `collector-*.example.com`, are allowed. |
| `uri_sans` | Case-sensitive. No URI normalization or percent-decoding. | Matches characters within one path segment. For example, `spiffe://example.com/sa/collector-*` matches `spiffe://example.com/sa/collector-prod`. A trailing `/**` matches the path and everything below it. The scheme, authority, query, and fragment can't contain wildcards. |

### Connection age

The Worker checks client identities when a client connects, not on established connections. To make allowlist changes apply to connected clients, the Worker closes each connection after a maximum age, and the client reconnects:

- HTTP Server, OpenTelemetry, and Splunk HEC: 300 seconds.
- Splunk TCP: the source's **Maximum connection duration**, which is required when **Verify client identities** is on, and must be between 30 and 86400 seconds.

The Worker adds up to 10% of random jitter to the connection age, and lets in-flight requests finish. A client removed from an allowlist file is disconnected at most about one minute (the file check interval) plus the connection age after the change.

### Monitoring

The Worker reports every check in the `tls_client_identity_checks_total` metric, tagged by `mode`, `outcome` (`allowed`, `denied`, or `audit_denied`), and the `rule` that matched. It also logs clients that no rule allows, with the identities in their certificate. These logs are rate-limited.

In enforce mode, rejected clients don't send any data, so the metric and Worker logs are the only record of them.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/monitoring_and_troubleshooting/troubleshooting/#use-tap-to-see-your-data
[3]: https://letsencrypt.org/
[4]: /observability_pipelines/configuration/secrets_management/
[5]: /observability_pipelines/sources/http_server/
[6]: /observability_pipelines/sources/opentelemetry/
[7]: /observability_pipelines/sources/splunk_hec/
[8]: /observability_pipelines/sources/splunk_tcp/
[9]: /observability_pipelines/configuration/install_the_worker/advanced_worker_configurations/

