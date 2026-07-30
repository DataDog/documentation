---
title: Variables and Actions
disable_toc: false
---

Rule actions extend Workload Protection (Runtime Security) rules beyond detection. When a rule matches an event, the Agent can execute one or more actions to enrich the event, respond to a threat, or drive multi-step detection logic.

Actions are defined in Agent policy files (`.policy`) under the `actions` field of a rule.
<div class="alert alert-info">All actions can be configured in Agent policy files (YAML) on the Agent but <code>log</code>, <code>coredump</code>, and <code>network_filter</code> cannot be setup from the UI when creating a rule.
When you create an Agent rule in Datadog, you can configure <code>hash</code>, <code>kill</code> (<a href="/security/workload_protection/respond_and_report/#automated-response">Automated Response</a>), and <code>set</code> actions. From a security signal, you can manually apply <code>kill</code> or <code>network_filter</code> to a targeted threat with <a href="/security/workload_protection/respond_and_report/#response">Response</a>.
</div>

## Overview


| Action           | Purpose                                          | Platform       | Requires enforcement |
| ---------------- | ------------------------------------------------ | -------------- | -------------------- |
| `set`            | Store state in a variable for use by other rules | Linux, Windows | No                   |
| `kill`           | Terminate a process                              | Linux, Windows | Yes                  |
| `hash`           | Compute hashes of a file                         | Linux          | No                   |
| `log`            | Write a message to the Agent log                 | Linux, Windows | No                   |
| `coredump`       | Capture forensic state (process, mount, dentry)  | Linux          | No                   |
| `network_filter` | Drop network traffic matching a BPF filter       | Linux          | Yes                  |


## Syntax

Each rule can define multiple actions as a YAML list. Each list item must contain exactly one action type.

{{< code-block lang="yaml" >}}
rules:
  - id: my_rule
    expression: exec.file.name == "suspicious_binary"
    actions:
      - set:
          name: flagged_process
          value: true
          ttl: 5m
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

### Action filters

Every action supports an optional `filter` field: a SECL expression evaluated at action time. The action runs only when both the rule expression and the action filter match.


| Field    | Required | Default                                | Description                               |
| -------- | -------- | -------------------------------------- | ----------------------------------------- |
| `filter` | No       | None (action runs on every rule match) | SECL expression evaluated at action time. |


{{< code-block lang="yaml" >}}
rules:
  - id: kill_container_process
    expression: exec.file.name == "malware"
    actions:
      - filter: process.container.id != ""
        kill:
          signal: SIGTERM
          scope: container

{{< /code-block >}}

## `set`: store variables

Use `set` to store state that persists across rules within the same policy. After it is defined, a variable can be referenced from any other rule in that policy.

### When to use it

Variables are one of the most powerful capabilities in Agent rule authoring. They are essential for building stateful, multi-step detections that go beyond what a single SECL expression can express on its own.

- Chain rules within a policy by recording context in one rule and matching a follow-up rule that references that variable.
- Build rolling lists of process names, paths, or DNS activity.

### Parameters


| Field           | Required                                 | Default                         | Description                                                                                      |
| --------------- | ---------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------ |
| `name`          | Yes                                      | —                               | Variable name. Referenced in expressions as `${name}` or `${scope.name}`.                        |
| `value`         | One of `value`, `field`, or `expression` | —                               | Static value (string, integer, Boolean, or array).                                               |
| `field`         | One of `value`, `field`, or `expression` | —                               | Copy a value from the triggering event (for example, `process.file.name`).                       |
| `expression`    | One of `value`, `field`, or `expression` | —                               | SECL expression whose result is stored. Requires `default_value` if type cannot be inferred.     |
| `default_value` | No                                       | —                               | Default when using `expression`. Must match the type of `value`.                                 |
| `scope`         | No                                       | Global (no scope prefix)        | `process`, `container`, or `cgroup`. Prefixes the variable name (for example, `process.my_var`). |
| `scope_field`   | No                                       | Triggering process PID          | Custom scope key (`process` scope only).                                                         |
| `append`        | No                                       | `false`                         | Append to a list variable instead of overwriting.                                                |
| `size`          | No                                       | `100` (when `append` is `true`) | Maximum list length when `append` is `true`.                                                     |
| `ttl`           | No                                       | No expiration                   | Time-to-live (for example, `10s`, `5m`). Variable expires after this duration.                   |
| `inherited`     | No                                       | `false`                         | Variable is inherited by child processes (`process` scope only).                                 |
| `private`       | No                                       | `false`                         | Variable is not exposed in security events.                                                      |


### Examples

Set a Boolean flag:

{{< code-block lang="yaml" >}}
rules:
  - id: flag_suspicious_exec
    expression: exec.file.path in ["/tmp/evil"]
    actions:
      - set:
          name: suspicious
          value: true
          ttl: 10m
  - id: detect_follow_up
    expression: open.file.path == "/etc/shadow" && ${suspicious}
{{< /code-block >}}

Collect DNS queries into a rolling list:

{{< code-block lang="yaml" >}}
rules:
  - id: collect_dns_queries
    expression: dns.question.name != ""
    actions:
      - set:
          name: queried_domains
          field: dns.question.name
          append: true
          size: 10
          ttl: 10s
          scope: process

{{< /code-block >}}

## `kill`: terminate a process

Use `kill` to actively stop malicious activity. The Agent sends a POSIX signal to the target process, container, or cgroup.

### Configure in Datadog

In addition to defining `kill` actions in Agent policy files, you can configure process termination in Datadog:

- **Automatic:** Add `kill` actions to Agent rules in a policy, as described in this section, or use [Automated response](/security/workload_protection/respond_and_report/#automated-response).
- **Manual:** From a security signal, use [Kill containers or processes](/security/workload_protection/investigate_and_triage/security_signals/actions#kill-containers-or-processes) under **Respond** in the signal side panel.

Both approaches require [Response](/security/workload_protection/respond_and_report/#response) to be enabled on the Agent. See [Respond and Report](/security/workload_protection/respond_and_report/) for an overview of enforcement and response workflows.

### When to use it

- Block cryptomining, reverse shells, or known malware at runtime.
- Gracefully stop a process (`SIGTERM`) or force-kill it (`SIGKILL`).

### Requirements

- Enforcement must be enabled in the Agent configuration (`runtime_security.enforcement.enabled`). See [Advanced configuration](/security/workload_protection/getting_started/advanced_configuration).
- Kill actions are rejected at policy load time if enforcement is globally disabled.
- Supported signals include `SIGKILL`, `SIGTERM`, `SIGHUP`, `SIGINT`, and other standard POSIX signal names.

### Parameters


| Field                         | Required | Default   | Description                                                                         |
| ----------------------------- | -------- | --------- | ----------------------------------------------------------------------------------- |
| `signal`                      | Yes      | —         | Signal name (for example, `SIGKILL`, `SIGTERM`).                                    |
| `scope`                       | No       | `process` | `process`, `container`, or `cgroup`. Determines which processes receive the signal. |
| `disable_container_disarmer`  | No       | `false`   | Disable the automatic container disarmer safeguard.                                 |
| `disable_executable_disarmer` | No       | `false`   | Disable the automatic executable disarmer safeguard.                                |


### Safeguards

The Agent includes disarmers to prevent runaway kill loops during automated response. If too many kill actions fire against the same container or executable within a configured period, subsequent kills for that target are suppressed until the period expires. 

Certain binaries can also be excluded from enforcement through `runtime_security.enforcement.exclude_binaries`.

### Example

{{< code-block lang="yaml" >}}
rules:
  - id: block_reverse_shell
    expression: >-
      exec.file.name in ["nc", "ncat", "bash"] &&
      process.ancestors.file.name not in ["sshd"]
    actions:
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

#### Kill action report

When a `kill` action runs, the Agent attaches an action report to the triggering Agent event in `agent.rule_actions`. This is not a separate custom event—the report is serialized with the security event that matched the rule. For `SIGKILL`, the Agent may delay sending the event until the target process exits so timing fields are accurate.

| Field | Description |
| ----- | ----------- |
| `type` | Always `kill` |
| `signal` | POSIX signal sent (for example, `SIGKILL`, `SIGTERM`) |
| `scope` | `process`, `container`, or `cgroup` |
| `status` | Execution outcome: `performed`, `partially_performed`, `error`, `kill_queued`, `kill_aborted`, `rule_disarmed`, or `rule_dismantled` |
| `disarmer_type` | Safeguard that blocked or altered the kill: `container` or `executable` (when applicable) |
| `created_at` | Time the target process was created |
| `detected_at` | Time the rule matched |
| `killed_at` | Time the signal was sent (when applicable) |
| `exited_at` | Time the target process exited (when applicable) |
| `ttr` | Elapsed time from process creation to exit |

To count how many times a `kill` action ran after a rule match, use the `datadog.runtime_security.rules.action_performed` metric with tags `rule_id:<rule_id>` and `action_name:kill`.

## `network_filter`: block network traffic

Use `network_filter` to drop packets matching a BPF filter expression for the offending process or cgroup. This is network isolation at the host level.

### Configure in Datadog

In addition to defining `network_filter` actions in Agent policy files, you can isolate a compromised workload in Datadog:

- **Automatic:** Add `network_filter` actions to Agent rules in a policy, as described in this section. When a rule matches, the Agent drops matching traffic automatically.
- **Manual:** From a security signal, use [Network isolation](/security/workload_protection/investigate_and_triage/security_signals/actions#network-isolation) under **Respond** in the signal side panel.

### When to use it

- Cut off C2 communication after detecting a malicious process.
- Block DNS or specific port traffic from a compromised container.

### Requirements

- Enforcement must be enabled.
- The `raw_packet` event type must be enabled in the Agent configuration.
- Linux only (eBPF-based packet filtering).

### Parameters


| Field    | Required | Default   | Description                                                    |
| -------- | -------- | --------- | -------------------------------------------------------------- |
| `filter` | Yes      | —         | BPF filter expression (for example, `port 53`, `tcp port 80`). |
| `policy` | No       | `allow`   | `drop` or `allow`. Only `drop` enforces packet dropping.       |
| `scope`  | No       | `process` | `process` or `cgroup`.                                         |


### Example

{{< code-block lang="yaml" >}}
rules:
  - id: test_iso
    expression: exec.file.name == "ls"
    actions:
      - network_filter:
          filter: "dst net 10.0.0.0/8 or dst net 172.16.0.0/12 or dst net 192.168.0.0/16 or dst net 169.254.0.0/16 or dst net 127.0.0.0/8"
          policy: drop
          scope: cgroup

{{< /code-block >}}

### Raw packet action and metrics

#### Raw packet action event

When the kernel drops a packet that matches an active filter, the Agent can emit a `rawpacket_action` custom event (`@agent.rule_id:rawpacket_action`). These events are rate-limited under high drop volume, because the Agent cannot send one event for every dropped packet. The event payload includes:


| Field            | Description                                                          |
| ---------------- | -------------------------------------------------------------------- |
| `packet.dropped` | `true` for dropped packets                                           |
| `packet.layers`  | Decoded network layers (Ethernet, IP, TCP/UDP, and so on)            |
| `packet.tls`     | TLS context when available                                           |
| `network`        | Network context for the dropped packet (device, source, destination) |


#### Metrics

To track drop counts reliably, use the `datadog.runtime_security.network.raw_packet.dropped` metric.

## `hash`: compute file hashes

Use `hash` to enrich an event with cryptographic hashes of a file referenced in the triggering event. This is useful for threat intelligence matching and forensic analysis.

### When to use it

- Hash a binary at exec time before it is deleted or modified.
- Hash a file opened for write to correlate with known malware signatures.

### Parameters


| Field           | Required | Default                                                                      | Description                                                                                       |
| --------------- | -------- | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `field`         | No       | `exec.file` for `exec` rules; `open.file` for `open` rules                   | File event field to hash (for example, `exec.file`, `open.file`). Required for other event types. |
| `max_file_size` | No       | `5242880` (5 MB), from `runtime_security_config.hash_resolver.max_file_size` | Maximum file size (bytes) to hash. Larger files are skipped.                                      |


### Supported algorithms

Hashes are computed by the Agent hash resolver and may include `MD5`, `SHA1`, `SHA256`, and `SSDEEP`, depending on Agent configuration. Results appear in the `*.hashes` field of the file event (for example, `exec.file.hashes`). To change the algorithms used, update `runtime_security_config.hash_resolver.hash_algorithms` in `system-probe.yaml` or set `DD_RUNTIME_SECURITY_CONFIG_HASH_RESOLVER_HASH_ALGORITHMS`. See [Workload Protection Agent configuration](/security/workload_protection/getting_started/advanced_configuration) for all hash resolver parameters.

### Example

{{< code-block lang="yaml" >}}
rules:
  - id: hash_dropped_binary
    expression: exec.file.path startswith "/tmp/" && exec.file.name not in ["systemd"]
    actions:
      - hash:
          field: exec.file
          max_file_size: 10485760  # 10 MB

{{< /code-block >}}

## `log`: write to Agent logs

Use `log` to emit a structured message to the Runtime Security Agent log when a rule fires. This is helpful for debugging custom rules or auditing rule triggers without generating a full security signal.

### When to use it

- Debug rule logic during development.

### Parameters


| Field     | Required | Default                    | Description                                        |
| --------- | -------- | -------------------------- | -------------------------------------------------- |
| `level`   | Yes      | —                          | Log level: `debug`, `info`, `warning`, or `error`. |
| `message` | No       | `Rule <rule_id> triggered` | Custom message.                                    |


### Example

{{< code-block lang="yaml" >}}
rules:
  - id: log_sensitive_file_access
    expression: open.file.path startswith "/etc/"
    actions:
      - log:
          level: warning
          message: "Suspicious file access detected on sensitive path"

{{< /code-block >}}

## `coredump`: capture forensic state

Use `coredump` to snapshot internal Agent state at the time of a rule match. The dump is gzip-compressed (unless disabled) and attached to the security event.

### When to use it

- Deep forensic investigation of an attack in progress.
- Capture process tree, mount table, or dentry cache state alongside the triggering event.

### Platform

Linux only.

### Parameters

At least one of `process`, `mount`, or `dentry` must be set to `true`.


| Field            | Required     | Default                            | Description                                   |
| ---------------- | ------------ | ---------------------------------- | --------------------------------------------- |
| `process`        | At least one | `false`                            | Include the process resolver snapshot.        |
| `mount`          | At least one | `false`                            | Include the mount resolver snapshot.          |
| `dentry`         | At least one | `false`                            | Include the dentry resolver snapshot.         |
| `no_compression` | No           | `false` (gzip compression enabled) | Disable gzip compression of the dump payload. |


### Example

{{< code-block lang="yaml" >}}
rules:
  - id: capture_forensic_state
    expression: exec.file.path startswith "/tmp/" && process.container.id != ""
    actions:
      - coredump:
          process: true
          mount: true
          dentry: true
          no_compression: false

{{< /code-block >}}

## Combining actions

A single rule can chain multiple actions. They execute in list order when the rule matches:

{{< code-block lang="yaml" >}}
rules:
  - id: detect_and_respond
    expression: exec.file.path == "/tmp/payload"
    actions:
      - set:
          name: payload_seen
          value: true
      - hash:
          field: exec.file
      - log:
          level: info
          message: "Payload executed, hashing and killing"
      - kill:
          signal: SIGKILL
          scope: process

{{< /code-block >}}

Typical patterns:


| Pattern                 | Actions                                       |
| ----------------------- | --------------------------------------------- |
| Detect → enrich → alert | `hash` only (signal sent automatically)       |
| Detect → respond        | `kill` or `network_filter`                    |
| Multi-step detection    | `set` in rule A, reference `${var}` in rule B |
| Debug custom rules      | `log`                                         |


## Platform summary


| Action           | Linux | Windows |
| ---------------- | ----- | ------- |
| `set`            | ✅     | ✅       |
| `kill`           | ✅     | ✅       |
| `hash`           | ✅     | ❌       |
| `log`            | ✅     | ✅       |
| `coredump`       | ✅     | ❌       |
| `network_filter` | ✅     | ❌       |


## Validation rules

The Agent validates actions at policy load time:

- **One action type per list item**: `set` and `kill` cannot appear in the same action block.
- **Required fields**: for example, `kill.signal`, `log.level`, `network_filter.filter`.
- **Enforcement gate**: `kill` and `network_filter` require enforcement to be enabled.
- **Event type compatibility**: `network_filter` requires the `raw_packet` event type; `hash.field` must be compatible with the rule's event type.

