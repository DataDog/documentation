---
title: Feature Flag MCP Server
description: Learn how to use the feature flag MCP server
---

{{< callout url="http://datadoghq.com/product-preview/feature-flags/" >}}
Feature Flags are in Preview. Complete the form to request access.
{{< /callout >}}

## Overview

This MCP (Model Context Protocol) server provides AI agents with access to Datadog Feature Flag management capabilities, including flag creation, configuration, and React/JavaScript integration guidance.

The following will give your AI agent access to our MCP. You will have to restart your agent after doing this setup.

```bash
curl -sSL https://coterm.datadoghq.com/mcp-cli/install.sh | bash
```

### Claude

```
claude mcp add datadog -- ~/.local/bin/datadog_mcp_cli --endpoint-path /api/unstable/mcp-server/mcp?toolsets=feature-flags
```

### Cursor
In `~/.cursor/mcp.json`, add this to the ` "mcpServers"` dict (and save)

```javascript
    "datadog-ff": {
      "type": "stdio",
      "command": "~/.local/bin/datadog_mcp_cli --endpoint-path /api/unstable/mcp-server/mcp?toolsets=feature-flags",
      "args": [],
      "env": {}
    },
```

## Use Cases in React Apps

Note that we currently only support React apps.

### Creating Feature Flags

The server has tooling to create feature flags. You can use the `create-feature-flag` tool to create a new feature flag. You do not need to specify the tool name in the prompt, but if you do you will get more consistent results.
Your AI will know to read our documentation to resource and how to implement the flag in your codebase.

It's also best if you do not yet have Datadog feature flagging implemented to tell it in the prompt that you want to implement Datadog feature flagging.

Examples:
```text
Use the `create-feature-flag` tool to create a flag to control the title on the main page.
```

```text
I want to show a confirmation modal when <SOME_EVENT> happens.  Use a feature flag to control whether the confirmation modal is shown.
```

### Checking Feature Flag Implementation

The server has tooling to check if a feature flag is implemented correctly. You can use the `check-flag-implementation` tool to check if a feature flag is implemented correctly.

It will check the flag is being referenced as the correct value type, passing the correct subject attributes, and providing the correct default value agreeing with default in production environments.

Examples:
```text
Check if the `show-confirmation-modal` flag is implemented correctly.
```

```text
Check if all feature flags in /some/directory are implemented correctly.
```

NOTE: This may not find all issues. Checking flags individually is more reliable.

This tool can also be used to add feature flags created in the UI to your codebase.

```text
Use the `show-confirmation-modal` flag to control whether the confirmation modal is shown when <SOME_EVENT> happens.
```

### Listing Feature Flags

The server has tooling to list feature flags. You can use the `list-feature-flags` tool to list all feature flags.

Examples:

```text
List all feature flags.
```

### Listing Environments

The server has tooling to list environments. You can use the `list-environments` tool to list all environments.

Examples:

```text
List my flagging environments.
```

### Updating Feature Flag Environments
The server has tooling to update feature flag environments. You can use the `update-feature-flag-environment` tool to update a feature flag environment. It can control the default variants, and enable/disable the flag.
It currently cannot modify flags in production environments.

Examples:

```text
I want `show-confirmation-modal` to serve true in development.
```

Disable `show-confirmation-modal` in staging.
```
### Allocations
