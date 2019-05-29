---
title: Configure your application to collect traces
kind: documentation
aliases:
    - /tracing/languages
    - /tracing/proxies
disable_toc: true
---

After you have [installed the Datadog Agent][1], [enabled trace collection][2], [configured your environment](#configure-your-environment), and then instrument your application using one of the libraries locally, or in a container.

## Configure your environment

There are several ways to specify an environment when reporting data:
1. Host tag: Use a host tag with the format env:<ENVIRONMENT> to tag all traces from that Agent accordingly.
2. Agent configuration: Override the default tag used by the Agent in the Agent configuration file. This tags all traces coming through the Agent, overriding the host tag value.
  apm_config:
  env: <ENVIRONMENT>
4. Per trace: When submitting a single trace, specify an environment by tagging one of its spans with the metadata key env. This overrides the Agent configuration and the host tag’s value (if any). Consult the trace tagging documentationto learn how to assign a tag to your traces.

## Local setup

APM is enabled by default in Agent 6. Set `apm_non_local_traffic: true` if you are sending traces from a nonlocal env(containers). To get an overview of all the possible settings for APM, take a look at the Agent's [datadog.example.yaml][3] configuration file. For more information about the Datadog Agent, see the [dedicated doc page][4] or refer to the [datadog.yaml templates][5].

### Language setup

{{< partial name="apm/apm-languages.html" >}}

To instrument an application written in a language that does not yet have official library support, visit the list of [community tracing libraries][6].

## Containerized setup

Once your application is instrumented with the tracing client, by default traces will be sent to `localhost:8126`. Please see the below setup instructions to ensure that the Agent is configured to receive traces in a containerized environment:

{{< partial name="apm/apm-containers.html" >}}

**Note**: If you're using Kubernetes, make sure to [enable APM in your Daemonset setup][7]. If you're using Docker, [enable the Trace Agent in your application][8].


[1]: /agent
[2]: /agent/apm
[3]: https://github.com/DataDog/datadog-trace-agent/blob/6.4.1/datadog.example.yaml
[4]: /agent/apm
[5]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config_template.yaml
[6]: /developers/libraries/#apm-tracing-client-libraries
[7]: /agent/kubernetes/daemonset_setup
[8]: /agent/docker/apm/?tab=java
