---
title: Data Jobs Monitoring
kind: documentation
further_reading:
    - link: '/data_streams'
      tag: 'Documentation'
      text: 'Data Streams Monitoring'

---

{{< callout url="https://forms.gle/PZUoEgtBsH6qM62MA" >}}
Data Jobs Monitoring is in private beta. Fill out this form to join the wait list.
{{< /callout >}} 

{{< img src="data_jobs/overview.png" alt="Datadog Data Jobs Monitoring" style="width:100%;" >}}

Data Jobs Monitoring provides visibility into the performance and reliability of data processing jobs, including Apache Spark and Databricks jobs, along with the underlying infrastructure. Data Jobs Monitoring enables you to:

- Track the health and performance of data processing jobs across your accounts and workspaces. See which take up the most compute resources or have inefficiencies.
- Receive an alert when a job fails—or when a job is taking too long to complete.
- Analyze job execution details and stack traces.
- Correlate infrastructure metrics, Spark metrics from the Spark UI, logs, and cluster configuration.
- Compare multiple runs to facilitate troubleshooting, and to optimize provisioning and configuration during deployment.

## Setup

Data Jobs Monitoring is supported for Amazon EMR, Databricks (AWS, Azure, Google Cloud), and Spark on Kubernetes.

To get started, select your platform and follow the installation instructions:

{{< partial name="data_jobs/setup-platforms.html" >}}

<br/>

## Explore Data Jobs Monitoring

### Easily identify unreliable and inefficient jobs

View all jobs across cloud accounts and workspaces. Identify failing jobs to take action on, or find jobs with high idle CPU that are using a lot of compute and should be optimized.

{{< img src="data_jobs/djm_demolist.png" alt="Job list - CPU breakdown" style="width:100%;" >}}

### Receive alerts on problematic jobs

Datadog monitors send alerts when a job fails, or is running beyeond its completion time.

{{< img src="data_jobs/djm_monitor_templates.png" alt="Monitors - templates for Data Jobs Monitoring" style="width:100%;" >}}

### Analyze and troubleshoot individual jobs

Click on a job to see how it performed across multiple runs, as well as error messages for failed runs.

{{< img src="data_jobs/djm_job.png" alt="Job list - CPU breakdown" style="width:100%;" >}}

### Analyze an individual run

Clicking on a run opens a side panel with details of how much time was spent on each Spark job and stage, along with a breakdown of resource consumption and Spark metrics, such as idle executor CPU, input/output data volume, shuffling, and disk spill. From this panel, you can correlate the execution with executor and driver node resource utilization, logs, and the job and cluster configuration. 

{{< img src="data_jobs/djm_run.png" alt="Data Jobs Monitoring > Run panel, Info tab" style="width:100%;" >}}

On the **Infrastructure** tab, you can correlate the execution to infrastructure metrics.

{{< img src="data_jobs/djm_run_infra.png" alt="Data Jobs Monitoring > Run panel, Infrastructure tab" style="width:100%;" >}}

To determine why a stage is taking a long time to complete,you can use the **Spark Task Metrics** tab to view task-level metrics for a specific Spark stage, so that you can identify data skew. See the distribution of time spent and data consumed by different tasks.

{{< img src="data_jobs/djm_tasks.png" alt="Data Jobs Monitoring > Run panel, Spark Task Metrics tab" style="width:100%;" >}}

For a failed run, look at the **Errors** tab to see the stack trace, which can help you determine where and how this failure occurred.

{{< img src="data_jobs/djm_stacktrace.png" alt="Data Jobs Monitoring > Run panel, Errors tab" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}