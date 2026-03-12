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
: Use Datadog to increase the value of your platform by allowing customers to see the data from your platform alongside the rest of their technology stack.

Decrease mean-time-to-resolution (MTTR) for customers 
: When a customer's account is enriched with data from an integration, they are able to see a broader view of their entire stack, allowing them to debug and remediate issues sooner.

Increase adoption and visibility 
: Native functionality for Datadog reduces friction to adoption, and displaying a tile on the [Integrations page][2] or the [Marketplace page][3] provides visibility to all Datadog customers.

## What is an integration tile?

An integration tile acts as a discovery and installation point for customers. It includes:
* Information about your offering
* Setup instructions
* Installation or purchase options
* Out-of-the-box dashboards and additional content

Integration tiles are a component of integrations at Datadog. 

## Requirements of an official integration

All official integrations must include the following:

- **Telemetry**: Your integration must send at least one type of observability data (metrics, logs, traces, or events) to Datadog.
- **Out-of-the-box dashboard**: A prebuilt dashboard that visualizes the data your integration sends. See [Create an integration dashboard][10].
- **Tile images**: Screenshots or diagrams that appear on your tile in the Integrations or Marketplace page. See [Build an integration][11].

Depending on what your integration does, the following are also required:

| Integration type               | Additional requirement         |
|--------------------------------|--------------------------------|
| API-based integrations         | [OAuth 2.0 authentication][12] |
| Log integrations               | [Log pipeline][13]             |
| Integrations that send metrics | [Monitor template][14]      |

## Getting started

### Prerequisites

Before you begin developing an integration:

1. Apply to the [Datadog Partner Network's][1] **Technology Partner** track. After your application is approved, a member of the Datadog Technology Partner team reaches out to schedule an introductory call.
2. Request a dedicated Datadog sandbox account for development:
   1. Log in to the [Datadog Partner Portal][1].
   2. On your personal homepage, click **Learn More** under **Sandbox Access**.
   3. Select **Request Sandbox Upgrade**.

After your sandbox is created, you can [invite members from your organization][7] to collaborate.

<div class="alert alert-info">If you are already a member of a Datadog organization (including a trial org), you may need to switch to your newly created sandbox. For more information, see the <a href="https://docs.datadoghq.com/account_management/org_switching/">Account Management documentation</a>.</div>

### Build your integration

After you have sandbox access, use the Integration Developer Platform to build your integration:

1. Define the basic details about your integration (name, description, and category).
2. Write your integration code. Choose the type that matches your use case:
   - **[Agent-based integration][5]**: Collects data from on-host or local sources using the Datadog Agent. Best for monitoring infrastructure, services, or applications running in a customer's environment.
   - **[API-based integration][6]**: Sends data to Datadog through a REST API. Best for SaaS platforms and cloud services that operate outside of a customer's environment.
3. Specify the type of telemetry your integration queries or submits (metrics, logs, traces, or events).
4. Create an out-of-the-box dashboard, and optionally create monitors or security rules.
5. Complete your integration tile: add setup and uninstallation instructions, images, and support details.
6. Test your integration in your Datadog sandbox account.
7. Submit your integration for review. After approval, Datadog publishes it.

### Responsibilities

As the author of the integration, you are responsible for maintaining the code and helping ensure the integration functions properly across all [Datadog sites][8]. If you encounter setup issues, [contact Support][9].

## Out-of-the-box integrations compared to Marketplace offerings

The [Integrations page][2] includes integrations built by both Datadog and Technology Partners, available at no additional cost to Datadog customers. The [Marketplace page][3] is a commercial platform where Technology Partners can sell offerings—including integrations, software licenses, and professional services—to Datadog customers.

|                           | **Out-of-the-box integrations**                                 | **Marketplace offerings**                                                                             |
|---------------------------|-----------------------------------------------------------------|-------------------------------------------------------------------------------------------------------|
| **Purpose**               | Connect and transfer data between Datadog and partner platforms | Enhance the Datadog experience with extended capabilities, partner services, and legacy tech coverage |
| **Availability**          | Included on the [Integrations page][2]                          | Paid, available on the [Marketplace page][3]                                                          |
| **Built & maintained by** | Datadog or Technology Partners                                  | Technology Partners                                                                                   |
| **Billing**               | Included in Datadog subscription                                | Additional fees                                                                                       |

Marketplace offerings are ideal for:
* System integrators with specialized Datadog product expertise.
* Partners offering professional services to enhance Datadog adoption.

## Go-to-market (GTM) opportunities

Datadog offers GTM support. Reach out to your partner manager to learn more.

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
[10]: /developers/integrations/create-an-integration-dashboard/
[11]: /developers/integrations/build_integration/
[12]: /developers/integrations/api_integration/#implement-oauth
[13]: /developers/integrations/log_pipeline/
[14]: /developers/integrations/create-an-integration-monitor-template/
