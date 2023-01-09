---
title: AWS EKS Fargate logs with Kinesis Data Firehose
kind: guide
further_reading:
- link: https://docs.datadoghq.com/logs/log_configuration/processors/
  tag: "Documentation: Processors"
  text: 
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-logging.html
  tag: "AWS Documentation: Fargate logging"
  text:
- link: https://docs.aws.amazon.com/eks/latest/userguide/fargate-profile.html
  tag: "AWS Documentation: AWS Fargate profile"
  text: 
---

## Overview

AWS Fargate on EKS provides a fully managed experience for running Kubernetes workloads. Kinesis Data Firehose can be used with EKS's Fluentbit log router to collect logs in Datadog.

{{< img src="integrations/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_streaming_diagram.png" alt="Diagram of the log flow depicting a Fargate EKS cluster sending container logs through Fluentbit log router to Kinesis data firehose and an S3 backup bucket within AWS and then on to Datadog" responsive="true">}}
 
   
### Kinesis Data Firehose vs Cloudwatch log forwarding {#firehose-vs-cloudwatch}

The following are key differences between using Kinesis Data Firehose and Cloudwatch log forwarding.

- **Metadata and tagging**: Metadata such as Kubernetes namespace and container ID are accessible as structured attributes when sending logs with Kinesis Data Firehose.

- **AWS Costs**: AWS Costs may vary for individual use cases but Kinesis Data Firehose ingestion is generally less than comparable Cloudwatch Log ingestion. 

## Requirements
1. An EKS cluster with a [Fargate Profile][1]. In this guide, the cluster is named `fargate-cluster` with a fargate profile nameed `fargate-profile` applied to the namespace `fargate-namespace`.
2. The following command line tools: `kubectl`, `aws`, `jq`

## Setup
 
The following steps outline the process for sending logs from a sample application deployed on an EKS cluster through Fluentbit and a Kinesis Data Firehose delivery stream to Datadog. To maximize consistency with standard Kubernetes tags in Datadog, instructions are included to remap selected attributes to tag keys.

1. [Create a Kinesis Data Firehose delivery stream](#create-kinesis-delivery-stream) that delivers logs to Datadog, along with an S3 Backup for any failed log deliveries.
2. [Configure Fluent Bit for Firehose on EKS Fargate](#configure-fluent-bit-for-firehose-on-an-eks-fargate-cluster).
3. [Deploy a sample application](#deploy-a-sample-application).
4. [Apply remapper processors](#remap-attributes-for-log-correlation) for correlation using Kubernetes tags and the `container_id` tag.

### Create Kinesis Delivery Stream

1. Go to the Amazon Kinesis Console. Under Data Firehose, click **Create delivery stream** and use the following settings:
    - **Source and Destination**
{{< img src="integrations/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/kinesis_delivery_stream_configuration.jpg" alt="Delivery Stream Configuration" responsive="true">}}
    - **Source:** Select `Direct PUT`.  
    - **Destination:**  Select `Datadog`.  
    - **Delivery stream name** Set the name of your Delivery stream. (Optional since one is generated)  
    - **Destination Settings**
{{< img src="integrations/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/kinesis_delivery_stream_destination.jpg" alt="Delivery Stream Destination" responsive="true">}}
    - **HTTP endpoint URL** Select URL corresponding to your Datadog site: `Datadog logs - US` or `Datadog logs - EU`.
    - **API key:** Enter your [Datadog API key][2].  
    - **S3 backup bucket:** Select `Failed data only` and choose the desired S3 bucket for backup.  
    - Leave remaining settings as the defaults.
2. Scroll to the bottom and click **Create delivery stream**
3. After creatinng the delivery stream, use the **Test with demo data** function to verify connection to your Datadog account.
 
### Configure Fluent Bit for Firehose on EKS Fargate cluster
 
1. Create the `aws-observabilty` namespace and apply the following configmap for Fluent Bit. Substitue the name of hte delivery stream you created in place of `PUT-DOG-abcde`

 ```yaml
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
        delivery_stream PUT-DOG-abcde
 ```

2. Provide the relevant IAM permissions for the log router running on AWS Fargate to write to the Kinesis Data Firehose by attaching an IAM policy to the pod execution role.

 1. First define a policy in a file nammed `allow_kinesis_put_permission.json`. Replace the ARN with the relevant Firehouse Delivery Stream ARN when you create the file.

 ```json
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
       "arn:aws:firehose:<region>:<accountid>:deliverystream/<firehose>"
       }
]
}
 ```
2. Create the policy.

 ```bash
 $ aws iam create-policy \
         --policy-name FluentBitEKSFargate \
         --policy-document file://allow_kinesis_put_permission.json 
 ```
3. Retrieve the Fargate Pod Execution Role and attach the IAM policy to the Fargate Pod Execution Role

 ```bash
 # Retrieve the pod execution role
 POD_EXEC_ROLE=$(aws eks describe-fargate-profile \
   --cluster-name fargate-cluster \
   --fargate-profile-name fargate-profile | jq -r '.fargateProfile.podExecutionRoleArn' | cut -d '/' -f 1)

 # Attach the role policy
 aws iam attach-role-policy \
         --policy-arn arn:aws:iam::<accountid>:policy/FluentBitEKSFargate \
         --role-name $POD_EXEC_ROLE
 ```
### Deploy sample application

To generate logs and test the Kinesis pipeline, deploy a sample workload to your EKS Fargate cluster.

1. Create a deployment manifest `sample-deployment.yaml`.
 
 ```yaml
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
 ```
 
 2. Use `kubectl` to apply the deployment manifest;

  ```bash
  $ kubectl apply -f sammple-deployment.yaml
  ```

### Remap attributes for log correlation

Logs from this configuration require some attributes to be remapped to maximize consistency with standard Kubernetes tags in Datadog.  
1. Go to [Datadog Log Pipelines][3]
2. Create a new pipeline with **Name** `EKS Fargate Log Pipeline` filtered on **Tags:** `service:aws source:aws`
3. Create 4 Remapper processors to remap the following Attributes to Tag Keys:
 | Attribute to remap | Target Tag Key |
 |--------------------|----------------|
 | `kubernetes.container_name` | `kube_container_name` |
 | `kubernetes.namespace_name` | `kube_namespace` |
 | `kubernetes.pod_name` | `pod_name` |
 | `kubernetes.docker_id` | `container_id` |

4. After creating this pipeline, logs emitted by the sample app should be tagged like this example with the log attributes remapped to Kubernetes tags:
{{< img src="integrations/guide/aws-eks-fargate-logs-with-kinesis-data-firehose/log_example_remapped.jpg" alt="Log Example Remapped" responsive="true">}}

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
