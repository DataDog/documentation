---
title: Private Locations Configuration
kind: documentation
description: Configure your Private Locations
further_reading:
- link: "getting_started/synthetics/private_location"
  tag: "Documentation"
  text: "Getting Started with Private Locations"
- link: "/synthetics/private_locations/"
  tag: "Documentation"
  text: "Run Synthetic Tests from Private Locations"
---

## Overview

Synthetic private locations come with a set of options you can configure to match your environment requirements. All these options can be found by running the below `help` command:

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

The private locations configuration options can be then be passed as **parameters to your JSON configuration file** or as **arguments in the launch command**, like below:

```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```

**Note:** Arguments set in the launch command have precedence over the configuration file. However, these options are not stored and are consequently only prevalent for a given launch.

## Configuration Options

### Datadog Site Configuration

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `site` | String | `datadoghq.com` | Datadog site from which the private location pulls the test configuration and pushes the test results. Your `site` is {{< region-param key="dd_site" code="true" >}}. |

### DNS Configuration 

* The two below parameters can be used to customize DNS resolution on your **API tests**:

| Option | Type | Default | Description |
| ------ | ---- | ------- | ----------- |
| `dnsUseHost` | Boolean | `true` | Use host local DNS configuration first (e.g., the configuration from your `etc/resolv.conf` file), then DNS servers specified in the `dnsServer` parameter if any. |
| `dnsServer` | Array of Strings | `["8.8.8.8","1.1.1.1"]` | DNS servers IPs to use in given order (e.g., `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`). |

* On **browser tests**, the DNS resolution is done directly by the browser, which usually reads DNS servers from the host. Alternatively, you can configure it at the container level (e.g., using the `--dns` flag on [Docker][1], or `dnsConfig.nameservers` on [Kubernetes][2]).

### Reserved IPs Configuration

| Option | Type | Default | Description |
| -------| ---- | ------- | ----------- |
| `enableDefaultBlockedIpRanges`| Boolean | `false` | Prevent users from creating Synthetic tests on endpoints that are using reserved IP ranges (IANA [IPv4][3] and [IPv6][4] Special-Purpose Address Registry), unless for those explicitly set with the `allowedIPRanges` parameter. |
| `allowedIPRanges` | Array of Strings | `none` | Grant access to specific IPs and/or CIDR among IP ranges blocked through `enableDefaultBlockedIpRanges` or `blockedIPRanges` (e.g., `"allowedIPRanges.4": "10.0.0.0/8"`). **Note:** `allowedIPRanges` has precedence over `blockedIPRanges`.
| `blockedIPRanges` | Array of Strings | `none` | Block access to specific IPs and/or CIDR in addition, or not, to the IP ranges blocked when setting the `enableDefaultBlockedIpRanges` parameter to `true` (e.g. `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`.)

**Note:** The `whitelistedRange` and `blacklistedRange` parameters are now deprecated and should be replaced by the above listed ones.

### Proxy Configuration

| Option | Type | Default | Description |
| -------| ---- | ------- | ----------- |
| `proxyDatadog` | String | `none` | Proxy URL used by the private location to send requests to Datadog (e.g., `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`). |
| `proxyTestRequests` | String | `none` | Proxy URL used by the private location to send test requests to the endpoint. |
| `proxyIgnoreSSLErrors` | Boolean | `false` | Discard SSL errors when private location is using a proxy to send requests to Datadog. |

**Note:** The `proxy` parameter is now deprecated and should be replaced by `proxyDatadog`.

### Advanced Configuration

| Option | Type | Default | Description |
| -------| ---- | ------- | ----------- |
| `concurrency` | Number | `10` | Maximum number of tests executed in parallel. |
| `maxTimeout` | Number | `60000` | Maximum test execution duration for API tests (in milliseconds). |

## Private Root Certificates

You can upload custom root certificates to your private locations to have your API and Browser tests perform SSL handshake using your own `.pem` files. When spinning up your private location containers, mount the relevant certificate `.pem` files to `/etc/datadog/certs`, the same way your private location configuration file is mounted. These certificates are then considered trusted CA and used as such at test runtime.

**Note**: This feature is supported for versions 1.5.3+ of the private location Docker image.

## Private Locations Admin

| Option | Type | Default | Description |
| -------| ---- | ------- | ----------- |
| `config` | String | `/etc/datadog/synthetics-check-runner.json` | Path to JSON configuration file. |
| `logFormat` | String | `pretty` | Format log output between `"pretty"`, and `"json"`. Setting your log format to `json` allows you to have these logs automatically parsed when collected by Datadog. |
| `verbosity` | Number | `3` | Verbosity level (e.g., `-v`, `-vv`, `-vvv`, ...). |
| `dumpConfig` | Boolean | `none` | Display worker configuration parameters without secrets. |
| `dumpFullConfig` | Boolean | `none` | Display full worker configuration parameters. |
| `help` | Boolean | `none` | Show help. |

**Note**: Private Location containers output logs to stdout/stderr without saving them within the container.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.docker.com/config/containers/container-networking/#dns-services
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[4]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
