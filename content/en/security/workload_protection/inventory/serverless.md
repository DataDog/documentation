---
title: Serverless
disable_toc: false
further_reading:
- link: "/security/guide/aws_fargate_config_guide"
  tag: "Documentation"
  text: "AWS Fargate Configuration Guide for Datadog Security"
---

The [Serverless][1] view in Workload Protection [Inventory][2] provides real-time visibility into the security posture for serverless containerization workloads such as AWS Fargate ECS tasks. 

The Serverless view shows each task ARN, Datadog Agent version, cluster name, and enabled protection features. It highlights tasks without coverage or with unsupported Agent versions, helping teams identify drift and misconfigurations that reduce visibility.

This view helps ensure that all serverless containers launched using CI/CD pipelines are protected by security policies at runtime. It enables early detection of drift, version mismatches, and failed instrumentation, which are critical risks in high-churn environments.

## Key use cases

Here are some examples of how the Serverless view in Workload Protection Inventory helps secure serverless environments:

- **Validate protection enforcement in CI/CD:** 
  - Use the Serverless view to confirm that workloads launched using infrastructure-as-code (IaC) templates or automated pipelines have the correct security coverage. 
  - Filter for **Not Configured** or **Agent Version** to pinpoint deployments where instrumentation wasn't set up. This enables feedback into IaC modules or base container images.
- **Detect drift across clusters:** 
  - Filter tasks using **Cluster Name** to detect when only some tasks in a cluster are instrumented with Workload Protection. This is a common sign of inconsistent task definitions or container image drift. Comparing coverage across clusters helps prevent partial rollout of security controls.
- **Enforce Agent version consistency:** 
  - Filter using **Agent Version** to identify stale deployments. Outdated Agents might lack recent detection rules or bug fixes. Teams can respond with pipeline updates or enforcement rules to maintain alignment with the approved version baseline.
- **Enable scalable runtime policy deployment:** 
  - Filter using **Workload Protection Status** to see which tasks are labeled with **Configured** or **Not Configured**. 
  - For tasks without Workload Protection, hover over the icon in the **Features** column and select **Configure**. Next, follow the steps to perform a manual or automatic installation.

## Serverless workflows

- **Exposed tasks:**
  - To compare how many tasks are protected versus exposed (for example, `Very low coverage. 2 of 14 tasks covered for Workload Protection`), check the **Serverless Resources** banner.
- **Misconfigured tasks:**
  - Separate misconfigured or unmonitored tasks from healthy tasks using the **Workload Protection Status** filter.
- **Enforce Agent versions:**
  - Sort by **Agent Version** to enforce version control and identify workloads that must be upgraded in automation pipelines.
- **Enforce instrumentation:**
  1. Hover over the shield icons in the **Features** column to investigate tasks that do not have Workload Protection instrumentation (identified with **Not Configured**).
  2. Click **Configure** to enable Workload Protection on a task by manual or automatic installation.
  Manual installation instructions are provided for AWS console and CLI.
- **Confirm cluster coverage:**
  - To confirm coverage parity across production, staging, and dev clusters, click a cluster name and select **Filter by [cluster_name]**.
- **Incident response:**
  - For incident response, check the state of a specific task using the **AWS Fargate ECS Task ARN** filter.

## Compliance and audit value

**Serverless** provides proof that even ephemeral workloads are onboarded into monitoring by default. This onboarding ensures serverless compute does not create unmanaged blind spots in regulated environments. 

Tracking agent versions and protection status helps demonstrate adherence to internal security baselines and external frameworks. 

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/security/workload-protection/inventory/serverless
[2]: https://app.datadoghq.com/security/workload-protection/inventory/hosts