---
title: Agent Environment Variables
description: Configure Datadog Agent settings using environment variables as an alternative to datadog.yaml, including naming conventions and systemd usage.
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
  - link: "/agent/configuration/proxy/#environment-variables"
    tag: "Documentation"
    text: "Proxy environment variables"
---

<div class="alert alert-danger">
For Agent v5, reference the <a href="https://github.com/DataDog/docker-dd-agent#environment-variables">Docker Agent GitHub repo</a>.
</div>

## Overview

For Agent v6, most of the configuration options in the [Agent's main configuration file][1] (`datadog.yaml`) can be set through environment variables.

## Recommendations

As a best practice, Datadog recommends using unified service tagging when assigning tags. Unified service tagging ties Datadog telemetry together through the use of three standard tags: `env`, `service`, and `version`. To learn how to configure your environment with unified tagging, see the [unified service tagging documentation][2].

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
      container_env_as_tags:
        ENVVAR_NAME: tag_name
      # DD_CONTAINER_ENV_AS_TAGS='{"ENVVAR_NAME": "tag_name"}'
   ```

### Property definition priority

- If a property is defined in both the global configuration file (`datadog.yaml`) and as an environment variable, the environment variable takes precedence.
- Specifying a nested option with an environment variable overrides _all_ the nested options specified under the config option. The exception to this rule is the `proxy` config option. Reference the [Agent proxy documentation][3] for more details.

### Exceptions

- Not all `datadog.yaml` options are available with environment variables. See the [core_schema.yaml][4] configuration schema in the Datadog Agent GitHub repo. Settings tagged `no-env` in the schema don't support environment variables.

  For earlier Agent versions, the configuration source moved between locations:

  | Agent version       | Configuration source                                                          |
  | -------------------- | ------------------------------------------------------------------------------ |
  | 7.51 through 7.83    | `*_settings.go` files under [pkg/config/setup on the 7.83.x branch][14]        |
  | 7.50 and earlier     | [config.go on the 7.50.x branch][9]                                            |

- Component-specific environment variables not listed in [core_schema.yaml][4] may also be supported:

  | Component              | Configuration source                        | Agent 7.51–7.83                                                | Agent 7.50 and earlier                              |
  | ----------------------- | -------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
  | APM Trace Agent          | [apm_config.yaml][6], [Docker APM Agent Environment Variables][5] | `apm_settings.go` in [pkg/config/setup on the 7.83.x branch][14] | `apm.go` in [pkg/config on the 7.50.x branch][15]    |
  | Live Process Agent       | [process_config.yaml][7]                     | `process_settings.go` in [pkg/config/setup on the 7.83.x branch][14] | `process.go` in [pkg/config on the 7.50.x branch][15] |
  | OTLP Ingest              | [core_schema.yaml (otlp_config)][10]         | `otlp_settings.go` in [pkg/config/setup on the 7.83.x branch][14] | `otlp.go` in [pkg/config on the 7.50.x branch][15]   |
  | System Probe             | [system-probe_schema.yaml][11]               | `system_probe_settings.go` in [pkg/config/setup on the 7.83.x branch][14] | `system_probe.go` in [pkg/config on the 7.50.x branch][15] |
  | Private Action Runner    | [private_action_runner.yaml][12]             | `privateactionrunner_settings.go` in [pkg/config/setup on the 7.83.x branch][14] | Not available                                       |
  | Multi-Region Failover    | [multi_region_failover.yaml][13]             | `multi_region_failover_settings.go` in [pkg/config/setup on the 7.83.x branch][14] | Not available                                       |

  APM Trace Agent example:

  ```yaml
     apm_config:
         enabled: true
         env: dev
     # DD_APM_ENABLED=true
     # DD_APM_ENV=dev
  ```

  Live Process Agent example:

  ```yaml
     process_config:
         process_collection:
             enabled: true
         process_dd_url: https://process.datadoghq.com
     # DD_PROCESS_AGENT_PROCESS_COLLECTION_ENABLED=true
     # DD_PROCESS_AGENT_URL=https://process.datadoghq.com
  ```

## Using environment variables in systemd units

In operating systems that uses systemd to manage services, environment variables—global (for example, `/etc/environment`) or session-based (for example, `export VAR=value`)—are not generally made available to services unless configured to do so. See [systemd Exec manual page][8] for more details.

From Datadog Agent 7.45, the Datadog Agent service (`datadog-agent.service` unit) can optionally load environment variables assignments from a file (`<ETC_DIR>/environment`).

1. Create `/etc/datadog-agent/environment` if it does not exist.
2. Define newline-separated environment variable assignments. Example:
  ```
  GODEBUG=x509ignoreCN=0,x509sha1=1
  DD_HOSTNAME=myhost.local
  DD_TAGS=env:dev service:foo
  ```
3. Restart the service for changes to take effect

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/configuration/agent-configuration-files/#agent-main-configuration-file
[2]: /getting_started/tagging/unified_service_tagging
[3]: /agent/configuration/proxy/#environment-variables
[4]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/core_schema.yaml
[5]: https://docs.datadoghq.com/agent/docker/apm/#docker-apm-agent-environment-variables
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/apm_config.yaml
[7]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/process_config.yaml
[8]: https://www.freedesktop.org/software/systemd/man/systemd.exec.html#Environment
[9]: https://github.com/DataDog/datadog-agent/blob/7.50.x/pkg/config/config.go
[10]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/core_schema.yaml
[11]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/system-probe_schema.yaml
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/private_action_runner.yaml
[13]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/schema/yaml/multi_region_failover.yaml
[14]: https://github.com/DataDog/datadog-agent/tree/7.83.x/pkg/config/setup
[15]: https://github.com/DataDog/datadog-agent/tree/7.50.x/pkg/config
