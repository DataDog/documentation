---
title: Redshift
description: "Connect Amazon Redshift to Datadog Data Observability to monitor data quality, track usage, and detect issues."
further_reading:
  - link: '/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Overview'
  - link: '/monitors/types/data_observability/'
    tag: 'Documentation'
    text: 'Data Observability Monitors'
---

## Overview

The Redshift integration connects Datadog to your Amazon Redshift cluster to sync metadata, query history, and table-level metrics. Use it to monitor data freshness, detect anomalies, and trace lineage across your warehouse and downstream tools.

Datadog supports both provisioned Redshift clusters and Redshift Serverless workgroups.

## Prerequisites

Before you begin, make sure you have:

- An [AWS account connected in Datadog][3].
  - Log forwarding is not required for Data Observability.
- A Redshift superuser or database user with the ability to create roles and grant privileges.
- If your Redshift cluster or workgroup restricts network access by IP, add Datadog webhook IPs to your VPC security group inbound rules. For the list of IPs, see the `webhooks` section of the {{< region-param key="ip_ranges_url" link="true" text="IP ranges list" >}}.

## Set up your account in Redshift

Connect to your Redshift cluster as a superuser and run the following SQL to create a dedicated role for Datadog.

1. Create a role and grant access to system catalog views.

   ```sql
   -- Create a dedicated role for Datadog monitoring
   CREATE ROLE datadog_role;

   -- Required for table size metrics
   GRANT SELECT ON svv_table_info TO ROLE datadog_role;
   ```

2. Grant read-only access to your data. Choose one option.

   **Option A: All schemas (recommended, required for dbt CI/CD)**

   Gives Datadog read access to every current and future schema, table, and view in the database, including the schemas dbt creates for pull requests:

   ```sql
   GRANT USAGE FOR SCHEMAS IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN DATABASE "<YOUR_DATABASE>" TO ROLE datadog_role;
   ```

   **Option B: Specific schemas**

   Run the following for each schema you want Datadog to monitor. It covers current and future tables and views in the schema, including ones created by other users such as dbt:

   ```sql
   GRANT USAGE ON SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   GRANT SELECT FOR TABLES IN SCHEMA "<YOUR_SCHEMA>" TO ROLE datadog_role;
   ```

   Schemas created later, such as dbt CI schemas, are not covered. Use Option A for dbt CI/CD.

3. Create or assign the Datadog database user.

{{< tabs >}}
{{% tab "Provisioned Cluster" %}}

Create a dedicated database user and assign the role:

```sql
-- Replace <STRONG_PASSWORD> with a secure password
CREATE USER datadog_user PASSWORD '<STRONG_PASSWORD>' SYSLOG ACCESS UNRESTRICTED;
GRANT ROLE datadog_role TO datadog_user;
```

{{% /tab %}}
{{% tab "Serverless" %}}

In Redshift Serverless, database users are automatically mapped from IAM identities. For example, an IAM role named `DatadogIntegrationRole` maps to the database user `IAMR:DatadogIntegrationRole`.

Grant the `datadog_role` to your IAM-mapped database user:

```sql
GRANT ROLE datadog_role TO "IAMR:<YOUR_IAM_ROLE_NAME>";
ALTER USER "IAMR:<YOUR_IAM_ROLE_NAME>" SYSLOG ACCESS UNRESTRICTED;
```

{{% /tab %}}
{{< /tabs >}}

## Configure IAM policies

Add the following policies to the Datadog AWS integration IAM role associated with the AWS account that contains your Redshift cluster.

{{< tabs >}}
{{% tab "Provisioned Cluster" %}}

Attach the `AmazonRedshiftDataFullAccess` AWS managed policy and an inline policy granting `redshift:GetClusterCredentials` for the Datadog database user created in the previous section:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift:GetClusterCredentials",
            "Resource": [
                "arn:aws:redshift:<REGION>:<ACCOUNT_ID>:dbuser:<CLUSTER_IDENTIFIER>/datadog_user"
            ]
        }
    ]
}
```

{{% /tab %}}
{{% tab "Serverless" %}}

Attach the `AmazonRedshiftDataFullAccess` AWS managed policy and an inline policy granting `redshift-serverless:GetCredentials` for your workgroup:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": "redshift-serverless:GetCredentials",
            "Resource": "arn:aws:redshift-serverless:<REGION>:<ACCOUNT_ID>:workgroup/<WORKGROUP_ID>"
        }
    ]
}
```

{{% /tab %}}
{{< /tabs >}}

## Configure the Redshift integration in Datadog

To configure the Redshift integration in Datadog:

1. Navigate to [{{< ui >}}Datadog Data Observability{{< /ui >}} > {{< ui >}}Settings{{< /ui >}}][1].
2. Click the {{< ui >}}Configure{{< /ui >}} button for the Redshift option.

   {{< img src="data_observability/redshift/data_obs_redshift_on_integrations_page.png" alt="Redshift on the Settings page of Data Observability integrations" style="width:100%;" >}}

3. Select a connected AWS account or add a new AWS account.

   {{< img src="data_observability/redshift/data_obs_redshift_integration_flow.png" alt="Selecting a connected or new AWS account for the Redshift Data Observability integration." style="width:100%;" >}}

4. Enter your cluster connection details:

{{< tabs >}}
{{% tab "Provisioned Cluster" %}}

- {{< ui >}}Cluster identifier{{< /ui >}}: Your Redshift cluster identifier.
- {{< ui >}}Region{{< /ui >}}: The AWS region where your cluster is hosted (for example, `us-east-1`).
- {{< ui >}}Database user{{< /ui >}}: The Datadog user created during setup (for example, `datadog_user`).
- {{< ui >}}Initial database{{< /ui >}}: The name of the database to connect to (defaults to `dev`).

{{% /tab %}}
{{% tab "Serverless" %}}

- {{< ui >}}Workgroup name{{< /ui >}}: Your Redshift Serverless workgroup name.
- {{< ui >}}Region{{< /ui >}}: The AWS region where your workgroup is hosted (for example, `us-east-1`).
- {{< ui >}}Initial database{{< /ui >}}: The name of the database to connect to (defaults to `dev`).

{{% /tab %}}
{{< /tabs >}}

   {{< img src="data_observability/redshift/data_obs_redshift_add_credentials.png" alt="Input fields for Redshift credentials for Data Observability integrations" style="width:100%;" >}}

5. Click {{< ui >}}Add account{{< /ui >}}.

## Next steps

After you save, Datadog begins syncing your information schema and query history in the background. Initial syncs can take up to several hours depending on the size of your Redshift deployment.

After the initial sync completes, create a [Data Observability monitor][2] to start alerting on freshness, column-level metrics, and custom SQL metrics.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/data-obs/settings/integrations
[2]: /monitors/types/data_observability/
[3]: /integrations/amazon-web-services/