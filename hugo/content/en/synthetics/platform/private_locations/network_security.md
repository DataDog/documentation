---
title: Private Location Network Security Hardening
description: Restrict the network access of your Synthetic Monitoring private locations with egress allow and block lists.
further_reading:
- link: "synthetics/platform/private_locations/configuration"
  tag: "Documentation"
  text: "Private Locations Configuration"
- link: "synthetics/platform/private_locations/dimensioning"
  tag: "Documentation"
  text: "Dimension your private locations"
---

## Overview

A private location worker can reach any endpoint that its underlying host can reach, unless its configuration restricts outbound (egress) network access. Configuration files generated for new private locations set `enableDefaultBlockedIpRanges` to `true`, which blocks reserved and private IP ranges. The worker default is `false`. Private locations with older configuration files, and workers started without this option, do not restrict egress. Without restrictions, any user who can create a test on the private location can point that test at any reachable address.

To reduce this risk:

- [Restrict egress with allow and block lists](#restrict-egress-with-allow-and-block-lists) in the worker configuration.
- [Apply the recommended defaults](#recommended-defaults).

The allow and block lists apply to all test types that run on the private location.

## Restrict egress with allow and block lists

The worker supports five options to control which addresses and hostnames tests can reach. For the full reference, see [All configuration options][1].

| Option | Type | Default | Effect |
|--------|------|---------|--------|
| [`enableDefaultBlockedIpRanges`][1] | Boolean | `false` (`true` in configuration files generated for new private locations) | Blocks reserved and private IP ranges (see [Default blocked ranges](#default-blocked-ranges)). |
| [`blockedIPRanges`][1] | Array of strings, per IP family | none | Blocks additional IP addresses or CIDR ranges. |
| [`allowedIPRanges`][1] | Array of strings, per IP family | none | Allows IP addresses or CIDR ranges that a block list otherwise blocks. |
| [`blockedDomainNames`][1] | Array of strings | none | Blocks hostnames. Accepts wildcards such as `*.example.com`. |
| [`allowedDomainNames`][1] | Array of strings | none | Allows hostnames that a block list otherwise blocks. Accepts wildcards. |

The worker evaluates the lists in this order:

1. Before the DNS lookup, the worker checks the hostname. A hostname that matches `allowedDomainNames` is allowed, and the worker skips the IP checks for that request. A hostname that matches `blockedDomainNames` is blocked.
2. After the DNS lookup, the worker checks the resolved IP address. An address in `allowedIPRanges` is allowed. An address in `blockedIPRanges`, or in the default blocked ranges when `enableDefaultBlockedIpRanges` is `true`, is blocked.

Allow lists take precedence over block lists. `allowedIPRanges` has no effect if no IP range is blocked. In that case, the worker logs a warning at startup.

<div class="alert alert-warning">A hostname in <code>allowedDomainNames</code> bypasses all IP checks. If an allowed hostname resolves to a private or metadata address, tests can reach that address.</div>

### Default blocked ranges

When `enableDefaultBlockedIpRanges` is `true`, the worker blocks the following IPv4 ranges:

- `0.0.0.0/8`, `10.0.0.0/8`, `100.64.0.0/10`, `127.0.0.0/8`, `169.254.0.0/16`, `172.16.0.0/12`, `192.168.0.0/16`
- `192.0.0.0/24`, `192.0.2.0/24`, `192.31.196.0/24`, `192.52.193.0/24`, `192.88.99.0/24`, `192.175.48.0/24`, `198.18.0.0/15`, `198.51.100.0/24`, `203.0.113.0/24`
- `224.0.0.0/4`, `240.0.0.0/4`, `255.255.255.255/32`

It also blocks IPv6 special-purpose ranges, including `::1/128`, `fc00::/7`, `fe80::/10`, `::ffff:0:0/96`, and `2002::/16`. These ranges come from the IANA [IPv4][2] and [IPv6][3] Special-Purpose Address Registries.

**Note**: The default list includes the private ranges `10.0.0.0/8`, `172.16.0.0/12`, and `192.168.0.0/16`. If your private location tests internal applications, add their address ranges to `allowedIPRanges`.

## Recommended defaults

Datadog recommends the following configuration:

- Keep `enableDefaultBlockedIpRanges` set to `true`. Configuration files generated for new private locations set it to `true`. For older private locations, set it to `true` in the configuration file.
- Add only the ranges that your tests need to `allowedIPRanges`. Use the smallest range possible, and use `/32` (IPv4) or `/128` (IPv6) for single hosts.
- Use `allowedDomainNames` only for hostnames whose DNS records you control.
- Optionally, to restrict tests to a known set of hostnames, set `blockedDomainNames` to `*` and list the hostnames that tests need in `allowedDomainNames`. A `*` entry matches every hostname, so the worker blocks every hostname that is not explicitly allowed.

The following examples block the default ranges and allow one internal application subnet and one hostname:

{{< tabs >}}
{{% tab "JSON configuration" %}}

```json
{
  "enableDefaultBlockedIpRanges": true,
  "allowedIPRanges": {
    "4": ["10.20.30.0/24"]
  },
  "allowedDomainNames": ["app.internal.example.com"]
}
```

{{% /tab %}}
{{% tab "Docker" %}}

```shell
docker run --rm --cap-add=NET_ADMIN -v $PWD/worker-config.json:/etc/datadog/synthetics-check-runner.json \
  datadog/synthetics-private-location-worker \
  --enableDefaultBlockedIpRanges \
  --allowedIPRanges.4="10.20.30.0/24" \
  --allowedDomainNames="app.internal.example.com"
```

{{% /tab %}}
{{% tab "Helm" %}}

Merge the options into the JSON configuration that you pass in `configFile`:

```yaml
configFile: |-
  {
    "enableDefaultBlockedIpRanges": true,
    "allowedIPRanges": {
      "4": ["10.20.30.0/24"]
    },
    "allowedDomainNames": ["app.internal.example.com"]
  }
```

If you manage the configuration in your own secret with `configSecret`, add the same options to that secret.

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/platform/private_locations/configuration/#all-configuration-options
[2]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[3]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
