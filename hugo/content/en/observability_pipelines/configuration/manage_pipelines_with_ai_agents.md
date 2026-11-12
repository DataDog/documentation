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

- [Bits AI in the pipeline builder](#bits-ai-in-the-pipeline-builder): Ask Bits AI in the Observability Pipelines UI to inspect, validate, build, and edit pipelines. Bits AI can do everything the MCP Server toolset does and can also update pipelines. You can review each change before you deploy it.
- [Datadog MCP Server](#datadog-mcp-server): Connect an AI agent, such as Claude Code or Cursor, to the `observability-pipelines` toolset to inspect, validate, and create pipelines.
- [Pup CLI](#pup-cli): Let an AI agent run Pup commands to do anything that is available in the API, such as listing, creating, updating, and deleting pipelines.

| Action | Bits AI in the pipeline builder | MCP Server | Pup CLI |
|---|---|---|---|
| List and inspect pipelines | {{< X >}} | {{< X >}} | {{< X >}} |
| Validate a configuration | {{< X >}} | {{< X >}} | {{< X >}} |
| Create a pipeline | {{< X >}} | {{< X >}} | {{< X >}} |
| Update a pipeline | {{< X >}} | | {{< X >}} |
| Delete a pipeline | | | {{< X >}} |

A new pipeline does not process data until you [install the Worker][1] for it. Changes are subject to the same [permissions][2] as changes made in the UI.

How an update reaches a running pipeline depends on the tool:

- **Bits AI in the pipeline builder**: Changes stay on the pipeline's Edit page. The pipeline keeps running its deployed configuration until you click **Next: Deploy changes**.
- **Pup CLI and the API**: There is no review or deploy step. The new configuration is pushed to your Workers through Remote Configuration and **goes live immediately** on every Worker running the pipeline.

<div class="alert alert-danger">Updating a running pipeline with Pup or the API is <b>unsafe</b>. See <a href="#risks-of-updating-pipelines-with-pup-or-the-api">Risks of updating pipelines with Pup</a> before you let an agent update a pipeline.</div>

## Bits AI in the pipeline builder

{{< callout url="#"
 btn_hidden="true" header="Join the Preview!">}}
Bits AI in the pipeline builder is in Preview. Contact your account manager to request access.
{{< /callout >}}

On the [**Create pipeline**][8] page, describe the pipeline you want, pick one of the suggested pipelines, or click **Let Bits guide you**. Bits AI opens a draft in the pipeline builder and builds it one component at a time. Each step is previewed on the canvas with the components it adds or changes highlighted. Click a highlighted component to review its settings, then accept or reject the step. Turn on **Auto-approve** in Bits AI to accept steps automatically. Bits AI never deploys the draft: when it's done, review the pipeline and click **Next: Install** to install the Worker and deploy it.

To change a deployed pipeline, open the pipeline and ask Bits AI for the change. Steps work the same way. Accepted steps aren't deployed: the pipeline keeps running its current configuration until you click **Next: Deploy changes**. Leaving or reloading the page discards changes that aren't deployed.

Review each proposed component before you deploy, especially custom functions and filter queries.

## Datadog MCP Server

The `observability-pipelines` toolset lets an AI agent list and describe your pipelines, look up the fields of each source, processor, and destination, validate a configuration, and create a pipeline. The toolset cannot update or delete existing pipelines. To update a pipeline, Datadog recommends using [Bits AI in the pipeline builder](#bits-ai-in-the-pipeline-builder).

1. [Set up the Datadog MCP Server][4].
1. Add `observability-pipelines` to the `toolsets` query parameter of the MCP Server endpoint, for example:
   <pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=observability-pipelines</code></pre>
1. Ask your agent about your pipelines. For example:
   - "Explain what the Prod Agent Logs pipeline does."
   - "Create a logs pipeline that receives logs from the Datadog Agent, drops debug logs, and sends the rest to Datadog."

See [Observability Pipelines tools][5] for the list of tools and the permissions each one requires.

## Pup CLI

<div class="alert alert-danger"><code>pup obs-pipelines update</code> pushes the new configuration directly to your running Workers, with no deploy step and no automatic rollback. Only use it if every Worker running the pipeline is on the latest version, and every secret, environment variable, and file the configuration references (such as TLS certificates, enrichment table files, and credentials files) exists on each Worker host. See <a href="#risks-of-updating-pipelines-with-pup-or-the-api">Risks of updating pipelines with Pup</a>.</div>

[Pup][6] is Datadog's command-line interface for AI agents and automation. Its `obs-pipelines` commands cover the full pipeline lifecycle, including updates and deletions:

| Command | Description |
|---|---|
| `pup obs-pipelines list` | List pipelines. |
| `pup obs-pipelines get` | Get a pipeline's configuration as JSON. |
| `pup obs-pipelines validate` | Validate a configuration without creating it. |
| `pup obs-pipelines create` | Create a pipeline from a JSON file. |
| `pup obs-pipelines diff` | Compare a JSON file against the live pipeline. |
| `pup obs-pipelines update` | Update a pipeline from a JSON file. The change goes live immediately. |
| `pup obs-pipelines delete` | Delete a pipeline, including a deployed pipeline. |

Pup uses the [Observability Pipelines API][3] format. For the arguments and options of each command, see the [Pup command reference][12] or run `pup obs-pipelines --help`.

### Risks of updating pipelines with Pup or the API

- **Changes go live immediately.** Pup pushes the new configuration to your Workers through Remote Configuration. There is no draft, review, or deploy step, and no automatic rollback.
- **Validation is not enough for older Workers.** `pup obs-pipelines validate` checks the configuration against the latest Worker version. A configuration that passes validation can still be incompatible with an older Worker. The pipeline builder UI runs additional checks and warns you when a configuration is not compatible with your Worker version, but Pup and the API do not.
- **Some errors are only detected on the Worker.** For example, a configuration that references a file or an environment variable that doesn't exist on the Worker host passes validation but fails on the Worker.
- **A broken configuration stays broken.** If a Worker can't load the new configuration, the pipeline stays in that state until you push a corrected configuration.

To update a pipeline with Pup:

1. [Upgrade every Worker][9] running the pipeline to the latest version. If you can't, make the change with [Bits AI in the pipeline builder](#bits-ai-in-the-pipeline-builder) or in the UI instead.
1. Save the current configuration to a backup file with `pup obs-pipelines get` so you can restore it.
1. Make a copy of the backup and edit it, for example to change a processor's settings.
1. Check that every secret, file, and [environment variable][10] the configuration references exists on each Worker host.
1. Check the changes with `pup obs-pipelines validate` and `pup obs-pipelines diff`.
1. Apply them with `pup obs-pipelines update`.
1. Confirm that the Workers loaded the new configuration and that data is flowing. See [Monitoring and Troubleshooting][11]. If not, restore the backup with `pup obs-pipelines update`.

If you add, update, or delete a source, destination, or their secrets, restart the Worker for the change to take effect. See [Update Existing Pipelines][7].

If an AI agent runs Pup for you, configure the agent to ask for your approval before it runs `pup obs-pipelines update` or `pup obs-pipelines delete`.

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
[9]: /observability_pipelines/guide/upgrade_worker/
[10]: /observability_pipelines/guide/environment_variables/
[11]: /observability_pipelines/monitoring_and_troubleshooting/
[12]: https://github.com/DataDog/pup/blob/main/docs/COMMANDS.md
