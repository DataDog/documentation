---
title: Autodiscovery with JMX
kind: guide
further_reading:
- link: "/agent/autodiscovery/integrations"
  tag: "Documentation"
  text: "Create and load an Autodiscovery Integration Template"
- link: "/agent/autodiscovery/ad_identifiers"
  tag: "Documentation"
  text: "Match a container with the corresponding Integration Template"
- link: "/agent/autodiscovery/management"
  tag: "Documentation"
  text: "Manage which Container to include in the Agent Autodiscovery"
- link: "/agent/autodiscovery/tag"
  tag: "Documentation"
  text: "Dynamically assign and collect tags from your application"
---

JMX-based integration configurations used by the Datadog Agent can be too big to fit within Autodiscovery labels/annotations. Use [Autodiscovery Container Identifiers][1].

The Datadog-Kafka integration example below leverages JMX to collect metrics and the Datadog Agent to send them to Datadog.

### Agent preparation

{{< tabs >}}
{{% tab "Host Agent" %}}

1. Enable the Kafka integration by renaming `conf.yaml.example` into `conf.yaml` in the [Kafka integration directory][1]: `/etc/datadog-agent/conf.d/kafka.d`

2. Replace the parameters values from `conf.yaml` to fit the Agent Autodiscovery logic:
    The configuration files have host parameter values by default. If you are using the Agent with Autodiscovery, use the [Autodiscovery Template Variables][2] instead.
    In the following example, change the `host` parameter value from `localhost` to `%%host%%`:

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

3. To specify to the Agent that you want to apply this configuration file to your Kafka containers, configure an `ad_identifiers` parameter at the beginning of your `conf.yaml` file:

    ```yaml
      ad_identifiers:
        - CUSTOM_AD_IDENTIFIER

      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

    **Note**: The example above uses a custom `ad_identifers` value, but you can specify the [container short image][3] as `ad_identifiers` if needed.

4. [Enable Autodiscovery for your Agent][4].

[1]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /agent/autodiscovery/template_variables
[3]: https://docs.datadoghq.com/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[4]: /agent/autodiscovery/?tab=agent#docker-autodiscovery
{{% /tab %}}
{{% tab "Containerized Agent" %}}

1. Get the configuration files `conf.yaml` and `metrics.yaml` associated to the Datadog-Kafka integration. They can be found in your [integrations configuration directory][1]. Find below the list of JMX based integration with their associated files:

    | Integration             | Metrics file       | Configuration file      |
    |-------------------------|--------------------|-------------------------|
    | [ActiveMq][2]           | [metrics.yaml][3]  | [conf.yaml.example][4]  |
    | [Cassandra][5]          | [metrics.yaml][6]  | [conf.yaml.example][7]  |
    | [Confluent Platform][5] | [metrics.yaml][29] | [conf.yaml.example][30]  |
    | [Hive][8]               | [metrics.yaml][9]  | [conf.yaml.example][10] |
    | [Jboss Wildfly][11]     | [metrics.yaml][12] | [conf.yaml.example][13] |
    | [Kafka][14]             | [metrics.yaml][15] | [conf.yaml.example][16] |
    | [Solr][17]              | [metrics.yaml][18] | [conf.yaml.example][19] |
    | [Presto][20]            | [metrics.yaml][21] | [conf.yaml.example][22] |
    | [Tomcat][23]            | [metrics.yaml][24] | [conf.yaml.example][25] |

2. Rename `conf.yaml.example` into `conf.yaml`.
3. Replace the parameter values from `conf.yaml` to fit the Agent Autodiscovery logic:
     The configuration files have host parameter values by default. If you are using the Agent with Autodiscovery, use the [Autodiscovery Template Variables][26] instead.
    In the following example, change the `host` parameter value from `localhost` to `%%host%%`:

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

4. To specify to the Agent that you want to apply this configuration file to your Kafka containers, configure an `ad_identifiers` parameter at the beginning of your `conf.yaml` file:

    ```yaml
      ad_identifiers:
        - CUSTOM_AD_IDENTIFIER

      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

    **Note**: The example above uses a custom `ad_identifers` value, but you can specify the [container short image][27] as `ad_identifiers` if needed.

5. [After enabling Autodiscovery for your Agent][28], mount those configuration files (`conf.yaml` and `metrics.yaml`) in your Agent in the `conf.d/kafka.d/` folder.
6. (Optional) - If you can't mount those files in the Agent container (like on AWS ECS), you should re-build the Agent docker image with those two configuration files in it:

    ```conf
    FROM datadog/agent:latest
    COPY <PATH_JMX_CONF_FILE> conf.d/kafka.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/kafka.d/
    ```

    Then use this new custom image as the regular containerized Agent.

[1]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /integrations/activemq
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[5]: /integrations/cassandra
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[8]: /integrations/hive
[9]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[11]: /integrtions/jboss_wildfly
[12]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[14]: /integrations/kafka
[15]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[17]: /integrations/solr
[18]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[20]: /integrations/presto
[21]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[22]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[23]: /integrations/tomcat
[24]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[26]: /agent/autodiscovery/template_variables
[27]: https://docs.datadoghq.com/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[28]: /agent/autodiscovery/?tab=containerizedagent#docker-autodiscovery
[29]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[30]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
{{% /tab %}}
{{< /tabs >}}

### Container Preparation

Once the Agent is configured and running, use the `com.datadoghq.ad.check.id: CUSTOM_AD_IDENTIFIER` label/annotations for your Kafka container to apply the check configuration through Autodiscovery:

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
  name: '<POD_NAME>'
  annotations:
    ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: 'CUSTOM_AD_IDENTIFIER'
    # (...)
spec:
  containers:
    - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

**Note**:

* To apply a specific configuration to a given container, Autodiscovery identifies containers by **name**, _not_ by image. It tries to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`
* If you define your Kubernetes pods directly with `kind: Pod`, add each pod's annotations directly under its `metadata` section. If you define pods indirectly with replication controllers, ReplicaSets, or deployments, add pod annotations under `.spec.template.metadata`.

{{% /tab %}}
{{% tab "Docker" %}}

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check.id"= 'CUSTOM_AD_IDENTIFIER'
```

**docker-compose.yaml**:

```yaml
labels:
  com.datadoghq.ad.check.id: CUSTOM_AD_IDENTIFIER
```

**docker run command**:

```shell
-l com.datadoghq.ad.check.id= 'CUSTOM_AD_IDENTIFIER'
```

**Docker Swarm**:

When using Swarm mode for Docker Cloud, labels must be applied to the image:

```yaml
version: "1.0"
services:
...
  project:
    image: '<IMAGE_NAME>'
    labels:
      com.datadoghq.ad.check.id: CUSTOM_AD_IDENTIFIER
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery/ad_identifiers
