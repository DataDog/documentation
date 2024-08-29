---
title: Datadog Service Owners Guide
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/getting_started/agent/"
  tag: "Documentation"
  text: "Getting started with the Agent"
- link: "https://www.datadoghq.com/blog/tagging-best-practices/"
  tag: "Blog"
  text: "Best practices for tagging your infrastructure and applications"
---

# Welcome

Datadog is a single observability platform that provides visibility into the health and performance of your underlying infrastructure, services, applications, and more. Its features and capabilities are vast and powerful, but it can be hard to know where to start or how to configure it optimally to fit your use case.

If you've been tasked with designing, implementing, and managing an enterprise-grade installation of Datadog, you've come to the right place. Not to be confused with our [documentation][1], this guide provides best practices, standards, and examples to help you set up a production environment that matches your workloads and deployment needs, while avoiding large pitfalls down the road.

Once you've followed this guide to implement Datadog to scale with your organization, you can start managing your product efficiently without worrying about hardware refreshes, OS patches, server updates, or cluster re-balance details. Instead, you can focus on the refinements, analytics, and the data that comes with a well-formed observability system.  

## How to use this guide

This guide is organized into three sections that provide important concepts, plans, tasks, and structures to create and streamline your Datadog ownership experience:

* **Plan**: Learn the parts of Datadog that are important to your use case, build a knowledge base, develop some practical experience, plan your implementation, and utilize best practices when configuring your observability platform.  
* **Build**: Understand what needs to be installed and the best way to get it done so you can implement a Datadog environment that is best suited to your needs.  
* **Run**: Execute the internal and external tasks to maintain the Datadog service, maximize its power, and manage ongoing support.

{{< img src="/getting_started/service_owners_guide/plan_build_run.png" alt="Diagram of the plan, build, and run phases" style="width:80%;">}}

## Getting help

### Self-service resources

As you go along in this guide, you can refer to the following self-service resources:

* The Datadog [documentation][1], especially the [getting started][2] pages, to familiarize yourself with the platform further.  
* The Datadog UI, which provides in-context help that is accessible from any page.
* For information on specific configuration boxes, release notes, and other resources, click the `"?"` icon throughout the app, or the bottom left hand side within the interface.

{{< img src="/getting_started/service_owners_guide/help_center.png" alt="Screen shot of the help center in the Datadog UI">}}


* [Bits-AI][3] (in-app), which is a platform-wide AI assisted troubleshooter that helps you identify and remediate issues in your applications and infrastructure.  
* Datadog training courses (suggested courses [here]).

### File a support ticket

Datadog makes it easy to get support when you've run into a problem without having to worry about gathering the relevant information and sharing it securely and efficiently.

* [Datadog Support][4] is available to help with difficult issues, guide implementations, translate implementations into local conditions, identify bugs, and log feature requests.  
* For an automated interaction with Datadog support, use Datadog Agent flare, which is a CLI tool that creates a new ticket, then automatically redacts sensitive information in all the relevant log files, debug level settings, and local configs before sending it in a zipped file to Datadog support, no login required. For information on how to use and send the flare to Datadog support, see [sending a flare][5].  
* Additionally, In-App, Datadog's [Fleet Automation][6] can perform the Flare remotely, from within the Platform UI.

# Plan

When planning any new software implementation, it’s crucial to understand its capabilities, objectives, timelines, teams, and design pattern. Throughout the plan phase you will learn some Datadog basics, define your most important objectives, understand several best practices, and identify how to optimize your Datadog implementation. 

# Learn Datadog basics

Get up to speed with the parts of Datadog that are most important to your use-case. Start with enrolling in our free [Learning Center](https://learn.datadoghq.com/) courses. Datadog recommends incorporating, at minimum, the following courses into your onboarding workflows:

* **Datadog Service Owners**

  [Datadog Foundation](https://learn.datadoghq.com/courses/datadog-foundation)

  [Tagging Best Practices](https://learn.datadoghq.com/courses/tagging-best-practices)

  [Managing the Service Catalog](https://learn.datadoghq.com/courses/managing-service-catalog)

* **Datadog Administrators**

 		[The Agent on a Host](https://learn.datadoghq.com/courses/agent-on-host)  
		[Monitoring a Kubernetes Cluster](https://learn.datadoghq.com/courses/monitoring-k8s-cluster-agent)  
		[Datadog API: Automation and Infrastructure as Code](https://learn.datadoghq.com/courses/dd-api-automation-iac)

* **User Interface concentration**

  [Introduction to Dashboards](https://learn.datadoghq.com/courses/intro-dashboards)

  [Discovering Graph Widgets](https://learn.datadoghq.com/courses/dashboard-graph-widgets)

  [Using Dashboards and SLOs](https://learn.datadoghq.com/courses/dashboards-slos)


* **Datadog Responders**  
             [Site Reliability Engineer](https://learn.datadoghq.com/courses/dd-101-sre)   
             [APM Monitors and Alerting](https://learn.datadoghq.com/courses/apm-monitors-and-alerting)  
             [Using Datadog RUM to track core web vitals](https://learn.datadoghq.com/courses/core-web-vitals-lab)

* **Developer Concentration**

                     [Setup APM for Java applications](https://learn.datadoghq.com/courses/apm-java-host)  
                     [Datadog 101: Developer](https://learn.datadoghq.com/courses/dd-101-dev)  
                     [Tracking errors with RUM for javascript web applications](https://learn.datadoghq.com/courses/tracking-errors-rum-javascript)

# Create a test environment

After a bit of training, start adding some of your own local conditions. Spend some time installing and experimenting with Datadog in a low-risk sandbox, to help familiarize yourself with the environment. The Datadog installation methods are useful for getting started, and it is always a critical activity for the Datadog service ownership team.  

## Configuring your test environment

## In-App

The [Datadog UI](https://app.datadoghq.com/) is also the best place to start when embarking on substantial deployments of the core products. The platform is full of easy to use configuration assistance, live data auto-parsers, contextual auto-suggestions, and many other tools for the admin. The Datadog UI provides the best resources for aiding in some of these tasks. 

A few examples are:

* [APM Service Setup](https://app.datadoghq.com/apm/service-setup)   
* [Log Pipelines](https://app.datadoghq.com/logs/pipelines/pipeline/add)   
* [Monitor Templates](https://app.datadoghq.com/monitors/recommended) 

## Host Agent Config Templates

The [Datadog Agent](https://github.com/DataDog/datadog-agent) is open-source and published in Github. This is a useful resource for viewing configuration templates and specifications. Also, there are tools for host Agent Fleet Automation. Here are a few examples:

* [Agent Config Template](https://github.com/DataDog/datadog-agent/blob/main/pkg/config/config\_template.yaml)   
* [Integration Config Specs](https://github.com/DataDog/integrations-core)   
* [Fleet Automation](https://app.datadoghq.com/fleet)

# Design

## Sizing exercise

Setting and identifying the clear end goal is critical whenever we start a substantial product implementation. However, in a practical world, it is not possible to know everything you might need at the outset. Product engineers iterate their rollouts, and systems operations control their changes, all to control risk. Implementing a large-scale Datadog deployment will similarly benefit from the effective application of standard project management practices. As part of that process, there are certain Datadog elements that should be included. Survey outlines are a great way to size and whiteboard your needs.

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

# General best practices 

Datadog has specialized tool-tips designed for every kind of material.  After completing the sizing exercise, you will understand the types of technologies you're working with, and can start mapping those to core products in Datadog.

**Note**: Not all products and components may be relevant to your use case, use the table of contents to find sections and products relevant to your infrastructure.

## Resource tagging 

Datadog is a tool for correlating machine data across multi-dimensions of cardinality. It cross-references an individual data against any other one, regardless of type. For example, query telemetry on Database hosts can be compared to worker thread pool size on web server hosts, with all the logs from both hosts displayed in-line. 

Hostname, cloud regions, OS version, and IP, are just some of the machine-generated unified vocabulary. Additionally, Datadog allows you to generate custom data terms such as cost-code, AppName, environment, and version.

The real power of Datadog is its ability to contain and manage this unified vocabulary. The Datadog platform also has out-of-the-box data that is included. The application of the unified vocabulary concept, its management system, and Datadog’s out-of-the-box options are combined into a concept called [Unified Service Tagging](https://docs.datadoghq.com/getting\_started/tagging/unified\_service\_tagging/)

It is important to understand that tags are essentially `key:value` pairs or simple values such as "file-server" or "database", which add dimension to application performance data and infrastructure metrics. Before you begin monitoring with Datadog, it's important to take advantage of the tagging capabilities that your platforms offer as Datadog automatically imports these tags through its integrations.

For example, the [getting started with tagging](https://docs.datadoghq.com/getting\_started/tagging/) is a great place to start with this topic, but here are some additional highlights:

- A service is defined as a single application footprint, something with its own code repository.  
- Abbreviations and acronyms can be simplified, for example “Prod” \!= “Production”.  
- Take time to define sources of truth for dynamic tags such as code version.


**Recommendation**:  
As early as possible, understand [Datadog Unified Service Tagging](https://docs.datadoghq.com/getting\_started/tagging/unified\_service\_tagging).  Once developed, you can seamlessly map your infrastructure with your collected tags, unify your data streams to pivot between service metrics, logs and request traces, and assign owners to services to build informative alerts.

## RBAC

Datadog has a granular system of [Role-Based Access Control](https://docs.datadoghq.com/account\_management/rbac/?tab=datadogapplication) that can connect to your existing SAML authentication service.  SAML group-mappings can be built against the Datadog default roles and team objects.  Datadog provides three default roles, however these might not be enough to model complexity of your local AD/LDAP Roles. [Service accounts](https://docs.datadoghq.com/account\_management/org\_settings/service\_accounts/) are available for non-interactive purposes like [API and App Key](https://docs.datadoghq.com/account\_management/api-app-keys/) ownership, separating user activity from system tasks. There are granular permissions that can model the access and protections you need.  

As an additional layer, Datadog offers [Teams](https://docs.datadoghq.com/account\_management/teams/). Teams offer an added layer of user grouping designed to be flexible, informal, and ad-hoc. Users can self-join, or be unilaterally added.  Teams are highly integrated into sub-tools of Datadog.

**Recommendations:**

- Establish a specific plan for building out Datadog user roles.    
- Leverage service accounts for API key administration, and explore teams to link resources such as dashboards, services, monitors, and incidents to a group of users.

# Product best practices

## APM

APM depends critically on the sound application of Unified Service Tagging.  These Unified Service Tags are pivotal to the operational experience, but they are also useful for governance, and for attributing telemetry flows to their backing organizational construction. This is how Datadog can help determine the owner for a random Java process it discovers.    
Most install cases do not require changes to APM or RUM sampling, but if you intend to build a standard, Datadog recommends the following:

- Review the [ingestion controls](https://docs.datadoghq.com/tracing/trace\_pipeline/ingestion\_controls/) documentation.  
- Configure your sampling rate with [Remote Configuration](https://docs.datadoghq.com/tracing/trace\_pipeline/ingestion\_controls/\#managing-ingestion-for-all-services-at-the-agent-level) to scale your organization’s trace ingestion according to your needs, without needing to restart your Datadog Agent. See [sampling rate use cases](https://docs.datadoghq.com/tracing/guide/ingestion\_sampling\_use\_cases/) for more information.  
- Ensure [Unified Service Tagging](https://docs.datadoghq.com/getting\_started/tagging/unified\_service\_tagging/?tab=kubernetes) is applied, and review [span tag semantics](https://docs.datadoghq.com/tracing/trace\_collection/tracing\_naming\_convention/).

## Real User Monitoring

Real User Monitoring and Session Replay can give highly granular insights into what an end-user is experiencing. When considering to install RUM, consider installations on high value sessions where the data can be used to make meaningful changes in your environment.  Similarly, the power of Session Replay is tremendous; it serves as “the picture that tells a thousand words” when it comes to troubleshooting issues observed by humans. The highest value of Real User Monitoring and Session Replay comes from tracking actual customer experience, and is most likely of limited value in non-productions scenarios.  

**Recommendations:** 

- [Discard front-end errors](https://docs.datadoghq.com/real\_user\_monitoring/guide/enrich-and-control-rum-data/?tab=event)  
- Configure your [RUM sampling rate](https://docs.datadoghq.com/real\_user\_monitoring/guide/best-practices-for-rum-sampling/)  
- Limit RUM and Session Replay deployments to production and near-production environments.

## Synthetic monitoring

Datadog has a full synthetic application suite, including testing for browser, mobile, and API testing. Datadog synthetic tests can be linked back to the application behavior it generated, and from there, into the database, message queue, and all other downstream services.  

**Recommendations:**

- Review [Synthetics Consumption Considerations](https://www.datadoghq.com/pricing/?product=synthetic-testing--monitoring\#synthetic-testing--monitoring-common-questions)  
- Reduce test maintenance by using [sub-tests](https://docs.datadoghq.com/synthetics/browser\_tests/advanced\_options/\#subtests).

- Make rational choices in test location selection. Users are often from different regions around the world. Test from where your customers actually are.    
- Use Synthetics in conjunction with APM and RUM .  
- Define the use cases for Synthetics vs [HTTP Checks](https://docs.datadoghq.com/integrations/http\_check/).  

## Logs

The Datadog log management capabilities are rich, robust, and streamlined to allow you and your teams to quickly diagnose and fix your infrastructure issues. The [Logging without Limits™](https://docs.datadoghq.com/logs/guide/getting-started-lwl/) feature is used to create tunable log collection patterns.  [Logging without Limits](https://docs.datadoghq.com/logs/guide/getting-started-lwl/)™ provides the ability to extract the information from your log data into custom metrics. With Datadog’s logs features, it is possible to be alerted to critical errors in your logs, without needing to index them.

The primary design consideration for Datadog’s log index architecture is a distributed, time-series, columnar store optimized around serving large scan and aggregation queries.    
See [introducing husky](https://www.datadoghq.com/blog/engineering/introducing-husky/) and [husky deep dive](https://www.datadoghq.com/blog/engineering/husky-deep-dive/) for more information about Datadog’s logging architecture. 

Due to the robust nature of Datadog’s logging platform, it can be configured with many layers of logs storage. Each has its own use-cases outlined here:

|  | Platform Available | Retention | Retrieval to Datadog | Cost Driver |
| :---- | :---- | :---- | :---- | :---- |
| Ignored | No | None | None | NA |
| [Ingested](https://docs.datadoghq.com/logs/log\_configuration/logs\_to\_metrics/) | Logs-to-Metrics | 15m in LiveTail | None | Volume |
| [Archive](https://docs.datadoghq.com/logs/log\_configuration/archives/?tab=awss3) | Upon Rehydrate | Infinite | Slow | Volume |
| [Forward Logs](https://docs.datadoghq.com/logs/log\_configuration/forwarding\_custom\_destinations/?tab=http) | Same as Ingested | Determined by Target | None | Volume |
| [Index](https://docs.datadoghq.com/logs/log\_configuration/indexes) | Yes | 3,7,15,30 days | Immediate | Volume & Message Count |
| [Flex Logs](https://docs.datadoghq.com/logs/log\_configuration/flex\_logs/) | Yes\* |  | Rapid | Retrieval Volume |

\* Flex logs capability does not include monitors/alerting and Watchdog, however you can still perform log-to-metrics on the ingestion stream before logs are indexed (in either standard or flex) and use those metrics in monitors. Correlation with other telemetry, e.g. traces/APM, is supported.

These base functions make it easy to ingest and monitor logs for some of the following use-cases:

* Log format normalization  
  * Centralized control of date/time, value replacement, and referenced lookup  
* Global Sensitive Data PII Management  
  * PII and SDS are scrubbed first.  
* Routing and forwarding  
  * One centralized UI to send logs to index, archive, or forwarding destination  
* Cost-effective value capture  
  * Malleable log field definition, and high volume/low value distillation   
* Global log archive  
  * catch-all log archiver  
* Global SIEM  
  * All logs are tested for security at ingestion as a pre-processor

**Recommendations:**   
\- Understand [Logging without Limits](https://docs.datadoghq.com/logs/guide/getting-started-lwl/)™ (identify most logged service status, high volume logging patterns, log pattern exclusion filters).  
\- Develop a log ingestion plan and review [best practices](https://docs.datadoghq.com/logs/guide/best-practices-for-log-management/) for log management.  
\- Configure [log archives](https://docs.datadoghq.com/logs/log\_configuration/archives/?tab=awss3).

## Additional resources

We’ve highlighted some important wins and best practices with APM, RUM, Synthetic Monitoring, Logs, and Dashboards to help you achieve success in getting started with those products and components. Some additional resources that are important when planning your implementation phase are outlined below.

### Live processes 

[Live processes](https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows) can be used to view all of your running processes in one place. For example, it can provide PID-level information of a running Apache process, to help you understand and troubleshoot transient issues. Additionally, you can query for processes running on a specific host, in a specific availability zone, or running a specific workload. [Configure](https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows\#installation) live processes on your hosts, containers, or AWS ECS Fargate instances to take advantage of this feature.

### Availability, latency, and SSL expiration 

Web server operations depend on the network availability of ports, the validity of SSL certificates, and low latencies.  Install the [HTTP\_Check](https://docs.datadoghq.com/integrations/http\_check/) to monitor local or remote HTTP endpoints, detect bad response codes (such as 404), and identify soon-to-expire SSL certificates.
### Network Monitoring

Web servers are almost always inter-connected with other services through a network fabric that is vulnerable to drops and can result in re-transmits.  Use Datadog’s [network integration](https://docs.datadoghq.com/integrations/network/) and enable [Network Performance Monitoring](https://docs.datadoghq.com/network\_monitoring/performance/) to gain visibility into your network traffic between services, containers, availability zones, and other tags on your infrastructure.

# Ancillary products

Datadog is a platform of tremendous value. From years of collective experience with customers, we have developed numerous ancillary products that complement our flagship offerings.  Included in the price of Infrastructure monitoring is a robust list of ancillary products that can enhance your Datadog observability platform. Datadog is a turn-key solution, but it is important to stay focused after the initial roll-out. The following are some examples of ancillary products that can be utilized to maximize your suite of products.

## Service Catalog

Services are the base object of observability. Utilizing the [service catalog](https://docs.datadoghq.com/service\_catalog/) allows you to see at glance which services were deployed most recently, or have not been deployed for a long time. Additionally this view shows which services are reporting the most errors, and whether they have on-going incidents, and much more.

## Event Management 

Without any additional setup, [event management](https://docs.datadoghq.com/service\_management/events/) can be used to see 3rd party event statuses, events generated from the Agent and installed integrations, and more. 

## Error Tracking 

See errors where they happen with Datadog’s [Error Tracking](https://docs.datadoghq.com/error\_tracking/). Error Tracking can ingest errors from APM, Log Management, and Real User Monitoring to debug issues faster.

## API Catalog 

Use [API Catalog](https://docs.datadoghq.com/api\_catalog/) for resource endpoint-specific categorization, performance, reliability, and ownership of all your API endpoints in one place.

## Fleet Automation  

Centrally administer and manage all of your Datadog Agents with [Fleet Automation](https://docs.datadoghq.com/agent/fleet\_automation/). Fleet Automation can help you identify which Agents need upgraded, send a flare from within your organization to support, and help rotate API keys and ensure old keys can be disabled with no impact by identifying which Agents, and how many Agents, are using a particular key.  

## Remote Configuration

Use Datadog’s [Remote Configuration](https://docs.datadoghq.com/agent/remote\_config/) (enabled by default), to remotely configure and change the behavior of Datadog components (for example, Agents, tracing libraries, and Observability Pipelines Worker) deployed in your infrastructure. See [supported products and capabilities](https://docs.datadoghq.com/agent/remote\_config/?tab=configurationyamlfile\#supported-products-and-feature-capabilities) for more information.

## Notebooks 

Use Datadog [Notebooks](https://docs.datadoghq.com/notebooks/) to share with team members to aid in troubleshooting investigations or incidents.

# Optimizing data collection 

Datadog can collect and observe many things in your environments, however, it is important to limit the amount of collection points and establish guard rails. In this section we will discuss the mechanisms that control the telemetry collection, and discuss how these can be codified into local standards.

## Infrastructure

Datadog interacts with the monitoring API of HyperVisor managers (Hyper-V, vSphere, PCF), container schedulers (K8s, rancher, docker), and public cloud providers(AWS, Azure, GCP).  Datadog’s unique ability allows the platform to [autodiscover](https://docs.datadoghq.com/getting\_started/containers/autodiscovery/?tab=adannotationsv2agent736) new objects (pods, VMs, EC2s, ALBs, AzureSQL, GCP blobs) that are created within those environments. There are reasons to control this collection as many of these objects have billing implications to be aware of.

The usage of Datadog within these auto-discovered environment types is critical to understand. These include linkages for excluding billable objects for [AWS](https://docs.datadoghq.com/account\_management/billing/aws/\#aws-resource-exclusion), GCP, [Azure](https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension\#metric-collection), HyperV, PCF, and vSphere.

**Recommendations:**    
For each virtualization framework, define the exclusion methodology. Enumerate specific tags, labels, namespaces, and annotations that will be used for collection control.

## Service levels

During the planning phase, it is common to realize that not every instance of observability is as important as others. Some footprints are mission critical, while others are not. For this reason, it is useful to devise patterns for coverage levels, and which environments you want to monitor with Datadog. For example, a production environment might be monitored at every level, but a development instance of the same application might only have the developer-focused tooling.

**Recommendations:**  
\- Establish estimates of service levels early on. They do not need to be precise at first, but will be useful as adoption scales up.

## Deployment patterns 

At this stage, we have developed two distinct bodies of knowledge. The first, is an understanding of our IT landscape from the observability lens. We understand the types of components it consists of and have a general idea of the observability data we need to extract from it. The second, is a decent understanding of Datadog capabilities and prerequisites.    
Now it's time to put it all together. In a typical 3-tier, web-scale application, Datadog has about five main capabilities (metrics, logs, traces, synthetics, RUM, and DBM), and many optional subcomponents and customizations. They are all managed from as few points as possible, but the most efficient deployment of Datadog requires some degree of pattern creation.

## Software Development Lifecycle

To begin mapping out your deployment patterns, use the technology survey(\#anchor link), combine it with the [Datadog 101](https://learn.datadoghq.com/courses/dd-101-dev) training, and begin to develop a plan of action. Below is an example intended to be modified to suit your individual needs. It outlines the deployment pattern from the dimension of SDLC environment (dev,qa,stage,prod), but should be customized to the local standards and conditions. Begin setting expectations within your own Datadog user base what the term “Standard Datadog Deployment” actually means. 

|  | Dev | QA | Staging | Prod |
| :---- | :---- | :---- | :---- | :---- |
| **APM** | Deny/Allow | Allow | Allow | Allow |
| **Synthetics** | Deny | Deny/Allow | Allow | Allow |
| **Logs** | Allow | Allow | Allow | Allow |
| **RUM** | Deny | Deny/Allow |  Allow | Allow |
| **DBM** | Deny/Allow | Deny/Allow | Allow | Allow |
| **Live Processes** | Deny | Deny/Allow | Allow | Allow |
|  |  |  |  |  |

**Recommendation:** 
Not every tool is fit for every job.  Evaluate the Datadog product use cases, and specifically match them to your needs. Consider the levels of SDLC, application importance, and Datadog product purpose.

# Plan summary

It is important to develop and plan a realistic course through the implementation of Datadog. In this section we have covered the planning and best practices phase, and at this stage, your   
Datadog footprint is set up for success. You have identified and assembled your knowledge base and team members, developed your deployment models, planned some optimizations, and compiled a list of best practices for some of our core products. These foundations will assist you in the next phases of Datadog service ownership, build and run.  


[1]: https://docs.datadoghq.com/
[2]: /getting_started/
[3]: /bits_ai/
[4]: /help/
[5]: /agent/troubleshooting/send_a_flare
[6]: /agent/fleet_automation/

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}