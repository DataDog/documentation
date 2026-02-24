---
title: "Jobs Monitoring for AWS Glue"
description: "Enable Data Observability: Jobs Monitoring for AWS Glue jobs with Datadog."
is_beta: true
private: true
further_reading:
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Observability: Jobs Monitoring'
  - link: '/integrations/amazon-web-services/'
    tag: 'Documentation'
    text: 'AWS Integration'
---

{{< callout url="#" btn_hidden="true" header="Join the Preview!" >}}
Data Observability: Jobs Monitoring for AWS Glue is in Preview. To join the Preview, follow the steps on this page.
{{< /callout >}}

## Overview

[Data Observability: Jobs Monitoring][6] gives visibility into the performance and reliability of your AWS Glue jobs.

## Prerequisites

Before you begin, make sure you have:

- An AWS account with Glue jobs you want to monitor.
- The [Datadog AWS integration][1] configured for the account.
- IAM permissions to modify the Datadog role's policies.

## Configure the AWS account

1. Navigate to [**Datadog Data Observability** > **Settings**][2].
2. Click **Configure** next to AWS Glue.

   {{< img src="data_observability/aws_glue/settings-configure-button.png" alt="AWS Glue configuration option in the Data Observability Settings page" style="width:100%;" >}}

3. Select an existing AWS account that is already connected to Datadog, or add a new one. For help adding a new account, see the [AWS Integration documentation][1].

   {{< img src="data_observability/aws_glue/account-selection.png" alt="AWS account selection dropdown in the configuration flow" style="width:100%;" >}}

## Add required IAM permissions

The Data Observability crawler requires additional permissions to monitor Glue jobs. Attach the following policy to the Datadog IAM role configured for your AWS integration:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "glue:GetCatalog",
        "glue:GetDatabase",
        "glue:GetDatabases",
        "glue:GetJobRun",
        "glue:GetJobRuns",
        "glue:GetJob",
        "glue:GetJobs",
        "glue:GetTable",
        "glue:GetTables",
        "glue:ListJobs",
        "s3:ListBucket",
        "kms:Decrypt",
        "lakeformation:GetDataAccess"
      ],
      "Resource": ["*"]
    },
    {
      "Sid": "AllowIcebergMetadataOnly",
      "Effect": "Allow",
      "Action": [
        "s3:GetObject",
        "s3:GetObjectVersion"
      ],
      "Resource": [
        "arn:aws:s3:::*/metadata/*"
      ]
    }
  ]
}
```

Some of these permissions are related to monitoring Iceberg tables in Glue. For more details on dataset-related IAM permissions, see the [AWS Glue Data Quality Monitoring documentation][7].

## Configure the crawler

1. Select the AWS regions where your Glue jobs are located.
2. Enable the **Job Monitoring** toggle.

   {{< img src="data_observability/aws_glue/crawler-configuration.png" alt="Crawler configuration showing region selection and sync frequency options" style="width:100%;" >}}

3. Click **Save**.

## (Optional) Configure Glue jobs logs

1. Follow [these steps][5] to send AWS logs from CloudWatch to Datadog.
2. Manually configure triggers in **AWS CloudWatch** to capture AWS Glue logs.
   By default, Glue logs are stored in the following log groups:
   - `/aws-glue/jobs/error`
   - `/aws-glue/jobs/output`
   - `/aws-glue/jobs/logs-v2`

3. **Note**: After logs are ingested into Datadog, the CloudWatch log group name maps to the `host` attribute in Datadog Logs.
4. Create a Log Index that includes logs where the `host` attribute matches:
   - `/aws-glue/jobs/error`
   - `/aws-glue/jobs/output`
   - `/aws-glue/jobs/logs-v2`

This helps ensure the logs are searchable and available under the **Glue** tab in **Data Observability: Jobs Monitoring**.

## (Optional) Configure Glue metrics

Enable the [Glue Integration][4] tile for Glue metrics collection.
Metrics should be available under the **Glue** job tab in **Data Observability: Jobs Monitoring**.

## Next steps

The crawler runs every few minutes.
In Datadog, view the [Data Observability: Jobs Monitoring][6] page to see a list of your Glue job runs after setup.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon-web-services/
[2]: https://app.datadoghq.com/datasets/settings/integrations
[4]: /integrations/amazon-glue/
[5]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole
[6]: https://app.datadoghq.com/data-jobs/
[7]: /data_observability/quality_monitoring/data_lakes/aws_glue/?tab=specificdatabases#optional-restrict-access-to-specific-databases-and-tables

