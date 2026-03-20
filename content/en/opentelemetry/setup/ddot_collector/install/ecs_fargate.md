---
title: Install the DDOT Collector on ECS Fargate
code_lang: ecs_fargate
type: multi-code-lang
code_lang_weight: 4
further_reading:
- link: "/opentelemetry/setup/ddot_collector/custom_components"
  tag: "Documentation"
  text: "Use Custom OpenTelemetry Components with Datadog Agent"
---

## Overview

Follow this guide to deploy the Datadog Distribution of OpenTelemetry (DDOT) Collector alongside the Datadog Agent on Amazon ECS Fargate. Because ECS Fargate does not support host-based deployments, the Datadog Agent runs as a sidecar container in the same ECS task as your application.

<div class="alert alert-info">
  <strong>Need additional OpenTelemetry components?</strong> If you need components beyond those included in the default package, follow <a href="/opentelemetry/setup/ddot_collector/custom_components">Use Custom OpenTelemetry Components</a> to extend the Datadog Agent's capabilities. For a list of components included by default, see <a href="/opentelemetry/agent/#opentelemetry-collector-components">OpenTelemetry Collector components</a>.
</div>

## Requirements

To complete this guide, you need the following:

**Datadog account**:
1. [Create a Datadog account][1] if you don't have one.
1. Find or create your [Datadog API key][2].

**AWS**:
- An AWS account with access to Amazon ECS Fargate.
- The [AWS CLI][3] configured with permissions to create and manage ECS task definitions and services.

**Network**: {{% otel-network-requirements %}}

## Install the Datadog Agent with OpenTelemetry Collector

<div class="alert alert-info">This installation is required for both Datadog SDK + DDOT and OpenTelemetry SDK + DDOT configurations. While the Datadog SDK implements the OpenTelemetry API, it still requires the DDOT Collector to process and forward OTLP metrics and logs.</div>

### Create an ECS task definition

On ECS Fargate, the Datadog Agent and your application run as containers within the same ECS task. Create an ECS task definition that includes both containers.

<div class="alert alert-info">
  The Datadog Agent image must be <code>public.ecr.aws/datadog/agent:latest-full</code>. The <code>latest-full</code> image includes the DDOT Collector. The standard <code>latest</code> image does not.
</div>

Use the following task definition as a starting point:

{{< code-block lang="json" filename="task-definition.json" collapsible="true" >}}
{
    "family": "<TASK_FAMILY>",
    "containerDefinitions": [
        {
            "name": "datadog-agent",
            "image": "public.ecr.aws/datadog/agent:latest-full",
            "essential": true,
            "cpu": 0,
            "environment": [
                {
                    "name": "ECS_FARGATE",
                    "value": "true"
                },
                {
                    "name": "DD_LOGS_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_OTELCOLLECTOR_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_SITE",
                    "value": "<DATADOG_SITE>"
                },
                {
                    "name": "DD_LOGS_CONFIG_CONTAINER_COLLECT_ALL",
                    "value": "true"
                }
            ],
            "secrets": [
                {
                    "name": "DD_API_KEY",
                    "valueFrom": "<DD_API_KEY_SECRET_ARN>"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/<TASK_FAMILY>",
                    "awslogs-create-group": "true",
                    "awslogs-region": "<AWS_REGION>",
                    "awslogs-stream-prefix": "ecs"
                }
            },
            "mountPoints": [],
            "portMappings": [],
            "volumesFrom": []
        },
        {
            "name": "<APP_CONTAINER_NAME>",
            "image": "<APP_IMAGE>",
            "essential": true,
            "cpu": 0,
            "environment": [
                {
                    "name": "OTEL_SERVICE_NAME",
                    "value": "<SERVICE_NAME>"
                },
                {
                    "name": "OTEL_RESOURCE_ATTRIBUTES",
                    "value": "service.version=<VERSION>,deployment.environment.name=<ENV>"
                }
            ],
            "logConfiguration": {
                "logDriver": "awslogs",
                "options": {
                    "awslogs-group": "/ecs/<TASK_FAMILY>",
                    "awslogs-create-group": "true",
                    "awslogs-region": "<AWS_REGION>",
                    "awslogs-stream-prefix": "ecs"
                }
            },
            "mountPoints": [],
            "portMappings": [],
            "volumesFrom": []
        }
    ],
    "executionRoleArn": "<EXECUTION_ROLE_ARN>",
    "networkMode": "awsvpc",
    "volumes": [],
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "cpu": "256",
    "memory": "512"
}
{{< /code-block >}}

Replace the following placeholders:
- `<TASK_FAMILY>`: A name for your ECS task definition family.
- `<DD_API_KEY_SECRET_ARN>`: The ARN of the AWS Secrets Manager secret or SSM Parameter Store parameter that contains your Datadog API key. The task execution role must have `secretsmanager:GetSecretValue` (Secrets Manager) or `ssm:GetParameters` (SSM) permission to retrieve the secret.
- `<DATADOG_SITE>`: Your [Datadog site][4]. Your site is {{< region-param key="dd_site" code="true" >}}. (Ensure the correct **DATADOG SITE** is selected on the right.)
- `<AWS_REGION>`: The AWS region where your ECS tasks run (for example, `us-east-1`).
- `<APP_CONTAINER_NAME>`: The name of your application container.
- `<APP_IMAGE>`: Your application container image.
- `<SERVICE_NAME>`: The name of your service.
- `<VERSION>`: The version of your service.
- `<ENV>`: Your deployment environment (for example, `production`).
- `<EXECUTION_ROLE_ARN>`: The ARN of your ECS task execution IAM role.

### Configure ECS resource detection

The DDOT Collector's `infraattributes` processor enriches your telemetry with ECS infrastructure tags when the `aws.ecs.task.arn` resource attribute is present. To provide this attribute, add the ECS resource detector to your OpenTelemetry SDK.

The ECS resource detector automatically populates the following attributes:
- `aws.ecs.task.arn`
- `aws.ecs.launchtype` (set to `fargate`)
- `cloud.provider`

Refer to your language's OpenTelemetry SDK documentation to add the ECS resource detector. For example:
- **Go**: [go.opentelemetry.io/contrib/detectors/aws/ecs][5]
- **All languages**: See the [ECS resource detector documentation][6] in the OpenTelemetry Collector contrib repository.

## Send your telemetry to Datadog

To send your telemetry data to Datadog:

1. [Instrument your application](#instrument-the-application)
2. [Configure the application](#configure-the-application)
3. [Correlate observability data](#correlate-observability-data)
4. [Run your application](#run-the-application)

### Instrument the application

Instrument your application [using the OpenTelemetry API][7].

{{% collapse-content title="Example application instrumented with the OpenTelemetry API" level="p" %}}
As an example, you can use the [Calendar sample application][8] that's already instrumented for you. The following code instruments the [CalendarService.getDate()][9] method using the OpenTelemetry annotations and API:
   {{< code-block lang="java" filename="CalendarService.java" disable_copy="true" collapsible="false" >}}
@WithSpan(kind = SpanKind.CLIENT)
public String getDate() {
    Span span = Span.current();
    span.setAttribute("peer.service", "random-date-service");
    ...
}
{{< /code-block >}}
{{% /collapse-content %}}

### Configure the application

Because the DDOT Collector runs as a sidecar container in the same ECS task, your application sends OTLP data to `localhost`. Add the following environment variables to your application container in the task definition:

{{< code-block lang="json" filename="task-definition.json" disable_copy="true" collapsible="true" >}}
{
    "name": "OTEL_EXPORTER_OTLP_ENDPOINT",
    "value": "http://localhost:4317"
},
{
    "name": "OTEL_EXPORTER_OTLP_PROTOCOL",
    "value": "grpc"
}
{{< /code-block >}}

### Correlate observability data

[Unified service tagging][10] ties observability data together in Datadog so you can navigate across metrics, traces, and logs with consistent tags.

The `OTEL_SERVICE_NAME` and `OTEL_RESOURCE_ATTRIBUTES` environment variables in the task definition above configure unified service tagging.

### Run the application

1. Register the task definition with AWS:

   {{< code-block lang="bash" >}}
aws ecs register-task-definition --cli-input-json file://task-definition.json
{{< /code-block >}}

1. If you don't have an ECS cluster, create one:

   {{< code-block lang="bash" >}}
aws ecs create-cluster --cluster-name <CLUSTER_NAME>
{{< /code-block >}}

1. Create an ECS service to run the task:

   {{< code-block lang="bash" >}}
aws ecs create-service \
  --cluster <CLUSTER_NAME> \
  --service-name <SERVICE_NAME> \
  --task-definition <TASK_FAMILY> \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[<SUBNET_IDS>],securityGroups=[<SECURITY_GROUP_IDS>],assignPublicIp=ENABLED}"
{{< /code-block >}}

   Replace `<CLUSTER_NAME>` with your ECS cluster name, `<SERVICE_NAME>` with a name for your ECS service, `<SUBNET_IDS>` with your subnet IDs (comma-separated), and `<SECURITY_GROUP_IDS>` with your security group IDs.

   If you are updating an existing service to a new task definition revision, run:

   {{< code-block lang="bash" >}}
aws ecs update-service \
  --cluster <CLUSTER_NAME> \
  --service <SERVICE_NAME> \
  --task-definition <TASK_FAMILY>
{{< /code-block >}}

After the task starts, unified service tagging is fully enabled for your metrics, traces, and logs.

### Validate the deployment

1. Verify that your ECS task is running and both containers are in `RUNNING` state:

   ```shell
   aws ecs describe-tasks \
     --cluster <CLUSTER_NAME> \
     --tasks <TASK_ID> \
     --query "tasks[0].containers[*].{name:name,status:lastStatus}" \
     --output table

Use Datadog to explore the observability data for your application.

### Logs

View logs to monitor and troubleshoot application and system operations.

{{< img src="/opentelemetry/embedded_collector/logs.png" alt="View logs from the Log Explorer." style="width:100%;" >}}

### Traces

View traces and spans to observe the status and performance of requests processed by your application, with infrastructure metrics correlated in the same trace.

{{< img src="/opentelemetry/embedded_collector/traces.png" alt="View traces from the Trace Explorer." style="width:100%;" >}}

### Runtime metrics

Monitor your runtime (JVM) metrics for your applications.

{{< img src="/opentelemetry/embedded_collector/metrics.png" alt="View JVM metrics from the JVM Metrics dashboard" style="width:100%;" >}}

### Collector health metrics

View metrics from the DDOT Collector to monitor the Collector health.

{{< img src="/opentelemetry/embedded_collector/dashboard.png" alt="View Collector health metrics from the OTel dashboard." style="width:100%;" >}}

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://www.datadoghq.com/free-datadog-trial/
[2]: https://app.datadoghq.com/organization-settings/api-keys/
[3]: https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
[4]: /getting_started/site
[5]: https://pkg.go.dev/go.opentelemetry.io/contrib/detectors/aws/ecs#NewResourceDetector
[6]: https://github.com/open-telemetry/opentelemetry-collector-contrib/blob/main/processor/resourcedetectionprocessor/internal/aws/ecs/documentation.md
[7]: /tracing/trace_collection/custom_instrumentation/otel_instrumentation/
[8]: https://github.com/DataDog/opentelemetry-examples/tree/main/apps/rest-services/java/calendar
[9]: https://github.com/DataDog/opentelemetry-examples/blob/main/apps/rest-services/java/calendar/src/main/java/com/otel/service/CalendarService.java#L27-L48
[10]: /getting_started/tagging/unified_service_tagging
