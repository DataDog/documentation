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

Governance Console provides centralized configuration and governance for multi-team, multi-organization Datadog accounts. It offers a unified view of usage, adoption, configuration, and cost across your Datadog deployment. Governance Console enforces policies, applies default configurations, and transforms your organization's activity into metrics and insights for optimization. 

### Required permissions

The `governance_console_read` permission controls access to the Governance Console. Users with `governance_console_read` assigned to their role can view the Governance Console UI and associated reporting and insights.

Product-specific permissions restrict users' ability to change product-specific settings. For example, modifying or automating metrics configuration requires the `metrics_write` permission.

## Using Governance Console

{{< img src="account_management/governance_console/governance-console-overview-2.png" alt="Your image description" style="width:100%;" >}}

### Summary 

The [Summary][1] page displays an overview of your organization's usage of Datadog products.

### Products

The [Products][2] page displays the Datadog products used by your organization, with relevant metrics for each product. Select **View Details** to see more information about your organization's usage of a particular product, including limits and quotas.

### Controls

Datadog Governance Controls help you automatically implement policies in your Datadog organization by identifying configuration drift and notifying the accountable users. Each control helps establish and maintain your compliance with best practices.

The [Controls][3] page displays


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/governance/summary
[2]: https://app.datadoghq.com/governance/products
[3]: https://app.datadoghq.com/governance/controls