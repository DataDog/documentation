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

All profiles collected by the Datadog profilers are sent to:

| Datadog Site | Endpoint                               |
| ------------ | -------------------------------------- |
| US site      | `https://intake.profile.datadoghq.com` |
| EU site      | `https://intake.profile.datadoghq.eu`  |

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
