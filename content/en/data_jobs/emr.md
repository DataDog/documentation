---
title: Enable Data Jobs Monitoring for Spark on Amazon EMR
kind: documentation
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring is in private beta. Fill out this form to join the wait list.
{{< /callout >}} 

[Data Jobs Monitoring][9] gives visibility into the performance and reliability of Apache Spark applications on Amazon EMR.

## Setup

Follow these steps to enable Data Jobs Monitoring for Amazon EMR.

1. [Store your Datadog API key](#store-your-datadog-api-key-in-aws-secrets-manager) in AWS Secrets Manager.
1. [Create and configure your EMR cluster](#create-and-configure-your-emr-cluster).
1. [Grant API access to your EMR EC2 instance profile](#grant-api-access-to-your-emr-ec2-instance-profile).
1. [Specify service tagging per Spark application](#specify-service-tagging-per-spark-application).

### Store your Datadog API key in AWS Secrets Manager
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

### Create and configure your EMR cluster

When you create a new EMR cluster in the [Amazon EMR console][4], use the following configurations on the **Create Cluster** page:

#### Add a bootstrap action to install the Datadog Agent and Java tracer

1. Save [this init script][6] to an S3 bucket that your EMR cluster can read. Take note of the path to this script.
1. On the **Create Cluster** page, find the **Bootstrap actions** section. Click **Add** to bring up the **Add bootstrap action** dialog.
   {{< img src="data_jobs/emr/add_bootstrap_action.png" alt="Amazon EMR console, Create Cluster, Add Bootstrap Action dialog. Text fields for name, script location, and arguments." style="width:80%;" >}}
   - For **Name**, give your bootstrap action a name. You can use `datadog_agent`.
   - For **Script location**, enter the path to where you stored the init script in S3.
   - For **Arguments**, enter two arguments separated by a space: your Datadog site, and the name of the secret in which you stored your Datadog API key. 
      Example:
      ```text
      {{< region-param key="dd_site" code="true" >}} datadog/dd_api_key
      ```
   - Click **Add bootstrap action**.

When your cluster is created, this bootstrap action installs the Datadog Agent and downloads the Java tracer on each node of the cluster.

#### (For ARM) Add Java tracer configuration

If you are using an ARM-based EC2 instance, add the following configuration on the **Create Cluster** page, under the **Software settings** section.

   ```json
   [{
       "Classification": "spark-defaults",
       "Properties": {
       "spark.driver.defaultJavaOptions": "-javaagent:/var/tmp/jars/dd-java-agent.jar -Ddd.integration.spark.enabled=true -Ddd.integrations.enabled=false"
       }
   }]
   ```
   {{< img src="data_jobs/emr/software_settings.png" alt="Amazon EMR console, Create Cluster. A section called 'Software settings'. The 'Enter configuration' option is selected. Below it, a configuration is pasted into a text field." style="width:100%;" >}}

### Grant API access to your EMR EC2 instance profile

1. In your [Amazon EMR console][4], open the summary page for your newly created cluster. Take note of your cluster's **IAM role for instance profile**.

   Alternatively, you can also find this value by running: 
   ```shell
   aws emr describe-cluster --cluster-id <YOUR_CLUSTER_ID>
   ```
   Look for `Ec2InstanceAttributes.IamInstanceProfile` in the output.
1. In your [AWS IAM console][5], click on **Access management** > **Roles** in the left navigation bar. 
1. Click on the instance profile you saw in the previous step.
1. On the next page, under the **Permissions** tab, find the **Permissions policies** section. Click on **Add permissions** > **Create inline policy**.
1. On the **Specify permissions** page, find the **Select a service** section. Under **Service**, select **Secrets Manager**.
   {{< img src="data_jobs/emr/specify_permissions.png" alt="AWS IAM console, Specify Permissions page." style="width:80%;" >}}
   - Then, under **Actions allowed**, select `GetSecretValue`. This is a **Read** action.
   - Under **Resources**, select **Specific**. Then, next to **Secret**, click on **Add ARNs** and add the ARN of the secret you created in the first step on this page.
   - Click **Next**.
1. On the next page, give your policy a name. Then, click **Create policy**.


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

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/secretsmanager/
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
[4]: https://console.aws.amazon.com/emr
[5]: https://console.aws.amazon.com/iam/
[6]: /resources/sh/data_jobs/datadog_emr_job_monitoring_init_v2.sh
[7]: /getting_started/site/
[8]: https://app.datadoghq.com/apm/data-jobs
[9]: /data_jobs