---
title: Automatically configure your aurora clusters for monitoring
kind: guide
---

{{< beta-callout url="#" btn_hidden="true" >}}
Aurora cluster auto discovery is a beta feature. If you have any feedback about this feature, contact Support at support@datadoghq.com.
{{< /beta-callout >}}

This guide assumes that you have configured Database Monitoring for your Amazon Aurora [Postgres][1] or [MySQL][11].

## Before you begin

Supported databases
: Postgres, MySQL

Supported Agent versions
: 7.53.0+ (Not yet released)

In order to use this feature now, you need to install the beta version of the Agent. See the installation instructions below.

## Overview

The Datadog Agent supports configuring automatic discovery and monitoring of your Aurora clusters. This feature works in lieu of manually configuring the Agent by listing individual database host endpoints.

This is helpful for Aurora clusters with [auto-scaling enabled][6], automatically adjusting the number of read replicas in response to workload variations.

This features leverages the Agent [Autodiscovery feature][4] and lets you define configuration templates for Postgres or MySQL checks, and specify which clusters each check should apply to.

## Enabling Aurora cluster discovery

The following outlines the different configuration steps to enable Aurora cluster discovery in your Datadog Agent.

### Agent installation

To use this feature, you need to install a beta version of the Agent.

The beta version can be found [here][9]. You can use the Agent installation script to install the correct version by running the following command:

```bash
DD_API_KEY=${API_KEY} DD_SITE="datadoghq.com" \
DD_AGENT_DIST_CHANNEL=beta DD_AGENT_MAJOR_VERSION=7 \
DD_AGENT_MINOR_VERSION=52.0~dbm~aurora~autodiscovery~beta~0.3-1 \
bash -c "$(curl -L https://s3.amazonaws.com/dd-agent/scripts/install_script_agent7.sh)"
```

For more information on installing the Datadog Agent, please read the following [documentation][10].

### AWS permissions

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
      "Resource": [
        "arn:aws:rds:<region>:<account>:cluster:*",
        "arn:aws:rds:<region>:<account>:db:*"
      ]
    }
  ]
}
```

You can also attach the [AmazonRDSReadOnlyAccess][3] policy.

### Configure Aurora

By default, the listener discovers all Aurora clusters in the account and region where the Agent is running that have the `datadoghq.com/scrape:true` tag applied. You can also configure the Agent to discover clusters with specific tags.

The tags must be applied to the DB cluster (Role: `Regional cluster`). For more information on tagging RDS resources, see the [AWS documentation][7].

### Configure the Datadog Agent

This utilizes an Agent service listener, responsible for discovering all database host endpoints in an Aurora cluster and forwarding discovered endpoints to the existing Agent check scheduling pipeline. You can configure the listener in the `datadog.yaml` file:

```yaml
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

**Note**: The Agent only discovers Aurora instances running in the same region as the Agent. In order to discover the region, the Agent uses [IMDS (Instance Metadata Service)][8] to determine the region where it is running. If your Ec2 instance requires `IMDSv2`, you need to configure the Agent to use `IMDSv2` by setting `ec2_prefer_imdsv2: true` in the `datadog.yaml`.

Specify IMDSv2 in the `datadog.yaml` file:

```yaml
ec2_prefer_imdsv2: true
database_monitoring:
  autodiscovery:
    aurora:
      enabled: true
```

By default, the listener only discovers Aurora clusters in the account and region where the Agent is running that have the `datadoghq.com/scrape:true` tag applied. You can also configure the listener to discover clusters with specific tags.

Specify custom tags for the Aurora cluster discovery in the `datadog.yaml` file:

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

#### Postgres

In order to enable Aurora cluster discovery for the postgres integration, you need to add the postgres Aurora `ad_identifier` to your configuration template (`postgres.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_postgres_aurora
```

**Example**: The following configuration template is applied to every instance discovered in the Aurora cluster:

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

**Note**: In this example, `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%` and `%%extra_region%%` are a template variables that is dynamically populated with information from the Aurora cluster.

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

#### MySQL

In order to enable Aurora cluster discovery for the mysql integration, you need to add the mysql Aurora `ad_identifier` to your configuration template (`mysql.d/conf_aws_aurora.yaml`) file:

```yaml
ad_identifiers:
  - _dbm_mysql_aurora
```

**Example**: The following configuration template will be applied to every instance discovered in the Aurora cluster:

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

**Note**: In this example, `%%host%%`, `%%port%%`, `%%extra_dbclusteridentifier%%` and `%%extra_region%%` are a template variables that is dynamically populated with information from the Aurora cluster.

For more information on Integrations Autodiscovery and how to configure it, see the [Autodiscovery documentation][5].

#### Supported template variables

The following documentation lists the supported template variables for the Aurora cluster discovery:

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
