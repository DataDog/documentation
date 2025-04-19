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

This page will outline what an integration is, and the general process of building an integration at Datadog using the Integration Developer Platform.

## What are integrations?

Integrations enable third-parties to send observability data—such as metrics, logs, traces, or events—into Datadog. Integrations include out-of-the-box (OOTB) dashboards, monitors and other content to help users visualize and analyze their data. 

## What is an integration tile?

An integration tile acts as a discovery and installation point for customers. It includes:
* Information about your offering
* Setup instructions
* Installation or purchase options
* Out-of-the-box dashboards and additional content

Integration tiles are a component of integrations at Datadog. 

## Building an integration overview

Follow these steps to start creating a new integration with Datadog.

**1. Apply to the Datadog Partner Network.**
Once accepted, a member of the Datadog Technology Partner team will reach out to discuss your offering and use cases. You should also receive details on getting a Datadog sandbox account and get access to the publishing platform via email.
2. **Request a Datadog sandbox account** for development via the Datadog Partner Network portal.
3. **Start developing your integration** using the Integration Developer Platform.
    a. Define your integration’s configuration method based on specific requirements of your use case. Different scenarios call for different configuration approaches, and your choice will impact your development process.
    b. Create your dashboards, monitors, and security rules
        i. Note: Dashboards are required.
    c. Fill in the remaining fields:
        * Setup instructions
        * Images
        * Data
        * Content
        * Support details
        * Other key details that help describe the integration
4. **Test your integration** in your Datadog sandbox account.
5. **Submit your integration for review.**
A live demo will be scheduled for final approval. 
6. **Your integration is published.**

## Out-of-the-box Integrations vs. Marketplace Integrations

Datadog offers two types of integrations:

**Out-of-the-Box Integrations**: The Integrations page includes integrations developed both by Datadog and Technology Partners, available at no cost. 

**Marketplace Integrations**: 
The Datadog Marketplace is a commercial platform for Technology Partners to _sell_ a variety of offerings to Datadog customers. Marketplace offerings include:
* Paid Integrations: Function like standard integration but require an additional fee.
* Software Licenses: Allow customers to purchase a partner’s software product directly through Datadog for consolidated billing.
* Professional Services: Enable customers to pay a one-time fee for partner-delievered services that enhance Datadog usage

Marketplace integrations are built and monetized by partners, offering specialized functionality that complements Datadog’s platforms without overlapping with core offerings. They are ideal for:
* System integrators with specialized Datadog product expertise.
* Partners offering professional services to enhance Datadog adoption.

See the [Build a Marketplace Offering documentation][4] to learn more about how to start building for the Datadog Marketplace. 

|                          | **OOTB Integrations**                                                                 | **Marketplace Integrations**                                                                                   |
|--------------------------|----------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------|
| **Purpose**              | Provides a way to connect and transfer data between Datadog and partner platforms     | Enhance the Datadog experience, including extended capabilities, partner services, and legacy tech coverage    |
| **Availability**         | Included on the Integrations Page                                                     | Paid, available on the Marketplace                                                                             |
| **Built & Maintained by**| Datadog or Technology Partners                                                        | Technology Partners                                                                                            |
| **Billing**              | Included in Datadog subscription                                                      | Purchased through Datadog’s Marketplace for consolidated billing                                               |

## Go-to-Market (GTM) opportunities

Datadog offers GTM support for Marketplace listings only. To learn more about the Datadog Marketplace, see [Create a Marketplace Offering][4].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: http://partners.datadoghq.com
[2]: /integrations
[3]: /marketplace
[4]: https://docs.datadoghq.com/developers/integrations/marketplace_offering/
