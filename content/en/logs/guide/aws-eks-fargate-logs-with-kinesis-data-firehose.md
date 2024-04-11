---
title: Send Amazon EKS Fargate Logs with Amazon Data Firehose
kind: guide
further_reading:
- link: https://docs.datadoghq.com/logs/log_configuration/processors/
  tag: Documentation
  text: Processors
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html
  tag: Documentation
  text: Fargate logging
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  tag: Documentation
  text: AWS Fargate profile
---

## Overview

AWS Fargate on EKS provides a fully managed experience for running Kubernetes workloads. Amazon Data Firehose can be used with EKS's Fluent Bit log router to collect logs in Datadog. This guide provides a comparison of log forwarding through Amazon Data Firehose and CloudWatch logs, as well as a sample EKS Fargate application to send logs to Datadog through Amazon Data Firehose.

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Diagram of the log flow depicting a Fargate EKS cluster sending container logs through Fluent Bit log router to Amazon data firehose and an S3 backup bucket within AWS and then on to Datadog" responsive="true">}}

### Amazon Data Firehose and CloudWatch log forwarding

The following are key differences between using Amazon Data Firehose and CloudWatch log forwarding.

- **Metadata and tagging**: Metadata, such as Kubernetes namespace and container ID, are accessible as structured attributes when sending logs with Amazon Data Firehose.

- **AWS Costs**: AWS Costs may vary for individual use cases but Amazon Data Firehose ingestion is generally less expensive than comparable Cloudwatch Log ingestion.

## Requirements
1. The following command line tools: [`kubectl`][6], [`aws`][7].
2. An EKS cluster with a [Fargate profile][1] and Fargate pod execution role. In this guide, the cluster is named `fargate-cluster` with a Fargate profile named `fargate-profile` applied to the namespace `fargate-namespace`. If you don't already have these resources, use [Getting Started with Amazon EKS][8] to create the cluster and [Getting Started with AWS Fargate using Amazon EKS][9] to create the Fargate profile and pod execution role.

## Setup

The following steps outline the process for sending logs from a sample application deployed on an EKS cluster through Fluent Bit and an Amazon Data Firehose delivery stream to Datadog. To maximize consistency with standard Kubernetes tags in Datadog, instructions are included to remap selected attributes to tag keys.

1. [Create an Amazon Data Firehose delivery stream](#create-an-amazon-data-firehose-delivery-stream) that delivers logs to Datadog, along with an S3 Backup for any failed log deliveries.
2. [Configure Fluent Bit for Firehose on EKS Fargate](#configure-fluent-bit-for-firehose-on-an-eks-fargate-cluster).
3. [Deploy a sample application](#deploy-a-sample-application).
4. [Apply remapper processors](#remap-attributes-for-log-correlation) for correlation using Kubernetes tags and the `container_id` tag.

### Create an Amazon Data Firehose delivery stream

See the [Send AWS Services Logs with the Datadog Amazon Data Firehose Destination][4] guide to set up an Amazon Data Firehose Delivery stream.
**Note**: Set the **Source** as `Direct PUT`.

### Configure Fluent Bit for Firehose on an EKS Fargate cluster

1. Create the `aws-observability` namespace.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl create namespace aws-observability
{{< /code-block >}}

2. Create the following Kubernetes ConfigMap for Fluent Bit as `aws-logging-configmap.yaml`. Substitute the name of your delivery stream.

{{< code-block lang="yaml" filename="" disable_copy="false" collapsible="false" >}}
apiVersion: v1
kind: ConfigMap
metadata:
  name: aws-logging
  namespace: aws-observability
data:
  filters.conf: |
    [FILTER]
        Name                kubernetes
        Match               kube.*
        Merge_Log           On
        Buffer_Size         0
        Kube_Meta_Cache_TTL 300s

  flb_log_cw: 'true'

  output.conf: |
    [OUTPUT]
        Name amazon_data_firehose
        Match kube.*
        region <REGION>
        delivery_stream <YOUR-DELIVERY-STREAM-NAME>
{{< /code-block >}}

3. Use `kubectl` to apply the ConfigMap manifest.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
kubectl apply -f aws-logging-configmap.yaml
{{< /code-block >}}

4. Create an IAM policy and attach it to the pod execution role to allow the log router running on AWS Fargate to write to the Amazon Data Firehose. You can use the example below, replacing the ARN in the **Resource** field with the ARN of your delivery stream, as well as specifying your region and account ID.

{{< code-block lang="json" filename="allow_firehose_put_permission.json" disable_copy="false" collapsible="false" >}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "VisualEditor0",
            "Effect": "Allow",
            "Action": [
                "firehose:PutRecord",
                "firehose:PutRecordBatch"
            ],
            "Resource":
       "arn:aws:firehose:<REGION>:<ACCOUNTID>:deliverystream/<DELIVERY-STREAM-NAME>"
       }
]
}
{{< /code-block >}}

   a. Create the policy.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
aws iam create-policy \
         --policy-name FluentBitEKSFargate \
         --policy-document file://allow_firehose_put_permission.json
{{< /code-block >}}

   b. Retrieve the Fargate Pod Execution Role and attach the IAM policy.

{{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 POD_EXEC_ROLE=$(aws eks describe-fargate-profile \
   --cluster-name fargate-cluster \
   --fargate-profile-name fargate-profile \
   --query 'fargateProfile.podExecutionRoleArn' --output text |cut -d '/' -f 2)
 aws iam attach-role-policy \
         --policy-arn arn:aws:iam::<ACCOUNTID>:policy/FluentBitEKSFargate \
         --role-name $POD_EXEC_ROLE
{{< /code-block >}}

### Deploy a sample application

To generate logs and test the Amazon Data Firehose delivery stream, deploy a sample workload to your EKS Fargate cluster.

1. Create a deployment manifest `sample-deployment.yaml`.

{{< code-block lang="yaml" filename="sample-deployment.yaml" disable_copy="false" collapsible="false" >}}
 apiVersion: apps/v1
 kind: Deployment
 metadata:
   name: sample-app
   namespace: fargate-namespace
 spec:
   selector:
     matchLabels:
       app: nginx
   replicas: 1
   template:
     metadata:
       labels:
         app: nginx
     spec:
       containers:
       - name: nginx
         image: nginx
         ports:
         - containerPort: 80
{{< /code-block >}}

 2. Create the `fargate-namespace` namespace.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl create namespace fargate-namespace
 {{< /code-block >}}

 3. Use `kubectl` to apply the deployment manifest.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl apply -f sample-deployment.yaml
 {{< /code-block >}}

### Validation

1. Verify that `sample-app` pods are running in the namespace `fargate-namespace`.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl get pods -n fargate-namespace
 {{< /code-block >}}

Expected output:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 NAME                          READY   STATUS    RESTARTS   AGE
 sample-app-6c8b449b8f-kq2qz   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-nn2w7   1/1     Running   0          3m56s
 sample-app-6c8b449b8f-wzsjj   1/1     Running   0          3m56s
 {{< /code-block >}}

2. Use `kubectl describe pod` to confirm that the Fargate logging feature is enabled.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl describe pod <POD-NAME> -n fargate-namespace |grep Logging
 {{< /code-block >}}

Expected output:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
                    Logging: LoggingEnabled
 Normal  LoggingEnabled   5m   fargate-scheduler  Successfully enabled logging for pod
 {{< /code-block >}}

3. Inspect deployment logs.

 {{< code-block lang="shell" filename="" disable_copy="false" collapsible="false" >}}
 kubectl logs -l app=nginx -n fargate-namespace
 {{< /code-block >}}

Expected output:

 {{< code-block lang="bash" filename="" disable_copy="true" collapsible="false" >}}
 /docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
 /docker-entrypoint.sh: Configuration complete; ready for start up
 2023/01/27 16:53:42 [notice] 1#1: using the "epoll" event method
 2023/01/27 16:53:42 [notice] 1#1: nginx/1.23.3
 2023/01/27 16:53:42 [notice] 1#1: built by gcc 10.2.1 20210110 (Debian 10.2.1-6)
 2023/01/27 16:53:42 [notice] 1#1: OS: Linux 4.14.294-220.533.amzn2.x86_64
 2023/01/27 16:53:42 [notice] 1#1: getrlimit(RLIMIT_NOFILE): 1024:65535
 2023/01/27 16:53:42 [notice] 1#1: start worker processes
 ...
 {{< /code-block >}}

4. Verify the logs are in Datadog. In the [Datadog Log Explorer][10], search for `@aws.firehose.arn:"<ARN>"`, replacing `<ARN>` with your Amazon Data Firehose ARN, to filter for logs from the Amazon Data Firehose.

{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_verification.jpg" alt="Verification of the nginx log lines in Datadog Log Explorer" responsive="true">}}

### Remap attributes for log correlation

Logs from this configuration require some attributes to be remapped to maximize consistency with standard Kubernetes tags in Datadog.
1. Go to the [Datadog Log Pipelines][3] page.
2. Create a new pipeline with **Name** `EKS Fargate Log Pipeline` and **Filter** `service:aws source:aws`.
3. Create four [Remapper processors][5] to remap the following attributes to tag keys:
 | Attribute to remap | Target Tag Key |
 |--------------------|----------------|
 | `kubernetes.container_name` | `kube_container_name` |
 | `kubernetes.namespace_name` | `kube_namespace` |
 | `kubernetes.pod_name` | `pod_name` |
 | `kubernetes.docker_id` | `container_id` |

4. After creating this pipeline, logs emitted by the sample app are tagged like this example with the log attributes remapped to Kubernetes tags:
{{< img src="logs/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_example_remapped.jpg" alt="The detail view of a log in Datadog with the container_id, kube_container_name, kube_namespace, and pod_name tags" responsive="true">}}

## Further Reading
 {{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=amazondatafirehosedeliverystream#setup
[5]: /logs/log_configuration/processors/?tab=ui#remapper
[6]: https://kubernetes.io/docs/tasks/tools/
[7]: https://aws.amazon.com/cli/
[8]: https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html
[9]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-getting-started.html
[10]: https://app.datadoghq.com/logs