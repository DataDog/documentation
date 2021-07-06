---
title: Understanding API test timings and troubleshooting their variations
kind: documentation
description: Understanding API test timings and troubleshooting their variations
aliases:
- /synthetics/api_test_timing_variations
further_reading:
- link: "https://docs.datadoghq.com/synthetics/metrics/#api-tests"
  tag: "Documentation"
  text: "Synthetics API test timing metrics"
---


## Overview

Synthetics API tests collect several [**timing metrics**][1] which can be used to identify any bottlenecks in the communication between the client and your server. 

## Collected Timings


The metrics collected by Synthetics measure the following timings : 


**1. Redirection time**

The `synthetics.http.redirect.time` metric measures the total time spent in redirects. All other network timings (DNS resolution, TCP connection, etc.) correspond to the last request. For example, if an HTTP test (that has the **Follow Redirects** option turned on) first loads page A in 35 ms in total, which redirects to page B that loads in 40ms in total, which redirects to page C, the redirect timing equals 35 + 40 = 75 ms. The load of page C is then split among the various timings (DNS resolution, TCP connection, etc.).

The `synthetics.http.redirect.time` metric is only measured if redirects occur during the Synthetics HTTP test run. 

**2. DNS resolution time**

The `*.dns.time` metrics and the `synthetics.dns.response.time` measure the time spent resolving the domain name. Synthetics API tests use common DNS servers for domain name resolution, such as the public Google and CloudFlare DNS as well as some internal AWS and Azure ones. These can be overridden when using [**private locations**][2] or [**DNS tests**][3]. 

These metrics are only measured when  the API tests URL field contains a domain name. If it is using an IP address DNS resolution is skipped and there is consequently no time series for these metrics.


In case of any redirection, the DNS resolution time only corresponds to the last request.

**3. TCP connection time**

The `*.connect.time` metrics measure the total time spent establishing a TCP connection with the server. 

In case of any redirection, the TCP connection time only corresponds to the last request.

**4. SSL handshake time**

The `synthetics.http.ssl.time` and the `synthetics.ssl.hanshake.time` metrics measure the time spent in SSL handshake. 

These metrics are only collected if the request goes over HTTPS, and not HTTP. 

In case of any redirection, the SSL handshake timing only corresponds to  the last request.


**5. Time to First Byte**

The `synthetics.http.firstbyte.time` metric measures the time between the moment the connection was established and the moment Datadog client received the first byte of the response. Any time spent sending data in the request is included in this timing. 

In case of any redirection, the time to first byte only corresponds to the last request.

**6. Download time**

The `synthetics.http.download.time` metric measures the time between the moment Datadog client receives the first byte of the response and the moment it finishes downloading the whole response. Generally, the bigger the response body, the higher this timing will be. 

In the case the response does not have a body, this timing is null.

In case of any redirections, the download time only corresponds to the last request.

**7. Total response time**

The `*.response.time`  measures the total time between the moment Synthetics starts the request and the moment it finishes it. The response time is the sum of all network timings. For instance for an HTTP test with no redirections on an HTTPS endpoint, `synthetics.http.response.time = synthetics.http.dns.time + synthetics.http.connect.time+synthetics.http.ssl.time + synthetics.http.donwload.time`.

## Timing variations
 
Variations in API tests network timing metrics can occur when there is a bottleneck or delay during any of the several stages of the request, from the redirection to the download of the response body. Usually, it is helpful to identify the following : 

- If the variation is observed as a general trend, or as a sudden spike
- If the variation only occurs at specific stage of the request, for instance only for the DNS timings
- If the impacted Synthetics test is running from multiple locations, whether the variation is localised to a single location, or if it is widespread
- If the variation only occurs for a single URL, domain, subdomain, or if it is impacting all tests.

In many cases, timing can be affected by increase in network latency due to network load

Common causes by timing

For each timing metric we measure, variations can usually be explained by several factors.

**Redirection time:** Given this timing is the sum of all redirects in a request, variations at any stage of the HTTP request, from the DNS resolution to the download can noticeably increase the redirection timing. For example any delay in DNS resolution would impact the redirection timing as redirections require API tests to resolve multiple domains.

**DNS resolution time:** An increased DNS resolution time could be due to additional latency from authoritative servers.

**TCP connection time:** Variations of the TCP handshake can be due to the load of the network and server, the size of the request and response messages, and the distance between the Synthetics managed/private location and the server.

**SSL handshake time:** The SSL handshake time can vary depending on the load of the server, as SSL handshakes are usually CPU intensive, but also due to the load of the network and the distance between the Synthetics managed/private location and the server. Issues with CDN also often result in increased SSL handshake time,

**Time To first Byte :** Variations of the Time to First Byte can be due to the network and server load, as well as the distance between the Synthetics managed/private locations and the server. For example a higher network load or the re-routing of traffic caused by an unavailable CDN can negatively impact the Time to First Byte timing.

**Download time:** Variations in download time can be explained by changes in the size of the response. The downloaded body size is available on test results as well as with the `synthetics.http.response.size` metric.

For all the above timings where variations can be due to network and server load, it can be useful to leverage [Network Performance monitoring][4] and [Synthetics ICMP tests][5] to identify potential bottlenecks.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /synthetics/metrics/#api-tests
[2]: /synthetics/private_locations/configuration#dns-configuration
[3]: /synthetics/api_tests/dns_tests#define-request
[4]: /network_monitoring/performance/#overview
[5]: /synthetics/api_tests/icmp_tests/#overview
