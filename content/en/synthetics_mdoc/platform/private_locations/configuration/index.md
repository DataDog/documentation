---
title: Private Locations Configuration
description: Configure your private locations.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Platform > Run Synthetic Tests from
  Private Locations > Private Locations Configuration
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/platform/private_locations/configuration/index.html
---

# Private Locations Configuration

## Overview{% #overview %}

Synthetic private locations come with a set of options you can configure to match your environment requirements. All options for the [private location worker](https://hub.docker.com/r/datadog/synthetics-private-location-worker) can be found by running the `help` command:

{% tab title="Docker" %}

```shell
docker run --rm datadog/synthetics-private-location-worker --help
```

{% /tab %}

{% tab title="Windows" %}

```
synthetics-pl-worker.exe --help
```

{% /tab %}

{% tab title="Kubernetes" %}
Refer to the example in the [Datadog Helm repository](https://github.com/DataDog/helm-charts/tree/main/charts/synthetics-private-location).
{% /tab %}

## Customize your private location{% #customize-your-private-location %}

Available parameters are listed below. These configuration options for private locations can be passed as **parameters to your JSON configuration file** or as **arguments in the launch command**, for example:

{% tab title="Docker" %}

```shell
docker run -d --restart always -v $PWD/<MY_WORKER_CONFIG_FILE_NAME>.json:/etc/datadog/synthetics-check-runner.json datadog/synthetics-private-location-worker:latest --logFormat=json
```

{% /tab %}

{% tab title="Windows" %}

```cmd
synthetics-pl-worker.exe --config=<PathToYourConfiguration> --logFormat=json
```

{% /tab %}

Arguments set in the launch command have precedence over the configuration file. However, these options are not stored and are consequently only relevant for a given launch.

## Top configuration options{% #top-configuration-options %}

### Datadog site configuration{% #datadog-site-configuration %}

{% dl %}

{% dt %}
`site`
{% /dt %}

{% dd %}
**Type**: String**Default**: `datadoghq.com`Datadog site from which the private location pulls the test configuration and pushes the test results. Your `site` is .
{% /dd %}

{% /dl %}

### DNS configuration{% #dns-configuration %}

The following parameters can be used to customize DNS resolution on your API tests:

{% dl %}

{% dt %}
`dnsUseHost`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `true`Use host local DNS configuration first (for example, the configuration from your `etc/resolv.conf` file), then DNS servers specified in the `dnsServer` parameter.
{% /dd %}

{% dt %}
`dnsServer`
{% /dt %}

{% dd %}
**Type**: Array of Strings**Default**: `["8.8.8.8","1.1.1.1"]`DNS servers IPs to use in given order (for example, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).
{% /dd %}

{% /dl %}

On browser tests, the DNS resolution is done directly by the browser, which usually reads DNS servers from the host. Alternatively, you can configure it at the container level (for example, using the `--dns` flag on [Docker](https://hub.docker.com/r/datadog/synthetics-private-location-worker), or `dnsConfig.nameservers` on [Kubernetes](https://kubernetes.io/docs/concepts/services-networking/dns-pod-service/#pod-dns-config)).

### Proxy configuration{% #proxy-configuration %}

The following parameters can be used to configure a proxy to connect to Datadog:

{% dl %}

{% dt %}
`proxyDatadog`
{% /dt %}

{% dd %}
**Type**: String**Default**: `none`Proxy URL used by the private location to send requests to Datadog (for example, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
{% /dd %}

{% dt %}
`proxyIgnoreSSLErrors`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `false`Discard SSL errors when private location is using a proxy to send requests to Datadog.
{% /dd %}

{% dt %}
`proxyEnableConnectTunnel`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `none`Enable `HTTP CONNECT` tunneling for HTTP proxies. When this option is not set, `HTTP CONNECT` tunneling is only used for HTTPS proxies.
{% /dd %}

{% /dl %}

**Note:** HTTP forward proxies like Squid may require the `HTTP CONNECT` request to establish the initial TCP connection between the private location and Datadog. As such, the `proxyEnableConnectTunnel` parameter should be set to `true`. However, reverse proxies like HAProxy that direct an `HTTP CONNECT` request to Datadog may not work with this option enabled.

**Note:** The `proxy` parameter is deprecated and should be replaced by `proxyDatadog`.

The following parameters can be used to configure a default proxy to use for Synthetic Monitoring tests:

{% dl %}

{% dt %}
`proxyTestRequests`
{% /dt %}

{% dd %}
**Type**: String**Default**: `none`Proxy URL used by the private location to send test requests to the endpoint. This supports HTTP(S), SOCKS, and PAC files with the following syntax: `pac+http://...`, `pac+https://...`, `pac+file://...`, or `pac+data:...`.
{% /dd %}

{% dt %}
`proxyTestRequestsBypassList`
{% /dt %}

{% dd %}
**Type**: Array of Strings**Default**: `none`Hosts for which the proxy defined with `proxyTestRequests` is not used, for example: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.
{% /dd %}

{% /dl %}

### Advanced configuration{% #advanced-configuration %}

{% dl %}

{% dt %}
`concurrency`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `10`Maximum number of tests executed in parallel.
{% /dd %}

{% dt %}
`maxNumberMessagesToFetch`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `10`Maximum number of tests fetched from Datadog.
{% /dd %}

{% dt %}
`maxAPIDownloadBodySize`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `52428800`Maximum HTTP body size for a download, in bytes. Default is 50 MB (50 * 1024 * 1024).
{% /dd %}

{% dt %}
`maxAPIBodySizeIfProcessed`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `5242880`Maximum HTTP body size for an assertion, in bytes. Default is 5 MB (5 * 1024 * 1024).
{% /dd %}

{% dt %}
`apiRequestMaxTimeout`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `60000`Maximum duration for API test execution, in milliseconds. Default is one minute (60 * 1000).
{% /dd %}

{% /dl %}

**Note**: Private Location containers output logs to `stdout` and `stderr` without saving them within the container.

## All configuration options{% #all-configuration-options %}

{% dl %}

{% dt %}
`--accessKey`
{% /dt %}

{% dd %}
**Type**: String**Default**: `none`Access key for Datadog API authentication.
{% /dd %}

{% dt %}
`--secretAccessKey`
{% /dt %}

{% dd %}
**Type**: String**Default**: `none`Secret access key for Datadog API authentication.
{% /dd %}

{% dt %}
`--datadogApiKey`
{% /dt %}

{% dd %}
**Type**: String**Default**: `none`Datadog API key to send browser tests artifacts (such as screenshots).
{% /dd %}

{% dt %}
`--privateKey`
{% /dt %}

{% dd %}
**Type**: Array**Default**: `none`Private key used to decrypt test configurations.
{% /dd %}

{% dt %}
`--publicKey`
{% /dt %}

{% dd %}
**Type**: Array**Default**: `none`Public key used by Datadog to encrypt test results. Composed of `--publicKey.pem`.
{% /dd %}

{% dt %}
`--site`
{% /dt %}

{% dd %}
**Type**: String**Default**: `datadoghq.com`Datadog site from which the private location pulls the test configuration and pushes the test results. Your site is .
{% /dd %}

{% dt %}
`--concurrency`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `10`Maximum number of tests executed in parallel.
{% /dd %}

{% dt %}
`--maxNumberMessagesToFetch`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `10`Maximum number of tests fetched from Datadog.
{% /dd %}

{% dt %}
`--proxyDatadog`
{% /dt %}

{% dd %}
**Type**: String**Default**: `none`Proxy URL used by the private location to send requests to Datadog (for example, `--proxyDatadog=http://<YOUR_USER>:<YOUR_PWD>@<YOUR_IP>:<YOUR_PORT>`).
{% /dd %}

{% dt %}
`--disableFipsCompliance`
{% /dt %}

{% dd %}
**Type:** Boolean**Default**: `false`Disables the FIPS compliance for a private location using `ddog-gov.com`. By default, Private Locations reporting to `ddog-gov.com` communicate to Datadog using FIPS-compliant encryption. The communication complies on the use of FIPS 140-2 validated [Cryptographic Module - Certificate #4282](https://csrc.nist.gov/projects/cryptographic-module-validation-program/certificate/4282). This option is required if you are using a Windows private location that reports to `ddog-gov.com`.
{% /dd %}

{% dt %}
`--dumpConfig`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `none`Display worker configuration parameters without secrets.
{% /dd %}

{% dt %}
`--enableStatusProbes`
{% /dt %}

{% dd %}
**Type**: BooleanEnables the readiness and liveness of private location probes. This enables two endpoints: `http://127.0.0.1:8080/liveness` and `http://127.0.0.1:8080/readiness`.
{% /dd %}

{% dt %}
`--statusProbesPort`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `8080`Overrides the port for the private location status probes.
{% /dd %}

{% dt %}
`--config`
{% /dt %}

{% dd %}
**Type**: String**Default**: `/etc/datadog/synthetics-check-runner.json`**Windows**: `C:\ProgramData\Datadog-Synthetics\worker-config.json`Path to the JSON configuration file.
{% /dd %}

{% dt %}
`--proxyTestRequests`
{% /dt %}

{% dd %}
**Type**: String**Default**: `none`Proxy URL used by the private location to send test requests to the endpoint. PAC files are supported with the following syntax: `pac+https://...` or `pac+http://...`.
{% /dd %}

{% dt %}
`proxyTestRequestsBypassList`
{% /dt %}

{% dd %}
**Type**: Array of Strings**Default**: `none`Hosts for which the proxy defined with `proxyTestRequests` is not used, for example: `--proxyTestRequestsBypassList="example.org" --proxyTestRequestsBypassList="*.com"`.
{% /dd %}

{% dt %}
`--proxyIgnoreSSLErrors`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `false`Discard SSL errors when private location is using a proxy to send requests to Datadog.
{% /dd %}

{% dt %}
`--dnsUseHost`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `true`Use host local DNS configuration first (for example, the configuration from your `etc/resolv.conf` file), then DNS servers specified in the `dnsServer` parameter.
{% /dd %}

{% dt %}
`--dnsServer`
{% /dt %}

{% dd %}
**Type**: Array of Strings**Default**: `["8.8.8.8","1.1.1.1"]`DNS servers IPs to use in given order (for example, `--dnsServer="8.8.4.4" --dnsServer="8.8.8.8"`).
{% /dd %}

{% dt %}
`--variableOverride`
{% /dt %}

{% dd %}
**Type**: StringOverrides the variables used in tests running on the Private Location. Format: `VARIABLE=value`. All variables imported this way are obfuscated.
{% /dd %}

{% dt %}
`--environmentVariableOverride`
{% /dt %}

{% dd %}
**Type**: StringOverrides variables used in tests running on the Private Location with environment variables. It requires the environment variables to be imported in the containerized environment. With Docker, for example, `docker run --env VARIABLE gcr.io/datadoghq/synthetics-private-location-worker --environmentVariableOverride VARIABLE`. All variables imported this way are obfuscated.
{% /dd %}

{% dt %}
`--allowedIPRanges`
{% /dt %}

{% dd %}
**Type**: Array of Strings**Default**: `none`Grant access to specific IPs and/or CIDR among IP ranges blocked through `--enableDefaultBlockedIpRanges` or `blockedIPRanges` (for example, `"allowedIPRanges.4": "10.0.0.0/8"`). **Note:** `allowedIPRanges` has precedence over `blockedIPRanges`.
{% /dd %}

{% dt %}
`--blockedIPRanges`
{% /dt %}

{% dd %}
**Type**: Array of Strings**Default**: `none`Block access to specific IPs and/or CIDR in addition, or not, to the IP ranges blocked when setting the `--enableDefaultBlockedIpRanges` parameter to `true` (for example, `--blockedIPRanges.4="127.0.0.0/8" --blockedIPRanges.6="::1/128"`.)
{% /dd %}

{% dt %}
`--enableDefaultBlockedIpRanges`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `false`Prevent users from creating Synthetic tests on endpoints that are using reserved IP ranges (IANA [IPv4](https://www.iana.org/assignments/iana-ipv4-special-registry/iana-ipv4-special-registry.xhtml) and [IPv6](https://www.iana.org/assignments/iana-ipv6-special-registry/iana-ipv6-special-registry.xhtml) Special-Purpose Address Registry), except for those explicitly set with the `--allowedIPRanges` parameter.
{% /dd %}

{% dt %}
`--allowedDomainNames`
{% /dt %}

{% dd %}
**Type**: Array**Default**: `none`Grant access to domain names in test. Has precedence over –blockedDomainNames, for example: `--allowedDomainNames="*.example.com"`.
{% /dd %}

{% dt %}
`--blockedDomainNames`
{% /dt %}

{% dd %}
**Type**: Array**Default**: `none`Deny access to domain names in tests, for example: `--blockedDomainNames="example.org" --blockedDomainNames="*.com"`.
{% /dd %}

{% dt %}
`--enableIPv6`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `false`Use IPv6 to perform tests. **Note**: IPv6 in Docker is only supported with a Linux host.
{% /dd %}

{% dt %}
`--version`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `none`Show version number of the worker.
{% /dd %}

{% dt %}
`--logFormat`
{% /dt %}

{% dd %}
**Type**: String**Default**: `pretty`Format log output between `"compact"`, `"pretty"`, `"pretty-compact"`, and `"json"`. Setting your log format to `json` allows you to have these logs automatically parsed when collected by Datadog.
{% /dd %}

{% dt %}
`--verbosity`
{% /dt %}

{% dd %}
**Type**: Number**Default**: `3`Verbosity level from `1` (errors only) to `4` (debug logs and above). Setting the verbosity from the command line is done with `-v`, `-vv`, `-vvv`, and `-vvvv` arguments.
| Verbosity level | CLI argument | JSON config option |
| --------------- | ------------ | ------------------ |
| DEBUG           | `-vvvv`      | `"verbosity": 4`   |
| INFO (default)  | `-vvv`       | `"verbosity": 3`   |
| WARNING         | `-vv`        | `"verbosity": 2`   |
| ERROR           | `-v`         | `"verbosity": 1`   |

{% /dd %}

{% dt %}
`--help`
{% /dt %}

{% dd %}
**Type**: Boolean**Default**: `none`Show the output for the help command.
{% /dd %}

{% /dl %}

## Environment variables{% #environment-variables %}

Command options can also be set using environment variables such as `DATADOG_API_KEY="...", DATADOG_WORKER_CONCURRENCY="15", DATADOG_TESTS_DNS_USE_HOST="true"`. For options that accept multiple arguments, use JSON string array notation (`DATADOG_TESTS_DNS_SERVER='["8.8.8.8", "1.1.1.1"]'`)

### Supported environment variables:{% #supported-environment-variables %}

`DATADOG_ACCESS_KEY`, `DATADOG_API_KEY`, `DATADOG_PRIVATE_KEY`, `DATADOG_PUBLIC_KEY_PEM`, `DATADOG_SECRET_ACCESS_KEY`, `DATADOG_SITE`, `DATADOG_WORKER_CONCURRENCY`, `DATADOG_WORKER_LOG_FORMAT`, `DATADOG_WORKER_LOG_VERBOSITY`, `DATADOG_WORKER_MAX_NUMBER_MESSAGES_TO_FETCH`, `DATADOG_WORKER_PROXY`, `DATADOG_TESTS_DNS_SERVER`, `DATADOG_TESTS_DNS_USE_HOST`, `DATADOG_TESTS_PROXY`, `DATADOG_TESTS_PROXY_ENABLE_CONNECT_TUNNEL`, `DATADOG_TESTS_PROXY_IGNORE_SSL_ERRORS`, `DATADOG_ALLOWED_IP_RANGES_4`, `DATADOG_ALLOWED_IP_RANGES_6`, `DATADOG_BLOCKED_IP_RANGES_4`, `DATADOG_BLOCKED_IP_RANGES_6`, `DATADOG_ENABLE_DEFAULT_WINDOWS_FIREWALL_RULES`, `DATADOG_ALLOWED_DOMAIN_NAMES`, `DATADOG_BLOCKED_DOMAIN_NAMES`, `DATADOG_WORKER_ENABLE_STATUS_PROBES`, `DATADOG_WORKER_STATUS_PROBES_PORT`

## Further Reading{% #further-reading %}

- [Getting Started with Private Locations](https://docs.datadoghq.com/getting_started/synthetics/private_location)
- [Dimension your private locations](https://docs.datadoghq.com/synthetics/private_locations/dimensioning)
