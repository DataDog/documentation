---
title: Skills Library
description: Create reusable skills that provide Bits AI and external AI agents with organization-specific domain knowledge and instructions.
further_reading:
    - link: '/bits_ai/bits_chat/'
      tag: 'Documentation'
      text: 'Bits Chat'
    - link: '/actions/agents/'
      tag: 'Documentation'
      text: 'Bits Agent Builder'
    - link: '/mcp_server/'
      tag: 'Documentation'
      text: 'Datadog MCP Server'
---

## Overview

Use the Skills Library to define reusable domain knowledge and instructions for AI agents. Skills give agents task-specific context without requiring you to repeat the same information in each prompt.

For example, create a skill that describes an organization's incident response process, service ownership conventions, or requirements for summarizing an investigation.

Skills work with [Bits Chat][1], [Bits Agent Builder][2], the Datadog app for Slack, and external agents such as Claude Code, Codex, and Cursor that connect through the [Datadog MCP Server][3].

## Create a skill

Create a skill in the Skills Library or by asking Bits Chat.

### Create a skill in the Skills Library

1. Open the [**Skills Library**][4] in Datadog.
2. Create a skill or import an existing `SKILLS.md` file.
3. Add the domain knowledge and instructions that the agent should follow.
4. Select the skill's visibility:
    - **Private**: Keep the skill private.
    - **Public**: Share the skill with the Datadog organization.
5. Save the skill.

Use focused instructions and give the skill a descriptive name. A clear name makes the skill easier to discover and invoke with a slash command.

### Create a skill with Bits Chat

Ask Bits Chat to create a skill:

```text
Create a new Skills Library skill
```

To create a skill from the context in an existing Bits Chat conversation, enter:

```text
Turn this conversation into a skill
```

You can also create a skill from an existing Slack thread. In the thread, enter:

```text
@Datadog turn this conversation into a skill
```

## Use a skill in Bits Chat

To make a skill available to Bits Chat:

1. Open **Settings** in Bits Chat.
2. Select **Skills**.
3. Enable the skill.

After you enable a skill, Bits Chat uses it automatically when the skill is relevant to a request.

Invoke a skill explicitly by entering its slash command in the conversation:

```text
/my-skill
```

You can include additional context in the same message or continue the conversation after invoking the skill.

## Use a skill in Bits Agent Builder

In the agent configuration, select each skill that the agent needs. The agent automatically loads selected skills.

To invoke a skill explicitly during a conversation, enter its slash command:

```text
/my-skill
```

For more information about creating and testing agents, see [Bits Agent Builder][2].

## Use a skill in Slack

After you connect the Datadog app to Slack, mention `@Datadog` and add the skill's slash command:

```text
@Datadog /my-skill
```

Add any task-specific details after the command.

## Use skills with an external agent

External AI agents that connect to the Datadog MCP Server can discover and load skills from the Skills Library.

The Datadog MCP Server provides the following tools:

- `list_datadog_skills()`: Lists the skills available to the agent. Agents can also discover available skills through MCP Resources.
- `load_datadog_skill()`: Loads a selected skill into the agent's context.

A typical external-agent workflow is:

1. Connect the agent to the Datadog MCP Server.
2. Discover available skills with `list_datadog_skills()` or MCP Resources.
3. Load the skill needed for the task with `load_datadog_skill()`.
4. Ask the agent to complete the task using the loaded instructions and knowledge.

For connection instructions, see the [Datadog MCP Server][3] documentation.

## Availability

The Skills Library is supported Bits Chat, Bits Agent Builder, Slack, and external agents that connect through the Datadog MCP Server.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /actions/agents/
[3]: /mcp_server/
[4]: https://app.datadoghq.com/actions/skills
