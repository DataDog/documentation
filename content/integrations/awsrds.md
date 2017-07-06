---
title: Datadog-AWS RDS Integration
integration_title: AWS RDS
kind: integration
git_integration_title: amazon_rds
newhlevel: true
---

# Overview

![RDS Dashboard](/static/images/rdsdashboard.png)

Amazon Relational Database Service (RDS) is a web service that makes it easy to setup, operate, and scale a relational database in the cloud. Enable this integration to see all your RDS metrics in Datadog

## How this works

There are 3 options for monitoring RDS instances. You can choose to use standard or enhanced, and then optionally turn on the native database integration as well if you wish.

* **Standard RDS Integration** - The standard integration requires selecting RDS on the left side of the AWS integration tile. You will receive metrics about your instance as often as your Cloudwatch integration allows. All RDS Engine types are supported.

* **Enhanced RDS Integration** - The enhanced integration requires additional configuration and is only available for MySQL, Aurora, PostgreSQL, and MariaDB engines. Additional metrics are available but an AWS Lambda is required to submit the metrics to Datadog. The higher granularity and additional required services may result in additional AWS charges.

* **RDS + Native Database Integration** - You can also choose to turn on the Native Database Integration. This is available for MySQL, Aurora, MariaDB, SQL Server, and PostgreSQL engine types. To get the metrics from RDS and the ones from the native integration to match up, you will need to use the `dbinstanceidentifier` tag on the native integration based on the identifier you assign to the RDS instance. The RDS instances will automatically have the tag assigned.


# Installation

* **Standard RDS Integration**

  If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

* **Enhanced RDS Integration**

  1.  Enable Enhanced Monitoring for your RDS instance. This can either be done during instance creation or afterwards by choosing **Modify** under **Instance Actions**. We recommend choosing 15 for Monitoring Granularity.
      ![][4]
  2.  From the IAM Management Console, click on **Encryption Keys**. Click the **Create Key** button.
  3.  Enter an Alias for the key, such as `lambda-datadog-key`.
  4.  Add the appropriate administrators and then users for the key. Ensure that you select yourself at least as a user.
  5.  Encrypt the key you just created by using the [AWS CLI][5]:

          aws kms encrypt --key-id alias/<KMS key name> --plaintext '{"api_key":"<datadog_api_key>", "app_key":"<datadog_app_key>"}'

      The KMS key name should be replaced by the alias of the key you just created. The datadog api and app keys should be replaced by [the api and app keys found here][6].

      The output of this command will include two parts: a ciphertext blob followed by the key ID that starts with something similar to **arn:aws:kms**.
  6.  From the IAM Management Console, create a new role. Enter a name for the role, such as `lambda-datadog-post-execution`.
  7.  Select **AWS Lambda** from the AWS Service Roles list. You do not need to attach any policies at this time. Press the appropriate buttons to complete the role creation.
  8.  Click on the role you just created. Expand the Inline Policies section and click the link to create a policy. Choose **Custom Policy** and press the button to continue.
  9.  Enter a policy name, such as `lambda-datadog-policy`. For Policy Document, enter the following, replacing &lt;ENCRYPTION_KEY ARN> with the ARN of the Encryption Key:

          {
              "Version": "2012-10-17",
              "Statement": [
                  {
                      "Effect": "Allow",
                      "Action": [
                          "kms:Decrypt"
                      ],
                      "Resource": [
                          "<ENCRYPTION_KEY ARN>"
                      ]
                  }
              ]
          }

  10. From the Lambda Management Console, create a new Lambda Function.
  11. On the Select blueprint screen, select the datadog-process-rds-metrics blueprint.
  12. Choose `RDSOSMetrics` from the **Log Group** dropdown.
  13. Enter anything for the Filter Name and click Next.
  13. Enter a name for your function, such as `lambda-datadog-post-function`.
  14. In the Lambda function code area, replace `<KMS_ENCRYPTED_KEYS>` with the ciphertext blob part of the CLI command output above.
  15. Under Lambda function handler and role, choose the role you created above. Click **Next**.
  16. Choose the **Enable Now** radio button.
  17. Click the **Create Function** button.


* **Native Database Integration**

  1.  Navigate to the AWS Console and open the RDS section to find the instance you want to monitor.
      ![][1]
  2.  Copy the endpoint URL (e.g. **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**); You will need it when you configure the agent. Also make a note of the `DB Instance identifier` (e.g. **mysqlrds**). You will need it to create graphs and dashboards.

# Configuration

* **Standard RDS Integration**

  1.  Ensure RDS is checked in the AWS Integration tile.

* **Enhanced RDS Integration**

  1.  Ensure RDS is checked in the AWS Integration tile.

* **Native Database Integration**

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

To validate that the native database integration is working, run `datadog-agent info`. You should see something like the following:

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

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.


   [1]: /static/images/rds-console.png
   [2]: /static/images/aurora-rds-dash.png
   [3]: mailto:support@datadoghq.com
   [4]: /static/images/rds-enhanced-install.png
   [5]: http://aws.amazon.com/documentation/cli/
   [6]: https://app.datadoghq.com/account/settings#api
