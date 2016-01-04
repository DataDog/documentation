---
title: Datadog-AWS RDS Integration
integration_title: AWS RDS
kind: integration
git_integration_title: amazon_rds
---

In this how-to you will learn how to best integrate AWS Relational Database Service (RDS) with Datadog.

## How this works

RDS provides database instances and reports instance metrics via Cloudwatch. Cloudwatch metrics are collected at most once per minute and do not provide a comprehensive coverage of RDS performance. To get real-time metrics from your MySQL, Aurora, or PostgreSQL instances you will need to use a Datadog agent that connects to your RDS instances. Because the agent metrics will be tied to the instance where the agent is running and not to the actual RDS instance, you will need to use the `dbinstanceidentifier` tag to connect all metrics together. Once the agent is configured with the same tags as the RDS instance, getting MySQL/Aurora or PostgreSQL metrics in the context of RDS metrics is child's play.

## Step-by-step

### 1. Gather connection details for your RDS instance

First navigate to the AWS Console and open the RDS section to find the RDS instance you want to monitor. It should look like: ![][1] Copy the endpoint URL (e.g. **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**); You will need it when you configure the agent. Also make a note of the `DB Instance identifier` (e.g. **mysqlrds**). You will need it to create graphs and dashboards.

### 2. Configure an agent and connect to your RDS instance

The MySQL and PostgreSQL integrations both support the tagging of individual database instances. (Use the MySQL integration for Amazon Aurora.) Originally designed to allow the monitoring of multiple instances on the same machine, you can use these tags to your advantage. Here is an example of a configuration for MySQL RDS using `mysql.yaml`, usually found in `/etc/dd-agent/conf.d`.

    init_config:

    instances:
      - server: mysqlrds.blah.us-east1-rds.amazonaws.com # The endpoint URL from the AWS console
        user: my_username
        pass: my_password
        port: 3306
        tags:
          - dbinstanceidentifier:my_own_instance
{:.language-yaml}

Then restart the agent and verify that the new check is working by running `sudo service datadog-agent info` (on linux).

### 3. Visualize RDS and MySQL/Aurora/PostgreSQL metrics together

After a few minutes, RDS metrics and metrics from MySQL, Aurora, or PostgreSQL will be accessible in Datadog in the Metrics Explorer, in Graphs and in Alerts. If you are using MySQL or Aurora on RDS, you will have access to a comprehensive dashboard out of the box that displays many of your database's key metrics. Here's an example of an Aurora dashboard displaying a number of metrics from both RDS and the MySQL integration. Metrics from both integrations on the instance `quicktestrds` are unified using the `dbinstanceidentifier` tag. ![][2]

## Monitor

Here is the default dashboard for MySQL on Amazon RDS:
![RDS MySQL default dashboard](/static/images/rds-mysql.png)

Learn more about how to monitor MySQL on Amazon RDS performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor MySQL on Amazon RDS.

## Metrics

<%= get_metrics_from_git()%>

## Need help?

Not working? Have questions for us? Please contact our [support team][3].

   [1]: /static/images/rds-console.png
   [2]: /static/images/aurora-rds-dash.png
   [3]: mailto:support@datadoghq.com


