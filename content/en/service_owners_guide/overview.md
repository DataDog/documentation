---
title: Service Owners Guide
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/service_owners_guide/plan/"
  tag: "Documentation"
  text: "Planning your Datadog Implementation"
- link: "/service_owners_guide/build/"
  tag: "Documentation"
  text: "Building your Datadog Implementation"
- link: "/service_owners_guide/run/"
  tag: "Documentation"
  text: "Maintaining and running your Datadog Implementation"
---

## Overview

When planning any new software implementation, it's crucial to understand its capabilities, objectives, timelines, teams, and design pattern. Throughout the plan phase you will learn some Datadog basics, define your most important objectives, understand several best practices, and identify how to optimize your Datadog implementation. 

## Getting help

### Self-service resources

As you go along in this guide, you can refer to the following self-service resources:

* The Datadog [documentation][1], especially the [getting started][2] pages, to familiarize yourself with the platform further.  
* The [Datadog UI][3], which provides in-context help that is accessible from any page.
* For information on specific configuration boxes, release notes, and other resources, click the `"?"` icon throughout the app, or the bottom left hand side within the interface.

{{< img src="/service_owners_guide/help_center.png" alt="Screen shot of the help center in the Datadog UI" style="width:90%;">}}

On this page you can find resources such as:

* [Bits-AI][4] (in-app), which is a platform-wide AI assisted troubleshooter that helps you identify and remediate issues in your applications and infrastructure.  
* Datadog [training courses](#learn-datadog-basics).

### File a support ticket

Datadog makes it easy to get support when you've run into a problem without having to worry about gathering the relevant information and sharing it securely and efficiently.

* [Datadog Support][5] is available to help with difficult issues, guide implementations, translate implementations into local conditions, identify bugs, and log feature requests.  
* For an automated interaction with Datadog support, use Datadog Agent flare, which is a CLI tool that creates a new ticket, then automatically redacts sensitive information in all the relevant log files, debug level settings, and local configs before sending it in a zipped file to Datadog support, no login required. For information on how to use and send the flare to Datadog support, see [sending a flare][6].  
* Additionally, In-App, Datadog's [Fleet Automation][7] can perform the Flare remotely, from within the Platform UI.

## Learn Datadog basics

Get up to speed with the parts of Datadog that are most important to your use-case. Start with enrolling in our free [Learning Center][1] courses. Datadog recommends incorporating, at minimum, the following courses into your onboarding workflows:

**Datadog Service Owners**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Datadog Foundation{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}Tagging Best Practices{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-service-catalog" >}}Managing the Service Catalog{{< /nextlink >}}
{{< /whatsnext >}}

**Datadog Administrators**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}The Agent on a Host{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Monitoring a Kubernetes Cluster{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API: Automation and Infrastructure as Code{{< /nextlink >}}
{{< /whatsnext >}} 

**User Interface concentration**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introduction to Dashboards{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Discovering Graph Widgets{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}Using Dashboards and SLOs{{< /nextlink >}}
{{< /whatsnext >}}

**Datadog Responders**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Site Reliability Engineer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}APM Monitors and Alertin{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Using Datadog RUM to track core web vitals{{< /nextlink >}}
{{< /whatsnext >}}

**Developer Concentration**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Setup APM for Java applications{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101: Developer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}Tracking errors with RUM for javascript web applications{{< /nextlink >}}
{{< /whatsnext >}}

## Create a test environment

After a bit of training, start adding some of your own local conditions. Spend some time installing and experimenting with Datadog in a low-risk sandbox, to help familiarize yourself with the environment. The Datadog installation methods are useful for getting started, and it is always a critical activity for the Datadog service ownership team.  

### Configuring your test environment

#### In-App

The [Datadog UI][8] is also the best place to start when embarking on substantial deployments of the core products. The platform is full of easy to use configuration assistance, live data auto-parsers, contextual auto-suggestions, and many other tools for the admin. The Datadog UI provides the best resources for aiding in some of these tasks. 

A few examples are:

* [APM Service Setup][9]   
* [Log Pipelines][8]   
* [Monitor Templates][10] 

#### Host Agent Config Templates

The [Datadog Agent][2] is open-source and published in Github. This is a useful resource for viewing configuration templates and specifications. Also, there are tools for host Agent Fleet Automation. Here are a few examples:

* [Agent Config Template][3]   
* [Integration Config Specs][4]   
* [Fleet Automation][5]


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: https://docs.datadoghq.com/getting_started/tagging/unified\_service\_tagging/
[7]: https://docs.datadoghq.com/getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/recommended
