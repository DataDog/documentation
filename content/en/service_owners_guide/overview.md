---
title: Service Owners Guide
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/service_owners_guide/build/"
  tag: "Documentation"
  text: "Building your Datadog Implementation"
- link: "/service_owners_guide/run/"
  tag: "Documentation"
  text: "Maintaining and running your Datadog Implementation"
---

## Overview

When planning any new software implementation, it's crucial to understand its capabilities, objectives, timelines, teams, and design pattern. Throughout the plan phase you will learn some Datadog basics, define your most important objectives, understand several best practices, and identify how to optimize your Datadog implementation. 

## Learn Datadog basics

Get up to speed with the parts of Datadog that are most important to your use-case. Start with enrolling in our free [Learning Center][1] courses. Datadog recommends incorporating, at minimum, the following courses into your onboarding workflows:

{{< whatsnext desc="Datadog Service Owners:" >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Datadog Foundation{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}Tagging Best Practices{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-service-catalog" >}}Managing the Service Catalog{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog Administrators:" >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}The Agent on a Host{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Monitoring a Kubernetes Cluster{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API: Automation and Infrastructure as Code{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="User Interface concentration:" >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introduction to Dashboards{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Discovering Graph Widgets{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}Using Dashboards and SLOs{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Datadog Responders:" >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Site Reliability Engineer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}APM Monitors and Alertin{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Using Datadog RUM to track core web vitals{{< /nextlink >}}
{{< /whatsnext >}}

{{< whatsnext desc="Developer Concentration:" >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Setup APM for Java applications{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101: Developer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}Tracking errors with RUM for javascript web applications{{< /nextlink >}}
{{< /whatsnext >}}

### Create a test environment

After a bit of training, start adding some of your own local conditions. Spend some time installing and experimenting with Datadog in a low-risk sandbox, to help familiarize yourself with the environment. The Datadog installation methods are useful for getting started, and it is always a critical activity for the Datadog service ownership team.  

### Configuring your test environment

#### In-App

The [Datadog UI][2] is also the best place to start when embarking on substantial deployments of the core products. The platform is full of easy to use configuration assistance, live data auto-parsers, contextual auto-suggestions, and many other tools for the admin. The Datadog UI provides the best resources for aiding in some of these tasks. 

A few examples are:

* [APM Service Setup][3]   
* [Log Pipelines][2]   
* [Monitor Templates][4] 

#### Host Agent Config Templates

The [Datadog Agent][5] is open-source and published in Github. This is a useful resource for viewing configuration templates and specifications. Also, there are tools for host Agent Fleet Automation. Here are a few examples:

* [Agent Config Template][6]   
* [Integration Config Specs][7]   
* [Fleet Automation][8]

## Design

### Sizing exercise

Setting and identifying the clear end goal is critical whenever we start a substantial product implementation. However, in a practical world, it is not possible to know everything you might need at the outset. Product engineers iterate their deployments, and systems operations control their changes, all to control risk. Implementing a large-scale Datadog deployment will similarly benefit from the effective application of standard project management practices. As part of that process, there are certain Datadog elements that should be included. Survey outlines are a great way to size and whiteboard your needs.

A sample survey form might look like this: 

*Application name:*  
	*Language:*  
		*Frameworks:*  
	*Model Layer:*   
	*View Layer:*  
	*Controller layer:*  
	*Infra Type:*  
	*Operating systems:*

**Recommendation:**   
Start whiteboarding early, collecting or consolidating a mental survey of your outline. Create a comprehensive view of your ecosystems, application language, data storage, networking, and infrastructure.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[3]: https://app.datadoghq.com/apm/service-setup
[4]: https://app.datadoghq.com/monitors/recommended
[5]: https://github.com/DataDog/datadog-agent
[6]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config\_template.yaml
[7]: https://github.com/DataDog/integrations-core
[8]: https://app.datadoghq.com/fleet
[9]: https://docs.datadoghq.com/getting\_started/tagging/unified\_service\_tagging/
[10]: https://docs.datadoghq.com/getting\_started/tagging/
[11]: https://docs.datadoghq.com/getting\_started/tagging/unified\_service\_tagging
[12]: https://docs.datadoghq.com/account\_management/rbac/?tab=datadogapplication
[13]: https://docs.datadoghq.com/account_management/multi_organization/
[14]: https://docs.datadoghq.com/account\_management/org\_settings/service\_accounts/
[15]: https://docs.datadoghq.com/account\_management/api-app-keys/
[16]: https://docs.datadoghq.com/account\_management/teams/
