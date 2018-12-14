---
title: Docker JMX
kind: faq
disable_toc: true
further_reading:
- link: "/integrations/java"
  tag: "Documentation"
  text: "Java Integration"
- link: "/agent/basic_agent_usage/docker/"
  tag: "Documentation"
  text: "Basic Docker Agent usage"
- link: "https://hub.docker.com/r/datadog/agent/"
  tag: "Docker Hub"
  text: "datadog/agent image"
---

The standard `datadog/agent:latest` image for running the [Datadog Agent container][1] does not have JMX installed.

If you want to add JMX-related integrations to the Datadog Agent container, use a Docker image that ends in `-jmx` to install a version that includes JMX, for example `datadog/agent:latest-jmx`.

Execute a `docker-run` with a `-jmx` image and the `SD_JMX_ENABLE=true` environment variable. Then use [Autodiscovery][2] to collect metrics over JMX using your Datadog Agent.

## Autodiscovery

**If you want the Agent to automatically discover JMX-based checks**:

Use the `datadog/agent:latest-jmx` image. This image is based on `datadog/agent:latest`, but it includes a JVM, which the Agent needs to run [jmxfetch][3].

**Note**: Using `%%port%%` has proven problematic in practice. If you experience an issue, the best workaround is to replace `%%port%%` with a hard-coded JMX port.

### Troubleshooting

To check whether Autodiscovery is loading JMX-based checks:

```
# docker exec -it <agent_container_name> cat /opt/datadog-agent/run/jmx_status.yaml
timestamp: 1499296559130
checks:
  failed_checks: {}
  initialized_checks:
    SD-jmx_0:
    - {message: null, service_check_count: 0, status: OK, metric_count: 13, instance_name: SD-jmx_0-10.244.2.45-9010}
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: /agent/autodiscovery
[3]: https://github.com/DataDog/jmxfetch
