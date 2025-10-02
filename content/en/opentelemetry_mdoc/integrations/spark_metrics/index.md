---
title: Apache Spark Metrics
description: Datadog, the leading service for cloud-scale monitoring.
breadcrumbs: Docs > OpenTelemetry in Datadog > Integrations > Apache Spark Metrics
sourceUrl: https://docs.datadoghq.com/opentelemetry/integrations/spark_metrics/index.html
---

# Apache Spark Metrics

## Overview{% #overview %}

{% image
   source="https://datadog-docs.imgix.net/images/opentelemetry/collector_exporter/spark_metrics.530d0f8550d8342ab5cb0073967ff151.png?auto=format"
   alt="OpenTelemetry Apache Spark metrics in a Spark dashboard" /%}

The [Apache Spark receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver) allows for collection of Apache Spark metrics and access to the [Spark Overview](https://app.datadoghq.com/screen/integration/95/spark---overview) dashboard. Configure the receiver according to the specifications of the latest version of the `apachesparkreceiver`.

For more information, see the OpenTelemetry project documentation for the [Apache Spark receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver).

## Setup{% #setup %}

To collect Apache Spark metrics with OpenTelemetry for use with Datadog:

1. Configure the [Apache Spark receiver](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver) in your OpenTelemetry Collector configuration.
1. Ensure the OpenTelemetry Collector is [configured to export to Datadog](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/).

See the [Apache Spark receiver documentation](https://github.com/open-telemetry/opentelemetry-collector-contrib/tree/main/receiver/apachesparkreceiver) for detailed configuration options and requirements.

## Data collected{% #data-collected %}

| OTEL                                    | DATADOG                              | DESCRIPTION                                                            | FILTER                    | TRANSFORM |
| --------------------------------------- | ------------------------------------ | ---------------------------------------------------------------------- | ------------------------- | --------- |
| spark.driver.block_manager.disk.usage   | spark.driver.disk_used               | Disk space used by the BlockManager.                                   | × 1048576                 |
| spark.driver.block_manager.memory.usage | spark.driver.memory_used             | Memory usage for the driver's BlockManager.                            | × 1048576                 |
| spark.driver.dag_scheduler.stage.count  | spark.stage.count                    | Number of stages the DAGScheduler is either running or needs to run.   |
| spark.executor.disk.usage               | spark.executor.disk_used             | Disk space used by this executor for RDD storage.                      |
| spark.executor.disk.usage               | spark.rdd.disk_used                  | Disk space used by this executor for RDD storage.                      |
| spark.executor.memory.usage             | spark.executor.memory_used           | Storage memory used by this executor.                                  |
| spark.executor.memory.usage             | spark.rdd.memory_used                | Storage memory used by this executor.                                  |
| spark.job.stage.active                  | spark.job.num_active_stages          | Number of active stages in this job.                                   |
| spark.job.stage.result                  | spark.job.num_completed_stages       | Number of stages with a specific result in this job.                   | `job_result`: `completed` |
| spark.job.stage.result                  | spark.job.num_failed_stages          | Number of stages with a specific result in this job.                   | `job_result`: `failed`    |
| spark.job.stage.result                  | spark.job.num_skipped_stages         | Number of stages with a specific result in this job.                   | `job_result`: `skipped`   |
| spark.job.task.active                   | spark.job.num_tasks{status: running} | Number of active tasks in this job.                                    |
| spark.job.task.result                   | spark.job.num_skipped_tasks          | Number of tasks with a specific result in this job.                    | `job_result`: `skipped`   |
| spark.job.task.result                   | spark.job.num_failed_tasks           | Number of tasks with a specific result in this job.                    | `job_result`: `failed`    |
| spark.job.task.result                   | spark.job.num_completed_tasks        | Number of tasks with a specific result in this job.                    | `job_result`: `completed` |
| spark.stage.io.records                  | spark.stage.input_records            | Number of records written and read in this stage.                      | `direction`: `in`         |
| spark.stage.io.records                  | spark.stage.output_records           | Number of records written and read in this stage.                      | `direction`: `out`        |
| spark.stage.io.size                     | spark.stage.input_bytes              | Amount of data written and read at this stage.                         | `direction`: `in`         |
| spark.stage.io.size                     | spark.stage.output_bytes             | Amount of data written and read at this stage.                         | `direction`: `out`        |
| spark.stage.shuffle.io.read.size        | spark.stage.shuffle_read_bytes       | Amount of data read in shuffle operations in this stage.               |
| spark.stage.shuffle.io.records          | spark.stage.shuffle_read_records     | Number of records written or read in shuffle operations in this stage. | `direction`: `in`         |
| spark.stage.shuffle.io.records          | spark.stage.shuffle_write_records    | Number of records written or read in shuffle operations in this stage. | `direction`: `out`        |

See [OpenTelemetry Metrics Mapping](https://docs.datadoghq.com/opentelemetry/guide/metrics_mapping/) for more information.

## Further reading{% #further-reading %}

- [Setting Up the OpenTelemetry Collector](https://docs.datadoghq.com/opentelemetry/setup/collector_exporter/)
