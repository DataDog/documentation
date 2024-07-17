---
title: Enable Data Jobs Monitoring for Spark on Amazon EMR
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

[Data Jobs Monitoring][9] gives visibility into the performance and reliability of Apache Spark applications on Amazon EMR.

## Requirements

[Amazon EMR Release 6.0.1][10] or later is required.

## Setup

Follow these steps to enable Data Jobs Monitoring for Amazon EMR.

1. [Store your Datadog API key](#store-your-datadog-api-key-in-aws-secrets-manager) in AWS Secrets Manager (Recommended).
1. [Grant permissions to EMR EC2 instance profile](#grant-permissions-to-emr-ec2-instance-profile).
1. [Create and configure your EMR cluster](#create-and-configure-your-emr-cluster).
1. [Specify service tagging per Spark application](#specify-service-tagging-per-spark-application).

### Store your Datadog API key in AWS Secrets Manager (Recommended)
1. Take note of your [Datadog API key][1].
1. In [AWS Secrets Manager][2], choose **Store a new secret**.
   - Under **Secret type**, select **Other type of secret**.
   - Under **Key/value pairs**, add your Datadog API key as a key-value pair, where the key is `dd_api_key`.
      {{< img src="data_jobs/emr/key_value.png" alt="AWS Secrets Manager, Store a new secret. A section titled 'Key/value pairs'. On the left, a text box containing 'dd_api_key'. On the right, a text box containing a redacted API key." style="width:80%;" >}}
   - Then, click **Next**.
1. On the **Configure secret** page, enter a **Secret name**. You can use `datadog/dd_api_key`. Then, click **Next**.
1. On the **Configure rotation** page, you can optionally turn on [automatic rotation][3]. Then, click **Next**.
1. On the **Review** page, review your secret details. Then, click **Store**.
1. In AWS Secrets Manager, open the secret you created. Take note of the **Secret ARN**.

### Grant permissions to EMR EC2 instance profile
EMR EC2 instance profile is a IAM role assigned to every EC2 instance in an Amazon EMR cluster when the instance launches, follow [the offical guide][11] to prepare this role based on your application's need to interact with other AWS services. The following permssions are additional permissions required for Data Jobs Monitoring.

#### Permissions to get secret value using AWS Secret Management (Recommended)
1. In your [AWS IAM console][5], click on **Access management** > **Roles** in the left navigation bar. 
1. Click on the IAM role you plan to use as the instance profile for your EMR cluster.
1. On the next page, under the **Permissions** tab, find the **Permissions policies** section. Click on **Add permissions** > **Create inline policy**.
1. On the **Specify permissions** page, find the **Select a service** section. Under **Service**, select **Secrets Manager**.
   {{< img src="data_jobs/emr/specify_permissions.png" alt="AWS IAM console, Specify Permissions page." style="width:80%;" >}}
   - Then, under **Actions allowed**, select `GetSecretValue`. This is a **Read** action.
   - Under **Resources**, select **Specific**. Then, next to **Secret**, click on **Add ARNs** and add the ARN of the secret you created in the first step on this page.
   - Click **Next**.
1. On the next page, give your policy a name. Then, click **Create policy**.

#### Permissions to describe cluster
Only do this step if you are NOT using the default role **EMR_EC2_DefaultRole** for cluster EC2 instances and its associated AWS default managed policy, **AmazonElasticMapReduceforEC2Role**.

1. In your [AWS IAM console][5], click on **Access management** > **Roles** in the left navigation bar.
1. Click on the IAM role you plan to use as the instance profile for your EMR cluster.
1. On the next page, under the **Permissions** tab, find the **Permissions policies** section. Click on **Add permissions** > **Create inline policy**.
1. On the **Specify permissions** page, toggle on the **JSON** tab.
   - Then, copy and paste the following policy into the **Policy editor**
   ```json
   {
      "Version": "2012-10-17",
      "Statement": [
         {
            "Effect": "Allow",
            "Action": [
               "elasticmapreduce:ListBootstrapActions",
               "elasticmapreduce:ListInstanceFleets",
               "elasticmapreduce:DescribeCluster",
               "elasticmapreduce:ListInstanceGroups"
            ],
            "Resource": [
               "*"
            ]
         }
      ]
   }
   ```
   - Click **Next**.
1. On the next page, give your policy a name. Then, click **Create policy**.

Take note of the name of the IAM role you plan to use as the instance profile for your EMR cluster. 

### Create and configure your EMR cluster

When you create a new EMR cluster in the [Amazon EMR console][4], add a bootstrap action on the **Create Cluster** page:

1. Save the following script to an S3 bucket that your EMR cluster can read. Take note of the path to this script.

   ```shell
   #!/bin/bash

   # Set required parameter DD_SITE
   DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Set required parameter DD_API_KEY with Datadog API key.
   # The commands below assumes the API key is stored in AWS Secrets Manager, with the secret name as datadog/dd_api_key and the key as dd_api_key.
   # IMPORTANT: Modify if you choose to manage and retrieve your secret differently.
   SECRET_NAME=datadog/dd_api_key
   DD_API_KEY=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME | jq -r .SecretString | jq -r '.["dd_api_key"]')

   # Optional parameters
   # Uncomment the following line to allow adding init script logs when reporting a failure back to Datadog. A failure is reported when the init script fails to start the Datadog Agent successfully.
   # export DD_DJM_ADD_LOGS_TO_FAILURE_REPORT=true

   # Download and run the latest init script
   DD_SITE=$DD_SITE DD_API_KEY=$DD_API_KEY bash -c "$(curl -L https://dd-data-jobs-monitoring-setup.s3.amazonaws.com/scripts/emr/emr_init_latest.sh)" || true

   ```

   The script above sets the required parameters, downloads and runs the latest init script for Data Jobs Monitoring in EMR. If you want to pin your script to a specific version, you can replace the file name in the URL with `emr_init_1.4.0.sh` to use the last stable version.

1. On the **Create Cluster** page, find the **Bootstrap actions** section. Click **Add** to bring up the **Add bootstrap action** dialog.
   {{< img src="data_jobs/emr/add_bootstrap_action_without_arguments.png" alt="Amazon EMR console, Create Cluster, Add Bootstrap Action dialog. Text fields for name, script location, and arguments." style="width:80%;" >}}
   - For **Name**, give your bootstrap action a name. You can use `datadog_agent`.
   - For **Script location**, enter the path to where you stored the init script in S3.
   - Click **Add bootstrap action**.

1. On the **Create Cluster** page, find the **Identity and Access Management (IAM) roles** section. For **instance profile** dropdown, select the IAM role you have granted permissions in [Grant permissions to EMR EC2 instance profile](#grant-permissions-to-emr-ec2-instance-profile).

When your cluster is created, this bootstrap action installs the Datadog Agent and downloads the Java tracer on each node of the cluster.

### Specify service tagging per Spark application

Tagging enables you to better filter, aggregate, and compare your telemetry in Datadog. You can configure tags by passing `-Ddd.service`, `-Ddd.env`, `-Ddd.version`, and `-Ddd.tags` options to your Spark driver and executor `extraJavaOptions` properties.

In Datadog, each job's name corresponds to the value you set for `-Ddd.service`.

```shell
spark-submit \
 --conf spark.driver.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 --conf spark.executor.extraJavaOptions="-Ddd.service=<JOB_NAME> -Ddd.env=<ENV> -Ddd.version=<VERSION> -Ddd.tags=<KEY_1>:<VALUE_1>,<KEY_2:VALUE_2>" \
 application.jar
```

## Validation

In Datadog, view the [Data Jobs Monitoring][8] page to see a list of all your data processing jobs.

## Advanced Configuration

### Tag spans at runtime

{{% djm-runtime-tagging %}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/secretsmanager/
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
[4]: https://console.aws.amazon.com/emr
[5]: https://console.aws.amazon.com/iam/
[7]: /getting_started/site/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /data_jobs
[10]: https://docs.aws.amazon.com/emr/latest/ReleaseGuide/emr-601-release.html
[11]: https://docs.aws.amazon.com/emr/latest/ManagementGuide/emr-iam-role-for-ec2.html
