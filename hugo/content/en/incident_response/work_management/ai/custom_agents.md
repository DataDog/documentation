---
title: Custom Agents
aliases:
- /incident_response/case_management/ai/custom_agents/
description: Learn how to use custom agents built with Bits Agent Builder to automate Work Management workflows in Datadog.
further_reading:
- link: "/actions/agents/"
  tag: "Documentation"
  text: "Bits Agent Builder"
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI features for Work Management are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="Join the Preview">}} Work Management integration with custom agents is in Preview.{{< /callout >}}

## Overview

Work Management integrates with [Bits Agent Builder][1], allowing you to move from manual to automated work item creation, triage, and resolution. Assign work items to custom agents to support your different workflows.

## Create custom agents

Use [Bits Agent Builder][1] to create custom agents that can triage and resolve work items. Agents can perform any action from the [Action Catalog][2], including creating, updating, and resolving work items. Here are examples of agents you can build to use in Work Management:

- **Issue triager**: Enriches incoming work items with structure and context so a human can act without manual prep.
- **Security signal aggregator**: Groups related security signals into one unified investigation work item to prevent siloed analysis.
- **Feature implementer**: Takes a feature request specification to a draft PR to help you ship improvements faster.
- **IT access request automator**: Reviews work item details, requests any missing details from the submitter, and automatically requests required approvals from admins.
- **Support first responder**: Drafts an initial response and starts the investigation process for support tickets to help reduce mean time to resolution (MTTR).

## Using custom agents in Work Management

Assign work items to agents from Bits Agent Builder manually or automatically using the **Agent Assignee** field in work items.

### Manual assignment

In a work item, select an agent from the **Agent Assignee** field dropdown.

### Automated assignment

Use [work item automation rules][3] to assign work items to agents automatically:

1. Navigate to **[Work Management > Settings][4]**.
1. Select the project you want to create automation rules for.
1. Select **Automation Rules**.
1. Click **New Rule**.
1. Define a trigger for when the rule should run.
1. Select **Assign Agent** and choose the custom agent to assign matching work items to.
1. Enable and name your rule.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/agents/
[2]: /actions/actions_catalog/
[3]: /incident_response/work_management/automation_rules/
[4]: https://app.datadoghq.com/work/settings
