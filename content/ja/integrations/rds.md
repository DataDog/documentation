---
last_modified: 2015/03/31
translation_status: original
language: ja
title: Datadog-AWS RDS インテグレーション
sidebar:
  nav:
    - header: インテグレーション
    - text: インデックスへ戻る
      href: "/ja/integrations/"
---

In this HOWTO you will learn how to best integrate AWS Relational
Database Service (RDS) with Datadog.

<h2>How this works</h2>

RDS provides database instances and reports
instance metrics via Cloudwatch. Cloudwatch metrics are collected at
most one per minute and do not provide a comprehensive coverage of RDS
performance.

To get real-time metrics from your MySQL or PostgreSQL instances you
will need to use a Datadog agent that connects to your RDS instances.
Because the agent metrics will be tied to the instance where the agent
is running and not to the actual RDS instance, you will need to use
the <code>dbinstanceidentifer</code> tag to connect all metrics
together.

Once the agent is configured with the same tags as the RDS instance,
getting MySQL/PostgreSQL metrics in the context of RDS metrics is child's
play.

<h2>Step-by-step</h2>

<h3>1. Gather connection details for your RDS instance</h3>

First navigate to the AWS Console and open the RDS section to find the
RDS instance you want to monitor. It should look like:

<img src="/static/images/rds-console.png" style="width:100%; border:1px solid #777777"/>

Write down the endpoint URL
(e.g. <strong>mysqlrds.blah.us-east1.rds.amazonaws.com:3306</strong>);
You will need it when you configure the agent.

Also make a note of the <code>DB Instance identifier</code>
(e.g. <strong>mysqlrds</strong>). You will need it to create
graphs and dashboards.


<h3>2. Configure an agent and connect to your RDS instance</h3>

The MySQL/PostgreSQL integrations support the tagging of individual
database instances. Originally designed to allow the monitoring of
multiple instances on the same machine, you can use these tags to your
advantage.

Here is an example of a configuration for MySQL RDS
using <code>mysql.yaml</code>, usually found
in <code>/etc/dd-agent/conf.d</code>.

<%= snippet_code_block "rds-conf.yaml" %>

Then restart the agent and verify that the new check is working by running
<code>sudo service datadog-agent info</code> (on linux).

<h3>3. Visualize RDS and MySQL/PostgreSQL metrics together</h3>

After a few minutes, RDS metrics and MySQL/PostgreSQL metrics will be
accessible in Datadog in the Metrics Explorer, in Graphs and in
Alerts.

Here's an example of a graph displaying I/O for the instance <code>mysqlrds</code> using the <code>dbinstanceidentifier</code> tag.

<img src="/static/images/rds-example.png" style="width:100% border:1px #777777"/>

<h2>What's next?</h2>

Not working? Have questions for us? Please contact our <a href="mailto:support@datadoghq.com">support team</a>.
