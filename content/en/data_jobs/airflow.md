---
title: Enable Data Jobs Monitoring for Apache Airflow
is_beta: true
private: true
aliases:
    - /data_jobs/airflow/
    - data_jobs/airflow/
further_reading:
    - link: '/data_jobs'
      tag: 'Documentation'
      text: 'Data Jobs Monitoring'
---

[Data Jobs Monitoring][1] gives visibility into the performance and reliability of workflows run by Apache Airflow DAGs.

{{< tabs >}}
{{% tab "Astronomer" %}}

<div class="alert alert-warning">
For Astronomer customers using Astro, the following setup may have lineage feature rely on the Airflow Openlineage installed in Astro Runtimes, the following setup could affect those features. see <a href=https://www.astronomer.io/docs/learn/airflow-openlineage#lineage-on-astro>this</a> for context.
</div>

## Requirements

* [Apache Airflow 2.7.0][2] or later is required.
* [apache-airflow-providers-openlineage][3] 1.7.0 or later is required.

## Setup

Data Jobs Monitoring is supported for Apache Airflow deployment with [apache-airflow-providers-openlineage][3] installed.

To get started, follow the instructions below.

1. Ariflow provider `openlineage` is already installed in [Astro Runtimes][6]. Customize the provider version by adding the following to your `requirements.txt` file into your [Astro project][13].
```text
apache-airflow-providers-openlineage==<AIRLOW_OPENLINEAGE_PROVIDER_VERSION>
```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables [using the Astro UI][7]:
```shell
OPENLINEAGE_URL=https://data-obs-intake.{{< region-param key="dd_site" code="true" >}}
OPENLINEAGE_ENDPOINT=api/v1/lineage
OPENLINEAGE_API_KEY=<YOUR DATADOG API KEY>
```

See [Astronomer official guide][5] for managing environment variables for a Deployment, and check official documentation [configuration-openlineage][14] for other supported configurations of `openlineage` provider.

3. Trigger a update to your Deployment and wait for it to finish.

**Important:**
* replace `<YOUR DATADOG API KEY>` fully with your valid [Datadog API key][4].

[1]: /data_jobs
[2]: https://github.com/apache/airflow/releases/tag/2.7.0
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[5]: https://www.astronomer.io/docs/astro/manage-env-vars
[6]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[7]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[8]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[10]: https://app.datadoghq.com/data-jobs/
[11]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[12]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[13]: https://www.astronomer.io/docs/astro/cli/develop-project
[14]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
{{% /tab %}}

{{% tab "Kubernetes" %}}
## Requirements

* [Apache Airflow 2.8.3][2] or later is required.
* [apache-airflow-providers-openlineage 1.11.0][3] or later is required.

## Setup

Data Jobs Monitoring is supported for Apache Airflow deployment with [apache-airflow-providers-openlineage][3] installed.

To get started, follow the instructions below.

1. Install `openlineage` provider by adding the following into your `requirements.txt` file or wherever your Airflow depedencies is managed:
```text
apache-airflow-providers-openlineage>=1.11.0
```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables and make them available to pods where you run Airflow schedulers and Airflow workers:
```shell
OPENLINEAGE_URL=https://data-obs-intake.{{< region-param key="dd_site" code="true" >}}
OPENLINEAGE_ENDPOINT=api/v1/lineage
OPENLINEAGE_API_KEY=<YOUR DATADOG API KEY>
```

Check official documentation [configuration-openlineage][14] for other supported configurations of `openlineage` provider.

3. Trigger a update to your Airflow pods and wait for them to finish.

**Important:**
* install and configure `openlineage` provider for both Airflow schedulers and Airflow workers.
* replace `<YOUR DATADOG API KEY>` fully with your valid [Datadog API key][4].

[1]: /data_jobs
[2]: https://github.com/apache/airflow/releases/tag/2.7.0
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[5]: https://www.astronomer.io/docs/astro/manage-env-vars
[6]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[7]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[8]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[10]: https://app.datadoghq.com/data-jobs/
[11]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[12]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[13]: https://www.astronomer.io/docs/astro/cli/develop-project
[14]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
{{% /tab %}}

{{% tab "Amazon MWAA" %}}
## Requirements

* [Apache Airflow 2.8.3][2] or later is required.
* [apache-airflow-providers-openlineage 1.11.0][3] or later is required.

## Setup

Data Jobs Monitoring is supported for Apache Airflow deployment with [apache-airflow-providers-openlineage][3] installed.

To get started, follow the instructions below.

1. Install `openlineage` provider by adding the following into your `requirements.txt` file:
```text
apache-airflow-providers-openlineage>=1.11.0
```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables in your [Amazon MWAA start script][8]:
```shell
#!/bin/sh

export OPENLINEAGE_URL=https://data-obs-intake.{{< region-param key="dd_site" code="true" >}}
export OPENLINEAGE_ENDPOINT=api/v1/lineage
export OPENLINEAGE_API_KEY=<YOUR DATADOG API KEY>
```

check official documentation [configuration-openlineage][14] for other supported configurations of `openlineage` provider.

3. Deploy your updated `requirements.txt` and [Amazon MWAA start script][8] to your Amazon S3 folder you configured for your Amazon MWAA Environment.

4. Ensure your Execution role configured for your Amazon MWAA Environment has the right permissions to the `requirements.txt` and [Amazon MWAA start script][8]. This is required if you are managing your own Execution role and it's the first time you are adding those supporting files. See official guide [Amazon MWAA execution role][9] for details if needed. 

**Important:**
* replace `<YOUR DATADOG API KEY>` fully with your valid [Datadog API key][4].

[1]: /data_jobs
[2]: https://github.com/apache/airflow/releases/tag/2.7.0
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[5]: https://www.astronomer.io/docs/astro/manage-env-vars
[6]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[7]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[8]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[10]: https://app.datadoghq.com/data-jobs/
[11]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[12]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[13]: https://www.astronomer.io/docs/astro/cli/develop-project
[14]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage
{{% /tab %}}
{{< /tabs >}}

## Validation

In Datadog, view the [Data Jobs Monitoring][10] page to see a list of all your Airflow jobs.

## Advanced Configuration

### Link your Spark jobs with Airflow task
To allow your Airflow job linked to the the Spark application it submitted, following the following steps:

1. Configure your Airflow to turn off lazily loading Airflow plugins by setting [lazy_load_plugins][11] to `False` in your `airflow.cfg` or exporting the following environment variable where your Airflow schedulers and Airflow workers run:
```shell
export AIRFLOW__CORE__LAZY_LOAD_PLUGINS='False' 
```
2. Update your Airflow job's DAG file by adding the following Spark configurations to your `SparkSubmitOperator` where you submit your Spark Application:
```python
    SparkSubmitOperator(
        conf={
            "spark.openlineage.parentJobNamespace": "{{ macros.OpenLineageProviderPlugin.lineage_job_namespace() }}",
            "spark.openlineage.parentJobName": "{{ macros.OpenLineageProviderPlugin.lineage_job_name(task_instance) }}",
            "spark.openlineage.parentRunId": "{{ macros.OpenLineageProviderPlugin.lineage_run_id(task_instance) }}",
        },
    )
```
See [Lineage job & run macros][12] for definition of referenced macros.

3. Once you have your Airflow environment redeployed with the updated [lazy_load_plugins][11] setting and the updated DAG file, in the next run of your Airflow DAG, go to [Data Jobs Monitoring][10] page, find your latest Airflow job run, see a SpanLink is now linked from the Airflow Job Run trace to the trace of the launched Spark Application, and vice versa.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: https://github.com/apache/airflow/releases/tag/2.7.0
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys
[5]: https://www.astronomer.io/docs/astro/manage-env-vars
[6]: https://www.astronomer.io/docs/astro/runtime-provider-reference
[7]: https://www.astronomer.io/docs/astro/manage-env-vars#using-the-astro-ui
[8]: https://docs.aws.amazon.com/mwaa/latest/userguide/using-startup-script.html
[9]: https://docs.aws.amazon.com/mwaa/latest/userguide/mwaa-create-role.html
[10]: https://app.datadoghq.com/data-jobs/
[11]: https://airflow.apache.org/docs/apache-airflow/stable/configurations-ref.html#lazy-load-plugins
[12]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/macros.html#lineage-job-run-macros
[13]: https://www.astronomer.io/docs/astro/cli/develop-project
[14]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/configurations-ref.html#configuration-openlineage