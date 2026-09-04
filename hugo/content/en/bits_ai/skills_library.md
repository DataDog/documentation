---
title: Skills Library
description: Create reusable skills that provide Bits AI and external AI agents with your organization's domain knowledge and instructions.
further_reading:
  - link: "/bits_ai/bits_chat/"
    tag: "Documentation"
    text: "Bits Chat"
  - link: "/actions/agents/"
    tag: "Documentation"
    text: "Bits Agent Builder"
  - link: "/bits_ai/mcp_server/"
    tag: "Documentation"
    text: "Datadog MCP Server"
---

## Overview

The Skills Library lets you create and share reusable capabilities for AI agents. A skill contains domain knowledge or a set of instructions that an agent can use when it is relevant to a task. With a skill, you define guidance once instead of adding the same context to every prompt or agent.

For example, you can create a skill that describes your organization's incident response process, service ownership conventions, or requirements for summarizing an investigation.

You can use skills with:

- [Bits Chat][1]
- [Bits Agent Builder][2]
- The Datadog app for Slack
- External agents such as Claude Code, Codex, and Cursor that connect through the [Datadog MCP Server][3]

## Create a skill

1. Open the [**Skills Library**][4] in Datadog.
2. Create a skill directly, or import an existing `SKILLS.md` file.
3. Add the domain knowledge and instructions that the agent should follow.
4. Set the skill's visibility:
   - **Private**: Keep the skill private.
   - **Public**: Make the skill available in your Datadog organization.
5. Save the skill.

Use focused instructions and give the skill a descriptive name. A clear name makes the skill easier to discover and invoke with a slash command.

## Use a skill in Bits Chat

To make a skill available to Bits Chat:

1. Open **Settings** in Bits Chat.
2. Select **Skills**.
3. Enable the skill.

After you enable a skill, Bits Chat can use it automatically when it determines that the skill is relevant to your request.

To invoke a skill explicitly, enter its slash command in the conversation:

```text
/my-skill
```

You can include additional context in the same message or continue the conversation after invoking the skill.

## Use a skill in Bits Agent Builder

Add relevant skills to an agent's instructions to make them available in the agent's context. Choose only the skills the agent needs for its intended tasks so that its instructions remain focused.

While testing the agent in the built-in chat, invoke a skill explicitly with its slash command:

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

External AI agents connected to the Datadog MCP Server can discover and load skills from your Skills Library.

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

The Skills Library supports Bits Chat, Bits Agent Builder, Slack, and external agents connected through the Datadog MCP Server. Skills are not currently available in Bits Investigation.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_chat/
[2]: /actions/agents/
[3]: /bits_ai/mcp_server/
[4]: https://app.datadoghq.com/actions/skills
