---
title: Required Settings for Optimal Recovery Time Objective
site_support_id: datadog_disaster_recovery
further_reading:
- link: "/disaster_recovery/"
  tag: "Documentation"
  text: "Datadog Disaster Recovery (DDR)"
---

Configure DNS caching and connection reuse to minimize DNS failover time for Datadog Disaster Recovery (DDR).

Failover takes time because DNS caches must refresh and telemetry sources must reconnect before data reaches the secondary region. Configure these settings together to meet your recovery time objective (RTO). Delays across these layers can add up, so account for their combined effect when choosing time to live (TTL) and connection-reset settings.

## DNS record configuration

| Setting | Required configuration | Description |
| --- | --- | --- |
| A or CNAME record TTL | Set to 60 to 300 seconds. | **High impact.** Controls how long resolvers cache the record before checking for an updated value after failover. See [RFC 1035][1] (TTL field) and [RFC 2181][2] (TTL clarifications, including TTL=0 handling). |
| Negative caching TTL | Set to 60 to 300 seconds, matching your A or CNAME record TTL. Check both the SOA record's TTL and its `MINIMUM` field. | **Medium impact.** If a lookup returns NXDOMAIN (the domain does not exist) or NODATA (the requested record type does not exist) during failover, resolvers cache that response. The negative caching TTL is the lower of the SOA record's TTL and its `MINIMUM` field. See [RFC 2308][3]. |
| CNAME chain depth | Use no more than one CNAME hop between your custom DNS record and the Datadog-managed endpoint. | **Medium impact.** Each record in the chain has its own TTL, and each hop adds a record you need to keep synchronized. |

## OS and application DNS caching

| Setting | Required configuration | Description |
| --- | --- | --- |
| Application DNS caching | For applications with a DNS cache, set the cache TTL to 60 to 300 seconds, matching your DNS record TTL. For JVM-based applications, configure `networkaddress.cache.ttl`. | **High impact.** Application DNS caches can retain old addresses after DNS records change. Some JVM configurations cache addresses indefinitely. Verify caching behavior for each runtime and HTTP client, including Go and Node.js clients. |
| OS DNS caching | Confirm that OS DNS cache TTLs are 300 seconds or less on hosts running telemetry senders. | **Low to medium impact.** OS DNS caches, such as `nscd`, `systemd-resolved`, and Windows DNS Client, can also increase failover time. |

## Sender and Agent behavior

Any Datadog Agent using DDR's DNS-based failover should meet the [DDR prerequisites][4].

| Setting | Required configuration | Description |
| --- | --- | --- |
| Agent connection reuse | Set a connection-reset interval of 1-300 seconds for each telemetry type. See [Agent configuration examples][5] for the corresponding settings. | **High impact.** Long-lived connections can keep sending telemetry to the primary region after DNS changes. Configure periodic reconnections so the Agent performs DNS resolution again. |
| Non-Agent telemetry sources | Validate each source independently. Configure periodic reconnections at intervals of 300 seconds or less, where supported. Verify that connection failures trigger immediate DNS resolution instead of repeated attempts against a cached IP. | **High impact.** Non-Agent telemetry sources, such as Lambda extensions, OpenTelemetry Collector, Fluent Bit, and custom API clients, each handle DNS caching and connection reuse differently. Their behavior after a connection failure also affects failover time. |

Resolving DNS again can still return a cached address. Configure [DNS record TTLs][6] and [OS and application DNS caches][7] together with connection-reset intervals.

### Agent configuration examples

Update the connection-reset interval settings for each telemetry type you send in `datadog.yaml`. Configure an interval of no more than 300 seconds. Do not set the interval to `0`, which disables periodic reconnection.

| Telemetry | Setting |
| --- | --- |
| Metrics | `forwarder_connection_reset_interval` |
| Logs | `logs_config.connection_reset_interval` |
| APM traces | `apm_config.connection_reset_interval` |

**Metrics** (`datadog.yaml`):

```yaml
dd_url: <CUSTOM_INTAKE_URL>
# Reset connections every 300 seconds to resolve DNS again.
forwarder_connection_reset_interval: 300
```

**Logs** (`datadog.yaml`):

```yaml
logs_config:
  logs_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

**APM traces** (`datadog.yaml`):

```yaml
apm_config:
  apm_dd_url: <CUSTOM_INTAKE_URL>
  # Reset connections every 300 seconds to resolve DNS again.
  connection_reset_interval: 300
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.rfc-editor.org/rfc/rfc1035
[2]: https://www.rfc-editor.org/rfc/rfc2181
[3]: https://www.rfc-editor.org/rfc/rfc2308
[4]: /disaster_recovery/#prerequisites
[5]: #agent-configuration-examples
[6]: #dns-record-configuration
[7]: #os-and-application-dns-caching
