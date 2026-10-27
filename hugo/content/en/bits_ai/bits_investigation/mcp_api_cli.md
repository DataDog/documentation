---
title: MCP, API, CLI
description: "Use Bits Investigation from AI assistants, applications, and the command line with MCP tools, the Bits AI API, and pup."
---

Use Bits Investigation from AI assistants, applications, and the command line.

## MCP

The Datadog MCP Server's `investigator` toolset lets AI assistants trigger investigations for monitor alerts, incidents, or a text description. The tools also support searching investigations, retrieving findings, and steering a running investigation with additional context.

For available tools, required permissions, and example prompts, see [Investigations in the MCP tools reference][1]. To connect an AI assistant and enable the toolset, see [Set Up the Datadog MCP Server][2].

Paste the following prompt into your AI assistant to enable the `investigator` toolset:

{{< code-block lang="text" wrap="true" >}}
Enable the "investigator" toolset (Bits AI investigations) on my Datadog MCP server.

1. Find my Datadog MCP server config. It's the server whose URL is on a Datadog "mcp." host and ends in /api/unstable/mcp-server/mcp. Look in, for example, ~/.cursor/mcp.json or .cursor/mcp.json for Cursor, `claude mcp list` or ~/.claude.json for Claude Code, and ~/.codex/config.toml for Codex.
2. Add "investigator" to the toolsets, keeping every toolset that's already there:
   - If the URL has a `toolsets` query parameter, append `,investigator` to it.
   - If the URL has no `toolsets` parameter, add `?toolsets=core,investigator`. Setting toolsets replaces the defaults, so `core` has to stay.
   - If it uses `toolsets=all`, change it to `toolsets=all,investigator`. "all" doesn't include investigator yet.
   - If the config sets an `X-Datadog-MCP-Toolsets` header instead, add `investigator` there. The header overrides the URL.
3. Don't change anything else: not the host, auth, or other servers.
4. Show me the before and after, then tell me to restart or reload the MCP server. Once it reconnects, confirm that tools like trigger_bits_ai_investigation, trigger_general_investigation, search_investigations, and get_bits_ai_investigation show up.
{{< /code-block >}}

## API

Use the Bits AI API to trigger investigations from applications and automation. For request parameters, authentication requirements, and code examples, see [Trigger a Bits AI investigation][3].

## CLI

Use the [pup CLI][4] to list, retrieve, and trigger investigations from the command line with `pup investigations list`, `pup investigations get`, and `pup investigations trigger`. The trigger command accepts an investigation request from a JSON file with `--file`.

For the investigation command implementation, see [pup investigation commands][5]. Run `pup investigations --help` for command usage and options.

[1]: /mcp_server/tools/#investigations
[2]: /mcp_server/setup/
[3]: /api/latest/bits-ai/trigger-a-bits-ai-investigation/
[4]: https://github.com/DataDog/pup
[5]: https://github.com/DataDog/pup/blob/main/src/commands/investigations.rs
