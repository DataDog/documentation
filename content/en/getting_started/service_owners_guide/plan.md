---
title: Service Owners Guide Plan Phase
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/logs/"
  tag: "Documentation"
  text: "Collect your logs"
---

## Plan

When planning any new software implementation, it’s crucial to understand its capabilities, objectives, timelines, teams, and design pattern. Throughout the plan phase, you will learn some Datadog basics, define your most important objectives, understand several best practices, and identify how to optimize your Datadog implementation.

### Learn Datadog basics

Get up to speed with the parts of Datadog that are most important to your use-case. Start with enrolling in our free Learning Center courses. Datadog recommends incorporating, at minimum, the following courses into your onboarding workflows:

**Datadog Service Owners**
- Datadog Foundation
- Tagging Best Practices
- Managing the Service Catalog

**Datadog Administrators**
- The Agent on a Host
- Monitoring a Kubernetes Cluster
- Datadog API: Automation and Infrastructure as Code

**User Interface Concentration**
- Introduction to Dashboards
- Discovering Graph Widgets
- Using Dashboards and SLOs

**Datadog Responders**
- Site Reliability Engineer
- APM Monitors and Alerting
- Using Datadog RUM to track core web vitals

**Developer Concentration**
- Setup APM for Java applications
- Datadog 101: Developer
- Tracking errors with RUM for JavaScript web applications

### Create a test environment

After a bit of training, start adding some of your own local conditions. Spend some time installing and experimenting with Datadog in a low-risk sandbox, to help familiarize yourself with the environment. The Datadog installation methods are useful for getting started, and it is always a critical activity for the Datadog service ownership team.

#### Configuring your test environment

**In-App**

The Datadog UI is also the best place to start when embarking on substantial deployments of the core products. The platform is full of easy-to-use configuration assistance, live data auto-parsers, contextual auto-suggestions, and many other tools for the admin. The Datadog UI provides the best resources for aiding in some of these tasks.

A few examples are:

- APM Service Setup 
- Log Pipelines 
- Monitor Templates 

**Host Agent Config Templates**

The Datadog Agent is open-source and published on GitHub. This is a useful resource for viewing configuration templates and specifications. Also, there are tools for host Agent Fleet Automation. Here are a few examples:

- Agent Config Template 
- Integration Config Specs 
- Fleet Automation

### Design

#### Sizing exercise

Setting and identifying the clear end goal is critical whenever we start a substantial product implementation. However, in a practical world, it is not possible to know everything you might need at the outset. Product engineers iterate their rollouts, and systems operations control their changes, all to control risk. Implementing a large-scale Datadog deployment will similarly benefit from the effective application of standard project management practices. As part of that process, there are certain Datadog elements that should be included. Survey outlines are a great way to size and whiteboard your needs.

A sample survey form might look like this:

- **Application name:**
- **Language:**
- **Frameworks:**
- **Model Layer:**
- **View Layer:**
- **Controller layer:**
- **Infra Type:**
- **Operating systems:**

**Recommendation:** 

Start whiteboarding early, collecting or consolidating a mental survey of your outline. Create a comprehensive view of your ecosystems, application language, data storage, networking, and infrastructure.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}