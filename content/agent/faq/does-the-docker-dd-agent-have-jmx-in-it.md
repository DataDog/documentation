---
title: Does the docker dd-agent have JMX in it?
kind: faq
customnav: agentnav
---

The standard datadog/docker-dd-agent:latest image for running [the docker container](https://app.datadoghq.com/account/settings#agent/docker) dd-agent does not have JMX installed in it, since that's some additional weight that will not always be useful.

If you are interested in adding [JMX-related integrations](/agent/faq/custom-jmx-integration-s) to your docker containerized dd-agent, you'll want to use the docker images that end in "-jmx" to install a version that does include JMX, e.g, `datadog/docker-dd-agent:latest-jmx` or `datadog/docker-dd-agent:11.0.5122-jmx`.  
You can execute a docker-run with those images and the `SD_JMX_ENABLE=true` environment variable, and then use [service discovery](/agent/autodiscovery) to collect metrics over JMX using your dd-agent. 
 