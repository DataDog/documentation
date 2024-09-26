---
title: Datadog Service Owners Guide
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/getting_started/application/"
  tag: "Documentation"
  text: "Getting Started with Datadog"
---

## Welcome

Datadog is a single observability platform that provides visibility into the health and performance of your underlying infrastructure, services, applications, and more. Its features and capabilities are vast and powerful, but it can be hard to know where to start or how to configure it optimally to fit your use case.

If you've been tasked with designing, implementing, and managing an enterprise-grade installation of Datadog, you've come to the right place. In conjunction with our [documentation][1], this guide provides best practices, standards, and examples to help you set up a production environment that matches your workloads and deployment needs, while avoiding large pitfalls down the road.

Once you've followed this guide to implement Datadog to scale with your organization, you can start managing your product efficiently without worrying about hardware refreshes, OS patches, server updates, or cluster re-balance details. Instead, you can focus on the refinements, analytics, and the data that comes with a well-formed observability system.  

## Why to use this guide

Like any large system, Datadog is built on a foundational design concept that has been developed and proven as a world leader in observability solutions. This guide will explain that underlying concept in terms of administrative activities and provide specific, actionable steps to avoid the most common pitfalls, such as a fragmented data model, unstructured user grouping, ungoverned consumption, and unrealized value.

## How to use this guide

This guide is organized into three sections that provide important concepts, plans, tasks, and structures to create and streamline your Datadog ownership experience:

* **[Plan][2]**: Learn the parts of Datadog that are important to your use case, build a knowledge base, develop some practical experience, plan your implementation, and utilize best practices when configuring your observability platform.  
* **[Build][3]**: Understand what needs to be installed and the best way to get it done so you can implement a Datadog environment that is best suited to your needs.  
* **[Run][4]**: Execute the internal and external tasks to maintain the Datadog service, maximize its power, and manage ongoing support.

{{< img src="/service_owners_guide/plan_build_run_2.png" alt="Diagram of the plan, build, and run phases" style="width:80%;">}}

## Next Steps

Throughout this guide you will learn how to maximize the value of Datadog by exploring a knowledge-base, experiment with the product, and create an implementation design. To get started using the Datadog Service Owners Guide, review the [Overview page][5] to view information on interacting with Datadog Support, sign up for free Datadog training courses, and learn how to create a test environment.

{{< whatsnext desc="This section includes the following topics:">}}
  {{< nextlink href="/service_owners_guide/overview">}}<u>Overview</u>: Learn how to send a Flare to Support, sign up for Datadog Training courses, and build a test environment.{{< /nextlink >}}
  {{< nextlink href="/service_owners_guide/plan">}}<u>Plan</u>: Plan your Datadog implementation by creating a sizing profile, develop general and best practices, and optimize data collection. {{< /nextlink >}}
  {{< nextlink href="/service_owners_guide/build">}}<u>Build</u>: Build your Datadog environment by prioritizing features, develop an internal support system, and provision your architecture.  {{< /nextlink >}}
  {{< nextlink href="/service_owners_guide/run">}}<u>Run</u>: Maintain and run your Datadog implementation by creating Dashboards, onboard new infrastructure, and perform Datadog Agent upgrades.{{< /nextlink >}}
{{< /whatsnext >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://docs.datadoghq.com/
[2]: /service_owners_guide/plan
[3]: /service_owners_guide/build
[4]: /service_owners_guide/run
[5]: /service_owners_guide/overview
