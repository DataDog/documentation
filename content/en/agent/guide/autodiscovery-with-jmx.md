---
title: Autodiscovery with JMX
kind: guide
further_reading:
    - link: '/agent/kubernetes/integrations'
      tag: 'Documentation'
      text: 'Create and load an Autodiscovery Integration Template'
    - link: '/agent/guide/ad_identifiers'
      tag: 'Documentation'
      text: 'Match a container with the corresponding Integration Template'
    - link: '/agent/kubernetes/management'
      tag: 'Documentation'
      text: 'Manage which Container to include in the Agent Autodiscovery'
    - link: '/agent/kubernetes/tag'
      tag: 'Documentation'
      text: 'Dynamically assign and collect tags from your application'
---

To collect JMX metrics from your pod in kubernetes, you can leverage [integrations autodiscovery annotations](#autodiscovery-annotations) or use [Autodiscovery Container Identifiers](#autodiscovery-container-identifiers) if your JMX check configuration is too long to fit in annotations.

## Autodiscovery annotations

The autodiscovery annotations logic consists in applying the JMX check configuration elemetents to your pod through annotations in order to allow the Agent to "automatically discover" them and configure its JMX check accordingly:

1. [Launch the Agent in your Kubernetes cluster][1]

2. Apply the Autodiscovery annotations to the containers containing your JMX-application:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
        name: <POD_NAME>
        annotations:
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.names: \
              '["<INTEGRATION_NAME>"]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: \
              '[{"is_jmx": true, "collect_default_metrics": true}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: \
              '[{"host": "%%host%%","port":"<JMX_PORT>"}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: \
              '[{"source":"<INTEGRATION_NAME>","service":"<INTEGRATION_NAME>"}]'
        # (...)

    spec:
        containers:
            - name: '<CONTAINER_IDENTIFIER>'
            # (...)
    ```

The list of JMX-ready integrations name are:

- [activemq][2]
- [cassandra][3]
- [confluent_platform][4]
- [hive][5]
- [jboss_wildfly][6]
- [kafka][7]
- [solr][8]
- [presto][9]
- [tomcat][10]

For instance if you have a tomcat running exposing its JMX metrics on port `9012` you would do:

```yaml
apiVersion: v1
kind: Pod
metadata:
    name: tomcat-test
    annotations:
        ad.datadoghq.com/tomcat.check.names: \
          '["tomcat"]'
        ad.datadoghq.com/tomcat.init_configs: \
          '[{"is_jmx": true, "collect_default_metrics": true}]'
        ad.datadoghq.com/tomcat.instances: \
          '[{"host": "%%host%%","port":"9012"}]'
        ad.datadoghq.com/tomcat.logs: \
          '[{"source":"Tomcat","service":"Tomcat"}]'

spec:
    containers:
        - name: tomcat
          image: tomcat:8.0
          imagePullPolicy: Always
          ports:
              - containerPort: 9012
```

## Autodiscovery Container Identifiers

If you need to pass a more complex configuration for your JMX check, leverage [Autodiscovery Container Identifiers][11] to pass custom check configuration file or custom `metrics.yaml` file.

### Agent preparation

Choose wether your Agent is running as a container in your cluster, or on your host directly:

{{< tabs >}}
{{% tab "Container Agent" %}}

JMX-based integration configurations used by the Datadog Agent can be too big to fit within Autodiscovery labels/annotations. Use [Autodiscovery Container Identifiers][1].

1. Get the configuration files `conf.yaml` and `metrics.yaml` associated to your integration. They can be found in your [integrations configuration directory][1]. Find below the list of Datadog-JMX based integration with their associated files:

    | Integration Name             | Metrics file       | Configuration file      |
    | ----------------------- | ------------------ | ----------------------- |
    | [activemq][2]           | [metrics.yaml][3]  | [conf.yaml.example][4]  |
    | [cassandra][5]          | [metrics.yaml][6]  | [conf.yaml.example][7]  |
    | [confluent_platform][8] | [metrics.yaml][9]  | [conf.yaml.example][10] |
    | [hive][11]              | [metrics.yaml][12] | [conf.yaml.example][13] |
    | [jboss_wildfly][14]     | [metrics.yaml][15] | [conf.yaml.example][16] |
    | [kafka][17]             | [metrics.yaml][18] | [conf.yaml.example][19] |
    | [solr][20]              | [metrics.yaml][21] | [conf.yaml.example][22] |
    | [presto][23]            | [metrics.yaml][24] | [conf.yaml.example][25] |
    | [tomcat][17]            | [metrics.yaml][26] | [conf.yaml.example][27] |

2. Rename the `conf.yaml.example` file into `conf.yaml`.

3. Replace the parameter values from `conf.yaml` to fit the Agent Autodiscovery logic. The configuration files have host parameter values by default, use the [Autodiscovery Template Variables][28] logic instead. In the following Tomcat check example, the `host` parameter value is changed from `localhost` to `%%host%%`:

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

4. To specify to the Agent that you want to apply this configuration file to your application containers, configure an `ad_identifiers` parameter at the beginning of your `conf.yaml` file:

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **Note**: The example above uses a custom `ad_identifers` value, but you can specify the [container short image][29] as `ad_identifiers` if needed.

5. Mount those configuration files (`conf.yaml` and `metrics.yaml`) in your Agent in the `conf.d/<INTEGRATION_NAME>.d/` folder.

6. (Optional) - If you can't mount those files in the Agent container (like on AWS ECS), you should re-build the Agent docker image with those two configuration files in it:

    ```conf
    FROM datadog/agent:latest
    COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
    ```

     Then use this new custom image as the regular containerized Agent.


[1]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[2]: /integrations/activemq
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[4]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[5]: /integrations/cassandra
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[7]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[8]: /integrations/confluent_platform
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[10]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[11]: /integrations/hive
[12]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[13]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[14]: /integrations/jboss_wildfly
[15]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[16]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[17]: /integrations/tomcat
[18]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/kafka/data/metrics.yaml
[19]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/kafka/data/conf.yaml.example
[20]: /integrations/solr
[21]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[22]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[23]: /integrations/presto
[24]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[25]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[26]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[27]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[28]: /agent/faq/template_variables
[29]: /agent/guide/ad_identifiers/#short-image-container-identifiers
{{% /tab %}}
{{% tab "Host Agent" %}}

If your Agent is running on a host and you want to autodiscover your container to collect JMX metrics:

1. [Enable autodiscovery for your Agent][1]

2. Enable the JMX integration you want to enable by renaming `conf.yaml.example` into `conf.yaml` in the [integration directory][2]. For instance for tomcat you would rename `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml.example` into: `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

3. Replace the parameters values from `conf.yaml` file to fit the Agent Autodiscovery logic. The configuration files have host parameter values by default, use the [Autodiscovery Template Variables][3] instead. In the following Tomcat configuration example, the `host` parameter value is changed from `localhost` to `%%host%%`:

    ```yaml
    init_config:
        ## @param is_jmx - boolean - required
        ## Whether or not this file is a configuration for a JMX integration.
        #
        is_jmx: true

        ## @param collect_default_metrics - boolean - required
        ## Whether or not the check should collect all default metrics.
        #
        collect_default_metrics: true

    instances:
        ## @param host - string - required
        ## Tomcat JMX hostname to connect to.
        #
        - host: '%%host%%'

          ## @param port - integer - required
          ## Tomcat JMX port to connect to.
          #
          port: 9012
    ```

4. To specify to the Agent that you want to apply this configuration file to your application containers, configure an `ad_identifiers` parameter at the beginning of your `conf.yaml` file:

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **Note**: The example above uses a custom `ad_identifers` value, but you can specify the [container short image][4] as `ad_identifiers` if needed.

5. [Restart your Agent][5]


[1]: /getting_started/agent/autodiscovery/#with-the-agent-on-a-host
[2]: /agent/guide/agent-configuration-files/#agent-configuration-directory
[3]: /agent/faq/template_variables
[4]: /agent/guide/ad_identifiers/#short-image-container-identifiers
[5]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Container Preparation

Once the Agent is configured and running, use the `com.datadoghq.ad.check.id:"<CUSTOM_AD_IDENTIFIER>"` label/annotations for your application container to apply the check configuration through Autodiscovery:

{{< tabs >}}
{{% tab "Kubernetes" %}}

```yaml
apiVersion: v1
kind: Pod
# (...)
metadata:
    name: '<POD_NAME>'
    annotations:
        ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check.id: '<CUSTOM_AD_IDENTIFIER>'
        # (...)
spec:
    containers:
        - name: '<CONTAINER_IDENTIFIER>'
# (...)
```

**Note**:

- To apply a specific configuration to a given container, Autodiscovery identifies containers by **name**, _not_ by image. It tries to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`
- If you define your Kubernetes pods directly with `kind: Pod`, add each pod's annotations directly under its `metadata` section. If you define pods indirectly with replication controllers, ReplicaSets, or deployments, add pod annotations under `.spec.template.metadata`.

{{% /tab %}}
{{% tab "Docker" %}}

**Dockerfile**:

```yaml
LABEL "com.datadoghq.ad.check.id"= '<CUSTOM_AD_IDENTIFIER>'
```

**docker-compose.yaml**:

```yaml
labels:
    com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

**docker run command**:

```shell
-l com.datadoghq.ad.check.id= '<CUSTOM_AD_IDENTIFIER>'
```

**Docker Swarm**:

When using Swarm mode for Docker Cloud, labels must be applied to the image:

```yaml
version: '1.0'
services:
# ...
project:
    image: '<IMAGE_NAME>'
    labels:
        com.datadoghq.ad.check.id: '<CUSTOM_AD_IDENTIFIER>'
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/
[2]: /integrations/activemq
[3]: /integrations/cassandra
[4]: /integrations/confluent_platform
[5]: /integrations/hive
[6]: /integrations/jboss_wildfly
[7]: /integrations/kafka
[8]: /integrations/solr
[9]: /integrations/presto
[10]: /integrations/tomcat
[11]: /agent/guide/ad_identifiers/
