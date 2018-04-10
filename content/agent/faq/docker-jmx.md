---
title: Docker JMX
kind: faq
---

The standard datadog/docker-dd-agent:latest image for running [the docker container][1] dd-agent does not have JMX installed in it, since that's some additional weight that isn't always useful.

If you are interested in adding JMX-related integrations to your docker containerized dd-agent, use the docker images that end in "-jmx" to install a version that does include JMX, e.g, `datadog/agent:latest-jmx`.
Execute a docker-run with those images and the `SD_JMX_ENABLE=true` environment variable, and then use [service discovery][2] to collect metrics over JMX using your dd-agent.

## Autodiscovery

**If you want the Agent to auto-discover JMX-based checks**:  

Use the `datadog/agent:latest-jmx` image. This image is based on `latest`, but it includes a JVM, which the Agent needs in order to run [jmxfetch][3].

**Note**: On JMX, use `%%host%%`, but using `%%port%%` is bound to cause issues. Best workaround is to replace `%%port%%` by an hardcoded JMX port.

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


[1]: https://app.datadoghq.com/account/settings#agent/docker
[2]: /agent/autodiscovery
[3]: https://github.com/DataDog/jmxfetch
