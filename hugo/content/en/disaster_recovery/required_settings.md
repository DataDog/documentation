---
title: Required settings for optimal Recovery Time Objective
site_support_id: datadog_disaster_recovery
---

This page gives the specific settings needed for minimizing DNS failover time for Datadog Disaster Recovery (DDR).

The Recovery Time Objective (RTO) for DNS failover is essentially the sum of delays along the resolution-and-reconnection path, from the DNS change to telemetry actually landing in your secondary region. Get the fastest failover by tuning every layer along that path together, not just the DNS record itself, and many of these TTLs are additive which should be considered against your target RTO.

## 1. DNS record configuration

| **Configuration / item** | **Description** | **Requirements** |
| --- | --- | --- |
| A/CNAME record TTL | **High impact.** Sets how long resolvers keep returning your primary region's intake IP after cutover. See [RFC 1035](https://www.rfc-editor.org/rfc/rfc1035) (TTL field) and [RFC 2181](https://www.rfc-editor.org/rfc/rfc2181) (TTL clarifications, including TTL=0 handling). | 60–300 seconds. |
| Negative caching / SOA MINIMUM TTL | **Medium impact.** If any lookup returns NXDOMAIN or no-data during the swap, this governs how long that negative answer sticks. See [RFC 2308](https://www.rfc-editor.org/rfc/rfc2308). | 60–300 seconds, matching your record TTL. |
| CNAME chain depth | **Medium impact.** The effective TTL of a CNAME chain is the *minimum* TTL across every hop, and each hop is a record you need to keep synchronized. | No more than 1 hop between your vanity record and the Datadog-managed endpoint. |

## 2. Recursive resolver, OS, and application caching

| **Configuration / item** | **Description** | **Requirements** |
| --- | --- | --- |
| Application-level DNS caching (for example, JVM `networkaddress.cache.ttl`) | **High impact.** Some JVM-based applications cache DNS lookups indefinitely under default security configurations. This is the single most common cause of a failover taking far longer than the configured TTL suggests. Go and Node HTTP clients have similar caching behavior to verify. | Set `networkaddress.cache.ttl` (or the equivalent for your runtime) to 60–300 seconds, matching your record TTL, for any JVM-based application (or other client with its own DNS cache) in your telemetry pipeline. |
| OS-level caches (for example, nscd, systemd-resolved, Windows DNS Client) | **Low-medium impact.** Usually short-lived, but can contribute to RTO length. | Confirm OS-level cache TTLs are 300 seconds or less on hosts running telemetry senders. |

## 3. Sender and Agent behavior

Any Datadog Agent using DDR's DNS-based failover should be version 7.21 or above. Version 7.62 or above is required to use the more advanced DDR Agent-based failover features.

| **Configuration / item** | **Description** | **Requirements** |
| --- | --- | --- |
| Persistent-connection reuse / Agent TCP reconnect | **High impact.** Subtle but critical configuration. Even if TTL is configured to seconds, misconfiguration here can result in minutes-long failover when Agents and application clients hold a long-lived connection open to intake, and a DNS change only takes effect once that connection is torn down and re-established. | Set `connection_reset_interval` / `forwarder_connection_reset_interval` to 300 seconds or less for each telemetry type, so the Agent periodically tears down and re-establishes its connection, forcing DNS re-resolution. See configuration examples below. |
| Non-Agent senders (for example, Lambda extensions, OpenTelemetry Collector, FluentBit, custom API clients) | **High impact.** Each has its own DNS caching and connection-reuse behavior, and requires configuration similar to Datadog Agents. | Verify each independently. Set the equivalent of `connection_reset_interval` to 300 seconds or less where configurable, and confirm connection failures trigger immediate re-resolution rather than retries against a cached IP. |
| Connection-error re-resolution | **Medium-high impact.** Whether a sender re-resolves DNS immediately on a connection failure, or keeps retrying against a cached IP, changes the effective failover time independent of TTL. | Confirm this behavior for any non-Agent sender. Datadog Agents re-resolve DNS on a forced reconnect, per the setting above. |

**Metrics** (`datadog.yaml`):

```yaml
dd_url: <CUSTOM_INTAKE_URL>
# How frequently (in seconds) a connection to Datadog's intake is reset,
# in order to resolve the DNS entry. Recommended: 300 or less.
forwarder_connection_reset_interval: 300
```

**Logs** (`datadog.yaml`):

```yaml
logs_config:
  logs_dd_url: <CUSTOM_INTAKE_URL>
  # How frequently (in seconds) a connection to Datadog's logs intake is
  # reset, in order to resolve the DNS entry. Recommended: 300 or less.
  connection_reset_interval: 300
```

**APM/Traces** (`datadog.yaml`):

```yaml
apm_config:
  apm_dd_url: <CUSTOM_INTAKE_URL>
  # How frequently (in seconds) a connection to Datadog's APM intake is
  # reset, in order to resolve the DNS entry. Recommended: 300 or less.
  connection_reset_interval: 300
```

## Takeaways for prioritization

- **Connection-reuse settings are critical.** Tuning TTL down to seconds will not succeed if senders hold persistent connections open to your primary region. Tune TTL and reconnect settings together.

- **Give the JVM application-level cache specific attention.** It's the setting most likely to cause a failover to exceed your target RTO if left at its default.

## Further reading

- [Datadog Disaster Recovery (DDR)](/disaster_recovery/)
