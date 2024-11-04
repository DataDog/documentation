---
title: Administrator's Guide
description: Setup and install Datadog as an administrator to avoid pit-falls down the road
further_reading:
- link: "/getting_started/application/"
  tag: "Documentation"
  text: "Getting Started with Datadog"
---


Use this Datadog Administrators guide when your company has purchased Datadog and you are ready to leverage the observability platform to gain visibility into the health and performance of your underlying infrastructure, supporting services, and applications. It can be challenging to determine where to start and how to best configure Datadog for your needs. This guide offers suggestions to help you make the most out of Datadog, tailored to your unique needs, particularly for designing, installing, and managing an enterprise-grade installation of Datadog. As an extension of the main Datadog
[documentation][1], this guide offers best practices, guidance, and examples to help you set up a production environment that matches your workloads and installation needs.

After using this guide to install Datadog to scale with your organization, you can manage your installation efficiently without worrying about hardware refreshes, operating system patches, server updates, or cluster rebalance details. Instead, you can focus on the benefits of a full observability system, such as:

- Lowering your cloud and infrastructure costs.
- Reducing the severity, frequency, and mean time to resolution of incidents.
- Collect, process, and correlate observability and security data from your entire stack in one platform.
- Automate remediation and take action directly from Datadog with complete context from observability data across your stack.

## Why to use this guide

This guide outlines the foundational concepts of Datadog and offers steps to prevent common issues like fragmented data models, unstructured user grouping, ungoverned consumption, and unrealized value.

## How to use this guide

This guide is organized into three sections that provide important concepts, plans, tasks, and structures to create and streamline your Datadog ownership experience:

* **[Plan][2]**: Learn the parts of Datadog that are important to your use case, build a knowledge base, develop some practical experience, plan your installation, and apply best practices when configuring your observability platform.  
* **[Build][3]**: Understand what needs to be installed and create a detailed roll-out methodology so you can set up a Datadog environment that is best suited to your needs.  
* **[Run][4]**: Maintain Datadog, maximize its power and manage ongoing support.

{{< img src="/administrators_guide/plan_build_run_2.png" alt="Diagram of the plan, build, and run phases" style="width:80%;">}}

## Next Steps

Throughout this guide you will learn how to maximize the value of Datadog by exploring a knowledge-base, experiment with the product, and create an installation design. To get started using the Datadog Administrator's Guide, review the [Getting Started][5] page to view information on interacting with Datadog Support, sign up for free Datadog training courses, and learn how to create a test environment.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/administrators_guide/getting_started">}}<u>Getting Started</u>: Learn how to send a Flare to Support, sign up for Datadog Training courses, and build a test environment.{{< /nextlink >}}
  {{< nextlink href="/administrators_guide/plan">}}<u>Plan</u>: Plan your Datadog installation by creating a sizing profile, develop general and best practices, and optimize data collection. {{< /nextlink >}}
  {{< nextlink href="/administrators_guide/build">}}<u>Build</u>: Build your Datadog environment by prioritizing features, develop an internal support system, and provision your architecture.  {{< /nextlink >}}
  {{< nextlink href="/administrators_guide/run">}}<u>Run</u>: Maintain and run your Datadog installation by creating Dashboards, onboard new infrastructure, and perform Datadog Agent upgrades.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/
[2]: /administrators_guide/plan
[3]: /administrators_guide/build
[4]: /administrators_guide/run
[5]: /administrators_guide/getting_started
