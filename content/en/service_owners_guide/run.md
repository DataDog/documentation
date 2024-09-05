---
title: Maintaining and running your Datadog Implementation
description: Setup and implement Datadog as a Service owner to avoid pit-falls down the road
further_reading:
- link: "getting_started/application/"
  tag: "Documentation"
  text: "Getting Started with Datadog"
---

In the previous two sections, we viewed Datadog through the lens of the plan and build phases, next let's look at the run phase. There are a series of tasks, both internal and external, that will keep the Datadog service running efficiently that need to be managed. 

## Service tasks

By releasing your new individual Datadog services in a rational and sequential pattern, gaining confidence as the service develops, we can reduce the risks of the implementation, and increase adoption from our users. In this section we will list a particular sequence of service item releases that will optimize your Datadog service user's experience. It is not practical to discuss all the intricacies involved in these items, as the diversity of the IT architecture at this level is too extensive to be captured in a single document. Here are a few highlights:

### Onboarding a new infrastructure instance

Infrastructure is the foundational object of IT and observability.  It will be the first, and most common task of a Datadog service run team. The platform comes with incredible flexibility, and accelerators to complete the vast majority of this task, but all that capability still has to be molded into a shape that fits into your local conditions. HyperVisors, HyperScalers, Serverless Infrastructure, may all be part of your IT architecture.  

**Recommendation**:   
As mentioned in the ancillary products(link), it is highly recommended when you onboard new infrastructure to use [Fleet Automation][1] to aid in remotely managing your Datadog Agents at scale. Continuously monitor your teams for new infrastructure requests, flag them early and rationally apply engineering resources to focus on sensible expansions to infrastructure menu offerings.

### Onboarding a new application footprint

This will be a common task in the early days of Datadog service ownership. It is important to develop an efficient mechanism that matches your local conditions to the requirements of Datadog.  At a minimum, it should include the knowledge base items in the planning phase, as well as additional considerations outlined below. 

- The Universal Service Tag *`version:`* is very important to a series of visualizations.  Developing an automated, reliable and conformant method for this tag will go a long way to powering those higher value visualizations.

- Establishing a well-populated [service catalog][2] will reap large benefits down the road.  It is central to the Datadog design pattern, and hosts the objects of governance, dependency, and service definition. 

**Recommendation:**   
Develop automatic version tagging integrated into your application build process. Focus on service catalog, and track readiness with setup guidance.

## Fielding technical issues

Due to its PaaS structure, there is only a limited area of troubleshooting that exists for Datadog.  To help identify issues in the host Agent, use the provided Datadog [command][3] *`datadog-agent status`*.  This command will report granular, specific, and actionable information that identifies areas to be addressed. Additionally, memorize and use the *`datadog-agent flare`* [command][4] to quickly surface issues that need to be addressed by Datadog Support.

**Recommendation**: 
Utilize the `status` and `flare` commands from day one.

## Service Administration Tasks

Like all other enterprise software, ongoing maintenance tasks need to be well-organized and adherent to your local policies. The following outline common ongoing tasks:

### Usage Monitoring

It is important to keep an eye on consumption, and equally so, to adopt the tools provided for this purpose. Datadog provides an [estimated usage metrics][5] dashboard that can be utilized to create the foundation of this capability. There are also out of the box dashboards for visualizing the estimated usage across all of your [logs, metrics, and traces][6]. 

### Deploy Dashboards and monitors

After becoming familiar with Datadog, your users may start asking for refinements and adjustments, particularly of the items they interact with the most; [dashboards][7] and [monitors][8]. The dashboards, monitors, SLOs, and other content objects are designed for iterative development.  At their core, these items are written in JSON. They can be cloned, exported, modified, imported, and stored as flat files. Additionally, there is a [terraform provider][9] available, and a [dashboards API][10] that can interact with and create dashboards.  

When creating dashboards, there are many things to consider, but the focus should be on what content to display rather than on the construction process of the dashboard itself. This creative process is embraced within Datadog dashboards, and it is supported through a series of offerings and materials. Each of the dashboards included within the 700+ integrations is a value-added template for monitoring for the relative technology. In the out-of-the-box dashboards, notice Datadog's experience and prescriptive model for observability at the individual product level.  

**Recommendations:**  

- Determine the purpose of the dashboard you're creating.   
- Set Monitors for Datadog usage built off the [Estimated Usage metrics][6].  
- Create [anomaly or change monitors][11] on these same estimated usage metrics to send alerts when your Datadog usage spikes.    
- [Re-use and clone][12] other dashboards to save time.  
- Utilize [OOTB dashboards][13] to govern consumption.

A common OOTB Dashboard is the AWS EC2 Overview Dashboard:

{{< img src="/service_owners_guide/ec2_overview.png" alt="AWS EC2 Overview Dashboard" style="width:90%;">}}

### API key rotation 

The Datadog platform uses standard Restful API Key Authentication, and recommends that standard [API Key Security][14] and rotation be practiced. In addition, it is useful to organize the assignment of these keys to logical working groups to optimize the security profile and rotation operation.

**Recommendation:**   
Incorporate Datadog API and App Keys into local systems for key management. Organize keys into groups that can be easily maintained.   

### RBAC objects roles, teams, and permission sets

The [RBAC][15] system for Datadog is dependent upon the SAML provider, and the AD/LDAP store upstream of that SAML provider. It is capable of mirroring the AD user groups, and assigning Datadog-specific permissions in a standard group-mapping fashion. This being said, it is likely that collaboration between Datadog admins and SAML/AD/LDAP admins will be necessary to exchange the specific group names and attributes that go into the specific `Key:Value` structure.    

## New integrations

The vast majority of Datadog [Integrations][16] are controlled within the Agent. These can be easily engineered in a local sandbox.  However, there are some that require changes in the product being monitored. When adding new collections, be aware of these externalities. Databases, PaaS Platforms like Atlassian, and Cloud Providers are just a few of the places where additional setup (and planning) is required.

## Datadog Agent updates

Datadog updates the Agent components frequently for security and functionality reasons, and it is optimal to remain up-to-date. With any implementation, it is important to follow your local procedures for testing and release of new software.  

**Recommendation:**  
Include Datadog upgrades within existing patch management standards and upgrade policies. Subscribe to [Datadog’s release feed][17], and closely monitor your [Fleet Automation page][18] for Agent’s that require upgrades.

## Run summary

Datadog service ownership does have a few common activities, but the needs in this regard are few. These activities will slot well into your existing process standards. Be sure to fold Datadog into your standard systems for key rotation, patch updates, service onboarding and IaC.  Publish these standards early so that users know how to get started using your new Datadog service. 

# Summary

Datadog provides a straightforward solution to the highly complex challenges of enterprise observability. In this document, we covered how to maximize the platform’s value. Starting in the planning phase, we explored developing an architectural knowledge-base, experimenting with the product, and creating an implementation design. Next, in the build phase, we interpreted the documentation to create a detailed roll-out methodology. Finally, during the run phase, we outlined a maintenance schedule to ensure the service remains healthy.   

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://docs.datadoghq.com/agent/fleet_automation/
[2]: https://docs.datadoghq.com/service_catalog/
[3]: https://docs.datadoghq.com/agent/configuration/agent-commands#agent-information
[4]: https://docs.datadoghq.com/agent/troubleshooting/send_a_flare/?tab=agent\#send-a-flare-using-the-flare-command
[5]: https://app.datadoghq.com/dash/integration/31281/estimated-usage-overview?fromUser=false\&refresh_mode=sliding\&view=spans\&from_ts=1721313591456\&to\_ts=1721317191456\&live=true
[6]: https://docs.datadoghq.com/account_management/billing/usage_metrics/
[7]: https://docs.datadoghq.com/dashboards/\#overview
[8]: https://docs.datadoghq.com/monitors/
[9]: https://docs.datadoghq.com/getting_started/integrations/terraform/\#dashboards
[10]: https://docs.datadoghq.com/api/latest/dashboards/
[11]: https://docs.datadoghq.com/monitors/types/anomaly/
[12]: https://docs.datadoghq.com/getting_started/dashboards/\#start-by-reusing-other-dashboards
[13]: https://app.datadoghq.com/dashboard/lists
[14]: https://docs.datadoghq.com/account_management/api-app-keys/\#using-multiple-api-keys
[15]: https://docs.datadoghq.com/account_management/rbac/?tab=datadogapplication
[16]: https://docs.datadoghq.com/integrations/
[17]: https://github.com/DataDog/datadog-agent/releases
[18]: https://app.datadoghq.com/fleet
