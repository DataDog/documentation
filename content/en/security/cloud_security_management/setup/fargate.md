---
title: Setting Up Cloud Security Management on AWS Fargate ECS and EKS
kind: documentation
private: true
---

<div class="alert alert-warning">Cloud Security Management on AWS Fargate is in private beta.</div>

Use the following instructions to enable [CSM Threats][1] for Amazon ECS and EKS on AWS Fargate. To learn more about the supported deployment types for each CSM feature, see [Setting Up Cloud Security Management][2].

Datadog Cloud Security Management on AWS Fargate includes built-in threat detection for AWS Fargate process and file integrity monitoring (FIM) events as well as [100+ out-of-the-box rules][3].

{{< img src="security/csm/csm_fargate_workflow2.png" alt="Diagram showing the workflow for Cloud Security Management on AWS Fargate" width="100%">}}

## Prerequisites

* [CSM Enterprise][4] or [CSM Workload Security][5] with the AWS integration configured
* Access to AWS Management Console
* AWS Fargate ECS or EKS workloads

### Images

* cws-instrumentation: datadog/cws-instrumentation:latest
* Datadog-agent: datadog/agent:latest

## Installation

### AWS Console

1. Log in to the [AWS Management Console][6].
2. Navigate to the ECS section.
3. On the left menu, click **Task Definitions**, then click **Create new Task Definition with JSON**, or choose an existing Fargate task definition.
4. Use the JSON definition, or the [AWS CLI method](#aws-cli).
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

    **Note**: The environment variable `ECS_FARGATE` is already set to "true".

3. Add your other application containers to the task definition. For details on collecting integration metrics, see [Integration Setup for ECS Fargate][8].
4. Run the following command to register the ECS task definition:

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

## EKS

### Running the Agent as a sidecar

The following manifest represents the minimum configuration required to deploy your application with the Datadog Agent as a sidecar with CSM Threats enabled:

{{< code-block lang="yaml" collapsible="true" >}}
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
       image: datadog/cws-instrumentation:latest
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
       image: datadog/agent:latest 
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
     shareProcessNamespace: true
{{< /code-block >}}

## Verify that the Agent is sending events to CSM

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


[1]: /security/threats/
[2]: /security/cloud_security_management/setup#supported-deployment-types-and-features
[3]: /security/default_rules/?category=cat-csm-threats
[4]: /security/cloud_security_management/setup/csm_enterprise
[5]: /security/cloud_security_management/setup/csm_cloud_workload_security
[6]: https://aws.amazon.com/console
[7]: /resources/json/datadog-agent-ecs-fargate.json
[8]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui
[9]: https://app.datadoghq.com/logs
