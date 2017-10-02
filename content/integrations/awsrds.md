---
title: Datadog-AWS RDS Integration
integration_title: AWS RDS
kind: integration
git_integration_title: amazon_rds
newhlevel: true
---

{{< img src="integrations/awsrds/rdsdashboard.png" alt="RDS Dashboard" >}}

## Overview

Amazon Relational Database Service (RDS) is a web service that makes it easy to setup, operate, and scale a relational database in the cloud. Enable this integration to see all your RDS metrics in Datadog

There are 3 options for monitoring RDS instances. You can choose to use standard or enhanced, and then optionally turn on the native database integration as well if you wish.

* **Standard RDS Integration** - The standard integration requires selecting RDS on the left side of the AWS integration tile. You will receive metrics about your instance as often as your Cloudwatch integration allows. All RDS Engine types are supported.

* **Enhanced RDS Integration** - The enhanced integration requires additional configuration and is only available for MySQL, Aurora, PostgreSQL, and MariaDB engines. Additional metrics are available but an AWS Lambda is required to submit the metrics to Datadog. The higher granularity and additional required services may result in additional AWS charges.

* **RDS + Native Database Integration** - You can also choose to turn on the Native Database Integration. This is available for MySQL, Aurora, MariaDB, SQL Server, and PostgreSQL engine types. To get the metrics from RDS and the ones from the native integration to match up, you will need to use the `dbinstanceidentifier` tag on the native integration based on the identifier you assign to the RDS instance. The RDS instances will automatically have the tag assigned.


## Setup
### Installation

#### Standard RDS Integration 

If you haven't already, set up the [Amazon Web Services integration first](/integrations/aws).

#### Enhanced RDS Integration 

Enable Enhanced Monitoring for your RDS instance. This can either be done during instance creation or afterwards by choosing **Modify** under **Instance Actions**. We recommend choosing 15 for Monitoring Granularity.
{{< img src="integrations/awsrds/rds-enhanced-install.png" alt="RDS enhanced install" >}}

##### Create your KMS Key
1. Open the Encryption keys section of the AWS Identity and Access Management (IAM) console at https://console.aws.amazon.com/iam/home#encryptionKeys.
*For Region, choose the appropriate AWS Region. Do not use the region selector in the navigation bar (top right corner).*
2.  Choose **Create Key**.
3.  Enter an Alias for the key, such as `lambda-datadog-key`. *Note: An alias cannot begin with aws. Aliases that begin with aws are reserved by Amazon Web Services to represent AWS-managed CMKs in your account.*
4. Save your KMS key
5.  Add the appropriate administrators and then users for the key. Ensure that you select yourself at least as a user.
6.  Encrypt the key you just created by using the [AWS CLI][5], replacing \<KMS_KEY_NAME\> with the alias of the key you just created: <br>
`aws kms encrypt --key-id alias/<KMS_KEY_NAME> --plaintext '{"api_key":"<DATADOG_API_KEY>", "app_key":"<DATADOG_APP_KEY>"}'`. <br>
The command output will include two parts: a ciphertext blob followed by the key ID that starts with something similar to **arn:aws:kms**.

7. Keep your base-64 encoded, encrypted key (CiphertextBlob) you will need it to set the `<KMS_ENCRYPTED_KEYS>` variable for your [lambda](#create-your-lambda-function).

##### Create your Role
8.  From the IAM Management Console, create a new role. Enter a name for the role, such as `lambda-datadog-post-execution`.
9. Select **AWS Lambda** from the AWS Service Roles list. You do not need to attach any policies at this time. Press the appropriate buttons to complete the role creation.
10.  Click on the role you just created. Expand the Inline Policies section and click the link to create a policy. Choose **Custom Policy** and press the button to continue.
11.  Enter a policy name, such as `lambda-datadog-policy`. For Policy Document, enter the following, replacing `<ENCRYPTION_KEY ARN>` with the ARN of the Encryption Key you created previously:
{{< highlight json >}}
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
{{< /highlight >}}

##### Create your Lambda function

12. From the Lambda Management Console, create a new Lambda Function. **Your Lambda function must be in the same region as the KMS key you created.**
13. On the Select blueprint screen, select the **datadog-process-rds-metrics blueprint.**
14. Choose `RDSOSMetrics` from the **Log Group** dropdown.
15. Enter anything for the Filter Name and click Next.
16. Enter a name for your function, such as `lambda-datadog-post-function`.
17. Among the Lambda function's environment variables, look for one named `<KMS_ENCRYPTED_KEYS>` . Set its value to the ciphertext blob from the output of the command in step 7 of previous section.
18. Under Lambda function handler and role, choose the role you created previously. Click **Next**.
19. Choose **Enable Now**
20. Choose **Create Function**.

---- 

When clicking on test button for your lambda function you might get this error:
{{< highlight json >}}
{ 
  "stackTrace": [ [ "/var/task/lambda_function.py", 
    109, 
    "lambda_handler", 
    "event = json.loads(gzip.GzipFile(fileobj=StringIO(event['awslogs']['data'].decode('base64'))).read())" 
    ] 
  ], 
  "errorType": "KeyError", 
  "errorMessage": "'awslogs'" 
}
{{< /highlight >}}

Please ignore it, the Test button doesn't work with this setup.

#### Native Database Integration

  1.  Navigate to the AWS Console and open the RDS section to find the instance you want to monitor.
  {{< img src="integrations/awsrds/rds-console.png" alt="RDS console" >}}
  2.  Copy the endpoint URL (e.g. **mysqlrds.blah.us-east1.rds.amazonaws.com:3306**); You will need it when you configure the agent. Also make a note of the `DB Instance identifier` (e.g. **mysqlrds**). You will need it to create graphs and dashboards.

### Configuration

#### Standard RDS Integration

Ensure RDS is checked in the AWS Integration tile.

#### Enhanced RDS Integration

Ensure RDS is checked in the AWS Integration tile.

#### Native Database Integration
Configure an agent and connect to your RDS instance by editing the appropriate yaml file in your conf.d directory and then restart your agent: 

If you are using MySQL, MariaDB, or Aurora, then edit mysql.yaml:
{{< highlight yaml >}}
init_config:

instances:
  - server: mysqlrds.blah.us-east1-rds.amazonaws.com # The endpoint URL from the AWS console
    user: my_username
    pass: my_password
    port: 3306
    tags:
      - dbinstanceidentifier:my_own_instance
{{< /highlight >}}

If you are using PostgreSQL, then edit postgres.yaml:
  {{< highlight yaml >}}
init_config:

instances:
  - host: mysqlrds.blah.us-east1-rds.amazonaws.com
    port: 5432
    username: my_username
    password: my_password
    dbname: db_name
    tags:
      - dbinstanceidentifier:my_own_instance
{{< /highlight >}}

If you are using Microsoft SQL Server, then edit sqlserver.yaml
{{< highlight yaml >}}
init_config:

instances:
  - host: mysqlrds.blah.us-east1-rds.amazonaws.com,1433
    username: my_username
    password: my_password
    tags:
      - dbinstanceidentifier:my_own_instance
{{< /highlight >}}

### Validation

To validate that the native database integration is working, run `sudo /etc/init.d/datadog-agent info`. You should see something like the following:
{{< highlight shell >}}
Checks
======

[...]

  mysql
  -----
      - instance #0 [OK]
      - Collected 8 metrics & 0 events
{{< /highlight >}}

### Usage

After a few minutes, RDS metrics and metrics from MySQL, Aurora, MariaDB, SQL Server, or PostgreSQL will be accessible in Datadog in the Metrics Explorer, in Graphs and in Alerts. Here's an example of an Aurora dashboard displaying a number of metrics from both RDS and the MySQL integration. Metrics from both integrations on the instance `quicktestrds` are unified using the `dbinstanceidentifier` tag.
{{< img src="integrations/awsrds/aurora-rds-dash.png" alt="rds aurora dash" >}}

Here is the default dashboard for MySQL on Amazon RDS:
{{< img src="integrations/awsrds/rds-mysql.png" alt="RDS MySQL default dashboard" >}}

Learn more about how to monitor MySQL on Amazon RDS performance metrics thanks to [our series of posts](https://www.datadoghq.com/blog/monitoring-rds-mysql-performance-metrics/). We detail the key performance metrics, how to collect them, and how to use Datadog to monitor MySQL on Amazon RDS.

## Data Collected
### Metrics

In addition to the metrics you get from the database engines you will also get the following RDS metrics:

{{< get-metrics-from-git >}}

Each of the metrics retrieved from AWS will be assigned the same tags that appear in the AWS console, including but not limited to host name, security-groups, and more.

   [3]: mailto:support@datadoghq.com
   [5]: http://aws.amazon.com/documentation/cli/
   [6]: https://app.datadoghq.com/account/settings#api
