---
title: Data intake
kind: documentation
description: "How data can be fed into Datadog and which prerequisites need to be met in your or your clients' environments."
private: true
---

You've laid the groundwork, and it's time to start getting data into Datadog.

Initially, the objective of this phase should be to gather data to provide immediate value to you or your clients. However, in the long run, you should consider this an ongoing process where you constantly assess changes to your environment by asking the following questions:
- Have you or your clients employed a new technology?
- Have you or your clients introduced a new process?
- Has Datadog introduced a new product feature that you can use?

Consider these questions regularly to ensure that all necessary telemetry is being ingested into Datadog.

## Integrations

You can provide immediate value to your clients through integrations. Datadog offers {{< translate key="integration_count" >}} integrations, which collect metrics and logs from a wide array of technologies.

There are three main categories of integrations:
- Cloud service integrations
- The Datadog Agent & Agent-based integrations
- APIs / library integrations & custom checks

For more information on the different types of integrations, see [Introduction to Integrations][1].

## Cloud service integrations

Cloud service or "crawler" based integrations use an authenticated connection to gather infrastructure information, metrics, logs, and events from a cloud service using an API.

Setting up a cloud service integration usually only takes a few minutes and delivers immediate value with metrics and events flowing into Datadog.

**Note**: Cloud service integrations can generate large volumes of data which can have billing effects from both Datadog and the cloud provider.

Be aware that in most scenarios, using a cloud service integration will not be sufficient to get a full understanding of the infrastructure and especially the applications that are running in these environments. Datadog recommends leveraging all means of data collection in addition to cloud service integrations.

To learn more about monitoring cloud environments, see:
- [Monitoring the Cloud][2] (eBook)
- [Introduction to AWS Cloud Monitoring][3] (Blog)
- [Introduction to Google Cloud Monitoring][4] (Blog)
- [Introduction to Azure Cloud Monitoring][5] (Blog)

## The Datadog Agent and Agent-based integrations

The Datadog Agent is software that runs on hosts and collects events and metrics to send to Datadog. The Agent is available for all commonly used platforms. While the Agent itself can collect a number of metrics about the host it is running on (such as CPU, memory, disk, and network metrics) the real strength of the Agent is its integrations.

Agent-based integrations allow the Agent to collect metrics, logs, traces,
and events from applications and technologies running either directly on
the host or in containers running on the host.

For more information on integrations and the Datadog Agent, see:
- [List of Datadog Integrations][6]
- [The Datadog Agent][7]
- [Getting Started with the Agent][8]

## APIs / library integrations and custom checks

Datadog focuses on scalability and extensibility, and offers several APIs and SDKs to extend the platform in situations where:
- Installing the Agent might not be possible due to security or other restrictions, for example on IoT devices.
- The capabilities of the Datadog Agent and its integrations do not cover a technology or requirement.

In these cases, using APIs enables you to capture relevant telemetry into the observability platform for your clients.

There are three key API areas that would be of most interest to you as a service provider:
- Public APIs for data ingestion
- Custom checks
- Local APIs for data ingestion on the Agent

### Public APIs for data ingestion

In cases where using cloud service integrations or the Agent is not possible or desired, the following APIs can be helpful for data intake:

- Logs can be forwarded directly to Datadog's [log ingestion endpoint][9].
- Metrics can be forwarded directly to Datadog's [metrics API][10].
- Events can be forwarded directly to Datadog's [events API][11].
- Traces can be forwarded directly to Datadog's [trace/span API][12].

### Custom checks

While Datadog offers {{< translate key="integration_count" >}} integrations, your client might run a custom application that cannot be covered with any of the existing integrations. To monitor these applications, your clients can use the Agent to execute custom checks.

For more information, see [Custom Checks][13].

### Local APIs for data ingestion on the Agent

The Datadog Agent comes bundled with DogStatsD, a metrics aggregation service, which accepts data using UDP. DogStatsD is a good alternative if a custom check does not suit your use case, and there are no existing integrations for the application. For example, you can use DogStatsD to collect events and metrics data from a cron job, which probably does not have its own log files.

You can either use the DogStatsD endpoints, or use a Datadog client library to facilitate the submission of metrics and events to DogStatsD.

For more information, see:
- [Submit Events][14]
- [Submit Custom Metrics][15]
- [Libraries][16]
- [API Reference][17]

## Tagging strategy

A good tagging strategy is vital if you want to ensure that you and your clients benefit from all of Datadog's features.

Tags are labels attached to your data that enable you to filter, group, and correlate your data throughout Datadog. Tagging binds different telemetry types in Datadog, allowing for correlation and calls to action between metrics, traces, and logs. This is accomplished with reserved tag keys.

Setting a consistent tagging strategy upfront paves the way to a successful Datadog implementation and ultimately increases value realization for your clients.

When thinking about tagging, take into consideration the following factors:
- **Technology**: Allows you to compare the use of the same technology between teams or clients.
- **Environment**: Allows you to compare the performance between test, production, and other environments.
- **Location**: Allows you to understand issues related to specific data centers or cloud service provider availability zones.
- **Business Service**: Allows you and your clients to filter the building blocks of a business service, regardless of technology.
- **Role**: Allows you to understand which role an entity plays in a business service.
- **Responsibility**: Allows the responsible team to filter all of their resources and enables other users and teams to identify which team is responsible for a certain service.

To set yourself up for success, read [Getting Started with Tags][18].

For more information on tagging and tagging strategy, see:
- [Best practices for tagging your infrastructure and applications][19] (Blog)
- [Tagging Best Practices][20] (Training)
- [Unified Service Tagging][21]
- [Kubernetes Tag Extraction][22]
- [AWS Tagging][23] (AWS Documentation)
- [Serverless Tagging][24]
- [Live Container Tagging][25]

## Agent rollout

Here are the key phases for rolling out the Agent:
- Prerequisites for Agent deployment
- Initial Agent deployment to the existing infrastructure
- Provisioning of new infrastructure
- Monitoring the continuous provisioning processes

### Prerequisites for Agent deployment

Depending on the platform and operating system, there might be different prerequisites for the Agent. See [the official Agent documentation][7] to familiarize yourself with those requirements.

The main prerequisite for the Agent on any platform is network connectivity. Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent. Except in rare cases, inbound connectivity (limited through local firewalls) is not a factor for Agent deployments.

To work properly, the Agent requires the ability to send traffic to the Datadog service over SSL over 443/tcp. For a full list of ports used by the Agent, see [Network Traffic][26].

In some circumstances, Agent version-specific endpoints can cause maintenance problems, in which case Datadog can provide a version-agnostic endpoint. If you need a version-agnostic endpoint, contact Datadog support.

#### Agent proxy

In many client environments, opening direct connectivity from the Agent to Datadog is not possible or desired. To enable connectivity, Datadog offers a few different options to proxy the Agent traffic.

For more information, see [Agent Proxy Configuration][27].

### Agent deployment, upgrade, and configuration

There are various ways to deploy the Datadog Agent to your own and your client's infrastructure. As most service providers already have a configuration management tool in place, it is a good practice to use the existing tool for Agent rollout.

Here are some examples of how to manage your Datadog Agent with configuration management tools:
- [Deploying Datadog Agents with Chef][28] (Blog)
- [Puppet + Datadog: Automate + monitor your systems][7] (Blog)
- [Deploying and Configuring Datadog with CloudFormation][29] (Blog)
- [How to Use Ansible to Automate Datadog Configuration][30] (Video)
- [How to deploy the Datadog Agent on AWS hosts with Ansible dynamic inventories][31] (Blog)

If you don't plan on using Datadog's repositories, you can always find the latest Agent releases in the [public GitHub repository][32]. It is recommended that you [verify the distribution channel][33] of Agent packages before deployment.

### Monitoring the continuous provisioning processes

While it is a good practice to use configuration management tools for deploying Datadog, you can also leverage Datadog to monitor proper operation of these tools. Here are some examples:
- [Ask your systems what's going on: monitor Chef with Datadog][34] (Blog)
- [Ansible + Datadog: Monitor your automation, automate your monitoring][35] (Blog)

## What's next?

Now that you have data flowing into Datadog, it's time to focus on [delivering value][36] to your clients.


[1]: /getting_started/integrations/
[2]: https://www.datadoghq.com/pdf/monitoring-in-the-cloud-ebook.pdf
[3]: https://www.datadoghq.com/solutions/aws/
[4]: https://www.datadoghq.com/solutions/gcp/
[5]: https://www.datadoghq.com/solutions/azure/
[6]: /integrations/
[7]: /agent/
[8]: /getting_started/agent/
[9]: /getting_started/logs
[10]: /api/latest/metrics
[11]: /api/latest/events
[12]: /api/latest/tracing/
[13]: /developers/custom_checks/
[14]: /service_management/events/guides/dogstatsd/
[15]: /metrics/custom_metrics/
[16]: /developers/community/libraries/#api-and-dogstatsd-client-libraries
[17]: /api/latest/
[18]: /getting_started/tagging/
[19]: https://www.datadoghq.com/blog/tagging-best-practices/
[20]: https://learn.datadoghq.com/courses/tagging-best-practices
[21]: /getting_started/tagging/unified_service_tagging?tab=kubernetes
[22]: /agent/kubernetes/tag/
[23]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[24]: /serverless/serverless_tagging/?tab=serverlessframework#overview
[25]: /infrastructure/livecontainers
[26]: /agent/configuration/network/
[27]: /agent/configuration/proxy/
[28]: https://www.datadoghq.com/blog/deploying-datadog-with-chef-roles/
[29]: https://www.datadoghq.com/blog/monitor-puppet-datadog/
[30]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
[31]: https://www.youtube.com/watch?v=EYoqwiXFrlQ
[32]: https://github.com/DataDog/datadog-agent/releases
[33]: /data_security/agent/#agent-distribution
[34]: https://www.datadoghq.com/blog/monitor-chef-with-datadog/
[35]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/
[36]: /partners/delivering-value/
