---
title: Plan your Datadog implementation
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "/getting_started/tagging/unified_service_tagging/"
  tag: "Documentation"
  text: "Getting Started with Unified Service Tagging"
- link: "/getting_started/tracing/"
  tag: "Documentation"
  text: "Getting Started with APM Tracing"
---

## Design

### Sizing exercise

Defining a clear end goal is essential when starting a significant product implementation. However, it's impractical to know all requirements from the beginning. Product engineers iterate deployments, and systems operations manage changes to mitigate risk. Similarly, a large-scale Datadog deployment benefits from standard project management practices. Certain Datadog elements should be included in this process. Survey outlines are useful for assessing and planning your needs.

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

## General best practices 

Datadog has specialized tool-tips designed for every kind of material. After completing the sizing exercise, you will understand the types of technologies you're working with, and can start mapping those to core products in Datadog. The first crucial step in your deployment is setting up and configuring proper tagging. Large-scale applications often run across multiple ephemeral containers or instances, and without proper tagging, monitoring these complex systems can become ineffective.

### Resource tagging 

Datadog is a tool for correlating telemetry data from multiple sources based on related dimensions. Those dimensions are defined by tags. This allows, for example, comparison between database host metrics, with web server host thread pools, with logs from both hosts, all in a single view.

Hostname, cloud regions, OS version, and IP, are just some of the machine-generated unified vocabulary. Additionally, Datadog allows you to generate custom data terms such as cost-code, AppName, environment, and version.

The real power of Datadog is its ability to contain and manage this unified vocabulary. The Datadog platform also has out-of-the-box data that is included. The application of the unified vocabulary concept, its management system, and Datadog's out-of-the-box options are combined into a concept called [Unified Service Tagging][1].

It is important to understand that tags are essentially `key:value` pairs or simple values such as "file-server" or "database", which add dimension to application performance data and infrastructure metrics. Before you begin monitoring with Datadog, it's important to take advantage of the tagging capabilities that your platforms offer as Datadog automatically imports these tags through its integrations.

For example, [Getting started with tagging][2], as well as Datadog's e-book on [Tagging Best Practices][42], is a great place to start with this topic, but here are some additional highlights:

- A service is defined as a single application footprint, something with its own code repository.  
- Abbreviations and acronyms can be simplified, for example "Prod" != "Production".  
- Take time to define sources of truth for dynamic tags such as code version.

**Recommendation**:  
As early as possible, understand [Datadog Unified Service Tagging][3].  Once developed, you can seamlessly map your infrastructure with your collected tags, unify your data streams to pivot between service metrics, logs and request traces, and assign owners to services to build informative alerts.

{{< img src="/service_owners_guide/unified_service_tagging-3.png" alt="Diagram of Unified Service tagging with the 3 reserved tags: Service, Env, Version" style="width:90%;">}}

### RBAC

At the architectural design level, there are two main areas of access control within Datadog that need to be considered; organizational structure, and internal account [Role-Based Access Control][4].  

#### Multi-Organizational Structure
Larger users often have more than one Datadog account instance. In some cases, full isolation within a single company is necessary. To accommodate this topology, [multiple organizational accounts][5] can be managed together for commercial purposes while remaining completely separate technologically. It is recommended to manage child organizations from a single parent organization account. 

#### Internal Account RBAC
Datadog has a granular system of Role-Based Access Control that can connect to your existing SAML authentication service. SAML group-mappings can be built against the Datadog default roles and team objects. Datadog provides three default roles, however these might not be enough to model complexity of your local AD/LDAP Roles. [Service accounts][6] are available for non-interactive purposes like [API and App Key][7] ownership, separating user activity from system tasks. There are granular permissions that can model the access and protections you need.  

As an additional layer, Datadog offers [Teams][8]. Teams offer an added layer of user grouping designed to be flexible, informal, and ad-hoc. Users can self-join, or be unilaterally added.  Teams are highly integrated into sub-tools of Datadog.

**Recommendations:**

- Establish a specific plan for building out Datadog user roles.    
- Leverage service accounts for API key administration, and explore teams to link resources such as dashboards, services, monitors, and incidents to a group of users.

## Product best practices

**Note**: Not all products and components may be relevant to your use case. Use the table of contents to find products relevant to your infrastructure.

### APM

APM depends critically on the sound application of Unified Service Tagging.  These Unified Service Tags are pivotal to the operational experience, but they are also useful for governance, and for attributing telemetry flows to their backing organizational construction. This is how Datadog can help determine the owner for a random Java process it discovers.    

**Recommendation:** 
- Review the [ingestion controls][9] documentation.  
- Configure your sampling rate with [Remote Configuration][10] to scale your organization’s trace ingestion according to your needs, without needing to restart your Datadog Agent. See [sampling rate use cases][11] for more information.  
- Ensure [Unified Service Tagging][12] is applied, and review [span tag semantics][13].

### Logs

The Datadog log management capabilities are rich, robust, and streamlined to allow you and your teams to quickly diagnose and fix your infrastructure issues. The [Logging without Limits™][14] feature is used to create tunable log collection patterns.  [Logging without Limits][14]™ provides the ability to extract the information from your log data into custom metrics. With Datadog's logs features, it is possible to be alerted to critical errors in your logs, without needing to index them.

{{< img src="/service_owners_guide/logging_without_limits.png" alt="Logging without Limits diagram" style="width:90%;">}}

The primary design consideration for Datadog's log index architecture is a distributed, time-series, columnar store optimized around serving large scan and aggregation queries.  

Due to the robust nature of Datadog's logging platform, it can be configured with many layers of logs storage. Each has its own use-cases outlined here:

|  | Platform Available | Retention | Retrieval to Datadog | Cost Driver |
| :---- | :---- | :---- | :---- | :---- |
| Ignored | No | None | None | NA |
| [Ingested][15] | Logs-to-Metrics | 15m in LiveTail | None | Volume |
| [Archive][16] | Upon Rehydrate | Infinite | Slow | Volume |
| [Forward Logs][17] | Same as Ingested | Determined by Target | None | Volume |
| [Index][18] | Yes | 3,7,15,30 days | Immediate | Volume & Message Count |
| [Flex Logs][19] | Yes\* |  | Rapid | Retrieval Volume |

\* Flex logs capability does not include monitors/alerting and Watchdog, however you can still perform log-to-metrics on the ingestion stream before logs are indexed (in either standard or flex) and use those metrics in monitors. Correlation with other telemetry, e.g. traces/APM, is supported.

These base functions make it easy to ingest and monitor logs for some of the following use-cases:

Log format normalization  
: Centralized control of date/time, value replacement, and referenced lookup.

Global Sensitive Data PII Management  
: PII and SDS are scrubbed first.

Routing and forwarding 
: One centralized UI to send logs to index, archive, or forwarding destination.  

Cost-effective value capture 
: Malleable log field definition, and high volume/low value distillation.  

Global log archive 
: Catch-all log archiver.  

Global SIEM 
: All logs are tested for security at ingestion as a pre-processor

**Recommendations:**   
- Understand [Logging without Limits][14]™ (identify most logged service status, high volume logging patterns, log pattern exclusion filters).  
- Develop a log ingestion plan and review [best practices][20] for log management.  
- Configure [log archives][16].

### Real User Monitoring

Real User Monitoring and Session Replay can give highly granular insights into what an end-user is experiencing. When considering to install RUM, consider installations on high value sessions where the data can be used to make meaningful changes in your environment.  Similarly, the power of Session Replay is tremendous; it serves as "the picture that tells a thousand words" when it comes to troubleshooting issues observed by humans. The highest value of Real User Monitoring and Session Replay comes from tracking actual customer experience, and is most likely of limited value in non-productions scenarios.  

**Recommendations:** 

- [Discard front-end errors][21]  
- Configure your [RUM sampling rate][22]  
- Limit RUM and Session Replay deployments to production and near-production environments.

### Synthetic monitoring

Datadog has a full synthetic application suite, including testing for browser, mobile, and API testing. Datadog synthetic tests can be linked back to the application behavior it generated, and from there, into the database, message queue, and all other downstream services.  

**Recommendations:**

- Review [Synthetics Consumption Considerations][23]  
- Reduce test maintenance by using [sub-tests][24].
- Make rational choices in test location selection. Users are often from different regions around the world. Test from where your customers actually are.    
- Use Synthetics in conjunction with APM and RUM .  
- Define the use cases for Synthetics vs [HTTP Checks][25].  

## Optimizing data collection 

Datadog can collect and observe many things in your environments, however, it is important to limit the amount of collection points and establish guard rails. In this section we will discuss the mechanisms that control the telemetry collection, and discuss how these can be codified into local standards.

### Infrastructure

Datadog interacts with the monitoring API of HyperVisor managers (Hyper-V, vSphere, PCF), container schedulers (K8s, rancher, docker), and public cloud providers(AWS, Azure, GCP).  Datadog's unique ability allows the platform to [autodiscover][38] new objects (pods, VMs, EC2s, ALBs, AzureSQL, GCP blobs) that are created within those environments. It is important to limit the number of monitored objects, as they have billing implications to consider.

The usage of Datadog within these auto-discovered environment types is critical to understand. These include linkages for excluding billable objects for [AWS][39], GCP, [Azure][40], HyperV, PCF, and vSphere.

**Recommendations:**    
For each virtualization framework, define the exclusion methodology. Enumerate specific tags, labels, namespaces, and annotations that will be used for collection control.

### Service levels

During the planning phase, it is common to realize that not every instance of observability is as important as others. Some footprints are mission critical, while others are not. For this reason, it is useful to devise patterns for coverage levels, and which environments you want to monitor with Datadog. For example, a production environment might be monitored at every level, but a development instance of the same application might only have the developer-focused tooling.

**Recommendations:**  
Establish estimates of service levels early on. They do not need to be precise at first, but will be useful as adoption scales up.

## Additional resources

We've highlighted some important wins and best practices with APM, RUM, Synthetic Monitoring, Logs, and Dashboards to help you achieve success in getting started with those products and components. Some additional resources that are important when planning your implementation phase are outlined below.

### Live processes 

[Live processes][26] can be used to view all of your running processes in one place. For example, it can provide PID-level information of a running Apache process, to help you understand and troubleshoot transient issues. Additionally, you can query for processes running on a specific host, in a specific availability zone, or running a specific workload. [Configure][27] live processes on your hosts, containers, or AWS ECS Fargate instances to take advantage of this feature.

### Availability, latency, and SSL expiration 

Web server operations depend on the network availability of ports, the validity of SSL certificates, and low latencies.  Install the [HTTP_Check][25] to monitor local or remote HTTP endpoints, detect bad response codes (such as 404), and identify soon-to-expire SSL certificates. Additionally the [ping][43] check can be utilized to test the reachability of a host and measures the round-trip time for messages sent from the check to the destination host.

### Network Monitoring

Web servers are almost always inter-connected with other services through a network fabric that is vulnerable to drops and can result in re-transmits.  Use Datadog's [network integration][28] and enable [Network Performance Monitoring][29] to gain visibility into your network traffic between services, containers, availability zones, and other tags on your infrastructure.

## Ancillary products

Datadog is a platform of tremendous value. From years of collective experience with customers, we have developed numerous ancillary products that complement our flagship offerings.  Included in the price of Infrastructure monitoring is a robust list of ancillary products that can enhance your Datadog observability platform. Datadog is a turn-key solution, but it is important to stay focused after the initial roll-out. The following are some examples of ancillary products that can be utilized to maximize your suite of products.

### Service Catalog

Services are the base object of observability. Utilizing the [service catalog][30] allows you to see at glance which services were deployed most recently, or have not been deployed for a long time. Additionally this view shows which services are reporting the most errors, and whether they have on-going incidents, and much more.

{{< img src="/service_owners_guide/service_catalog.png" alt="Service Catalog home screen" style="width:90%;">}}

### Event Management 

Without any additional setup, [event management][31] can be used to see 3rd party event statuses, events generated from the Agent and installed integrations, and more. 

### Error Tracking 

See errors where they happen with Datadog's [Error Tracking][32]. Error Tracking can ingest errors from APM, Log Management, and Real User Monitoring to debug issues faster.

### API Catalog 

Use [API Catalog][33] for resource endpoint-specific categorization, performance, reliability, and ownership of all your API endpoints in one place.

### Fleet Automation  

Centrally administer and manage all of your Datadog Agents with [Fleet Automation][34]. Fleet Automation can help you identify which Agents need upgraded, send a flare from within your organization to support, and help rotate API keys and ensure old keys can be disabled with no impact by identifying which Agents, and how many Agents, are using a particular key.  

{{< img src="/service_owners_guide/fleet_automation.png" alt="Fleet Management home screen" style="width:90%;">}}

### Remote Configuration

Use Datadog's [Remote Configuration][35] (enabled by default), to remotely configure and change the behavior of Datadog components (for example, Agents, tracing libraries, and Observability Pipelines Worker) deployed in your infrastructure. See [supported products and capabilities][36] for more information.

### Notebooks 

Use Datadog [Notebooks][37] to share with team members to aid in troubleshooting investigations or incidents.

## Deployment patterns 

At this stage, we have developed two distinct bodies of knowledge. The first, is an understanding of our IT landscape from the observability lens. We understand the types of components it consists of and have a general idea of the observability data we need to extract from it. The second, is a decent understanding of Datadog capabilities and prerequisites.    
Now it's time to put it all together. In a typical 3-tier, web-scale application, Datadog has about five main capabilities (metrics, logs, traces, synthetics, RUM, and DBM), and many optional sub-components and customizations. They are all managed from as few points as possible, but the most efficient deployment of Datadog requires some degree of pattern creation.

### Software Development Lifecycle

To begin mapping out your deployment patterns, use the technology survey, combine it with the [Datadog 101][7] training, and begin to develop a plan of action. Below is an example intended to be modified to suit your individual needs. It outlines the deployment pattern from the dimension of SDLC environment (dev,qa,stage,prod), but should be customized to the local standards and conditions. Begin setting expectations within your own Datadog user base what the term "Standard Datadog Deployment" actually means. 

|  | Dev | QA | Staging | Prod |
| :---- | :---- | :---- | :---- | :---- |
| **APM** | Deny/Allow | Allow | Allow | Allow |
| **Synthetics** | Deny | Deny/Allow | Allow | Allow |
| **Logs** | Allow | Allow | Allow | Allow |
| **RUM** | Deny | Deny/Allow |  Allow | Allow |
| **DBM** | Deny/Allow | Deny/Allow | Allow | Allow |
| **Live Processes** | Deny | Deny/Allow | Allow | Allow |
|  |  |  |  |  |

**Recommendation** :
Not every tool is fit for every job.  Evaluate the Datadog product use cases, and specifically match them to your needs. Consider the levels of SDLC, application importance, and Datadog product purpose.

## Plan summary

It is important to develop and plan a realistic course through the implementation of Datadog. In this section we have covered the planning and best practices phase, and at this stage, your   
Datadog footprint is set up for success. You have identified and assembled your knowledge base and team members, developed your deployment models, planned some optimizations, and compiled a list of best practices for some of our core products. These foundations will assist you in the next phases of Datadog service ownership, build and run.  

## Next Steps

Create a detailed roll-out methodology in the [build][41] phase by focusing on the construction of Datadog itself, iterate on your environment, establish some internal support mechanisms, and prepare for production.


## Further Reading

{{< partial name="whats-next/whats-next.html" >}}



[1]: https://docs.datadoghq.com/getting_started/tagging/unified_service_tagging/
[2]: https://docs.datadoghq.com/getting_started/tagging/
[3]: https://docs.datadoghq.com/getting_started/tagging/unified\_service_tagging
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
[39]: https://docs.datadoghq.com/account_management/billing/aws/\#aws-resource-exclusion
[40]: https://docs.datadoghq.com/integrations/guide/azure-portal/?tab=vmextension\#metric-collection
[41]: /service_owners_guide/build
[42]: https://drive.google.com/file/d/1yUuz6fUFkFagNi0cYkpyDa7b2sQLHKD6/view
[43]: /integrations/ping/
