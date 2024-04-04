---
title: Archive Logs for Splunk HTTP Event Collector (HEC)
kind: document
disable_toc: false
---

## Overview

Configure your Splunk HTTP Event Collector (HEC) so that the Observability Pipelines Worker formats the logs collected into a Datadog-rehydratable format before routing them to Datadog Log Archives. See [Archive Logs from Splunk Heavy and Universal Forwarders][1] if you want to archives logs from your Splunk Heavy or Splunk Universal Forwarders.


This document walks through the following steps:
1. The [prerequisites](#prerequisites) needed to set up Observability Pipelines
1. [Configuring a Log Archive](#configure-a-log-archive)
1. [Setting up Observability Pipelines](#set-up-observability-pipelines)
1. [Routing your logs to the Observability Pipelines Worker](#route-your-logs-to-the-observability-pipelines-worker)

## Prerequisites

{{% observability_pipelines/prerequisites/splunk_hec %}}

## Configure a Log Archive

### Create an Amazon S3 bucket

{{< site-region region="us,us3,us5" >}}
See [AWS Pricing][1] for inter-region data transfer fees and how cloud storage costs may be impacted.

[1]: https://aws.amazon.com/s3/pricing/
{{< /site-region >}}

1. Navigate to [Amazon S3 buckets][2].
1. Click **Create bucket**.
1. Enter a descriptive name for your bucket.
1. Do not make your bucket publicly readable.
1. Optionally, add tags.
1. Click **Create bucket**.

### Set up an IAM policy that allows Workers to write to the S3 bucket

1. Navigate to the [IAM console][3].
1. Select **Policies** in the left side menu.
1. Click **Create policy**.
1. Click **JSON** in the **Specify permissions** section.
1. Copy the below policy and paste it into the **Policy editor**. Replace `<MY_BUCKET_NAME>` and `<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>` with the information for the S3 bucket you created earlier.
{{< code-block lang="json">}}
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "DatadogUploadAndRehydrateLogArchives",
            "Effect": "Allow",
            "Action": ["s3:PutObject", "s3:GetObject"],
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME_1_/_MY_OPTIONAL_BUCKET_PATH_1>/*"
        },
        {
            "Sid": "DatadogRehydrateLogArchivesListBucket",
            "Effect": "Allow",
            "Action": "s3:ListBucket",
            "Resource": "arn:aws:s3:::<MY_BUCKET_NAME>"
        }
    ]
}
{{< /code-block >}}
1. Click **Next**.
1. Enter a descriptive policy name.
1. Optionally, add tags.
1. Click **Create policy**.

{{< tabs >}}
{{% tab "Docker" %}}

### Create an IAM user

Create an IAM user and attach the IAM policy you created earlier to it.

1. Navigate to the [IAM console][1].
1. Select **Users** in the left side menu.
1. Click **Create user**.
1. Enter a user name.
1. Click **Next**.
1. Select **Attach policies directly**.
1. Choose the IAM policy you created earlier to attach to the new IAM user.
1. Click **Next**.
1. Optionally, add tags.
1. Click **Create user**.

Create access credentials for the new IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.


[1]: https://console.aws.amazon.com/iam/
{{% /tab %}}
{{% tab "AWS EKS" %}}

### Create a service account

[Create a service account][1] to use the policy you created above. In the Helm configuration, replace `${DD_ARCHIVES_SERVICE_ACCOUNT}` with the name of the service account.


[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
{{% /tab %}}
{{% tab "APT-based Linux" %}}

### Create an IAM user

Create an IAM user and attach the IAM policy you created earlier to it.

1. Navigate to the [IAM console][1].
1. Select **Users** in the left side menu.
1. Click **Create user**.
1. Enter a user name.
1. Click **Next**.
1. Select **Attach policies directly**.
1. Choose the IAM policy you created earlier to attach to the new IAM user.
1. Click **Next**.
1. Optionally, add tags.
1. Click **Create user**.

Create access credentials for the new IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.


[1]: https://console.aws.amazon.com/iam/
{{% /tab %}}
{{% tab "RPM-based Linux" %}}

### Create an IAM user

Create an IAM user and attach the IAM policy you created earlier to it.

1. Navigate to the [IAM console][1].
1. Select **Users** in the left side menu.
1. Click **Create user**.
1. Enter a user name.
1. Click **Next**.
1. Select **Attach policies directly**.
1. Choose the IAM policy you created earlier to attach to the new IAM user.
1. Click **Next**.
1. Optionally, add tags.
1. Click **Create user**.

Create access credentials for the new IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.


[1]: https://console.aws.amazon.com/iam/
{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

### Attach the policy to the IAM instance profile

Attach the policy to the IAM Instance Profile that is created with Terraform, which you can find under the `iam-role-name` output.

{{% /tab %}}
{{< /tabs >}}

### Connect the S3 bucket to Datadog Log Archives

1. Navigate to Datadog [Log Forwarding][4].
1. Click **Add a new archive**.
1. Enter a descriptive archive name.
1. Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.
1. Select **AWS S3**.
1. Select the AWS Account that your bucket is in.
1. Enter the name of the S3 bucket.
1. Optionally, enter a path.
1. Check the confirmation statement.
1. Optionally, add tags and define the maximum scan size for rehydration. See [Advanced settings][4] for more information.
1. Click **Save**.

See the [Log Archives documentation][5] for additional information.

## Set up Observability Pipelines

1. Navigate to [Observability Pipelines][6].
1. Select the **Archive Logs** use case to create a new pipeline.
1. Select **Splunk HEC** as the source.

### Set up the source

{{% observability_pipelines/source_settings/splunk_hec %}}

### Set up the destinations

Enter the following information based on your selected logs destinations.

{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_settings/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_settings/splunk_hec %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_settings/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

### Set up processors

{{% observability_pipelines/processors/intro %}}

{{< tabs >}}
{{% tab "Filter" %}}

{{% observability_pipelines/processors/filter %}}

{{% /tab %}}
{{% tab "Sample" %}}

{{% observability_pipelines/processors/sample %}}

{{% /tab %}}
{{% tab "Quota" %}}

{{% observability_pipelines/processors/quota %}}

{{% /tab %}}
{{% tab "Dedupe" %}}

{{% observability_pipelines/processors/dedupe %}}

{{% /tab %}}
{{% tab "Remap" %}}

{{% observability_pipelines/processors/remap %}}

{{% /tab %}}
{{< /tabs >}}

## Install the Observability Pipelines Worker
1. Select your platform in the **Choose your installation platform** dropdown menu.
1. Enter the Splunk HEC address. This is the address and port where your applications are sending their logging data to. The Observability Pipelines Worker listens to this address for incoming logs.
1. Provide the environment variables for each of your selected destinations.
{{< tabs >}}
{{% tab "Datadog" %}}

{{% observability_pipelines/destination_env_vars/datadog %}}

{{% /tab %}}
{{% tab "Splunk HEC" %}}

{{% observability_pipelines/destination_env_vars/splunk_hec %}}

{{% /tab %}}
{{% tab "Splunk TCP" %}}

{{% observability_pipelines/destination_env_vars/splunk_tcp %}}

{{% /tab %}}
{{% tab "Sumo Logic" %}}

{{% observability_pipelines/destination_env_vars/sumo_logic %}}

{{% /tab %}}
{{< /tabs >}}

1. Follow the instructions for your environment to install the Worker.
{{< tabs >}}
{{% tab "Docker" %}}

{{% observability_pipelines/install_worker/docker %}}

{{% /tab %}}
{{% tab "Amazon EKS" %}}

{{% observability_pipelines/install_worker/amazon_eks %}}

{{% /tab %}}
{{% tab "Azure AKS" %}}

{{% observability_pipelines/install_worker/azure_aks %}}

{{% /tab %}}
{{% tab "Google GKE" %}}

{{% observability_pipelines/install_worker/google_gke %}}

{{% /tab %}}
{{% tab "Linux (APT)" %}}

{{% observability_pipelines/install_worker/linux_apt %}}

{{% /tab %}}
{{% tab "Linux (RPM)" %}}

{{% observability_pipelines/install_worker/linux_rpm %}}

{{% /tab %}}
{{% tab "CloudFormation" %}}

{{% observability_pipelines/install_worker/cloudformation %}}

{{% /tab %}}
{{< /tabs >}}

## Route your logs to the Observability Pipelines Worker

TKTK

[1]: /archive_logs/splunk_tcp/
[2]: https://s3.console.aws.amazon.com/s3/home
[3]: https://console.aws.amazon.com/iam/
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[5]: /logs/log_configuration/archives
[6]: https://app.datadoghq.com/observability-pipelines
