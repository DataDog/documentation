---
title: Bits Agent Builder
description: Build and deploy custom AI agents that automate operational tasks using Datadog's tools and integrations.
further_reading:
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
- link: "/actions/workflows/"
  tag: "Documentation"
  text: "Workflow Automation"
- link: "https://www.datadoghq.com/knowledge-center/aiops/ai-agents/"
  tag: "Knowledge Center"
  text: "What are AI agents and how do they work?"
- link: "/account_management/billing/ai_credits/"
  tag: "Documentation"
  text: "AI Credits"
- link: "/incident_response/case_management/ai/custom_agents/"
  tag: "Documentation"
  text: "Case Management Integration with Bits Agent Builder"
---

{{< callout url="https://www.datadoghq.com/product-preview/custom-agents-in-case-management/" btn_hidden="false" header="Case Management integration is in Preview" >}}
Automatically assign custom agents to work on your Cases.
{{< /callout >}}

## Overview

Bits Agent Builder lets you create custom AI agents that use Datadog's tools and integrations to automate operational tasks. Agents can search logs, query metrics, create cases, send messages, or perform any action from the [Action Catalog][7].

Use agents to handle work that's too complex for static automation but too repetitive for humans. For example, triaging errors, responding to incidents, analyzing trends, and escalating issues.

<div class="alert alert-info">Bits Agent Builder consumes <a href="/account_management/billing/ai_credits/">AI Credits</a>.</div>

{{< img src="/actions/agents/agent-builder-interface.png" alt="The Bits Agent Builder editor showing instructions, model, tools, and automation configuration" style="width:100%;" >}}

## Create an agent

From the [Bits Agent Builder page][1], click **New Agent**. From there, you can create an agent in three ways:

- **Build with AI**: Describe what you want the agent to do in plain language. Bits Agent Builder generates the instructions, selects relevant tools, and configures the agent for you.
- **Start from a blueprint**: Choose a prebuilt template for common use cases such as error triage, incident response, security analysis, or DevOps assistance. Blueprints come preconfigured with instructions, tools, and automations, and are customizable.
- **Start from scratch**: Configure the agent manually—write instructions, pick a model, and add tools.

{{< img src="/actions/agents/empty-state.png" alt="The Bits Agent Builder new agent interface showing a text field and blueprint options" style="width:100%;" >}}

## Configure your agent

### Instructions

Instructions tell the agent what to do when it runs. Write them in natural language—describe the goal, the process, and any constraints. Edit instructions directly or refine them through the chat interface.

Write instructions that are specific and outcome-oriented. For example:

```
You are an Incident Responder AI assistant specialized in managing
and coordinating incident response activities.

Your role involves:
- Guiding incident response procedures and best practices
- Helping assess incident severity and impact
- Coordinating communication between teams and stakeholders
- Managing incident lifecycle from detection to resolution
- Facilitating post-incident reviews and improvements

During incident response:
1. Use search_datadog_logs to pull recent error logs for the affected service
2. Help classify incident severity (P0/P1/P2/etc.)
3. Guide through incident response runbooks and procedures
4. Assist with stakeholder communication and updates
5. Track action items and follow-up tasks
6. Support post-mortem analysis and lessons learned

Focus on clear communication, structured processes, and continuous
improvement of incident response capabilities.
```

### Model

Select which LLM powers the agent's reasoning. Models vary in capability, speed, and cost—choose based on your agent's workload. You can compare models using [OpenAI's comparison tool][6] and [Anthropic's models comparison][5].

### Tools

Tools define what actions the agent can take. Add tools from the [Action Catalog][7]. The agent can only use tools that have been added to its configuration.

Click on any added tool to hardcode its parameters. For example, lock a Slack tool to a specific channel or a logs query to a specific service.

The [Datadog MCP Server][8] is enabled by default. You can connect to any API using [custom HTTP actions][12].

### Automations

Set up your agent to run automatically with a [schedule][13], or trigger it from a Datadog [monitor][14], [incident][15], or [security signal][16]. These automations use [Workflow Automation][9].

## Test your agent

Use the built-in chat interface to test your agent. Send messages, review the agent's reasoning, and verify it takes the right actions. Chat history is preserved across sessions.

## Agent orchestration

Use agents in [Workflow Automation][9] and [App Builder][10] through the **Run Agent** action. This lets you embed AI reasoning into any workflow:

{{< img src="/actions/agents/run-agent-step.png" alt="The Run Agent step configuration in a workflow, showing agent selection, run instructions, conversation ID, and output schema fields" style="width:100%;" >}}

1. Open or create a workflow in [Workflow Automation][9], or open or create an app in [App Builder][10].
1. Add the **Run Agent** step from the action catalog.
1. Select which agent to run.
1. Write the **Run Instructions**—the prompt the agent receives each time it runs. Use variables such as `{{Source.form}}` to pass in trigger data.

The **Run Agent** step also supports the following optional fields:

- **Output Schema**: Define a JSON schema for the agent's response. When set, the agent structures its output to match the schema for use in downstream steps. For example, you can define a schema with a `requestType` field, then branch on `Run Agent.finalResponse.requestType` in an If condition step.

  {{< img src="/actions/agents/output-schema-example.png" alt="A workflow using output schema to branch on agent response fields" style="width:100%;" >}}

- **Conversation ID**: By default, each Run Agent invocation is a standalone, single-turn execution. Passing a Conversation ID lets the agent retain context across multiple workflow runs. Multi-turn sessions are subject to the same context window limits as the chat UI.

The agent executes with its configured tools and instructions, then returns its output to the workflow. You can combine rule-based automation with AI reasoning in a single workflow.

## Troubleshooting

**Agent not using a tool**: Verify the tool has been added to the agent's configuration. Agents can use only tools that are explicitly added.

**Automation not running**: Verify the automation is published and the Run Agent step is fully configured.

**Conversation length limit**: Long conversations may reach the context length limit. If this happens, start a new conversation. 

**Unexpected configuration changes**: Use [Audit Trail][11] filtered to your agent's ID to review the history of changes.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://platform.claude.com/docs/en/about-claude/models/overview#latest-models-comparison
[6]: https://developers.openai.com/api/docs/models
[7]: /actions/actions_catalog/
[8]: /mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[11]: /account_management/audit_trail/
[12]: /actions/actions_catalog/http-action/
[13]: /actions/workflows/trigger/#scheduled-triggers
[14]: /actions/workflows/trigger/#monitor-triggers
[15]: /actions/workflows/trigger/#incident-triggers
[16]: /actions/workflows/trigger/#security-triggers
