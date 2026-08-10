---
title: Custom Agents
description: Learn how to use custom agents built with Bits Agent Builder to automate case management workflows in Datadog.
further_reading:
- link: "/actions/agents/"
  tag: "Documentation"
  text: "Bits Agent Builder"
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
---

{{< site-region region="gov" >}}
<div class="alert alert-danger">AI features for Case Management are not supported for your selected <a href="/getting_started/site">Datadog site</a> ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="Join the Preview">}} Case Management integration with custom agents is in Preview.{{< /callout >}}

## Overview

Case Management integrates with [Bits Agent Builder][1], allowing you to move from manual to automated case creation, triage, and resolution. Assign cases to custom agents to support your different workflows.

## Create custom agents

Use [Bits Agent Builder][1] to create custom agents that can triage and resolve cases. Agents can perform any action from the [Action Catalog][2], including creating, updating, and resolving cases. Here are examples of agents you can build to use in Case Management:

- **Issue triager**: Enriches incoming cases with structure and context so a human can act without manual prep.
- **Security signal aggregator**: Groups related security signals into one unified investigation case to prevent siloed analysis.
- **Feature implementer**: Takes a feature request specification to a draft PR to help you ship improvements faster.
- **IT access request automator**: Reviews case details, requests any missing details from the submitter, and automatically requests required approvals from admins.
- **Support first responder**: Drafts an initial response and starts the investigation process for support tickets to help reduce mean time to resolution (MTTR).

## Using custom agents in Case Management

Assign cases to agents from Bits Agent Builder manually or automatically using the **Agent Assignee** field in cases.

### Manual assignment

In a case, select an agent from the **Agent Assignee** field dropdown.

{{< img src="/incident_response/case_management/ai_tools/case_agent_assignee.png" alt="Case detail view showing the Agent Assignee dropdown with a custom agent selected." style="width:100%;" >}}

### Automated assignment

Use [case automation rules][3] to assign cases to agents automatically:

1. Navigate to **[Case Management > Settings][4]**.
1. Select the project you want to create automation rules for.
1. Select **Automation Rules**.
1. Click **New Rule**.
1. Define a trigger for when the rule should run.
1. Select **Assign Agent** and choose the custom agent to assign matching cases to.
1. Enable and name your rule.

{{< img src="/incident_response/case_management/ai_tools/agent_automation_rule.png" alt="Create Automation Rule modal showing the Assign Agent action selected and a custom agent specified." style="width:100%;" >}}


## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/agents/
[2]: /actions/actions_catalog/
[3]: /incident_response/case_management/automation_rules/
[4]: https://app.datadoghq.com/cases/settings
