---
title: SecL guide
disable_toc: false
---

This guide shows you how to write effective SECL (Security Language) rules for Datadog Workload Protection.

## Overview

Datadog SECL is a custom domain-specific language used to create Agent expressions and policies within Datadog Workload Protection. SECL allows security teams to define real-time threat detection rules by specifying conditions, operators, and patterns that security agents can monitor across hosts, containers, applications, and cloud infrastructure.

### How SECL rules fit together

Think of SECL as a local filter: it runs inside the Agent on each host, watching kernel and OS events. When an event matches your SECL expression, the Agent raises a detection.

Datadog threat detection rules act as backend logic: they combine one or more Agent rules (using `@agent.rule_id`), add thresholds, suppress noise, and decide how alerts are routed.

In summary, the Agent rule finds raw behavior and the detection rule turns it into end-to-end attack stories.

<div class="alert alert-info">This guide describes how to create rule expressions manually, but Workload Protection also provides the <b>Assisted rule creator</b> wizard to walk you through creating the Agent and detections rules together. See <a href="/security/threats/workload_security_rules/custom_rules/?tab=host#create-the-custom-agent-and-detection-rules-together">Create the custom Agent and detection rules together.</a></div>

## SecL expression syntax

The standard format of a SECL expression is:

{{< code-block lang="javascript" >}}
<event-type>.<event-attribute> <operator> <value> [<operator> <event-type>.<event-attribute>] ...
{{< /code-block >}}

Using this format, an example rule for a Linux system looks like this:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/shadow" && process.file.path not in ["/usr/sbin/vipw"]
{{< /code-block >}}

### Operators

SECL operators are used to combine event attributes together into a full expression. The following operators are available:

| SECL Operator         |  Definition                              | Agent Version |
|-----------------------|------------------------------------------|---------------|
| `==`                  | Equal                                    | 7.27          |
| `!=`                  | Not equal                                | 7.27          |
| `>`                   | Greater                                  | 7.27          |
| `>=`                  | Greater or equal                         | 7.27          |
| `<`                   | Lesser                                   | 7.27          |
| `<=`                  | Lesser or equal                          | 7.27          |
| `!` or `not`          | Not                                      | 7.27          |
| `^`                   | Binary not                               | 7.27          |
| `in [elem1, ...]`     | Element is contained in list             | 7.27          |
| `not in [elem1, ...]` | Element is not contained in list         | 7.27          |
| `=~`                  | String matching                          | 7.27          |
| `!~`                  | String not matching                      | 7.27          |
| `&`                   | Binary and                               | 7.27          |
| `\|`                  | Binary or                                | 7.27          |
| `&&` or `and`         | Logical and                              | 7.27          |
| `\|\|` or `or`        | Logical or                               | 7.27          |
| `in CIDR`             | Element is in the IP range               | 7.37          |
| `not in CIDR`         | Element is not in the IP range           | 7.37          |
| `allin CIDR`          | All the elements are in the IP range     | 7.37          |
| `in [CIDR1, ...]`     | Element is in the IP ranges              | 7.37          |
| `not in [CIDR1, ...]` | Element is not in the IP ranges          | 7.37          |
| `allin [CIDR1, ...]`  | All the elements are in the IP ranges    | 7.37          |

#### Patterns and regular expressions

Patterns or regular expressions can be used in SECL expressions. They can be used with the `in`, `not in`, `=~`, and `!~` operators.

| Format           |  Example             | Supported Fields   | Agent Version |
|------------------|----------------------|--------------------|---------------|
| `~"pattern"`     | `~"httpd.*"`         | All                | 7.27          |
| `r"regexp"`      | `r"rc[0-9]+"`        | All except `.path` | 7.27          |

Patterns on `.path` fields will be used as Glob. `*` will match files and folders at the same level. `**`, introduced in 7.34, can be used at the end of a path in order to match all the files and subfolders.

#### Durations

You can use SECL to write rules based on durations, which trigger on events that occur during a specific time period. For example, trigger on an event where a secret file is accessed more than a certain length of time after a process is created.
Such a rule could be written as follows:

{{< code-block lang="javascript" >}}
open.file.path == "/etc/secret" && process.file.name == "java" && process.created_at > 5s
{{< /code-block >}}

Durations are numbers with a unit suffix. The supported suffixes are "s", "m", "h".

### Platform specific syntax

SECL expressions support several platforms. You can use the documentation below to see what attributes and helpers are available for each.

* [Linux][1]
* [Windows][2]

## Rule authoring tips

- Always set the operating system (OS).
- Anchor on ancestry to reduce noise. Use `process.ancestors.file.name`.
- Use durations (for example, `> 5s`, `10m`, `2h`) to target narrow execution windows.
- Use exact match (`==`) whenever possible as it results in the lowest noise.
- List membership (`in [...]`) is best for allowlists or controlled sets of values.
- Use a glob match (`~"/path/*"`) for path families as it is safer and faster than regex.
- Use regex (`=~`) only when globs/lists can't be used. Keep the regex expression as narrow as possible. As a rule of thumb, start with `==` or `in [...]`. Reach for regex only as a last resort.
- Use negation (`not in [...]`, `!~`) to carve out exceptions explicitly (for example, trusted tools).
- Use CIDR operators (`in CIDR`, `not in CIDR`) for network boundaries.
- Name rules by behavior, with a format that follows *What + Who + Context*.
- Tag generously: `team`, `app`, `env`, `MITRE`, `severity`.

### Avoid common mistakes

| Pattern                   | Explanation                                 |
| ------------------------- | -------------------------------------------- |
| `open.file.path == "/etc/passwd"`, `exec.comm != ""` | Too broad. Matches a lot of valid use cases.  |
| `fd.name contains "/"`    | Matches nearly every file I/O event.     |
| `container.id != ""`      | Useful only if scoped with a more specific field. |

## Example library

<div class="alert alert-info">You can find more in depth examples in the default policy shipped OOTB with the agent. See <a href="https://github.com/DataDog/security-agent-policies/blob/master/runtime/default.policy">Workload Protection default policy.</a></div>

### Linux

#### Access to sensitive files (allowlist safe tools)

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
open.file.path in ["/etc/shadow", "/etc/sudoers"] &&
process.file.path not in ["/usr/sbin/vipw", "/usr/sbin/visudo"]
{{< /code-block >}}

#### Nginx or PHP spawning bash

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
exec.file.path == "/usr/bin/bash" &&
(
process.ancestors.file.name == "nginx" ||
process.ancestors.file.name =~ "php*"
)
{{< /code-block >}}

#### Suspicious IMDS access from container

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
connect &&
network.destination.ip in ["169.254.169.254"] &&
container.id != ""
{{< /code-block >}}

#### Kernel module loads outside maintenance window

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
load_module &&
process.user != "root" &&
process.ancestors.file.name not in ["modprobe", "insmod"]
{{< /code-block >}}

#### Sensitive file read shortly after start

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
open.file.path == "/etc/secret" &&
process.file.name == "java" &&
process.created_at > 5s
{{< /code-block >}}

#### Outbound to non-corporate IPs (CIDR allowlist)

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
connect &&
network.destination.ip not in [10.0.0.0/8, 192.168.0.0/16, 172.16.0.0/12]
{{< /code-block >}}

### Windows

#### Registry persistence via run key

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
set_key_value &&
open_key.registry.key_path =~ "*\\Software\\Microsoft\\Windows\\CurrentVersion\\Run*"
{{< /code-block >}}

#### Unsigned Binary Launching PowerShell

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
exec.file.path =~ "*\\WindowsPowerShell\\v1.0\\powershell.exe" &&
process.parent.file.path !~ "*\\Program Files*" &&
process.user_sid != "S-1-5-18"
{{< /code-block >}}

### Cross-platform

#### Crypto-miner indicators

{{< code-block lang="plaintext" disable_copy="true" collapsible="true" >}}
exec.args_flags in ["cpu-priority", "donate-level", ~"randomx-1gb-pages"] ||
exec.args in [~"*stratum+tcp*", ~"*nicehash*", ~"*yespower*"]
{{< /code-block >}}

[1]: /security/workload_protection/linux_expressions
[2]: /security/workload_protection/windows_expressions