---
title: Plan your Datadog installation
description: Setup and install Datadog as an administrator to avoid pit-falls down the road
further_reading:
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Getting Started with Unified Service Tagging"
- link: "/getting_started/tracing/"
  tag: "Documentation"
  text: "Getting Started with APM Tracing"
---

## Overview

When you plan a new software installation, its crucial to understand its capabilities, objectives, timelines, teams, and design patterns. In the plan phase, learn Datadog basics, define your most important objectives, understand best practices, and identify how to optimize your Datadog installation. 

## Design

### Scoping exercise

Setting a clear goal is critical for installing Datadog. However, in a practical world, it is not possible to know everything you might need at the outset. Product engineers iterate their roll-outs, and systems operators control their changes, all to control risk. Installing a large-scale Datadog installation will benefit from the application of standard project management practices. As part of that process, there are certain Datadog elements that you should include. Send your engineering organization a survey outline to size and whiteboard your needs.

**Recommendations:**   
Start collecting and consolidating a survey of your organization early. Create a comprehensive view of your ecosystems, application languages, data storage, networking, and infrastructure.

A sample survey form might look like this: 

```
Application name:  
  Language:  
     Frameworks:  
  Model layer:  
  View layer: 
  Controller layer:  
  Infra type:  
  Operating systems:
```

## General best practices 

Complete the scoping exercise to understand the types of technologies you're working with, and start mapping those to core products in Datadog.

### Resource tagging 

Datadog is a tool for correlating machine data, the application that's running on it, and its physical descriptors. It can cross-reference an individual piece of data against any other piece, regardless of type. For example, query data on database hosts can be compared to worker thread pool size on web server hosts, with all the logs from both hosts displayed in-line. 

Hostname, cloud regions, operating system version, and IP are just some of the automatically applied resource attributes. Additionally, Datadog allows you to generate custom tags such as cost-code, AppName, environment, and version.

Datadog's strength lies in its capability to maintain and manage a unified vocabulary. The platform also includes built-in data. [Unified Service Tagging][1] consists of reserved tags that enable telemetry correlation across all features of the Datadog Platform.

Tags are `key:value` pairs or simple values. They add dimension to application performance data and infrastructure metrics. Before you begin monitoring with Datadog, it's important to take advantage of the tagging capabilities that your platforms offer as Datadog automatically imports these tags through its integrations, for example:

| TAG                  | KEY            | VALUE         |
|----------------------|----------------|---------------|
| env:staging:west     | env            | staging:west  |
| component_type:database | component_type | database      |


The Getting [Getting started with tagging][2] guide is a great place to start with this topic. Here are some additional highlights:

- A service is defined as a single application footprint, something with its own code repository.
- Tag values must be consistent. For example  "Production" is different from "Prod".
- Define sources of truth for dynamic tags such as code version.

**Recommendations**:  
As early as possible, understand [Datadog Unified Service Tagging][2] and develop your tagging scheme. Then, map your infrastructure to your collected tags, unifying your data so you can pivot between service metrics, logs, and traces, and assign owners to services to build informative alerts.

{{< img src="/administrators_guide/unified_service_tagging-3.png" alt="Diagram of Unified Service tagging with the 3 reserved tags: Service, Env, Version" style="width:90%;">}}

### Access control

At the architectural design level, there are two main areas of access control within Datadog: organization structure, and  [role-based access control (RBAC)][4].

#### Multi-Organizational Structure

Larger Datadog customers often have more than one Datadog installation. This is typically used by managed service providers that have customers which should not have access to each others' data. In some cases, full isolation within a single company is necessary. To accommodate this topology, [multiple organizational accounts][5] can be managed together, for example, so you can view total usage at the parent level, while remaining completely separate technologically. Child organizations should be managed from a single parent organization account. 

#### RBAC

Datadog role-based access control can connect to your existing SAML authentication service. SAML group-mappings can be built against the Datadog default roles and team objects. Datadog provides three default roles, which you can augment to model the complexity of your own AD/LDAP Roles. You can also set up [service accounts][6] for non-interactive purposes like [API and App Key][7] ownership, separating user activity from system tasks. Granular permissions set the access and protections you need.  

As an additional layer, [Teams][8] lets you set up flexible, informal, and ad-hoc groups that users can join or be added to. The notion of Teams carries throughout Datadog products.

**Recommendations:**

- Establish a specific plan for building out Datadog user roles.    
- Leverage service accounts for API key administration
- Explore Teams to link resources such as dashboards, services, monitors, and incidents to a group of users.

## Product best practices

### APM

APM depends on the application of Unified Service Tagging. These tags are pivotal to the operational experience, and are also useful for enabling correlation across your telemetry data. This is how Datadog can help determine the owner for a random Java process it discovers.  
Usually, the default APM setup is sufficient for most use cases, but if for example you want to change sampling rates or to customize other APM configurations:    

**Recommendations:** 
- Identify the services to instrument and determine whether they are host-based, containerized, or serverless.
- Determine the method available for instrumenting your services in Datadog, depending on the language used or their runtime environment. These methods range from single-step to manual instrumentation.
- Review the [ingestion controls][9] documentation.  
- Configure your sampling rate with [Remote Configuration][10] to scale your organization's trace ingestion according to your needs, without needing to restart your Agent. See [sampling rate use cases][11] for more information.  
- Ensure [Unified Service Tagging][12] is applied, and review [span tag semantics][13].
- Opt in to [inferred service dependencies][51] to allow your service names to be automatically detected from span attributes.

### Log Management

Log Management capabilities allow you and your teams to diagnose and fix your infrastructure issues. With [Logging without Limits™][14] you can create tunable log collection patterns and  extract information from your log data into custom metrics. You can also be alerted to critical errors in your logs, without needing to index (that is, store) them.

{{< img src="/administrators_guide/logging_without_limits.png" alt="Logging without Limits diagram" style="width:90%;">}}

Datadog's log index architecture is a distributed, timeseries, columnar store that is optimized for serving large scan and aggregation queries. See [Introducing Husky][47] and [Husky Deep Dive][48] for more information about Datadog's logging architecture. 

The logging platform can be configured with many layers of logs storage. Each has its own use-cases outlined here:
|  | Data captured | Retention | Retrieval to Datadog | Cost Driver |
| :---- | :---- | :---- | :---- | :---- |
| Ignored | No | None | None | NA |
| [Ingested][15] | Logs-to-Metrics | 15m in LiveTail | None | Volume |
| [Archive][16] | Upon Rehydrate | Infinite | Slow | Volume |
| [Forward Logs][17] | Logs-to-Metrics | Determined by Target | None | Volume |
| [Index][18] | Yes | 3,7,15,30 days | Immediate | Volume & Message Count |
| [Flex Logs][19] | Yes\* |  | Rapid | Retrieval Volume |

\* Flex logs capability does not include monitors/alerting and Watchdog. However, you can still perform log-to-metrics on the ingestion stream before logs are indexed (in either standard or flex) and use those metrics in monitors. Correlation with other telemetry, such as  traces, is supported.

With these base functions, you can ingest and monitor logs for some of the following use-cases:

Log format normalization  
: Centralized control of date/time, value replacement, and referenced lookup

Global Sensitive Data and Personally Identifiable Information (PII) Management
: Personally Identifiable Information (PII) and Sensitive Data Scanner (SDS) are scrubbed first.

Routing and forwarding 
: One centralized UI to send logs to index, archive, or forwarding destination.  

Cost-effective value capture 
: Malleable log field definition, and high volume/low value distillation.  

Global log archive 
: Catch-all log archiver.  

Global SIEM 
: All logs are tested for security at ingestion as a pre-processor

**Recommendations:**  
- Determine the method to ship your logs to Datadog, either directly to the Datadog logs URL intake endpoints, or from tools like Fluentbit, Syslog, or Logstash. 
- Fine-tune your log ingestion plan and review best practices for log management
- Understand [Logging without Limits][14]™ Identify the status of your most logged services, observe high volume logging patterns, and create log pattern exclusion filters.
- Configure [log archives][16].

### Real User Monitoring

Real User Monitoring and Session Replay give granular insights into what an end-user of your service or application is experiencing. Install RUM on applications with high value sessions, where the data can be used to make meaningful changes. Session Replay provides a visual representation that is invaluable for troubleshooting issues observed by users. You can track actual customer experience, and is most valuable in production environments.    

**Recommendations:** 

- Identify the websites, mobile application screens, user actions, and frontend code that is critical to your business to track.
- Deploy RUM and Session Replay to production and near-production environments.
- [Discard front-end errors][21].  
- Configure your [RUM sampling rate][22]. 

### Synthetic monitoring

Synthetic Monitoring is a full synthetic testing suite, including testing for browser applications, mobile apps, and APIs. Synthetic test results can be linked back to the application behavior it generated, and from there, into the database, message queues, and downstream services.  

**Recommendations:**

- Identify the API endpoints and user journeys that are central to your business and test those frequently.
- Develop a roadmap of business transactions to test.
- Use Synthetics in conjunction with [APM and RUM][49].
- Review [Synthetics Consumption Considerations][23]  
- Reduce test maintenance by using [sub-tests][24].
- Make intentional choices in test location selection. Test from where your customers actually are.     
- Use the [HTTP Check][25] or [TCP check][50] to monitor SSL certificate expiration or basic uptime.  

## Integrations

You can use some of the more than {{< translate key="integration_count" >}} integrations to bring together all of the metrics and logs from your infrastructure, to gain insights into an entire observability system.The integrations, either SaaS-based or Agent-based, collect metrics for monitoring within Datadog. Host-based integrations are configured with yaml files that live in the conf.d directory, and container-based integrations are configured with metadata such as annotations or labels. 

There are different types of integrations in Datadog, and the order in which they are presented here is the order Datadog recommends for their installation.

| Category                                      | Description                                                                                                                                                                                                                                   |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cloud Technologies ([AWS][52], [Google Cloud][53], [Azure][54], etc)  | These integrations use provisioned credentials to scrape monitoring endpoints for metrics. Fine-tune these to ingest only desired telemetry.                                                                                                  |
| Incident Response ([Slack][55], [Jira][56], [PagerDuty][57], etc)     | These integrations send notifications when events occur and are vital for establishing an efficient alerting system.                                                                                                                          |
| Infrastructure ([orchestration][58], [operating system][59], [network][60]) | These integrations serve as the foundational components for monitoring your infrastructure, gathering both metrics and logs.                                                                                                               |
| Data Layers ([data stores][61], [message queues][62], etc)      | These integrations usually query internal DB metrics tables, so this usually requires a database administrator to provide access for the Agent.                                                                                              |
| Development ([automation][63], [languages][64], [source control][65]) | These integrations push metrics to Datadog and require configuration on their end. Some may require DogStatsD to ship metrics.                                                                                                               |
| Security and Compliance ([Okta][66], [Open Policy Agent][67])   | These integrations enable you to verify compliance with your standards.                                                                                                     |

**Recommendations**:

- Start collecting metrics on your projects as early in the development process as possible.
- Installed Agents automatically have system and NTP integrations running and can autodetect supported technologies on the host. ([Live processes](#live-processes) must be enabled for this functionality)
- You can choose from the above list what you would like to monitor. If there are services you want to monitor that do not have an integration, you can explore [Live processes](#live-processes), [Universal Services Monitoring][68], a [process integration][69], or a [custom check][70].  

## Additional resources

You've achieved some important wins and adopted best practices with APM, RUM, Synthetic Monitoring and Logs. Some additional resources that are important when planning your installation phase are outlined below.

### Live processes 

Use [Live processes][26] to view all of your running processes in one place. For example, see PID-level information of a running Apache process, to help you understand and troubleshoot transient issues. Additionally, you can query for processes running on a specific host, in a specific availability zone, or running a specific workload. [Configure][27] live processes on your hosts, containers, or AWS ECS Fargate instances to take advantage of this feature.

### Availability, latency, and SSL expiration 

Web server operations depend on the network availability of ports, the validity of SSL certificates, and low latencies. Install the [HTTP_Check][25] to monitor local or remote HTTP endpoints, detect bad response codes (such as 404), and use Synthetic API tests to identify soon-to-expire [SSL certificates][71].

### Network Monitoring

Web servers are almost always inter-connected with other services through a network fabric that is vulnerable to drops and can result in re-transmits. Use Datadog's [network integration][28] and enable [Network Performance Monitoring][29] to gain visibility into your network traffic between services, containers, availability zones, and other tags on your infrastructure.

## Platform services

Datadog infrastructure monitoring comes with  additional products that you can use to maximize observability of your environments.

### Service Catalog

[Service catalog][30] shows at glance which of your services were deployed most recently, or have not been deployed for a long time. which services are reporting the most errors, and whether they have on-going incidents, and much more.

Service Catalog also helps you evaluate the coverage of your observability setup. As you continue your roll out, you may check in on the Setup Guidance tab of each of your services, to ensure that they have the expected configurations:

{{< img src="/administrators_guide/service_catalog_2.png" alt="Service Catalog home screen" style="width:90%;">}}

You can add components that you aren't planning on monitoring immediately, such as cron jobs or libraries, to create a comprehensive view of your system, and to mark team members who are responsible for these components ahead of the next phase of your Datadog rollout.  

### Resource Catalog

Use the [Resource Catalog][46] to view key resource information such as metadata, ownership, configurations, relationships between assets, and active security risks. It is the central hub of all of your infrastructure resources. Resource Catalog offers visibility into infrastructure compliance, facilitating good tagging practices, reducing application risks by identifying security vulnerabilities, providing engineering leadership with a high-level view of security practices, and allowing resource export for record-keeping or auditing.

You can use the Resource Catalog in a variety of contexts, including:

- Understanding the team ownership of resources and finding orphaned ones to clean up.
- Planning upgrades of resources that are running deprecated versions.
- Accessing configuration information and other metadata to speed up incident response.
- Maintaining your security posture by finding and resolving misconfigurations and vulnerabilities.

### API Catalog 

Use [API Catalog][33] for resource endpoint-specific categorization, performance, reliability, and ownership of all your API endpoints in one place.

### Event Management 

Without any additional setup, [Event management][31] can show third-party event statuses, events generated from the Agent and installed integrations. Datadog Event Management centralizes third-party events, such as alerts and change events. Datadog also automatically creates events from various products including monitors and Error Tracking. You can also use Event Management to send monitor alerts and notifications based on event queries.

### Error Tracking 

See errors where they happen with Datadog's [Error Tracking][32]. Error Tracking can ingest errors from APM, Log Management, and Real User Monitoring to debug issues faster.

### Fleet Automation  

Centrally administer and manage all of your Datadog Agents with [Fleet Automation][34]. Fleet Automation can identify which Agents need upgrading, send a flare to support, and help in the task of disabling or rotating API keys.

{{< img src="/administrators_guide/fleet_automation.png" alt="Fleet Management home screen" style="width:90%;">}}

### Remote Configuration

Use Datadog's [Remote Configuration][35] (enabled by default), to remotely configure and change the behavior of Datadog components (for example, Agents, tracing libraries, and Observability Pipelines Worker) deployed in your infrastructure. See [supported products and capabilities][36] for more information.

### Notebooks 

Use Datadog [Notebooks][37] to share with team members to aid in troubleshooting investigations or incidents.

## Optimizing data collection 

Datadog collects many things in your environments, so it is important to limit the amount of collection points and establish guard rails. In this section, you'll learn the mechanisms that control the telemetry collection, and discuss how you can codify your organization's needs.

### Infrastructure

Datadog interacts with the monitoring API of HyperVisor managers (Hyper-V, vSphere, PCF), container schedulers (Kubernetes,Rancher, Docker), and public cloud providers (AWS, Azure, GCP). The platform to [autodiscover][38] resources (pods, VMs, EC2s, ALBs, AzureSQL, GCP blobs) within those environments. It is important to limit the number of monitored resources, because they have billing implications.

**Recommendations**:   

Enable resource collection for [AWS][39] and [GCP][44] to view an inventory of resources, as well as cost and security insights. Additionally, limit metric collection for your [Azure resources][40] and also in your [containerized][45] environments.

## Service Tiers

During the planning phase, it is common to realize that not every instance of observability is as important as others. Some footprints are mission-critical, while others are not. For this reason, it is useful to devise patterns for coverage levels, and which environments you want to monitor with Datadog. For example, a production environment might be monitored at every level, but a development instance of the same application might only have the developer-focused tooling.

**Recommendations**:

- Establish estimates of service tiers early on. They do not need to be precise at first, but will be useful as adoption scales up.

### Software Development Lifecycle

To begin mapping out your installation patterns, use the information you gathered from the [scoping exercise](#scoping-exercise), combine it with the [Datadog 101][7] training, and develop a plan of action. Consider the following example, and modify it  to suit your organization's needs.The example outlines an installation pattern from the dimension of SDLC environment (dev, qa, stage, prod), and you can customize it to your standards and conditions. Begin setting expectations within your own Datadog user base what "Standard Datadog installation" means. 

|  | Dev | QA | Staging | Prod |
| :---- | :---- | :---- | :---- | :---- |
| **APM** | Deny/Allow | Allow | Allow | Allow |
| **Synthetics** | Deny | Deny/Allow | Allow | Allow |
| **Logs** | Allow | Allow | Allow | Allow |
| **RUM** | Deny | Deny/Allow |  Allow | Allow |
| **DBM** | Deny/Allow | Deny/Allow | Allow | Allow |
| **Live Processes** | Deny | Deny/Allow | Allow | Allow |
|  |  |  |  |  |

**Recommendations** :
Not every tool is fit for every job. Evaluate the Datadog product use cases, and specifically match them to your needs. Consider the levels of SDLC, application importance, and Datadog product purpose.

## Summary

It is important to develop and plan a realistic course through the installation of Datadog. In this section you learned the planning and best practices phase, and at this stage, your Datadog footprint is set up for success. You identified and assembled your knowledge base and team members, developed your installation models, planned some optimizations, and compiled a list of best practices for some of our core products. These foundations assist you in the next phases of Datadog installation: build and run.  

## Next Steps

Create a detailed roll-out methodology in the [build][41] phase by focusing on the construction of Datadog itself, iterate on your environment, establish some internal support mechanisms, and prepare for production.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
[2]: https://docs.datadoghq.com/getting_started/tagging/
[3]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging
[4]: https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication
[5]: https://docs.datadoghq.com/account_management/multi_organization/
[6]: https://docs.datadoghq.com/account_management/org_settings/service_accounts/
[7]: https://docs.datadoghq.com/account_management/api-app-keys/
[8]: https://docs.datadoghq.com/account_management/teams/
[9]: https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/
[10]: https://docs.datadoghq.com/tracing/trace_pipeline/ingestion_controls/\#managing-ingestion-for-all-services-at-the-agent-level
[11]: https://docs.datadoghq.com/tracing/guide/ingestion_sampling_use_cases/
[12]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/?tab=kubernetes
[13]: https://docs.datadoghq.com/tracing/trace_collection/tracing_naming_convention/
[14]: https://docs.datadoghq.com/logs/guide/getting-started-lwl/
[15]: https://docs.datadoghq.com/logs/log_configuration/logs_to_metrics/
[16]: https://docs.datadoghq.com/logs/log_configuration/archives/?tab=awss3
[17]: https://docs.datadoghq.com/logs/log_configuration/forwarding_custom_destinations/?tab=http
[18]: https://docs.datadoghq.com/logs/log_configuration/indexes
[19]: https://docs.datadoghq.com/logs/log_configuration/flex_logs/
[20]: https://docs.datadoghq.com/logs/guide/best-practices-for-log-management/
[21]: https://docs.datadoghq.com/real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event
[22]: https://docs.datadoghq.com/real_user_monitoring/guide/best-practices-for-rum-sampling/
[23]: https://www.datadoghq.com/pricing/?product=synthetic-testing--monitoring\#synthetic-testing--monitoring-common-questions
[24]: https://docs.datadoghq.com/synthetics/browser_tests/advanced_options/#subtests
[25]: https://docs.datadoghq.com/integrations/http_check/
[26]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows
[27]: https://docs.datadoghq.com/infrastructure/process/?tab=linuxwindows\#installation
[28]: https://docs.datadoghq.com/integrations/network/
[29]: https://docs.datadoghq.com/network_monitoring/performance/
[30]: https://docs.datadoghq.com/service_catalog/
[31]: https://docs.datadoghq.com/service_management/events/
[32]: https://docs.datadoghq.com/error_tracking/
[33]: https://docs.datadoghq.com/api_catalog/
[34]: https://docs.datadoghq.com/agent/fleet_automation/
[35]: https://docs.datadoghq.com/agent/remote_config/
[36]: https://docs.datadoghq.com/agent/remot\_config/?tab=configurationyamlfile\#supported-products-and-feature-capabilities
[37]: https://docs.datadoghq.com/notebooks/
[38]: https://docs.datadoghq.com/getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[39]: https://docs.datadoghq.com/account_management/billing/aws/#aws-resource-exclusion
[40]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension\#metric-collection
[41]: /administrators_guide/build
[42]: https://drive.google.com/file/d/1yUuz6fUFkFagNi0cYkpyDa7b2sQLHKD6/view
[43]: /integrations/ping/
[44]: https://docs.datadoghq.com/integrations/google_cloud_platform/?tab=project#resource-change-collection
[45]: /containers/guide/container-discovery-management/?tab=datadogoperator
[46]: /infrastructure/resource_catalog/
[47]: https://www.datadoghq.com/blog/engineering/introducing-husky/
[48]: https://www.datadoghq.com/blog/engineering/husky-deep-dive/
[49]: https://docs.datadoghq.com/real_user_monitoring/platform/connect_rum_and_traces/?tab=browserrum
[50]: https://docs.datadoghq.com/integrations/tcp_check/?tab=host#data-collected
[51]: https://docs.datadoghq.com/tracing/guide/inferred-service-opt-in/?tab=java
[52]: https://docs.datadoghq.com/integrations/amazon_web_services/
[53]: https://docs.datadoghq.com/integrations/google_cloud_platform/
[54]: https://docs.datadoghq.com/integrations/azure/
[55]: https://docs.datadoghq.com/integrations/slack/?tab=datadogforslack
[56]: https://docs.datadoghq.com/integrations/jira/
[57]: https://docs.datadoghq.com/integrations/pagerduty/
[58]: https://docs.datadoghq.com/integrations/#cat-orchestration
[59]: https://docs.datadoghq.com/integrations/#cat-os-system
[60]: https://docs.datadoghq.com/integrations/network/
[61]: https://docs.datadoghq.com/integrations/#cat-data-stores
[62]: https://docs.datadoghq.com/integrations/#cat-message-queues
[63]: https://docs.datadoghq.com/integrations/#cat-automation
[64]: https://docs.datadoghq.com/integrations/#cat-languages
[65]: https://docs.datadoghq.com/integrations/#cat-source-control
[66]: https://docs.datadoghq.com/integrations/okta/
[67]: https://docs.datadoghq.com/integrations/open_policy_agent/
[68]: https://docs.datadoghq.com/universal_service_monitoring/
[69]: https://docs.datadoghq.com/integrations/process/
[70]: https://docs.datadoghq.com/developers/custom_checks/#should-you-write-a-custom-agent-check-or-an-integration
[71]: https://docs.datadoghq.com/synthetics/api_tests/ssl_tests/
