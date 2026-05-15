---
title: Agent Builder
description: Build and deploy custom AI agents that automate operational tasks using Datadog's tools and integrations.
site_support_id: agent_builder
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
---

{{< callout url="#" btn_hidden="true" header="Preview" >}}
Agent Builder is in Preview and available to all customers.
{{< /callout >}}

## Overview

Agent Builder lets you create custom AI agents that use Datadog's tools and integrations to automate operational tasks. Agents can search logs, query metrics, create cases, send messages, or any other action from the [Action Catalog][7].

Use agents to handle work that's too complex for static automation but too repetitive for humans. For example, triaging errors, responding to incidents, analyzing trends, and escalating issues.

{{< img src="/actions/agents/agent-builder-interface.png" alt="The Agent Builder editor showing instructions, model, tools, and automation configuration" style="width:100%;" >}}

## Create an agent

From the [Agent Builder page][1], click **New Agent**. From there, you can create an agent in three ways:

- **Build with AI**: Describe what you want the agent to do in plain language. Agent Builder generates the instructions, selects relevant tools, and configures the agent for you.
- **Start from a blueprint**: Choose a prebuilt template for common use cases like error triage, incident response, security analysis, or DevOps assistance. Blueprints come pre-configured with instructions, tools, and automations.
- **Start from scratch**: Configure the agent manually—write instructions, pick a model, and add tools.

{{< img src="/actions/agents/empty-state.png" alt="The Agent Builder new agent interface showing a text field and blueprint options" style="width:100%;" >}}

## Configure your agent

### Instructions

Instructions tell the agent what to do when it runs. Write them in natural language—describe the goal, the process, and any constraints. Edit instructions directly or refine through the chat interface.

Good instructions are specific and outcome-oriented. For example:

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
1. Help classify incident severity (P0/P1/P2/etc.)
2. Guide through incident response runbooks and procedures
3. Assist with stakeholder communication and updates
4. Track action items and follow-up tasks
5. Support post-mortem analysis and lessons learned

Focus on clear communication, structured processes, and continuous
improvement of incident response capabilities.
```

### Model

Select which LLM powers the agent's reasoning. Models vary in capability, speed, and cost—choose based on your agent's workload. You can compare models using [OpenAI's comparison tool][6] and [Anthropic's models comparison][5].

### Tools

Tools define what actions the agent can take. Add tools from the [Action Catalog][7], which includes 2500+ integrations. The agent can only use tools that have been added to its configuration.

The [Datadog MCP Server][8] is enabled by default. Support for third-party MCP servers is coming soon.

### Automations

Add an automation to trigger agents beyond the chat interface:

- **Schedule**: Run an agent on a recurring basis (for example, daily error triage).
- **Workflow triggers**: Run an agent as a step in any workflow—triggered by [monitors][14], [incidents][15], [security signals][16], or other events.

To use an agent in a workflow, add the **Run Agent** step from the workflow editor.

## Test your agent

Use the built-in chat interface to test your agent. Send messages, review the agent's reasoning, and verify it takes the right actions. Chat history is preserved across sessions.

## Blueprints

Blueprints are prebuilt agent templates for common operational use cases:

| Blueprint | Description |
|-----------|-------------|
| Daily Error Triager | Finds error logs daily and opens a case for non-transient issues |
| Incident Responder | Gathers context and coordinates response during active incidents |
| Security Analyst | Investigates security signals and recommends remediation |
| Log Analyzer | Analyzes system logs, identifies patterns, and helps troubleshoot |
| DevOps Assistant | Helps with infrastructure monitoring and deployment tasks |
| Feedback Digest | Summarizes user feedback from support channels |

Customize blueprints after creation by modifying instructions, adding or removing tools, and configuring automations.

## Use agents in Workflows and Apps

Agents integrate with [Workflow Automation][9] and [App Builder][10] through the **Run Agent** action. This lets you embed AI reasoning into any workflow:

{{< img src="/actions/agents/run-agent-step.png" alt="The Run Agent step configuration in a workflow, showing agent selection, run instructions, conversation ID, and output schema fields" style="width:100%;" >}}

1. Open or create a workflow in [Workflow Automation][9], or open or create an app in [App Builder][10].
1. Add the **Run Agent** step from the action catalog.
1. Select which agent to run.
1. Write the **Run Instructions**—these are the instructions sent to the agent at runtime. Use variables to pass dynamic context.

The **Run Agent** step also supports the following optional fields:

- **Output Schema**: Define a JSON schema for the agent's response. When set, the agent structures its output to match the schema for use in downstream steps.
- **Conversation ID**: Provide a conversation ID to continue a previous agent conversation. This lets the agent retain context across multiple workflow runs instead of starting fresh each time.

The agent executes with its configured tools and instructions and returns its output to the workflow. Combine rule-based automation with AI reasoning in a single workflow.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://docs.claude.com/en/docs/about-claude/models/overview#latest-models-comparison
[6]: https://platform.openai.com/docs/models
[7]: /actions/actions_catalog/
[8]: /bits_ai/mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[14]: /actions/workflows/trigger/#monitor-triggers
[15]: /actions/workflows/trigger/#incident-triggers
[16]: /actions/workflows/trigger/#security-triggers
