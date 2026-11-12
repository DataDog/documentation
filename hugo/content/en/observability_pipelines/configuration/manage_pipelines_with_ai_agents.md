---
title: Manage Pipelines with AI Agents
description: Learn how to build, inspect, update, and delete Observability Pipelines pipelines with AI agents, using the Datadog MCP Server, the Pup CLI, and Bits AI in the pipeline builder.
disable_toc: false
further_reading:
- link: "mcp_server/tools/#observability-pipelines"
  tag: "Documentation"
  text: "Observability Pipelines MCP tools"
- link: "cli/"
  tag: "Documentation"
  text: "Pup CLI"
- link: "https://docs.datadoghq.com/api/latest/observability-pipelines/"
  tag: "Documentation"
  text: "Observability Pipelines API"
---

## Overview

You can use AI agents to build and maintain your pipelines in three ways:

- [Datadog MCP Server](#datadog-mcp-server): Connect an AI agent, such as Claude Code, Cursor, or Bits AI, to the `observability-pipelines` toolset to inspect, validate, and create pipelines.
- [Pup CLI](#pup-cli): Let an AI agent run Pup commands to list, create, update, and delete pipelines.
- [Bits AI in the pipeline builder](#bits-ai-in-the-pipeline-builder): Describe the pipeline you want in the Observability Pipelines UI and accept or reject the components Bits AI proposes.

| Action | MCP Server | Pup CLI | Bits AI in the pipeline builder |
|---|---|---|---|
| List and inspect pipelines | {{< X >}} | {{< X >}} | |
| Validate a configuration | {{< X >}} | {{< X >}} | |
| Create a pipeline | {{< X >}} | {{< X >}} | {{< X >}} |
| Update a pipeline | | {{< X >}} | {{< X >}} |
| Delete a pipeline | | {{< X >}} | |

With any of these, a new pipeline does not process data until you [install the Worker][1] for it. Changes are subject to the same [permissions][2] as changes made in the UI.

## Datadog MCP Server

The `observability-pipelines` toolset lets an AI agent list and describe your pipelines, look up the fields of each source, processor, and destination, validate a configuration, and create a pipeline. The toolset cannot update or delete existing pipelines. Use [Pup](#pup-cli) or the [API][3] for those actions.

1. [Set up the Datadog MCP Server][4].
1. Add `observability-pipelines` to the `toolsets` query parameter of the MCP Server endpoint, for example:
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=observability-pipelines</code></pre>
1. Ask your agent about your pipelines. For example:
   - "Explain what the Prod Agent Logs pipeline does."
   - "Create a logs pipeline that receives logs from the Datadog Agent, drops debug logs, and sends the rest to Datadog."

See [Observability Pipelines tools][5] for the list of tools and the permissions each one requires.

## Pup CLI

[Pup][6] is Datadog's command-line interface for AI agents and automation. Its `obs-pipelines` commands cover the full pipeline lifecycle, including updates and deletions:

| Command | Description |
|---|---|
| `pup obs-pipelines list` | List pipelines. |
| `pup obs-pipelines get <PIPELINE_ID>` | Get a pipeline's configuration as JSON. |
| `pup obs-pipelines validate --file <FILE>` | Validate a configuration without creating it. |
| `pup obs-pipelines create --file <FILE>` | Create a pipeline from a JSON file. |
| `pup obs-pipelines diff --file <FILE> <PIPELINE_ID>` | Compare a JSON file against the live pipeline. |
| `pup obs-pipelines update --file <FILE> <PIPELINE_ID>` | Update a pipeline from a JSON file. |
| `pup obs-pipelines delete <PIPELINE_ID>` | Delete a pipeline. |

To update a pipeline, an agent typically:

1. Saves the current configuration with `pup obs-pipelines get <PIPELINE_ID> --no-envelope > pipeline.json`.
1. Edits the file, for example to change a processor's settings.
1. Checks the changes with `pup obs-pipelines validate --file pipeline.json` and `pup obs-pipelines diff --file pipeline.json <PIPELINE_ID>`.
1. Applies them with `pup obs-pipelines update --file pipeline.json <PIPELINE_ID>`.

Pup uses the [Observability Pipelines API][3] format. If you add, update, or delete a source, destination, or their secrets, restart the Worker for the change to take effect. See [Update Existing Pipelines][7].

## Bits AI in the pipeline builder

{{< callout url="#"
 btn_hidden="true" header="Join the Preview!">}}
Bits AI in the pipeline builder is in Preview. Contact your account manager to request access.
{{< /callout >}}

When you [create a pipeline][8] in the UI, you can describe what you want in the prompt bar, pick a suggested pipeline, or let Bits AI guide you. Bits AI proposes changes one component at a time, and you accept or reject each one. You can also use Bits AI to edit a deployed pipeline from the pipeline builder.

Review each proposed component before you deploy, especially custom functions and filter queries.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /observability_pipelines/configuration/install_the_worker/
[2]: /observability_pipelines/configuration/access_control/
[3]: /api/latest/observability-pipelines/
[4]: /mcp_server/setup/
[5]: /mcp_server/tools/#observability-pipelines
[6]: /cli/
[7]: /observability_pipelines/configuration/update_existing_pipelines/
[8]: /observability_pipelines/configuration/set_up_pipelines/
