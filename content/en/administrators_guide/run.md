---
title: Maintaining and running your Datadog installation
description: Setup and install Datadog as an administrator to avoid pit-falls down the road
further_reading:
- link: "getting_started/dashboards/"
  tag: "Documentation"
  text: "Getting Started with Dashboards"
---

In the previous two sections, you understood Datadog through the lens of the plan and build phases, next you'll learn about the run phase. There are a series of tasks, both internal and external, that you need to manage to keep the Datadog service running efficiently. 

## Service tasks

By releasing your new individual Datadog services in a sequential pattern, gaining confidence as the service develops, you can reduce the risks of the installation, and increase adoption from your users. This section lists a sequence of service item releases that optimizes your Datadog service user's experience. The diversity of IT architecture at this level is extensive, so the following guidance does not go into intricate detail. Here are a few highlights:

### Onboarding a new infrastructure instance

Infrastructure is the foundational object of IT and observability.  It is the first and most common task of a Datadog service run team. The platform is flexible, and comes with tools to simplify the vast majority of this task.First you must customize it to fit into your local conditions. HyperVisors, HyperScalers, and Serverless Infrastructure may all be part of your IT architecture.  

**Recommendations**:   

Use [Fleet Automation][1] o help remotely manage your Agents at scale. Continuously monitor your teams for new infrastructure requests, flag them early and apply engineering resources to focus on sensible expansions to infrastructure menu offerings.

### Onboarding a new application footprint

Adding an application to Datadog is a common task in the early days of Datadog administration. Develop an efficient mechanism that matches your local conditions to the requirements of Datadog. At a minimum, it should include the knowledge base items in the planning phase, as well as additional considerations:  

- The Universal Service Tag `version` is important to many visualizations. Developing an automated, reliable, and conformant method to power these higher value visualizations. 

- Establishing a well-populated [service catalog][2] will reap benefits in the future. Service Catalog is central to the Datadog design pattern, and hosts the objects of governance, dependency, and service definition.  

**Recommendations:**   
Develop automatic version tagging integrated into your application build process. Focus on service catalog, and track readiness with setup guidance.

## Fielding technical issues

Due to its platform-as-a-service structure, Datadog demands little troubleshooting from you, the administrator. To help identify issues in the host Agent, use the` datadog-agent status` [command][3].  This command reports granular, specific, and actionable information that identifies areas to be addressed. Additionally, use the `datadog-agent flare` command to quickly surface issues that need to be addressed by Datadog Support.

**Recommendations**: 
Utilize the `status` and `flare` commands from day one.

## Service Administration Tasks

Like all other enterprise software, ongoing maintenance tasks need to be well-organized and adherent to your local policies. The following examples are common ongoing tasks:

### Usage Monitoring

It is important to keep an eye on consumption, and equally so, to adopt the tools provided for this purpose. Datadog provides an [estimated usage metrics][5] dashboard that can be utilized to create the foundation of this capability. There are also out of the box dashboards for visualizing the estimated usage across all of your [logs, metrics, and traces][6]. 

### Deploy Dashboards and monitors

After becoming familiar with Datadog, your users may start asking for refinements and adjustments, particularly of the items they interact with the most; [dashboards][7] and [monitors][8]. The dashboards, monitors, SLOs, and other content objects are designed for iterative development.  At their core, these items are written in JSON. They can be cloned, exported, modified, imported, and stored as flat files. Additionally, there is a [terraform provider][9] available, and a [dashboards API][10] that can interact with and create dashboards.  

When creating dashboards, focus on what content to display rather than on the construction process of the dashboard itself. This creative process is embraced within dashboards creation tools and in the dashboards that come with the product. Each of the dashboards included within the {{< translate key="integration_count" >}} integrations is a value-added template for monitoring for the corresponding technology. Out-of-the-box dashboards share with you Datadog's experience and prescriptive model for observability.  
  
**Recommendations:**  

- Determine the purpose of the dashboard you're creating.   
- Set Monitors for Datadog usage built off the [Estimated Usage metrics][6].  
- Create [anomaly or change monitors][11] on these same estimated usage metrics to send alerts when your Datadog usage spikes.    
- [Re-use and clone][12] other dashboards to save time.  
- Utilize [OOTB dashboards][13] to govern consumption.

A common OOTB Dashboard is the AWS EC2 Overview Dashboard:

{{< img src="/administrators_guide/ec2_overview.png" alt="AWS EC2 Overview Dashboard" style="width:90%;">}}

### API key rotation 

The Datadog platform uses standard Restful API Key Authentication, and recommends that standard [API Key Security][14] and rotation. In addition, it is useful to organize the assignment of these keys to logical working groups to optimize the security profile and rotation operation.

**Recommendations:**   

Incorporate Datadog API and App Keys into your own systems for key management. Organize keys into groups that can be easily maintained. 

### RBAC objects roles, teams, and permission sets

Datadog [RBAC][15] is dependent upon your SAML provider, and the AD/LDAP store upstream of that SAML provider. It can mirror the AD user groups, and assign Datadog-specific permissions in a standard group-mapping fashion. Collaboration between Datadog admins and SAML/AD/LDAP admins will be necessary to exchange the specific group names and attributes that go into the key-value structure.    

## Datadog Agent updates

Agent components are updated frequently with security and feature enhancements, and it is optimal to remain up-to-date. Follow your local procedures for testing and release of new software.   

**Recommendations:**  

Include Datadog upgrades within existing patch management standards and upgrade policies. Subscribe to [Datadog's release feed][17], and closely monitor your [Fleet Automation page][18] for Agents that require upgrades.

## Summary

Datadog administration has a few common activities that should fit well into your existing process standards. Be sure to fold Datadog into your standard systems for key rotation, patch updates, service onboarding, and Infrastructure as Code (IaC). Publish these standards early so that users know how to get started using your new Datadog installation. 

## Next steps

Once you have successfully planned, set up, and begun maintaining your Datadog installation, the following resources are available to support your ongoing Datadog journey:

- [Obtain a Datadog certification][20]
- [Get started with Datadog support][21]
- [Sign up for the Datadog new releases and security newsletters][22]
- [Check out The Monitor blog][23]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/fleet_automation/
[2]: /service_catalog/
[3]: /agent/configuration/agent-commands#agent-information
[4]: /agent/troubleshooting/send_a_flare/?tab=agent\#send-a-flare-using-the-flare-command
[5]: https://app.datadoghq.com/dash/integration/31281/estimated-usage-overview?fromUser=false\&refresh_mode=sliding\&view=spans\&from_ts=1721313591456\&to\_ts=1721317191456\&live=true
[6]: /account_management/billing/usage_metrics/
[7]: /dashboards/#overview
[8]: /monitors/
[9]: /getting_started/integrations/terraform/\#dashboards
[10]: /api/latest/dashboards/
[11]: /monitors/types/anomaly/
[12]: /getting_started/dashboards/\#start-by-reusing-other-dashboards
[13]: https://app.datadoghq.com/dashboard/lists
[14]: /account_management/api-app-keys/\#using-multiple-api-keys
[15]: /account_management/rbac/?tab=datadogapplication
[16]: /integrations/
[17]: https://github.com/DataDog/datadog-agent/releases
[18]: https://app.datadoghq.com/fleet
[19]: /api/latest/key-management/
[20]: https://www.datadoghq.com/certification/overview/
[21]: /getting_started/support/
[22]: https://www.datadoghq.com/subscriptions/
[23]: https://www.datadoghq.com/blog/
