---
title: Iceberg Tables (AWS Glue)
description: "Connect AWS Glue to Datadog Data Observability to monitor Iceberg table metadata, freshness, and quality."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/integrations/amazon-web-services/'
    tag: 'Documentation'
    text: 'AWS Integration'
---

## Overview

The AWS Glue integration connects Datadog to your AWS Glue Data Catalog to sync metadata about your Iceberg tables. Use it to monitor table schemas, data freshness, row counts, and table sizes.

## Prerequisites

Before you begin, make sure you have:

- An AWS account with Glue Iceberg tables you want to monitor.
- The [Datadog AWS integration][1] configured for the account.
- IAM permissions to modify the Datadog role's policies.
- (Optional) AWS Lake Formation access if you use it to manage table permissions.

## Configure the AWS account

1. Navigate to [**Datadog Data Observability** > **Settings**][2].
2. Click **Configure** next to AWS Glue.

   {{< img src="data_observability/aws_glue/settings-configure-button.png" alt="AWS Glue configuration option in the Data Observability Settings page" style="width:100%;" >}}

3. Select an existing AWS account that is already connected to Datadog, or add a new one. For help adding a new account, see the [AWS Integration documentation][1].

   {{< img src="data_observability/aws_glue/account-selection.png" alt="AWS account selection dropdown in the configuration flow" style="width:100%;" >}}

## Add required IAM permissions

The Data Observability crawler requires additional permissions to monitor Glue Iceberg tables. Attach the following policy to the Datadog IAM role configured for your AWS integration:

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

### (Optional) Restrict access to specific databases and tables

The policy above grants access to all Glue resources. To monitor only specific databases or tables, replace the `Resource: ["*"]` in the Glue actions with explicit ARNs.

AWS Glue IAM permissions are hierarchical. To access a table, the policy must include the catalog, the database, and the table. Missing any level results in an access denied error.

| Resource | ARN format | Example |
|----------|------------|---------|
| Catalog | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:catalog` | `arn:aws:glue:us-east-1:123456789012:catalog` |
| Database | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:database/<DB_NAME>` | `arn:aws:glue:us-east-1:123456789012:database/analytics` |
| Table | `arn:aws:glue:<REGION>:<ACCOUNT_ID>:table/<DB_NAME>/<TABLE_NAME>` | `arn:aws:glue:us-east-1:123456789012:table/analytics/events` |

{{< tabs >}}
{{% tab "Specific databases" %}}

To monitor all tables in specific databases, include the catalog, each database, and a wildcard for tables in those databases:

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:database/analytics_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/*",
    "arn:aws:glue:us-east-1:123456789012:table/analytics_db/*"
  ]
}
```

{{% /tab %}}
{{% tab "Specific tables" %}}

To monitor only specific tables, list each table explicitly. You can also use wildcards to match table name patterns:

```json
{
  "Effect": "Allow",
  "Action": [
    "glue:GetCatalog",
    "glue:GetDatabase",
    "glue:GetDatabases",
    "glue:GetTable",
    "glue:GetTables"
  ],
  "Resource": [
    "arn:aws:glue:us-east-1:123456789012:catalog",
    "arn:aws:glue:us-east-1:123456789012:database/production_db",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/orders",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/customers",
    "arn:aws:glue:us-east-1:123456789012:table/production_db/events_*"
  ]
}
```

The wildcard `events_*` matches tables like `events_clicks`, `events_purchases`, and any other table starting with `events_`.

{{% /tab %}}
{{< /tabs >}}

For more information, see the [AWS Glue identity-based policy examples][4].

## (Optional) Configure Lake Formation access

If you use AWS Lake Formation to manage access to your Glue Catalog tables, grant the Datadog role access to the databases and tables you want to monitor.

{{< tabs >}}
{{% tab "AWS CLI" %}}

Use the following commands, replacing the placeholder values with your actual account ID, role name, database name, and S3 bucket:

```bash
PRINCIPAL=arn:aws:iam::<YOUR_AWS_ACCOUNT_ID>:role/<YOUR_DATADOG_ROLE_NAME>

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"Database":{"Name":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"TableWildcard":{"DatabaseName":"<YOUR_DATABASE_NAME>"}}' \
  --permissions DESCRIBE SELECT

aws lakeformation grant-permissions \
  --principal DataLakePrincipalIdentifier=$PRINCIPAL \
  --resource '{"DataLocation":{"ResourceArn":"arn:aws:s3:::<YOUR_S3_BUCKET_NAME>"}}' \
  --permissions DATA_LOCATION_ACCESS
```

{{% /tab %}}
{{% tab "AWS Console" %}}

1. In the AWS Console, navigate to **Lake Formation** > **Data lake permissions**.
2. Click **Grant**.
3. Under **Principals**, select **IAM users and roles** and choose your Datadog role.
4. Under **LF-Tags or catalog resources**, select the database and tables you want to monitor.
5. Under **Permissions**, select **DESCRIBE** and **SELECT**.
6. Click **Grant**.

{{< img src="data_observability/aws_glue/lakeformation-permissions.png" alt="Lake Formation permissions grant dialog in AWS Console" style="width:90%;" >}}

{{% /tab %}}
{{< /tabs >}}

## Configure the crawler

1. Select the AWS regions where your Glue Iceberg tables are located.
2. Choose a sync frequency.
3. (Optional) Enter a catalog name if you use nested Glue catalog features. Leave this field empty for the default catalog.

   {{< img src="data_observability/aws_glue/crawler-configuration.png" alt="Crawler configuration showing region selection and sync frequency options" style="width:100%;" >}}

4. Click **Save**.

## Next steps

After you save, Datadog begins syncing your Glue Iceberg table metadata in the background. Initial syncs can take up to an hour depending on the number of tables in your catalog.

After the sync completes, your tables appear in the [Data Catalog][3].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /integrations/amazon-web-services/
[2]: https://app.datadoghq.com/datasets/settings/integrations
[3]: https://app.datadoghq.com/datasets/catalog?integration=awsglue%2Fdatabase_account
[4]: https://docs.aws.amazon.com/glue/latest/dg/security_iam_id-based-policy-examples.html
