---
title: Autodiscovery with JMX
kind: guide
further_reading:
    - link: '/agent/kubernetes/integrations/'
      tag: 'Documentation'
      text: 'Create and load an Autodiscovery integration template'
    - link: '/agent/guide/ad_identifiers/'
      tag: 'Documentation'
      text: 'Match a container with the corresponding integration template'
    - link: '/agent/guide/autodiscovery-management/'
      tag: 'Documentation'
      text: 'Manage which container to include in the Agent Autodiscovery'
    - link: '/agent/kubernetes/tag/'
      tag: 'Documentation'
      text: 'Dynamically assign and collect tags from your application'
---

Leverage integrations autodiscovery annotations or use Autodiscovery Container Identifiers to collect your JMX-applications metrics from your pods in Kubernetes. Autodiscovery annotations is the recommended way to configure your Datadog-JMX integration, if the set of configuration parameters is too long to fit in annotations, use the [Autodiscovery Container Identifiers](#autodiscovery-container-identifiers) method.

## Autodiscovery annotations

The autodiscovery annotations logic consists in applying the JMX check configuration elements, through annotations, to your pod in order to allow the Agent to "automatically discover" them and configure its JMX check accordingly:

1. [Launch the Agent in your Kubernetes cluster][1] **with the `gcr.io/datadoghq/agent:latest-jmx` image name** instead of the regular `gcr.io/datadoghq/agent:latest`.

2. Apply the Autodiscovery annotations to the containers containing your JMX-application:

    ```yaml
    apiVersion: v1
    kind: Pod
    metadata:
        name: <POD_NAME>
        annotations:
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.check_names: '["<INTEGRATION_NAME>"]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances: '[{"host": "%%host%%","port":"<JMX_PORT>"}]'
            ad.datadoghq.com/<CONTAINER_IDENTIFIER>.logs: '[{"source":"<INTEGRATION_NAME>","service":"<INTEGRATION_NAME>"}]'
        # (...)

    spec:
        containers:
            - name: '<CONTAINER_IDENTIFIER>'
            # (...)
              env:
              - name: POD_IP
                valueFrom:
                  fieldRef:
                    fieldPath: status.podIP

              - name: JAVA_OPTS
                value: >-
                  -Xms256m -Xmx6144m
                  -Dcom.sun.management.jmxremote
                  -Dcom.sun.management.jmxremote.authenticate=false
                  -Dcom.sun.management.jmxremote.ssl=false
                  -Dcom.sun.management.jmxremote.local.only=false
                  -Dcom.sun.management.jmxremote.port=<JMX_PORT>
                  -Dcom.sun.management.jmxremote.rmi.port=<JMX_PORT>
                  -Djava.rmi.server.hostname=$(POD_IP)
    ```

      The `JAVA_OPTS` environment variable needs to be created, so that your JMX server allows the agent to connect to the RMI registry.

      **Note**:
      - `<JMX_PORT>` references the port that exposes JMX metrics.
      - In the example above, the connection to the RMI registry is not in SSL if you want to use SSL, use `"rmi_registry_ssl": true` in the `ad.datadoghq.com/<CONTAINER_IDENTIFIER>.instances` annotation and remove the corresponding `Dcom.sun.management.jmxremote` from `JAVA_OPTS`.

The list of JMX-ready integrations name `<INTEGRATION_NAME>` are:

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
        ad.datadoghq.com/tomcat.check_names: '["tomcat"]'
        ad.datadoghq.com/tomcat.init_configs: '[{"is_jmx": true, "collect_default_metrics": true}]'
        ad.datadoghq.com/tomcat.instances: '[{"host": "%%host%%","port":"9012"}]'
        ad.datadoghq.com/tomcat.logs: '[{"source":"Tomcat","service":"Tomcat"}]'

spec:
    containers:
        - name: tomcat
          image: tomcat:8.0
          imagePullPolicy: Always
          ports:
              - containerPort: 9012
          env:
            - name: POD_IP
              valueFrom:
                fieldRef:
                  fieldPath: status.podIP

            - name: JAVA_OPTS
              value: >-
                -Xms256m -Xmx6144m
                -Dcom.sun.management.jmxremote
                -Dcom.sun.management.jmxremote.authenticate=false
                -Dcom.sun.management.jmxremote.ssl=false
                -Dcom.sun.management.jmxremote.local.only=false
                -Dcom.sun.management.jmxremote.port=9012
                -Dcom.sun.management.jmxremote.rmi.port=9012
                -Djava.rmi.server.hostname=$(POD_IP)
```

## Autodiscovery container identifiers

If you need to pass a more complex configuration for your Datadog-JMX integration, leverage [Autodiscovery Container Identifiers][11] to pass custom integration configuration file or custom `metrics.yaml` file.

### Agent preparation

Choose whether your Agent is running as a container in your cluster, or on your host directly:

{{< tabs >}}
{{% tab "Container Agent" %}}

If your Agent is running in your cluster and you want to autodiscover your container to collect JMX metrics:

1. Make sure to run the Agent image **the `gcr.io/datadoghq/agent:latest-jmx`** instead of the regular `gcr.io/datadoghq/agent:latest` image.

2. Get the configuration files `conf.yaml` and `metrics.yaml` associated to your integration. Find below the list of Datadog-JMX based integration with their associated files:

    | Integration Name             | Metrics file       | Configuration file      |
    | ----------------------- | ------------------ | ----------------------- |
    | [activemq][1]           | [metrics.yaml][2]  | [conf.yaml.example][3]  |
    | [cassandra][4]          | [metrics.yaml][5]  | [conf.yaml.example][6]  |
    | [confluent_platform][7] | [metrics.yaml][8]  | [conf.yaml.example][9] |
    | [hive][10]              | [metrics.yaml][11] | [conf.yaml.example][12] |
    | [jboss_wildfly][13]     | [metrics.yaml][14] | [conf.yaml.example][15] |
    | [kafka][29]             | [metrics.yaml][17] | [conf.yaml.example][18] |
    | [solr][19]              | [metrics.yaml][20] | [conf.yaml.example][21] |
    | [presto][22]            | [metrics.yaml][23] | [conf.yaml.example][24] |
    | [tomcat][16]            | [metrics.yaml][25] | [conf.yaml.example][26] |

3. Rename the `conf.yaml.example` file into `conf.yaml`.

4. Replace the parameter values from `conf.yaml` to fit the Agent Autodiscovery logic. The configuration files have host parameter values by default, use the [Autodiscovery Template Variables][27] logic instead. In the following Tomcat check example, the `host` parameter value is changed from `localhost` to `%%host%%`:

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

5. To specify to the Agent that you want to apply this configuration file to your application container, configure an `ad_identifiers` parameter at the beginning of your `conf.yaml` file:

    ```yaml
    ad_identifiers:
        - '<CUSTOM_AD_IDENTIFIER>'

    init_config:
        # (...)
    instances:
        # (...)
    ```

     **Note**: The example above uses a custom `ad_identifers` value, but you can specify the [container short image][28] as `ad_identifiers` if needed.

6. Mount those configuration files (`conf.yaml` and `metrics.yaml`) in your Agent in the `conf.d/<INTEGRATION_NAME>.d/` folder.

7. (Optional) - If you can't mount those files in the Agent container (like on AWS ECS), you should re-build the Agent docker image with those two configuration files in it:

    ```conf
    FROM gcr.io/datadoghq/agent:latest-jmx
    COPY <PATH_JMX_CONF_FILE> conf.d/tomcat.d/
    COPY <PATH_JMX_METRICS_FILE> conf.d/tomcat.d/
    ```

     Then use this new custom image as the regular containerized Agent.

[1]: /integrations/activemq/
[2]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/metrics.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/activemq/datadog_checks/activemq/data/conf.yaml.example
[4]: /integrations/cassandra/
[5]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/metrics.yaml
[6]: https://github.com/DataDog/integrations-core/blob/master/cassandra/datadog_checks/cassandra/data/conf.yaml.example
[7]: /integrations/confluent_platform/
[8]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/metrics.yaml
[9]: https://github.com/DataDog/integrations-core/blob/master/confluent_platform/datadog_checks/confluent_platform/data/conf.yaml.example
[10]: /integrations/hive/
[11]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/metrics.yaml
[12]: https://github.com/DataDog/integrations-core/blob/master/hive/datadog_checks/hive/data/conf.yaml.example
[13]: /integrations/jboss_wildfly/
[14]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/metrics.yaml
[15]: https://github.com/DataDog/integrations-core/blob/master/jboss_wildfly/datadog_checks/jboss_wildfly/data/conf.yaml.example
[16]: /integrations/tomcat/
[17]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[18]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[19]: /integrations/solr/
[20]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/metrics.yaml
[21]: https://github.com/DataDog/integrations-core/blob/master/solr/datadog_checks/solr/data/conf.yaml.example
[22]: /integrations/presto/
[23]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/metrics.yaml
[24]: https://github.com/DataDog/integrations-core/blob/master/presto/datadog_checks/presto/data/conf.yaml.example
[25]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/metrics.yaml
[26]: https://github.com/DataDog/integrations-core/blob/master/tomcat/datadog_checks/tomcat/data/conf.yaml.example
[27]: /agent/faq/template_variables/
[28]: /agent/guide/ad_identifiers/#short-image-container-identifiers
[29]: /integrations/kafka/
{{% /tab %}}
{{% tab "Host Agent" %}}

If your Agent is running on a host and you want to autodiscover your container to collect JMX metrics:

1. [Enable autodiscovery for your Agent][1].

2. Enable the JMX integration you want to use by renaming the corresponding `conf.yaml.example` file into `conf.yaml` in the [Agent integration directory][2]. For instance for tomcat you would rename `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml.example` into: `/etc/datadog-agent/conf.d/tomcat.d/conf.yaml`

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
[3]: /agent/faq/template_variables/
[4]: /agent/guide/ad_identifiers/#short-image-container-identifiers
[5]: /agent/guide/agent-commands/#restart-the-agent
{{% /tab %}}
{{< /tabs >}}

### Container preparation

#### Docker

Once the Agent is configured and running, use the `com.datadoghq.ad.check.id:"<CUSTOM_AD_IDENTIFIER>"` label for your application container to apply the check configuration through Autodiscovery:

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

**Note**: If the Agent and your JMX container are on the same network bridge, you need to instantiate your JMX server with `-Djava.rmi.server.hostname=<CONTAINER_NAME>"` where `<CONTAINER_NAME>` is your JMX-application container name.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/kubernetes/
[2]: /integrations/activemq/
[3]: /integrations/cassandra/
[4]: /integrations/confluent_platform/
[5]: /integrations/hive/
[6]: /integrations/jboss_wildfly/
[7]: /integrations/kafka/
[8]: /integrations/solr/
[9]: /integrations/presto/
[10]: /integrations/tomcat/
[11]: /agent/guide/ad_identifiers/
