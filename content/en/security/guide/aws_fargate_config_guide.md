---
title: AWS Fargate Configuration Guide for Datadog Security
kind: documentation
disable_toc: false
products:
- name: Cloud SIEM
  url: /security/cloud_siem/
  icon: siem
- name: Cloud Security Management
  url: /security/cloud_security_management/
  icon: cloud-security-management
- name: Application Security Management
  url: /security/application_security/
  icon: app-sec
---

<div class="alert alert-warning">Cloud Security Management on AWS Fargate is in beta.</div>

This guide walks you through configuring [Cloud Security Management (CSM)][3], [Application Security Management (ASM)][4], and [Cloud SIEM][5] on AWS Fargate.

## Cloud Security Management

### Prerequisites

- CSM Enterprise or CSM Workload Security with the AWS integration configured
- Access to AWS Management Console
- AWS Fargate ECS or EKS workloads

#### Images

* `cws-instrumentation-init`: `datadog/cws-instrumentation:latest`
* `datadog-agent`: `datadog/agent:latest`

### Installation

{{< tabs >}}
{{% tab "Amazon ECS" %}}

#### AWS Console

1. Log in to the [AWS Management Console][6].
2. Navigate to the ECS section.
3. On the left menu, select **Task Definitions**, and then select **Create new Task Definition with JSON**. Alternatively, choose an existing Fargate task definition.
4. To create a new task definition, use the JSON definition, or the [AWS CLI method](#aws-cli).
5. Click **Create** to create the task definition.

#### AWS CLI

1. Download [datadog-agent-cws-ecs-fargate.json][7].
{{< code-block lang="json" filename="datadog-agent-cws-ecs-fargate.json" collapsible="true" >}}
{
    "family": "<YOUR_TASK_NAME>",
    "cpu": "256",
    "memory": "512",
    "networkMode": "awsvpc",
    "pidMode": "task",
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "containerDefinitions": [
        {
            "name": "cws-instrumentation-init",
            "image": "datadog/cws-instrumentation:latest",
            "essential": false,
            "user": "0",
            "command": [
                "/cws-instrumentation",
                "setup",
                "--cws-volume-mount",
                "/cws-instrumentation-volume"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": false
                }
            ]
        },
        {
            "name": "datadog-agent",
            "image": "datadog/agent:latest",
            "essential": true,
            "environment": [
                {
                    "name": "DD_API_KEY",
                    "value": "<DD_API_KEY>"
                },
                {
                    "name": "DD_SITE",
                    "value": "datadoghq.com"
                },
                {
                    "name": "ECS_FARGATE",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_ENABLED",
                    "value": "true"
                },
                {
                    "name": "DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED",
                    "value": "true"
                }
            ],
            "healthCheck": {
                "command": [
                    "CMD-SHELL",
                    "/probe.sh"
                ],
                "interval": 30,
                "timeout": 5,
                "retries": 2,
                "startPeriod": 60
            }
        },
        {
            "name": "<YOUR_APP_NAME>",
            "image": "<YOUR_APP_IMAGE>",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--",
                "<ENTRYPOINT>"
            ],
            "mountPoints": [
                {
                    "sourceVolume": "cws-instrumentation-volume",
                    "containerPath": "/cws-instrumentation-volume",
                    "readOnly": true
                }
            ],
            "linuxParameters": {
                "capabilities": {
                    "add": [
                        "SYS_PTRACE"
                    ]
                }
            },
            "dependsOn": [
                {
                    "containerName": "datadog-agent",
                    "condition": "HEALTHY"
                },
                {
                    "containerName": "cws-instrumentation-init",
                    "condition": "SUCCESS"
                }
            ]
        }
    ],
    "volumes": [
        {
            "name": "cws-instrumentation-volume"
        }
    ]
}
{{< /code-block >}}

2. Update the following items in the JSON file:
    - `TASK_NAME`
    - `DD_API_KEY`
    - `DD_SITE`
    - `YOUR_APP_NAME`
    - `YOUR_APP_IMAGE`
    - `ENTRYPOINT`

    You can use the following command to find the entry point of your workload:

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Entrypoint}}'
    ```

    or

    ```shell
    docker inspect <YOUR_APP_IMAGE> -f '{{json .Config.Cmd}}'
    ```

    **Note**: The environment variable `ECS_FARGATE` is already set to "true".

3. Add your other application containers to the task definition. For details on collecting integration metrics, see [Integration Setup for ECS Fargate][8].
4. Run the following command to register the ECS task definition:

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

[6]: /integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui

{{% /tab %}}

{{% tab "Amazon EKS" %}}

To collect data from your AWS Fargate pods, you must run the Agent as a sidecar of your application pod and set up Role-Based Access Control (RBAC) rules.

<div class="alert alert-info">If the Agent is running as a sidecar, it can only communicate with containers on the same pod. Run an Agent for every pod you wish to monitor.</div>

#### Set up RBAC rules

Use the following [Agent RBAC deployment instruction][6] before deploying the Agent as a sidecar.

#### Deploy the Agent as a sidecar

{{% csm-fargate-eks-sidecar %}}

[6]: /integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

### Verify that the Agent is sending events to CSM

When you enable CSM on AWS Fargate ECS or EKS, the Agent sends a log to Datadog to confirm that the default ruleset has been successfully deployed. To view the log, navigate to the [Logs][9] page in Datadog and search for `@agent.rule_id:ruleset_loaded`.

Another method to verify that the Agent is sending events to CSM is to manually trigger an AWS Fargate security signal.

In the task definition, replace the "workload" container with the following:

{{< code-block lang="yaml" collapsible="true" >}}
            "name": "cws-signal-test",
            "image": "ubuntu:latest",
            "entryPoint": [
                "/cws-instrumentation-volume/cws-instrumentation",
                "trace",
                "--verbose",
                "--",
                "/usr/bin/bash",
                "-c",
                "apt update;apt install -y curl; while true; do curl https://google.com; sleep 5; done"
            ],
{{< /code-block >}}

## Application Security Management

### Prerequisites

- The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- Datadog APM is configured for your application or service, and traces are being received by Datadog.

### Installation

#### Threat Detection and Protection

For step-by-step instructions, see the following articles:

- [Java][10]
- [.NET][11]
- [Go][12]
- [Ruby][13]
- [Node.js][14]
- [Python][15]

#### Code Security

For step-by-step instructions, see the following articles:

- [Java][18]
- [.NET][19]
- [Node.js][20]

## Cloud SIEM

AWS Fargate and Related Resources via AWS Cloud Controlplane logs

*Control Plane monitoring*

AWS account logs (not the eks logs), CloudTrail

For step-by-step instructions, see [AWS Configuration Guide for Cloud SIEM][17].

### Enable AWS CloudTrail logging

{{% cloud-siem-aws-cloudtrail-enable %}}

### Send AWS CloudTrail logs to Datadog

{{% cloud-siem-aws-cloudtrail-send-logs %}}

[1]: /integrations/ecs_fargate/
[2]: /integrations/eks_fargate/
[3]: /security/cloud_security_management/
[4]: /security/application_security/
[5]: /security/cloud_siem/
[6]: /integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[10]: /security/application_security/enabling/tracing_libraries/threat_detection/java?tab=awsfargate
[11]: /security/application_security/enabling/tracing_libraries/threat_detection/go/?tab=amazonecs
[12]: /security/application_security/enabling/tracing_libraries/threat_detection/dotnet?tab=awsfargate
[13]: /security/application_security/enabling/tracing_libraries/threat_detection/ruby?tab=awsfargate
[14]: /security/application_security/enabling/tracing_libraries/threat_detection/nodejs?tab=awsfargate
[15]: /security/application_security/enabling/tracing_libraries/threat_detection/python?tab=awsfargate
[16]: /security/application_security/enabling/compatibility/
[17]: /security/cloud_siem/guide/aws-config-guide-for-cloud-siem/
[18]: /security/application_security/enabling/tracing_libraries/code_security/java/
[19]: /security/application_security/enabling/tracing_libraries/code_security/dotnet?tab=awsfargate
[20]: /security/application_security/enabling/tracing_libraries/code_security/nodejs