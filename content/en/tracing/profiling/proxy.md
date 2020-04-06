---
title: Proxy configuration with Profiling
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

Profiles collected by the Datadog libraries are sent directly from your running application to Datadog. If your network configuration is restricted for outbound traffic use your proxy to redirect the profiles to Datadog.

If setup, your proxy should point to the following Datadog profiles endpoints:

- If you are on Datadog US site. `https://intake.profile.datadoghq.com`
- If you are on Datadog EU site. `https://intake.profile.datadoghq.eu`

## Profiling libraries Proxy Setup

Use the options below to configure your profiling libraries to send the collected profile to your proxy:

{{< tabs >}}
{{% tab "Java" %}}

| Arguments                       | Environment variable     | Description                                     |
| ------------------------------- | ------------------------ | ----------------------------------------------- |
| `-Ddd.profiling.proxy.host`     | PROFILING_PROXY_HOST     | URL for your proxy (`my-proxy.example.com`)     |
| `-Ddd.profiling.proxy.port`     | PROFILING_PROXY_PORT     | Port used by your proxy. Default port is `8080` |
| `-Ddd.profiling.proxy.username` | PROFILING_PROXY_USERNAME | Username used by your proxy                     |
| `-Ddd.profiling.proxy.password` | PROFILING_PROXY_PASSWORD | Password used by your proxy                     |

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
