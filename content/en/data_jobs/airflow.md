---
title: Enable Data Jobs Monitoring for Apache Airflow
is_beta: true
private: true
further_reading:
    - link: 'https://www.datadoghq.com/blog/data-jobs-monitoring/'
      tag: 'blog'
      text: 'Troubleshoot and optimize data processing workloads with Data Jobs Monitoring'
    - link: 'https://www.datadoghq.com/blog/data-observability-monitoring'
      tag: 'blog'
      text: 'Observing the data lifecycle with Datadog'
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

{{< callout url="#" btn_hidden="true" header="Data Jobs Monitoring for Apache Airflow is in Preview" >}}
To try the preview for Airflow monitoring, follow the setup instructions below.
{{< /callout >}}

[Data Jobs Monitoring][1] provides visibility into the performance and reliability of workflows run by Apache Airflow DAGs.

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Requirements

* [Apache Airflow 2.5.0][1] or later
* [apache-airflow-providers-openlineage][2] or [openlineage-airflow][5] depending on your Airflow version

## Setup

To get started, follow the instructions below.

1. Install `openlineage` provider for **both Airflow schedulers and Airflow workers** by adding the following into your `requirements.txt` file or wherever your Airflow depedencies are managed:

    For **Airflow 2.7 or later**:

      ```text
      apache-airflow-providers-openlineage
      ```

    For **Airflow 2.5 & 2.6** :

      ```text
      openlineage-airflow
      ```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables and make them available to pods where you run Airflow schedulers and Airflow workers:

   ```shell
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```
   * Replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Replace `<DD_API_KEY>` with your valid [Datadog API key][4].
   * If you're using **Airflow v2.7 or v2.8**, also add these two environment variables along with the previous ones. This fixes an OpenLinage config issue fixed at `apache-airflow-providers-openlineage` v1.7, while Airflow v2.7 and v2.8 use previous versions.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Check official documentation [configuration-openlineage][3] for other supported configurations of the `openlineage` provider.

3. Trigger an update to your Airflow pods and wait for them to finish.

[1]: https://github.com/apache/airflow/releases/tag/2.5.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[5]: https://openlineage.io/docs/integrations/airflow/


## Validation

In Datadog, view the [Data Jobs Monitoring][2] page to see a list of your Airflow job runs after the setup.

## Troubleshooting

Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` along with the other environment variables set previously for OpenLineage client and its child modules. This can be useful in troubleshooting during the configuration of `openlineage` provider.

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
## Requirements

* [Apache Airflow 2.5.0][1] or later
* [apache-airflow-providers-openlineage][2] or [openlineage-airflow][8] depending on your Airflow version

## Setup

To get started, follow the instructions below.

1. Install `openlineage` provider by adding the following into your `requirements.txt` file:

    For **Airflow 2.7 or later**:

      ```text
      apache-airflow-providers-openlineage
      ```

    For **Airflow 2.5 & 2.6** :

      ```text
      openlineage-airflow
      ```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables in your [Amazon MWAA start script][3]:

   ```shell
   #!/bin/sh
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   export AIRFLOW__OPENLINEAGE__NAMESPACE=${AIRFLOW_ENV_NAME}
   ```

   * Replace `<DD_DATA_OBSERVABILITY_INTAKE>` fully with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Replace `<DD_API_KEY>` fully with your valid [Datadog API key][5].
   * If you're using **Airflow v2.7 or v2.8**, also add these two environment variables to the startup script. This fixes an OpenLinage config issue fixed at `apache-airflow-providers-openlineage` v1.7, while Airflow v2.7 and v2.8 use previous versions.
      ```shell
      #!/bin/sh
      # Required for Airflow v2.7 & v2.8 only
      export AIRFLOW__OPENLINEAGE__CONFIG_PATH=""
      export AIRFLOW__OPENLINEAGE__DISABLED_FOR_OPERATORS=""
      ```

   Check official documentation [configuration-openlineage][4] for other supported configurations of `openlineage` provider.

3. Deploy your updated `requirements.txt` and [Amazon MWAA startup script][3] to your Amazon S3 folder configured for your Amazon MWAA Environment.

[1]: https://github.com/apache/airflow/releases/tag/2.5.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[7]: https://app.datadoghq.com/data-jobs/
[8]: https://openlineage.io/docs/integrations/airflow/

## Validation

In Datadog, view the [Data Jobs Monitoring][7] page to see a list of your Airflow job runs after the setup.

## Troubleshooting

Ensure your Execution role configured for your Amazon MWAA Environment has the right permissions to the `requirements.txt` and [Amazon MWAA start script][3]. This is required if you are managing your own Execution role and it's the first time you are adding those supporting files. See official guide [Amazon MWAA execution role][6] for details if needed.

Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` in the [Amazon MWAA start script][3] for OpenLineage client and its child modules. This can be useful in troubleshooting during the configuration of `openlineage` provider.


{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-warning">
For Astronomer customers using Astro, <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro offers lineage features that rely on the Airflow OpenLineage provider</a>. Data Jobs Monitoring depends on the same OpenLineage provider and uses the <a href=https://openlineage.io/docs/client/python#composite>Composite</a> transport to add additional transport.
</div>

## Requirements

* [Astro Runtime 12.1.0+][1]
* [`apache-airflow-providers-openlineage` 1.11.0+][2]
* [`openlineage-python` 1.23.0+][8]

## Setup

1. Install the OpenLineage provider (`apache-airflow-providers-openlineage`) 1.11.0+ and [`openlineage-python`][8] 1.23.0+. Add the following to your `requirements.txt` file inside your [Astro project][4]:

   ```text
   apache-airflow-providers-openlineage>=1.11.0
   openlineage-python>=1.23.0
   ```

2. To set up the OpenLineage provider, define the following environment variables. You can configure these variables in your Astronomer deployment using either of the following methods:

    - [From the Astro UI][5]: Navigate to your deployment settings and add the environment variables directly.
    - [In the Dockerfile][11]: Define the environment variables in your `Dockerfile` to ensure they are included during the build process.

    ```shell
    OPENLINEAGE__TRANSPORT__TYPE=composite
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__TYPE=http
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__URL=<DD_DATA_OBSERVABILITY_INTAKE>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__TYPE=api_key
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__AUTH__API_KEY=<DD_API_KEY>
    OPENLINEAGE__TRANSPORT__TRANSPORTS__DATADOG__COMPRESSION=gzip
    ```

    * replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
    * replace `<DD_API_KEY>` with your valid [Datadog API key][7].

    **Optional:**
    * Set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for your Airflow deployment. This allows Datadog to logically separate this deployment's jobs from those of other Airflow deployments.
    * Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` for the OpenLineage client and its child modules to log at a `DEBUG` logging level. This can be useful for troubleshooting during the configuration of an OpenLineage provider.

    See the [Astronomer official guide][10] for managing environment variables for a deployment. See Apache Airflow's [OpenLineage Configuration Reference][6] for other supported configurations of the OpenLineage provider.

3. Trigger a update to your deployment and wait for it to finish.

[1]: https://www.astronomer.io/docs/astro/runtime-release-notes#astro-runtime-1210
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[4]: https://www.astronomer.io/docs/astro/cli/develop-project
[5]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[6]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[7]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[8]: https://github.com/OpenLineage/OpenLineage/releases/tag/1.23.0
[9]: https://www.astronomer.io/docs/astro/runtime-provider-reference#astro-runtime-1210
[10]: https://www.astronomer.io/docs/astro/environment-variables/#management-options
[11]: https://www.astronomer.io/docs/astro/manage-env-vars#using-your-dockerfile

## Validation

In Datadog, view the [Data Jobs Monitoring][2] page to see a list of your Airflow job runs after the setup.


## Troubleshooting
Check that the OpenLineage environment variables are correctly set on the Astronomer deployment.

**Note**: Using the `.env` file to add the environment variables does not work because the variables are only applied to the local Airflow environment.
{{% /tab %}}

{{< /tabs >}}

## Advanced Configuration

### Link your Spark jobs with Airflow task
You can troubleshoot Airflow tasks that run Spark jobs more efficiently by connecting the Spark job run info and telemetry with the respective Airflow task.

**Prerequisites**: your Spark jobs are currently monitored through [Data Jobs Monitoring][2] and are submitted through [SparkSubmitOperator][5]s from your Airflow jobs.

To see the link between Airflow task and the the Spark application it submitted, follow these steps:

1. Configure Airflow to turn off lazy loading of Airflow plugins by setting [lazy_load_plugins config][3] to `False` in your `airflow.cfg` or exporting the following environment variable where your Airflow schedulers and Airflow workers run:

   ```shell
   export AIRFLOW__CORE__LAZY_LOAD_PLUGINS='False'
   ```

2. Update your Airflow job's DAG file by adding the following Spark configurations to your [SparkSubmitOperator][5] where you submit your Spark Application:

   ```python
     SparkSubmitOperator(
       conf={
         "spark.openlineage.parentJobNamespace": "{{ macros.OpenLineageProviderPlugin.lineage_job_namespace() }}",
         "spark.openlineage.parentJobName": "{{ macros.OpenLineageProviderPlugin.lineage_job_name(task_instance) }}",
         "spark.openlineage.parentRunId": "{{ macros.OpenLineageProviderPlugin.lineage_run_id(task_instance) }}",
       },
     )
   ```

   See [Lineage job & run macros][4] for the definitions of referenced macros.

3. Once you have re-deployed your Airflow environment with the updated [lazy_load_plugins config][3] and the updated DAG file, and your Airflow DAG as been re-run, go to [Data Jobs Monitoring][2] page. You can then find your latest Airflow job run and see a SpanLink in the Airflow Job Run trace to the trace of the launched Spark Application. This makes it possible to debug issues in Airflow or Spark all in one place.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator
