---
title: Datadog-AWS RDS Integration
integration_title: AWS RDS
kind: integration
git_integration_title: amazon_rds
newhlevel: true
---

# Overview

Amazon Relational Database Service (RDS) is a web service that makes it easy to setup, operate, and scale a relational database in the cloud. Enable this integration to see all your RDS metrics in Datadog

## How this works

RDS provides database instances and reports instance metrics via Cloudwatch. Cloudwatch metrics are collected at most once per minute and do not provide a comprehensive coverage of RDS performance. To get real-time metrics from your MySQL, Aurora, or PostgreSQL instances you will need to use a Datadog agent that connects to your RDS instances.

Because the agent metrics will be tied to the instance where the agent is running and not to the actual RDS instance, you will need to use the `dbinstanceidentifier` tag to connect all metrics together. The RDS instances will automatically be assigned the tag.

# Installation

1.  Navigate to the AWS Console and open the RDS section to find the instance you want to monitor.
    ![][1]
2.  Copy the endpoint URL (e.g. **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**); You will need it when you configure the agent. Also make a note of the `DB Instance identifier` (e.g. **mysqlrds**). You will need it to create graphs and dashboards.

# Configuration

1.  Configure an agent and connect to your RDS instance by editing the appropriate yaml file in your conf.d directory.
    a.  If you are using MySQL, MariaDB, or Aurora, then edit mysql.yaml:

        init_config:

        instances:
          - server: mysqlrds.blah.us-east1-rds.amazonaws.com # The endpoint URL from the AWS console
            user: my_username
            pass: my_password
            port: 3306
            tags:
              - dbinstanceidentifier:my_own_instance
    {:.language-yaml}

    b.  If you are using PostgreSQL, then edit postgres.yaml:

        init_config:

        instances:
          - host: mysqlrds.blah.us-east1-rds.amazonaws.com
            port: 5432
            username: my_username
            password: my_password
            dbname: db_name
            tags:
              - dbinstanceidentifier:my_own_instance
    {:.language-yaml}

    c.  If you are using Microsoft SQL Server, then edit sqlserver.yaml

        init_config:

        instances:
          - host: mysqlrds.blah.us-east1-rds.amazonaws.com,1433
            username: my_username
            password: my_password
            tags:
              - dbinstanceidentifier:my_own_instance
    {:.language-yaml}

2.  Restart the agent.

# Validation

To validate that the integration is working, run `datadog-agent info`. You should see something like the following:

    Checks
    ======

      [...]

      mysql
      -----
          - instance #0 [OK]
          - Collected 8 metrics & 0 events


# Usage

After a few minutes, RDS metrics and metrics from MySQL, Aurora, MariaDB, SQL Server, or PostgreSQL will be accessible in Datadog in the Metrics Explorer, in Graphs and in Alerts. Here's an example of an Aurora dashboard displaying a number of metrics from both RDS and the MySQL integration. Metrics from both integrations on the instance `quicktestrds` are unified using the `dbinstanceidentifier` tag. ![][2]

Here is the default dashboard for MySQL on Amazon RDS:
![RDS MySQL default dashboard](/static/images/rds-mysql.png)

Learn more about how to monitor MySQL on Amazon RDS performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor MySQL on Amazon RDS.

# Metrics

In addition to the metrics you get from the database engines you will also get the following RDS metrics:

<%= get_metrics_from_git()%>

   [1]: /static/images/rds-console.png
   [2]: /static/images/aurora-rds-dash.png
   [3]: mailto:support@datadoghq.com


