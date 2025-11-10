---
title: Agents
description: Build custom AI agents that can access the Action Catalog. 
disable_toc: false
further_reading:
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
- link: "https://www.datadoghq.com/knowledge-center/aiops/ai-agents/"
  tag: "Knowledge Center"
  text: "What are AI agents and how do they work?"
---

{{< callout url="https://docs.google.com/forms/d/e/1FAIpQLSdLs2T6hAKzmIA6ALlIIr2m5mJHgTpMfA12g5R3Kn0i7Mjucg/viewform" btn_hidden="false" header="Join the Preview!" >}}
Agents is in Preview. Click <b>Request Access</b> and fill in the Datadog Product Preview Program form.
{{< /callout >}}

## Overview

You can build custom AI agents to act on your observability data and third-party integrations. Agents can use any action from the [Action Catalog][7] to investigate problems, start remediation, or manage resources.

When building an agent, choose a template to get started. Templates come with pre-filled instructions and relevant tools. Templates are named after their main role, like Security Analyst, Log Analyzer, Incident Responder, or DevOps Assistant. 

{{< img src="/actions/agents/blank-new-agent.png" alt="The Agents page, filtered to show only 'My agents'" style="width:100%;" >}}

## Agents dashboard

You can create a new agent from the [Agents][1] page. The page lists information about existing agents, including the following:
- Agent Name
- Description
- Author
- Creation date

Hover over an agent for options to clone or delete it. You can also enable the **My agents** toggle to see only agents that you've created:

{{< img src="/actions/agents/agent-dashboard.png" alt="The Agents page, filtered to show only 'My agents'" style="width:100%;" >}}

## Create an agent

### Build an agent from a blueprint

Blueprints are starter agents that cover common use cases. They come loaded with instructions for the agent's behavior and related tools from the Action Catalog. Blueprints also showcase best practices for setting up agent functionality.

To build an agent from a blueprint:

1. Navigate to the [Agents][1] page. 
1. In **Agent Blueprints**, click the blueprint you want to use. Alternatively, you can click **New Agent** and browse the full list of blueprints.
1. Click **Create From Blueprint**.
1. Your new agent has pre-populated settings and tools. You can immediately start chatting with the agent or [further customize it](#customize-your-agent). 
1. Click the gear icon to close the agent's settings.

### Create a custom agent

To build an agent from scratch: 

1. Navigate to the [Agents][1] page. 
1. Click **New Agent**. 
1. [Customize your agent](#customize-your-agent). Changes are saved automatically.
1. Start chatting with your agent. 

## Customize your agent

When configuring your agent, you have the following options for customization. 

### Instructions

Enter the instructions for your agent to follow when performing tasks. You can describe the agent as if it were a person, including its role, specialties, and steps to follow. Click **Suggest With AI** to get help with writing and refining your instructions. 

Below is a sample set of instructions for an agent acting as an incident responder.

```
You are an Incident Responder AI assistant specialized in managing and coordinating incident response activities.

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

Focus on clear communication, structured processes, and continuous improvement of incident response capabilities.
```

### Model

By default, new custom agents run on the latest GPT model. 

To change your agent's model, click **Auto** in the chatbox to open a dropdown menu and choose another model. You can compare these models using [OpenAI's comparison tool][6] and reading [Anthropic's models comparison][5].

### Self-Improve

By default, the **Self Improve** feature is not enabled. Self improvement allows the agent to read its own configuration and update it when requested or when it determines its configuration can be changed to improve.

To enable this feature, click the settings  **<i class="icon-sliders"></i>**  icon, then the toggle button next to **Self Improve**.

### Actions

Click the plus **<i class="icon-plus-circled-wui"></i>** icon to add actions from the [Action Catalog][7] for the agent to use. The agent is restricted to only its added tools. For example, if you encounter an error when the agent attempts to perform a task you've requested, it might be missing a necessary action. 

### MCP Server

Click the toggle button to enable the [Datadog MCP Server][8]. MCP servers use the Model Context Protocol to provide additional tools and capabilities that the agent can use to interact with external systems.

## Add an agent action

After you create an agent, you can add it to a workflow or app. 

### Add to a workflow 

To invoke an agent in a workflow step:
1. In [Workflow Automation][9], navigate to a workflow and click **Edit**. 
1. Click the plus **<i class="icon-plus-circled-wui"></i>** icon. 
1. Select the **Execute Custom Agent** action. 
1. Configure the action:
    1. Enter a **Step name**.
    1. Selection a **Connection**.
    1. Select a **Custom Agent ID**.
    1. Enter a **User Prompt**.
    1. Optionally, add a [**Wait until condition**][11]. 
    1. Optionally, add [**Retries**][12].
1. Click **Save**.

### Add to an app

To invoke an agent in an app:
1. In [App Builder][10], navigate to an app and click **Edit**. 
1. Click the plus **<i class="icon-plus-2"></i>** icon, then click **Actions**. 
1. Select the **Execute Custom Agent** action. 
1. Configure the action:
    1. Select the **Run Settings**.
    1. Selection a **Connection**.
    1. Select a **Custom Agent ID**.
    1. Enter a **User Prompt**.
1. Click **Save**.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: https://app.datadoghq.com/actions/agents
[5]: https://docs.claude.com/en/docs/about-claude/models/overview#latest-models-comparison
[6]: https://platform.openai.com/docs/models
[7]: /actions/actions_catalog/
[8]: /bits_ai/mcp_server
[9]: https://app.datadoghq.com/workflow
[10]: https://app.datadoghq.com/app-builder/apps/list
[11]: /actions/workflows/build/#wait-until-condition
[12]: /actions/workflows/build/#retries