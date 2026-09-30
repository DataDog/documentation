---
title: "Jobs Monitoring for AWS Glue"
description: "Enable Data Observability: Jobs Monitoring for AWS Glue jobs with Datadog."
further_reading:
  - link: '/data_jobs'
    tag: 'Documentation'
    text: 'Data Observability: Jobs Monitoring'
  - link: '/integrations/amazon-web-services/'
    tag: 'Documentation'
    text: 'AWS Integration'
---

<div class="alert alert-info">Jobs Monitoring for AWS Glue is in Preview.</div>

## Overview

[Data Observability: Jobs Monitoring][6] gives visibility into the performance and reliability of your AWS Glue jobs.

## Prerequisites

Before you begin, make sure you have:

- An AWS account with Glue jobs you want to monitor.
- The [Datadog AWS integration][1] configured for the account.
- IAM permissions to modify the Datadog role's policies.

## Configure the AWS account

1. Navigate to [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][2].
2. Click {{< ui >}}Configure{{< /ui >}} next to AWS Glue.

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
2. Enable the {{< ui >}}Job Monitoring{{< /ui >}} toggle.

   {{< img src="data_observability/aws_glue/crawler-configuration.png" alt="Crawler configuration showing region selection and sync frequency options" style="width:100%;" >}}

3. Click {{< ui >}}Save{{< /ui >}}.

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

This helps ensure the logs are searchable and available under the {{< ui >}}Glue{{< /ui >}} tab in **Data Observability: Jobs Monitoring**.

## (Optional) Configure Glue metrics

Enable the [Glue Integration][4] tile for Glue metrics collection.
Metrics should be available under the {{< ui >}}Glue{{< /ui >}} job tab in **Data Observability: Jobs Monitoring**.

## (Optional) Enable dataset lineage

Glue jobs that run with the Spark engine can emit OpenLineage events directly to Datadog. This provides dataset-level lineage, showing which datasets your job reads and writes.

**Note**: AWS Glue includes the Spark OpenLineage connector in its default class path. To use a more recent version, add the connector JAR manually through the `--extra-jars` Glue job parameter and set `--user-jars-first=true` to override the bundled version. For example: `--extra-jars s3://<YOUR_BUCKET>/openlineage-spark-<VERSION>.jar` and `--user-jars-first true`.

### Configure the SparkSession

In your Glue job script, configure the `SparkSession` with the following settings:

```python
spark = SparkSession.builder \
    .config("spark.extraListeners", "io.openlineage.spark.agent.OpenLineageSparkListener") \
    .config("spark.openlineage.transport.type", "http") \
    .config("spark.openlineage.transport.url", "<DD_DATA_OBSERVABILITY_INTAKE>") \
    .config("spark.openlineage.transport.auth.type", "api_key") \
    .config("spark.openlineage.transport.auth.apiKey", "<DATADOG_API_KEY>") \
    .config("spark.redaction.regex", "(?i)secret|password|token|access[.]key|apikey") \
    .config("spark.openlineage.capturedProperties", "spark.glue.JOB_RUN_ID") \
    .getOrCreate()
```

Replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}. Replace `<DATADOG_API_KEY>` with your Datadog API key. `spark.glue.JOB_RUN_ID` is the Spark configuration property automatically set by AWS Glue with the current job run ID — use it verbatim.

### Validate

After enabling OpenLineage, open a job run in [Data Observability: Jobs Monitoring][6]. In the flame graph, additional spans such as `spark.application` or `spark.sql_job` should appear. The payloads of these spans should be helpful when debugging dataset extraction.

## Next steps

The crawler runs every few minutes.
In Datadog, view the [Data Observability: Jobs Monitoring][6] page to see a list of your Glue job runs after setup.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon-web-services/
[2]: https://app.datadoghq.com/data-obs/settings/integrations
[4]: /integrations/amazon-glue/
[5]: /logs/guide/send-aws-services-logs-with-the-datadog-lambda-function/?tab=awsconsole
[6]: https://app.datadoghq.com/data-jobs/
[7]: /data_observability/quality_monitoring/data_lakes/aws_glue/?tab=specificdatabases#optional-restrict-access-to-specific-databases-and-tables

