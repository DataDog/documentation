---
title: GPU Monitoring MCP tools
description: "Connect AI agents to your GPU Monitoring data using the Datadog MCP Server."
further_reading:
- link: "/mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
- link: "/mcp_server/setup"
  tag: "Documentation"
  text: "Set up the Datadog MCP Server"
- link: "/mcp_server/tools/#gpu-monitoring"
  tag: "Documentation"
  text: "GPU Monitoring tools reference"
- link: "/gpu_monitoring/inference"
  tag: "Documentation"
  text: "Monitor Inference Workloads with GPU Monitoring"
- link: "/gpu_monitoring/setup"
  tag: "Documentation"
  text: "Set up GPU Monitoring"
---

{{< callout url="#" btn_hidden="true" >}}
GPU Monitoring MCP tools are in Early Access Preview. Contact your Customer Success Manager for access.
{{< /callout >}}

## Overview

The [Datadog MCP Server][1] lets AI agents access your [GPU Monitoring][2] data through the Model Context Protocol (MCP). The `gpu-monitoring` toolset gives agents access to fleet and hardware topology, workload context, GPU hardware and host health, training progress, idle GPU jobs, self-hosted LLM inference performance, and GPU kernel profiling. Use these tools in MCP-compatible clients such as Claude Code, Codex CLI, Cursor, or Claude Desktop.

## Setup

Connect an MCP-compatible client to the Datadog MCP Server with the `gpu-monitoring` toolset enabled.

<div class="alert alert-info">For full setup instructions, including other clients, see <a href="/mcp_server/setup/">Set up the Datadog MCP Server</a>.</div>

### Prerequisites

- Your organization has access to the GPU Monitoring MCP tools Preview.
- Your organization uses [GPU Monitoring][3].
- Your Datadog user can access the MCP Server and has the `timeseries_query` and `apm_read` [permissions][4].
- An MCP-compatible client (for example, Claude Code, Codex CLI, Cursor, or Claude Desktop).

### Endpoint

The MCP Server endpoint depends on your [Datadog site][5]. Use the {{< ui >}}Datadog Site{{< /ui >}} selector to display the endpoint for your site.

The `gpu-monitoring` toolset is not enabled by default, so you must name it in the `toolsets` query parameter. Append `?toolsets=core,gpu-monitoring` to keep the core Datadog tools and add the GPU Monitoring tools.

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
Endpoint for your selected site ({{< region-param key="dd_site_name" >}}):
<pre><code>{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,gpu-monitoring</code></pre>
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

If you already have the Datadog MCP Server configured, add `gpu-monitoring` to the `toolsets` parameter in the existing server URL instead of adding a second server.

### Connect

{{< site-region region="us,us3,us5,eu,ap1,ap2,uk1" >}}
**Claude Code** (command line):

<pre><code>claude mcp add --transport http datadog "{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,gpu-monitoring"</code></pre>

Then start Claude Code, run `/mcp`, and complete the Datadog login in your browser.

**Codex CLI** (command line):

<pre><code>codex mcp add datadog --url "{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,gpu-monitoring"
codex mcp login datadog</code></pre>

**Cursor, Claude Desktop, and other JSON-configured clients**:

<pre><code>{
  "mcpServers": {
    "datadog": {
      "type": "http",
      "url": "{{< region-param key="mcp_server_endpoint" >}}?toolsets=core,gpu-monitoring"
    }
  }
}
</code></pre>

Restart the client, and log in to Datadog when prompted.
{{< /site-region >}}

{{< site-region region="gov,gov2" >}}
<div class="alert alert-danger">This product is not supported for your selected site ({{< region-param key="dd_site_name" >}}).</div>
{{< /site-region >}}

### Verify the connection

1. Confirm the tools are listed:
   - In Claude Code, run `/mcp`, select the `datadog` server, and view its tools.
   - In other clients, open the MCP server's tool list.

   Tools for GPU Monitoring start with `gpu_monitoring_`. You can also ask the agent: "List the Datadog tools whose names start with gpu_monitoring."

2. Run a test call. Ask the agent:

   ```
   Use gpu_monitoring_list_inference_deployments to list my inference deployments from the last hour.
   ```

   A list of deployments with throughput, latency, and a health verdict means the connection works. An empty list is also a successful result. It means no self-hosted vLLM, SGLang, or Dynamo deployments reported data in that hour.

## Available tools

The `gpu-monitoring` toolset includes the following tools, grouped by use case. For the full reference, including required permissions and example prompts, see the [GPU Monitoring section of Datadog MCP Server Tools][6].

### Fleet and topology

`gpu_monitoring_get_fleet_summary`
: Counts your organization's GPUs by state, using the same counts as the GPU Monitoring fleet funnel: available (for example, allocated or idle), unavailable with reasons, and unknown.

`gpu_monitoring_list_topology_groups`
: The starting point for hardware topology. Lists the clusters, then the clusters, racks, or NVLink domains with hardware issues, worst first.

`gpu_monitoring_list_topology_nodes`
: Lists the hosts, GPUs, racks, or NVLink domains in one cluster, with presence status and health evidence.

`gpu_monitoring_list_topology_events`
: Lists topology and fault events for one GPU cluster over up to 7 days: GPUs added or lost, hosts departed, faults raised and cleared, and XIDs.

### Workload context

`gpu_monitoring_orient_workload_tagging`
: Determines which tags identify a GPU workload, the filters to use against metrics, logs, and traces, and which attempt of the run the time window covers.

`gpu_monitoring_orient_hardware_inventory`
: Identifies which GPU devices, hosts, racks, and NVLink fabric domains a workload occupies, and how many of each.

`gpu_monitoring_identify_workload_framework`
: Identifies a GPU workload's orchestrator, training framework, and inference server from metric tags, APM spans, and logs, with a confidence level.

### Health and job status

`gpu_monitoring_analyze_gpu_hardware_health`
: Checks a workload's GPUs for hardware problems and reports which hardware categories show a signal, what each one points to, and which NVIDIA XID codes corroborate it. Uses the host filter from `gpu_monitoring_orient_hardware_inventory`.

`gpu_monitoring_analyze_host_health`
: Checks a workload's hosts against thresholds on host-level resources over a time window and reports which hosts are in trouble. Uses the host filter from `gpu_monitoring_orient_hardware_inventory`.

`gpu_monitoring_analyze_training_stepping`
: Reports whether a training job's step counter is still advancing, against a tolerance sized from the job's own step cadence. Missing data is reported as unknown, never as a stall. Uses the entity filter from `gpu_monitoring_orient_workload_tagging`.

`gpu_monitoring_analyze_zombie_job`
: Decides whether a GPU job is alive or should be reclaimed (`zombie`, `idle_held`, or `idle_empty`). Analyzes one job, or every job in a scope.

### Inference

`gpu_monitoring_list_inference_deployments`
: Lists self-hosted LLM inference deployments (vLLM, SGLang, and NVIDIA Dynamo) with throughput, latency, error rate, KV cache usage, and a health verdict, worst first. Hosted model providers are not covered.

`gpu_monitoring_get_inference_perf_summary`
: Measures an inference workload's serving performance over a time window: requests, time to first token and inter-token latency, throughput, prefix cache hits, queueing, and KV cache usage. Uses the scope from `gpu_monitoring_list_inference_deployments`.

`gpu_monitoring_get_inference_configuration`
: Reports how an inference deployment's engines (vLLM, SGLang) are configured: model, parallelism, KV cache, batching, and scheduling, with the source of every value.

`gpu_monitoring_get_inference_forward_pass_profile`
: Shows how an inference engine spends its forward passes: the split between decode and prefill, how pass time grows with batch size and scheduled tokens, and whether speculative decoding runs.

`gpu_monitoring_find_inference_forward_pass_traces`
: Finds individual forward passes of an inference engine (vLLM, SGLang), filtered by phase, batch size, and scheduled tokens, newest or slowest first.

### Kernels and traces

`gpu_monitoring_rank_gpu_kernels`
: Ranks the GPU kernels a training or inference workload ran by total time, from the kernel spans profiled at kernel level.

`gpu_monitoring_get_gpu_kernel_trend`
: Follows one GPU kernel of a training or inference workload over time, through the traces profiled at kernel level. Uses a kernel from `gpu_monitoring_rank_gpu_kernels`.

`gpu_monitoring_export_parsed_trace`
: Fetches a complete APM trace, decodes its spans, and extracts the GPU kernel data into a temporary private file.

`gpu_monitoring_export_raw_trace`
: Fetches a complete APM trace and saves its original JSON as a temporary private file.

### Insights

`gpu_monitoring_query_insights`
: Runs bounded SQL queries over your organization's stored GPU Monitoring insights, such as training step metrics and straggler scores.
## Troubleshooting

| Issue | Likely cause |
|-------|--------------|
| No `gpu_monitoring_` tools are listed. | `gpu-monitoring` is missing from the `toolsets` parameter in the server URL, or the Preview is not enabled for your organization. |
| An error says the organization isn't onboarded onto GPU Monitoring. | GPU Monitoring is not set up for your organization. See [Set up GPU Monitoring][3]. |
| An error names a missing permission. | Your Datadog user lacks that permission. Ask your Datadog administrator to grant it. |
| You see repeated login prompts. | Rerun the login: `/mcp` in Claude Code, or `codex mcp login datadog` in Codex CLI. |

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /mcp_server/
[2]: /gpu_monitoring/
[3]: /gpu_monitoring/setup/
[4]: /account_management/rbac/permissions/
[5]: /getting_started/site/
[6]: /mcp_server/tools/#gpu-monitoring
