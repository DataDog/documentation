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

<div class="alert alert-info">This MCP server is separate from the <a href="/mcp_server">Datadog MCP Server</a>, which provides cloud-based access to Datadog features and data. The Code Security MCP Server runs locally and focuses on code-level security scanning.</div>

## Binary not found

If a scan returns an error about a missing binary, list every required scanner:

```shell
datadog-code-security-mcp version --detailed
```

Install a missing binary with the instructions in [Install security binaries][1]. After you install the agent skills, `dd-codesec-setup-toolchain` installs, updates, and diagnoses the same binaries. See [Install agent skills][4].

## Scanner upgrade required

`datadog_ephemeral_sast_scan` and the `ephemeral-scan` command return a `PREREQUISITE REQUIRED: Scanner Upgrade` error when the installed `datadog-static-analyzer` does not support the `--rules-with-config` flag. Ephemeral scans require version 0.9.10 or later.

Check the installed version:

```shell
datadog-static-analyzer --version
```

Upgrade the binary, then retry the scan. If you installed it with Homebrew:

```shell
brew upgrade datadog-static-analyzer
```

The error message repeats the install commands for your platform. `dd-codesec-setup-toolchain` can also run the upgrade for you.

## Authentication errors

Keys set in the MCP server configuration are not exported to your shell. `echo $DD_API_KEY` shows only a key exported in that shell, which is what a direct CLI command uses.

- For the MCP server, confirm `DD_API_KEY` and `DD_APP_KEY` are set in the client configuration on the [Code Security MCP Server][3] page.
- For a direct CLI command, export `DD_API_KEY` and `DD_APP_KEY` in the same shell. Optionally export `DD_SITE`.

If the values are set but scans still fail, verify your keys have the correct permissions. See [API and Application Keys][2] for details.

## Custom SAST rule not saved

`datadog_promote_sast_rule` and the `promote-sast-rule` command return an error instead of saving the rule in the following cases:

| Error | Cause and fix |
| ----- | ------------- |
| `user_confirmed must be true before saving a custom rule` | The user has not approved the rule. Review the rule, then pass `user_confirmed: true` or the `--user-confirmed` flag. |
| `DD_API_KEY and DD_APP_KEY are required to save a custom rule` | The keys are missing. Set them in the MCP client configuration or export them in the shell. See [Authentication errors](#authentication-errors). |
| `rule "<RULE>" already exists in ruleset "<RULESET>"` | A rule with that name exists, and nothing was saved. To publish a new revision over it, retry with `overwrite: true` or the `--overwrite` flag after the user agrees to replace it. Otherwise, choose another rule name. |
| `check existing rule returned status <CODE>`, `create ruleset returned status <CODE>`, `create rule returned status <CODE>`, or `create rule revision returned status <CODE>` | Datadog rejected the request. For `401` or `403`, confirm that `DD_SITE` matches the organization of the keys and that the application key can manage Static Analysis custom rules. |
| `rule name: ...` or `ruleset name: ...` | The name is not a lowercase slug of 5 to 32 characters with single hyphens. Rename it and retry. |
| `short description is longer than 60 characters` | Shorten `short_description` to one line of at most 60 characters. |

`ephemeral-scan` does not use Datadog keys. If a temporary rule runs but cannot be saved, check the keys for `promote-sast-rule` only.

If the save succeeds but the reply has a `warning` instead of a `revision_id`, the rule is saved. Open the rule page in Datadog to see the revision.

## Ephemeral scan misses a known match

The ephemeral scan follows the repository's Static Analysis configuration. It does not report code under ignored paths, outside `only` paths, above the file size limit, or excluded by gitignore. Check the configuration if a match you expect is in one of those files.

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

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/code_security/dev_tool_int/mcp_server/#install-security-binaries
[2]: /account_management/api-app-keys/
[3]: /security/code_security/dev_tool_int/mcp_server/
[4]: /security/code_security/dev_tool_int/mcp_server/#install-agent-skills
