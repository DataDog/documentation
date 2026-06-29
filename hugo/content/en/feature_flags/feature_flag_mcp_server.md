---
title: Feature Flags MCP Server
description: "Learn how to use the Feature Flags toolset in the Datadog MCP Server"
further_reading:
- link: "getting_started/feature_flags"
  tag: "Documentation"
  text: "Getting Started with Feature Flags"
- link: "mcp_server/tools#feature-flags"
  tag: "Documentation"
  text: "Datadog MCP Server Feature Flags Tools"
- link: "mcp_server"
  tag: "Documentation"
  text: "Datadog MCP Server"
---

## Overview

The Datadog MCP Server uses the Model Context Protocol (MCP) to provide AI agents with access to [Feature Flags][1] management capabilities. These capabilities include flag creation, configuration, and React/JavaScript integration guidance.

## Setup

See the [Datadog MCP Server documentation][2] to enable the `feature-flags` toolset and view the available [Feature Flags tools][3], permissions, and example prompts.

## Use cases

The MCP Server includes tools to help you manage feature flags in your codebase. The following use cases provide sample prompts for using the tools.

<div class="alert alert-info">
  The code implementation tools, such as <code>check_datadog_flag_implementation</code>, target React applications. Other tools, such as <code>list_datadog_feature_flags</code> and <code>update_datadog_feature_flag_environment</code>, are framework-agnostic.
</div>

### Create feature flags

Use the `create_datadog_feature_flag` tool to create feature flags. You do not need to specify the tool name in the prompt. Including it can provide more consistent results.
The MCP Server has access to Datadog's documentation and uses it to implement the flag in your codebase.

If you do not yet have feature flags implemented, mention in the prompt that you want to implement Datadog feature flags.

Example prompts:
- Use the `create_datadog_feature_flag` tool to create a flag to control the title on the main page.
- Show a confirmation modal when `<SOME_EVENT>` happens. Use a Datadog feature flag to control whether the confirmation modal is shown.

### Check feature flag implementation

Use the `check_datadog_flag_implementation` tool to check if a feature flag is implemented correctly.

The tool checks whether the flag uses the correct value type, subject attributes, and default value. The default value should match the default in production environments.

Example prompts:
- Check if the `show-confirmation-modal` flag is implemented correctly.
- Check if all feature flags in `/some/directory` are implemented correctly.

**Note**: This may not find all issues. Checking flags individually is more reliable.

This tool can also be used to add feature flags created in the UI to your codebase. For example:

- Use the `show-confirmation-modal` flag to control whether the confirmation modal is shown when `<SOME_EVENT>` happens.

### List feature flags

Use the `list_datadog_feature_flags` tool to list all feature flags. For example:

- List all feature flags.

### List environments

Use the `list_datadog_feature_flag_environments` tool to list all environments. For example:

- List the flagging environments.

### Update feature flag environments
Use the `update_datadog_feature_flag_environment` tool to update a feature flag environment. This tool controls default variants and can enable or disable the flag.
It cannot modify flags in production environments.

Example prompts:

- Serve true for `show-confirmation-modal` in development.
- Disable `show-confirmation-modal` in staging.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /feature_flags/
[2]: /mcp_server/setup/#toolsets
[3]: /mcp_server/tools/#feature-flags
