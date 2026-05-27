---
title: Agent Restricted Shell (rshell)
description: "Learn how the Agent Restricted Shell (rshell) executes safe, read-only commands on hosts through the Datadog MCP Server."
further_reading:
- link: "bits_ai/mcp_server/tools/#remote-actions"
  tag: "Documentation"
  text: "Remote Actions toolset"
  tag: "Documentation"
  text: "Agent toolset"
- link: "bits_ai/mcp_server/setup"
  tag: "Documentation"
  text: "Datadog MCP Server setup"
- link: "service_management/workflows/private_actions"
  tag: "Documentation"
  text: "Private Action Runner"
---

## Overview

The Agent Restricted Shell (rshell) is the command execution layer behind the `remote-actions` toolset in the Datadog MCP server. When an AI system or developer CLI calls `datadog_remote_action_restricted_shell_run_command`, rshell is what runs on the host.

rshell is an open source, POSIX-compatible shell interpreter written in Go and embedded in the Private Action Runner (PAR) process. It is not a real host shell. There is no `bash`, `sh`, or `zsh` process spawned. Every command is a purpose-built Go implementation with explicit safety constraints. You can view the source at [github.com/DataDog/rshell](https://github.com/DataDog/rshell).

## How it works

When a command is invoked:

1. The Datadog backend receives the request from the MCP client.
2. The request is forwarded to the PAR running on the target host.
3. rshell, embedded in the PAR process, executes the command as a Go builtin.
4. Output is returned to the backend and surfaced to the MCP client.

The PAR is a customer-installed process. It handles the secure channel between the Datadog backend and the host. rshell runs inside it and never opens a separate shell process on the host.

## Why it is safe

rshell enforces the following constraints by design:

- **No write access.** rshell has no commands that write to the filesystem. The only output redirect allowed is `>/dev/null`. Files cannot be created, modified, or deleted.
- **No external binary execution.** rshell cannot call binaries on the host. Every command is a Go builtin inside the PAR process. External commands are blocked unless an explicit ExecHandler is configured.
- **No network egress.** Network diagnostic commands (`ping`, `ss`, `ip`) are read-only. `ping` blocks flood mode, broadcast, and multicast addresses. Background execution (`cmd &`) is not supported.
- **Path allowlisting.** All file access is restricted to directories configured in `AllowedPaths`. You can further restrict this in your Agent configuration.
- **Backend-controlled command allowlist.** The permitted command set is controlled per Agent version from the Datadog backend, using a `rshell:` namespace prefix (for example, `rshell:cat`). Individual commands have a killswitch that can be disabled immediately if a security issue is discovered.
- **Empty environment by default.** No parent environment variables are inherited. rshell starts with an empty environment unless variables are explicitly passed by the caller.

## Supported commands

The following commands and shell features are available as of Agent 7.79.

### File inspection

| Command | Description |
|---------|-------------|
| `cat` | Print file contents; supports line numbering and non-printing character display |
| `ls` | List directory contents; supports pagination using `--offset` and `--limit` |
| `head` | Print the first N lines or bytes of a file (default: 10 lines) |
| `tail` | Print the last N lines or bytes of a file (default: 10 lines); supports `+N` offset mode; `-f` (follow) is blocked |
| `find` | Search for files by name, type, size, permissions, and modification time; `-delete` and `-regex` are blocked |
| `strings` | Print printable character sequences in files (default minimum length: 4) |

### Text processing

| Command | Description |
|---------|-------------|
| `grep` | Search for patterns; uses RE2 regex engine (linear-time, no backtracking) |
| `sed` | Filter and transform text; uses RE2 regex engine; `-i` (in-place edit) and `-f` (script file) are blocked |
| `cut` | Extract fields or byte ranges from lines |
| `tr` | Translate, squeeze, or delete characters |
| `sort` | Sort lines; supports numeric, human-readable, and reverse sorting; `-o` (output to file) is blocked |
| `uniq` | Filter or report duplicate lines |
| `wc` | Count lines, words, bytes, characters, or max line length |
| `printf` | Format and print data to stdout |

### Process and system inspection

| Command | Description |
|---------|-------------|
| `ps` | Report process status; `-e`/`-A` shows all processes; `-f` adds UID/PPID/start time |
| `uname` | Print system information (Linux only) |

### Network diagnostics (read-only)

| Command | Description |
|---------|-------------|
| `ping` | Send ICMP echo requests and report round-trip statistics; flood, broadcast, and multicast are blocked |
| `ss` | Display network socket statistics; `-p` (process disclosure) and `-K` (kill) are blocked |
| `ip addr` / `ip link` | Show network interface addresses and link-layer information |
| `ip route` | Show IPv4 routing table or resolve a route for a given address (Linux only) |

### Shell utilities

| Command | Description |
|---------|-------------|
| `echo` | Write arguments to stdout |
| `test` / `[ ]` | Evaluate conditional expressions (file tests, string and integer comparison, logical operators) |
| `help` | Display supported features and available commands |
| `true` / `false` | Return exit code 0 or 1 |
| `exit` | Exit the shell with a given status code |

## Supported shell features

### Control flow

- `for VAR in WORDS; do CMDS; done`
- `if` / `elif` / `else`
- `break` and `continue` for loop control
- `&&` and `||` short-circuit lists
- `!` negation
- `{ CMDS; }` brace groups
- `( CMDS )` subshells (variable changes do not propagate to the parent)

### Pipes and redirections

- `|` pipe stdout between commands
- `<` input redirection (read-only, within `AllowedPaths`)
- `>/dev/null`, `2>/dev/null`, `&>/dev/null` discard output
- `2>&1`, `>&2` file descriptor duplication between stdout and stderr
- `<<DELIM` and `<<-DELIM` heredocs

Write redirections to any target other than `/dev/null` are blocked.

### Variables and expansion

- Variable assignment: `VAR=value`
- Variable expansion: `$VAR`, `${VAR}`
- `$?` last exit code
- Inline assignment: `VAR=value command` (scoped to that command)
- Command substitution: `$(cmd)` and `` `cmd` ``; output capped at 1 MiB
- Single and double quotes
- Globbing: `*`, `?`, `[abc]`, `[a-z]`, `[!a]`
- Line continuation: `\` at end of line
- Comments: `# text`

Arithmetic expansion `$(( ))`, array assignment, append assignment (`+=`), and parameter expansion operations such as `${var:-default}` are not supported.

## Restrict file access

By default, file read commands are gated by a path allowlist managed from the Datadog backend. You can further restrict which paths and commands rshell can access in your Agent configuration.

```yaml
# datadog.yaml
private_action_runner:
  restricted_shell:
    allowed_paths:
      - /etc/datadog-agent/
      - /var/log/datadog/
    allowed_commands:
      - cat
      - grep
```

## Further reading

{{< partial name="whats-next/whats-next.html" >}}
