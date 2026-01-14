---
title: "Enable Data Observability: Jobs Monitoring for Spark on Google Cloud Dataproc"
description: "Set up Data Observability: Jobs Monitoring for Apache Spark applications on Google Cloud Dataproc clusters with API key configuration and service tagging."
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Observability: Jobs Monitoring'
---

[Data Observability: Jobs Monitoring][9] gives visibility into the performance and reliability of Apache Spark applications on Google Cloud Dataproc.

## Requirements
This guide is for Dataproc clusters on Compute Engine. If you are using Dataproc on GKE, refer to the [Kubernetes Installation Guide][11] instead.

[Dataproc Release 2.0.x][10] or later is required. All of Debian, Rocky Linux, and Ubuntu Dataproc standard images are supported.


## Setup

Follow these steps to enable Data Observability: Jobs Monitoring for GCP Dataproc.

1. [Store your Datadog API key](#store-your-datadog-api-key-in-google-cloud-secret-manager-recommended) in GCP Secret Manager (recommended).
1. [Create and configure your Dataproc cluster](#create-and-configure-your-dataproc-cluster).
1. [Specify service tagging per Spark application](#specify-service-tagging-per-spark-application).

### Store your Datadog API key in Google Cloud Secret Manager (recommended)
1. Take note of your [Datadog API key][1].
1. In [GCP Secret Manager][2], choose **Create secret**.
   - Under **Name**, enter a **Secret name**. You can use `dd_api_key`.
   - Under **Secret value**, paste your Datadog API key in the **Secret value** text box.
      {{< img src="data_jobs/dataproc/key_value.png" alt="A section of the secret creation page titled 'Secret details'. On the top, a name field containing 'dd_api_key'. On the bottom, a text box to paste your own API key." style="width:80%;" >}}
   - Click **Create Secret**.
1. Optionally, under **Rotation**, you can turn on [automatic rotation][3].
1. In [GCP Secret Manager][2], open the secret you created. Take note of the Resource ID, which is in the format "projects/<PROJECT_NAME>/secrets/<SECRET_NAME>".
1. Make sure the service account used by your Dataproc cluster has permission to read the secret. By default, this is the `Compute Engine default service account`. To grant access, copy the associated service account Principal, and click **Grant Access** on the **Permissions** tab of the secret's page. Assign the `secretmanager.secretAccessor` role, or any other one that has `secretmanager.versions.access` permission. See the [IAM roles][12] documentation for a full description of available roles.

### Create and configure your Dataproc cluster

When you create a new **Dataproc Cluster on Compute Engine** in the [Google Cloud Console][4], add an initialization action on the **Customize cluster** page:

1. Save the following script to a GCS bucket that your Dataproc cluster can read. Take note of the path to this script.

   ```shell
   #!/bin/bash

   # Set required parameter DD_SITE
   export DD_SITE={{< region-param key="dd_site" code="true" >}}

   # Set required parameter DD_API_KEY with Datadog API key.
   # The commands below assumes the API key is stored in GCP Secret Manager, with the secret name as dd_api_key and the project <PROJECT_NAME>.
   # IMPORTANT: Modify if you choose to manage and retrieve your secret differently.
   # Change the project name, which you can find on the secrets page. The resource ID is in the format "projects/<PROJECT_NAME>/secrets/<SECRET_NAME>".
   PROJECT_NAME=<PROJECT_NAME>
   gcloud config set project $PROJECT_NAME
   SECRET_NAME=dd_api_key
   export DD_API_KEY=$(gcloud secrets versions access latest --secret $SECRET_NAME)

   # Download and run the latest init script
   curl -L https://install.datadoghq.com/scripts/install-dataproc.sh > djm-install-script; bash djm-install-script || true
   ```

   The script above sets the required parameters, and downloads and runs the latest init script for Data Observability: Jobs Monitoring in Dataproc. If you want to pin your script to a specific version, you can replace the filename in the URL with `install-dataproc-0.13.5.sh` to use version `0.13.5`, for example. The source code used to generate this script, and the changes between script versions, can be found on the [Datadog Agent repository][13].

   Optionally, the script can be configured by adding the following environment variable:

| Variable                 | Description                                                                                                                                                      |
|--------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| DD_TAGS                  | Add tags to Dataproc cluster and Spark performance metrics. Comma or space separated key:value pairs. Follow [Datadog tag conventions][15]. Example: `env:staging,team:data_engineering` |
| DD_ENV                   | Set the `env` environment tag on metrics, traces, and logs from this cluster.

[15]: /getting_started/tagging/

1. On the **Customize cluster** page, locate the **Initialization Actions** section. Enter the path where you saved the script from the previous step.

    When your cluster is created, this initialization action installs the Datadog Agent and downloads the Java tracer on each node of the cluster.

1. **Optional**: Enable logs collection for your cluster by following the Dataproc integration [Log collection setup][14] steps. This correlates application logs to Spark job run traces.


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

In Datadog, view the [Data Observability: Jobs Monitoring][8] page to see a list of all your data processing jobs.

## Troubleshooting

{{% djm-install-troubleshooting %}}

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
[10]: https://cloud.google.com/dataproc/docs/concepts/versioning/overview
[11]: https://docs.datadoghq.com/data_jobs/kubernetes/
[12]: https://cloud.google.com/secret-manager/docs/access-control
[13]: https://github.com/DataDog/datadog-agent/blob/main/pkg/fleet/installer/setup/djm/dataproc.go
[14]: /integrations/google_cloud_dataproc/#log-collection
