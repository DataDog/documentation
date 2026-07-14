---
title: AWS Batch with ECS Fargate and the Datadog Agent
description: Deploy the Datadog Agent alongside AWS Batch jobs running on ECS Fargate for comprehensive monitoring
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
2. Click on {{< ui >}}Job Definitions{{< /ui >}} in the left menu, then click the {{< ui >}}Create{{< /ui >}} button or choose an existing AWS Batch job definition.
3. For new job definitions:
    1. Select {{< ui >}}Fargate{{< /ui >}} as the orchestration type.
    2. Unselect {{< ui >}}Use legacy containerProperties structure{{< /ui >}} option. 
    3. Enter a {{< ui >}}Job Definition Name{{< /ui >}}, such as `my-app-and-datadog`.
    4. Select an execution IAM role. See permission requirements in the [Create or Modify your IAM Policy](#create-or-modify-your-iam-policy) section below.
    5. Enable {{< ui >}}Assign public IP{{< /ui >}} to allow outbound network access, then click the {{< ui >}}Next{{< /ui >}} button.
    6. Configure the Datadog Agent container.
        1. For {{< ui >}}Container name{{< /ui >}} enter `datadog-agent`.
        2. For {{< ui >}}Image{{< /ui >}} enter `public.ecr.aws/datadog/agent:latest`.
        3. Configure {{< ui >}}CPU{{< /ui >}} and {{< ui >}}Memory{{< /ui >}} resource requirements based on your needs.
        4. For {{< ui >}}Env Variables{{< /ui >}}, add the {{< ui >}}Key{{< /ui >}} `DD_API_KEY` and enter your [Datadog API Key][2] as the value.
        5. Add another environment variable using the {{< ui >}}Key{{< /ui >}} `ECS_FARGATE` and the value `true`. Click {{< ui >}}Add{{< /ui >}} to add the container.
        6. Add another environment variable using the {{< ui >}}Key{{< /ui >}} `DD_SITE` and the value {{< region-param key="dd_site" code="true" >}}. This defaults to `datadoghq.com` if you don't set it.
    7. Add your other application containers to the job definition.
    8. AWS Batch supports [Fluent Bit and Firelens][3]. To enable log collection for your application containers with Datadog:
       1. Create a separate log router container in the job definition.
       2. Configure the image `amazon/aws-for-fluent-bit:stable"` for the container.
       3. In the Firelens Configuration section:
          - Configure the {{< ui >}}Type{{< /ui >}} to be `fluentbit`.
          - Configure the {{< ui >}}Options{{< /ui >}} to include `enable-ecs-log-metadata` set to `true` to the {{< ui >}}Name{{< /ui >}} and {{< ui >}}Value{{< /ui >}} respectively
       4. For your application containers, in the Log Configuration section:
          - Configure the {{< ui >}}Log Driver{{< /ui >}} to `awsfirelens`
          - Configure the {{< ui >}}Options{{< /ui >}} to include the following  {{< ui >}}Name{{< /ui >}} and {{< ui >}}Value{{< /ui >}} similar to Step 2 of the [ECS Fargate Fluent Bit and Firelens section][4]
    10. Click {{< ui >}}Create job definition{{< /ui >}} to create the job definition.

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
2. On the {{< ui >}}Jobs{{< /ui >}} tab, click the {{< ui >}}Submit new job{{< /ui >}} button.
3. Enter a {{< ui >}}Job name{{< /ui >}}.
4. For {{< ui >}}Job Definition{{< /ui >}}, select the job created in the previous steps.
5. Choose the job queue to run the Datadog Agent on.
6. {{< ui >}}Container overrides{{< /ui >}} are optional based on your preference.
7. Click the {{< ui >}}Next{{< /ui >}} button, then click the {{< ui >}}Create job{{< /ui >}} button.

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
