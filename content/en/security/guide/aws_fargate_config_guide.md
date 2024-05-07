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

<div class="alert alert-warning">Cloud Security Management on AWS Fargate is in private beta.</div>

This guide walks you through configuring [Amazon Elastic Container Service (Amazon ECS)][1] and [Amazon Elastic Kubernetes Service (Amazon EKS)][2] on AWS Fargate for [Cloud Security Management (CSM)][3], [Application Security Management (ASM)][4], and [Cloud SIEM][5].

## Cloud Security Management

### Prerequisites

- CSM Enterprise or CSM Workload Security with the AWS integration configured
- Access to AWS Management Console
- AWS Fargate ECS or EKS workloads

#### Images

* `cws-instrumentation-init`: `datadog/cws-instrumentation:latest`
* `datadog-agent`: `datadog/agent:latest`

{{< tabs >}}
{{% tab "Amazon ECS" %}}

### AWS Console

1. Log in to the [AWS Management Console][6].
2. Navigate to the ECS section.
3. On the left menu, select **Task Definitions**, and then select **Create new Task Definition with JSON**. Alternatively, choose an existing Fargate task definition.
4. To create a new task definition, use the JSON definition, or the [AWS CLI method](#aws-cli).
5. Click **Create** to create the task definition.

### AWS CLI

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

### Set up RBAC rules

Use the following [Agent RBAC deployment instruction][6] before deploying the Agent as a sidecar.

### Deploy the Agent as a sidecar

{{% csm-fargate-eks-sidecar %}}

[6]: /integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

## Application Security Management

[Compatibility Requirements][16].


For step-by-step instructions, see the following articles:

- [Java][10]
- [.NET][11]
- [Go][12]
- [Ruby][13]
- [Node.js][14]
- [Python][15]

### Prerequisites

- The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment.
- Datadog APM is configured for your application or service, and traces are being received by Datadog.

{{< tabs >}}
{{% tab "Amazon ECS" %}}

- Only threat detection using tracing libraries? (i.e., no single-step instrumentation and no code security.)
- What is VULNERABILITY MANAGEMENT FOR OSS SUPPORT? https://docs.datadoghq.com/security/application_security/enabling/compatibility/ruby#supported-deployment-types

1. Update to the latest Datadog library (the most recent APM tracing library).
1. Enable ASM when starting the Python application.

{{% /tab %}}

{{% tab "Amazon EKS" %}}

To collect data from your AWS Fargate pods, you must run the Agent as a sidecar of your application pod with custom RBAC.

- Confirm that ASM supports EKS on Fargate.

{{% /tab %}}
{{< /tabs >}}

## Threat Detection and Protection

### Java

1. Update your Datadog Java library to at least version 0.94.0 (at least version 1.1.4 for Software Composition Analysis detection features):
1. Run your Java application with ASM enabled. From the command line:
    Or one of the following methods, depending on where your application runs: (FARGATE)

### .NET

1. Update your Datadog .NET library to at least version 2.2.0 (at least version 2.16.0 for Software Composition Analysis detection features) for your target operating system architecture.
1. Enable ASM by setting the DD_APPSEC_ENABLED environment variable to true. For example, on Windows self-hosted, run the following PowerShell snippet as part of your application start up script:

    Or one of the following methods, depending on where your application runs: (FARGATE)

1. Restart the application using a full stop and start.

### Go

1. Add to your program's go.mod dependencies the latest version of the Datadog Go library (version 1.53.0 or later):
1. Datadog has a series of pluggable packages which provide out-of-the-box support for instrumenting a series of Go libraries and frameworks. A list of these packages can be found in the compatibility requirements page. Import these packages into your application and follow the configuration instructions listed alongside each integration.
1. Recompile your program with ASM enabled:
1. Redeploy your Go service and enable ASM by setting the DD_APPSEC_ENABLED environment variable to true:

    Or one of the following methods, depending on where your application runs: (ONLY AWS ECS LISTED?)

### Ruby

1. Update your Gemfile to include the Datadog library:
1. Enable ASM by enabling the APM tracer. The following options describe a quick setup that covers the most common cases. Read the Ruby tracer documentation for more details.

    Or one of the following methods, depending on where your application runs: (FARGATE)

### Node.JS

1. Update your Datadog Node.js library package to at least version 5.0.0 (for Node 18+) or 4.0.0 (for Node 16+) or 3.10.0 (for NodeJS 14+), by running one of these commands:
1. Where you import and initialize the Node.js library for APM, also enable ASM. This might be either in your code or with environment variables. If you initialized APM in code, add {appsec: true} to your init statement:

    Or if you initialize the APM library on the command line using the --require option to Node.js:

    Then use environment variables to enable ASM:

    How you do this varies depending on where your service runs: (FARGATE)

### Python

1. Update your Datadog Python library package to at least version 1.2.2 (at least version 1.5.0 for Software Composition Analysis detection features). Run the following:
1. Enable ASM when starting the Python application.

    You can also use one of the following methods, depending on where your application runs: (FARGATE)

## Code Security

- Java
- .NET
- Node.js

## Cloud SIEM

AWS Fargate and Related Resources via AWS Cloud Controlplane logs

*Control Plane monitoring*

AWS account logs (not the eks logs), CloudTrail

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