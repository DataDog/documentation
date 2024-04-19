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

This guide walks you through configuring [Amazon Elastic Container Service (Amazon ECS)][1] and [Amazon Elastic Kubernetes Service (Amazon EKS)][2] on AWS Fargate for [Cloud Security Management (CSM)][3], [Application Security Management (ASM)][4], and [Cloud SIEM][5].

## Prerequisites

*CSM

- CSM Enterprise or CSM Workload Security with the AWS integration configured
- Access to AWS Management Console
- AWS Fargate ECS or EKS workloads

*ASM

- The Datadog Agent is installed and configured for your application’s operating system or container, cloud, or virtual environment.
- Datadog APM is configured for your application or service, and traces are being received by Datadog.

## Cloud Security Management

### Amazon ECS

### Amazon EKS

To collect data from your AWS Fargate pods, you must run the Agent as a sidecar of your application pod with custom RBAC.

**Note**: If the Agent is running as a sidecar, it can communicate only with containers on the same pod. Run an Agent for every pod you wish to monitor.

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

## Application Security Management

### Amazon ECS

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