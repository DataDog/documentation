---
title: Setting Up Cloud Security Management on AWS Fargate ECS and EKS
kind: documentation
private: true
---

...is available for [CSM Enterprise][1] and [CSM Workload Security][2].

## Prerequisites

.

## Installation

### AWS Console


### AWS CLI

1. Download X.
2. Update the JSON with a TASK_NAME, your Datadog API Key, and the appropriate DD_SITE (datadoghq.com).

**Note**: The environment variable `ECS_FARGATE` is already set to `true`. Update the JSON with YOUR_APP_NAME/YOUR_APP_IMAGE and specify the ENTRYPOINT.

3. Add your other application containers to the task definition. For details on collecting integration metrics, see [Integration Setup for ECS Fargate][3].
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

[1]: /security/cloud_security_management/setup/csm_enterprise
[2]: /security/cloud_security_management/setup/csm_workload_security
[3]: /security/cloud_security_management/setup/csm_workload_security