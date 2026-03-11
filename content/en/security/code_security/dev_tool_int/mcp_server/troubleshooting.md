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

If you experience issues with the Datadog Code Security MCP Server, use the following solutions to diagnose and resolve common problems.

## Binary not found

If a scan returns an error about a missing binary, install the required binary using the instructions in the [Prerequisites][1] section. The server automatically detects missing binaries and provides platform-specific installation commands.

## Authentication errors

Verify your API and Application keys are set correctly:

```bash
echo $DD_API_KEY
echo $DD_APP_KEY
echo $DD_SITE
```

Verify your keys have the correct permissions. Read [API and Application Keys][2] for details.

## MCP server not responding

1. Check that the binary is installed and accessible:

    ```bash
    datadog-code-security-mcp version
    ```

2. Check MCP server logs:

    ```bash
    tail -f ~/Library/Logs/Claude/mcp*.log
    tail -f ~/.claude/logs/mcp*.log
    ```

3. Verify your client configuration points to the correct binary path. If installed through Homebrew, the binary should be on your `PATH`. Otherwise, use an absolute path in your configuration.

## Partial results

When running a comprehensive scan (`datadog_code_security_scan`), some scan types may succeed while others fail (for example, if only some binaries are installed). The server returns:

- Results from all successful scanners.
- Error messages with installation instructions for any scanners that failed.

This is expected behavior. Install the missing binaries and re-run to get complete results.

## Further Reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/dev_tool_int/mcp_server/#prerequisites
[2]: /account_management/api-app-keys/
