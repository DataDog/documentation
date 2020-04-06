---
title: Proxy
kind: Documentation
further_reading:
    - link: 'https://www.datadoghq.com/blog/introducing-datadog-profiling/'
      tags: 'Blog'
      text: 'Introducing always-on production profiling in Datadog.'
---

## Proxy Setup

Profiles collected by Datadog are sent directly from your running application. If your network configuration restricted outbound traffic, proxy all Agent traffic through one or several hosts that have more permissive outbound policies.

The following domain need to be reachable by your proxy:
- `https://intake.profile.datadoghq.com` if your are on our US site.
- `https://intake.profile.datadoghq.eu` if you are on our EU site.

{{< tabs >}}
{{% tab "Java" %}}

Below are the configuration options to allow your application to send profiles to your proxy:

| Arguments                       | Environment variable      | Description                                       |
| ------------------------------- | ------------------------- | ------------------------------------------------- |
| `-Ddd.profiling.proxy.host`     | PROFILING_PROXY_HOST      | URL for your proxy (`my-proxy.example.com`)       |
| `-Ddd.profiling.proxy.port`     | PROFILING_PROXY_PORT      | Port used by your proxy. Default port is `8080`   |
| `-Ddd.profiling.proxy.username` | PROFILING_PROXY_USERNAME  | Username used by your proxy                       |
| `-Ddd.profiling.proxy.password` | PROFILING_PROXY_PASSWORD  | Password used by your proxy                       |


{{% /tab %}}

{{% tab "Python" %}}

<div class="alert alert-info">In development, will be soon avilable.</div>

{{% /tab %}}

{{< /tabs >}}


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
