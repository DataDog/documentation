---
title: AI Tools
description: "Use Bits Assistant and the Datadog MCP Server to query and troubleshoot network devices with natural language."
further_reading:
  - link: "/bits_ai/bits_assistant"
    tag: "Documentation"
    text: "Bits Assistant Overview"
  - link: "/bits_ai/mcp_server"
    tag: "Documentation"
    text: "Datadog MCP Server"
  - link: "/network_monitoring/devices/setup"
    tag: "Documentation"
    text: "NDM Setup"
---

## Overview

[Bits Assistant][1] integrates with Network Device Monitoring (NDM) to let you query and troubleshoot network devices, interfaces, and traffic patterns using natural language. You can look up devices, filter by tags, investigate interface errors, and analyze network events without navigating multiple pages or constructing complex queries.

NDM data is also available through the [Datadog MCP Server][2], which connects your AI agents to Datadog observability data using the Model Context Protocol (MCP).

## Prerequisites

- Sign up for the [Bits Assistant Preview][4].
- [Network Device Monitoring][3] is configured on your devices.
- The [Bits Assistant Access][5] permission is enabled for your Datadog role.

## Query network devices

Open Bits Assistant by clicking **Ask Bits** in the top-right of the navigation bar or pressing <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>I</kbd>.

### Device lookup and filtering

Search for devices by location, type, vendor, or any tag applied to your monitored devices.

Example prompts:
- `Show me all network devices in the us-east datacenter`
- `Find firewalls that are reporting errors`
- `List all monitored switches and their statuses`

### Interface troubleshooting

Retrieve interface details for a specific device to investigate connectivity or performance issues.

Example prompts:
- `Show me all interfaces on router core-01`
- `Which interfaces have high error rates on device switch-prod-02?`

### Traffic analysis

Analyze NetFlow data to understand traffic patterns and identify anomalies.

Example prompts:
- `What are the top traffic flows going through router core-01?`
- `Show me traffic patterns for the production subnet over the last hour`

### Configuration auditing

Review device configurations and recent changes to correlate with incidents.

Example prompts:
- `Show me the configuration for device firewall-prod-01`
- `When did the configuration last change on this device?`

## MCP Server tools

The [Datadog MCP Server][2] includes NDM tools in the `networks` toolset. These tools require the [`NDM Read`][10] permission.

| Tool | Description |
|------|-------------|
| [`search_ndm_devices`][7] | Search network devices by tags, location, or status. |
| [`get_ndm_device`][8] | Retrieve detailed information about a specific device. |
| [`search_ndm_interfaces`][9] | List all interfaces for a specific device. |

For setup instructions, see [Set up the Datadog MCP Server][6].

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /bits_ai/bits_assistant/
[2]: /bits_ai/mcp_server/
[3]: /network_monitoring/devices/setup/
[4]: https://www.datadoghq.com/product-preview/bits-assistant/
[5]: /account_management/rbac/permissions/#bits-ai
[6]: /bits_ai/mcp_server/setup/
[7]: /bits_ai/mcp_server/#search_ndm_devices
[8]: /bits_ai/mcp_server/#get_ndm_device
[9]: /bits_ai/mcp_server/#search_ndm_interfaces
[10]: /account_management/rbac/permissions/#network-device-monitoring
