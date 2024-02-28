---
title: Automatically configure your aurora clusters for monitoring
kind: guide
---

{{< beta-callout url="#" btn_hidden="true" >}}
Aurora cluster auto discovery is in **beta**. If you have any feedback about this feature, please [contact support](https://docs.datadoghq.com/help/).
{{< /beta-callout >}}

This guide assumes that you have configured [Database Monitoring][1] for your Aurora hosts.

## Before you begin

Supported databases
: Postgres, MySQL

Supported Agent versions
: 7.53.0+ (Not currently released)

## Agent Installation

// TODO: Add the installation steps for the beta agent

## Overview

The Datadog Agent supports configuring automatic discovery and monitoring of your aurora clusters. This feature works in lieu of manually configuring the Agent by listing individual database host endpoints.

This is helpful for environments where the number of endpoints can be dynamic, such as with clusters that use [Aurora Auto Scaling][6].

This features leverages the Agent [Autodiscovery feature][4] and lets you define configuration templates for Postgres or MySQL checks, and specify which clusters each check should apply to.

## How it works

This utilizes an Agent service listener, responsible for discovering all database host endpoints in an aurora cluster and forwarding discovered endpoints to the existing Agent check scheduling pipeline. You can configure the listener in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

By default, the listener will discover all aurora clusters in the account and region where the Agent is running that have the `datadoghq.com/scrape:true` tag applied. You can also configure the listener to discover clusters with specific tags.

Specify custom tags for the aurora cluster discovery in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "my-cluster-tag"
```

The listener queries the AWS API for the list of hosts in a loop. The frequency with which the listener queries the AWS API, in seconds, is configurable in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      discovery_interval: 300
```

## Enabling aurora cluster discovery

### Prerequisites

It's required that the Agent has permission to run `rds:DescribeDBClusters` and `rds:DescribeDBInstances` in your AWS account. The recommended way to do this, is to attach an IAM role policy to the EC2 instance where the Agent is running.

An example policy that grants the required permissions is:

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
      "Resource": "*"
    }
  ]
}
```

You can also attach the [AmazonRDSReadOnlyAccess][3] policy.

### Configure the Agent

To enable aurora cluster discovery, add the following to your `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

This will enable the Agent to automatically discover and monitor Aurora instances with the tag `datadoghq.com/scrape:true` applied to the Regional cluster. If you wish to apply a different tag, or set of tags, to the cluster you can specify it in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
      tags:
        - "cluster:foo"
        - "env:prod"
```

The above configuration will discover all aurora clusters with the tags `cluster:foo` and `env:prod` applied to the Regional cluster.

### Postgres

In order to enable aurora cluster discovery for the postgres integration, you need to add the postgres aurora `ad_identifier` to your configuration template (`postgres.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

**Example**: The following configuration template will be applied to every instance discovered in the aurora cluster:

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

**Note**: In this example, `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%` and `%%extra_region%%` are a template variables that is dynamically populated with information from the aurora cluster.

For more information on Integrations Autodiscovery and how to configure it, see the [Autodiscovery documentation][5].

If you want to use [IAM authentication][2] to connect to your Aurora cluster, you can create the following configuration template (`postgres.d/conf_aws_aurora.yaml`) file:

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

The template variable `%%extra_managed_authentication_enabled%%` will be set to `true` if the instance is using IAM authentication.

### MySQL

In order to enable aurora cluster discovery for the mysql integration, you need to add the mysql aurora `ad_identifier` to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

**Example**: The following configuration template will be applied to every instance discovered in the aurora cluster:

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

**Note**: In this example, `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%` and `%%extra_region%%` are a template variables that is dynamically populated with information from the aurora cluster.

For more information on Integrations Autodiscovery and how to configure it, see the [Autodiscovery documentation][5].

### Supported template variables

The following documentation lists the supported template variables for the aurora cluster discovery:

| Template variable                        | Source                                                                                                                                        |
|:-----------------------------------------|:----------------------------------------------------------------------------------------------------------------------------------------------|
| %%host%%                                 | The Aurora instance endpoint                                                                                                                  |
|                                          |                                                                                                                                               |
| %%port%%                                 | The port of the Aurora instance                                                                                                               |
|                                          |                                                                                                                                               |
| %%extra_region%%                         | The AWS region where the instance is located                                                                                                  |
|                                          |                                                                                                                                               |
| %%extra_dbclusteridentifier%%            | The cluster identifier of the discovered Aurora cluster                                                                                       |
|                                          |                                                                                                                                               |
| %%extra_managed_authentication_enabled%% | The value of IAM Authentication enabled on the cluster. <br/>This is used to determine if managed authentication should be used for postgres. |

[1]: /database_monitoring/#getting-started
[2]: /database_monitoring/guide/managed_authentication/#configure-iam-authentication
[3]: https://docs.aws.amazon.com/aws-managed-policy/latest/reference/AmazonRDSReadOnlyAccess.html
[4]: /getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[5]: /containers/docker/integrations/?tab=dockeradv2
[6]: https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Integrating.AutoScaling.html
