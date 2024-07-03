---
aliases:
- /ja/observability_pipelines/guide/route_logs_in_datadog_rehydratable_format_to_Amazon_S3/
disable_toc: false
further_reading:
- link: /observability_pipelines/legacy/working_with_data/
  tag: Documentation
  text: Working with data in Observability Pipelines
- link: /logs/log_configuration/archives/
  tag: Documentation
  text: Learn more about Log Archives
- link: /logs/log_configuration/rehydrating/
  tag: Documentation
  text: Learn more about rehydrating log archives
title: (LEGACY) Route Logs in Datadog-Rehydratable Format to Amazon S3
---

<div class="alert alert-warning">The Observability Pipelines Datadog Archives destination is in beta.</div>

## 概要

The Observability Pipelines `datadog_archives` destination formats logs into a Datadog-rehydratable format and then routes them to [Log Archives][1]. These logs are not ingested into Datadog, but are routed directly to the archive. You can then rehydrate the archive in Datadog when you need to analyze and investigate them.

The Observability Pipelines Datadog Archives destination is useful when:
- You have a high volume of noisy logs, but you may need to index them in Log Management ad hoc.
- You have a retention policy.

For example in this first diagram, some logs are sent to a cloud storage for archiving and others to Datadog for analysis and investigation. However, the logs sent directly to cloud storage cannot be rehydrated in Datadog when you need to investigate them.

{{< img src="observability_pipelines/guide/datadog_archives/op-cloud-storage.png" alt="A diagram showing logs going to cloud storage and Datadog." >}}

In this second diagram, all logs are going to the Datadog Agent, including the logs that went to a cloud storage in the first diagram. However, in the second scenario, before the logs are ingested into Datadog, the `datadog_archives` destination formats and routes the logs that would have gone directly to a cloud storage to Datadog Log Archives instead. The logs in Log Archive can be rehydrated in Datadog when needed.

{{< img src="observability_pipelines/guide/datadog_archives/op-datadog-archives.png" alt="A diagram showing all logs going to Datadog." >}}

This guide walks you through how to:

- [Configure a Log Archive](#configure-a-log-archive)
- [Configure the `datadog_archives` destination](#configure-the-datadog_archives-destination)
- [Rehydrate your archive](#rehydrate-your-archive)

`datadog_archives` is available for Observability Pipelines Worker version 1.5 and later.

## ログアーカイブを構成する

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
1. **Create policy** をクリックします。
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
1. **Next** をクリックします。
1. Enter a descriptive policy name.
1. Optionally, add tags.
1. **Create policy** をクリックします。

{{< tabs >}}
{{% tab "Docker" %}}

### Create an IAM user

IAM ユーザーを作成し、先ほど作成した IAM ポリシーを適用します。

1. Navigate to the [IAM console][1].
1. Select **Users** in the left side menu.
1. **Create user** をクリックします。
1. Enter a user name.
1. **Next** をクリックします。
1. Select **Attach policies directly**.
1. Choose the IAM policy you created earlier to attach to the new IAM user.
1. **Next** をクリックします。
1. Optionally, add tags.
1. **Create user** をクリックします。

Create access credentials for the new IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "AWS EKS" %}}

### サービスアカウントを作成する

[Create a service account][1] to use the policy you created above. In the Helm configuration, replace `${DD_ARCHIVES_SERVICE_ACCOUNT}` with the name of the service account.


[1]: https://docs.aws.amazon.com/eks/latest/userguide/associate-service-account-role.html
{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

### Create an IAM user

IAM ユーザーを作成し、先ほど作成した IAM ポリシーを適用します。

1. Navigate to the [IAM console][1].
1. Select **Users** in the left side menu.
1. **Create user** をクリックします。
1. Enter a user name.
1. **Next** をクリックします。
1. Select **Attach policies directly**.
1. Choose the IAM policy you created earlier to attach to the new IAM user.
1. **Next** をクリックします。
1. Optionally, add tags.
1. **Create user** をクリックします。

Create access credentials for the new IAM user. Save these credentials as `AWS_ACCESS_KEY` and `AWS_SECRET_ACCESS_KEY`.

[1]: https://console.aws.amazon.com/iam/

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

### Create an IAM user

IAM ユーザーを作成し、先ほど作成した IAM ポリシーを適用します。

1. Navigate to the [IAM console][1].
1. Select **Users** in the left side menu.
1. **Create user** をクリックします。
1. Enter a user name.
1. **Next** をクリックします。
1. Select **Attach policies directly**.
1. Choose the IAM policy you created earlier to attach to the new IAM user.
1. **Next** をクリックします。
1. Optionally, add tags.
1. **Create user** をクリックします。

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
1. わかりやすいアーカイブ名を入力します。
1. Add a query that filters out all logs going through log pipelines so that none of those logs go into this archive. For example, add the query `observability_pipelines_read_only_archive`, assuming no logs going through the pipeline have that tag added.
1. Select **AWS S3**.
1. Select the AWS Account that your bucket is in.
1. Enter the name of the S3 bucket.
1. オプションでパスを入力します。
1. Check the confirmation statement.
1. Optionally, add tags and define the maximum scan size for rehydration. See [Advanced settings][5] for more information.
1. **Save** をクリックします。

See the [Log Archives documentation][6] for additional information.

## Configure the `datadog_archives` destination

You can configure the `datadog_archives` destination using the [configuration file](#configuration-file) or the [pipeline builder UI](#configuration-file).

<div class="alert alert-warning">If the Worker is ingesting logs that are not coming from the Datadog Agent and are routed to the Datadog Archives destination, those logs are not tagged with <a href="https://docs.datadoghq.com/logs/log_configuration/attributes_naming_convention/#reserved-attributes">reserved attributes</a>. This means that you lose Datadog telemetry and the benefits of <a href="https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes">unified service tagging</a>. For example, say your syslogs are sent to <code>datadog_archives</code> and those logs have the status tagged as <code>severity</code> instead of the reserved attribute of <code>status</code> and the host tagged as <code>hostname</code> instead of the reserved attribute <code>hostname</code>. When these logs are rehydrated in Datadog, the <code>status</code> for the logs are all set to <code>info</code> and none of the logs will have a hostname tag.</div>

### 構成ファイル

For manual deployments, the [sample pipelines configuration file][7] for Datadog includes a sink for sending logs to Amazon S3 under a Datadog-rehydratable format.

{{< tabs >}}
{{% tab "Docker" %}}

In the sample pipelines configuration file, replace `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with the AWS credentials you created earlier.

{{% /tab %}}
{{% tab "AWS EKS" %}}

In the sample pipelines configuration file, replace `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with the AWS credentials you created earlier.

{{% /tab %}}
{{% tab "APT ベースの Linux" %}}

In the sample pipelines configuration file, replace `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with the AWS credentials you created earlier.

{{% /tab %}}
{{% tab "RPM ベースの Linux" %}}

In the sample pipelines configuration file, replace `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` with the AWS credentials you created earlier.

{{% /tab %}}
{{% tab "Terraform (AWS)" %}}

Replace `${DD_ARCHIVES_BUCKET}` and $`{DD_ARCHIVES_REGION}` parameters based on your S3 configuration.

{{% /tab %}}
{{< /tabs >}}

### Pipeline builder UI

1. Navigate to your [Pipeline][8].
1. (Optional) Add a remap transform to tag all logs going to `datadog_archives`.   
  a. Click **Edit** and then **Add More** in the **Add Transforms.  
  b. Click the **Remap** tile.  
  c. Enter a descriptive name for the component.  
  d. In the **Inputs** field, select the source to connect this destination to.  
  e. Add `.sender = "observability_pipelines_worker"` in the **Source** section.  
  f. Click **Save**.  
  g. Navigate back to your pipeline. 
1. **Edit** をクリックします。
1. Click **Add More** in the **Add Destination** tile.
1. Click the **Datadog Archives** tile.
1. Enter a descriptive name for the component.
1. Select the sources or transforms to connect this destination to.

{{< tabs >}}
{{% tab "AWS S3" %}}

7. In the **Bucket** field, enter the name of the S3 bucket you created earlier.
8. Enter `aws_s3` in the **Service** field.
9. Toggle **AWS S3** to enable those specific configuration options.
10. In the **Storage Class** field, select the storage class in the dropdown menu.
11. Set the other configuration options based on your use case.
12. **Save** をクリックします。

{{% /tab %}}
{{% tab "Azure Blob" %}}

7. In the **Bucket** field, enter the name of the S3 bucket you created earlier.
8. Enter `azure_blob` in the **Service** field.
9. Toggle **Azure Blob** to enable those specific configuration options.
10. Enter the Azure Blob Storage Account connection string.
11. Set the other configuration options based on your use case.
12. **Save** をクリックします。

{{% /tab %}}
{{% tab "GCP Cloud Storage" %}}

7. In the **Bucket** field, enter the name of the S3 bucket you created earlier.
8. Enter `gcp_cloud_storage` in the **Service** field.
9. Toggle **GCP Cloud Storage** to enable those specific configuration options.
10. Set the configuration options based on your use case.
11. **Save** をクリックします。

{{% /tab %}}
{{< /tabs >}}

If you are using Remote Configuration, deploy the change to your pipeline in the UI. For manual configuration, download the updated configuration and restart the worker.

See [Datadog Archives reference][9] for details on all configuration options.

## Rehydrate your archive

See [Rehydrating from Archives][10] for instructions on how to rehydrate your archive in Datadog so that you can start analyzing and investigating those logs.

## 参考資料

{{< partial name="whats-next/whats-next.html" >}}

[1]: /ja/logs/log_configuration/archives/
[2]: https://s3.console.aws.amazon.com/s3/home
[3]: https://console.aws.amazon.com/iam/
[4]: https://app.datadoghq.com/logs/pipelines/log-forwarding
[5]: /ja/logs/log_configuration/archives/#advanced-settings
[6]: /ja/logs/log_configuration/archives
[7]: /ja/observability_pipelines/legacy/setup/datadog_with_archiving#install-the-observability-pipelines-worker
[8]: https://app.datadoghq.com/observability-pipelines/
[9]: /ja/observability_pipelines/legacy/reference/sinks/#datadogarchivessink
[10]: /ja/logs/log_configuration/rehydrating/