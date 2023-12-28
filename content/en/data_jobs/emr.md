---
title: Data Jobs Monitoring for Spark on Amazon EMR
kind: documentation
---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring is in private beta. Fill out this form to join the wait list.
{{< /callout >}} 

Data Jobs Monitoring gives visibility into the performance and reliability of Apache Spark applications on Amazon EMR clusters.

## Setup

Follow these steps to enable Data Jobs Monitoring for Amazon EMR.

1. [Configure your EMR EC2 instance](#configure-your-emr-ec2-instance-with-your-datadog-api-key) with your Datadog API key.
1. [Configure your EMR cluster](#configure-your-emr-cluster).
1. [Specify service and tags per Spark application](#specify-service-and-tags-per-spark-application).

### Configure your EMR EC2 instance with your Datadog API key
1. Take note of your [Datadog API key][1].
1. In [AWS Secrets Manager][2], choose **Store a new secret**. 
   - Under **Secret type**, select **Other type of secret**. 
   - Under **Key/value pairs**, add your Datadog API key as a key-value pair, where the key is `dd_api_key`.
      {{< img src="data_jobs/emr/aws_key_value.png" alt="." style="width:100%;" >}}
   - Then, click **Next**.
1. On the **Configure secret** page, enter a **Secret name**. You can use `datadog/dd_api_key`. Then, click **Next**.
1. On the **Configure rotation** page, you can optionally turn on [automatic rotation][3]. Then, click **Next**.
1. On the **Review** page, review your secret details. Then, click **Store**.
1. In AWS Secrets Manager, open the secret you created. Take note of the **Secret ARN**.
1. In [Amazon EMR][4], open your cluster's summary page. Take note of your cluster's **IAM role for instance profile**. For example, `EMR_EC2_DefaultRole`.

   Alternatively, you can also find this value by running: 
   ```shell
   aws emr describe-cluster --cluster-id <YOUR_CLUSTER_ID>
   ```
   Look for `Ec2InstanceAttributes.IamInstanceProfile` in the output.
1. In [AWS IAM][5], click on **Roles**. Then, click on the EC2 instance profile you saw in the previous step.
1. Under **Permissions**, click on **Add permissions** > **Create inline policy**.
   {{< img src="data_jobs/emr/create_policy.png" alt="." style="width:100%;" >}}
   - For **Service**, select **Secrets Manager**.
   - For **Actions**, select `GetSecretValue`.
   - For **Resources**, select **Specific**. Then, for **Secret**, enter your secret's ARN.
   - Then, click **Review policy**.
1. On the next page, give your policy a name. Then, click **Create policy**.

### Configure your EMR cluster

1. Save [this init script][6] to an S3 bucket that your EMR cluster can read. Take note of the path to this script.
1. In [Amazon EMR][4], add a bootstrap action. TK
   {{< img src="data_jobs/emr/edit_bootstrap_action.png" alt="." style="width:100%;" >}}
   - For **Name**, give your bootstrap action a name. You can use `datadog_agent`.
   - For **Script location**, enter the path to where you stored the init script in S3.
   - For **Arguments**, enter two arguments separated by a space: your Datadog site, and the name of the secret in which you stored your Datadog API key. 
      Example:
      ```text
      {{< region-param key="dd_site" code="true" >}} `datadog/dd_api_key`
      ```
   This bootstrap action installs the Datadog Agent and downloads the Java tracer on each node of the cluster.

### (ARM-only) Add the Java tracer
If you are using ARM, you must also add the Datadog Java tracer in your Spark default settings.

TK - In **Edit software settings**, copy and paste the following configuration:

   ```js
   [{
       "Classification": "spark-defaults",
       "Properties": {
       "spark.driver.defaultJavaOptions": "-javaagent:/var/tmp/jars/dd-java-agent.jar -Ddd.integration.spark.enabled=true -Ddd.integrations.enabled=false"
       }
   }]
   ```
   {{< img src="data_jobs/emr/edit_software_settings.png" alt="." style="width:100%;" >}}
Then, click **Create cluster**.

### Specify service and tags per Spark application
TK

## Validation

In Datadog, visit the [Data Jobs Monitoring][8] page to see a list of all your data processing jobs.

[1]: https://app.datadoghq.com/organization-settings/api-keys
[2]: https://console.aws.amazon.com/secretsmanager/
[3]: https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html
[4]: https://console.aws.amazon.com/emr
[5]: https://console.aws.amazon.com/iam/
[6]: /resources/sh/data_jobs/datadog_emr_job_monitoring_init_v2.sh
[7]: /getting_started/site/
[8]: https://app.datadoghq.com/apm/data-jobs