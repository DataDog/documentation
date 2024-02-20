---
title: Setting Up Cloud Security Management on AWS Fargate ECS and EKS
kind: documentation
private: true
---

<div class="alert alert-warning">Cloud Security Management on Fargate is in private beta.</div>

Use the following instructions to enable [CSM Threats][1] on AWS Fargate ECS and EKS. To learn more about the supported deployment types for each CSM feature, see Setting Up Cloud Security Management.

Datadog Cloud Security Management on Fargate includes built-in threat detection for AWS Fargate process and file integrity monitoring (FIM) events as well as 95 out-of-the-box rules.

The public beta will add network event collection and automated instrumentation when installing the Datadog Agent on Fargate.

**DIAGRAM PLACEHOLDER**

## Prerequisites

* [CSM Enterprise][2] or [CSM Workload Security][3] with the AWS integration configured
* Access to AWS
* AWS Fargate ECS or EKS workloads

### Images

* cws-instrumentation: datadog/cws-instrumentation-dev:cws-instrumentation-beta
* Datadog-agent: datadog/agent:7.51.0-rc.6-linux

## Installation

### AWS Console

1. Log in to the [AWS Management Console][4].
2. Navigate to the ECS section.
3. On the left menu, click **Task Definitions**, then click **Create new Task Definition with JSON** or choose an existing Fargate task definition.
4. Use the JSON definition of the AWS CLI method.
5. Click **Create** to create the task definition.

### AWS CLI

1. Download [datadog-agent-cws-ecs-fargate.json][5].
{{< code-block lang="json" filename="datadog-agent-cws-ecs-fargate.json" collapsible="true" >}}
{
    "family": "<YOUR_TASK_NAME>",
    "cpu": "256",
    "memory": "512",
    "networkMode": "awsvpc",
    "requiresCompatibilities": [
        "FARGATE"
    ],
    "containerDefinitions": [
        {
            "name": "cws-instrumentation-init",
            "image": "datadog/cws-instrumentation-dev:cws-instrumentation-beta",
            "essential": false,
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
            "image": "datadog/agent:7.51.0-rc.6-linux",
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

2. Update the JSON file with a `TASK_NAME`, your Datadog API key, and the appropriate `DD_SITE` (datadoghq.com).

    **Note**: The environment variable `ECS_FARGATE` is already set to `true`. Update the JSON with `YOUR_APP_NAME/YOUR_APP_IMAGE` and specify the `ENTRYPOINT`.

3. Add your other application containers to the task definition. For details on collecting integration metrics, see [Integration Setup for ECS Fargate][6].
4. Run the following command to register the ECS task definition:

{{< code-block lang="shell" collapsible="true" >}}
aws ecs register-task-definition --cli-input-json file://<PATH_TO_FILE>/datadog-agent-ecs-fargate.json
{{< /code-block >}}

## EKS

### Running the Agent as a sidecar

This is the minimum manifest configuration to deploy your application with the Datadog Agent as a sidecar with CSM Threats enabled.

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
       image: datadog/cws-instrumentation-dev:cws-instrumentation-beta
       command:
         - "/cws-instrumentation"
         - "setup"
         - "--cws-volume-mount"
         - "/cws-instrumentation-volume"
       volumeMounts:
         - name: cws-instrumentation-volume
           mountPath: "/cws-instrumentation-volume"
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
       image: datadog/agent:7.51.0-rc.6-linux 
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
{{< /code-block >}}

[1]: /security/threats/
[2]: /security/cloud_security_management/setup/csm_enterprise
[3]: /security/cloud_security_management/setup/csm_workload_security
[4]: https://aws.amazon.com/console
[5]: https://docs.datadoghq.com/resources/json/datadog-agent-ecs-fargate.json
[6]: /integrations/faq/integration-setup-ecs-fargate/?tab=rediswebui