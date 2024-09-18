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

## Requirements

[Apache Airflow 2.8.3][2] or later is required.
[apache-airflow-providers-openlineage 1.11.0][3] or later is required.

## Setup

Data Jobs Monitoring is supported for Apache Airflow deployment with [apache-airflow-providers-openlineage][3] installed.

To get started, follow the instructions below.

1. Install `openlineage` provider by adding the following into your `requirements.txt` file or wherever your Airflow depedencies is managed:
```text
apache-airflow-providers-openlineage=>1.11.0
```

2. Configure `openlineage` provider. The simplest option is to set the following environment variables:
```shell
OPENLINEAGE_URL=https://data-obs-intake.{{< region-param key="dd_site" code="true" >}}
OPENLINEAGE_ENDPOINT=api/v1/lineage
OPENLINEAGE_API_KEY=<YOUR DATADOG API KEY>
```

**Important:**
* install and configure `openlineage` provider for both Airflow schedulers and Airflow workers.
* replace `<YOUR DATADOG API KEY>` fully with your valid [Datadog API key][4].

To see setup instructions specific to different Apache Airflow deployments, select your platform and follow the installation instructions:

{{< partial name="data_jobs/setup-platforms-airflow.html" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /data_jobs
[2]: https://github.com/apache/airflow/releases/tag/2.8.3
[3]: https://airflow.apache.org/docs/apache-airflow-providers-openlineage/stable/index.html
[4]: https://docs.datadoghq.com/account_management/api-app-keys/#api-keys