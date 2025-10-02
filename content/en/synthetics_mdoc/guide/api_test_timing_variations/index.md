---
title: Understand API Test Timings And Troubleshoot Variations
description: Understand API test timings and troubleshoot their variations.
breadcrumbs: >-
  Docs > Synthetic Testing and Monitoring > Synthetic Monitoring Guides >
  Understand API Test Timings And Troubleshoot Variations
sourceUrl: >-
  https://docs.datadoghq.com/synthetics/guide/api_test_timing_variations/index.html
---

# Understand API Test Timings And Troubleshoot Variations

## Overview{% #overview %}

You can identify bottlenecks in the communication between your server and the client with [timing metrics](https://docs.datadoghq.com/synthetics/metrics/#api-tests) collected by Synthetic API tests.

## Timing Metrics{% #timing-metrics %}

Synthetic tests collect [metrics](https://docs.datadoghq.com/synthetics/metrics/#api-tests) that measure the following:

### Redirection time{% #redirection-time %}

The `synthetics.http.redirect.time` metric measures the total time spent in redirects. All other network timings (such as DNS resolution and TCP connection) correspond to the last request.

For example, an HTTP test with **Follow Redirects** selected loads Page A for a total of `35 ms`, which redirects to Page B, which loads for a total of `40 ms`, and redirects to Page C. The redirect timing is calculated as `35 ms + 40 ms = 75 ms` and the load time of Page C is split among all other timings including DNS resolution and TCP connection.

For more information about follow redirects, see [HTTP Tests](https://docs.datadoghq.com/synthetics/api_tests/http_tests?tab=requestoptions#define-request).

The `synthetics.http.redirect.time` metric is only measured if redirects occur during the Synthetic Monitoring HTTP test run.

### DNS resolution time{% #dns-resolution-time %}

The `synthetics.dns.response.time` metric and `*.dns.time` metrics measure the time spent resolving the domain name. Synthetic API tests use common DNS servers for domain name resolution, such as Google, CloudFlare, AWS, and Azure. You can override these servers with [private locations](https://docs.datadoghq.com/synthetics/private_locations/configuration#dns-configuration) or [DNS tests](https://docs.datadoghq.com/synthetics/api_tests/dns_tests#define-request).

These metrics are only measured when the API test URL field contains a domain name. If you use an IP address, DNS resolution is skipped and no timeseries appear for these metrics.

In case of any redirection, the DNS resolution time only corresponds to the last request.

### TCP connection time{% #tcp-connection-time %}

The `*.connect.time` metrics measure the total time spent establishing a TCP connection with the server.

In case of any redirection, the TCP connection time only corresponds to the last request.

### SSL handshake time{% #ssl-handshake-time %}

The `synthetics.http.ssl.time` and the `synthetics.ssl.hanshake.time` metrics measure the time spent in SSL handshake.

These metrics are only collected if the request goes over HTTPS, and not HTTP.

In case of any redirection, the SSL handshake timing only corresponds to the last request.

### Time to first byte{% #time-to-first-byte %}

The `synthetics.http.firstbyte.time` metric measures the time between the moment the connection was established and the moment the Datadog client received the first byte of the response. This timing includes all time spent sending data in the request.

In case of any redirection, the time to first byte only corresponds to the last request.

### Download time{% #download-time %}

The `synthetics.http.download.time` metric measures the time between the moment the Datadog client receives the first byte of the response and the moment it finishes downloading the entire response. Generally, the bigger the response body, the higher this timing will be.

In the case the response does not have a body, this timing is null.

In case of any redirection, the download time only corresponds to the last request.

### Total response time{% #total-response-time %}

The `*.response.time` metrics measure the total time between the moment Synthetics starts and the moment Synthetic finishes the request. The response time is the sum of all network timings.

For example, the total response time for an HTTP test with no redirections on an HTTPS endpoint: `synthetics.http.response.time = synthetics.http.dns.time + synthetics.http.connect.time + synthetics.http.ssl.time + synthetics.http.firstbyte.time + synthetics.http.download.time`.

## Timing variations{% #timing-variations %}

Variations in API test network timing metrics can occur when there is a bottleneck or delay in any stage of the request, from the redirection to the download of the response body.

Identify the following behaviors:

- If the variation is observed as a general trend or a sudden spike
- If the variation only occurs at a specific stage of the request. For example, on the DNS timings.
- If the impacted Synthetic Monitoring test is running from multiple locations, whether the variation is localized to a single location or widespread
- If the variation only occurs for a single URL, domain, or subdomain; or if it is impacting all tests

For every timing metric measured, you can describe variations with the following factors:

### Redirection time{% #redirection-time-1 %}

The redirection time is the sum of all redirects in a request. Variations at any stage of the HTTP request, from the DNS resolution to the download, can noticeably increase the redirection timing.

For example, any delay in DNS resolution impacts the redirection timing because redirections require API tests to resolve multiple domains.

### DNS resolution time{% #dns-resolution-time-1 %}

An increase in DNS resolution time can occur with additional latency from authoritative servers.

### TCP connection time{% #tcp-connection-time-1 %}

Variations of the TCP handshake can occur because of the network and server load, the size of the request and response messages, and the distance between the Synthetic Monitoring managed or [private location](https://docs.datadoghq.com/synthetics/private_locations/?tab=docker#overview) and the server.

### SSL handshake time{% #ssl-handshake-time-1 %}

Variations of the SSL handshake time can occur because of the server load (SSL handshakes are usually CPU intensive), the network load, and the distance between the Synthetics managed or [private location](https://docs.datadoghq.com/synthetics/private_locations/?tab=docker#overview) and the server. Issues with CDN can increase SSL handshake time.

### Time To first byte{% #time-to-first-byte-1 %}

Variations of the Time to first byte can occur because of the network and server load and the distance between the Synthetics managed or [private location](https://docs.datadoghq.com/synthetics/private_locations/?tab=docker#overview) and the server. For example, a higher network load or the rerouting of traffic caused by an unavailable CDN can negatively impact Time to First Byte timing.

### Download time{% #download-time-1 %}

Variations in download time can occur because of changes in the response size. The downloaded body size is available on test results and the `synthetics.http.response.size` metric.

Wherever variations can occur because of network load, you can use [Cloud Network Monitoring](https://docs.datadoghq.com/network_monitoring/cloud_network_monitoring/#overview) and [Synthetic Monitoring ICMP Tests](https://docs.datadoghq.com/synthetics/api_tests/icmp_tests/#overview) to identify potential bottlenecks.

In cases where variations can occur because of server load, use the [Datadog Agent](https://docs.datadoghq.com/getting_started/agent/#overview) and its [integrations](https://docs.datadoghq.com/integrations/) to identify potential delays.

## Further Reading{% #further-reading %}

- [Synthetics API test metrics](https://docs.datadoghq.com/synthetics/metrics/#api-tests)
