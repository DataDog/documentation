---
title: Integration Setup for ECS Fargate

further_reading:
- link: "/integrations/ecs_fargate/"
  tag: "Documentation"
  text: "ECS Fargate"
- link: "https://www.datadoghq.com/blog/monitor-aws-fargate/"
  tag: "Blog"
  text: "Monitor AWS Fargate applications with Datadog"
- link: "/agent/docker/integrations/"
  tag: "Documentation"
  text: "Autodiscovery"
---

Set up integrations for [ECS Fargate][1] with [Docker Label Annotations][2].

## Add an integration

If you already [set up the Container Agent][3] in ECS Fargate, follow these steps to add an integration to your existing cluster.

### Update the task definition

1. Log in to your [AWS Web Console][4] and navigate to the ECS section.
2. Choose the cluster the Datadog Agent is running on.
3. Click the **Tasks** tab, then click the **Task definition** name containing the Datadog Agent Container.
4. Click the **Create new revision** button, then click the **Add container** button.
5. Enter the **Container name**, **Image**, and any additional preference settings.
6. Under **Docker labels** add the following:

| Key                           | Value                                           |
|-------------------------------|-------------------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": <PORT_NUMBER>}]` |
| com.datadoghq.ad.check_names  | `["<CHECK_NAME>"]`                              |
| com.datadoghq.ad.init_configs | `[{}]`                                          |

7. Click the **Add** button, then click the **Create** button.

### Update the service

1. Within the cluster, click the **Services** tab, then click the **Service Name**.
2. Click the **Update** button.
3. For the **Task Definition**, choose the latest **Revision** from the dropdown menu.
4. Click the **Next step** button 3 times, then click the **Update Service** button.

### Verification

When the updated **Task** displays a **RUNNING** status, use these pages to verify information is reporting to Datadog:

- [Live Containers][5] to view the container.
- [Metrics Explorer][6] to view integration metrics.

## Examples

{{< tabs >}}
{{% tab "Redis - Web UI" %}}
Use the following table to enter the Docker labels via the [AWS Web Console][1] for a Redis container:

| Key                           | Value                                  |
|-------------------------------|----------------------------------------|
| com.datadoghq.ad.instances    | `[{"host": "%%host%%", "port": 6379}]` |
| com.datadoghq.ad.check_names  | `["redisdb"]`                          |
| com.datadoghq.ad.init_configs | `[{}]`                                 |

[1]: https://aws.amazon.com/console
{{% /tab %}}
{{% tab "Redis - AWS CLI" %}}
Use the following JSON under `containerDefinitions` to create a Redis container via the [AWS CLI tools][1].

```json
{
  "name": "redis",
  "image": "redis:latest",
  "essential": true,
  "dockerLabels": {
    "com.datadoghq.ad.instances": "[{\"host\": \"%%host%%\", \"port\": 6379}]",
    "com.datadoghq.ad.check_names": "[\"redisdb\"]",
    "com.datadoghq.ad.init_configs": "[{}]"
  }
}
```

[1]: https://aws.amazon.com/cli
{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/ecs_fargate/
[2]: /agent/docker/integrations/?tab=dockerlabel#configuration
[3]: /integrations/ecs_fargate/#container-agent-setup
[4]: https://aws.amazon.com/console
[5]: https://app.datadoghq.com/containers
[6]: https://app.datadoghq.com/metric/explorer
