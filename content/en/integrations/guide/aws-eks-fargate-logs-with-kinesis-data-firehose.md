---
title: AWS EKS Fargate logs with Kinesis Data Firehose
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

AWS Fargate on EKS provides a fully managed experience for running Kubernetes workloads. Kinesis Data Firehose can be used with EKS's Fluentbit log router to collect logs in Datadog.

{{< img src="integrations/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Diagram of the log flow depicting a Fargate EKS cluster sending container logs through Fluentbit log router to Kinesis data firehose and an S3 backup bucket within AWS and then on to Datadog" responsive="true">}}
 
   
### Kinesis Data Firehose vs Cloudwatch log forwarding {#firehose-vs-cloudwatch}

The following are key differences between using Kinesis Data Firehose and CloudWatch log forwarding.

- **Metadata and tagging**: Metadata such as Kubernetes namespace and container ID are accessible as structured attributes when sending logs with Kinesis Data Firehose.

- **AWS Costs**: AWS Costs may vary for individual use cases but Kinesis Data Firehose ingestion is generally less expensive than comparable Cloudwatch Log ingestion. 

## Requirements
1. An EKS cluster with a [Fargate Profile][1]. In this guide, the cluster is named `fargate-cluster` with a fargate profile nameed `fargate-profile` applied to the namespace `fargate-namespace`.
2. The following command line tools: `[kubectl][6]`, `[aws][7]`, `[jq][8]`

## Setup
 
The following steps outline the process for sending logs from a sample application deployed on an EKS cluster through Fluentbit and a Kinesis Data Firehose delivery stream to Datadog. To maximize consistency with standard Kubernetes tags in Datadog, instructions are included to remap selected attributes to tag keys.

1. [Create a Kinesis Data Firehose delivery stream](#create-kinesis-delivery-stream) that delivers logs to Datadog, along with an S3 Backup for any failed log deliveries.
2. [Configure Fluent Bit for Firehose on EKS Fargate](#configure-fluent-bit-for-firehose-on-an-eks-fargate-cluster).
3. [Deploy a sample application](#deploy-a-sample-application).
4. [Apply remapper processors](#remap-attributes-for-log-correlation) for correlation using Kubernetes tags and the `container_id` tag.

### Create Kinesis Delivery Stream

See the [Send AWS service logs with the Datadog Kinesis Firehose Destination][4] guide to set up a Kinesis Firehose Delivery stream.  
**Note**: Set the **Source** as `Direct PUT`.
 
### Configure Fluent Bit for Firehose on an EKS Fargate cluster
 
1. Create the `aws-observability` namespace and apply the following configmap for Fluent Bit. Substitute the name of your delivery stream.

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
        Name kinesis_firehose
        Match kube.*
        region us-west-2
        delivery_stream <YOUR-DELIVERY-STREAM-NAME>
 ```

2. Attach an IAM policy to the pod execution role to allow the log router running on AWS Fargate to write to the Kinesis Data Firehose. You can use the example below, replacing the ARN in the **Resource** field with the ARN of your delivery stream.

{{< code-block lang="json" filename="allow_kinesis_put_permission.json" disable_copy="false" collapsible="false" >}}
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
3. Create the policy.

{{< code-block lang="bash" filename="" disable_copy="false" collapsible="false" >}}
 $ aws iam create-policy \
         --policy-name FluentBitEKSFargate \
         --policy-document file://allow_kinesis_put_permission.json 
{{< /code-block >}}
4. Retrieve the Fargate Pod Execution Role and attach the IAM policy.

{{< code-block lang="bash" filename="" disable_copy="false" collapsible="false" >}}
 # Retrieve the pod execution role
 POD_EXEC_ROLE=$(aws eks describe-fargate-profile \
   --cluster-name fargate-cluster \
   --fargate-profile-name fargate-profile | jq -r '.fargateProfile.podExecutionRoleArn' | cut -d '/' -f 1)

 # Attach the role policy
 aws iam attach-role-policy \
         --policy-arn arn:aws:iam::<ACCOUNTID>:policy/FluentBitEKSFargate \
         --role-name $POD_EXEC_ROLE
{{< /code-block >}}
### Deploy a sample application

To generate logs and test the Kinesis pipeline, deploy a sample workload to your EKS Fargate cluster.

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
 
 2. Use `kubectl` to apply the deployment manifest;

  {{< code-block lang="bash" filename="" disable_copy="false" collapsible="false" >}}
  $ kubectl apply -f sample-deployment.yaml
  {{< /code-block >}}

### Remap attributes for log correlation

Logs from this configuration require some attributes to be remapped to maximize consistency with standard Kubernetes tags in Datadog.  
1. Go to the [Datadog Log Pipelines][3] page.
2. Create a new pipeline with **Name** `EKS Fargate Log Pipeline` filtered on **Tags:** `service:aws source:aws`
3. Create 4 Remapper processors to remap the following Attributes to Tag Keys:
 | Attribute to remap | Target Tag Key |
 |--------------------|----------------|
 | `kubernetes.container_name` | `kube_container_name` |
 | `kubernetes.namespace_name` | `kube_namespace` |
 | `kubernetes.pod_name` | `pod_name` |
 | `kubernetes.docker_id` | `container_id` |

4. After creating this pipeline, logs emitted by the sample app should be tagged like this example with the log attributes remapped to Kubernetes tags:
{{< img src="integrations/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_example_remapped.jpg" alt="The detail view of a log in Datadog with the container_id, kube_container_name, kube_namespace, and pod_name tags" responsive="true">}}

## Further Reading
 {{< partial name="whats-next/whats-next.html" >}}
 
[1]: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html 
[2]: https://app.datadoghq.com/organization-settings/api-keys
[3]: https://app.datadoghq.com/logs/pipelines
[4]: /logs/guide/send-aws-services-logs-with-the-datadog-kinesis-firehose-destination/?tab=kinesisfirehosedeliverystream#setup
[5]: /logs/log_configuration/processors/?tab=ui#remapper
[6]: https://kubernetes.io/docs/tasks/tools/
[7]: https://aws.amazon.com/cli/
[8]: https://stedolan.github.io/jq/
