---
aliases:
- /ja/integrations/awsrds/
- /ja/integrations/rds/
- /ja/integrations/faq/how-can-i-monitor-the-health-status-of-my-rds-instances/
categories:
- aws
- cloud
- data stores
- log collection
- network
custom_kind: インテグレーション
dependencies: []
description: Amazon RDS に関連する大量のメトリクスを追跡する。
doc_link: https://docs.datadoghq.com/integrations/amazon_rds/
draft: false
further_reading:
- link: https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/
  tag: ブログ
  text: RDS MySQL パフォーマンスメトリクスを監視する
- link: https://www.datadoghq.com/blog/aws-rds-postgresql-monitoring/
  tag: ブログ
  text: AWS RDS PostgreSQL 監視のキーメトリクス
- link: https://www.datadoghq.com/blog/monitoring-amazon-aurora-performance-metrics/
  tag: ブログ
  text: Amazon Aurora パフォーマンスメトリクスを監視する
git_integration_title: amazon_rds
has_logo: true
integration_id: amazon-rds
integration_title: Amazon RDS
integration_version: ''
is_public: true
manifest_version: '1.0'
monitors:
  rds_cpu_utilization: assets/monitors/rds_cpu_utilization.json
  rds_database_connections_anomaly: assets/monitors/rds_database_connections_anomaly.json
  rds_storage_utilization: assets/monitors/rds_storage_utilization.json
name: amazon_rds
public_title: Datadog-Amazon RDS Integration
short_description: Track a wealth of metrics related to Amazon RDS.
version: '1.0'
---

<!--  SOURCED FROM https://github.com/DataDog/dogweb -->
{{< img src="integrations/awsrds/rdsdashboard.png" alt="RDS Dashboard" popup="true">}}

## Overview

Amazon Relational Database Service (RDS) is a web service used to setup, operate, and scale a relational database in the cloud. Enable this integration to see all your RDS metrics in Datadog.

**Note**: Ensure the environment variable `DD_SITE` is set to your region outside of the code, {{< region-param key="dd_site" code="true" >}}, or set the variable in the code as follows:

`DD_SITE = os.getenv("DD_SITE", default="{{< region-param key="dd_site" code="true" >}}")`

There are three options for monitoring RDS instances: Standard, Enhanced, and Native. **Review the full [list of metrics](#data-collected) before choosing a configuration** as each metric is labeled with its corresponding configuration. In addition, review the information below to learn more about each configuration's requirements and preset dashboard:

{{< tabs >}}
{{% tab "Standard" %}}

The standard integration requires enabling RDS under the `Metric Collection` tab of the [AWS integration page][1]. This allows you to receive metrics about your instance as often as your CloudWatch integration allows. All RDS Engine types are supported.

The preset dashboard for this integration includes the following metric information: connection, replication lag, read operations and latency, computer, RAM, write operations and latency, and disk metrics.


[1]: https://app.datadoghq.com/integrations/amazon-web-services
{{% /tab %}}
{{% tab "Enhanced" %}}

The enhanced integration requires additional configuration and is available for MySQL, Aurora, MariaDB, SQL Server, Oracle, and PostgreSQL engines. Additional metrics are available but an AWS Lambda is required to submit the metrics to Datadog. The higher granularity and additional required services may result in additional AWS charges.

The preset dashboard for this integration includes the following metric information: loads, uptime, CPU Utilization, tasks, memory, SWAP, network receive, network transmit, CPU used per process, memory used per process, disk ops, filesystem used (pct), tasks running, and system CPU utilization.

{{% /tab %}}
{{% tab "Native" %}}

The native database integration is optional and available for MySQL, Aurora, MariaDB, SQL Server, and PostgreSQL engine types. To get the metrics from RDS and the ones from the native integration to match up, use the `dbinstanceidentifier` tag on the native integration based on the identifier you assign to the RDS instance. The RDS instances are automatically assigned the tag.

There are 3 preset dashboards available for this configuration: MySQL, Aurora, and PostgreSQL. Each dashboard includes the following metric information: query volume, disk I/O, connections, replication, and AWS resource metrics.

**Note**: These dashboard display metrics both from AWS CloudWatch and from the individual database engine itself. Enable one of the integrations, [MySQL][1], [Aurora][2], or [PostgreSQL][3], for all integration metrics.


[1]: https://docs.datadoghq.com/ja/integrations/mysql/
[2]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_SettingUp_Aurora.html
[3]: https://docs.datadoghq.com/ja/integrations/postgres/
{{% /tab %}}
{{< /tabs >}}

## Setup

### Installation

{{< tabs >}}
{{% tab "Standard" %}}

For the standard RDS integration, set up the [Amazon Web Services integration][1] first.

[1]: https://docs.datadoghq.com/ja/integrations/amazon_web_services
{{% /tab %}}
{{% tab "Enhanced" %}}

Enable enhanced monitoring for your RDS instance during instance creation or afterwards by choosing **Modify** under **Instance Actions**. It is recommended to choose `15` for Monitoring Granularity.

The following instructions use KMS and the Lambda Management Console to create an encrypted version of your Datadog API key which can only be used with the RDS Enhanced Monitoring Lambda function. If you already have an encrypted API key from another Lambda such as the [Log Forwarder][1], see the [the Lambda function's README][2] for other options.

#### Create your KMS key

1. Open the KMS home at https://console.aws.amazon.com/kms/home.
2. Go into **Customer managed keys**.
3. Choose **Create Key**.
4. Enter an Alias for the key, such as `lambda-datadog-key`. _Note: An alias cannot begin with aws. Aliases that begin with aws are reserved by Amazon Web Services to represent AWS-managed CMKs in your account._
5. Add the appropriate administrators to determine who can administer this key.
6. No roles need to be added.
7. Save your KMS key.

#### Create your Lambda function

1. From the Lambda Management Console, create a new Lambda Function. **Your Lambda function must be in the same region as the KMS key you created.**
2. Choose `Serverless Application Repository`, search for and select `Datadog-RDS-Enhanced`
3. Give the application a unique name.
4. Paste the Id of the key created in the previous section in the `KMSKeyId` parameter and deploy.
5. Once the application is deployed, open up the newly created Lambda Function (click on the function under "Resource").
6. Click on the `Configuration` tab and go to the `Environment variables` section. For the environment variable `kmsEncryptedKeys`, add in your [Datadog API key][3] in the full JSON format in the `value` field like follows: `{"api_key":"<YOUR_API_KEY>"}`.
7. Open the `Encryption configuration` section and select `Enable helpers for encryption in transit`.
8. In the `KMS key to encrypt at rest` section, select `Use a customer master key` and enter the same KMS key created earlier.
9. Press the Encrypt button next to the JSON blob you just entered and in the popup, choose the same KMS key created earlier as well.
10. Press Save.
11. Create a new trigger using the `RDSOSMetrics` CloudWatch log group as the source.
12. Give the filter a name and optional filter pattern and press Save.

When clicking on test button for your lambda function you might get this error:

```json
{
    "stackTrace": [
        [
            "/var/task/lambda_function.py",
            109,
            "lambda_handler",
            "event = json.loads(gzip.GzipFile(fileobj=StringIO(event['awslogs']['data'].decode('base64'))).read())"
        ]
    ],
    "errorType": "KeyError",
    "errorMessage": "'awslogs'"
}
```

This can be ignored. The Test button doesn't work with this setup.


[1]: https://docs.datadoghq.com/ja/serverless/forwarder/
[2]: https://github.com/DataDog/datadog-serverless-functions/tree/master/aws/rds_enhanced_monitoring#setup
[3]: https://app.datadoghq.com/organization-settings/api-keys
{{% /tab %}}
{{% tab "Native" %}}

1. Navigate to the AWS Console and open the RDS section to find the instance you want to monitor.
  {{< img src="integrations/awsrds/rds-console.png" alt="RDS console" >}}
2. Make note of the endpoint URL, for example: **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**, which is used to configure the Agent. Also make a note of the `DB Instance identifier`, for example: **mysqlrds**, which is used to create graphs and dashboards.

{{% /tab %}}
{{< /tabs >}}

### Configuration

{{< tabs >}}
{{% tab "Standard" %}}

1. In the [AWS integration page][1], ensure that `RDS` is enabled under the `Metric Collection` tab.
2. Add the following permissions to your [Datadog IAM policy][2] in order to collect Amazon RDS metrics. For more information, see the [RDS policies][3] on the AWS website.

    | AWS Permission            | Description                          |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | Describe RDS instances to add tags.  |
    | `rds:ListTagsForResource` | Add custom tags on RDS instances.    |
    | `rds:DescribeEvents`      | Add events related to RDS databases. |

3. Install the [Datadog - Amazon RDS integration][4].

[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Enhanced" %}}

1. In the [AWS integration page][1], ensure that `RDS` is enabled under the `Metric Collection` tab.
2. Add the following permissions to your [Datadog IAM policy][2] in order to collect Amazon RDS metrics. For more information, see the [RDS policies][3] on the AWS website.

    | AWS Permission            | Description                          |
    | ------------------------- | ------------------------------------ |
    | `rds:DescribeDBInstances` | Describe RDS instances to add tags.  |
    | `rds:ListTagsForResource` | Add custom tags on RDS instances.    |
    | `rds:DescribeEvents`      | Add events related to RDS databases. |

3. Install the [Datadog - Amazon RDS integration][4].


[1]: https://app.datadoghq.com/integrations/amazon-web-services
[2]: https://docs.datadoghq.com/ja/integrations/amazon_web_services/#installation
[3]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/security_iam_service-with-iam.html
[4]: https://app.datadoghq.com/integrations/amazon-rds
{{% /tab %}}
{{% tab "Native" %}}

Configure an Agent and connect to your RDS instance by editing the appropriate yaml file in your conf.d directory and then restart your Agent:

For RDS Aurora, edit the YAML file of the database flavor you are using.

If you are using MySQL or MariaDB, then edit `mysql.yaml`:

```yaml
init_config:

instances:
    # The endpoint URL from the AWS console
    - server: 'mysqlrds.blah.us-east-1.rds.amazonaws.com'
      user: '<USERNAME>'
      pass: '<PASSWORD>'
      port: 3306
      tags:
          - 'dbinstanceidentifier:<INSTANCE_NAME>'
```

If you are using PostgreSQL, then edit `postgres.yaml`:

```yaml
init_config:

instances:
    - host: 'postgresqlrds.blah.us-east-1.rds.amazonaws.com'
      port: 5432
      username: '<USERNAME>'
      password: '<PASSWORD>'
      dbname: '<DB_NAME>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

If you are using Microsoft SQL Server, then edit `sqlserver.yaml`:

```yaml
init_config:

instances:
    - host: 'sqlserverrds.blah.us-east-1.rds.amazonaws.com,1433'
      username: '<USERNAME>'
      password: '<PASSWORD>'
      tags:
          - 'dbinstanceidentifier:<DB_INSTANCE_NAME>'
```

### Validation

[Run the Agent's status subcommand][1] and look for something like this under the Checks section:

```shell
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
```

[1]: https://docs.datadoghq.com/ja/agent/guide/agent-commands/#agent-information
{{% /tab %}}
{{< /tabs >}}

### Usage

After a few minutes, RDS metrics and [metrics from MySQL, Aurora, MariaDB, SQL Server, Oracle, or PostgreSQL][1] are accessible in Datadog from the metrics explorer, [dashboards][2], and [alerts][3].
Here's an example of an Aurora dashboard displaying several metrics from both RDS and the MySQL integration. Metrics from both integrations on the instance `quicktestrds` are unified using the `dbinstanceidentifier` tag.
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="rds aurora dash" popup="true">}}

### Log collection

#### Enable logging

It is possible to forward MySQL, MariaDB, and Postgres logs to Amazon CloudWatch. Follow instructions in [Monitor Amazon Aurora MySQL, Amazon RDS for MySQL and MariaDB logs with Amazon CloudWatch][4] to start sending your RDS logs to CloudWatch.

#### Send logs to Datadog

1. If you haven't already, set up the [Datadog log collection AWS Lambda function][5].
2. Once the Lambda function is installed, manually add a trigger on the CloudWatch log group that contains your RDS logs. Select the corresponding CloudWatch log group, add a filter name (optional), and add the trigger.

Once done, go in your [Datadog Log section][6] to explore your logs.

## Data Collected

In addition to the [metrics collected from the database engines][1], you also receive the following RDS metrics.

### Metrics
{{< get-metrics-from-git "amazon_rds" >}}


Each of the metrics retrieved from AWS is assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

### Events

The Amazon RDS integration includes events related to DB instances, security groups, snapshots, and parameter groups. See example events below:

{{< img src="integrations/amazon_rds/aws_rds_events.png" alt="Amazon RDS Events" >}}

### Service Checks

**aws.rds.read_replica_status**
Monitors the [read replication][8] status. This check returns one of the following statuses:

- OK - replicating or connecting
- CRITICAL - error or terminated
- WARNING - stopped
- UNKNOWN - other

## Out-of-the-box monitoring

The Amazon RDS integration provides ready-to-use monitoring capabilities to monitor and optimize performance.

- Amazon RDS Dashboard: Gain a comprehensive overview of your RDS instances using the out-of-the-box [Amazon RDS dashboard][9].
- Recommended Monitors: Enable [Recommended Amazon RDS monitors][10] to proactively detect issues and receive timely alerts.

## Troubleshooting

Need help? Contact [Datadog support][11].

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Aurora.Monitoring.html
[2]: https://docs.datadoghq.com/ja/dashboards/
[3]: https://docs.datadoghq.com/ja/monitors/
[4]: https://aws.amazon.com/blogs/database/monitor-amazon-rds-for-mysql-and-mariadb-logs-with-amazon-cloudwatch
[5]: https://docs.datadoghq.com/ja/logs/guide/send-aws-services-logs-with-the-datadog-lambda-function
[6]: https://app.datadoghq.com/logs
[7]: https://github.com/DataDog/dogweb/blob/prod/integration/amazon_rds/amazon_rds_metadata.csv
[8]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html#USER_ReadRepl.Monitoring
[9]: https://app.datadoghq.com/dash/integration/62/aws-rds
[10]: https://app.datadoghq.com/monitors/recommended
[11]: https://docs.datadoghq.com/ja/help/