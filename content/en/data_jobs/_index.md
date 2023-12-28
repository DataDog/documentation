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

- Track data processing jobs across your accounts and workspaces, and see which take up the most compute resources or have inefficiencies.
- Receive an alert when a job fails—or when a job that should be complete is still running.
- Analyze job execution details and stack traces.
- Correlate infrastructure metrics, Spark metrics from the Spark UI, logs, and cluster configuration.
- Compare multiple runs to facilitate troubleshooting, and to optimize provisioning and configuration during deployment.

## Setup

Data Jobs Monitoring is supported for Amazon EMR, Databricks, and Spark on Kubernetes.

To get started, select your platform and follow the installation instructions:

{{< partial name="data_jobs/setup-platforms.html" >}}

<br/>

## Explore Data Jobs Monitoring

### Take inventory of your data processing jobs

View all jobs across cloud accounts and workspaces. See CPU allocation, cost estimation, and other metrics to identify opportunities for optimization.

{{< img src="data_jobs/djm_joblist.png" alt="Job list - CPU breakdown" style="width:100%;" >}}

### Analyze and troubleshoot individual jobs

Click on a job to see how it performed across multiple runs, as well as error messages for failed runs.

{{< img src="data_jobs/djm_job.png" alt="Job list - CPU breakdown" style="width:100%;" >}}

### View details of each individual run

Clicking on a run opens a side panel with details of how much time was spent on each Spark job and stage, helping you to understand the breakdown of resource consumption and Spark metrics. From this panel, you can also view executor and driver node resource utilization, as well as job and cluster configuration. 

{{< img src="data_jobs/djm_run.png" alt="Job list - CPU breakdown" style="width:100%;" >}}

For a failed run, you can see the stack trace to determine where and how this failure occurred.

{{< img src="data_jobs/djm_stacktrace.png" alt="Job list - CPU breakdown" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}