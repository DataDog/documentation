---
title: Proxy configuration with Profiling
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

Profiles collected by the Datadog profilers are sent directly from your application to Datadog. If you need to use a proxy for outbound traffic, use the following configuration arguments.

## Profilers Configuration Arguments

{{< tabs >}}
{{% tab "Java" %}}

| Arguments                       | Environment variable        | Description                                      |
| ------------------------------- | --------------------------- | ------------------------------------------------ |
| `-Ddd.profiling.proxy.host`     | DD_PROFILING_PROXY_HOST     | Host for your proxy (`my-proxy.example.com`).    |
| `-Ddd.profiling.proxy.port`     | DD_PROFILING_PROXY_PORT     | Port used by your proxy. Default port is `8080`. |
| `-Ddd.profiling.proxy.username` | DD_PROFILING_PROXY_USERNAME | Username used by your proxy.                     |
| `-Ddd.profiling.proxy.password` | DD_PROFILING_PROXY_PASSWORD | Password used by your proxy.                     |

{{% /tab %}}
{{< /tabs >}}

## Datadog Profile Endpoints

All profiles collected by the Datadog profilers are sent to the following profile endpoints:

{{< site-region region="us" >}}

| Datadog Site | Endpoint                               |
| ------------ | -------------------------------------- |
| US site      | `https://intake.profile.datadoghq.com` |

These domains are CNAME records pointing to a set of static IP addresses. These addresses can be found at [https://ip-ranges.datadoghq.com][1] for Datadog US site

{{< /site-region >}}

{{< site-region region="eu" >}}

| Datadog Site | Endpoint                               |
| ------------ | -------------------------------------- |
| EU site      | `https://intake.profile.datadoghq.eu`  |

These domains are CNAME records pointing to a set of static IP addresses. These addresses can be found at [https://ip-ranges.datadoghq.eu][2] for Datadog EU site.

{{< /site-region >}}

See the [Agent Network Guide][3] to discover how the information is structured in the provided JSON.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://ip-ranges.datadoghq.com
[2]: https://ip-ranges.datadoghq.eu
[3]: /agent/guide/network/
