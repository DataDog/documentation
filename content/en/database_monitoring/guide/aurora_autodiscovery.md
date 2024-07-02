---
title: Configuring Database Monitoring for Amazon Aurora DB Clusters
kind: guide
---

{{< beta-callout url="#" btn_hidden="true" >}}
Autodiscovery for Aurora clusters is a beta feature. If you have any feedback about this feature, contact support at support@datadoghq.com.
{{< /beta-callout >}}

This guide assumes you have configured Database Monitoring for your Amazon Aurora [Postgres][1] or [MySQL][11] databases.

## Before you begin

Supported databases
: Postgres, MySQL

Supported Agent versions
: 7.53.0+

## Overview

Datadog's [Autodiscovery][4] enables you to configure monitoring in dynamic infrastructures. You can use this feature to monitor your Aurora clusters without having to list individual database host endpoints. This is especially helpful for clusters that use [Aurora Auto Scaling][6], which dynamically adjusts the number of Aurora Replicas in response to variations in connectivity or workload. Autodiscovery automatically discovers and monitors both primary and replica endpoint instances.

With Autodiscovery and Database Monitoring, you can define configuration templates for Postgres or MySQL checks and specify which clusters to apply each check to.

## Enabling Autodiscovery for Aurora clusters

1. [Grant AWS permissions](#grant-aws-permissions)
2. [Configure Aurora tags](#configure-aurora-tags)
3. [Configure the Datadog Agent](#configure-the-datadog-agent)
4. [Create a configuration template](#create-a-configuration-template)

### Grant AWS permissions

The Datadog Agent requires permission to run `rds:DescribeDBClusters` and `rds:DescribeDBInstances` in your AWS account. Datadog recommends that you attach an IAM role policy to the EC2 instance where the Agent is running.

An example policy that grants these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBClusters",
        "rds:DescribeDBInstances"
      ],
      "Resource": [
        "arn:aws:rds:<region>:<account>:cluster:*",
        "arn:aws:rds:<region>:<account>:db:*"
      ]
    }
  ]
}
```

You can also attach the [`AmazonRDSReadOnlyAccess`][3] policy.

### Configure Aurora tags

By default, the listener discovers all Aurora clusters in the account and region where the Agent is running that have the `datadoghq.com/scrape:true` tag applied. You can also configure the Agent to discover clusters with specific tags.

You must apply these tags to the DB cluster (Role: `Regional cluster`). For more information on tagging RDS resources, see the [AWS documentation][7].

### Configure the Datadog Agent

Autodiscovery uses an Agent service listener, which discovers all database host endpoints in an Aurora cluster and forwards discovered endpoints to the existing Agent check scheduling pipeline. You can configure the listener in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**Note**: The Agent only discovers Aurora instances running in the same region as the Agent. To determine the region of the instance, the Agent uses [IMDS (Instance Metadata Service)][8]. If your EC2 instance requires `IMDSv2`, you must configure the Agent to use `IMDSv2` by setting `ec2_prefer_imdsv2: true` in `datadog.yaml`, as shown below:

```yaml
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

By default, the listener only discovers Aurora clusters in the account and region where the Agent is running, and only those with the `datadoghq.com/scrape:true` tag. You can also configure the listener to discover clusters with specific tags.

To specify custom tags for Aurora cluster discovery in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag-key:value"
```

The listener queries the AWS API for the list of hosts in a loop. The frequency with which the listener queries the AWS API, in seconds, is configurable in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

### Create a configuration template

The Datadog Agent supports configuration templates for the Postgres and MySQL integrations. Define a configuration template for the Aurora clusters you wish to monitor.

{{< tabs >}}
{{% tab "Postgres" %}}

First, add an `ad_identifier` for Aurora-managed Postgres to your configuration template (`postgres.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

Then, define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

The following example configuration template is applied to every instance discovered in the Aurora cluster:

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, and `%%extra_region%%` are dynamically populated with information from the Aurora cluster.

To use [IAM authentication][2] to connect to your Aurora cluster, use the following template:

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
      region: "%%extra_region%%"
      managed_authentication:
        enabled: "%%extra_managed_authentication_enabled%%"
    tags:
      - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

{{% /tab %}}
{{% tab "MySQL" %}}

First, add an `ad_identifier` for Aurora-managed MySQL to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

Then, define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

The following example configuration template is applied to every instance discovered in the Aurora cluster:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
    tags:
    - "dbclusteridentifier:%%extra_dbclusteridentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%`, and `%%extra_region%%` are dynamically populated with information from the Aurora cluster.

{{% /tab %}}
{{< /tabs >}}

For more information on configuring Autodiscovery with integrations, see the [Autodiscovery documentation][5].

#### Supported template variables

| Template variable                        | Source                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | The Aurora instance endpoint                                                                                                                  |
| %%port%%                                 | The port of the Aurora instance                                                                                                               |
| %%extra_region%%                         | The AWS region where the instance is located                                                                                                  |
| %%extra_dbclusteridentifier%%            | The cluster identifier of the discovered Aurora cluster                                                                                       |
| %%extra_managed_authentication_enabled%% | Whether IAM authentication enabled on the cluster. <br/>This is used to determine if managed authentication should be used for Postgres. |

[1]: /database_monitoring/setup_postgres/aurora/?tab=postgres10
[2]: /database_monitoring/guide/managed_authentication/#configure-iam-authentication
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[9]: https://yum.datadoghq.com/beta/7/x86_64/datadog-agent-7.52.0~dbm~aurora~autodiscovery~beta~0.3-1.x86_64.rpm
[10]: https://docs.datadoghq.com/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /database_monitoring/setup_mysql/aurora?tab=mysql56
