---
title: Custom Agents
further_reading:
- link: "/actions/agents/"
  tag: "Documentation"
  text: "Bits Agent Builder"
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
---

{{< callout url="https://www.datadoghq.com/product-preview/" btn_hidden="false" header="Join the Preview!">}} Case Management integration with custom agents is in Preview.{{< /callout >}}

## Overview

Case Management integrates with [Bits Agent Builder][1], allowing you to move from manual to automated case creation, triaging, and resolution. Assign cases to custom agents to support your different workflows. Example use cases include:
- **Automatically assign new cases in your project to a triage agent** that updates the case description and attributes and assigns cases to the right owner
- **Use a bug fix agent that reviews and addresses bugs** by requesting additional info that's required and creating PRs for fixes
- **Create a security signal aggregator agent** that links related cases together to help you manage duplicate or related cases

## Create custom agents

Use [Bits Agent Builder][1] to create custom agents that can triage and resolve cases. Agents use Datadog's tools and integrations and can perform any action from the [Action Catalog][2]. Agents can use Datadog Case Management actions to create, update, and resolve cases. Here are examples of agents you can build to use in Case Management:

- **Issue triager**: Enriches incoming cases with structure and context so a human can act without manual prep
- **Security signal aggregator**: Groups related security signals into one unified investigation case to prevent siloed analysis
- **Feature implementer**: Takes a feature request specification to a draft PR to help you ship improvements faster
- **IT access request automator**: Reviews case details, requests any missing details from the submitter, and automatically requests required approvals from admins
- **Support first responder**: Drafts an initial response and starts the investigation process for support tickets to help reduce MTTR

## Use agents in Case Management

Assign cases to agents from Bits Agent Builder manually or automatically using the **Agent Assignee** field in cases.

**Manual assignment**: Select an agent from the **Agent Assignee** field dropdown on a case.
{{< img src="/service_management/case_management/ai/case-agent-demo.png" alt="Case detail view showing the Agent Assignee dropdown with a custom agent selected" style="width:100%;" >}}

**Automated assignment**: Use [case automation rules][3] to assign cases to agents automatically. Set the trigger for the rule, select the **Assign Agent** option, and choose the custom agent to assign matching cases to.
{{< img src="/service_management/case_management/ai/automation-setting-agents.png" alt="Create Automation Rule modal showing the Assign Agent action selected and a custom agent specified" style="width:100%;" >}}

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /actions/agents/
[2]: /actions/actions_catalog/
[3]: /incident_response/case_management/automation_rules/
