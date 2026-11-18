---
title: Manage Observability Pipelines with AI Agents
description: Learn how to build, inspect, update, and delete pipelines in Observability Pipelines with AI agents, using the Datadog MCP Server, the Pup CLI, and Bits AI in the pipeline builder.
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

You can use AI agents to build and maintain your pipelines in the following ways:

- [Bits in the pipeline builder](#bits-in-the-pipeline-builder): Ask Bits in the Observability Pipelines UI to inspect, validate, build, and edit pipelines. Bits can do everything the MCP Server toolset does and can also update pipelines. You can review each change before you deploy it.
- [Datadog MCP Server](#datadog-mcp-server): Connect an AI agent, such as Claude Code or Cursor, to the `observability-pipelines` toolset to inspect, validate, and create pipelines.
- [Pup CLI](#pup-cli): Let an AI agent run Pup commands to perform any action available in the API, such as listing, creating, updating, and deleting pipelines.

| Action | Bits in the pipeline builder | MCP Server | Pup CLI |
|---|---|---|---|
| List and inspect pipelines | {{< X >}} | {{< X >}} | {{< X >}} |
| Validate a configuration | {{< X >}} | {{< X >}} | {{< X >}} |
| Create a pipeline | {{< X >}} | {{< X >}} | {{< X >}} |
| Update a pipeline | {{< X >}} | | {{< X >}} |
| Delete a pipeline | | | {{< X >}} |

A new pipeline does not process data until you [install the Worker][1] for it. Changes are subject to the same [permissions][2] as changes made in the UI.

How an update is made to an active pipeline depends on the tool used to make the change:

- **Bits in the pipeline builder**: Changes stay on the pipeline's Edit page. The pipeline keeps running its deployed configuration until you click {{< ui >}}Next: Deploy changes{{< /ui >}}.
- **Pup CLI and the API**: There is no review or deploy step. The new configuration is pushed to your Workers and **goes live immediately** on every Worker running the pipeline.

<div class="alert alert-danger">Updating an active pipeline with Pup or the API is <b>unsafe</b>. See <a href="#risks-of-updating-pipelines-with-pup-or-the-api">Risks of updating pipelines with Pup</a> before you let an agent update a pipeline.</div>

## Bits in the pipeline builder

{{< callout url="#" btn_hidden="true">}}
Bits in the pipeline builder is in Preview. Contact your account manager to request access.
{{< /callout >}}

To create a pipeline with Bits:

1. On the [{{< ui >}}Create pipeline{{< /ui >}}][8] page, describe the pipeline you want, pick one of the suggested pipelines, or click {{< ui >}}Let Bits guide you{{< /ui >}}. Bits opens a draft in the pipeline builder and builds it one component at a time. Each step is previewed on the canvas, with the components it adds or changes highlighted.
1. Click a highlighted component to review its settings, then accept or reject the step. Check custom functions and filter queries carefully. To accept steps automatically, turn on {{< ui >}}Auto-approve{{< /ui >}} in Bits.
1. When Bits is done, review the pipeline and click {{< ui >}}Next: Install{{< /ui >}} to install the Worker and deploy the pipeline. Bits never deploys the draft.

To update a deployed pipeline:

1. Open the pipeline and ask Bits for the change. Bits previews each step on the canvas and highlights the components it changes.
1. Click a highlighted component to review its settings, then accept or reject the step. Check custom functions and filter queries carefully. Accepted steps aren't automatically deployed, and the pipeline continues to run its current configuration.
1. Click {{< ui >}}Next: Deploy changes{{< /ui >}} to deploy the accepted changes. Leaving or reloading the page discards changes that aren't deployed.

## Datadog MCP Server

The `observability-pipelines` toolset lets an AI agent list and describe your pipelines, look up the fields of each source, processor, and destination, validate a configuration, and create a pipeline. The toolset cannot update or delete existing pipelines. To update a pipeline, Datadog recommends using [Bits in the pipeline builder](#bits-in-the-pipeline-builder).

1. [Set up the Datadog MCP Server][4].
1. Add `observability-pipelines` to the `toolsets` query parameter of the MCP Server endpoint, for example:
   
1. Ask your agent about your pipelines. For example:
   - "Explain what the Prod Agent Logs pipeline does."
   - "Create a logs pipeline that receives logs from the Datadog Agent, drops debug logs, and sends the rest to Datadog."

See [Observability Pipelines tools][5] for the list of tools and the permissions each one requires.

## Pup CLI

<div class="alert alert-danger"><code>pup obs-pipelines update</code> pushes the new configuration directly to your running Workers, with no deploy step and no automatic rollback. Only use it if every Worker running the pipeline is on the latest version, and every secret, environment variable, and file the configuration references (such as TLS certificates, enrichment table files, and credentials files) exists on each Worker host. See <a href="#risks-of-updating-pipelines-with-pup-or-the-api">Risks of updating pipelines with Pup or the API</a>.</div>

[Pup][6] is Datadog's command-line interface for AI agents and automation. Its `obs-pipelines` commands cover the full pipeline life cycle, including updates and deletions:

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

- **Changes go live immediately.** Pup pushes the new configuration to your Workers. There is no draft, review, or deploy step, and no automatic rollback.
- **Validation is not enough for older Workers.** `pup obs-pipelines validate` checks the configuration against the latest Worker version. A configuration that passes validation can still be incompatible with an older Worker. The pipeline builder UI runs additional checks and warns you when a configuration is not compatible with your Worker version, but Pup and the API do not.
- **Some errors are only detected on the Worker.** For example, a configuration that references a file or an environment variable that doesn't exist on the Worker host can pass validation but fail when applied on the Worker.
- **A configuration that fails to load stops the pipeline.** If a Worker can't load the new configuration, it stops running the pipeline instead of falling back to the previous configuration. The pipeline doesn't process data on that Worker until you push a corrected configuration. This ensures that all workers process data using the same configuration.
- **Pup does not report Worker errors.** `pup obs-pipelines update` succeeds as soon as the API accepts the configuration. It doesn't tell you whether the Workers loaded it.

To update a pipeline with Pup:

1. [Upgrade every Worker][9] running the pipeline to the latest version. If you can't, make the change with [Bits in the pipeline builder](#bits-in-the-pipeline-builder) or in the UI instead.
1. Save the current configuration to a backup file with `pup obs-pipelines get` so you can restore it. If the legacy `processors` field is still present, remove it from the file and keep `processor_groups`: the API rejects a configuration that has both.
1. Make a copy of the backup and edit it, such as change a processor's settings.
1. Check that every secret, file, and [environment variable][10] the configuration references exists on each Worker host.
1. Check the changes with `pup obs-pipelines validate` and `pup obs-pipelines diff`.
1. Apply them with `pup obs-pipelines update`.
1. If you added, updated, or deleted a source, destination, or corresponding secrets, restart the Worker for the change to take effect. See [Update Existing Pipelines][7].
1. Confirm that the Workers loaded the new configuration and that data is flowing. See [Monitoring and Troubleshooting][11] to investigate the issue. If data isn't flowing, restore the backup with `pup obs-pipelines update` right away.

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
