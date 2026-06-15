---
title: Remediation
disable_toc: false
further_reading:
- link: "security/workload_protection/getting_started"
  tag: "Documentation"
  text: "Getting started with Workload Protection"
- link: "security/workload_protection/getting_started/advanced_configuration"
  tag: "Documentation"
  text: "Workload Protection Agent advanced configuration"
---

Remediation in Workload Protection lets the Datadog Agent **enforce** follow-up actions directly from the [Workload Protection Signals][1]
<div class="alert alert-info">Remediation and agent enforcement capabilities depend on your Datadog subscription and organization settings. Contact <a href="https://docs.datadoghq.com/help/">Datadog Support</a> if you are unsure whether the feature is enabled for your account.</div>

## Enable the Remediation feature

Complete the following once per environment (hosts or containers running the Workload Protection-enabled Agent).

### 1. Prerequisites

- Datadog **Agent 7.78** or later on the hosts that should execute remediation actions.
- [**Remote Configuration**][3] is enabled so remediation policies can be delivered to the Agent.

### 2. Turn on enforcement in `system-probe`

Enforcement is the capability that allows the runtime security module to **kill** processes or containers when a remediation rule matches.

1. On Linux hosts, open `/etc/datadog-agent/system-probe.yaml` (or the equivalent path in your image or Helm values).
2. Under `runtime_security_config`, set **`enforcement.enabled`** to **`true`**.
3. Optionally tune the following:
   - **`enforcement.raw_syscall.enabled`**: whether enforcement uses the `sys_enter` tracepoint (default `false` in many setups; follow Support guidance if you need to change it).
   - **`enforcement.exclude_binaries`**: paths that must **never** be killed (for example init, systemd, or your container runtime).
   - **`enforcement.rule_source_allowed`**: which rule sources may run enforcement actions (typically `default` and `custom`).

{{< code-block lang="yaml" filename="/etc/datadog-agent/system-probe.yaml" disable_copy="false" collapsible="true" >}}
runtime_security_config:
  enforcement:
    enabled: true
    raw_syscall:
      enabled: false
    exclude_binaries:
      - /sbin/init
      - /usr/bin/systemd
      - /usr/bin/docker
    rule_source_allowed:
      - "default"
      - "custom"
{{< /code-block >}}

### 3. Enable network probes for network isolation

Network isolation remediation uses eBPF **Traffic Control** classifiers and raw packet programs. Enable the network section of event monitoring in the **same** `system-probe.yaml`:

{{< code-block lang="yaml" filename="/etc/datadog-agent/system-probe.yaml (fragment)" disable_copy="false" collapsible="true" >}}
event_monitoring_config:
  network:
    enabled: true
    raw_packet:
      enabled: true
{{< /code-block >}}

If you only use **kill**-based remediation and never network isolation, your organization may still require `event_monitoring_config.network` for other Workload Protection features—see the [advanced configuration reference][4] for defaults and overrides.

### 4. Apply configuration and restart the Agent

1. Validate the YAML syntax.
2. Restart the **system-probe** service (and the Agent if your platform requires it) so the new enforcement and network settings load.

On Kubernetes, mirror these keys in your `DatadogAgent` spec or Helm `values.yaml` under the system-probe / `systemProbe` configuration, then roll the DaemonSet. See [Workload Protection on Kubernetes][5] for the overall Agent layout.

### 5. Confirm in Datadog

After restarts, confirm that hosts are reporting Workload Protection telemetry as usual. When remediation rules are published for your org, matching hosts execute the configured **kill** or **network_filter** actions and report outcomes (see [Available actions](#available-actions) and [Action statuses](#action-statuses)).

## Available actions

The Agent supports the following **enforcement** action types for remediation workflows:

### Kill

- **Purpose:** Terminate a malicious process or all processes in a compromised **container** (cgroup), depending on scope.
- **Typical options:** Signal (for example `SIGKILL`), scope **`process`** vs **`container`**, and optional flags to adjust built-in safety checks for **well-scoped, one-shot** remediation rules.

### Network filter (network isolation)

- **Purpose:** Block network traffic using an eBPF-based filter (for example drop egress to specific ports).
- **Typical options:** BPF **filter** expression, **policy** (for example `drop`), and scope **`process`** or **`cgroup`**.

### Cancel network isolation

- **Purpose:** **Revert** a previous isolation rule when it is removed from the policy that is applied to the host—traffic returns to the prior ruleset. This action is how isolation is undone programmatically.

<div class="alert alert-warning">Misconfigured enforcement rules can disrupt workloads. Test remediation rules in non-production environments, keep expressions tightly scoped (for example to a specific process ID or cgroup), and use the safety mechanisms described in the <a href="/security/workload_protection/getting_started/advanced_configuration">advanced configuration</a> documentation unless Support advises otherwise.</div>

## Action statuses

When remediation runs, the Agent reports a **status** for each action. The table below summarizes the main outcomes for each action type.

| Status | Description | Kill | Network isolation | Cancel network isolation |
| --- | --- | --- | --- | --- |
| `performed` | The action completed successfully. | {{< X >}} | {{< X >}} | |
| `partially_performed` | Part of the kill succeeded (for example some processes terminated) but not all targets could be killed. | {{< X >}} | | |
| `removed` | An isolation rule was **removed** from the current ruleset while it was present before—used when **reverting** network isolation. | | | {{< X >}} |

Additional statuses (such as `error`, `not_triggered`, or disarmer-related values) can appear in action reports or remediation status events depending on the rule and environment. See your signal **Response** details and Agent logs for the exact payload.

## Further reading

{{< partial name="whats-next/whats-next.html" >}}

[1]: /security/workload_protection/investigate_and_triage/security_signals
[2]: /security/workload_protection/getting_started/
[3]: /agent/remote_config/?tab=configurationyamlfile
[4]: /security/workload_protection/getting_started/advanced_configuration
[5]: /security/workload_protection/getting_started/kubernetes
