---
title: Serverless
disable_toc: false
---

The [Serverless][1] view in Workload Protection [Inventory][2] provides real-time visibility into security posture for serverless containerization workloads such as AWS Fargate ECS tasks. 

The Serverless view shows each task ARN, agent version, cluster name, and enabled protection features. It highlights tasks without coverage or with unsupported agent versions, helping teams identify drift and misconfigurations that reduce visibility.

## Key use cases

The following uses of the Serverless view help keep serverless environments secure:
- Confirm that Workload Protection is deployed as part of infrastructure automation. 
- Expos gaps where tasks are launched without monitoring, which could allow untracked execution paths. 
- Review Agent version data to enforce upgrade policies so tasks always run supported builds. 
- Tie serverless protection back to infrastructure context using cluster information, ensuring uniform enforcement across distributed workloads. 
- For incident response, use the Serverless view to validate whether an affected task had monitoring enabled at runtime.

## Serverless workflows

- Check the **Serverless Resources** banner to compare how many tasks are protected versus exposed (for example, `Very low coverage. 2 of 14 tasks covered for Workload Protection`).
- Separate misconfigured or unmonitored tasks from healthy tasks using the **Workload Protection Status** filter.
- Sort by **Agent Version** to enforce version control and identify workloads that must be upgraded in automation pipelines.
- Hover over the shield icons in the **Features** column to investigate tasks that do not have Workload Protection instrumentation (identified with **Not Configured**).
   - Click **Configure** to enable Workload Protection on a task.
- To confirm coverage parity across production, staging, and dev clusters, click a cluster name and select **Filter by [cluster_name]**.
- For incident response, check the state of a specific task using the **AWS Fargate ECS Task ARN** filter.

## Compliance and audit value

**Serverless** provides proof that even ephemeral workloads are onboarded into monitoring by default. This onboarding ensures serverless compute does not create unmanaged blind spots in regulated environments. 

Tracking agent versions and protection status helps demonstrate adherence to internal security baselines and external frameworks. 

By using **Serverless** to integrate checks into CI/CD, security teams can provide auditable evidence that every serverless workload is monitored from launch through termination.

[1]: https://app.datadoghq.com/security/workload-protection/inventory/serverless
[2]: https://app.datadoghq.com/security/workload-protection/inventory/hosts