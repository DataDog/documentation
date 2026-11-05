---
title: MCP, API, CLI
description: "Use Bits Investigation from AI assistants, applications, and the command line with MCP tools, the Bits AI API, and pup."
---

Use Bits Investigation from AI assistants, applications, and the command line to search and read existing investigations, trigger new investigations, and steer running investigations with additional context.

## Requirements

Triggering and steering investigations requires the `Bits Investigations Write` [permission][1]. Searching and retrieving investigations requires `Bits Investigations Read`.

## Datadog MCP Server

The Datadog Model Context Protocol (MCP) Server's `investigator` toolset includes read tools to search and read existing investigations and their findings. It also lets AI assistants trigger investigations for monitor alerts, incidents, or a natural-language description, and steer a running investigation with additional context.

For available tools, required permissions, and example prompts, see [Investigations in the MCP tools reference][2].

### Setup and testing

Enter the following prompt in your AI assistant to check tool availability and try an investigation. For setup details, see [Set Up the Datadog MCP Server][3].

{{< code-block lang="text" wrap="true" >}}
Check whether Bits Investigation tools, such as trigger_bits_ai_investigation, are available. If they aren't available, help me set them up by following https://docs.datadoghq.com/mcp_server/setup/. The investigator toolset is included in toolsets=all.

Once the tools are available, help me find a monitor that is currently alerting and trigger a Bits investigation to figure out what's wrong.
{{< /code-block >}}

## Bits AI API

Use the Bits AI API to trigger, list, and retrieve investigations from applications and automation scripts. For request parameters, authentication, and code examples, see the [Bits AI API reference][4].

## Pup CLI

Use [pup][5], the Datadog command-line tool, to list, retrieve, and trigger investigations: `pup investigations list`, `pup investigations get`, and `pup investigations trigger`. The trigger command accepts an investigation request from a JSON file with `--file`.

Run `pup investigations --help` for command usage and options.

[1]: /account_management/rbac/permissions/#bits-ai
[2]: /mcp_server/tools/#investigations
[3]: /mcp_server/setup/
[4]: /api/latest/bits-ai/
[5]: https://github.com/DataDog/pup
