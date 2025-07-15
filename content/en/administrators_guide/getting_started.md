---
title: Getting Started
description: Learn strategies for getting started with your new Datadog installation.
further_reading:
- link: "/getting_started/support/"
  tag: "Documentation"
  text: "Getting Started with Datadog Support"
---

## Overview

This Getting Started guide offers strategies for effectively implementing Datadog in your organization. Explore resources for assistance, Learning Center courses to deepen your knowledge, and instructions for setting up a test environment.

## Getting help

### Self-service resources

As you go along in this guide, you can refer to the following self-service resources:

* [Datadog training](#learn-datadog-basics) courses.
* The Datadog [documentation][16], especially the [Getting started][17] pages, to familiarize yourself with the platform further.  
* The [Datadog UI][18], which provides in-context help, information on specific configuration fields, release notes, and other resources, click the <kbd>?</kbd> icon throughout the app, or the bottom of the product navigation.

{{< img src="/administrators_guide/help_center.png" alt="Screen shot of the help center in the Datadog UI" style="width:90%;">}} 

### File a support ticket

To get support when you've run into a problem:

* [**Datadog Support**][20]: Available to help with difficult issues, guide your installation, translate issues into local conditions, identify bugs, and log feature requests.
* [**Datadog Agent flare**][21]: This CLI tool automatically creates a new support ticket and sends a zipped file of redacted relevant log files, debug level settings, and local configs, to Datadog support, no login required. For information on how to use and send the flare to Datadog support, see [sending a flare][21].  
* [**Fleet Automation**][5]: Allows remote flare generation from the Platform UI.

## Learn Datadog basics

Get up to speed with the parts of Datadog that are most important to your use case. Start by enrolling in our free [Learning Center][1] courses. Incorporate the following courses into your onboarding workflows:

**Getting started**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/datadog-foundation" >}}Datadog Foundation{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tagging-best-practices" >}}Tagging Best Practices{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/managing-software-catalog" >}}Managing the Software Catalog{{< /nextlink >}}
{{< /whatsnext >}}

**Administrators**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/agent-on-host" >}}The Agent on a Host{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent" >}}Monitoring a Kubernetes Cluster{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-api-automation-iac" >}}Datadog API: Automation and Infrastructure as Code{{< /nextlink >}}
{{< /whatsnext >}} 

**User Interface**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/intro-dashboards" >}}Introduction to Dashboards{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboard-graph-widgets" >}}Discovering Graph Widgets{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dashboards-slos" >}}Using Dashboards and SLOs{{< /nextlink >}}
{{< /whatsnext >}}

**Site Reliability Engineers**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-sre" >}}Datadog 101: Site Reliability Engineer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-monitors-and-alerting" >}}APM Monitors and Alerting{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/core-web-vitals-lab" >}}Using Datadog RUM to track core web vitals{{< /nextlink >}}
{{< /whatsnext >}}

**Developers**:
{{< whatsnext desc=" " >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/apm-java-host" >}}Setup APM for Java applications{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/dd-101-dev" >}}Datadog 101: Developer{{< /nextlink >}}
    {{< nextlink href="https://learn.datadoghq.com/courses/tracking-errors-rum-javascript" >}}Tracking errors with RUM for javascript web applications{{< /nextlink >}}
{{< /whatsnext >}}

## Create a test environment

After completing some courses, apply what you've learned to your local conditions. Install and experiment with Datadog in a low-risk sandbox, to become familiar with the environment. Create a straightforward and accessible environment to develop your monitoring setup before broader installation. 

### Configuring your test environment

#### In-App

The [Datadog UI][18] is the best place to start building out your testing environment. The platform provides configuration assistance, live data auto-parsers, contextual suggestions, and many other tools. The Datadog UI provides helpful resources for completing some of these tasks. 

A few examples are:

* Create a [Synthetic Monitoring test][14] to start testing critical business transactions on your applications.
* Create a few [Service Level Objectives][15] (SLOs) to define targets for application performance.
* Review the [APM Service Setup][9] page, and follow the step-by-step instructions to begin instrumenting your services.
* Configure and test [Log Pipelines][8] to determine how you would like to ingest different sets of logs coming from infrastructure and applications.
* Review the [Monitor Templates][10] page to begin adding alerts on your test environment.

#### Host Agent Config Templates

The [Datadog Agent][2] is open-source and published in GitHub. The Agent GitHub repo is a useful resource for viewing configuration templates and specifications to assist with building your environment. 

Here are a few examples:

* [Agent Config Template][3]   
* [Integration Config Specs][4]   
* [Fleet Automation][5]

## Next Steps

To successfully create a new Datadog installation, review the [plan][11] page. You'll learn how to create a scoping exercise, set up [resource tagging][12], learn about product best practices, add more products, and optimize your data collection to ensure a smooth installation.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}


[1]: https://learn.datadoghq.com/
[2]: https://github.com/DataDog/datadog-agent
[3]: https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config_template.yaml
[4]: https://github.com/DataDog/integrations-core
[5]: https://app.datadoghq.com/fleet
[6]: /getting_started/tagging/unified_service_tagging/
[7]: /getting_started/tagging/
[8]: https://app.datadoghq.com/logs/pipelines/pipeline/add
[9]: https://app.datadoghq.com/apm/service-setup
[10]: https://app.datadoghq.com/monitors/recommended
[11]: /administrators_guide/plan
[12]: /administrators_guide/plan/#resource-tagging
[13]: https://github.com/DataDog/datadog-agent/tree/main/examples
[14]: https://app.datadoghq.com/synthetics/tests
[15]: https://app.datadoghq.com/slo/manage
[16]: https://docs.datadoghq.com
[17]: /getting_started
[18]: https://app.datadoghq.com
[19]: /bits_ai/
[20]: /help
[21]: /agent/troubleshooting/send_a_flare/?tab=agent
