---
title: Serverless Monitoring for Amazon ECS Managed Instances
---

Datadog Serverless Monitoring enables visibility into applications running on [Amazon ECS Managed Instances][1].

### How Datadog collects telemetry from Amazon ECS
When a Datadog Agent is run as an additional container within an ECS task definition, the Agent can use the task's [metadata endpoint][2] to collect data. This endpoint returns a Docker stats JSON for all containers associated with the task. For more information about the collected Docker stats, see [Docker API: ContainerStats][6] in the Docker documentation.

### Prerequisites
Ensure that you have set up the [Datadog-AWS integration][4] integration, and that your [IAM policy][5] includes the following permissions:

| AWS Permission                   | Description                                                       |
| -------------------------------- | ----------------------------------------------------------------- |
| `ecs:ListClusters`               | List available clusters.                                          |
| `ecs:ListContainerInstances`     | List instances of a cluster.                                      |
| `ecs:DescribeContainerInstances` | Describe instances to add metrics on resources and tasks running. |

## Setup

1. [Create an ECS task definition](#create-an-ecs-task-definition) that runs a Datadog Agent container alongside your application container(s).
2. [Run your task as an ECS service](#run-your-task-as-an-ecs-service) with the replica scheduling strategy.

### Create an ECS task definition

In Amazon ECS, a _task_ is the smallest deployable unit of work, comparable to Kubernetes Pod. A task is configured through a _task definition_, which describes the parameters and one or more containers that form your application. 

To monitor your ECS Managed Instances application, create a task definition that includes a Datadog Agent container in addition to your application container(s).

{{< tabs >}}
{{% tab "AWS Console" %}}
1. Log into your [AWS Console][1] and navigate to **Amazon Elastic Container Service**.
2. In the navigation menu, select **Task definitions**.
3. Click **Create new task definition**.
4. Under **Task definition configuration**:
   - For **Task definition family**, specify a unique name for the task definition. For example: `my-app-and-datadog`.
5. Under **Infrastructure requirements**:
   - For **Launch type**, select **Managed Instances**.
   - For **Task execution role**, select your IAM role. See permission requirements in the [Prerequisites](#prerequisites) section.
   - Make other selections (OS, architecture, CPU, memory, etc.) based on your needs.
6. Under **Container - 1**, add a container for the Datadog Agent:
   - For **Name**, enter `datadog-agent`.
   - For **Image URI**, enter `public.ecr.aws/datadog/agent:latest`.
   - For **Environment variables**, add the following environment variables:

     | Key          | Value                                               |
     |--------------|-----------------------------------------------------|
     | `DD_API_KEY` | Your [Datadog API key][2].                          |
     | `DD_SITE`    | Your [Datadog site][3]. Defaults to `datadoghq.com` |
     | `TBD`        | `true`                                              |
   - (_Windows only_) Expand **Docker configuration**. Under **Working directory**, enter `C:\`.
7. Click **Add container**. Add your application container(s).
   - To collect integration metrics from an application container, expand the **Docker labels** section and add [Autodiscovery labels][4] as key-value pairs.

     **Example**: Docker labels for a Redis container
     | Key | Value |
     | --- | ----- |
     | `com.datadoghq.ad.instances` | `[{"host": "%%host%%", "port": 6379}]` |
     | `com.datadoghq.ad.check_names` | `["redisdb"]` |
     | `com.datadoghq.ad.init_configs` | `	[{}]` |
8. Click **Create** to create the task definition.

[1]: https://console.aws.amazon.com/ecs/v2
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: /containers/docker/integrations/
{{% /tab %}}

{{% tab "AWS CLI" %}}

These steps require the [AWS CLI][5].

#### AWS CLI task definition template

```json
TBD: task definition template
```

1. Copy the above [task definition template](#aws-cli-task-definition-template) and save it locally as `datadog-agent-ecs-managed-instances.json`.

2. Edit `datadog-agent-ecs-managed-instances.json` to replace the following placeholder values:
   - `<TASK_NAME>`: A unique name for the task definition. For example: `my-app-and-datadog`.
   - `<YOUR_API_KEY>`: Your [Datadog API key][2]. To avoid supplying an API key in plaintext, see [Referencing API keys in AWS Secrets Manager](#using-secrets).
   - `<YOUR_DD_SITE>`: Your [Datadog site][3]. Defaults to `datadoghq.com`.
3. Under `containerDefinitions`, after the `datadog-agent` container definition, add your application container(s).
   - To collect integration metrics from an application container, add [Autodiscovery labels][4] as `dockerLabels`.

     **Example**: Container definition for a Redis container, under `containerDefinitions`
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
4. (_Optional_) To add a health check for the Datadog Agent, add the following to the task definition:
   ```json
   "healthCheck": {
     "retries": 3,
     "command": ["CMD-SHELL","agent health"],
     "timeout": 5,
     "interval": 30,
     "startPeriod": 15
   }
   ```
5. Register the task definition by running the following shell command with the [AWS CLI][5]:

   ```shell
   aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-managed-instances.json
   ```

**Example**: Complete task definition JSON that includes a `datadog-agent` container, an application container, and a Redis container with integration metrics; an Agent health check is also enabled

```json
TBD: example task definition
```

[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: /getting_started/site/
[4]: /containers/docker/integrations/
[5]: https://aws.amazon.com/cli/
{{% /tab %}}

{{% tab "CloudFormation" %}}

#### CloudFormation template

```yaml
TBD: CloudFormation template
```

1. Copy the above [CloudFormation template](#cloudformation-template).
2. Edit this template to replace the following placeholder values:
   - `<YOUR_API_KEY>`: Your [Datadog API key][2]. To avoid supplying an API key in plaintext, see [Referencing API keys in AWS Secrets Manager](#using-secrets).
   - `<YOUR_DD_SITE>`: Your [Datadog site][3]. Defaults to `datadoghq.com`.
3. Under `ContainerDefinitions`, add your application container(s) alongside the `datadog-agent` container definition.
   - To collect integration metrics from an application container, add [Autodiscovery labels][4] as `DockerLabels`.

     **Example**: Container definition for a Redis container, under `ContainerDefinitions`
     ```yaml
     - Name: Redis
       Image: redis:latest
       Essential: true
       DockerLabels:
         com.datadoghq.ad.instances: "[{\"host\": \"%%host%%\", \"port\": 6379}]"
         com.datadoghq.ad.check_names: "[\"redisdb\"]"
         com.datadoghq.ad.init_configs: "[{}]"
     ```
4. (_Optional_) To add a health check for the Datadog Agent, add the following to your CloudFormation template:

   ```yaml
   HealthCheck:
     Command:
       - CMD-SHELL
       - agent health
     Interval: 30
     Retries: 3
     StartPeriod: 15
     Timeout: 5
   ```

**Example**: Complete CloudFormation template that includes a `datadog-agent` container, an application container, and a Redis container with integration metrics; an Agent health check is also enabled

```yaml
TBD: example task definition
```

For more information about CloudFormation templating and syntax for the `AWS::ECS::TaskDefinition` resource, see [AWS CloudFormation Template Reference: AWS::ECS::TaskDefinition][1] in the AWS documentation.

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-ecs-taskdefinition.html

{{% /tab %}}
{{< /tabs >}}

{{% collapse-content title="Referencing API keys in AWS Secrets Manager" level="h4" expanded=false id="using-secrets" %}}

As an alternative to providing your Datadog API key (or any other sensitive data) in plaintext, you can instead reference the [ARN of a secret stored in AWS Secrets Manager][7]. Ensure that your task execution role has the necessary permissions to access secrets from AWS Secrets Manager. Place the `DD_API_KEY` environment variable under `secrets` in your `datadog-agent` container definition.

**Example**: Referencing a Datadog API key as a secret in a `datadog-agent` container definition

{{< tabs >}}
{{% tab "JSON" %}}
```json
{
 "containerDefinitions": [
  {
   "name": "datadog-agent",
   "image": "public.ecr.aws/datadog/agent:latest",
   "essential": true,
   "environment": [
    {
     "name": "DD_SITE",
     "value": "datadoghq.com"
    }
   ],
   "secrets": [
    {
     "name": "DD_API_KEY",
     "valueFrom": "<YOUR_SECRET_ARN>"
    }
   ]
  }
 ]
}
```
{{% /tab %}}

{{% tab "YAML" %}}
```yaml
ContainerDefinitions:
  - Name: datadog-agent
    Image: 'public.ecr.aws/datadog/agent:latest'
    Environment:
      - Name: DD_SITE
        Value: datadoghq.com
    Secrets:
      - name: DD_API_KEY
        ValueFrom: <YOUR_SECRET_ARN>
```
{{% /tab %}}
{{< /tabs >}}
{{% /collapse-content %}}


### Run your task as an ECS service

{{< tabs >}}
{{% tab "AWS Console" %}}
1. Log into your [AWS Console][1] and navigate to **Amazon Elastic Container Service**.
2. In the navigation menu, select **Clusters**.
3. If you want to use a new cluster, click **Create cluster**. After your new cluster is ready, proceed to the next step.
3. Select the cluster where you want to run your task.
4. On the **Services** tab, click **Create**.
5. Under **Service details**:
   - For **Task definition family**, select the name of the task definition you created.
   - For **Service name**, enter a unique (to this cluster) service name for your task.
6. Under **Environment**:
   - For **Compute options**, select **Launch type**.
   - For **Launch type**, select (TBD - what launch type to select?)
7. Under **Deployment configuration**:
   - For **Scheduling strategy**, select **Replica**.
   - For **Desired tasks**, enter `1`.
8. Under **Networking**, select a **VPC**, **Subnets**, and a **Security group**.
9. Make other selections (service discovery, load balancing, etc.) based on your needs.
10. Click **Create**.


[1]: https://console.aws.amazon.com/ecs/v2

{{% /tab %}}

{{% tab "AWS CLI" %}}

These steps require the [AWS CLI][1].

1. If you want to use a new cluster, run `aws ecs create-cluster`:

   ```shell
   aws ecs create-cluster --cluster-name "<CLUSTER_NAME>"
   ```

   Replace `<CLUSTER_NAME>` with the name of your cluster.

2. Run your task as a service on your cluster:

   ```shell
   aws ecs run-task --cluster <CLUSTER_NAME> \
   --network-configuration "awsvpcConfiguration={subnets=["<PRIVATE_SUBNET>"],securityGroups=["<SECURITY_GROUP>"]}" \
   --task-definition arn:aws:ecs:us-east-1:<AWS_ACCOUNT_NUMBER>:task-definition/<TASK_NAME>:1 \
   --region <AWS_REGION> --launch-type FARGATE --platform-version 1.4.0
   ```
   (TBD - the above needs to be edited)

   Replace the following placeholder values:

   - `<CLUSTER_NAME>`: The name of your cluster.
   - `<PRIVATE_SUBNET>`: tbd
   - `<SECURITY_GROUP>`: tbd
   - `<AWS_ACCOUNT_NUMBER>`: Your AWS account number.
   - `<TASK_NAME>`: The task name you specified in your task definition.
   - `<AWS_REGION>`: Your AWS region. For example, `us-east-1`.

[1]: https://aws.amazon.com/cli/
{{% /tab %}}

{{% tab "CloudFormation" %}}

In your CloudFormation template, add an `AWS::ECS::Service` that references the `ECSTaskDefinition` you created. Specify a cluster name, `DesiredCount` of tasks, and any other parameters necessary for your application.

```yaml
Resources:
  ECSTaskDefinition:
    #(...)
  ECSService:
    Type: 'AWS::ECS::Service'
    Properties:
      Cluster: <CLUSTER_NAME>
      TaskDefinition:
        Ref: "ECSTaskDefinition"
      DesiredCount: 1
      #(...)
```

For more information about CloudFormation templating and syntax for the `AWS::ECS::Service` resource, see [AWS CloudFormation Template Reference: AWS::ECS::Service][1] in the AWS documentation.

[1]: https://docs.aws.amazon.com/AWSCloudFormation/latest/TemplateReference/aws-resource-ecs-service.html

{{% /tab %}}
{{< /tabs >}}

## Further configuration

### Metric collection

After the Datadog Agent is running alongside your application containers, (TBD - which metrics) are sent to Datadog.

#### Integration metrics

To collect metrics from the technologies supported by Datadog's [integrations][8], use Docker labels to configure an [Autodiscovery template][9] (TBD)

#### CloudWatch metrics

Use the [Datadog-AWS integration][11] to collect CloudWatch-based ECS metrics. In the AWS integration tile, select the **Metric Collection** tab and ensure that the **Elastic Container Service (ECS)** entry is enabled.

By default, Datadog polls CloudWatch metrics once every 10 minutes. To decrease this latency to 2-3 minutes, you can enable [AWS CloudWatch Metric Streams][13]. Setting up CloudWatch Metric Streams may impact your AWS bill.


### Log collection

With FireLens or FluentBit?

### Trace collection

1. In the container definition for the `datadog-agent` container, add an additional environment variable:

   | Key          | Value                               |
   |--------------|-------------------------------------|
   | `DD_APM_ENABLED` | `true`                          |

2. [Add instrumentation to your application][10].

After you configure trace collection, you can see your traces in [Trace Explorer][13]

### Tagging

TBD

## Data collected

TBD - list of metrics


[1]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ManagedInstances.html
[2]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-metadata-endpoint-v4-managed-instances-response.html
[3]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html
[4]: /getting_started/integrations/aws/
[5]: /integrations/amazon-web-services/#aws-iam-permissions
[6]: https://docs.docker.com/reference/api/engine/version/v1.30/#tag/Container/operation/ContainerStats
[7]: https://docs.aws.amazon.com/AmazonECS/latest/developerguide/specifying-sensitive-data-tutorial.html
[8]: /integrations
[9]: /containers/docker/integrations/
[10]: /tracing/trace_collection/automatic_instrumentation/dd_libraries/
[11]: https://app.datadoghq.com/integrations/amazon-web-services
[12]: /integrations/guide/aws-cloudwatch-metric-streams-with-kinesis-data-firehose/
[13]: https://app.datadoghq.com/apm/traces
