---
title: Private Locations Configuration
description: Configure your private locations.
aliases:
- /synthetics/private_locations/configuration
further_reading:
- link: "getting_started/synthetics/private_location"
  tag: "Documentation"
  text: "Getting Started with Private Locations"
- link: "synthetics/private_locations/dimensioning"
  tag: "Documentation"
  text: "Dimension your private locations"
---

## Overview

Synthetic private locations come with a set of options you can configure to match your environment requirements. All options for the [private location worker][1] can be found by running the `help` command:

{{< tabs >}}
{{% tab "Docker" %}}

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```
{{% /tab %}}
{{% tab "Windows" %}}
```
synthetics-pl-worker.exe --help
```
{{% /tab %}}
{{% tab "Kubernetes" %}}

Refer to the example in the [Datadog Helm repository][1].

[1]: https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location

{{% /tab %}}
{{< /tabs >}}

## Customize your private location
Available parameters are listed below.
These configuration options for private locations can be passed as **parameters to your JSON configuration file** or as **arguments in the launch command**, for example:

{{< tabs >}}
{{% tab "Docker" %}}
```shell
docker run -d --restart always -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```
{{% /tab %}}
{{% tab "Windows" %}}
```cmd
synthetics-pl-worker.exe --config=<PathToYourConfiguration> --logFormat=json
```
{{% /tab %}}
{{< /tabs >}}

Arguments set in the launch command have precedence over the configuration file. However, these options are not stored and are consequently only relevant for a given launch.

## Top configuration options

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

### Proxy configuration

The following parameters can be used to configure a proxy to connect to Datadog:

`proxyDatadog`
: **Type**: String <br>
**Default**: `none`<br>
Proxy URL used by the private location to send requests to Datadog (for example, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`proxyIgnoreSSLErrors`
: **Type**: Boolean <br>
**Default**: `false`<br>
Discard SSL errors when private location is using a proxy to send requests to Datadog.

`proxyEnableConnectTunnel`
: **Type**: Boolean <br>
**Default**: `none`<br>
Enable `HTTP CONNECT` tunneling for HTTP proxies. When this option is not set, `HTTP CONNECT` tunneling is only used for HTTPS proxies.

**Note:** HTTP forward proxies like Squid may require the `HTTP CONNECT` request to establish the initial TCP connection between the private location and Datadog. As such, the `proxyEnableConnectTunnel` parameter should be set to `true`. However, reverse proxies like HAProxy that direct an `HTTP CONNECT` request to Datadog may not work with this option enabled.

**Note:** The `proxy` parameter is deprecated and should be replaced by `proxyDatadog`.

The following parameters can be used to configure a default proxy to use for Synthetic Monitoring tests:

`proxyTestRequests`
: **Type**: String <br>
**Default**: `none`<br>
Proxy URL used by the private location to send test requests to the endpoint. This supports HTTP(S), SOCKS, and PAC files with the following syntax: `pac+http://...`, `pac+https://...`, `pac+file://...`, or `pac+data:...`.

`proxyTestRequestsBypassList`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
Hosts for which the proxy defined with `proxyTestRequests` is not used, for example: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

### Advanced configuration

`concurrency`
: **Type**: Number <br>
**Default**: `10`<br>
Maximum number of tests executed in parallel.

`maxNumberMessagesToFetch`
: **Type**: Number <br>
**Default**: `10`<br>
Maximum number of tests fetched from Datadog.

`maxAPIDownloadBodySize`
: **Type**: Number <br>
**Default**: `52428800`<br>
Maximum HTTP body size for a download, in bytes. Default is 50 MB (50 * 1024 * 1024).

`maxAPIBodySizeIfProcessed`
: **Type**: Number <br>
**Default**: `5242880`<br>
Maximum HTTP body size for an assertion, in bytes. Default is 5 MB (5 * 1024 * 1024).

`apiRequestMaxTimeout`
: **Type**: Number <br>
**Default**: `60000`<br>
Maximum duration for API test execution, in milliseconds. Default is one minute (60 * 1000).

**Note**: Private Location containers output logs to `stdout` and `stderr` without saving them within the container.

## All configuration options

`--accessKey`
: **Type**: String <br>
**Default**: `none`<br>
Access key for Datadog API authentication.

`--secretAccessKey`
: **Type**: String <br>
**Default**: `none`<br>
Secret access key for Datadog API authentication.

`--datadogApiKey`
: **Type**: String <br>
**Default**: `none`<br>
Datadog API key to send browser tests artifacts (such as screenshots).

`--privateKey`
: **Type**: Array <br>
**Default**: `none`<br>
Private key used to decrypt test configurations.

`--publicKey`
: **Type**: Array <br>
**Default**: `none`<br>
Public key used by Datadog to encrypt test results. Composed of `--publicKey.pem`.

`--site`
: **Type**: String <br>
**Default**: `datadoghq.com`<br>
Datadog site from which the private location pulls the test configuration and pushes the test results. Your site is {{< region-param key="dd_site" code="true" >}}.

`--concurrency`
: **Type**: Number <br>
**Default**: `10`<br>
Maximum number of tests executed in parallel.

`--maxNumberMessagesToFetch`
: **Type**: Number <br>
**Default**: `10`<br>
Maximum number of tests fetched from Datadog.

`--proxyDatadog`
: **Type**: String <br>
**Default**: `none`<br>
Proxy URL used by the private location to send requests to Datadog (for example, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).

`--dumpConfig`
: **Type**: Boolean <br>
**Default**: `none`<br>
Display worker configuration parameters without secrets.

`--enableStatusProbes`
: **Type**: Boolean <br>
Enables the readiness and liveness of private location probes. This enables two endpoints: `http://127.0.0.1:8080/liveness` and `http://127.0.0.1:8080/readiness`.

`--statusProbesPort`
: **Type**: Number <br>
**Default**: `8080`<br>
Overrides the port for the private location status probes.

`--config`
: **Type**: String <br>
**Default**: `/etc/datadog/synthetics-check-runner.json`</br>
**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`</br>
Path to the JSON configuration file.

`--proxyTestRequests`
: **Type**: String <br>
**Default**: `none`<br>
Proxy URL used by the private location to send test requests to the endpoint. PAC files are supported with the following syntax: `pac+https://...` or `pac+http://...`.

`proxyTestRequestsBypassList`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
Hosts for which the proxy defined with `proxyTestRequests` is not used, for example: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.

`--proxyIgnoreSSLErrors`
: **Type**: Boolean <br>
**Default**: `false`<br>
Discard SSL errors when private location is using a proxy to send requests to Datadog.

`--dnsUseHost`
: **Type**: Boolean <br>
**Default**: `true`<br>
Use host local DNS configuration first (for example, the configuration from your `etc/resolv.conf` file), then DNS servers specified in the `dnsServer` parameter.

`--dnsServer`
: **Type**: Array of Strings <br>
**Default**: `["8.8.8.8","1.1.1.1"]`<br>
DNS servers IPs to use in given order (for example, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).

`--variableOverride`
: **Type**: String <br>
Overrides the variables used in tests running on the Private Location. Format: `VARIABLE=value`.
All variables imported this way are obfuscated.

`--environmentVariableOverride`
: **Type**: String <br>
Overrides variables used in tests running on the Private Location with environment variables. It requires the environment variables to be imported in the containerized environment.
With Docker, for example, `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`.
All variables imported this way are obfuscated.

`--allowedIPRanges`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
Grant access to specific IPs and/or CIDR among IP ranges blocked through `--enableDefaultBlockedIpRanges` or `blockedIPRanges` (for example, `"allowedIPRanges.4": "10.0.0.0/8"`). **Note:** `allowedIPRanges` has precedence over `blockedIPRanges`.

`--blockedIPRanges`
: **Type**: Array of Strings <br>
**Default**: `none`<br>
Block access to specific IPs and/or CIDR in addition, or not, to the IP ranges blocked when setting the `--enableDefaultBlockedIpRanges` parameter to `true` (for example, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`.)

`--enableDefaultBlockedIpRanges`
: **Type**: Boolean <br>
**Default**: `false`<br>
Prevent users from creating Synthetic tests on endpoints that are using reserved IP ranges (IANA [IPv4][4] and [IPv6][5] Special-Purpose Address Registry), except for those explicitly set with the `--allowedIPRanges` parameter.

`--allowedDomainNames`
: **Type**: Array <br>
**Default**: `none`<br>
Grant access to domain names in test. Has precedence over --blockedDomainNames, for example: `--allowedDomainNames="*.example.com"`.

`--blockedDomainNames`
: **Type**: Array <br>
**Default**: `none`<br>
Deny access to domain names in tests, for example: `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`.

`--enableIPv6`
: **Type**: Boolean <br>
**Default**: `false`<br>
Use IPv6 to perform tests. **Note**: IPv6 in Docker is only supported with a Linux host.

`--version`
: **Type**: Boolean <br>
**Default**: `none`<br>
Show version number of the worker.

`--logFormat`
: **Type**: String <br>
**Default**: `pretty`<br>
Format log output between `"compact"`, `"pretty"`, `"pretty-compact"`, and `"json"`. Setting your log format to `json` allows you to have these logs automatically parsed when collected by Datadog.

`--verbosity`
: **Type**: Number <br>
**Default**: `3`<br>
Verbosity level from `1` (errors only) to `4` (debug logs and above). Setting the verbosity from the command line is done with `-v`, `-vv`, `-vvv`, and `-vvvv` arguments.<br><br>
Verbosity level | CLI argument | JSON config option
-- | -- | --
DEBUG | `-vvvv` | `"verbosity": 4`
INFO (default) | `-vvv` | `"verbosity": 3`
WARNING | `-vv` | `"verbosity": 2`
ERROR | `-v` | `"verbosity": 1`

`--help`
: **Type**: Boolean <br>
**Default**: `none`<br>
Show the output for the help command.

## Environment variables
Command options can also be set using environment variables such as `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"`. For options that accept multiple arguments, use JSON string array notation (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)
### Supported environment variables:
`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://hub.docker.com/r/datadog/synthetics-private-location-worker
[2]: https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config
[3]: https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282
[4]: https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml
[5]: https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml
