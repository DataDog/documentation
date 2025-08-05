---
title: Sources
disable_toc: false
further_reading:
- link: "/observability_pipelines/set_up_pipelines/"
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

Use Observability Pipelines' sources to receive logs from your different log sources. Sources have different prerequisites and settings. Some sources also need to be configured to send logs to the Observability Pipelines Worker.

Select a source in the left navigation menu to see more information about it.

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

Enable TLS for Observability Pipelines to ensure that logs are encrypted during transit and prevent attackers from tampering with your log data.

Observability Pipelines does not accept self-signed certificates by default because self-signed certificates do not provide secure trust verification and can potentially expose your environment to man-in-the-middle attacks.

To check if your certificate is self signed, run this command:

```
openssl verify -CAfile certificate.pem certificate.pem
```

If the certificate is self signed and verifies against itself, the output is:

```
certificate.pem: OK
```

If you use a self-signed certificate, the Worker throws the error `unable to get local issuer certificate`. Datadog recommends the following approaches instead:

1. Use a certificate signed by Certificate Authority (CA).
2. If you cannot use a CA-signed certificate, use a certificate from [Let's Encrypt][3].

If you must use a self-signed certificate because the above approaches are not possible, you can configure your environment to trust the self-signed certificate on the Observability Pipelines Worker host. **Note**: This method is less secure. Datadog recommends this method for internal use only.

For the Worker host to trust the self-signed certificate:

- On Linux hosts, install the certificate in the OS trust store.
- In Kubernetes, you can either:
    - Build a custom container image that includes the certificate.
    - Mount the certificate and update the container's trust store manually.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/observability-pipelines
[2]: /observability_pipelines/troubleshooting/#use-tap-to-see-your-data
[3]: https://letsencrypt.org/

