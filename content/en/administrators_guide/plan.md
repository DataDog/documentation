---
title: Plan your Datadog installation
description: Plan out your Datadog installation for success.
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

Setting a clear goal is critical for installing Datadog. However, in a practical world, it is impossible to predict everything you might need at the outset. Product engineers iterate their rollouts and systems operators control their changes, all to control risk. Implementing a large-scale Datadog installation will benefit from standard project management practices. As part of that process, there are certain Datadog elements that you should include. 

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

Datadog is a tool for correlating machine data with the running applications and its physical descriptors. It can cross-reference an individual piece of data against others, regardless of type. Hostname, cloud regions, operating system version, and IP are just some of the automatically applied resource attributes. Additionally, Datadog allows you to generate custom tags such as `cost-code`, `AppName`, `environment`, and `version`.

Datadog's strength lies in its capability to maintain and manage a unified vocabulary and includes built-in data features. [Unified Service Tagging][1] uses reserved tags that enable telemetry correlation across all features of the Datadog platform.

Tags are `key:value` pairs or simple values. They add dimension to application performance data and infrastructure metrics. Before you begin monitoring with Datadog, take advantage of the tagging capabilities that your platforms offer, as Datadog automatically imports these tags through its integrations. The following table is a representation of how `key:value` pairs work and whether the tags are added automatically or manually.

| TAG                  | KEY            | VALUE         |  METHOD     |
|----------------------|----------------|---------------| ---------------|
| env:staging     | env            | staging  | automatic
| component_type:database | component_type | database      | manual
| region:us-west-1 | region | us-west-1      | automatic


The [Getting started with tagging][2] guide is a great place to start with this topic. Here are some additional highlights:

- A service is defined as a single application footprint, something that can be deployed independently.
- Tag values must be consistent. For example, "Production" is different from "Prod".
- Define sources of truth for dynamic tags such as code version.

**Recommendations**:  

- As early as possible, understand [Datadog Unified Service Tagging][2] and develop your tagging scheme.
- Align your infrastructure with your collected tags and automate the tagging process where possible (for example, use git hash values from CI pipelines as version tags through Kubernetes labels). This unifies your data, allowing you to create informative alerts by assigning [owners to services][72] and to pivot between service metrics, logs, and traces.

The following diagram depicts how each of the three reserved tags may look as you are building out your environment:

{{< img src="/administrators_guide/unified_service_tagging_diagram.png" alt="Diagram of Unified Service tagging with the 3 reserved tags: Service, Env, Version" style="width:90%;">}}

### Access control

At the architectural design level, there are two main areas of access control within Datadog: organization structure, and  [role-based access control (RBAC)][4].

#### RBAC

Datadog role-based access control can connect to your existing SAML authentication service. SAML group-mappings can be built against the Datadog default roles and team objects. Datadog provides three default roles, which you can customize to match the complexity of your own AD/LDAP Roles. You can also set up [service accounts][6] for non-interactive purposes like [API and App Key][7] ownership, to separate user activities from system tasks. Granular permissions set the access and protections you need.  

As an additional layer, [Teams][8] lets you set up flexible, informal, and ad-hoc groups that users can join or be added to. The Teams feature is available throughout Datadog products.

#### Multi-Organizational Structure

Larger Datadog customers often have more than one Datadog installation. This is typically used by managed service providers to ensure that their customers do not have access to one another's data. In some cases, full isolation within a single company is necessary. To accommodate this topology, you can manage [multiple organizational accounts][5]. For example, you can view total usage at the parent level, while remaining completely separate technologically. Child organizations should be managed from a single parent organization account. 

**Recommendations:**

- Establish a specific plan for building out Datadog user roles.    
- Leverage service accounts for API key administration.
- Explore Teams to link resources such as dashboards, services, monitors, and incidents to a group of users.

## Product best practices

### APM

APM depends on the application of Unified Service Tagging. These tags are pivotal to the operational experience, and are also useful for enabling correlation across your telemetry data. This is how Datadog can help determine the owner for a random Java process it discovers.  
Usually, the default APM setup is sufficient for most use cases, but if, for example, you want to change sampling rates or to customize other APM configurations, use the following guidelines.   

**Recommendations:** 
- Identify the services to instrument and determine whether they are host-based, containerized, or serverless.
- Determine the method available for instrumenting your services in Datadog, depending on the language used or their runtime environment. These methods range from single-step to manual [instrumentation][75].
- Review the [ingestion controls][9] documentation.  
- Configure your sampling rate with [Remote Configuration][10] to scale your organization's trace ingestion according to your needs, without needing to restart your Agent. For more information, see [sampling rate use cases][11].  
- Ensure [Unified Service Tagging][12] is applied, and review [span tag semantics][13].
- Opt in to [inferred service dependencies][51] to enable automatic detection of your service names from span attributes.

### Log Management

Log Management capabilities allow you and your teams to diagnose and fix your infrastructure issues. [Logging without Limits™][14] enables you to create tunable log collection patterns and extract information from your log data into custom metrics. You can also receive alerts about critical errors in your logs, without needing to index your logs.

{{< img src="/administrators_guide/logging_without_limits.png" alt="Logging without Limits diagram" style="width:90%;">}}

Datadog's log index architecture is a distributed, timeseries, columnar store that is optimized for serving large scan and aggregation queries. See [Introducing Husky][47] and [Husky Deep Dive][48] for more information about Datadog's logging architecture. 

The logging platform can be configured with many layers of logs storage. Each has its own use-cases outlined here:
|  | Data captured | Retention | Retrieval to Datadog | Cost Driver |
| :---- | :---- | :---- | :---- | :---- |
| Ignored | No | None | None | N/A |
| [Ingested][15] | Logs-to-metrics | 15m in LiveTail | None | Volume |
| [Archive][16] | Upon rehydrate | Infinite | Slow | Volume |
| [Forward logs][17] | Logs-to-metrics | Determined by target | None | Volume |
| [Index][18] | Yes | 3,7,15,30 days | Immediate | Volume & message count |
| [Flex Logs][19] | Yes\* | [Storage tiers][74]  | Rapid | Retrieval volume |

\* Flex Logs capability does not include monitors/alerting and Watchdog. However, you can still perform log-to-metrics on the ingestion stream before logs are indexed (in either standard or flex) and use those metrics in monitors. Correlation with other telemetry, such as traces, is supported.

With these base functions, you can ingest and monitor logs for some of the following use-cases:

Log format normalization  
: Centralized control of date/time, value replacement, and referenced lookup.

Global Sensitive Data and Personally Identifiable Information (PII) Management
: Personally Identifiable Information (PII) and Sensitive Data Scanner (SDS) are scrubbed first.

Routing and forwarding 
: One centralized UI to send logs to index, archive, or forwarding destination.  

Cost-effective value capture 
: Malleable log field definition, and high volume/low value distillation.  

Global log archive 
: Catch-all log archiver.  

Global SIEM 
: All logs are tested for security at ingestion as a pre-processor.

**Recommendations:**  
- Determine the method to ship your logs to Datadog, either directly to the Datadog logs URL intake endpoints, or from tools like Fluentbit, Syslog, or Logstash. 
- Fine-tune your log ingestion plan and review best practices for log management.
- Understand [Logging without Limits][14]™ Identify the status of your most logged services, observe high volume logging patterns, and create log pattern exclusion filters.
- Configure [log archives][16].

### Real User Monitoring

Real User Monitoring and Session Replay give detailed insights into the experiences of your service or application end-user. Install RUM on applications with high value sessions to leverage the data for meaningful changes. Session Replay provides a visual representation that is invaluable for troubleshooting issues observed by users. You can track the actual customer experience, which is most valuable in production environments.    

**Recommendations:** 

- Identify the websites, mobile application screens, user actions, and frontend code that is critical to your business to track.
- Deploy RUM and Session Replay to production and near-production environments.
- [Discard front-end errors][21].  
- Configure your [RUM sampling rate][22]. 

### Synthetic Monitoring

Synthetic Monitoring is a full synthetic testing suite, which includes testing for browser applications, mobile apps, and APIs. Synthetic test results can be linked back to the application behavior it generated, and from there, into the database, message queues, and downstream services.  

**Recommendations:**

- Identify the API endpoints and user journeys that are central to your business and test those frequently.
- Develop a roadmap of business transactions to test.
- Use Synthetic Monitoring in conjunction with [APM and RUM][49].
- Review [Synthetic monitoring consumption considerations][23].
- Reduce test maintenance by using [subtests][24].
- Make intentional choices in test location selection. Test from where your customers actually are.     
- Use the [HTTP Check][25] or [TCP check][50] to monitor SSL certificate expiration or basic uptime.  

## Integrations

You can use Datadog's {{< translate key="integration_count" >}}+ integrations to bring together all of the metrics and logs from your infrastructure, to gain insights into an entire observability system. The integrations, either SaaS-based or Agent-based, collect metrics to monitor within Datadog. Host-based integrations are configured with yaml files that live in the `conf.d` directory, and container-based integrations are configured with metadata such as annotations or labels. 

There are different types of integrations in Datadog, and the order in which they are presented here is the order Datadog recommends for their installation.

| Category                                      | Description                                                                                                                                                                                                                                   |
|-----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Cloud Technologies ([AWS][52], [Google Cloud][53], [Azure][54])  | These integrations use provisioned credentials to scrape monitoring endpoints for metrics. Fine-tune these to ingest only desired telemetry.                                                                                                  |
| Incident Response ([Slack][55], [Jira][56], [PagerDuty][57])     | These integrations send notifications when events occur and are vital for establishing an efficient alerting system.                                                                                                                          |
| Infrastructure ([orchestration][58], [operating system][59], [network][60]) | These integrations serve as the foundational components for monitoring your infrastructure, gathering both metrics and logs.                                                                                                               |
| Data Layers ([data stores][61], [message queues][62])      | These integrations usually query internal DB metrics tables, so this usually requires a database administrator to provide access for the Agent.                                                                                              |
| Development ([automation][63], [languages][64], [source control][65]) | These integrations push metrics to Datadog and require configuration on their end. Some may require DogStatsD to ship metrics.                                                                                                               |
| Security and Compliance ([Okta][66], [Open Policy Agent][67])   | These integrations enable you to verify compliance with your standards.                                                                                                     |

**Recommendations**:

- Start collecting metrics on your projects as early in the development process as possible.
- Installed Agents automatically have system and NTP integrations running and can autodetect supported technologies on the host. ([Live processes](#live-processes) must be enabled for this functionality)
- You can choose from the above list what you would like to monitor. If there are services you want to monitor that do not have an integration, you can explore [Live processes](#live-processes), [Universal Services Monitoring][68], a [process integration][69], or a [custom check][70].  

## Additional resources

You've achieved some important wins and adopted best practices with APM, RUM, Synthetic Monitoring and Log Management. Some additional resources that are important when planning your installation phase are outlined below.

### Live processes 

Use [Live processes][26] to view all of your running processes in one place. For example, see PID-level information of a running Apache process, to help you understand and troubleshoot transient issues. Additionally, you can query for processes running on a specific host, in a specific availability zone, or running a specific workload. [Configure][27] live processes on your hosts, containers, or Amazon ECS Fargate instances to take advantage of this feature.

### Availability, latency, and SSL expiration 

Web server operations depend on the network availability of ports, the validity of SSL certificates, and low latencies. Install the [HTTP_Check][25] to monitor local or remote HTTP endpoints, detect bad response codes (such as 404), and use Synthetic API tests to identify soon-to-expire [SSL certificates][71].

### Cloud Network Monitoring

Web servers are almost always inter-connected with other services through a network fabric that is vulnerable to drops and can result in re-transmits. Use Datadog's [network integration][28] and enable [Cloud Network Monitoring][29] to gain visibility into your network traffic between services, containers, availability zones, and other tags on your infrastructure.

## Platform services

Datadog infrastructure monitoring comes with additional products that you can use to maximize observability of your environments.

### Software Catalog

[Software Catalog][30] provides an overview of services, showing which were recently deployed, which haven't been deployed for a while, which services report the most errors, and those with on-going incidents, and much more.

Software Catalog also helps you evaluate the coverage of your observability setup. As you continue your roll out, you can check in on the Setup Guidance tab of each of your services, to ensure that they have the expected configurations:

{{< img src="/administrators_guide/software_catalog_2.png" alt="Software Catalog home screen" style="width:90%;">}}

You can add components that you aren't planning on monitoring immediately, such as cron jobs or libraries, to create a comprehensive view of your system, and to mark team members who are responsible for these components ahead of the next phase of your Datadog rollout.

Refer to the [Endpoints list][33] to categorize, monitor performance and reliability, and manage ownership of your API endpoints.

### Resource Catalog

Use [Resource Catalog][46] to view key resource information such as metadata, ownership, configurations, relationships between assets, and active security risks. It is the central hub of all of your infrastructure resources. Resource Catalog offers visibility into infrastructure compliance, promotes good tagging practices, reduces application risks by identifying security vulnerabilities, provides engineering leadership with a high-level view of security practices, and allows resource export for record-keeping or auditing.

You can use Resource Catalog in a variety of contexts, including:

- Understanding the team ownership of resources and finding orphaned ones to clean up.
- Planning upgrades of resources that are running deprecated versions.
- Accessing configuration information and other metadata to speed up incident response.
- Maintaining your security posture by finding and resolving misconfigurations and vulnerabilities.

### Event Management 

Without any additional setup, [Event management][31] can show third-party event statuses, events generated from the Agent and installed integrations. Datadog Event Management centralizes third-party events, such as alerts and change events. Datadog also automatically creates events from various products including monitors and Error Tracking. You can also use Event Management to send monitor alerts and notifications based on event queries.

### Error Tracking 

See errors where they happen with Datadog's [Error Tracking][32]. Error Tracking can ingest errors from APM, Log Management, and Real User Monitoring to debug issues faster.

### Fleet Automation  

Centrally administer and manage all of your Datadog Agents with [Fleet Automation][34]. Fleet Automation can identify which Agents need upgrading, send a flare to support, and help in the task of disabling or rotating API keys.

{{< img src="/administrators_guide/fleet_automation.png" alt="Fleet Management home screen" style="width:90%;">}}

### Remote Configuration

Use Datadog's [Remote Configuration][35] (enabled by default), to remotely configure and change the behavior of Datadog components (for example, Agents, tracing libraries, and Observability Pipelines Worker) deployed in your infrastructure. For more information, see [supported products and capabilities][36].

### Notebooks 

Use Datadog [Notebooks][37] to share information with team members and to aid troubleshooting investigations or incidents.

## Optimizing data collection 

Datadog collects many things in your environments, so it is important to limit the amount of collection points and establish guard rails. In this section, you'll learn the mechanisms that control the telemetry collection, and discuss how you can codify your organization's needs.

### Infrastructure

Datadog interacts with the monitoring API of HyperVisor managers (Hyper-V, vSphere, PCF), container schedulers (Kubernetes,Rancher, Docker), and public cloud providers (AWS, Azure, GCP). The platform to [autodiscover][38] resources (pods, VMs, EC2s, ALBs, AzureSQL, GCP blobs) within those environments. It is important to limit the number of monitored resources, because they have billing implications.

**Recommendations**:   

Enable resource collection for [AWS][39] and [GCP][44] to view an inventory of resources, as well as cost and security insights. Additionally, limit metric collection for your [Azure resources][40] and your [containerized][45] environments.

## Service Tiers

During the planning phase, you may find that not all instances of observability are equally important. Some are mission-critical, while others are not. For this reason, it is useful to devise patterns for coverage levels, and which environments you want to monitor with Datadog. For example, a production environment might be monitored at every level, but a development instance of the same application might only have the developer-focused tooling.

**Recommendations**:

- Establish estimates of service tiers early on. They do not need to be precise at first, but will be useful as adoption scales up.

### Software Development Lifecycle

To begin mapping out your installation patterns, combine the information you gathered from the [scoping exercise](#scoping-exercise) with the [Datadog 101][73] training, and develop a plan of action. Consider the following example, and modify it to suit your organization's needs. The example outlines an installation pattern from the dimension of SDLC environment (dev, qa, stage, prod), and you can customize it to your standards and conditions. Begin setting expectations within your own Datadog user base what "Standard Datadog installation" means. 

|  | Dev | QA | Staging | Prod |
| :---- | :---- | :---- | :---- | :---- |
| **APM** | Deny/Allow | Allow | Allow | Allow |
| **Synthetic Monitoring** | Deny | Deny/Allow | Allow | Allow |
| **Log Management** | Allow | Allow | Allow | Allow |
| **RUM** | Deny | Deny/Allow |  Allow | Allow |
| **DBM** | Deny/Allow | Deny/Allow | Allow | Allow |
| **Live Processes** | Deny | Deny/Allow | Allow | Allow |
|  |  |  |  |  |

**Recommendations** :
Not every tool suits every job. Evaluate Datadog's product use cases and match them with your needs. Consider the SDLC levels, application importance, and the purpose of each Datadog product.

## Summary

It is important to develop and plan a realistic course for installing Datadog. In this section, you learned about the planning and best practices phase, setting your Datadog footprint up for success. You identified and assembled your knowledge base and team members, developed your installation models, planned optimizations, and compiled a list of best practices for core products. These foundations prepare you for the next phases of Datadog installation: build and run.  

## Next Steps

Create a detailed roll-out methodology in the [build][41] phase by focusing on the construction of Datadog itself, iterate on your environment, establish some internal support mechanisms, and prepare for production.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: /getting_started/tagging/unified_service_tagging/
[2]: /getting_started/tagging/
[3]: /getting_started/tagging/unified_service_tagging
[4]: /account_management/rbac/?tab=datadogapplication
[5]: /account_management/multi_organization/
[6]: /account_management/org_settings/service_accounts/
[7]: /account_management/api-app-keys/
[8]: /account_management/teams/
[9]: /tracing/trace_pipeline/ingestion_controls/
[10]: /tracing/trace_pipeline/ingestion_controls/#managing-ingestion-for-all-services-at-the-agent-level
[11]: /tracing/guide/ingestion_sampling_use_cases/
[12]: /getting_started/tagging/unified_service_tagging/?tab=kubernetes
[13]: /tracing/trace_collection/tracing_naming_convention/
[14]: /logs/guide/getting-started-lwl/
[15]: /logs/log_configuration/logs_to_metrics/
[16]: /logs/log_configuration/archives/?tab=awss3
[17]: /logs/log_configuration/forwarding_custom_destinations/?tab=http
[18]: /logs/log_configuration/indexes
[19]: /logs/log_configuration/flex_logs/
[20]: /logs/guide/best-practices-for-log-management/
[21]: /real_user_monitoring/guide/enrich-and-control-rum-data/?tab=event
[22]: /real_user_monitoring/guide/best-practices-for-rum-sampling/
[23]: https://www.datadoghq.com/pricing/?product=synthetic-testing--monitoring#synthetic-testing--monitoring-common-questions
[24]: /synthetics/browser_tests/advanced_options/#subtests
[25]: /integrations/http_check/
[26]: /infrastructure/process/?tab=linuxwindows
[27]: /infrastructure/process/?tab=linuxwindows\#installation
[28]: /integrations/network/
[29]: /network_monitoring/cloud_network_monitoring/
[30]: /software_catalog/
[31]: /service_management/events/
[32]: /error_tracking/
[33]: /software_catalog/endpoints/
[34]: /agent/fleet_automation/
[35]: /remote_configuration
[36]: /remote_configuration#supported-products-and-features
[37]: /notebooks/
[38]: /getting_started/containers/autodiscovery/?tab=adannotationsv2agent736
[39]: /account_management/billing/aws/#aws-resource-exclusion
[40]: /integrations/guide/azure-native-integration/#metrics-and-logs
[41]: /administrators_guide/build
[42]: https://drive.google.com/file/d/1yUuz6fUFkFagNi0cYkpyDa7b2sQLHKD6/view
[43]: /integrations/ping/
[44]: /integrations/google_cloud_platform/?tab=project#resource-changes-collection
[45]: /containers/guide/container-discovery-management/?tab=datadogoperator
[46]: /infrastructure/resource_catalog/
[47]: https://www.datadoghq.com/blog/engineering/introducing-husky/
[48]: https://www.datadoghq.com/blog/engineering/husky-deep-dive/
[49]: /real_user_monitoring/correlate_with_other_telemetry/apm?tab=browserrum
[50]: /integrations/tcp_check/?tab=host#data-collected
[51]: /tracing/services/inferred_services
[52]: /integrations/amazon_web_services/
[53]: /integrations/google_cloud_platform/
[54]: /integrations/azure/
[55]: /integrations/slack/?tab=datadogforslack
[56]: /integrations/jira/
[57]: /integrations/pagerduty/
[58]: /integrations/#cat-orchestration
[59]: /integrations/#cat-os-system
[60]: /integrations/network/
[61]: /integrations/#cat-data-stores
[62]: /integrations/#cat-message-queues
[63]: /integrations/#cat-automation
[64]: /integrations/#cat-languages
[65]: /integrations/#cat-source-control
[66]: /integrations/okta/
[67]: /integrations/open_policy_agent/
[68]: /universal_service_monitoring/
[69]: /integrations/process/
[70]: /developers/custom_checks/#should-you-write-a-custom-agent-check-or-an-integration
[71]: /synthetics/api_tests/ssl_tests/
[72]: /software_catalog/service_definitions/
[73]: https://learn.datadoghq.com/courses/dd-101-sre
[74]: /logs/log_configuration/flex_logs/#configure-storage-tiers
[75]: /tracing/trace_collection/
