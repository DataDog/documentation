---
title: Private Locations Configuration
kind: documentation
description: Configure your private locations.
further_reading:
- link: "getting_started/synthetics/private_location"
  tag: "Documentation"
  text: "Getting Started with Private Locations"
- link: "synthetics/private_locations/dimensioning"
  tag: "Documentation"
  text: "Dimension your Private Locations"
---

## Overview

Synthetic private locations come with a set of options you can configure to match your environment requirements. All options for the [private location worker][1] can be found by running the `help` command:

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

## Customize your private location
A subset of available parameters are listed below.
These configuration options for private locations can be passed as **parameters to your JSON configuration file** or as **arguments in the launch command**, for example:

```shell
docker run --rm -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```

Arguments set in the launch command have precedence over the configuration file. However, these options are not stored and are consequently only relevant for a given launch.

## Configuration options

### Datadog site configuration

`site`
: **Type**: String <br>
**Default**: `datadoghq.com`<br>
Datadog site from which the private location pulls the test configuration and pushes the test results. Your `site` is {{< region-param key="dd_site" code="true" >}}.

### DNS configuration

The following parameters can be used to customize DNS resolution on your API tests:

`dnsUseHost`
: **Type**: Boolean <br>
**Default**: `true`<br>
Use host local DNS configuration first (for example, the configuration from your `etc/resolv.conf` file), then DNS servers specified in the `dnsServer` parameter.

`dnsServer`
: **Type**: Array of Strings <br>
**Default**: `["8.8.8.8","1.1.1.1"]`<br>
DNS servers IPs to use in given order (for example, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

On browser tests, the DNS resolution is done directly by the browser, which usually reads DNS servers from the host. Alternatively, you can configure it at the container level (for example, using the `--dns` flag on [Docker][1], or `dnsConfig.nameservers` on [Kubernetes][2]).

### Reserved IPs configuration

`enableDefaultBlockedIpRanges`
: **Type**: Boolean <br>
**Default**: `false`<br>
Prevent users from creating Synthetic tests on endpoints that are using reserved IP ranges (IANA [IPv4][3] and [IPv6][4] Special-Purpose Address Registry), unless for those explicitly set with the `allowedIPRanges` parameter.

`allowedIPRanges`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
Grant access to specific IPs and/or CIDR among IP ranges blocked through `enableDefaultBlockedIpRanges` or `blockedIPRanges` (for example, `"allowedIPRanges.4": "10.0.0.0/8"`). **Note:** `allowedIPRanges` has precedence over `blockedIPRanges`.

`blockedIPRanges`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
Block access to specific IPs and/or CIDR in addition, or not, to the IP ranges blocked when setting the `enableDefaultBlockedIpRanges` parameter to `true` (for example, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`.)

**Note:** The `whitelistedRange` and `blacklistedRange` parameters are deprecated and should be replaced by the listed ones above.

### Proxy configuration

`proxyDatadog`
: **Type**: String <br>
**Default**: `none`<br>
Proxy URL used by the private location to send requests to Datadog (for example, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`proxyTestRequests`
: **Type**: String <br>
**Default**: `none`<br>
Proxy URL used by the private location to send test requests to the endpoint.

`proxyIgnoreSSLErrors`
: **Type**: Boolean <br>
**Default**: `false`<br>
Discard SSL errors when private location is using a proxy to send requests to Datadog.

**Note:** The `proxy` parameter is deprecated and should be replaced by `proxyDatadog`.

### Advanced configuration

`concurrency`
: **Type**: Number <br>
**Default**: `10`<br>
Maximum number of tests executed in parallel.

`enableStatusProbes`
: **Type**: Boolean <br>
Enables the readiness and liveness of private location probes. This enables two endpoints: `http://127.0.0.1:8080/liveness` and `http://127.0.0.1:8080/readiness`.

`statusProbesPort`
: **Type**: Number <br>
**Default**: `8080`<br>
Overrides the port for the private location status probes.

`variableOverride`
: **Type**: String <br>
Overrides the variables used in tests running on the Private Location. Format: `VARIABLE=value`.
All variables imported this way are obfuscated.

`environmentVariableOverride`
: **Type**: String <br>
Overrides variables used in tests running on the Private Location with environment variables. It requires the environment variables to be imported in the containerized environment.
With Docker, for example, `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`.
All variables imported this way are obfuscated. 

## Private locations admin

`config`
: **Type**: String <br>
**Default**: `/etc/datadog/synthetics-check-runner.json`<br>
Path to JSON configuration file.

`logFormat`
: **Type**: String <br>
**Default**: `pretty`<br>
Format log output between `"pretty"`, and `"json"`. Setting your log format to `json` allows you to have these logs automatically parsed when collected by Datadog.

`verbosity`
: **Type**: Number <br>
**Default**: `3`<br>
Verbosity level (for example, `-v`, `-vv`, and `-vvv`).

`dumpConfig`
: **Type**: Boolean <br>
**Default**: `none`<br>
Display worker configuration parameters without secrets.

`help`
: **Type**: Boolean <br>
**Default**: `none`<br>
Show help.

**Note**: Private Location containers output logs to stdout/stderr without saving them within the container.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[4]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml