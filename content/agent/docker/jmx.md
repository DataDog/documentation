---
title: Docker JMX
kind: documentation
---

The standard datadog/docker-dd-agent:latest image for running [the docker container](https://app.datadoghq.com/account/settings#agent/docker) dd-agent does not have JMX installed in it, since that's some additional weight that isn't always useful.

If you are interested in adding [JMX-related integrations](/agent/faq/custom-jmx-integration-s) to your docker containerized dd-agent, you'll want to use the docker images that end in "-jmx" to install a version that does include JMX, e.g, `datadog/docker-dd-agent:latest-jmx` or `datadog/docker-dd-agent:11.0.5122-jmx`.  
Execute a docker-run with those images and the `SD_JMX_ENABLE=true` environment variable, and then use [service discovery](/agent/kubernetes/autodiscovery) to collect metrics over JMX using your dd-agent. 