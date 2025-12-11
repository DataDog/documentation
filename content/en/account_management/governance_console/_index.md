---
title: Governance Console
description: Provides a centralized, self-service view of Datadog usage and adoption.
further_reading:
- link: "https://www.datadoghq.com/blog/datadog-governance/"
  tag: "Blog"
  text: "Datadog governance 101: From chaos to consistency"
- link: "https://www.datadoghq.com/blog/volkswagen-organizations/"
  tag: "Blog"
  text: "Best practices for managing Datadog organizations at scale"
- link: "https://docs.datadoghq.com/account_management/audit_trail/"
  tag: "Documentation"
  text: "Datadog Audit Trail"
- link: "https://docs.datadoghq.com/cloud_cost_management/"
  tag: "Documentation"
  text: "Cloud Cost Management"
---

## Overview

Governance Console unifies the configuration and administration of a large, multi-team, multi-organization Datadog account. For organizations who need centralized governance, strong defaults, and automatic policy enforcement, Governance Console helps establish and maintain a best practice, compliant environment.

Governance Console helps teams understand how their organization is adopting and using Datadog. It provides a centralized, self-service view of Datadog usage and adoption. Governance Console offers control and predictability over the platform's configuration, usage and cost, helping administrators holistically manage their Datadog deployment. Datadog turns your organization's configuration and usage activity into metrics and insights to guide optimization and investment.

Governance Console supports both new and existing customers, helping new customers start from a well-managed setup, and helping existing customers mature and adopt best practices over time.

{{< img src="account_management/governance_console/governance-console-overview.png" alt="Governance console screenshot, showing summary" style="width:100%;" >}}

## Explore usage insights

In the total org usage section, Governance Console displays your organization's use and adoption of Datadog, such as active users and time spent in the product.

Governance Console also exposes per-product insights to learn more about usage and configuration trends on key platform features and products. You can learn about your adoption and maturity, and identify interesting trends or adoption behaviors.

{{< img src="account_management/governance_console/log-management-product.png" alt="Governance console screenshot, showing Log Management metrics" style="width:100%;" >}}

## Establish guardrails

Datadog governance controls help you automatically implement policies in your Datadog organization by identifying configuration drift, notifying the accountable users, and enforcing compliance. Each control helps establish and maintain a best practice, compliant environment.

### Access control

The `governance_console_read` permission controls access to the Governance Console. Users with `governance_console_read` assigned to their role have access to view the Governance Console UI and associated reporting and insights.

Product-specific permissions restrict users' ability to change product-specific settings. For example, modifying or automating metrics configuration requires the `metrics_write` permission.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}