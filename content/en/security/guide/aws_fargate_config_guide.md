---
title: AWS Fargate Configuration Guide for Datadog Security
disable_toc: false
aliases:
  - /security/cloud_security_management/setup/fargate
---

This guide walks you through configuring [Cloud Security Management (CSM)][3], [Application Security Management (ASM)][4], and [Cloud SIEM][5] on AWS Fargate.

## Full stack coverage for AWS Fargate

Datadog Security provides multiple layers of visibility for AWS Fargate. Use the products in combination with one another to gain full stack coverage, as shown in the following tables:

### Fargate assets

<table>
    <thead>
    <th>Asset</th>
    <th>Observability</th>
    <th>Vulnerabilities and Misconfiguration Remediation</th>
    <th>Threat Detection and Response</th>
    </thead>
    <tr>
    </tr>
    <tr>
        <td>Fargate Application</td>
        <td>Application Performance Monitoring</td>
        <td>Application Security Management</td>
        <td>Application Security Management</td>
    </tr>
    <tr>
        <td>Fargate Infrastructure</td>
        <td>Infrastructure Monitoring</td>
        <td>Not yet supported</td>
        <td>CSM Threats</td>
    </tr>
</table>

### Fargate-related resources

<table>
    <thead>
    <th>Asset</th>
    <th>Observability</th>
    <th>Vulnerabilities and Misconfiguration Remediation</th>
    <th>Threat Detection and Response</th>
    </thead>
    <tr>
        <td>AWS IAM roles and policies</td>
        <td>Log Management</td>
        <td>Cloud Security Management</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>AWS databases</td>
        <td>Log Management</td>
        <td>Cloud Security Management</td>
        <td>Cloud SIEM</td>
    </tr>
    <tr>
        <td>AWS S3 buckets</td>
        <td>Log Management</td>
        <td>Cloud Security Management</td>
        <td>Cloud SIEM</td>
    </tr>
</table>

## Cloud Security Management

### Prerequisites

- The Datadog AWS integration is installed and configured for your AWS accounts
- Access to AWS Management Console
- AWS Fargate ECS or EKS workloads

<div class="alert alert-info">For additional performance and reliability insights, Datadog recommends enabling Infrastructure Monitoring with Cloud Security Management.</div>

### Images

* `cws-instrumentation-init`: `public.ecr.aws/datadog/cws-instrumentation:latest`
* `datadog-agent`: `public.ecr.aws/datadog/agent:latest`

### Installation

{{< tabs >}}
{{% tab "Amazon ECS" %}}

#### AWS Console

1. Sign in to [AWS Management Console][6].
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
            "image": "public.ecr.aws/datadog/cws-instrumentation:latest",
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
            "image": "public.ecr.aws/datadog/agent:latest",
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

The following manifest represents the minimum configuration required to deploy your application with the Datadog Agent as a sidecar with CSM Threats enabled:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
 name: "<APPLICATION_NAME>"
 namespace: default
spec:
 replicas: 1
 selector:
   matchLabels:
     app: "<APPLICATION_NAME>"
 template:
   metadata:
     labels:
       app: "<APPLICATION_NAME>"
     name: "<POD_NAME>"
   spec:
     initContainers:
     - name: cws-instrumentation-init
       image: public.ecr.aws/datadog/cws-instrumentation:latest
       command:
         - "/cws-instrumentation"
         - "setup"
         - "--cws-volume-mount"
         - "/cws-instrumentation-volume"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
       securityContext:
         runAsUser: 0
     containers:
     - name: "<YOUR_APP_NAME>"
       image: "<YOUR_APP_IMAGE>"
       command:
         - "/cws-instrumentation-volume/cws-instrumentation"
         - "trace"
         - "--"
         - "<ENTRYPOINT>"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
           readOnly: true
     - name: datadog-agent
       image: public.ecr.aws/datadog/agent:latest
       env:
         - name: DD_API_KEY
           value: "<DD_API_KEY>"
         - name: DD_RUNTIME_SECURITY_CONFIG_ENABLED
           value: "true"
         - name: DD_RUNTIME_SECURITY_CONFIG_EBPFLESS_ENABLED
           value: "true"
         - name: DD_EKS_FARGATE
           value: "true"
         - name: DD_CLUSTER_NAME
           value: "<CLUSTER_NAME>"
         - name: DD_KUBERNETES_KUBELET_NODENAME
           valueFrom:
             fieldRef:
               apiVersion: v1
               fieldPath: spec.nodeName
     volumes:
       - name: cws-instrumentation-volume
     serviceAccountName: datadog-agent
     shareProcessNamespace: true
```

[6]: /integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac

{{% /tab %}}
{{< /tabs >}}

### Verify that the Agent is sending events to CSM

When you enable CSM on AWS Fargate ECS or EKS, the Agent sends a log to Datadog to confirm that the default ruleset has been successfully deployed. To view the log, navigate to the [Logs][9] page in Datadog and search for `@agent.rule_id:ruleset_loaded`.

<div class="alert alert-info">You can also verify the Agent is sending events to CSM by manually triggering an AWS Fargate security signal.</div>

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

- The Datadog Agent is installed and configured for your application's operating system or container, cloud, or virtual environment
- Datadog APM is configured for your application or service

<div class="alert alert-info"> For additional performance and reliability insights, Datadog recommends enabling Application Performance Monitoring with Application Security Management.</div>

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

### Prerequisites

- [Log ingestion][21] is configured to collect logs from your sources.

### Installation

For step-by-step instructions, see [AWS Configuration Guide for Cloud SIEM][17].

#### Enable AWS CloudTrail logging

{{% cloud-siem-aws-cloudtrail-enable %}}

#### Send AWS CloudTrail logs to Datadog

{{% cloud-siem-aws-cloudtrail-send-logs %}}

[1]: /integrations/ecs_fargate/
[2]: /integrations/eks_fargate/
[3]: /security/cloud_security_management/
[4]: /security/application_security/
[5]: /security/cloud_siem/
[6]: /integrations/eks_fargate/?tab=manual#aws-eks-fargate-rbac
[7]: /resources/json/datadog-agent-cws-ecs-fargate.json
[8]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/logs
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
[21]: https://app.datadoghq.com/security/configuration/siem/setup