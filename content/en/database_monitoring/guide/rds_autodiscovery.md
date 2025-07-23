---
title: Configuring Database Monitoring for Amazon RDS DB Instances

---

This guide assumes you have configured Database Monitoring for your Amazon RDS [Postgres][1] or [MySQL][11] databases.

## Before you begin

Supported databases
: Postgres, MySQL

Supported Agent versions
: 7.68.0+

## Overview

Datadog's [Autodiscovery][4] enables you to configure monitoring in dynamic infrastructures. You can use this feature to monitor your RDS instances without having to list individual database host endpoints. Autodiscovery automatically discovers and monitors any RDS instances that match the tag critera specified in your configuration.

With Autodiscovery and Database Monitoring, you can define configuration templates for Postgres or MySQL checks and specify which instances to apply each check to.

## Enabling Autodiscovery for RDS clusters

1. [Grant AWS permissions](#grant-aws-permissions)
2. [Configure RDS tags](#configure-rds-tags)
3. [Configure the Datadog Agent](#configure-the-datadog-agent)
4. [Create a configuration template](#create-a-configuration-template)

### Grant AWS permissions

The Datadog Agent requires permission to run `rds:DescribeDBInstances` in your AWS account. Datadog recommends that you attach an IAM role policy to the EC2 instance where the Agent is running.

An example policy that grants these permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "rds:DescribeDBInstances"
      ],
      "Resource": [
        "arn:aws:rds:<region>:<account>:db:*"
      ]
    }
  ]
}
```

You can also attach the [`AmazonRDSReadOnlyAccess`][3] policy.

### Configure RDS tags

By default, the listener discovers all RDS instances in the account and region where the Agent is running that have the `datadoghq.com/scrape:true` tag applied. You can also configure the Agent to discover instances with specific tags.

For more information on tagging RDS resources, see the [AWS documentation][7].

If you configure `tags` as an empty array, Autodiscovery will discovery all instances in the account and region.

### Configure the Datadog Agent

Autodiscovery uses an Agent service listener, which discovers all database host endpoints and forwards discovered endpoints to the existing Agent check scheduling pipeline. You can configure the listener in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    rds:
      enabled: true
```

**Note**: The Agent only discovers RDS instances running in the same region as the Agent. To determine the region of the instance, the Agent uses [IMDS (Instance Metadata Service)][8]. If your EC2 instance requires `IMDSv2`, you must configure the Agent to use `IMDSv2` by setting `ec2_prefer_imdsv2: true` in `datadog.yaml`, as shown below:

```yaml
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    rds:
      enabled: true
```

By default, the listener only discovers RDS instances in the account and region where the Agent is running, and only those with the `datadoghq.com/scrape:true` tag. You can also configure the listener to discover clusters with specific tags.

To specify custom tags for RDS instance discovery in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    rds:
      enabled: true
      tags:
        - "my-instance-tag-key:value"
```

To monitor all RDS instances in the account and region:

```yaml
database_monitoring:
  autodiscovery:
    rds:
      enabled: true
      tags: []
```


The listener queries the AWS API for the list of hosts in a loop. The frequency with which the listener queries the AWS API, in seconds, is configurable in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    rds:
      enabled: true
      discovery_interval: 300
```

### Create a configuration template

The Datadog Agent supports configuration templates for the Postgres and MySQL integrations. Define a configuration template for the RDS instances you wish to monitor.

{{< tabs >}}
{{% tab "Postgres" %}}

1. Add an `ad_identifier` for RDS-managed Postgres to your configuration template (`postgres.d/conf_aws_rds.yaml`) file:

   ```yaml
   ad_identifiers:
     - _dbm_postgres
   ```

2. Define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

#### Example template

The following example configuration template is applied to every instance discovered:

```yaml
ad_identifiers:
  - _dbm_postgres
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
    - "dbinstanceidentifier:%%extra_dbinstanceidentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, and `%%extra_region%%` are dynamically populated with information from the RDS instance.

#### IAM authentication

To use [IAM authentication][2] to connect to your RDS instance, use the following template:

```yaml
ad_identifiers:
  - _dbm_postgres
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
      - "dbinstanceidentifier:%%extra_dbinstanceidentifier%%"
      - "region:%%extra_region%%"
```

The template variable `%%extra_managed_authentication_enabled%%` resolves to `true` if the instance is using IAM authentication.

[2]: /database_monitoring/guide/managed_authentication/?tab=aurora#configure-iam-authentication
{{% /tab %}}
{{% tab "MySQL" %}}

1. Add an `ad_identifier` for Aurora-managed MySQL to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

   ```yaml
   ad_identifiers:
     - _dbm_mysql
   ```

2. Define the remainder of the template. Use [template variables](#supported-template-variables) for parameters that may change, such as `host` and `port`.

#### Example template

The following example configuration template is applied to every instance discovered in the Aurora cluster:

```yaml
ad_identifiers:
  - _dbm_mysql
init_config:
instances:
  - host: "%%host%%"
    port: "%%port%%"
    username: datadog
    dbm: true
    aws:
      instance_endpoint: "%%host%%"
    tags:
    - "dbinstanceidentifier:%%extra_dbinstanceidentifier%%"
    - "region:%%extra_region%%"
```

In this example, the template variables `%%host%%`, `%%port%%`, and `%%extra_region%%` are dynamically populated with information from the RDS instance.

{{% /tab %}}
{{< /tabs >}}

For more information on configuring Autodiscovery with integrations, see the [Autodiscovery documentation][5].

#### Supported template variables

| Template variable                        | Source                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | The RDS instance endpoint                                                                                                                  |
| %%port%%                                 | The port of the RDS instance                                                                                                               |
| %%extra_region%%                         | The AWS region where the instance is located                                                                                                  |
| %%extra_dbinstanceidentifier%%            | The instance identifier of the discovered RDS instance                                                                                       |
| %%extra_dbclusteridentifier%%            | The cluster identifier of the discovered RDS instance, if one exists                                                                                       |
| %%extra_managed_authentication_enabled%% | Whether IAM authentication enabled on the instance. <br/>This is used to determine if managed authentication should be used for the connection. |

[1]: /database_monitoring/setup_postgres/rds/?tab=postgres10
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /containers/docker/integrations/?tab=dockeradv2
[7]: https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#Tagging.HowTo
[8]: https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html
[10]: https://docs.datadoghq.com/agent/basic_agent_usage/amazonlinux/?tab=agentv6v7
[11]: /database_monitoring/setup_mysql/rds/?tab=mysql56
