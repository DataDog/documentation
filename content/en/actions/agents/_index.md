---
title: Agents
description: Build custom AI agents that can access the Action Catalog. 
disable_toc: false
further_reading:
- link: "/actions/agents/build/"
  tag: "Documentation"
  text: "Create an agent"
- link: "/actions/actions_catalog/"
  tag: "Documentation"
  text: "Action Catalog"
- link: "https://www.datadoghq.com/knowledge-center/aiops/ai-agents/"
  tag: "Knowledge Center"
  text: "What are AI agents and how do they work?"
---

{{< callout url="https://app.datadoghq.com/actions/agents" btn_hidden="false" header="Join the Preview!" >}}
Agents is in Preview. Click <b>Request Access</b> and fill in the Datadog Product Preview Program form.
{{< /callout >}}

## Overview

You can build custom AI agents to act on your observability data and third-party integrations. Your agents can use any action from the [Action Catalog][7] to investigate problems, start remediation, or manage resources.

When building an agent, you can choose a template to get started. Templates come with pre-filled instructions and relevant tools. Templates are named after their main role, like Security Analyst, Log Analyzer, Incident Responder, or DevOps Assistant. 

{{< img src="/actions/agents/blank-new-agent.png" alt="The Agents page, filtered to show only 'My agents'" style="width:100%;" >}}

## The Agents dashboard

You can create a new agent from the [Agents][1] page. The page lists information about existing agents, including the following:
- Agent Name
- Description
- Author
- Creation date

Hover over an agent for options to clone or delete it. You can also enable the **My agents** toggle to see only agents that you've created:

{{< img src="/actions/agents/agent-dashboard.png" alt="The Agents page, filtered to show only 'My agents'" style="width:100%;" >}}

## Create an agent

### Build an agent from a blueprint

Blueprints are helpful starter agents that cover common use cases. They come loaded with instructions for the agent's behavior and helpful tools from the Action Catalog. Blueprints also showcase best practices for setting up agent functionality.

To build an agent from a blueprint:

1. Navigate to the [Agents][1] page. 
1. In **Agent Blueprints**, click the blueprint you want to use. 
    1. Alternatively, you can click **New Agent** and browse the full list of blueprints.
1. Click **Create From Blueprint**.
1. Your new agent will have pre-populated settings and tools. You can immediately start chatting with the agent or [further customize it][2]. 
1. Click the gear icon to close the agent's settings.

### Create a custom agent

To build an agent from scratch: 

1. Navigate to the [Agents][1] page. 
1. Click **New Agent**. 
1. [Customize your agent][2]. Changes are saved automatically.
1. Start chatting with your agent. 

## Customize your agent

When configuring your agent, you have the following options for customization. 

### Model

Click the dropdown menu to choose your GPT model. Current options include [GPT-4o][3], [GPT-4.1][4], and [GPT-5][5]. You can compare these models using [OpenAI's tool comparison tool][6].

### Instructions

Enter the instructions your agent will follow when performing tasks. You can describe the agent as if it were a person, including its role, specialties, and steps to follow. Click **Suggest With AI** to get help with writing and refining your instructions. 

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

### Tools

Click **+ Add Tool** to add actions from our [Action Catalog][7] for the agent to use. The agent is restricted to only its added tools. For example, if you encounter an error when the agent attempts to perform a task you've requested, it might be missing a necessary action. 

### MCP Servers

Click the toggle button to enable MCP (Model Context Protocol). MCP servers provide additional tools and capabilities that the agent can use to interact with external systems.

### Feature Lab

This section displays features that are still in development. Click the toggle button next to a feature to enable it. 

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

<br>Do you have questions or feedback? Join the **#workflow-custom-agents** channel on the [Datadog Community Slack][4].

[1]: https://app.datadoghq.com/actions/agents
[2]: /actions/agents/build/#create-a-custom-agent
[3]: https://openai.com/index/hello-gpt-4o/
[4]: https://openai.com/index/gpt-4-1/
[5]: https://openai.com/gpt-5/
[6]: https://platform.openai.com/docs/models
[7]: /actions/actions_catalog/