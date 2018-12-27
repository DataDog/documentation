---
title: Docker JMX
kind: faq
disable_toc: true
further_reading:
- link: "/integrations/java"
  tag: "Documentation"
  text: "Java Integration"
- link: "/agent/docker/"
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
$ docker exec -it <agent_container_name> agent configcheck

=== jmx check ===
Source: Docker
Instance ID: jmx:ae0a29210146d6f3
host: 172.17.0.2
port: "7199"
tags:
- image_tag:latest
- docker_image:my-java-app:latest
- image_name:my-java-app
- short_image:my-java-app
~
Init Config:
{}
Auto-discovery IDs:
* docker://f7d8dda2e6cb8847f4f172498305e532b08059bf3a700f271d65a90b0c1f0d33
```

To see JMX-based checks status from the Agent:

```
$ docker exec -it <agent_container_name> agent status

========
JMXFetch
========

  Initialized checks
  ==================
    jmx
      instance_name : jmx-172.17.0.2-7199
      message :
      metric_count : 15
      service_check_count : 0
      status : OK
  Failed checks
  =============
    no checks
```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: /agent/autodiscovery
[3]: https://github.com/DataDog/jmxfetch
