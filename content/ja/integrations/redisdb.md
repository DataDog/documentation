---
"app_id": "redis"
"app_uuid": "15f0ff37-2b36-4165-9606-758271d4a16d"
"assets":
  "dashboards":
    "redis": "assets/dashboards/overview.json"
  "integration":
    "auto_install": true
    "configuration":
      "spec": "assets/configuration/spec.yaml"
    "events":
      "creates_events": false
    "metrics":
      "check": "redis.net.clients"
      "metadata_path": "metadata.csv"
      "prefix": "redis."
    "process_signatures":
    - "redis-server"
    "service_checks":
      "metadata_path": "assets/service_checks.json"
    "source_type_id": !!int "21"
    "source_type_name": "Redis"
  "monitors":
    "[Redis] High memory consumption": "assets/monitors/high_mem.json"
  "saved_views":
    "error_warning_status": "assets/saved_views/error_warning_status.json"
    "pid_overview": "assets/saved_views/pid_overview.json"
    "redis_pattern": "assets/saved_views/redis_pattern.json"
    "redis_processes": "assets/saved_views/redis_processes.json"
"author":
  "homepage": "https://www.datadoghq.com"
  "name": "Datadog"
  "sales_email": "info@datadoghq.com"
  "support_email": "help@datadoghq.com"
"categories":
- "caching"
- "data stores"
- "log collection"
- "tracing"
"custom_kind": "integration"
"dependencies":
- "https://github.com/DataDog/integrations-core/blob/master/redisdb/README.md"
"display_on_public_website": true
"draft": false
"git_integration_title": "redisdb"
"integration_id": "redis"
"integration_title": "Redis"
"integration_version": "5.5.0"
"is_public": true
"manifest_version": "2.0.0"
"name": "redisdb"
"public_title": "Redis"
"short_description": "Track redis performance, memory use, blocked clients, evicted keys, and more."
"supported_os":
- "linux"
- "windows"
- "macos"
"tile":
  "changelog": "CHANGELOG.md"
  "classifier_tags":
  - "Category::Caching"
  - "Category::Data Stores"
  - "Category::Log Collection"
  - "Category::Tracing"
  - "Supported OS::Linux"
  - "Supported OS::Windows"
  - "Supported OS::macOS"
  "configuration": "README.md#Setup"
  "description": "Track redis performance, memory use, blocked clients, evicted keys, and more."
  "media": []
  "overview": "README.md#Overview"
  "support": "README.md#Support"
  "title": "Redis"
---

<!--  SOURCED FROM https://github.com/DataDog/integrations-core -->


## Overview

Whether you use Redis as a database, cache, or message queue, this integration tracks problems with your Redis servers, cloud service, and the parts of your infrastructure they serve. Use the Datadog Agent's Redis check to collects metrics related to:

- Performance
- Memory usage
- Blocked clients
- Secondary connections
- Disk persistence
- Expired and evicted keys
- and many more

## Setup

### Installation

The Redis check is included in the [Datadog Agent][1] package, so you don't need to install anything else on your Redis servers.

### Configuration

{{< tabs >}}
{{% tab "Host" %}}

#### Host

To configure this check for an Agent running on a host:

##### Metric collection

1. Edit the `redisdb.d/conf.yaml` file, in the `conf.d/` folder at the root of your [Agent's configuration directory][1]. The following parameters may require updating. See the [sample redisdb.d/conf.yaml][2] for all available configuration options.

   ```yaml
   init_config:
   instances:
     ## @param host - string - required
     ## Enter the host to connect to.
     - host: localhost
       ## @param port - integer - required
       ## Enter the port of the host to connect to.
       port: 6379

       ## @param username - string - optional
       ## The username to use for the connection. Redis 6+ only.
       #
       # username: <USERNAME>

       ## @param password - string - optional
       ## The password to use for the connection.
       #
       # password: <PASSWORD>
   ```

2. If using Redis 6+ and ACLs, ensure that the user has at least `DB  Viewer` permissions at the Database level, `Cluster Viewer` permissions if operating in a cluster environment, and `+config|get +info +slowlog|get` ACL rules. For more details, see [Database access control][3].

3. [Restart the Agent][4].

##### Log collection

_Available for Agent versions >6.0_

1. Collecting logs is disabled by default in the Datadog Agent, enable it in your `datadog.yaml` file:

   ```yaml
   logs_enabled: true
   ```

2. Uncomment and edit this configuration block at the bottom of your `redisdb.d/conf.yaml`:

   ```yaml
   logs:
     - type: file
       path: /var/log/redis_6379.log
       source: redis
       service: myapplication
   ```

    Change the `path` and `service` parameter values and configure them for your environment. See the [sample redisdb.yaml][2] for all available configuration options.

3. [Restart the Agent][4].

##### Trace collection

Datadog APM integrates with Redis to see the traces across your distributed system. Trace collection is enabled by default in the Datadog Agent v6+. To start collecting traces:

1. [Enable trace collection in Datadog][5].
2. [Instrument your application that makes requests to Redis][6].


[1]: https://docs.datadoghq.com/agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/redisdb/datadog_checks/redisdb/data/conf.yaml.example
[3]: https://docs.redis.com/latest/rs/security/passwords-users-roles/
[4]: https://docs.datadoghq.com/agent/guide/agent-commands/#start-stop-and-restart-the-agent
[5]: https://docs.datadoghq.com/tracing/send_traces/
[6]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "Docker" %}}

#### Docker

To configure this check for an Agent running on a container:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as Docker labels on your application container:

```yaml
LABEL "com.datadoghq.ad.check_names"='["redisdb"]'
LABEL "com.datadoghq.ad.init_configs"='[{}]'
LABEL "com.datadoghq.ad.instances"='[{"host":"%%host%%","port":"6379","password":"%%env_REDIS_PASSWORD%%"}]'
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be set on the Agent container. See the [Autodiscovery Template Variable][2] documentation for more details. Alternatively, the Agent can leverage the `secrets` package to work with any [secrets management][3] backend (such as HashiCorp Vault or AWS Secrets Manager).

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Docker Log Collection][4].

Then, set [Log Integrations][5] as Docker labels:

```yaml
LABEL "com.datadoghq.ad.logs"='[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
```

##### Trace collection

APM for containerized apps is supported on Agent v6+ but requires extra configuration to begin collecting traces.

Required environment variables on the Agent container:

| Parameter            | Value                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

See [Tracing Docker Applications][6] for a complete list of available environment variables and configuration.

Then, [instrument your application container that makes requests to Redis][7] and set `DD_AGENT_HOST` to the name of your Agent container.


[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#installation
[5]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "Kubernetes" %}}

#### Kubernetes

To configure this check for an Agent running on Kubernetes:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as pod annotations on your application container. Aside from this, templates can also be configured using a [file, configmap, or key-value store][2].

**Annotations v1** (for Datadog Agent < v7.36)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.check_names: '["redisdb"]'
    ad.datadoghq.com/redis.init_configs: '[{}]'
    ad.datadoghq.com/redis.instances: |
      [
        {
          "host": "%%host%%",
          "port":"6379",
          "password":"%%env_REDIS_PASSWORD%%"
        }
      ]
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Annotations v2** (for Datadog Agent v7.36+)

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.checks: |
      {
        "redisdb": {
          "init_config": {},
          "instances": [
            {
              "host": "%%host%%",
              "port":"6379",
              "password":"%%env_REDIS_PASSWORD%%"
            }
          ]
        }
      }
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be set on the Agent container. See the [Autodiscovery Template Variable][3] documentation. Alternatively, the Agent can leverage the `secrets` package to work with any [secrets management][4] backend (such as HashiCorp Vault or AWS Secrets Manager).

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [Kubernetes Log Collection][5].

Then, set [Log Integrations][6] as pod annotations. This can also be configure using a [file, configmap, or key-value store][7].

**Annotations v1/v2**

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: redis
  annotations:
    ad.datadoghq.com/redis.logs: '[{"source":"redis","service":"<YOUR_APP_NAME>"}]'
  labels:
    name: redis
spec:
  containers:
    - name: redis
      image: redis:latest
      ports:
        - containerPort: 6379
```

##### Trace collection

APM for containerized apps is supported on hosts running Agent v6+ but requires extra configuration to begin collecting traces.

Required environment variables on the Agent container:

| Parameter            | Value                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

See [Tracing Kubernetes Applications][8] and the [Kubernetes Daemon Setup][9] for a complete list of available environment variables and configuration.

Then, [instrument your application container that makes requests to Redis][10].

[1]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes
[2]: https://docs.datadoghq.com/agent/kubernetes/integrations/?tab=kubernetes#configuration
[3]: https://docs.datadoghq.com/agent/faq/template_variables/
[4]: https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux
[5]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=containerinstallation#setup
[6]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[7]: https://docs.datadoghq.com/agent/kubernetes/log/?tab=daemonset#configuration
[8]: https://docs.datadoghq.com/agent/kubernetes/apm/?tab=java
[9]: https://docs.datadoghq.com/agent/kubernetes/daemonset_setup/?tab=k8sfile#apm-and-distributed-tracing
[10]: https://docs.datadoghq.com/tracing/setup/
{{% /tab %}}
{{% tab "ECS" %}}

#### ECS

To configure this check for an Agent running on ECS:

##### Metric collection

Set [Autodiscovery Integrations Templates][1] as Docker labels on your application container:

```json
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.check_names": "[\"redisdb\"]",
      "com.datadoghq.ad.init_configs": "[{}]",
      "com.datadoghq.ad.instances": "[{\"host\":\"%%host%%\",\"port\":\"6379\",\"password\":\"%%env_REDIS_PASSWORD%%\"}]"
    }
  }]
}
```

**Note**: The `"%%env_<ENV_VAR>%%"` template variable logic is used to avoid storing the password in plain text, hence the `REDIS_PASSWORD` environment variable must be set on the Agent container. See the [Autodiscovery Template Variable][2] documentation. Alternatively, the Agent can leverage the `secrets` package to work with any [secrets management][3] backend (such as HashiCorp Vault or AWS Secrets Manager).

##### Log collection

_Available for Agent versions >6.0_

Collecting logs is disabled by default in the Datadog Agent. To enable it, see [ECS Log Collection][4].

Then, set [Log Integrations][5] as Docker labels:

```yaml
{
  "containerDefinitions": [{
    "name": "redis",
    "image": "redis:latest",
    "dockerLabels": {
      "com.datadoghq.ad.logs": "[{\"source\":\"redis\",\"service\":\"<YOUR_APP_NAME>\"}]"
    }
  }]
}
```

##### Trace collection

APM for containerized apps is supported on Agent v6+ but requires extra configuration to begin collecting traces.

Required environment variables on the Agent container:

| Parameter            | Value                                                                      |
| -------------------- | -------------------------------------------------------------------------- |
| `<DD_API_KEY>` | `api_key`                                                                  |
| `<DD_APM_ENABLED>`      | true                                                              |
| `<DD_APM_NON_LOCAL_TRAFFIC>`  | true |

See [Tracing Docker Applications][6] for a complete list of available environment variables and configuration.

Then, [instrument your application container that makes requests to Redis][7] and set `DD_AGENT_HOST` to the [EC2 private IP address][8].

[1]: https://docs.datadoghq.com/agent/docker/integrations/?tab=docker
[2]: https://docs.datadoghq.com/agent/faq/template_variables/
[3]: https://docs.datadoghq.com/agent/guide/secrets-management/?tab=linux
[4]: https://docs.datadoghq.com/agent/amazon_ecs/logs/?tab=linux
[5]: https://docs.datadoghq.com/agent/docker/log/?tab=containerinstallation#log-integrations
[6]: https://docs.datadoghq.com/agent/docker/apm/?tab=linux
[7]: https://docs.datadoghq.com/tracing/setup/
[8]: https://docs.datadoghq.com/agent/amazon_ecs/apm/?tab=ec2metadataendpoint#setup
{{% /tab %}}
{{< /tabs >}}

### Validation

[Run the Agent's status subcommand][2] and look for `redisdb` under the Checks section.

## Data Collected

### Metrics
{{< get-metrics-from-git "redisdb" >}}


### Events

The Redis check does not include any events.

### Service Checks
{{< get-service-checks-from-git "redisdb" >}}


## Troubleshooting

### Agent cannot connect

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'Error 111 connecting to localhost:6379. Connection refused.'
      - Collected 0 metrics, 0 events & 1 service check
```

Check that the connection info in `redisdb.yaml` is correct.

### Agent cannot authenticate

```shell
    redisdb
    -------
      - instance #0 [ERROR]: 'NOAUTH Authentication required.'
      - Collected 0 metrics, 0 events & 1 service check
```

Configure a `password` in `redisdb.yaml`.

## Further Reading

Additional helpful documentation, links, and articles:

- [How to monitor Redis performance metrics][3]


[1]: https://app.datadoghq.com/account/settings/agent/latest
[2]: https://docs.datadoghq.com/agent/guide/agent-commands/#agent-status-and-information
[3]: https://www.datadoghq.com/blog/how-to-monitor-redis-performance-metrics
