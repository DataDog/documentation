---
aliases:
- /developers/marketplace/offering
description: Learn how to develop and publish an integration tile.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: Blog
  text: Expand your monitoring reach with the Datadog Marketplace
- link: /developers/integrations/marketplace_offering
  tag: Documentation
  text: Create an offering on the Datadog Marketplace
title: Build an Integration with Datadog
type: documentation
---
## Overview

This page walks Technology Partners through the specific steps to create and submit an integration or Marketplace offering to Datadog.

## Getting Started

### Create a new listing
1. Navigate to **Integrations > Developer Platform > Publishing** and click on New Listing.
2. Select your offering type.
3. Add a name for your offering.
4. Click **Create**.

### Fill out the overview
5. Fill in the relevant details on the overview section such as your vendor name, vendor URL, short description, and apply appropriate tags. 
6. Upload a wordmark version of your logo in svg.
7. Set your unique integration ID, which will be used as the identifier for your integration.

### Define and write your integration code

8. Follow the instructions to create either 1) [an Agent-based integration][5], or 2) [an API-based integration][6].

If you are creating an **Agent-based integration**, follow the steps outlined. 

Agent-based integrations use the Datadog Agent to submit data through checks written by the developer.

Checks can emit metrics, events, and service checks into a customer’s Datadog account. The Agent itself can submit logs as well, but that is configured outside of the check. This code is hosted in GitHub.
The implementation code for these integrations is hosted by Datadog. Agent integrations are best suited for collecting data from systems or applications that live in a local area network (LAN) or virtual private cloud (VPC). Creating an Agent integration requires you to publish and deploy your solution as a Python wheel (.whl).

See [Agent Check Documentation][5] to learn how to set up an Agent Check and return to this page to proceed with the rest of the steps.

If you are creating an **API-based integration**, you are required to use OAuth. Follow the steps outlined. 

OAuth is a standard that integrations can use to provide client applications with secure delegated access. OAuth works over HTTPS and authorizes devices, APIs, servers, and applications with access tokens rather than credentials. 
See [OAuth Client Documentation][7] to set up your OAuth Integration and return to this page to proceed with the rest of the steps.

If your platform is incompatible with OAuth, please reach out to the Datadog Ecosystems team for an exception.

### Provide setup and uninstallation instructions

9. **Setup instructions** guide users through the installation process; include any necessary configuration, authentication steps, or initial set up actions using a numbered list
10. **Uninstallation instructions** guide users on how to properly uninstall the integration.

### Define the data your integration interacts with

11. Information about the Datadog data types helps users understand what your integration does. If you are pulling data out of Datadog, specify the specific data type under the queried data section. If you are sending data to Datadog, specify the specific data type under the submitted data section. Certain fields may require more information. 

If your integration sends in metrics:
a) Set the metric check - a metric emitted on every run to inform users the integration is running
b) Upload a list of your metrics by filling in the metadata.csv // (( should I add instructions about how to obtain this file here )) 

If your integration sends in logs, a log pipeline is required. 
a) Follow the instructions to [create a log pipeline][8]. 
b) Upload the two exported files from the prior step.

### Create integration-specific content

Datadog Integrations support out-of-the-box content that is ready to use upon installation. Include content such as dashboards, monitor templates, and SIEM detection rules to help users more quickly find value in your integration.

12. Create and attach at least one dashboard to be offered with your integration.  
  * Dashboards are required for all integrations. Follow our best practices [here][9] when creating a new dashboard.
13. Create and attach other content. 
  * To create a new monitor template, follow our best practices [here][10].  
  * To create SIEM detection rules, follow our best practices [here][11].

### Add Support details

14. Provide contact details to your support team.

### Add Release Notes

15. For the initial launch, leave it as is. For future updates, specify feature additions, changes, fixes, and removals as new versions.

### Review and Submit

16. Preview your integration to ensure everything appears correctly.
17. Once complete, submit it for review.
18. The Datadog team will review and respond with feedback.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: /integrations
[3]: /marketplace
[4]: https://docs.datadoghq.com/developers/integrations/marketplace_offering/
[5]: << link to agent integration docs >> 
[6]: << link to API integration docs>> 
[7]: << oauth docs >> 
[8]: << log pipeline doc >> 
[9]: << link to dashboard doc >> 
[10]: << link to monitor doc >> 
[11]: << link to detection doc >> 
