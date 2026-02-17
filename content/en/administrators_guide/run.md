---
title: Maintaining and running your Datadog installation
description: Learn about the Run phase of using Datadog, including onboarding a new infrastructure instance, fielding technical issues, and performing administrative tasks.
further_reading:
- link: "getting_started/dashboards/"
  tag: "Documentation"
  text: "Getting Started with Dashboards"
---

In the [Plan][24] and [Build][25] sections, you gained insights into setting goals, strategizing integrations, and constructing and iterating on the Datadog environment for smooth production use. Next, you'll learn about the run phase, where you'll manage a series of internal and external tasks to keep the Datadog installation running efficiently. 

## Service tasks

Reduce risks and increase adoption by releasing new Datadog installations sequentially. This section lists a sequence of item releases to optimize the user experience with Datadog. Due to the diversity of IT architecture, this guide is high-level. Here are a few highlights:

### Onboarding a new infrastructure instance

Infrastructure is the core element of IT and observability. It is the primary and most frequent task for a Datadog administrator team. The platform is adaptable, offering tools to streamline most tasks. Begin by tailoring it to your specific environment. Your IT architecture might include components such as HyperVisors, HyperScalers, and Serverless Infrastructure.

**Recommendations**:   

Use [Fleet Automation][1] to remotely manage your Agents at scale. Continuously monitor your teams for new infrastructure requests, flagging them early, and applying engineering resources to focus on sensible expansions to your infrastructure offerings.

### Onboarding a new application footprint

Adding an application to Datadog is a common task in the early days of Datadog administration. Develop an efficient mechanism that matches your local conditions to the requirements of Datadog. At a minimum, include the knowledge base items in the planning phase, along with additional considerations:  

- The Universal Service Tag `version` is important to many visualizations. Developing an automated, reliable, and compliant method to power these higher value visualizations. 

- Establishing a comprehensive [Software Catalog][2] provides numerous benefits in the future. Software Catalog is central to the Datadog design pattern, and hosts the objects of governance, dependency, and service definition.  

**Recommendations:**   
Develop automatic version tagging integrated into your application build process. Focus on Software Catalog, and track readiness with setup guidance.

## Fielding technical issues

Due to its platform-as-a-service structure, Datadog demands little troubleshooting from you, the administrator. To help identify issues in the host Agent, use the` datadog-agent status` [command][3]. This command reports granular, specific, and actionable information that identifies areas to address. Additionally, use the `datadog-agent flare` command to quickly surface issues that need to be addressed by Datadog Support.

**Recommendations**: 
Use the `status` and `flare` commands from day one.

## Administration Tasks

Like all other enterprise software, ongoing maintenance tasks must be well-organized and adhere to your local policies. Common ongoing tasks include:

### Usage Monitoring

Monitoring consumption is essential, as is adopting the tools provided for this purpose. Datadog provides an [estimated usage metrics][5] dashboard that can serve as the foundation for this capability. There are also out-of-the-box dashboards for visualizing the [estimated usage][6] across all of your logs, metrics, and traces. 

### Deploy Dashboards and monitors

After your users become familiar with Datadog, they may request refinements and adjustments to frequently used items such as [dashboards][7] and [monitors][8]. The components, including SLOs and other content objects, are designed for iterative development and are written in JSON. They can be cloned, exported, modified, imported, and stored as flat files. Additionally, a [terraform provider][9] is available, along with a [dashboards API][10] for interacting with and creating dashboards.  

When creating dashboards, prioritize the content you want to display over the construction process. This creative process is supported by dashboard creation tools and in the pre-built dashboards that come with the product. Each dashboard within the {{< translate key="integration_count" >}} integrations is a value-added template for monitoring its corresponding technology. Out-of-the-box dashboards offer the benefit of Datadog's experience and prescriptive model for observability.  
  
**Recommendations:**  

- Determine the purpose of the dashboard you're creating.   
- Set up monitors for Datadog usage based on the [Estimated Usage metrics][6].  
- Create [anomaly or change monitors][11] on these same estimated usage metrics to send alerts when your Datadog usage spikes.    
- [Reuse and clone][12] other dashboards to save time.  
- Utilize [OOTB dashboards][13] to manage consumption.

A common OOTB dashboard is the AWS EC2 Overview Dashboard:

{{< img src="/administrators_guide/ec2_overview.png" alt="AWS EC2 Overview Dashboard" style="width:90%;">}}

### API key rotation 

The Datadog platform uses standard Restful API Key Authentication and recommends following standard [API Key Security][14], including key rotation. It is also beneficial to organize the assignment of these keys to logical working groups to optimize the security profile and rotation operation.

**Recommendations:**   

Incorporate Datadog API and App Keys into your own systems for key management. Organize keys into groups that can be easily maintained. 

### RBAC objects roles, teams, and permission sets

Datadog [RBAC][15] relies on your SAML provider, and the AD/LDAP store upstream of that SAML provider. It can mirror the AD user groups and assign Datadog-specific permissions in a standard group-mapping. Collaboration between Datadog admins and SAML/AD/LDAP admins is necessary to exchange the specific group names and attributes for the key-value structure.    

## Datadog Agent updates

Agent components are regularly updated with security and feature enhancements, so it's best to remain up-to-date. Follow your local procedures for testing and release of new software.   

**Recommendations:**  

Include Datadog upgrades within existing patch management standards and upgrade policies. Subscribe to [Datadog's release feed][17] and closely monitor your [Fleet Automation page][18] for Agents that require upgrades.

## Summary

Datadog administration has several activities that should fit well into your existing process standards. Incorporate Datadog into your standard systems for key rotation, patch updates, onboarding, and Infrastructure as Code (IaC). Publish these standards early to guide users in getting started with your new Datadog installation. 

## Next steps

After successfully planning, setting up, and maintaining your Datadog installation, use the following resources to support your ongoing Datadog journey:

- [Obtain a Datadog certification][20]
- [Get started with Datadog support][21]
- [Sign up for the Datadog new releases and security newsletters][22]
- [Check out The Monitor blog][23]

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /agent/fleet_automation/
[2]: /software_catalog/
[3]: /agent/configuration/agent-commands#agent-information
[4]: /agent/troubleshooting/send_a_flare/?tab=agent\#send-a-flare-using-the-flare-command
[5]: https://app.datadoghq.com/dash/integration/31281/estimated-usage-overview?fromUser=false\&refresh_mode=sliding\&view=spans\&from_ts=1721313591456\&to\_ts=1721317191456\&live=true
[6]: /account_management/billing/usage_metrics/
[7]: /dashboards/#overview
[8]: /monitors/
[9]: /getting_started/integrations/terraform/#dashboards
[10]: /api/latest/dashboards/
[11]: /monitors/types/anomaly/
[12]: /getting_started/dashboards/#start-by-reusing-other-dashboards
[13]: https://app.datadoghq.com/dashboard/lists
[14]: /account_management/api-app-keys/#using-multiple-api-keys
[15]: /account_management/rbac/?tab=datadogapplication
[16]: /integrations/
[17]: https://github.com/DataDog/datadog-agent/releases
[18]: https://app.datadoghq.com/fleet
[19]: /api/latest/key-management/
[20]: https://www.datadoghq.com/certification/overview/
[21]: /getting_started/support/
[22]: https://www.datadoghq.com/subscriptions/
[23]: https://www.datadoghq.com/blog/
[24]: /administrators_guide/plan/
[25]: /administrators_guide/build/
