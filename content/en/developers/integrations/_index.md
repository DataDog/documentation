---
aliases:
- /developers/marketplace/offering
- /developers/integrations/create_a_tile
- /guides/agent_checks/
- /agent/agent_checks
- /developers/agent_checks/
description: Learn how to develop and publish a Datadog integration.
further_reading:
- link: https://www.datadoghq.com/blog/datadog-marketplace/
  tag: Blog
  text: Expand your monitoring reach with the Datadog Marketplace
- link: /developers/integrations/marketplace_offering
  tag: Documentation
  text: Create an offering on the Datadog Marketplace
title: Datadog Integrations
type: documentation
---
## Overview

This page outlines what an integration is, and the general process of building an integration at Datadog using the Integration Developer Platform.

## What are integrations?

Integrations enable third parties to send observability data—such as metrics, logs, traces, or events—into Datadog. Integrations include out-of-the-box (OOTB) dashboards, monitors, and other content to help users visualize and analyze their data. 

### Benefits of creating integrations

By creating an integration, you can achieve the following benefits:

Correlate your data with user observability data
: Leverage Datadog to increase the value of your platform by allowing customers to see the data from your platform alongside the rest of their technology stack.

Decrease mean-time-to-resolution (MTTR) for customers 
: When a customer's account is enriched with data from an integration, they are able to see a broader view of their entire stack, allowing them to debug and remediate issues more quickly. 

Increase adoption and visibility 
: Ensuring native functionality for Datadog reduces friction to adoption, and displaying a tile on the [Integrations page][2] or the [Marketplace page][3] provides key visibility to all of Datadog's customers.

## What is an integration tile?

An integration tile acts as a discovery and installation point for customers. It includes:
* Information about your offering
* Setup instructions
* Installation or purchase options
* Out-of-the-box dashboards and additional content

Integration tiles are a component of integrations at Datadog. 

## Requirements of an official integration

All official integrations must include the following:
* Telemetry sent to Datadog
* An out-of-the-box integration dashboard
* Images on your tile
* OAuth (for API integrations only)
* A log pipeline (for log integrations only)
* Recommended Monitor (for integrations that sends in metrics)

## Getting started 

### Join the Datadog Partner Network

Before listing an integration on Datadog, first apply to the [Datadog Partner Network's][1] **Technology Partner** track. Once your application has been approved, you can begin developing your integration.

### Request a sandbox account

All Technology Partners can request a dedicated Datadog sandbox account to help develop their integration. This sandbox account has a free license that you can use to send in data, build out dashboards, and more. 

<div class="alert alert-info">If you are already a member of a Datadog organization (including a trial org), you may need to switch to your newly created sandbox. For more information, see the <a href="https://docs.datadoghq.com/account_management/org_switching/">Account Management documentation</a>.</div>

To request a sandbox account:

1. Login to the [Datadog Partner Portal][1].
2. On your personal homepage, click on the **Learn More** button under **Sandbox Access**.
3. Select **Request Sandbox Upgrade**.

Creating a developer sandbox may take up to one or two business days. Once your sandbox is created, you can [invite new members from your organization][7] to collaborate with.

### Building an integration overview

Follow these steps to create a new integration with Datadog.

1. **Apply to the Datadog Partner Network.** Once accepted, a member of the Datadog Technology Partner team will reach out to schedule an introductory call.
2. **Request a Datadog sandbox account** for development via the Datadog Partner Network portal.
3. **Start developing your integration** using the Integration Developer Platform:

   a. Define the basic details about your integration.

   b. Define and write your integration code by following the instructions to create one of the following integration types:
      - [Agent-based integration][5]
      - [API-based integration][6]   

   c. Specify what type of data your integration queries or submits.

   d. Create a dashboard, and optionally create monitors or security rules.

   e. Fill in the remaining fields: setup and uninstallation instructions, images, support details, and other key details that help describe the value of your integration.

4. **Test your integration** in your Datadog sandbox account.
5. **Submit your integration for review.**
6. **Once approved, your integration is published.**

### Responsibilities

As the author of the integration, you are responsible for maintaining the code and ensuring the integration functions properly across all [Datadog sites][8]. If you encounter any setup issues, [contact Support][9].

## Out-of-the-box Integrations vs. Marketplace Offerings

{{< tabs >}}
{{% tab "Integrations" %}}

The [Integrations page][101] includes integrations built by both Datadog and our Technology Partners, available at _no cost_ to Datadog customers. 

{{< img src="developers/integrations/integrations_overview.png" alt="The Datadog Integrations page" style="width:100%;" >}}

[101]: https://app.datadoghq.com/integrations

{{% /tab %}}
{{% tab "Marketplace" %}}

The [Marketplace page][101] is a commercial platform for Technology Partners to _sell_ a variety of offerings, including integrations, software licenses, and professional services to Datadog customers.

{{< img src="developers/marketplace/marketplace_updated_overview.png" alt="The Datadog Marketplace page" style="width:100%" >}}

[101]: https://app.datadoghq.com/marketplace

{{% /tab %}}
{{< /tabs >}}
  
Marketplace integrations are ideal for:
* System integrators with specialized Datadog product expertise.
* Partners offering professional services to enhance Datadog adoption.

|                          | **OOTB Integrations**                                                                 | **Marketplace Integrations**                                                                                   |
|--------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Purpose**              | Provide a way to connect and transfer data between Datadog and partner platforms     | Enhance the Datadog experience, including extended capabilities, partner services, and legacy tech coverage    |
| **Availability**         | Included on the Integrations Page                                                     | Paid, available on the Marketplace                                                                             |
| **Built & Maintained by**| Datadog or Technology Partners                                                        | Technology Partners                                                                                            |
| **Billing**              | Included in Datadog subscription                                                      | Additional fees                                               |

## Go-to-Market (GTM) opportunities

Datadog offers GTM support. Please reach out to your partner manager to learn more.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: https://app.datadoghq.com/integrations
[3]: https://app.datadoghq.com/marketplace
[4]: https://docs.datadoghq.com/developers/integrations/marketplace_offering/
[5]: /developers/integrations/agent_integration/
[6]: /developers/integrations/api_integration/
[7]: https://docs.datadoghq.com/account_management/users/#add-new-members-and-manage-invites
[8]: https://docs.datadoghq.com/getting_started/site/
[9]: https://docs.datadoghq.com/help/
