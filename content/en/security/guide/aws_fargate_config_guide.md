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

{{< product-availability >}}

 cws-fargate-td-patcher

This guide walks you through configuring [Amazon Elastic Container Service (Amazon ECS)][1] and [Amazon Elastic Kubernetes Service (Amazon EKS)][2] on AWS Fargate for [Cloud Security Management (CSM)][3], [Application Security Management (ASM)][4], and [Cloud SIEM][5].

## Prerequisites

### CSM

- CSM Enterprise or CSM Workload Security with the AWS integration configured
- Access to AWS Management Console
- AWS Fargate ECS or EKS workloads

### ASM

- The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- Datadog APM is configured for your application or service, and traces are being received by Datadog.

## CSM

### Amazon ECS

#### AWS Console

1. Log in to the [AWS Management Console][6].
2. Navigate to the ECS section.
3. On the left menu, click **Task Definitions**, then click **Create new Task Definition with JSON**, or choose an existing Fargate task definition.
4. Use the JSON definition, or the [AWS CLI method](#aws-cli).
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

    **Note**: The environment variable `ECS_FARGATE` is already set to "true".

3. Add your other application containers to the task definition. For details on collecting integration metrics, see [Integration Setup for ECS Fargate][8].
4. Run the following command to register the ECS task definition:

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

### Amazon EKS

#### Set up AWS EKS Fargate RBAC rules

Use the following [Agent RBAC deployment instruction][6] before deploying the Agent as a sidecar.

#### Deploy the Agent as a sidecar

<!-- To collect data from your AWS Fargate pods, you must run the Agent as a sidecar of your application pod with custom RBAC.

**Note**: If the Agent is running as a sidecar, it can communicate only with containers on the same pod. Run an Agent for every pod you wish to monitor. -->

{{% csm-fargate-eks-sidecar %}}

## ASM

### Amazon ECS

{{% appsec-getstarted %}}

- Java
- .NET
- Ruby
- Node.js
- Python

### Amazon EKS

?

## Cloud SIEM

AWS Fargate and Related Resources via AWS Cloud Controlplane logs

*Control Plane monitoring*

[1]: /integrations/ecs_fargate/
[2]: /integrations/eks_fargate/
[3]: /security/cloud_security_management/
[4]: /security/application_security/
[5]: /security/cloud_siem/
[6]: /integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui