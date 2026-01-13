---
title: Enable Data Jobs Monitoring for Spark on Amazon EMR
description: "Configure Data Jobs Monitoring for Apache Spark applications on Amazon EMR clusters using AWS Secrets Manager and bootstrap actions."
aliases:
  - /data_jobs/emr
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

[Data Jobs Monitoring][9] gives visibility into the performance and reliability of Apache Spark applications on Amazon EMR.

If you are using [EMR on EKS][13], follow these [instructions for setting up DJM on Kubernetes][14].

## Requirements

[Amazon EMR Release 6.0.1][10] or later is required.

## Setup

Follow these steps to enable Data Jobs Monitoring for Amazon EMR.

1. [Store your Datadog API key](#store-your-datadog-api-key-in-aws-secrets-manager-recommended) in AWS Secrets Manager (Recommended).
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
EMR EC2 instance profile is a IAM role assigned to every EC2 instance in an Amazon EMR cluster when the instance launches. Follow [the Amazon guide][11] to prepare this role based on your application's need to interact with other AWS services. The following additional permissions may be required for Data Jobs Monitoring.

#### Permissions to get secret value using AWS Secrets Manager

<div class="alert alert-danger">
These permissions are <strong>required</strong> if you are using AWS Secrets Manager.
</div>

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

<div class="alert alert-danger">
These permissions are <strong>required</strong> if you are <strong>NOT</strong> using the default role, <code>EMR_EC2_DefaultRole</code>.
</div>

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
   export DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Set required parameter DD_API_KEY with Datadog API key.
   # The commands below assumes the API key is stored in AWS Secrets Manager, with the secret name as datadog/dd_api_key and the key as dd_api_key.
   # IMPORTANT: Modify if you choose to manage and retrieve your secret differently.
   SECRET_NAME=datadog/dd_api_key
   export DD_API_KEY=$(aws secretsmanager get-secret-value --secret-id $SECRET_NAME | jq -r .SecretString | jq -r '.["dd_api_key"]')

   # Optional: uncomment to send spark driver and worker logs to Datadog
   # export DD_EMR_LOGS_ENABLED=true

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-emr.sh > djm-install-script; bash djm-install-script || true

   ```

   Optionally, the script can be configured adding the following environment variables:
   The script above sets the required parameters, and downloads and runs the latest init script for Data Jobs Monitoring in EMR. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-emr-0.13.5.sh` to use version `0.13.5`, for example. The source code used to generate this script, and the changes between script versions can be found on the [Datadog Agent repository][12].

   Optionally, the script can be configured by adding the following environment variables:

| Variable                 | Description                                                                                                                                                      | Default |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|
| DD_TAGS                  | Add tags to EMR cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][15]. Example: `env:staging,team:data_engineering` |         |
| DD_ENV                   | Set the `env` environment tag on metrics, traces, and logs from this cluster.   |         |
| DD_EMR_LOGS_ENABLED      | Send Spark driver and worker logs to Datadog.                                                                                                                  | false   |
| DD_LOGS_CONFIG_PROCESSING_RULES | Filter the logs collected with processing rules. See [Advanced Log Collection][16] for more details. |         |

[15]: /getting_started/tagging/
[16]: /agent/logs/advanced_log_collection/?tab=environmentvariable#global-processing-rules

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

## Troubleshooting

{{% djm-install-troubleshooting %}}

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
[12]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/emr.go
[13]: https://docs.aws.amazon.com/emr/latest/EMR-on-EKS-DevelopmentGuide/emr-eks.html
[14]: /data_jobs/kubernetes/
