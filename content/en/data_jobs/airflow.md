---
title: Enable Data Jobs Monitoring for Apache Airflow
is_beta: true
private: true
aliases:
    - /data_jobs/airflow/
    - data_jobs/airflow/
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

{{< callout url="<**https://www.datadoghq.com/private-beta/monitoring-for-data-and-data-pipelines/**>" d_target="#signupModal" btn_hidden="false" header="Request access to the Preview!" >}}
Data Jobs Monitoring for Apache Airflow is in Preview. To request access, complete the form.
{{< /callout >}}

[Data Jobs Monitoring][1] provides visibility into the performance and reliability of workflows run by Apache Airflow DAGs.

{{< tabs >}}
{{% tab "Kubernetes" %}}
## Requirements

* [Apache Airflow 2.8.3][1] or later
* [apache-airflow-providers-openlineage 1.11.0][2] or later

## Setup

Data Jobs Monitoring supports Apache Airflow deployments with [apache-airflow-providers-openlineage][2] installed.

To get started, follow the instructions below.

1. Install `openlineage` provider by adding the following into your `requirements.txt` file or wherever your Airflow depedencies are managed:
   
   ```text
   apache-airflow-providers-openlineage>=1.11.0
   ```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables and make them available to pods where you run Airflow schedulers and Airflow workers:
   
   ```shell
   OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   OPENLINEAGE_API_KEY=<DD_API_KEY>
   ```

   * install and configure `openlineage` provider for **both Airflow schedulers and Airflow workers**.
   * replace `<DD_DATA_OBSERVABILITY_INTAKE>` with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * replace `<DD_API_KEY>` with your valid [Datadog API key][4].
   
   **Optionally:**
   * set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for your Airflow instance to allow jobs from different Airflow instances logically separated.
   * set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` for OpenLineage client and its child modules. This can be useful in troubleshooting during the configuration of `openlineage` provider. 

   Check official documentation [configuration-openlineage][3] for other supported configurations of the `openlineage` provider.

3. Trigger an update to your Airflow pods and wait for them to finish.

[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
{{% /tab %}}

{{% tab "Amazon MWAA" %}}
## Requirements

* [Apache Airflow 2.8.3][1] or later
* [apache-airflow-providers-openlineage 1.11.0][2] or later

## Setup

Data Jobs Monitoring is supported for Apache Airflow deployment with [apache-airflow-providers-openlineage][2] installed.

To get started, follow the instructions below.

1. Install `openlineage` provider by adding the following into your `requirements.txt` file:
   
   ```text
   apache-airflow-providers-openlineage>=1.11.0
   ```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables in your [Amazon MWAA start script][3]:
   
   ```shell
   #!/bin/sh
   
   export OPENLINEAGE_URL=<DD_DATA_OBSERVABILITY_INTAKE>
   export OPENLINEAGE_API_KEY=<DD_API_KEY>
   ```

   **Important:**
   * replace `<DD_DATA_OBSERVABILITY_INTAKE>` fully with `https://data-obs-intake.`{{< region-param key="dd_site" code="true" >}}.
   * Replace `<DD_API_KEY>` fully with your valid [Datadog API key][5].

   **Optional:**
   * Set `AIRFLOW__OPENLINEAGE__NAMESPACE` with a unique name for your Airflow instance to allow jobs from different Airflow instances logically separated.
   * Set `OPENLINEAGE_CLIENT_LOGGING` to `DEBUG` for OpenLineage client and its child modules to log at `DEBUG` logging level. This can be useful in troubleshooting during the configuration of `openlineage` provider. 

   Check official documentation [configuration-openlineage][4] for other supported configurations of `openlineage` provider.

3. Deploy your updated `requirements.txt` and [Amazon MWAA start script][3] to your Amazon S3 folder configured for your Amazon MWAA Environment.

4. Ensure your Execution role configured for your Amazon MWAA Environment has the right permissions to the `requirements.txt` and [Amazon MWAA start script][3]. This is required if you are managing your own Execution role and it's the first time you are adding those supporting files. See official guide [Amazon MWAA execution role][6] for details if needed.


[1]: https://github.com/apache/airflow/releases/tag/2.7.0
[2]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[3]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
[5]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[6]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html

{{% /tab %}}
{{< /tabs >}}

## Validation

In Datadog, view the [Data Jobs Monitoring][2] page to see a list of your Airflow job runs after the setup. 

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

3. Once you have re-deployed your Airflow environment with the updated [lazy_load_plugins config][3] and the updated DAG file, and your Airflow DAG as been re-run, go to [Data Jobs Monitoring][2] page. You can then find your latest Airflow job run and see a SpanLink in the Airflow Job Run trace to the trace of the launched Spark Application. This makes it possible to debug issues in Airflow or Spark all in once place.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: https://app.datadoghq.com/data-jobs/
[3]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[4]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[5]: https://airflow.apache.org/docs/apache-airflow-providers-apache-spark/stable/_api/airflow/providers/apache/spark/operators/spark_submit/index.html#airflow.providers.apache.spark.operators.spark_submit.SparkSubmitOperator