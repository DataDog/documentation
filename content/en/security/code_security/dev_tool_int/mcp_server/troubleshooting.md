---
title: Troubleshooting
description: Common issues and solutions for the Datadog Code Security MCP Server.
is_beta: true
further_reading:
- link: "/security/code_security/dev_tool_int/mcp_server/"
  tag: "Documentation"
  text: "Code Security MCP Server overview and setup"
- link: "/security/code_security/dev_tool_int/mcp_server/tools_reference/"
  tag: "Documentation"
  text: "Tools Reference"
---

If you experience issues with the [Datadog Code Security MCP Server][3], use the following solutions to diagnose and resolve common problems.

<div class="alert alert-info">This MCP server is separate from the <a href="/bits_ai/mcp_server">Datadog MCP Server</a>, which provides cloud-based access to Datadog features and data. The Code Security MCP Server runs locally and focuses on code-level security scanning.</div>

## Binary not found

If a scan returns an error about a missing binary, install it using the instructions in the [Install security binaries][1] section.

## Authentication errors

Check that your API and application keys are set:

```shell
echo $DD_API_KEY
echo $DD_APP_KEY
echo $DD_SITE
```

If the values are set but scans still fail, verify your keys have the correct permissions. See [API and Application Keys][2] for details.

## MCP server not responding

1. Check that the binary is installed and accessible:

    ```shell
    datadog-code-security-mcp version
    ```

2. Check MCP server logs:

    ```shell
    tail -f ~/Library/Logs/Claude/mcp*.log
    tail -f ~/.claude/logs/mcp*.log
    ```

3. Verify your client configuration points to the correct binary path. If installed through Homebrew, the binary should be on your `PATH`. Otherwise, use an absolute path in your configuration.

## Partial results

When running a comprehensive scan, some scan types may succeed while others fail (for example, if only some binaries are installed). The server returns:

- Results from all successful scanners.
- Error messages with installation instructions for any scanners that failed.

This is expected behavior. Install the missing binaries and re-run to get complete results.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/dev_tool_int/mcp_server/#install-security-binaries
[2]: /account_management/api-app-keys/
[3]: /security/code_security/dev_tool_int/mcp_server/
