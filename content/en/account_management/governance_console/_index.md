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

Governance Console provides a centralized, self-service view of Datadog usage and adoption across your organization. Governance Console helps administrators centrally manage the configuration of a large, multi-team Datadog deployment. For organizations that need centralized governance, strong defaults, and automatic policy enforcement, Governance Console helps establish and maintain an environment compliant with best practices.

{{< img src="account_management/governance_console/governance-console-overview.png" alt="Governance console screenshot, showing summary page. Top section labeled Total Org Usage contains metrics including Active dashboards (monthly), Active integrations (total), and Active users (monthly)" style="width:100%;" >}}

## Permissions

The `governance_console_read` permission controls access to the Governance Console. Users with `governance_console_read` assigned to their role can view the Governance Console UI and associated reporting and insights.

Product-specific permissions restrict users' ability to change product-specific settings. For example, modifying or automating metrics configuration requires the `metrics_write` permission.

## Explore usage insights

In the total org usage section, Governance Console displays your organization's use and adoption of Datadog, such as active users and time spent in the product.

Governance Console also exposes per-product insights to learn more about usage and configuration trends on key platform features and products. You can learn about your adoption and maturity, and identify interesting trends or adoption behaviors.

{{< img src="account_management/governance_console/log-management-product.png" alt="Governance console screenshot, showing Log Management usage metrics, including Indexed logs (monthly), Ingested logs (weekly), and Unparsed logs (total)" style="width:100%;" >}}

## Use controls to enforce organization policies

Datadog governance controls help you automatically implement policies in your Datadog organization by identifying configuration drift and notifying the accountable users. Each control helps establish and maintain your compliance with best practices.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}