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
  - link: "/agent/proxy/?tab=agentv6#environment-variables"
    tag: "Documentation"
    text: "Proxy environment variables"
---

<div class="alert alert-warning">
For Agent v5, reference the <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">Docker Agent GitHub repo</a>.
</div>

## Overview

For Agent v6, most of the configuration options in the [Agent's main configuration file][1] (`datadog.yaml`) can be set through environment variables.

## General use 

In general, use the following rules:

* Option names should be uppercase with the `DD_` prefix: `hostname` -> `DD_HOSTNAME`

* List values should be separated by spaces:
   ```yaml
      ac_include:
        - "image:cp-kafka"
        - "image:k8szk"
      # DD_AC_INCLUDE="image:cp-kafka image:k8szk"
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

**Note**: Specifying a nested option with an environment variable overrides _all_ the nested options specified under the config option. The exception to this rule is the `proxy` config option. Reference the [Agent proxy documentation][2] for more details.

### Exceptions

* For the collection Agents (APM, process, and logs), drop the `_config` in the option name, for example:
    ```yaml
      apm_config:
        enabled: true
      # DD_APM_ENABLED=true
    ```

* Not all `datadog.yaml` options are available with environment variables. Refer to [config.go][3] in the Datadog Agent GitHub repo. Options with environment variables start with `config.BindEnv*`.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-main-configuration-file
[2]: /agent/proxy/?tab=agentv6#environment-variables
[3]: https://github.com/DataDog/datadog-agent/blob/master/pkg/config/config.go
