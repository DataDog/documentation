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
title: Datadog Integrations
type: documentation
---
## Overview

This page outlines what an integration is, and the general process of building an integration at Datadog using the Integration Developer Platform.

## What are integrations?

Integrations enable third parties to send observability data—such as metrics, logs, traces, or events—into Datadog. Integrations include out-of-the-box (OOTB) dashboards, monitors, and other content to help users visualize and analyze their data. 

## What is an integration tile?

An integration tile acts as a discovery and installation point for customers. It includes:
* Information about your offering
* Setup instructions
* Installation or purchase options
* Out-of-the-box dashboards and additional content

Integration tiles are a component of integrations at Datadog. 

## Building an integration overview

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

## Out-of-the-box Integrations vs. Marketplace Offerings

**Out-of-the-Box Integrations** are integrations developed both by Datadog and Technology Partners, available at no cost on the [Integrations page][2]. 

**Marketplace Offerings** are available on the Datadog Marketplac, a commercial platform for Technology Partners to _sell_ a variety of offerings to Datadog customers. Marketplace offerings include:
* Paid Integrations
* Software Licenses
* Professional Services
  
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

Datadog offers GTM support for Marketplace listings only. To learn more about the Datadog Marketplace, see [Create a Marketplace Offering][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: /integrations
[3]: /marketplace
[4]: https://docs.datadoghq.com/developers/integrations/marketplace_offering/
[5]: /developers/integrations/agent_integration/
[6]: /developers/integrations/api_integration/
