---
title: Enable Data Jobs Monitoring for Spark on Dataproc - Google Cloud
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

[Data Jobs Monitoring][9] gives visibility into the performance and reliability of Apache Spark applications on Amazon EMR.

## Requirements

TODO -> Do we need a specific version of GCP Dataproc ?

## Setup

Follow these steps to enable Data Jobs Monitoring for GCP Dataproc.

1. [Store your Datadog API key](#store-your-datadog-api-key-in-google-cloud-secret-manager-recommended) in GCP Secret Manager (Recommended).
1. [Create and configure your Dataproc cluster](#create-and-configure-your-dataproc-cluster).
1. [Specify service tagging per Spark application](#specify-service-tagging-per-spark-application).

### Store your Datadog API key in Google Cloud Secret Manager (Recommended)
1. Take note of your [Datadog API key][1].
1. In [GCP Secret Manager][2], choose **Create secret**.
   - Under **Name**, enter a **Secret name**. You can use `datadog_dd_api_key`.
   - Under **Secret value**, paste your Datadog API key in the **Secret value** text box.
      {{< img src="data_jobs/dataproc/key_value.png" alt="GCP Secret Manager, Create secret. A section titled 'Secret details'. On the top, a text box containing 'datatdog_dd_api_key'. On the bottom, a text box to paste your own API key." style="width:80%;" >}}
   - Then, click **Create Secret**.
1. Under **Rotation** page, you can optionally turn on [automatic rotation][3].
1. In [GCP Secret Manager][2], open the secret you created. Take note of the Resource ID, which is in the format "projects/<PROJECT_NAME>/secrets/<SECRET_NAME>".

### Create and configure your Dataproc cluster

When you create a new **Dataproc Cluster on Compute Engine** in the [Google Cloud Console][4], add an initialization action on the **Customize cluster** page:

1. Save the following script to a GCS bucket that your Dataproc cluster can read. Take note of the path to this script.

   ```shell
   #!/bin/bash

   # Set required parameter DD_SITE
   DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Set required parameter DD_API_KEY with Datadog API key.
   # The commands below assumes the API key is stored in GCP Secret Manager, with the secret name as datadog_dd_api_key and the project <PROJECT_NAME>.
   # IMPORTANT: Modify if you choose to manage and retrieve your secret differently.
   # Change the project name, which you can find on the secrets page. The resource ID is in the format "projects/<PROJECT_NAME>/secrets/<SECRET_NAME>".
   gcloud config set project $PROJECT_NAME
   SECRET_NAME=datadog_dd_api_key
   DD_API_KEY=$(gcloud secrets versions access latest --secret $SECRET_NAME)

   # Optional parameters
   # Uncomment the following line to allow adding init script logs when reporting a failure back to Datadog. A failure is reported when the init script fails to start the Datadog Agent successfully.
   # export DD_DJM_ADD_LOGS_TO_FAILURE_REPORT=true

   # Download and run the latest init script
   DD_SITE=$DD_SITE DD_API_KEY=$DD_API_KEY bash -c "$(curl -L https://dd-data-jobs-monitoring-setup.s3.amazonaws.com/scripts/dataproc/dataproc_init_latest.sh) || true

   ```

   The script above sets the required parameters, and downloads and runs the latest init script for Data Jobs Monitoring in Dataproc. If you want to pin your script to a specific version, you can replace the file name in the URL with `dataproc_init_<version_tag>.sh`, such as `dataproc_init_1.5.0.sh` to use the specific version you want.

1. On the **Customize cluster** page, find the **Initialization actions** section. Click **Browse** to bring up the **Select object** dialog.
   {{< img src="data_jobs/dataproc/browse-buckets.png" alt="Google Cloud, Dataproc, Create a Dataproc cluster on Compute Engine, Add Initialization Action dialog. Text fields for browsing buckets" style="width:80%;" >}}
   - Use the Search function to find the bucket you chose at the previous step
   - Click select once you have found the init script

When your cluster is created, this initialization action installs the Datadog Agent and downloads the Java tracer on each node of the cluster.

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
[2]: https://console.cloud.google.com/security/secret-manager
[3]: https://cloud.google.com/secret-manager/docs/secret-rotation?_gl=1*144zyx0*_ga*MTk0ODY1OTU1OS4xNzI0NzA5NDM4*_ga_WH2QY8WWF5*MTcyNTk1MDU4Mi4yMy4xLjE3MjU5Nzk3NzUuNDEuMC4w
[4]: https://console.cloud.google.com/dataproc/
[5]: https://console.cloud.google.com/iam-admin/iam
[7]: /getting_started/site/
[8]: https://app.datadoghq.com/data-jobs/
[9]: /data_jobs
