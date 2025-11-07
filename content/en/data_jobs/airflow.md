---
title: Enable Data Jobs Monitoring for Apache Airflow
description: "Monitor Apache Airflow DAG workflows with Data Jobs Monitoring using OpenLineage provider across Kubernetes, Amazon MWAA, and other platforms."
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
### Requirements

* [Apache Airflow 2.5.0][1] or later
* [apache-airflow-providers-openlineage][2] or [openlineage-airflow][5] depending on your Airflow version

### Setup

To get started, follow the instructions below.

1. Install `openlineage` provider for **both Airflow schedulers and Airflow workers** by adding the following into your `requirements.txt` file or wherever your Airflow dependencies are managed:

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
   # OPENLINEAGE_NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
   export OPENLINEAGE_NAMESPACE=${AIRFLOW_ENV_NAME}
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

4. Optionally, set up log collection for correlating task logs to DAG run executions in Data Jobs Monitoring. Correlation requires the logs directory to follow the [default log filename format][6]. 

   The `PATH_TO_AIRFLOW_LOGS` value is `$AIRFLOW_HOME/logs` in standard deployments, but may differ if customized. Add the following annotation to your pod:
   ```yaml
   ad.datadoghq.com/base.logs: '[{"type": "file", "path": "PATH_TO_AIRFLOW_LOGS/*/*/*/*.log", "source": "airflow"}]'
   ```

   Adding `"source": "airflow"` enables the extraction of the correlation-required attributes by the [Airflow integration][8] logs pipeline.
   
   These file paths are relative to the Agent container. Mount the directory containing the log file into both the application and Agent containers so the Agent can access it. For details, see [Collect logs from a container local log file][10].

   **Note**: Log collection requires the Datadog agent to already be installed on your Kubernetes cluster. If you haven't installed it yet, see the [Kubernetes installation documentation][9].

   For more methods to set up log collection on Kubernetes, see the [Kubernetes and Integrations configuration section][7].
   

[1]: https://github.com/apache/airflow/releases/tag/2.5.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[5]: https://openlineage.io/docs/integrations/airflow/
[6]: https://airflow.apache.org/docs/apache-airflow/2.9.3/configurations-ref.html#log-filename-template
[7]: https://docs.datadoghq.com/containers/kubernetes/integrations/?tab=annotations#configuration
[8]: https://docs.datadoghq.com/integrations/airflow/?tab=containerized
[9]: https://docs.datadoghq.com/containers/kubernetes/installation/?tab=datadogoperator#installation
[10]: https://docs.datadoghq.com/containers/kubernetes/log/?tab=datadogoperator#from-a-container-local-log-file


### Validation

In Datadog, view the [Data Jobs Monitoring][2] page to see a list of your Airflow job runs after the setup.

### Troubleshooting

Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` along with the other environment variables set previously for OpenLineage client and its child modules. This can be useful in troubleshooting during the configuration of `openlineage` provider.

{{% /tab %}}

{{% tab "Amazon MWAA" %}}
### Requirements

* [Apache Airflow 2.5.0][1] or later
* [apache-airflow-providers-openlineage][2] or [openlineage-airflow][8] depending on your Airflow version

### Setup

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
   # AIRFLOW__OPENLINEAGE__NAMESPACE sets the 'env' tag value in Datadog. You can hardcode this to a different value
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

4. Optionally, set up Log Collection for correlating task logs to DAG run executions in DJM:
   1. Configure Amazon MWAA to [send logs to CloudWatch][9].
   2. [Send the logs to Datadog][10].

[1]: https://github.com/apache/airflow/releases/tag/2.5.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[7]: https://app.datadoghq.com/data-jobs/
[8]: https://openlineage.io/docs/integrations/airflow/
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/monitoring-airflow.html#monitoring-airflow-enable
[10]: /integrations/amazon_web_services/?tab=roledelegation#log-collection

### Validation

In Datadog, view the [Data Jobs Monitoring][7] page to see a list of your Airflow job runs after the setup.

### Troubleshooting

Ensure your Execution role configured for your Amazon MWAA Environment has the right permissions to the `requirements.txt` and [Amazon MWAA start script][3]. This is required if you are managing your own Execution role and it's the first time you are adding those supporting files. See official guide [Amazon MWAA execution role][6] for details if needed.

Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` in the [Amazon MWAA start script][3] for OpenLineage client and its child modules. This can be useful in troubleshooting during the configuration of `openlineage` provider.


{{% /tab %}}

{{% tab "Astronomer" %}}

<div class="alert alert-danger">
For Astronomer customers using Astro, <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>Astro offers lineage features that rely on the Airflow OpenLineage provider</a>. Data Jobs Monitoring depends on the same OpenLineage provider and uses the <a href=https://openlineage.io/docs/client/python#composite>Composite</a> transport to add additional transport.
</div>

### Requirements

* [Astro Runtime 12.1.0+][1]
* [`apache-airflow-providers-openlineage` 1.11.0+][2]
* [`openlineage-python` 1.23.0+][8]

### Setup

1. To set up the OpenLineage provider, define the following environment variables. You can configure these variables in your Astronomer deployment using either of the following methods:

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
    * Set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for the `env` tag on all DAGs in the Airflow deployment. This allows Datadog to logically separate this deployment's jobs from those of other Airflow deployments.
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

### Validation

In Datadog, view the [Data Jobs Monitoring][2] page to see a list of your Airflow job runs after the setup.


### Troubleshooting
Check that the OpenLineage environment variables are correctly set on the Astronomer deployment.

**Note**: Using the `.env` file to add the environment variables does not work because the variables are only applied to the local Airflow environment.
{{% /tab %}}
{{% tab "Google Cloud Composer" %}}
<div class="alert alert-danger">
Data Jobs Monitoring for Airflow is not yet compatible with <a href=https://cloud.google.com/composer/docs/composer-2/lineage-integration>Dataplex</a> data lineage. Setting up OpenLineage for Data Jobs Monitoring overrides your existing Dataplex transport configuration.
</div>

### Requirements

* [Cloud Composer 2][1] or later
* [apache-airflow-providers-openlineage][2]

### Setup

To get started, follow the instructions below.


1. In the Advanced Configuration tab, under **Airflow configuration override**, click **Add Airflow configuration override** and configure these settings:

   - In Section 1, enter `openlineage`.
   - In Key 1, enter `disabled`.
   - In Value 1, enter `False` to make sure OpenLineage is activated.

   - In Section 2, enter `openlineage`.
   - In Key 2, enter `transport`.
   - In Value 2, enter the following:

     ```text
     {
      "type": "http", 
      "url": "<DD_DATA_OBSERVABILITY_INTAKE>", 
      "auth": {
         "type": "api_key", 
         "api_key": "<DD_API_KEY>"
      }
     }
     ```

   * Replace `<DD_DATA_OBSERVABILITY_INTAKE>` fully with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Replace `<DD_API_KEY>` fully with your valid [Datadog API key][5].
   

   Check official [Airflow][4] and [Composer][3] documentation pages for other supported configurations of the `openlineage` provider in Google Cloud Composer.

2. After starting the Composer environment, install the `openlineage` provider by adding the following package in the Pypi packages tab of your environment page:
      ```text
      apache-airflow-providers-openlineage
      ```


[1]: https://cloud.google.com/composer/docs/composer-versioning-overview
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://cloud.google.com/composer/docs/airflow-configurations
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[7]: https://app.datadoghq.com/data-jobs/

### Validation

In Datadog, view the [Data Jobs Monitoring][7] page to see a list of your Airflow job runs after the setup.

### Troubleshooting

Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` in the Environment variables tab of the Composer page for OpenLineage client and its child modules. This can be useful in troubleshooting as you configure the `openlineage` provider.

{{% /tab %}}
{{< /tabs >}}

## Advanced Configuration

### Link your dbt jobs with Airflow tasks

You can monitor your dbt jobs that are running in Airflow by connecting the dbt telemetry with respective Airflow tasks, using [OpenLineage dbt integration][6].

To see the link between Airflow tasks and dbt jobs, follow those steps:

1. Install `openlineage-dbt`. Reference [Using dbt with Amazon MWAA][7] to setup dbt in the virtual environment.

```shell
pip3 install openlineage-dbt>=1.36.0
```

2. Change the dbt invocation to `dbt-ol` (OpenLineage wrapper for dbt).

Also, add the --consume-structured-logs flag to view dbt jobs while the command is still running.

```bash
dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR
```

3. In your DAG file, add the OPENLINEAGE_PARENT_ID variable to the environment of the Airflow task that runs the dbt process:

```python
dbt_run = BashOperator(
    task_id="dbt_run",
    dag=dag,
    bash_command=f"dbt-ol run --consume-structured-logs --project-dir=$TEMP_DIR --profiles-dir=$PROFILES_DIR",
    append_env=True,
    env={
        "OPENLINEAGE_PARENT_ID": "{{ macros.OpenLineageProviderPlugin.lineage_parent_id(task_instance) }}",
    },
)
```

### Link your Spark jobs with Airflow tasks

OpenLineage integration can automatically inject Airflow's parent job information (namespace, job name, run id) into Spark application properties. This creates a parent-child relationship between Airflow tasks and Spark jobs, enabling you to troubleshoot both systems in one place.

**Note**: This feature requires `apache-airflow-providers-openlineage` version 2.1.0 or later (supported from Airflow 2.9+).

1. **Verify operator compatibility**: Check the [Apache Airflow OpenLineage documentation][8] to confirm your Spark operators are supported. This feature only works with specific operators like SparkSubmitOperator and LivyOperator.

2. Make sure your Spark jobs are actively monitored through [Data Jobs Monitoring][2].

3. Enable automatic parent job information injection by setting the following configuration:

```shell
AIRFLOW__OPENLINEAGE__SPARK_INJECT_PARENT_JOB_INFO=true
```

This automatically injects parent job properties for all supported Spark Operators. To disable for specific operators, set `openlineage_inject_parent_job_info=False` on the operator.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator
[6]: https://openlineage.io/docs/integrations/dbt/
[7]: https://docs.aws.amazon.com/mwaa/latest/userguide/samples-dbt.html
[8]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/guides/user.html#passing-parent-job-information-to-spark-jobs
