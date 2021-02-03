---
title: Agent Environment Variables
kind: guide
further_reading:
  - link: "/agent/docker/#environment-variables"
    tag: "Documentation"
    text: "Docker Agent environment variables"
  - link: "/agent/docker/apm/#docker-apm-agent-environment-variables"
    tag: "Documentation"
    text: "APM Agent environment variables"
  - link: "/logs/log_collection/#container-log-collection"
    tag: "Documentation"
    text: "Container log collection"
  - link: "/agent/proxy/#environment-variables"
    tag: "Documentation"
    text: "Proxy environment variables"
---

<div class="alert alert-warning">
For Agent v5, reference the <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">Docker Agent GitHub repo</a>.
</div>

## Overview

For Agent v6, most of the configuration options in the [Agent's main configuration file][1] (`datadog.yaml`) can be set through environment variables.

## Recommendations

As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, refer to the dedicated [unified service tagging][2] documentation.

## General use

In general, use the following rules:

* Option names should be uppercase with the `DD_` prefix: `hostname` -> `DD_HOSTNAME`

* List values should be separated by spaces (Include rules support regexes, and are defined as a list of comma-separated strings):
   ```yaml
      container_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_CONTAINER_INCLUDE="image:cp-kafka image:k8szk"
   ```

* The nesting of config options with **predefined** keys should be separated with an underscore:
   ```yaml
      cluster_agent:
        cmd_port: 5005
      # DD_CLUSTER_AGENT_CMD_PORT=5005
   ```

* The nesting of config options with **user-defined** keys must be JSON-formatted:
   ```yaml
      docker_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_DOCKER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

**Note**: Specifying a nested option with an environment variable overrides _all_ the nested options specified under the config option. The exception to this rule is the `proxy` config option. Reference the [Agent proxy documentation][3] for more details. 

### Exceptions

- Not all `datadog.yaml` options are available with environment variables. Refer to [config.go][4] in the Datadog Agent GitHub repo. Options with environment variables start with `config.BindEnv*`.

- Component-specific environment variables not listed in [config.go][4] may also be supported.
 
  - **APM Trace Agent**

      - [Docker APM Agent Environment Variables][5]
      - [trace-agent env.go][6]
      - example

          ```yaml
             apm_config:
                 enabled: true
                 env: dev
             # DD_APM_ENABLED=true
             # DD_APM_ENV=dev
          ```

  - **Live Process Agent**

      - [process-agent config.go][7]
      - example

          ```yaml
             process_config:
                 enabled: true
                 process_dd_url: https://process.datadoghq.com
             # DD_PROCESS_AGENT_ENABLED=true
             # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
          ```

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/#agent-main-configuration-file
[2]: /getting_started/tagging/unified_service_tagging
[3]: /agent/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config.go
[5]: https://docs.datadoghq.com/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/master/pkg/trace/config/env_test.go
[7]: https://github.com/DataDog/datadog-agent/blob/master/pkg/process/config/config.go
