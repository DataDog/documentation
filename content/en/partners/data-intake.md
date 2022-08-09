---
title: Data intake
kind: documentation
description: "How data can be fed into Datadog and which prerequisites need to be met in your or your clients' environments."
private: true
---

You've laid the groundwork and it's time to start getting data into Datadog. 

Datadog offers several different ways to collect data:
- Cloud service integrations (out of the box)
- The Datadog Agent & Agent-based Integrations (out of the box)
- APIs / Library Integrations & Custom Checks

Initially, the objective of this phase should be to gather data to provide immediate value to you or your clients. However, in the long run, you should consider this an ongoing process where you constantly assess changes to your environment by asking the following questions:
- Have you or your clients employed a new technology?
- Have you or your clients introduced a new process?
- Has Datadog introduced a new product feature that you can use?

Consider these questions regularly to ensure that all necessary telemetry is being ingested into Datadog.

## Integrations

You can provide immediate value to your clients through integrations. Datadog offers {{< translate key="integration_count" >}} integrations, which collect metrics and logs from a wide array of technologies. Some integrations come packaged with the Datadog Agent, others are authentication-based and rely on the Datadog API, and some collect data based on the language that an application is written in.

For more information on integrations and the Datadog Agent, see:
- [Introduction to Integrations][1]
- [List of Datadog Integrations][2]
- [The Datadog Agent][3]
- [Getting Started with the Agent][4]

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

- Logs can be forwarded directly to Datadog's [log ingestion endpoint][5].
- Metrics can be forwarded directly to Datadog's [metrics API][6].
- Events can be forwarded directly to Datadog's [events API][7].
- Traces can be forwarded directly to Datadog's [trace/span API][8].

### Custom checks

While Datadog offers {{< translate key="integration_count" >}} integrations, your client might run a custom application that cannot be covered with any of the existing integrations. To monitor these applications, your clients can use the Agent to execute custom checks.

For more information, see [Custom Checks][9].

### Local APIs for data ingestion on the Agent

The Datadog Agent comes bundled with DogStatsD, a metrics aggregation service, which accepts data using UDP. DogStatsD is a good alternative if a custom check does not suit your use case and there are no existing integrations for the application. For example, you can use DogStatsD to collect events and metrics data from a cron job, which probably does not have its own log files.

You can either use the DogStatsD endpoints, or use a Datadog client library to facilitate the submission of metrics and events to DogStatsD.

For more information, see:
- [Submit Events][10]
- [Submit Custom Metrics][11]
- [Libraries][12]
- [API Reference][13]

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

For more information on tagging and tagging strategy, see:
- [Getting Started with Tags][14]
- [Best practices for tagging your infrastructure and applications][15] (Blog)
- [Tagging Best Practices][16] (Training)
- [Unified Service Tagging][17]
- [Kubernetes Tag Extraction][18]
- [AWS Tagging][19] (AWS Documentation)
- [Serverless Tagging][20]
- [Live Container Tagging][21]

## Agent rollout

Here are the key phases for rolling out the Agent:
- Prerequisites for Agent deployment
- Initial Agent deployment to the existing infrastructure
- Provisioning of new infrastructure
- Monitoring the continuous provisioning processes

### Prerequisites for Agent deployment

Depending on the platform and operating system, there might be different prerequisites for the Agent. See [the official Agent documentation][3] to familiarize yourself with those requirements.

The main prerequisite for the Agent on any platform is network connectivity. Traffic is always initiated by the Agent to Datadog. No sessions are ever initiated from Datadog back to the Agent. Except in rare cases, inbound connectivity (limited through local firewalls) is not a factor for Agent deployments.

To work properly, the Agent requires the ability to send traffic to the Datadog service over SSL over 443/tcp. For a full list of ports used by the agent, see [Network Traffic][22].

In some circumstances, Agent version-specific endpoints can cause maintenance problems, in which case Datadog can provide a version-agnostic endpoint. If you need a version-agnostic endpoint, contact Datadog support.

#### Agent proxy

In many client environments, opening direct connectivity from the Agent to Datadog is not possible or desired. To enable connectivity, Datadog offers a few different options to proxy the Agent traffic.

For more information, see [Agent Proxy Configuration][23].

### Agent deployment, upgrade, and configuration

There are various ways to deploy the Datadog Agent to your own and your client's infrastructure. As most service providers already have some configuration management tool in place, it is good practice to use the existing tool for Agent rollout.

Here are some examples of how to manage your Datadog Agent estate with configuration management tools:
- [Deploying Datadog Agents with Chef][24] (Blog)
- [Puppet + Datadog: Automate + monitor your systems][3] (Blog)
- [Deploying and Configuring Datadog with CloudFormation][25] (Blog)
- [How to Use Ansible to Automate Datadog Configuration][26] (Video)
- [How to deploy the Datadog agent on AWS hosts with Ansible dynamic inventories][27] (Blog)

If you don't plan on using Datadog's repositories, you can always find the latest Agent releases in the [public Github repository][28]. It is recommended that you [verify the distribution channel][29] of Agent packages before deployment.

### Monitoring the continuous provisioning processes

While it is good practice to use configuration management tools for deploying Datadog, you can also leverage Datadog to monitor proper operation of these tools. Here are some examples:
- [Ask your systems what's going on: monitor Chef with Datadog][30] (Blog)
- [Ansible + Datadog: Monitor your automation, automate your monitoring][31] (Blog)

## What's next?

Now that you have data flowing into Datadog, it's time to focus on [Delivering value][32] to your clients.

[1]: /getting_started/integrations/
[2]: /integrations/
[3]: /agent/
[4]: /getting_started/agent/
[5]: /getting_started/logs
[6]: /api/latest/metrics
[7]: /api/latest/events
[8]: /api/latest/tracing/
[9]: /developers/custom_checks/
[10]: /events/guides/dogstatsd/
[11]: /metrics/custom_metrics/
[12]: /developers/community/libraries/#api-and-dogstatsd-client-libraries
[13]: /api/latest/
[14]: /getting_started/tagging/
[15]: https://www.datadoghq.com/blog/tagging-best-practices/
[16]: https://learn.datadoghq.com/courses/tagging-best-practices
[17]: /getting_started/tagging/unified_service_tagging?tab=kubernetes
[18]: /agent/kubernetes/tag/
[19]: https://docs.aws.amazon.com/general/latest/gr/aws_tagging.html
[20]: /serverless/serverless_tagging/?tab=serverlessframework#overview
[21]: /infrastructure/livecontainers
[22]: /agent/guide/network/
[23]: /agent/proxy/
[24]: https://www.datadoghq.com/blog/deploying-datadog-with-chef-roles/
[25]: https://www.datadoghq.com/blog/monitor-puppet-datadog/
[26]: https://www.datadoghq.com/blog/deploying-datadog-with-cloudformation/
[27]: https://www.youtube.com/watch?v=EYoqwiXFrlQ
[28]: https://github.com/DataDog/datadog-agent/releases
[29]: /data_security/agent/#agent-distribution
[30]: https://www.datadoghq.com/blog/monitor-chef-with-datadog/
[31]: https://www.datadoghq.com/blog/ansible-datadog-monitor-your-automation-automate-your-monitoring/
[32]: /partners/delivering-value/
