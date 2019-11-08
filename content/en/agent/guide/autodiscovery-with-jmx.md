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

Sometimes a check configuration used by a Datadog-Agent integration can be to big to fit within Autodiscovery labels/annotations like for JMX integrations for instance. If it's the case you should use [Autodiscovery Container Identifiers][1].

Find below an example with the Datadog-Kafka integration that leverage JMX to collect metrics and the Datadog Agent to send them to Datadog for:

### Agent preparation

{{< tabs >}}
{{% tab "Host Agent" %}}

1. Enable the Kafka integration by renaming `conf.yaml.example` into `conf.yaml` in the [kafka integration directory][1]: `/etc/datadog-agent/conf.d/kafka.d`

2. Replace the parameters values from `conf.yaml` to fit the Agent Autodiscovery logic:
    The configuration files have by default host parameters value, if you are using the Agent with Autodiscovery you should use the [Autodiscovery Template Variables][2] instead.
    For this example you should change the `host` parameter value from `localhost` to `%%host%%`:

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

3. To specify to the Agent to apply this configuration file to your Kafka containers you have to configure an `ad_identifiers` parameter at the begining of your `conf.yaml` file:

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

    **Note**: The example above uses a custom `ad_identifers` value, but you can specify the [container short image][3] as `ad_identifiers` if need be.

4. [Enable Autodiscovery for your Agent][4].


[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[2]: /agent/autodiscovery/template_variables
[3]: https://docs.datadoghq.com/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[4]: /agent/autodiscovery/?tab=agent#docker-autodiscovery
{{% /tab %}}
{{% tab "Containerized Agent" %}}

1. Get the configuration files associated to the Datadog-Kafka integration.
    They can be found in your [integrations configuration directory][1] `/etc/datadog-agent/conf.d/kafka.d`:

      * [metrics.yaml][2]
      * [conf.yaml.example][3]

2. Rename `conf.yaml.example` into `conf.yaml`.
3. Replace the parameters values from `conf.yaml` to fit the Agent Autodiscovery logic:
    The configuration files have by default host parameters value, if you are using the Agent with Autodiscovery you should use the [Autodiscovery Template Variables][4] instead.
    For this example you should change the `host` parameter value from `localhost` to `%%host%%`:

    ```yaml
      instances:

          ## @param host - string - required
          ## Kafka host to connect to.
          #
         - host: %%host%%

      # (...)
    ```

4. To specify to the Agent to apply this configuration file to your Kafka containers you have to configure an `ad_identifiers` parameter at the begining of your `conf.yaml` file:

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

    **Note**: The example above uses a custom `ad_identifers` value, but you can specify the [container short image][5] as `ad_identifiers` if need be.

5. [After enabling Autodiscovery for your Agent][6], mount those configuration files (`conf.yaml` and `metrics.yaml`) in your Agent in the `conf.d/kafka.d` folder.

[1]: /agent/guide/agent-configuration-files/?tab=agentv6#agent-configuration-directory
[2]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/metrics.yaml
[3]: https://github.com/DataDog/integrations-core/blob/master/kafka/datadog_checks/kafka/data/conf.yaml.example
[4]: /agent/autodiscovery/template_variables
[5]: https://docs.datadoghq.com/agent/autodiscovery/ad_identifiers/#short-image-container-identifiers
[6]: /agent/autodiscovery/?tab=containerizedagent#docker-autodiscovery
{{% /tab %}}
{{< /tabs >}}

### Container Preparation

Once the Agent is configured and running, use the `com.datadoghq.ad.check.id: CUSTOM_AD_IDENTIFIER` label/annotations for your kafka container to apply the Check configuration through autodiscovery:

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

* To apply a specific configuration to a given container, Autodiscovery identifies containers by **name**, NOT image. It tries to match `<CONTAINER_IDENTIFIER>` to `.spec.containers[0].name`, not `.spec.containers[0].image`
* If you define your Kubernetes pods directly with `kind: Pod`, add each pod's annotations directly under its `metadata` section. If you define pods indirectly with replication controllers, replica sets, or deployments, add pod annotations under `.spec.template.metadata`.

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
{{% tab "ConfigMap" %}}

On Kubernetes, you can use [ConfigMaps][1].

```
kind: ConfigMap
apiVersion: v1
metadata:
  name: <NAME>-config-map
  namespace: default
data:
  <INTEGRATION_NAME>-config: |-
    ad_identifiers:
      CUSTOM_AD_IDENTIFIER
```

[1]: /agent/kubernetes/integrations/#configmap
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/autodiscovery/ad_identifiers
