---
title: AWS Batch with ECS Fargate and the Datadog Agent
further_reading:
    - link: "integrations/ecs_fargate/?tab=webui#aws-batch-on-ecs-fargate"
      tag: 'Documentation'
      text: 'Amazon ECS on AWS Fargate with AWS Batch'
aliases:
    - /integrations/faq/aws-batch-ecs-fargate
    - /agent/guide/aws-batch-ecs-fargate-datadog-agent
---

You can run the Datadog Agent alongside your AWS Batch job containers by adding the container to your job definition.

## Prerequisites

* AWS Batch compute environment
* AWS Batch job queue associated with a compute environment

## Create the job definition

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. Log in to your [AWS Web Console][1] and navigate to the AWS Batch section.
2. Click on **Job Definitions** in the left menu, then click the **Create** button or choose an existing AWS Batch job definition.
3. For new job definitions:
    1. Select **Fargate** as the orchestration type.
    2. Unselect **Use legacy containerProperties structure** option. 
    3. Enter a **Job Definition Name**, such as `my-app-and-datadog`.
    4. Select an execution IAM role. See permission requirements in the [Create or Modify your IAM Policy](#create-or-modify-your-iam-policy) section below.
    5. Enable **Assign public IP** to allow outbound network access, then click the **Next** button.
    6. Configure the Datadog Agent container.
        1. For **Container name** enter `datadog-agent`.
        2. For **Image** enter `public.ecr.aws/datadog/agent:latest`.
        3. Configure **CPU** and **Memory** resource requirements based on your needs.
        4. For **Env Variables**, add the **Key** `DD_API_KEY` and enter your [Datadog API Key][2] as the value.
        5. Add another environment variable using the **Key** `ECS_FARGATE` and the value `true`. Click **Add** to add the container.
        6. Add another environment variable using the **Key** `DD_SITE` and the value {{< region-param key="dd_site" code="true" >}}. This defaults to `datadoghq.com` if you don't set it.
    7. Add your other application containers to the job definition.
    8. AWS Batch supports [Fluent Bit and Firelens][3]. To enable log collection for your application containers with Datadog:
       1. Create a separate log router container in the job definition.
       2. Configure the image `amazon/aws-for-fluent-bit:stable"` for the container.
       3. In the Firelens Configuration section:
          - Configure the **Type** to be `fluentbit`.
          - Configure the **Options** to include `enable-ecs-log-metadata` set to `true` to the **Name** and **Value** respectively
       4. For your application containers, in the Log Configuration section:
          - Configure the **Log Driver** to `awsfirelens`
          - Configure the **Options** to include the following  **Name** and **Value** similar to Step 2 of the [ECS Fargate Fluent Bit and Firelens section][4]
    10. Click **Create job definition** to create the job definition.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Download [datadog-agent-aws-batch-ecs-fargate.json][1]. 

   **Note**: If you are using Internet Explorer, this may download as a gzip file, which contains the JSON file mentioned below.
2. Update the JSON with a `JOB_DEFINITION_NAME`, your [Datadog API Key][2], and the appropriate `DD_SITE` ({{< region-param key="dd_site" code="true" >}}).

   **Note**: The environment variable `ECS_FARGATE` is already set to `"true"`.
3. Add your other application containers to the job definition.
4. AWS Batch supports [Fluent Bit and Firelens][3]. To enable log collection for your application containers with Datadog:
   - In the JSON file, add an additional `log_router` container with the following in the `containers` section:
     ```json
      {
          "name": "log_router",
          "image": "amazon/aws-for-fluent-bit:stable",
          "essential": true,
          "firelensConfiguration": {
              "type": "fluentbit",
              "options": {
                  "enable-ecs-log-metadata": "true"
              }
          },
          "resourceRequirements": [
              {
                  "value": "0.25",
                  "type": "VCPU"
              },
              {
                  "value": "512",
                  "type": "MEMORY"
              }
          ]
      }
     ```
   - In your application containers, add the relevant `logConfiguration` options similar to Step 2 of the [ECS Fargate Fluent Bit and Firelens section][4]
5. Execute the following command to register the job definition:

   ```bash
   aws batch register-job-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-aws-batch-ecs-fargate.json
   ```

[1]: https://docs.datadoghq.com/resources/json/datadog-agent-aws-batch-ecs-fargate.json
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://aws.amazon.com/about-aws/whats-new/2025/04/aws-batch-amazon-elastic-container-service-exec-firelens-log-router/
[4]: https://docs.datadoghq.com/integrations/ecs_fargate/?tab=webui#fluent-bit-and-firelens
{{% /tab %}}
{{< /tabs >}}

## Submit the AWS Batch job

{{< tabs >}}
{{% tab "AWS Web UI" %}}

1. Log in to your [AWS Web Console][1] and navigate to the AWS Batch section. If needed, create a [compute environment][2] and/or [job queue][3] associated with a compute environment.
2. On the **Jobs** tab, click the **Submit new job** button.
3. Enter a **Job name**.
4. For **Job Definition**, select the job created in the previous steps.
5. Choose the job queue to run the Datadog Agent on.
6. **Container overrides** are optional based on your preference.
7. Click the **Next** button, then click the **Create job** button.

[1]: https://aws.amazon.com/console
[2]: https://docs.aws.amazon.com/batch/latest/userguide/create-compute-environment.html
[3]: https://docs.aws.amazon.com/batch/latest/userguide/create-job-queue-fargate.html

{{% /tab %}}
{{% tab "AWS CLI" %}}

1. Execute the following command to submit a job for your job definition:

```bash
aws batch submit-job --job-name <JOB_NAME> \
--job-queue <JOB_QUEUE_NAME> \
--job-definition <JOB_DEFINITION_NAME>:1
```

{{% /tab %}}
{{< /tabs >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}
